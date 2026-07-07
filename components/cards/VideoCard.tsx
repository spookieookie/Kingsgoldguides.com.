import Link from 'next/link';
import { Play } from 'lucide-react';
import type { VideoPage } from '@/lib/content/types';
import { getHub } from '@/lib/site';
import { Tag } from '@/components/ui/kit';
import { cn } from '@/lib/utils';

export function VideoCard({
  video,
  className,
}: {
  video: VideoPage;
  className?: string;
}) {
  const hub = getHub(video.hub);
  const thumb = `https://i.ytimg.com/vi/${video.youtubeVideoId}/hqdefault.jpg`;
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40',
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb || "/placeholder.svg"}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-background/80 text-primary">
            <Play className="h-5 w-5 translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-background/85 px-1.5 py-0.5 font-mono text-xs text-foreground">
          {video.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <Tag tone="gold">{hub.shortName}</Tag>
        </div>
        <h3 className="text-pretty text-base font-bold leading-snug text-foreground">
          <Link href={`/videos/${video.slug}`} className="after:absolute after:inset-0">
            {video.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {video.excerpt}
        </p>
      </div>
    </article>
  );
}
