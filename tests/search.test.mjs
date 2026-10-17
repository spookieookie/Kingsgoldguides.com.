import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

function load(path, names, globals = {}) {
  const source = stripTypeScriptTypes(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'))
    .replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '');
  return runInNewContext(`${source}\n;({${names.join(',')}})`, globals);
}

const { siteConfig } = load('lib/site.ts', ['siteConfig']);
const schema = load('lib/schema.ts', ['schemaDateTime', 'videoObjectSchema', 'articleSchema'], { siteConfig });

test('structured data accepts archive records and preserves timezone-aware instants', () => {
  assert.equal(schema.schemaDateTime('2017-03-11'), '2017-03-11T00:00:00.000Z');
  assert.equal(schema.schemaDateTime('2026-10-10T17:34:12-04:00'), '2026-10-10T21:34:12.000Z');
  for (const value of ['2026-02-30', 'garbage', '2026-10-10T17:34:12']) {
    assert.throws(() => schema.schemaDateTime(value));
  }
});

test('every published video emits complete video markup with an explicit timezone', () => {
  const { guides } = load('lib/content/guides.ts', ['guides']);
  const { videos } = load('lib/content/videos.ts', ['videos']);
  const { posts } = load('lib/content/posts.ts', ['posts']);
  for (const item of [...guides, ...videos, ...posts]) {
    const data = schema.videoObjectSchema({
      name: item.title, description: item.excerpt, youtubeVideoId: item.youtubeVideoId,
      uploadDate: item.videoUploadedAt ?? item.publishedAt,
    });
    for (const key of ['name', 'description', 'thumbnailUrl', 'embedUrl', 'uploadDate']) assert.ok(data[key], `${item.slug}: ${key}`);
    assert.match(data.uploadDate, /^\d{4}-\d{2}-\d{2}T.*Z$/);
    assert.ok(Number.isFinite(Date.parse(data.uploadDate)));
    assert.equal(data.contentUrl, undefined, 'An HTML watch page is not a raw video file');
  }
});

test('article dates use the shared structured-data formatter', () => {
  const data = schema.articleSchema({ title: 'Farm', description: 'Route', slug: '/guides/farm', publishedAt: '2026-10-17' });
  assert.equal(data.datePublished, '2026-10-17T00:00:00.000Z');
  assert.equal(data.dateModified, data.datePublished);
});

test('analytics configures once, honors rejection, and excludes query strings', () => {
  const cookies = [];
  const window = {};
  const document = { referrer: 'https://example.com/?private=1#secret' };
  Object.defineProperty(document, 'cookie', { get: () => '_ga=sample', set: value => cookies.push(value) });
  const api = load('lib/analytics.ts', ['startAnalytics', 'stopAnalytics'], {
    window, document, location: { origin: 'https://kingsgoldguides.com', pathname: '/guides/test' },
  });
  api.startAnalytics('G-9D2KRKSGEH');
  api.startAnalytics('G-9D2KRKSGEH');
  const calls = window.dataLayer.map(value => Array.from(value));
  const configs = calls.filter(value => value[0] === 'config');
  assert.equal(configs.length, 1);
  assert.equal(configs[0][2].send_page_view, false);
  assert.equal(configs[0][2].page_location, 'https://kingsgoldguides.com/guides/test');
  assert.equal(configs[0][2].page_referrer, 'https://example.com/');
  api.stopAnalytics('G-9D2KRKSGEH');
  assert.equal(window['ga-disable-G-9D2KRKSGEH'], true);
  assert.equal(Array.from(window.dataLayer.at(-1))[2].analytics_storage, 'denied');
  assert.ok(cookies.length > 0);
});
