import type { Metadata } from 'next';
import Link from 'next/link';
import { author } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Panel, Eyebrow } from '@/components/ui/kit';
import { BarChart3, FlaskConical, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description:
    'King Kunta WoW Gold applies a data-analyst mindset to the World of Warcraft economy — testing every method in-game and explaining why margins rise or collapse.',
  alternates: { canonical: `${siteConfig.domain}/about` },
};

const principles = [
  {
    icon: FlaskConical,
    title: 'Tested in-game',
    body: 'Every method is run on live servers and filmed for the channel before it becomes a guide. No theory-crafted numbers.',
  },
  {
    icon: BarChart3,
    title: 'Analyst-first',
    body: 'The focus is sell-through, timing, and risk — why a margin exists and what market condition keeps it alive.',
  },
  {
    icon: Clock,
    title: 'Timing-aware',
    body: 'Markets move on patch cycles and events. Guides call out the best windows to farm and to sell, not just the route.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest about risk',
    body: 'Gold-per-hour ranges, setup cost, sale speed, and risk are stated up front so you can pick methods that fit you.',
  },
];

export default function AboutPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href })))} />
      <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs crumbs={crumbs} />

        <header className="mt-6">
          <Eyebrow className="mb-3">About the site</Eyebrow>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Gold-making, analyzed like data
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {siteConfig.fullName} is a WoW gold-making resource built by {author.name}, a{' '}
            {author.role.toLowerCase()}. The premise is simple: most guides tell you how to farm —
            this one explains why the market pays, when it stops, and how to time it.
          </p>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-foreground">What makes this different</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{author.angle}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {principles.map((p) => (
              <Panel key={p.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Panel>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-foreground">What we cover</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            The site is organized into silos so you can go as deep as you want: farming routes,
            auction house flipping, WoW economy analysis, professions for gold, and rare/transmog
            farms — plus a flagship breakdown of event economics around the Darkmoon Faire.
          </p>
        </section>

        <Panel className="mt-10 border-primary/25 bg-primary/5">
          <h2 className="text-lg font-bold text-foreground">Meet the analyst</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {author.headline} Read the full background, topics covered, and featured breakdowns on
            the author page.
          </p>
          <Link
            href="/authors/king-kunta"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-primary/80"
          >
            About {author.name} <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </Panel>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/guides"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse the gold guides
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
}
