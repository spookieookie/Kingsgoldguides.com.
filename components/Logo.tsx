import { siteConfig } from '@/lib/site';

export function Logo({ showText = true, tagline = 'WoW Gold Farming Guides' }: { showText?: boolean; tagline?: string }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* Use the original channel artwork at every site branding position. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/king-k-logo.svg" alt="King K channel logo" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full border border-white/15 object-contain" />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
          <span className="mt-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
            {tagline}
          </span>
        </span>
      )}
    </span>
  );
}

