'use client';

import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { trackVideoStart } from '@/lib/analytics';

export function YouTubeEmbed({ videoId, title = 'King K WoW gold farming video', loadPlayer = false }: { videoId: string; title?: string; loadPlayer?: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="mb-8 w-full">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-secondary">
        {loadPlayer || playing ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${playing ? 1 : 0}&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        ) : (
          <button type="button" aria-label={`Play ${title}`} onClick={() => { trackVideoStart(videoId, title); setPlaying(true); }} className="group absolute inset-0 h-full w-full text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" className="h-full w-full object-cover" />
            <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/30" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105"><Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" /></span>
          </button>
        )}
      </div>
      <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">Watch on YouTube <ExternalLink className="h-3 w-3" aria-hidden="true" /></a>
    </div>
  );
}

