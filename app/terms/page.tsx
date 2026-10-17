import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/PolicyPage';
import { siteConfig } from '@/lib/site';
export const metadata: Metadata = { title: { absolute: "Terms of Use | Kings Gold Guides" }, description: 'Using the guides, videos, and information on Kings Gold Guides.', alternates: { canonical: `${siteConfig.domain}/terms` } };
export default function TermsPage() {
  return <PolicyPage title="Terms & Disclosures" path="/terms">
    <h2>Using the guides</h2><p>These guides explain farms and methods shown in King K’s World of Warcraft videos. They are information you can use to decide what to try. They do not guarantee a drop, a sale, or a particular amount of gold.</p>
    <h2>Prices and game changes</h2><p>Video titles, item values, and example totals may reflect the game and market when a video was recorded. Check the version you play and your auction house before spending gold or committing time. Listing an item for a price does not mean it will sell for that price.</p>
    <h2>Content and game ownership</h2><p>The original videos and written guides belong to their respective creators. You may link to them and share short excerpts with attribution. Please ask before republishing full guides or videos. World of Warcraft, its game assets, and its trademarks belong to Blizzard Entertainment. This is an independent fan site and is not affiliated with or endorsed by Blizzard.</p>
    <h2>Advertising and links</h2><p>Google ads are not currently running here. A future sponsored post or affiliate link will be identified where it appears. Links to other websites follow those sites’ own terms and privacy rules.</p>
    <h2>Corrections</h2><p>If a route has changed or something in a guide is wrong, use the <Link href="/contact">Contact page</Link> to point me to the relevant video or guide. Read <Link href="/editorial">About These Guides</Link> for how the content is put together.</p>
  </PolicyPage>;
}

