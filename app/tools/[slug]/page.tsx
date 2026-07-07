import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tools, getTool } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Eyebrow } from '@/components/ui/kit';
import { GoldPerHourCalculator } from '@/components/tools/GoldPerHourCalculator';
import { SaleRateRiskEstimator } from '@/components/tools/SaleRateRiskEstimator';
import { FarmComparison } from '@/components/tools/FarmComparison';
import { DarkmoonEventTimer } from '@/components/tools/DarkmoonEventTimer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: `${tool.title} | ${siteConfig.name}`,
    description: tool.description,
    alternates: { canonical: `${siteConfig.domain}/tools/${tool.slug}` },
  };
}

function ToolWidget({ slug }: { slug: string }) {
  switch (slug) {
    case 'gold-per-hour-calculator':
      return <GoldPerHourCalculator />;
    case 'sale-rate-risk-estimator':
      return <SaleRateRiskEstimator />;
    case 'farm-comparison':
      return <FarmComparison />;
    case 'darkmoon-event-timer':
      return <DarkmoonEventTimer />;
    default:
      return null;
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
    { label: tool.title, href: `/tools/${tool.slug}` },
  ];

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href })))} />
      <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs crumbs={crumbs} />
        <header className="mt-6">
          <Eyebrow className="mb-3">{tool.tagline}</Eyebrow>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {tool.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {tool.description}
          </p>
        </header>

        <div className="mt-10">
          <ToolWidget slug={tool.slug} />
        </div>

        <div className="mt-12">
          <Link
            href="/tools"
            className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80"
          >
            ← All tools
          </Link>
        </div>
      </div>
    </main>
  );
}
