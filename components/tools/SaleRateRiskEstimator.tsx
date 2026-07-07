'use client';

import { useState } from 'react';
import { Panel, Tag } from '@/components/ui/kit';

function toNumber(v: string): number {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function formatGold(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

const inputClass =
  'w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-primary';
const labelClass = 'font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground';

export function SaleRateRiskEstimator() {
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [units, setUnits] = useState('');
  const [salesPerDay, setSalesPerDay] = useState('');

  const buy = toNumber(buyPrice);
  const sell = toNumber(sellPrice);
  const qty = toNumber(units);
  const perDay = toNumber(salesPerDay);

  const capitalAtRisk = buy * qty;
  const marginPerUnit = sell - buy;
  const marginPct = buy > 0 ? (marginPerUnit / buy) * 100 : 0;
  const totalProfit = marginPerUnit * qty;
  const daysToClear = perDay > 0 ? qty / perDay : 0;

  const risk =
    marginPct <= 0
      ? { tone: 'danger' as const, label: 'Negative margin' }
      : daysToClear > 14 || marginPct < 15
        ? { tone: 'warning' as const, label: 'Elevated risk' }
        : { tone: 'success' as const, label: 'Reasonable risk' };

  const hasInput = buy > 0 && sell > 0 && qty > 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: 'sr-buy', label: 'Buy price / unit', v: buyPrice, set: setBuyPrice, ph: '120' },
          { id: 'sr-sell', label: 'Sell price / unit', v: sellPrice, set: setSellPrice, ph: '180' },
          { id: 'sr-units', label: 'Units', v: units, set: setUnits, ph: '200' },
          { id: 'sr-day', label: 'Est. sales / day', v: salesPerDay, set: setSalesPerDay, ph: '25' },
        ].map((f) => (
          <div key={f.id}>
            <label className={labelClass} htmlFor={f.id}>
              {f.label}
            </label>
            <input
              id={f.id}
              type="number"
              inputMode="numeric"
              min={0}
              value={f.v}
              onChange={(e) => f.set(e.target.value)}
              placeholder={f.ph}
              className={`mt-2 ${inputClass}`}
            />
          </div>
        ))}
      </div>

      <Panel className="border-primary/25 bg-primary/5">
        <div className="flex items-center justify-between">
          <span className={labelClass}>Estimate</span>
          {hasInput && <Tag tone={risk.tone}>{risk.label}</Tag>}
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Capital at risk</dt>
            <dd className="font-semibold text-foreground">{hasInput ? formatGold(capitalAtRisk) : '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Margin / unit</dt>
            <dd className="font-semibold text-foreground">
              {hasInput ? `${formatGold(marginPerUnit)} (${marginPct.toFixed(0)}%)` : '—'}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Projected profit</dt>
            <dd className="font-semibold text-primary">{hasInput ? formatGold(totalProfit) : '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Days to clear</dt>
            <dd className="font-semibold text-foreground">
              {hasInput && perDay > 0 ? `${daysToClear.toFixed(1)} days` : '—'}
            </dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}
