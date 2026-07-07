import type { Metadata } from 'next';
import Link from 'next/link';
import { author, getGuide, getVideo } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, profilePageSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { GuideCard } from '@/components/cards/GuideCard';
import { VideoCard } from '@/components/cards/VideoCard';
import { Eyebrow, Panel, Tag } from '@/components/ui/kit';
import { Youtube, BarChart3, ArrowRight } from 'lucide-react';
import type { GuidePage, VideoPage } from '@/lib/content/types';

export const metadata: Metadata = {
  title: `${author.name} — ${author.role} | ${siteConfig.name}`,
  description: author.headline,
  alternates: { canonical: `${siteConfig.domain}/authors/${author.slug}` },
};

export default function AuthorPage() {
  const featuredGuides = author.featuredGuides
    .map((s) => getGuide(s))
    .filter((g): g is GuidePage => Boolean(g));
  const featuredVideos = author.featuredVideos
    .map((s) => getVideo(s))
    .filter((v): v is VideoPage => Boolean(v));

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Authors', href: '/authors/king-kunta' },
    { label: author.name, href: `/authors/${author.slug}` },
  ];

  return (
    <main className="min-h-screen bg-background">
      <JsonLd
        data={profilePageSchema({
          name: author.name,
          description: author.headline,
          slug: `/authors/${author.slug}`,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href })))} />

      <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs crumbs={crumbs} />

        {/* Profile header */}
        <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <BarChart3 className="h-9 w-9 text-primary" aria-hidden="true" />
          </div>
          <div>
            <Eyebrow className="mb-3">{author.role}</Eyebrow>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {author.name}
            </h1>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
              {author.headline}
            </p>
            <a
              href={author.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Youtube className="h-4 w-4" aria-hidden="true" />
              Watch on YouTube
            </a>
          </div>
        </header>

        {/* Bio */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">About {author.name}</h2>
          <div className="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            {author.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* Analyst angle */}
        <Panel className="mt-8 border-primary/25 bg-primary/5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
            The data-analyst angle
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-foreground">{author.angle}</p>
        </Panel>

        {/* Topics covered */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">Topics covered</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {author.topics.map((t) => (
              <Tag key={t} tone="muted">
                {t}
              </Tag>
            ))}
          </div>
        </section>

        {/* Featured videos */}
        {featuredVideos.length > 0 && (
          <section className="mt-12">
            <Eyebrow className="mb-4">Featured videos</Eyebrow>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Watch the breakdowns</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {featuredVideos.map((v) => (
                <VideoCard key={v.slug} video={v} />
              ))}
            </div>
          </section>
        )}

        {/* Featured guides */}
        {featuredGuides.length > 0 && (
          <section className="mt-12">
            <Eyebrow className="mb-4">Featured guides</Eyebrow>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Start with these</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {featuredGuides.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80"
          >
            More about the site <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
