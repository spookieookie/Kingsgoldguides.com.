import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { GuidePage } from '@/lib/content/types';
import { guideGroups, getGuideGroup } from '@/lib/guide-groups';

export function HubGrid({ guides }: { guides: GuidePage[] }) {
  return (
    <nav aria-label="Browse guides by content" className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-4 md:grid-cols-3 md:px-6">
      {guideGroups.map((group) => {
        const count = guides.filter((guide) => getGuideGroup(guide).key === group.key).length;
        if (!count) return null;
        return (
          <Link key={group.key} href={`/guides#${group.key}`} className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold text-foreground">{group.name}</h2>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
            <p className="mt-4 text-xs text-primary">{count} {count === 1 ? 'guide' : 'guides'}</p>
          </Link>
        );
      })}
    </nav>
  );
}
