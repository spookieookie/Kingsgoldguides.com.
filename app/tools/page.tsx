import type { Metadata } from 'next';
import Link from 'next/link';
import { tools } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Panel, Eyebrow } from '@/components/ui/kit';
import { Calculator, Target, BarChart3, Calendar, ArrowRight, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: `Gold Tools | ${siteConfig.name}`,
  description:
    'Lightweight, content-supporting calculators for WoW gold-making: gold-per-hour, sale-rate & risk, farm comparison, and a Darkmoon Faire event timer.',
  alternates: { canonical: `${siteConfig.domain}/tools` },
};

const icons: Record<string, LucideIcon> = {
  Calculator,
  Target,
  BarChart3,
  Calendar,
};

export default function ToolsPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href })))} />
      <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs crumbs={crumbs} />
        <header className="mt-6 max-w-2xl">
          <Eyebrow className="mb-3">Free utilities</Eyebrow>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Gold Tools
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Lightweight calculators that back up the analysis on the site. No sign-up, no fluff —
            just quick math to help you compare farms and time the market.
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => {
            const Icon = icons[tool.icon] ?? Calculator;
            return (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group">
                <Panel className="h-full hover:border-primary">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="text-lg font-bold text-foreground group-hover:text-primary">
                      {tool.title}
                    </h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary">
                    Open tool <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Panel>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
