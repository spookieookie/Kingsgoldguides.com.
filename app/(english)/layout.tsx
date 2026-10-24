import { SiteDocument, siteMetadata, siteViewport } from '@/components/SiteDocument';
export const metadata = siteMetadata;
export const viewport = siteViewport;
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
 return <SiteDocument>{children}</SiteDocument>;
}
