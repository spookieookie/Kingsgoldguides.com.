import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

function load(path, names, globals = {}) {
  const source = stripTypeScriptTypes(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'))
    .replace(/^import .*;\r?\n/gm, '').replace(/^export default /gm, '').replace(/^export /gm, '');
  return runInNewContext(`${source}\n;({${names.join(',')}})`, globals);
}

const { siteConfig } = load('lib/site.ts', ['siteConfig']);
const schema = load('lib/schema.ts', ['schemaDateTime', 'videoObjectSchema', 'articleSchema', 'profilePageSchema', 'websiteSchema', 'guideCollectionSchema'], { siteConfig, URL });

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

test('every published guide has sourced farm facts and an extractable short answer', () => {
  const { guides } = load('lib/content/guides.ts', ['guides']);
  const { farmFacts } = load('lib/content/farm-facts.ts', ['farmFacts']);
  for (const guide of guides) {
    const facts = farmFacts[guide.slug];
    assert.ok(facts, `${guide.slug}: missing farm facts`);
    for (const key of ['location', 'valueType', 'beforeYouGo']) assert.ok(facts[key]?.trim(), `${guide.slug}: ${key}`);
    assert.ok(facts.targets.length > 0, `${guide.slug}: target items`);
    const source = readFileSync(new URL(`../content/guides/${guide.mdxSlug}.mdx`, import.meta.url), 'utf8');
    assert.ok(guide.tldr || /^quickAnswer: /m.test(source), `${guide.slug}: missing short answer`);
    assert.ok(guide.realmCaveats, `${guide.slug}: version and market context`);
  }
  assert.equal(Object.keys(farmFacts).length, guides.length, 'Remove facts for unpublished guides');
});

test('articles, source videos, author profiles, and the website share stable identities', () => {
  const article = schema.articleSchema({
    title: 'Volatile Air', description: 'Dungeon route', slug: '/guides/vortex-pinnacle-volatile-air-farm',
    publishedAt: '2026-10-21', youtubeVideoId: 'zTRNWmTc11U', topics: ['Volatile Air'], location: 'Uldum',
  });
  const video = schema.videoObjectSchema({ name: 'Route', description: 'Farm', youtubeVideoId: 'zTRNWmTc11U', uploadDate: '2017-08-05' });
  const profile = schema.profilePageSchema({ name: 'King K', description: 'Creator', slug: '/authors/king-kunta' });
  assert.equal(article.video['@id'], video['@id']);
  assert.equal(article.author['@id'], video.creator['@id']);
  assert.equal(article.author['@id'], profile.mainEntity['@id']);
  assert.equal(article.isPartOf['@id'], schema.websiteSchema()['@id']);
  assert.equal(article.citation, 'https://www.youtube.com/watch?v=zTRNWmTc11U');
  assert.equal(article.about[0].name, 'Volatile Air');
  assert.equal(article.contentLocation.name, 'Uldum');
});

test('guide collection describes exactly the published guide links', () => {
  const { guides } = load('lib/content/guides.ts', ['guides']);
  const collection = schema.guideCollectionSchema(guides);
  assert.equal(collection.mainEntity.numberOfItems, guides.length);
  collection.mainEntity.itemListElement.forEach((entry, i) => {
    assert.equal(entry.position, i + 1);
    assert.equal(entry.name, guides[i].title);
    assert.equal(entry.url, `${siteConfig.domain}/guides/${guides[i].slug}`);
  });
});

test('search crawlers can read public pages while administrative routes stay excluded', () => {
  const { robots } = load('app/robots.ts', ['robots'], { siteConfig });
  const rules = robots().rules;
  assert.equal(rules.userAgent, '*');
  assert.equal(rules.allow, '/');
  assert.deepEqual(Array.from(rules.disallow), ['/api/', '/admin/']);
  assert.equal(robots().sitemap, `${siteConfig.domain}/sitemap.xml`);
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
