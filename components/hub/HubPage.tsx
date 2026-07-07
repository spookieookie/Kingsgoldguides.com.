import Link from 'next/link';
import type { Metadata } from 'next';
import { getHub, siteConfig, type HubKey } from '@/lib/site';
import { getGuidesByHub, getVideosByHub } from '@/lib/content';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Eyebrow } from '@/components/ui/kit';
import { VideoCard } from '@/components/cards/VideoCard';
import { HubView } from '@/components/hub/HubView';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export function hubMetadata(hubKey: HubKey): Metadata {
  const hub = getHub(hubKey);
  const title = `${hub.label} — ${siteConfig.name}`;
  return {
    title,
    description: hub.description,
    alternates: { canonical: `${siteConfig.domain}${hub.href}` },
    openGraph: { title, description: hub.description, type: 'website' },
  };
}

export function HubPage({ hubKey }: { hubKey: HubKey }) {
  const hub = getHub(hubKey);
  const guides = getGuidesByHub(hubKey);
  const videos = getVideosByHub(hubKey).slice(0, 4);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: hub.label, href: hub.href },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          breadcrumbs.map((c) => ({ name: c.label, url: c.href })),
        )}
      />

      {/* Hub header */}
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
          <div className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span>
              <span className="text-foreground">{guides.length}</span> guides
            </span>
            <span aria-hidden="true">/</span>
            <span>
              <span className="text-foreground">{videos.length}</span> videos
            </span>
          </div>
        </div>
      </section>

      {/* Guides + filters */}
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <HubView guides={guides} subcategories={hub.subcategories} />
      </div>

      {/* Related videos */}
      {videos.length > 0 && (
        <section className="border-t border-border/60 bg-grid">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <Eyebrow className="mb-3">Watch</Eyebrow>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  {hub.navLabel} on video
                </h2>
              </div>
              <Link
                href="/videos"
                className="font-mono text-xs uppercase tracking-wider text-primary hover:text-primary/80"
              >
                All videos →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((video) => (
                <VideoCard key={video.slug} video={video} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
