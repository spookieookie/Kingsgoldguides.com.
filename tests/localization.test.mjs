import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

function source(path) { return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'); }
function load(path, names, globals = {}) {
 const code = stripTypeScriptTypes(source(path)).replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '');
 return runInNewContext(`${code}\n;({${names.join(',')}})`, globals);
}
const { siteConfig } = load('lib/site.ts', ['siteConfig']);
const { locales, translatedSlugs, languageAlternates, isLocale } = load('lib/locales.ts', ['locales','translatedSlugs','languageAlternates','isLocale'], { siteConfig });
const { translations } = load('lib/content/translations.ts', ['translations']);

test('published translations have complete bodies, localized facts and real English sources', () => {
 const { guides } = load('lib/content/guides.ts', ['guides']);
 for (const locale of locales) {
  assert.equal(isLocale(locale), true);
  assert.deepEqual(Object.keys(translations[locale]).sort(), Array.from(translatedSlugs).sort());
  for (const slug of translatedSlugs) {
   const guide = guides.find(g => g.slug === slug); assert.ok(guide);
   const text = translations[locale][slug];
   for (const key of ['title','description','summary','location','setup','version']) assert.ok(text[key].length > 15, `${locale}/${slug}: ${key}`);
   assert.equal(text.sourceUpdatedAt, guide.updatedAt, 'Review translations when their English source changes');
   assert.ok(text.faq.length >= 3); assert.ok(text.targets.length >= 2);
   const body = source(`content/translations/${locale}/${slug}.mdx`);
   assert.ok(body.split(/\s+/).length > 250, `${locale}/${slug}: translate the full route`);
   assert.ok((body.match(/^## /gm) || []).length >= 5);
   assert.ok(!/^# /m.test(body), 'Page shell owns the only H1');
   assert.ok(!body.includes('<YouTubeEmbed'), 'Page shell owns the video');
  }
 }
 assert.equal(isLocale('fr'), false);
 assert.equal(languageAlternates('untranslated-guide'), undefined);
});

test('every language cluster includes self, reciprocal alternates and an English fallback', () => {
 for (const slug of [undefined, ...translatedSlugs]) {
  const links = languageAlternates(slug);
  assert.deepEqual(Object.keys(links).sort(), ['de','en','es','vi','x-default']);
  assert.equal(links.en, `${siteConfig.domain}/guides${slug ? `/${slug}` : ''}`);
  assert.equal(links['x-default'], links.en);
  for (const locale of locales) assert.equal(links[locale], `${siteConfig.domain}/${locale}${slug ? `/guides/${slug}` : ''}`);
 }
 for (const path of ['app/(english)/guides/page.tsx','app/(english)/guides/[slug]/page.tsx','app/[locale]/page.tsx','app/[locale]/guides/[slug]/page.tsx']) {
  assert.match(source(path), /languages: languageAlternates\(/);
  assert.match(source(path), /canonical:/);
  assert.match(source(path), /<LanguageLinks/);
 }
});

test('translated routes use native language markup, visible content, shared schema and sitemap discovery', () => {
 assert.match(source('components/SiteDocument.tsx'), /<html lang=\{locale\}/);
 assert.match(source('app/[locale]/layout.tsx'), /if \(!isLocale\(locale\)\) notFound\(\)/);
 const page = source('app/[locale]/guides/[slug]/page.tsx');
 assert.match(page, /language: locale/);
 assert.match(page, /videoObjectSchema\(/);
 assert.match(page, /<details[^>]*[\s\S]*<summary/);
 assert.match(page, /mdx.content/);
 assert.match(page, /canonical: url/);
 assert.match(source('app/sitemap.ts'), /\.\.\.localizedRoutes/);
 assert.match(source('app/sitemap.ts'), /translatedSlugs\.map/);
 const { articleSchema } = load('lib/schema.ts', ['articleSchema'], { siteConfig, URL });
 for (const locale of locales) assert.equal(articleSchema({title:'Title',description:'Description',slug:`/${locale}/guides/farm`,language:locale}).inLanguage, locale);
});
