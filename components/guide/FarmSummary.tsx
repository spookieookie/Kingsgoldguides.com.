import Link from 'next/link';
import type { GuidePage } from '@/lib/content/types';
import { farmFacts } from '@/lib/content/farm-facts';

export function FarmSummary({ guide, quickAnswer }: { guide: GuidePage; quickAnswer?: string }) {
  const facts = farmFacts[guide.slug];
  if (!facts) return null;
  const answer = guide.tldr || quickAnswer || guide.excerpt;

  return (
    <section aria-labelledby="farm-summary-title" className="mt-8 rounded-xl border border-primary/25 bg-primary/5 p-5 sm:p-6">
      <h2 id="farm-summary-title" className="text-xl font-bold text-foreground">The farm at a glance</h2>
      <p className="mt-3 leading-relaxed text-foreground">{answer}</p>
      <dl className="mt-5 grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
        {[
          ['Where to go', facts.location],
          ['What to keep', facts.targets.join(', ')],
          ['How it pays', facts.valueType],
          ['Before you go', facts.beforeYouGo],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="font-semibold text-primary">{label}</dt>
            <dd className="mt-1 leading-relaxed text-muted-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 border-t border-primary/15 pt-4 text-sm leading-relaxed text-muted-foreground">
        {guide.realmCaveats}{' '}
        <Link href="/editorial" className="underline underline-offset-4 hover:text-primary">How I handle versions and prices</Link>.
      </p>
      <p className="mt-3 text-sm">
        <a href={`https://www.youtube.com/watch?v=${guide.youtubeVideoId}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">Watch the original farm by King K on YouTube</a>
      </p>
    </section>
  );
}
