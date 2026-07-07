'use client';

import { useMemo, useState } from 'react';
import type { GuidePage } from '@/lib/content/types';
import { GuideCard } from '@/components/cards/GuideCard';
import { getHub } from '@/lib/site';

type SortKey = 'newest' | 'gold-desc' | 'gold-asc';

const sortLabels: Record<SortKey, string> = {
  newest: 'Newest',
  'gold-desc': 'Gold/hr: high to low',
  'gold-asc': 'Gold/hr: low to high',
};

export function HubView({
  guides,
  subcategories,
}: {
  guides: GuidePage[];
  subcategories: string[];
}) {
  const [activeSub, setActiveSub] = useState<string>('All');
  const [sort, setSort] = useState<SortKey>('gold-desc');

  const filters = useMemo(() => ['All', ...subcategories], [subcategories]);

  const visible = useMemo(() => {
    let list = [...guides];
    if (activeSub !== 'All') {
      list = list.filter(
        (g) =>
          g.subcategory === activeSub ||
          g.category === activeSub ||
          g.methodType === activeSub ||
          getHub(g.hub).name === activeSub,
      );
    }
    list.sort((a, b) => {
      if (sort === 'gold-desc') return b.goldPerHourHigh - a.goldPerHourHigh;
      if (sort === 'gold-asc') return a.goldPerHourHigh - b.goldPerHourHigh;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    return list;
  }, [guides, activeSub, sort]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-y border-border/60 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter guides">
          {filters.map((sub) => (
            <button
              key={sub}
              type="button"
              role="tab"
              aria-selected={activeSub === sub}
              onClick={() => setActiveSub(sub)}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeSub === sub
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border bg-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-border bg-card px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No guides in this category yet — new drops are on the way.
        </p>
      )}
    </div>
  );
}
