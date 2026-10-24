import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { VideoHero } from '@/components/home/VideoHero';
import { GuideCard } from '@/components/cards/GuideCard';
import { VideoCard } from '@/components/cards/VideoCard';
import { getAllGuides, getAllVideos, getVideo } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: { absolute: 'WoW Gold Farming Guides & Videos | King K' },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.domain },
  openGraph: { title: 'WoW Gold Farming Guides & Videos | King K', description: siteConfig.description, type: 'website', images: [`https://i.ytimg.com/vi/${getAllVideos()[0].youtubeVideoId}/hqdefault.jpg`] },
};

export default function HomePage() {
  const guides = getAllGuides();
  const videos = getAllVideos();
  const [latestGuide] = guides;
  const guideVideo = latestGuide ? getVideo(latestGuide.youtubeVideoId) : undefined;
  return (
    <main>
      <VideoHero videos={videos.slice(0, 3)} />
      {latestGuide && (
        <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6" aria-labelledby="latest-guide-title">
          <article className="rounded-xl border border-primary/25 bg-primary/5 p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-primary">
              <span>Latest guide</span>
              <time dateTime={latestGuide.publishedAt} className="font-normal text-muted-foreground">{formatDate(latestGuide.publishedAt)}</time>
            </div>
            <h2 id="latest-guide-title" className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Link href={`/guides/${latestGuide.slug}`} className="transition-colors hover:text-primary">{latestGuide.title}</Link>
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{latestGuide.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
              <Link href={`/guides/${latestGuide.slug}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80">Read the guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              {guideVideo && <Link href={`/videos/${guideVideo.slug}`} className="inline-flex items-center gap-2 text-foreground hover:text-primary"><Play className="h-4 w-4" aria-hidden="true" />Watch the video</Link>}
            </div>
          </article>
        </section>
      )}
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
            <div><h2 id="written-guides" className="text-2xl font-bold text-foreground">Find your next WoW gold farm</h2><p className="mt-2 text-sm text-muted-foreground">Compare locations, loot, and setup in the <Link href="/guides#compare-farms" className="text-primary underline underline-offset-4">gold farming guide library</Link>, or open a written route below.</p></div>
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">All gold guides <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{guides.slice(0, 6).map((guide) => <GuideCard key={guide.slug} guide={guide} />)}</div>
        </div>
      </section>
    </main>
  );
}

