import { Crown } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export function Logo({ showText = true }: { showText?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/60 bg-secondary">
        <Crown className="h-5 w-5 text-primary" strokeWidth={2.25} aria-hidden="true" />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            WoW Gold
          </span>
        </span>
      )}
    </span>
  );
}
