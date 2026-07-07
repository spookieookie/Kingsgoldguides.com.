import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { GuidePage } from '@/lib/content/types';
import { getHub } from '@/lib/site';
import { formatGoldRange, riskTone, speedTone } from '@/lib/format';
import { Tag } from '@/components/ui/kit';
import { cn } from '@/lib/utils';

export function GuideCard({
  guide,
  className,
}: {
  guide: GuidePage;
  className?: string;
}) {
  const hub = getHub(guide.hub);
  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40',
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <Tag tone="gold">{hub.shortName}</Tag>
        <span className="font-mono text-xs text-muted-foreground">{guide.expansion}</span>
      </div>

      <h3 className="text-pretty text-lg font-bold leading-snug text-foreground">
        <Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0">
          {guide.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {guide.excerpt}
      </p>

      <div className="mt-4 flex items-baseline gap-2 border-t border-border/60 pt-4">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Gold/hr
        </span>
        <span className="text-xl font-bold text-primary">
          {formatGoldRange(guide.goldPerHourLow, guide.goldPerHourHigh)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Tag tone={riskTone[guide.riskLevel]}>{guide.riskLevel} risk</Tag>
        <Tag tone={speedTone[guide.saleSpeed]}>{guide.saleSpeed} sale</Tag>
        <span className="ml-auto inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Read <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
