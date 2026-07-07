import type { Metadata } from 'next';
import Link from 'next/link';
import { darkmoonFirewater as df } from '@/lib/content/flagship';
import { getGuide, getRelatedVideos } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { YouTubeEmbed } from '@/components/guides/YouTubeEmbed';
import { FAQAccordion } from '@/components/guides/FAQAccordion';
import { EmailCaptureForm } from '@/components/guides/EmailCaptureForm';
import { GuideCard } from '@/components/cards/GuideCard';
import { VideoCard } from '@/components/cards/VideoCard';
import { Eyebrow, Panel, Tag } from '@/components/ui/kit';
import { formatDate } from '@/lib/format';
import { Flame, ShoppingCart, MapPin, TrendingUp, CalendarClock, Lightbulb, ArrowRight } from 'lucide-react';
import type { GuidePage } from '@/lib/content/types';

export const metadata: Metadata = {
  title: `${df.seoTitle} | ${siteConfig.name}`,
  description: df.metaDescription,
  alternates: { canonical: `${siteConfig.domain}/economy/${df.slug}` },
  openGraph: {
    title: df.seoTitle,
    description: df.metaDescription,
    type: 'article',
    publishedTime: df.publishedAt,
    modifiedTime: df.updatedAt,
  },
};

const timingBlocks = [
  { key: 'buy', label: 'Best time to buy', icon: ShoppingCart },
  { key: 'farm', label: 'Best time to farm with it', icon: MapPin },
  { key: 'sell', label: 'Best time to sell', icon: TrendingUp },
] as const;

export default function DarkmoonFirewaterPage() {
  const relatedGuides = df.relatedGuides
    .map((s) => getGuide(s))
    .filter((g): g is GuidePage => Boolean(g));
  const relatedVideos = getRelatedVideos(df.relatedVideos, 2);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Economy', href: '/economy' },
    { label: df.itemName, href: `/economy/${df.slug}` },
  ];

  const toc = [
    { id: 'why', label: 'Why it matters' },
    { id: 'uses', label: 'Use cases' },
    { id: 'timing', label: 'Buy / farm / sell timing' },
    { id: 'event', label: 'Event timing angle' },
    { id: 'notes', label: 'Analyst notes' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <JsonLd
        data={articleSchema({
          title: df.seoTitle,
          description: df.metaDescription,
          slug: `/economy/${df.slug}`,
          image: df.heroImage,
          publishedAt: df.publishedAt,
          updatedAt: df.updatedAt,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href })))} />
      <JsonLd data={faqSchema(df.faq)} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Breadcrumbs crumbs={crumbs} />

        {/* Hero summary */}
        <header className="mt-6">
          <Eyebrow className="mb-4">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" /> Flagship entity
          </Eyebrow>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Tag tone="gold">{df.tagline}</Tag>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {df.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {df.heroSummary}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            By {siteConfig.name} / Updated {formatDate(df.updatedAt)}
          </p>
        </header>

        {/* Table of contents */}
        <nav aria-label="On this page" className="mt-8">
          <Panel className="bg-card/60">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              On this page
            </span>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-sm text-primary hover:text-primary/80">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </Panel>
        </nav>

        <div className="mt-8">
          <YouTubeEmbed videoId={df.youtubeVideoId} title={df.title} />
        </div>

        {/* Why it matters */}
        <section id="why" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Why it matters for gold-makers</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {df.whyItMatters.map((w) => (
              <Panel key={w.title}>
                <h3 className="text-lg font-bold text-primary">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </Panel>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section id="uses" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Use cases</h2>
          <ul className="mt-4 space-y-2">
            {df.useCases.map((u) => (
              <li key={u} className="flex items-start gap-2 text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span className="leading-relaxed">{u}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Timing */}
        <section id="timing" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Best times to buy, farm &amp; sell</h2>
          <div className="mt-5 space-y-4">
            {timingBlocks.map(({ key, label, icon: Icon }) => (
              <Panel key={key} className="flex gap-4">
                <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">{df.timing[key]}</p>
                </div>
              </Panel>
            ))}
          </div>
        </section>

        {/* Event angle */}
        <section id="event" className="mt-12 scroll-mt-24">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <CalendarClock className="h-6 w-6 text-primary" aria-hidden="true" />
            Event timing angle
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{df.eventAngle}</p>
          <Link
            href="/tools/darkmoon-event-timer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-primary/80"
          >
            Open the Darkmoon event timer <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </section>

        {/* Analyst notes */}
        <section id="notes" className="mt-12 scroll-mt-24">
          <Panel className="border-primary/25 bg-primary/5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
              Analyst notes
            </h2>
            <ul className="mt-4 space-y-3">
              {df.analystNotes.map((n) => (
                <li key={n} className="text-sm leading-relaxed text-foreground">
                  {n}
                </li>
              ))}
            </ul>
          </Panel>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-24">
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Frequently asked questions</h2>
          <FAQAccordion items={df.faq} />
        </section>

        <div className="mt-12">
          <EmailCaptureForm />
        </div>

        {/* Related videos */}
        {relatedVideos.length > 0 && (
          <section className="mt-14">
            <Eyebrow className="mb-4">Watch</Eyebrow>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Related videos</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedVideos.map((v) => (
                <VideoCard key={v.slug} video={v} />
              ))}
            </div>
          </section>
        )}

        {/* Related guides */}
        {relatedGuides.length > 0 && (
          <section className="mt-14 border-t border-border pt-10">
            <Eyebrow className="mb-4">Related reading</Eyebrow>
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Related farming &amp; economy guides
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {relatedGuides.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
