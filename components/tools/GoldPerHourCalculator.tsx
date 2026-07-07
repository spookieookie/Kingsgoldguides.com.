'use client';

import { useState } from 'react';
import { Panel } from '@/components/ui/kit';

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

export function GoldPerHourCalculator() {
  const [gold, setGold] = useState('');
  const [minutes, setMinutes] = useState('');

  const g = toNumber(gold);
  const m = toNumber(minutes);
  const perHour = m > 0 ? (g / m) * 60 : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="gph-gold">
            Gold earned
          </label>
          <input
            id="gph-gold"
            type="number"
            inputMode="numeric"
            min={0}
            value={gold}
            onChange={(e) => setGold(e.target.value)}
            placeholder="e.g. 45000"
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="gph-min">
            Time spent (minutes)
          </label>
          <input
            id="gph-min"
            type="number"
            inputMode="numeric"
            min={0}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="e.g. 35"
            className={`mt-2 ${inputClass}`}
          />
        </div>
      </div>

      <Panel className="flex flex-col justify-center border-primary/25 bg-primary/5 text-center">
        <span className={labelClass}>Gold per hour</span>
        <span className="mt-2 text-4xl font-bold text-primary">
          {perHour > 0 ? formatGold(perHour) : '—'}
        </span>
        <span className="mt-2 text-xs text-muted-foreground">
          {perHour > 0
            ? 'Compare this against your other farms to find the real winner.'
            : 'Enter gold and time to see a clean gold-per-hour number.'}
        </span>
      </Panel>
    </div>
  );
}
