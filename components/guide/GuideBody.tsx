import type { ReactNode } from 'react';
import type { GuidePage } from '@/lib/content/types';
import { Panel } from '@/components/ui/kit';
import { CheckCircle2, Clock, ArrowRightLeft, AlertTriangle, Lightbulb } from 'lucide-react';

function Block({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <span className="text-primary" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      <div className="mt-4 text-pretty leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

/**
 * Renders the structured body of a typed guide. For MDX-backed guides the
 * detailed prose is passed in as `mdxContent` and rendered after the structured
 * highlights so both the analyst framing and the full written route show up.
 */
export function GuideBody({
  guide,
  mdxContent,
}: {
  guide: GuidePage;
  mdxContent?: ReactNode;
}) {
  return (
    <div>
      {/* TL;DR */}
      <Panel className="border-primary/25 bg-primary/5">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">TL;DR</span>
        <p className="mt-2 text-pretty leading-relaxed text-foreground">{guide.tldr}</p>
      </Panel>

      {/* Requirements + who it's for */}
      {(guide.requirements.length > 0 || guide.whoFor.length > 0) && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {guide.requirements.length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Requirements
              </h3>
              <ul className="mt-3 space-y-2">
                {guide.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {guide.whoFor.length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Who it&apos;s for
              </h3>
              <ul className="mt-3 space-y-2">
                {guide.whoFor.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Step-by-step method (typed guides) */}
      {guide.steps.length > 0 && (
        <Block icon={<CheckCircle2 className="h-5 w-5" />} title="Step-by-step method">
          <ol className="space-y-5">
            {guide.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 font-mono text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {/* Full written MDX route (real guides) */}
      {mdxContent && (
        <div className="prose prose-invert mt-10 max-w-none">{mdxContent}</div>
      )}

      {/* Timing */}
      {(guide.bestTimeToFarm || guide.bestTimeToSell) && (
        <Block icon={<Clock className="h-5 w-5" />} title="Timing">
          <div className="grid gap-4 sm:grid-cols-2">
            {guide.bestTimeToFarm && (
              <Panel>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Best time to farm
                </span>
                <p className="mt-2 text-sm text-foreground">{guide.bestTimeToFarm}</p>
              </Panel>
            )}
            {guide.bestTimeToSell && (
              <Panel>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Best time to sell
                </span>
                <p className="mt-2 text-sm text-foreground">{guide.bestTimeToSell}</p>
              </Panel>
            )}
          </div>
        </Block>
      )}

      {/* AH notes */}
      {guide.ahNotes && (
        <Block icon={<ArrowRightLeft className="h-5 w-5" />} title="Auction house notes">
          <p>{guide.ahNotes}</p>
        </Block>
      )}

      {/* Realm caveats */}
      {guide.realmCaveats && (
        <Block icon={<AlertTriangle className="h-5 w-5" />} title="Realm &amp; version caveats">
          <p>{guide.realmCaveats}</p>
        </Block>
      )}

      {/* Analyst takeaway */}
      {guide.analystTakeaway && (
        <Panel className="mt-10 border-primary/25 bg-primary/5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
            Analyst takeaway
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-foreground">{guide.analystTakeaway}</p>
        </Panel>
      )}
    </div>
  );
}
