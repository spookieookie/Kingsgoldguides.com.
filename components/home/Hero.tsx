import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Eyebrow, Stat } from '@/components/ui/kit';
import { siteConfig } from '@/lib/site';

export function Hero({
  guideCount,
  videoCount,
  topGoldPerHour,
}: {
  guideCount: number;
  videoCount: number;
  topGoldPerHour: string;
}) {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <Eyebrow className="mb-5">The WoW Gold Command Center</Eyebrow>
        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
          Make gold in World of Warcraft like you actually{' '}
          <span className="text-primary">read the market</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {siteConfig.description} Tested farming routes, auction house flips, and
          profession plays — each one backed by real numbers, sale-speed data, and
          the video that proves it.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse gold guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={siteConfig.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <PlayCircle className="h-4 w-4 text-primary" aria-hidden="true" />
            Watch on YouTube
          </a>
        </div>

        <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-8 border-t border-border/60 pt-8 sm:grid-cols-3">
          <Stat label="Guides" value={`${guideCount}+`} hint="routes & strategies" />
          <Stat label="Video breakdowns" value={`${videoCount}+`} hint="from King Kunta" />
          <Stat label="Top route" value={topGoldPerHour} hint="gold per hour" />
        </dl>
      </div>
    </section>
  );
}
