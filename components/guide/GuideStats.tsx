import type { GuidePage } from '@/lib/content/types';
import { Panel, Tag } from '@/components/ui/kit';
import { formatGoldRange, riskTone, speedTone } from '@/lib/format';

/**
 * Compact "at a glance" analyst panel shown near the top of every guide.
 * Pulls the structured economic metadata off the typed GuidePage record.
 */
export function GuideStats({ guide }: { guide: GuidePage }) {
  const hasGoldRate = guide.goldPerHourHigh > 0;
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: hasGoldRate ? 'Gold / hour' : 'Content type',
      value: hasGoldRate ? (
        <span className="text-primary">
          {formatGoldRange(guide.goldPerHourLow, guide.goldPerHourHigh)}
        </span>
      ) : (
        <span className="text-primary">Analysis</span>
      ),
    },
    { label: 'Method', value: guide.methodType },
    { label: 'Expansion', value: guide.expansion },
    { label: 'Setup cost', value: guide.setupCost },
  ];

  return (
    <Panel className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {rows.map((r) => (
        <div key={r.label} className="flex flex-col gap-1">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
            {r.label}
          </span>
          <span className="text-lg font-bold text-foreground">{r.value}</span>
        </div>
      ))}
      <div className="col-span-2 flex flex-wrap items-center gap-2 sm:col-span-4">
        <Tag tone={riskTone[guide.riskLevel]}>{guide.riskLevel} risk</Tag>
        <Tag tone={speedTone[guide.saleSpeed]}>{guide.saleSpeed} sale</Tag>
        <Tag tone="muted">{guide.subcategory}</Tag>
      </div>
    </Panel>
  );
}
