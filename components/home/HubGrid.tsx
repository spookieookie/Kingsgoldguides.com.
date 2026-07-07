import Link from 'next/link';
import {
  Coins,
  Map,
  TrendingUp,
  LineChart,
  Hammer,
  Gem,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { hubs, type HubKey } from '@/lib/site';
import { SectionHeader } from '@/components/ui/kit';

const iconByHub: Record<HubKey, LucideIcon> = {
  'gold-guides': Coins,
  farming: Map,
  'auction-house': TrendingUp,
  economy: LineChart,
  professions: Hammer,
  'rare-farms': Gem,
};

export function HubGrid({ counts }: { counts: Record<HubKey, number> }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeader
        eyebrow="Six desks, one economy"
        title="Pick your play"
        description="Every guide lives in one of six silos. Start where your gold problem is."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((hub) => {
          const Icon = iconByHub[hub.key];
          return (
            <Link
              key={hub.key}
              href={hub.href}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:bg-card/80"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground">{hub.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {hub.tagline}
              </p>
              <span className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {counts[hub.key] ?? 0} {counts[hub.key] === 1 ? 'guide' : 'guides'}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
