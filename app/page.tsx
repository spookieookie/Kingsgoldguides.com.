import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VideoHero } from '@/components/home/VideoHero';
import { GuideCard } from '@/components/cards/GuideCard';
import { VideoCard } from '@/components/cards/VideoCard';
import { getAllGuides, getAllVideos } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.domain },
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: 'website', images: ['https://i.ytimg.com/vi/KvrQ1LJACWI/hqdefault.jpg'] },
};

export default function HomePage() {
  const guides = getAllGuides();
  const videos = getAllVideos();
  return (
    <main>
      <VideoHero videos={videos.slice(0, 3)} />
      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6" aria-labelledby="more-videos">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="more-videos" className="text-xl font-bold text-foreground">More from the channel</h2>
          <Link href="/videos" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">All videos <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.slice(3, 7).map((video) => <VideoCard key={video.slug} video={video} />)}
        </div>
      </section>
      <section className="border-t border-border bg-card/40" aria-labelledby="written-guides">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div><h2 id="written-guides" className="text-2xl font-bold text-foreground">Need the route?</h2><p className="mt-2 text-sm text-muted-foreground">The written guides are here when you need them.</p></div>
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">All gold guides <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{guides.slice(0, 6).map((guide) => <GuideCard key={guide.slug} guide={guide} />)}</div>
        </div>
      </section>
    </main>
  );
}
