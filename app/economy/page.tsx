import Link from 'next/link';
import type { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';
import { getHub, siteConfig } from '@/lib/site';
import { getGuidesByHub, dataBriefs } from '@/lib/content';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Eyebrow } from '@/components/ui/kit';
import { HubView } from '@/components/hub/HubView';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const hub = getHub('economy');

export const metadata: Metadata = {
  title: `${hub.label} — ${siteConfig.name}`,
  description: hub.description,
  alternates: { canonical: `${siteConfig.domain}/economy` },
};

export default function EconomyHubPage() {
  const guides = getGuidesByHub('economy');
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: hub.label, href: '/economy' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs.map((c) => ({ name: c.label, url: c.href })))} />

      <section className="bg-grid border-b border-border/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <Breadcrumbs crumbs={breadcrumbs} />
          <Eyebrow className="mb-4">{hub.tagline}</Eyebrow>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {hub.label}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {hub.description}
          </p>
        </div>
      </section>

      {/* Market briefs */}
      <section className="border-b border-border/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-8">
            <Eyebrow className="mb-3">Latest reads</Eyebrow>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Market briefs</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {dataBriefs.map((brief) => (
              <Link
                key={brief.slug}
                href={`/economy/${brief.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <TrendingUp className="mb-4 h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="text-pretty text-lg font-bold leading-snug text-foreground group-hover:text-primary">
                  {brief.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {brief.excerpt}
                </p>
                <span className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {brief.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Economy guides */}
      {guides.length > 0 && (
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-8">
            <Eyebrow className="mb-3">Deep dives</Eyebrow>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Economy guides</h2>
          </div>
          <HubView guides={guides} subcategories={hub.subcategories} />
        </div>
      )}
    </>
  );
}
