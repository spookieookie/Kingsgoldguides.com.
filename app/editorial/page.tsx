import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/PolicyPage';
import { siteConfig } from '@/lib/site';
export const metadata: Metadata = { title: { absolute: siteConfig.name }, description: 'Where the guides come from and how King K handles old videos, prices, and corrections.', alternates: { canonical: `${siteConfig.domain}/editorial` } };
export default function EditorialPage() {
 return <PolicyPage title="About These Guides" path="/editorial">
  <p>These are the written versions of my gold farming videos. Every guide in the library links to its source video so you can see the farm for yourself.</p>
  <h2>What a guide should tell you</h2><p>Where to go, what to kill or gather, what is worth checking, and anything you need before you start. If I am talking about buying and selling, the guide should explain what price I am looking at and why.</p>
  <h2>Old videos and prices</h2><p>Some of these videos go back several expansions. The route may still be useful even when the price in the title is old. Dates on a guide do not mean the farm has been tested again on the current patch. Check your game version, the item, and your server’s market before you spend a whole evening on it.</p>
  <h2>Gold in your bags versus auction house value</h2><p>Vendor gold is straightforward. An item’s auction house value is different: you still need someone to buy it. I want those two things to be clear when you decide whether a farm is worth doing.</p>
  <h2>Writing and updates</h2><p>The site uses written summaries of the videos to make routes easier to find. The source video is there for the gameplay and original context. Corrections should change the specific information that is wrong rather than just changing a date or calling an old farm new.</p>
  <h2>Found something wrong?</h2><p>Tell me which guide, what changed, and which version of WoW you are playing. The <Link href="/contact">Contact page</Link> takes you to the channel.</p>
 </PolicyPage>;
}
