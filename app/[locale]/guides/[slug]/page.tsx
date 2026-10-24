import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuide } from '@/lib/content';
import { translations } from '@/lib/content/translations';
import { getTranslatedGuide } from '@/lib/translated-mdx';
import { isLocale, localeCopy, languageAlternates, translatedSlugs, hasTranslation } from '@/lib/locales';
import { siteConfig } from '@/lib/site';
import { articleSchema, breadcrumbSchema, faqSchema, videoObjectSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { LanguageLinks } from '@/components/LanguageLinks';
import { YouTubeEmbed } from '@/components/guides/YouTubeEmbed';

type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return translatedSlugs.map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { locale, slug } = await params;
 if (!isLocale(locale) || !hasTranslation(slug)) return {};
 const text = translations[locale][slug]; const guide = getGuide(slug)!;
 const url = `${siteConfig.domain}/${locale}/guides/${slug}`;
 return {
  title: { absolute: `${text.title} | King K` }, description: text.description,
  alternates: { canonical: url, languages: languageAlternates(slug) },
  openGraph: { type: 'article', url, title: text.title, description: text.description, images: [guide.heroImage], locale: {es:'es_ES',de:'de_DE',vi:'vi_VN'}[locale], publishedTime: text.translatedAt, modifiedTime: text.translatedAt },
  twitter: { card: 'summary_large_image', title: text.title, description: text.description, images: [guide.heroImage] },
 };
}
export default async function TranslatedGuide({ params }: Props) {
 const { locale, slug } = await params;
 if (!isLocale(locale) || !hasTranslation(slug)) notFound();
 const guide = getGuide(slug); if (!guide) notFound();
 const text = translations[locale][slug]; const t = localeCopy[locale];
 const mdx = await getTranslatedGuide(locale, slug); if (!mdx) notFound();
 const pathname = `/${locale}/guides/${slug}`;
 const date = new Intl.DateTimeFormat(locale, { dateStyle:'long', timeZone:'UTC' }).format(new Date(text.translatedAt));
 const crumbs = [{ name: t.guides, url: `/${locale}` }, { name: text.title, url: pathname }];
 return <main className="min-h-screen bg-background">
  <JsonLd data={articleSchema({ title: text.title, description: text.description, slug: pathname, image: guide.heroImage, publishedAt: text.translatedAt, updatedAt: text.translatedAt, language: locale, youtubeVideoId: guide.youtubeVideoId, topics: text.targets, location: text.location })} />
  <JsonLd data={breadcrumbSchema(crumbs)} />
  <JsonLd data={faqSchema(text.faq)} />
  {guide.youtubeVideoId && <JsonLd data={videoObjectSchema({ name: guide.title, description: guide.metaDescription, youtubeVideoId: guide.youtubeVideoId, uploadDate: guide.videoUploadedAt ?? guide.publishedAt })} />}
  <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
   <nav aria-label={t.guides} className="text-sm text-muted-foreground"><Link href={`/${locale}`} className="hover:text-primary">{t.guides}</Link></nav>
   <header className="mt-6">
    <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">{text.title}</h1>
    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{text.description}</p>
    <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"><Link href={`/authors/${siteConfig.authorSlug}`} hrefLang="en" rel="author" className="underline underline-offset-4">{t.by}</Link><span>{t.updated}: <time dateTime={text.translatedAt}>{date}</time></span></p>
   </header>
   <LanguageLinks slug={slug} locale={locale} />
   <section aria-labelledby="farm-summary" className="my-8 rounded-xl border border-border bg-card p-5 sm:p-6">
    <h2 id="farm-summary" className="text-xl font-bold">{t.summary}</h2><p className="mt-3 leading-relaxed">{text.summary}</p>
    <dl className="mt-5 space-y-4 text-sm">
     <div><dt className="font-semibold text-primary">{t.location}</dt><dd className="mt-1 text-muted-foreground">{text.location}</dd></div>
     <div><dt className="font-semibold text-primary">{t.loot}</dt><dd className="mt-1 text-muted-foreground">{text.targets.join(', ')}</dd></div>
     <div><dt className="font-semibold text-primary">{t.setup}</dt><dd className="mt-1 text-muted-foreground">{text.setup}</dd></div>
    </dl><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{text.version}</p>
    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.translationNote} <Link href={`/guides/${slug}`} hrefLang="en" className="text-primary underline underline-offset-4">{t.original}</Link></p>
   </section>
   {guide.youtubeVideoId && <><YouTubeEmbed videoId={guide.youtubeVideoId} title={text.title} watchLabel={t.watch} playLabel={t.play} /><p className="-mt-4 mb-8 text-xs text-muted-foreground">{t.videoNote} {t.source}: <time dateTime={guide.videoUploadedAt}>{guide.videoUploadedAt}</time>.</p></>}
   <nav aria-label={t.contents} className="mb-8 rounded-xl border border-border bg-card p-5"><details><summary className="cursor-pointer font-semibold text-primary">{t.contents}</summary><ol className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">{mdx.headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`} className="text-muted-foreground underline underline-offset-4 hover:text-primary">{heading.text}</a></li>)}<li><a href="#farm-questions" className="text-primary underline underline-offset-4">{t.faq}</a></li></ol></details></nav>
   <div className="prose prose-invert max-w-none prose-headings:scroll-mt-28 prose-headings:font-bold prose-a:text-primary prose-strong:text-foreground">{mdx.content}</div>
   <section id="farm-questions" className="mt-12 scroll-mt-28"><h2 className="mb-6 text-2xl font-bold">{t.faq}</h2><div className="space-y-3">{text.faq.map(item => <details key={item.question} className="rounded-lg border border-border bg-card p-5"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="mt-3 leading-relaxed text-muted-foreground">{item.answer}</p></details>)}</div></section>
   <section className="mt-12 border-t border-border pt-8"><h2 className="text-2xl font-bold">{t.related}</h2>{translatedSlugs.filter(other => other !== slug).map(other => <Link key={other} href={`/${locale}/guides/${other}`} className="mt-4 block rounded-xl border border-border bg-card p-5 font-semibold text-primary hover:underline">{translations[locale][other].title}</Link>)}</section>
   <Link href={`/${locale}`} className="mt-10 inline-block text-sm text-primary hover:underline">← {t.guides}</Link>
  </article>
 </main>;
}
