import { notFound } from 'next/navigation';
import { SiteDocument, siteMetadata, siteViewport } from '@/components/SiteDocument';
import { locales, isLocale } from '@/lib/locales';
export const metadata = siteMetadata;
export const viewport = siteViewport;
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default async function LocalizedLayout({ children, params }: { children: React.ReactNode; params: Promise<{locale: string}> }) {
 const { locale } = await params;
 if (!isLocale(locale)) notFound();
 return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
