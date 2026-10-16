import Link from 'next/link';
import { Play } from 'lucide-react';
import type { VideoPage } from '@/lib/content/types';

export function VideoHero({ videos }: { videos: VideoPage[] }) {
  const [featured, ...next] = videos;
  if (!featured) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-6 md:px-6 md:pt-8" aria-labelledby="home-title">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">King K</p><h1 id="home-title" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">WoW Gold Farming</h1></div>
        <p className="text-sm text-muted-foreground">Farms, rare drops, and the occasional auction house flip.</p>
      </header>
      <div className="grid gap-5 lg:grid-cols-3">
        <article className="group relative overflow-hidden rounded-xl border border-border bg-card lg:col-span-2">
          <Link href={`/videos/${featured.slug}`} className="relative block aspect-video overflow-hidden" aria-label={`Watch ${featured.title}`}>
            {/* These are the channel's original YouTube thumbnails. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${featured.youtubeVideoId}/hqdefault.jpg`} alt={featured.title} fetchPriority="high" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/5 to-transparent" />
            <span className="absolute left-4 top-4 rounded bg-black/75 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Latest video</span>
            <span className="absolute left-1/2 top-[40%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" /></span>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7"><h2 className="max-w-2xl text-xl font-bold leading-tight text-white md:text-3xl">{featured.title}</h2><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"><Play className="h-4 w-4" fill="currentColor" aria-hidden="true" /> Watch the video</span></div>
          </Link>
        </article>
        <div className="relative">
          <div className="grid gap-5 sm:grid-cols-2 lg:absolute lg:inset-0 lg:grid-cols-1 lg:grid-rows-2">
          {next.map((video) => (
            <article key={video.slug} className="group relative overflow-hidden rounded-xl border border-border bg-card">
              <Link href={`/videos/${video.slug}`} className="relative block aspect-video overflow-hidden lg:aspect-auto lg:h-full" aria-label={`Watch ${video.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${video.youtubeVideoId}/hqdefault.jpg`} alt={video.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"><Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true" /></span>
                <h2 className="absolute inset-x-0 bottom-0 p-4 text-base font-bold leading-snug text-white">{video.title}</h2>
              </Link>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
