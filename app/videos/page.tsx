import type { Metadata } from 'next';
import { getAllVideos } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { VideoCard } from '@/components/cards/VideoCard';
import { Eyebrow } from '@/components/ui/kit';

export const metadata: Metadata = {
  title: `Video Library | ${siteConfig.name}`,
  description:
    'Every King Kunta gold-making breakdown in one place — farming routes, auction house strategy, and economy analysis pulled straight from the channel.',
  alternates: { canonical: `${siteConfig.domain}/videos` },
};

export default function VideosPage() {
  const videos = getAllVideos();
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Videos', href: '/videos' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href })))} />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs crumbs={crumbs} />
        <header className="mt-6 max-w-2xl">
          <Eyebrow className="mb-3">Watch &amp; learn</Eyebrow>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Video Library
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Every gold-making breakdown from the channel, each paired with a written companion guide
            so you can farm along at your own pace.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {videos.length} videos
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <VideoCard key={v.slug} video={v} />
          ))}
        </div>
      </div>
    </main>
  );
}
