import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { guideGroups, getGuideGroup } from '@/lib/guide-groups';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { GuideCard } from '@/components/cards/GuideCard';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: 'Browse WoW gold guides by content: farming, transmog and rare drops, or auction house and crafting.',
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
      <header className="border-b border-border/60 bg-grid">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Gold Guides</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Choose a farm or gold-making method. Each guide covers where to go, what to do, and how to sell what you earn.
          </p>
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
