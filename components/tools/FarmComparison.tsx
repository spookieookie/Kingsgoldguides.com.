'use client';

import { useState } from 'react';
import { Panel } from '@/components/ui/kit';
import { Trophy } from 'lucide-react';

interface Row {
  name: string;
  gold: string;
  minutes: string;
}

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

export function FarmComparison() {
  const [rows, setRows] = useState<Row[]>([
    { name: 'Farm A', gold: '', minutes: '' },
    { name: 'Farm B', gold: '', minutes: '' },
  ]);

  const update = (i: number, key: keyof Row, value: string) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  };

  const addRow = () =>
    setRows((prev) =>
      prev.length >= 4 ? prev : [...prev, { name: `Farm ${String.fromCharCode(65 + prev.length)}`, gold: '', minutes: '' }],
    );

  const results = rows.map((r) => {
    const m = toNumber(r.minutes);
    const gph = m > 0 ? (toNumber(r.gold) / m) * 60 : 0;
    return { name: r.name, gph };
  });
  const best = Math.max(...results.map((r) => r.gph), 0);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              {i === 0 && <label className={labelClass}>Farm name</label>}
              <input
                aria-label={`Farm ${i + 1} name`}
                value={row.name}
                onChange={(e) => update(i, 'name', e.target.value)}
                className={`mt-2 ${inputClass}`}
              />
            </div>
            <div>
              {i === 0 && <label className={labelClass}>Gold earned</label>}
              <input
                aria-label={`Farm ${i + 1} gold`}
                type="number"
                min={0}
                value={row.gold}
                onChange={(e) => update(i, 'gold', e.target.value)}
                placeholder="gold"
                className={`mt-2 ${inputClass}`}
              />
            </div>
            <div>
              {i === 0 && <label className={labelClass}>Minutes</label>}
              <input
                aria-label={`Farm ${i + 1} minutes`}
                type="number"
                min={0}
                value={row.minutes}
                onChange={(e) => update(i, 'minutes', e.target.value)}
                placeholder="minutes"
                className={`mt-2 ${inputClass}`}
              />
            </div>
          </div>
        ))}
      </div>

      {rows.length < 4 && (
        <button
          type="button"
          onClick={addRow}
          className="rounded-lg border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          + Add farm
        </button>
      )}

      <Panel className="border-primary/25 bg-primary/5">
        <span className={labelClass}>Ranked by gold / hour</span>
        <ul className="mt-4 space-y-2">
          {results
            .map((r, idx) => ({ ...r, idx }))
            .sort((a, b) => b.gph - a.gph)
            .map((r) => (
              <li
                key={r.idx}
                className="flex items-center justify-between rounded-lg bg-card px-4 py-2"
              >
                <span className="flex items-center gap-2 text-foreground">
                  {r.gph > 0 && r.gph === best && (
                    <Trophy className="h-4 w-4 text-primary" aria-hidden="true" />
                  )}
                  {r.name}
                </span>
                <span className="font-mono font-semibold text-primary">
                  {r.gph > 0 ? `${formatGold(r.gph)} /hr` : '—'}
                </span>
              </li>
            ))}
        </ul>
      </Panel>
    </div>
  );
}
