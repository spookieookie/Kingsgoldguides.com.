import Link from 'next/link';
import { hasTranslation, locales, localeNames, localeCopy, type Locale } from '@/lib/locales';

export function LanguageLinks({ slug, locale = 'en' }: { slug?: string; locale?: Locale | 'en' }) {
 if (slug && !hasTranslation(slug)) return null;
 const label = locale === 'en' ? 'Language' : localeCopy[locale].languages;
 return <nav aria-label={label} className="my-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
  <span className="text-muted-foreground">{label}:</span>
  {(['en', ...locales] as const).map(language => {
   const href = language === 'en' ? `/guides${slug ? `/${slug}` : ''}` : `/${language}${slug ? `/guides/${slug}` : ''}`;
   return <Link key={language} href={href} hrefLang={language} lang={language} aria-current={language === locale ? 'page' : undefined} className="text-primary underline underline-offset-4 aria-[current=page]:font-bold">{localeNames[language]}</Link>;
  })}
 </nav>;
}
