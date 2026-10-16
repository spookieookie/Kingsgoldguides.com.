import Link from 'next/link';
import { Play } from 'lucide-react';
import type { VideoPage } from '@/lib/content/types';
import { cn } from '@/lib/utils';

export function VideoCard({ video, className }: { video: VideoPage; className?: string }) {
  return (
    <article className={cn('group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50', className)}>
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://i.ytimg.com/vi/${video.youtubeVideoId}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/75 text-white"><Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true" /></span>
        {video.duration && <span className="absolute bottom-3 right-3 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">{video.duration}</span>}
      </div>
      <div className="flex flex-1 flex-col p-4"><h3 className="text-base font-bold leading-snug text-foreground"><Link href={`/videos/${video.slug}`} className="after:absolute after:inset-0">{video.title}</Link></h3><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{video.excerpt}</p></div>
    </article>
  );
}
