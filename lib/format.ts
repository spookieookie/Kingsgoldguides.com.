import type { RiskLevel, SaleSpeed } from '@/lib/content/types';

/** Format a gold-per-hour range like "180k–240k". */
export function formatGoldRange(low: number, high: number): string {
  return `${formatGold(low)}–${formatGold(high)}`;
}

/** Compact gold formatting: 1500 -> "1.5k", 1000000 -> "1M". */
export function formatGold(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const k = value / 1_000;
    return `${Number.isInteger(k) ? k : k.toFixed(0)}k`;
  }
  return `${value}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const riskTone: Record<RiskLevel, 'success' | 'warning' | 'danger'> = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
};

export const speedTone: Record<SaleSpeed, 'success' | 'warning' | 'muted'> = {
  Fast: 'success',
  Medium: 'warning',
  Slow: 'muted',
};
