import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localeCopy, languageAlternates, translatedSlugs } from '@/lib/locales';
import { translations } from '@/lib/content/translations';
import { getGuide } from '@/lib/content';
import { LanguageLinks } from '@/components/LanguageLinks';
import { siteConfig } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { locale } = await params;
 if (!isLocale(locale)) return {};
 const t = localeCopy[locale];
 return {
  title: { absolute: `${t.title} | King K` }, description: t.intro,
  alternates: { canonical: `${siteConfig.domain}/${locale}`, languages: languageAlternates() },
  openGraph: { type: 'website', url: `${siteConfig.domain}/${locale}`, title: t.title, description: t.intro, locale: {es:'es_ES',de:'de_DE',vi:'vi_VN'}[locale] },
  twitter: { card: 'summary_large_image', title: t.title, description: t.intro },
 };
}
export default async function LocaleIndex({ params }: Props) {
 const { locale } = await params;
 if (!isLocale(locale)) notFound();
 const t = localeCopy[locale];
 return <main className="min-h-screen bg-background">
  <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${siteConfig.domain}/${locale}#collection`, url: `${siteConfig.domain}/${locale}`, name: t.title, description: t.intro, inLanguage: locale, mainEntity: { '@type': 'ItemList', numberOfItems: translatedSlugs.length, itemListElement: translatedSlugs.map((slug, i) => ({ '@type':'ListItem', position:i+1, name:translations[locale][slug].title, url:`${siteConfig.domain}/${locale}/guides/${slug}` })) } }} />
  <header className="border-b border-border/60 bg-grid"><div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
   <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
   <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.intro}</p>
   <LanguageLinks locale={locale} />
  </div></header>
  <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 md:px-6">
   {translatedSlugs.map(slug => { const guide = getGuide(slug)!; const text = translations[locale][slug]; return <article key={slug} className="overflow-hidden rounded-xl border border-border bg-card">
    <Link href={`/${locale}/guides/${slug}`} className="block hover:text-primary">
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src={guide.heroImage} alt="" width={480} height={360} className="aspect-video w-full object-cover" />
     <div className="p-6"><h2 className="text-xl font-bold">{text.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text.description}</p></div>
    </Link>
   </article>; })}
  </div>
 </main>;
}
