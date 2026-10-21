import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { guideGroups, getGuideGroup } from '@/lib/guide-groups';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { GuideCard } from '@/components/cards/GuideCard';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, guideCollectionSchema } from '@/lib/schema';
import { farmFacts } from '@/lib/content/farm-facts';

export const metadata: Metadata = {
  title: { absolute: 'WoW Gold Farming Guides & Routes | King K' },
  description: 'Compare World of Warcraft gold farms by location, loot, and setup. Find Volatile Air, Primal Water, cloth, rare weapons, and transmog routes with King K.',
  alternates: { canonical: `${siteConfig.domain}/guides` },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();
  const groups = guideGroups.map((group) => ({
    ...group,
    guides: guides.filter((guide) => getGuideGroup(guide).key === group.key),
  })).filter((group) => group.guides.length > 0);
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Gold Guides', href: '/guides' }];
  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={breadcrumbSchema(crumbs.map((crumb) => ({ name: crumb.label, url: crumb.href })))} />
      <JsonLd data={guideCollectionSchema(guides)} />
      <header className="border-b border-border/60 bg-grid">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">World of Warcraft Gold Farming Guides</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Pick a farm. I'll show you where to go, what drops, and what I would keep for the auction house.
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            Looking for materials? Start with Volatile Air, Primal Water, or the cloth routes. If you're hunting rare weapons or transmog, check the item listings first and allow time for a buyer. These are the written routes from my videos; an old gold total is not a current hourly rate.
          </p>
          <Link href="#compare-farms" className="mt-5 inline-block font-semibold text-primary underline underline-offset-4 hover:text-primary/80">Compare farm locations and loot</Link>
          <nav aria-label="Jump to a guide group" className="mt-6 flex flex-wrap gap-2">
            {groups.map((group) => (
              <Link key={group.key} href={`#${group.key}`} className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary">
                {group.name} <span className="ml-1 text-muted-foreground">({group.guides.length})</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl space-y-14 px-4 py-12 md:px-6 md:py-16">
        <section id="compare-farms" aria-labelledby="compare-farms-title" className="scroll-mt-28">
          <h2 id="compare-farms-title" className="text-2xl font-bold text-foreground">Which WoW gold farm should I try?</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Pick the item you want to farm, check the setup, then open the full route. Material farms still need auction house buyers. Rare-drop farms also need the item to drop.</p>
          <p id="farm-table-note" className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">These locations come from the source videos. Check your version of WoW before making the trip. An expansion label describes the content, and does not mean the farm was retested on the current patch.</p>
          <div role="region" aria-label="Gold farm comparison" aria-describedby="farm-table-note" tabIndex={0} className="mt-6 overflow-x-auto rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-primary">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">WoW gold farms: written route, location, main loot, and setup</caption>
              <thead className="border-b border-border bg-secondary/70 text-foreground">
                <tr>{['Farm and route', 'Where to go', 'What to keep', 'Before you go'].map((label) => <th key={label} scope="col" className="px-4 py-4 font-semibold">{label}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {guides.map((guide) => {
                  const facts = farmFacts[guide.slug];
                  if (!facts) return null;
                  return <tr key={guide.slug} className="align-top even:bg-card/50">
                    <th scope="row" className="w-1/4 px-4 py-4 font-semibold"><Link href={`/guides/${guide.slug}`} className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{guide.title}</Link></th>
                    <td className="w-1/5 px-4 py-4 leading-relaxed text-muted-foreground">{facts.location}</td>
                    <td className="w-1/4 px-4 py-4 leading-relaxed text-foreground">{facts.targets.join(', ')}</td>
                    <td className="px-4 py-4 leading-relaxed text-muted-foreground">{facts.beforeYouGo}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        </section>
        <section aria-labelledby="choose-farm-title" className="rounded-xl border border-border bg-card p-5 sm:p-7">
          <h2 id="choose-farm-title" className="text-2xl font-bold text-foreground">Find a farm for what you need</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div><h3 className="font-bold text-foreground">Where can I farm Volatile Air?</h3><p className="mt-2 leading-relaxed text-muted-foreground">Try the <Link href="/guides/vortex-pinnacle-volatile-air-farm" className="text-primary underline underline-offset-4">Vortex Pinnacle route in Uldum</Link>, or the <Link href="/guides/firelands-volatile-farm" className="text-primary underline underline-offset-4">Firelands trash route in Mount Hyjal</Link> with Potion of Treasure Finding. Check resets in Vortex Pinnacle and leave the Firelands bosses alive.</p></div>
            <div><h3 className="font-bold text-foreground">Where can I farm Mageweave and Runecloth?</h3><p className="mt-2 leading-relaxed text-muted-foreground">The <Link href="/guides/burning-steppes-mageweave-runecloth-farm" className="text-primary underline underline-offset-4">Burning Steppes cloth route</Link> covers four groups worked counterclockwise with AoE. Keep the cloth earnings separate from any transmog you decide to list.</p></div>
            <div><h3 className="font-bold text-foreground">Is there a farm for a rogue?</h3><p className="mt-2 leading-relaxed text-muted-foreground">The <Link href="/guides/uldum-loaded-gnomish-dice-farm" className="text-primary underline underline-offset-4">Loaded Gnomish Dice route in Uldum</Link> uses Stealth, Sap, and Pick Pocket. Pickpocket each group before killing it. The dice are a rare toy, so the old hourly projection is not a regular payout.</p></div>
            <div><h3 className="font-bold text-foreground">Does a high auction price mean a farm makes that much gold?</h3><p className="mt-2 leading-relaxed text-muted-foreground">You still need the drop and a buyer. I keep item listings, completed sales, and vendor gold separate. Read <Link href="/editorial" className="text-primary underline underline-offset-4">how I handle gold claims and older recordings</Link> before comparing the numbers in video titles.</p></div>
          </div>
        </section>
        {groups.map((group) => (
          <section key={group.key} id={group.key} aria-labelledby={`${group.key}-title`} className="scroll-mt-28">
            <h2 id={`${group.key}-title`} className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{group.name}</h2>
            <p className="mt-2 text-muted-foreground">{group.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.guides.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

