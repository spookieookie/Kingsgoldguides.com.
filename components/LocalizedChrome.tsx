import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { CookieSettingsButton } from '@/components/CookieSettingsButton';
import { localeCopy, type Locale } from '@/lib/locales';
import { LanguageLinks } from '@/components/LanguageLinks';
import { siteConfig } from '@/lib/site';

export function LocalizedHeader({ locale }: { locale: Locale }) {
 const t = localeCopy[locale];
 return <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
  <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
   <Link href={`/${locale}`} aria-label={`${siteConfig.name} — ${t.home}`}><Logo tagline={t.title} /></Link>
   <nav aria-label={t.guides} className="flex flex-wrap gap-5 text-sm"><Link href={`/${locale}`} className="hover:text-primary">{t.guides}</Link><Link href="/videos" hrefLang="en" className="hover:text-primary">{t.videos}</Link></nav>
  </div>
 </header>;
}
export function LocalizedFooter({ locale }: { locale: Locale }) {
 const t = localeCopy[locale];
 return <footer className="border-t border-border bg-secondary"><div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
  <Logo tagline={t.title} /><LanguageLinks locale={locale} />
  <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
   {([['/about', t.about], ['/contact', t.contact], ['/privacy', t.privacy], ['/terms', t.terms]] as const).map(([href,label]) => <Link key={href} href={href} hrefLang="en" className="hover:text-primary">{label} ({t.english})</Link>)}
   <CookieSettingsButton label={t.settings} /><a href={siteConfig.youtube} rel="noopener noreferrer" target="_blank">YouTube</a>
  </div><p className="mt-5 text-xs leading-relaxed text-muted-foreground">© {new Date().getFullYear()} {siteConfig.fullName}. {t.legal}</p>
 </div></footer>;
}
