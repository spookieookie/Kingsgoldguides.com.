import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/kit';

export function Hero({ guideCount, videoCount }: { guideCount: number; videoCount: number }) {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <Eyebrow className="mb-5">World of Warcraft · King K</Eyebrow>
        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Find your next <span className="text-primary">gold farm.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Farming routes, rare drops, and auction house strategies. Watch the gameplay,
          follow the written guide, and choose a method that fits how you play.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/guides" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Browse Gold Guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/videos" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
            <PlayCircle className="h-4 w-4 text-primary" aria-hidden="true" /> Watch Videos
          </Link>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          {guideCount} written guides <span className="mx-2" aria-hidden="true">·</span> {videoCount} video walkthroughs
        </p>
      </div>
    </section>
  );
}
