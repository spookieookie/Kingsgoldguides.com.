import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { GuidePage } from '@/lib/content/types';
import { getGuideGroup } from '@/lib/guide-groups';
import { cn } from '@/lib/utils';

export function GuideCard({ guide, className }: { guide: GuidePage; className?: string }) {
  const group = getGuideGroup(guide);
  return (
    <article className={cn('group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50', className)}>
      <div className="aspect-video overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://i.ytimg.com/vi/${guide.youtubeVideoId}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-primary">{group.shortName}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-foreground"><Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0">{guide.title}</Link></h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read the guide <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
      </div>
    </article>
  );
}
