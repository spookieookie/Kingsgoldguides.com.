import type { Metadata } from 'next';
import { getAllGuides } from '@/lib/content';
import { getHub, hubs, siteConfig } from '@/lib/site';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Eyebrow } from '@/components/ui/kit';
import { HubView } from '@/components/hub/HubView';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const hub = getHub('gold-guides');

export const metadata: Metadata = {
  title: `${hub.label} — Every WoW Gold Method | ${siteConfig.name}`,
  description: hub.description,
  alternates: { canonical: `${siteConfig.domain}/guides` },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();
  // Filter chips = the six silos, so the master index cross-navigates by hub.
  const hubFilters = hubs.map((h) => h.name);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: hub.label, href: '/guides' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs.map((c) => ({ name: c.label, url: c.href })))} />

      <section className="bg-grid border-b border-border/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <Breadcrumbs crumbs={breadcrumbs} />
          <Eyebrow className="mb-4">{hub.tagline}</Eyebrow>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Every WoW gold-making method, in one index
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {hub.description}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="text-foreground">{guides.length}</span> guides across{' '}
            <span className="text-foreground">{hubs.length}</span> silos
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <HubView guides={guides} subcategories={hubFilters} />
      </div>
    </>
  );
}
