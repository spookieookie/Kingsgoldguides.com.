'use client';

import { useEffect, useState } from 'react';
import { Panel } from '@/components/ui/kit';

/**
 * The Darkmoon Faire opens on the first Sunday of each month and runs for one
 * week. This computes the next open/close window from the current date so the
 * timer stays useful without a backend.
 */
function firstSunday(year: number, month: number): Date {
  const d = new Date(Date.UTC(year, month, 1));
  const day = d.getUTCDay();
  const offset = day === 0 ? 0 : 7 - day;
  d.setUTCDate(1 + offset);
  return d;
}

function computeWindow(now: Date) {
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();

  let open = firstSunday(y, m);
  let close = new Date(open);
  close.setUTCDate(open.getUTCDate() + 7);

  // If this month's Faire already closed, roll to next month.
  if (now >= close) {
    const nextMonth = m + 1;
    open = firstSunday(nextMonth > 11 ? y + 1 : y, nextMonth % 12);
    close = new Date(open);
    close.setUTCDate(open.getUTCDate() + 7);
  }

  const isLive = now >= open && now < close;
  const target = isLive ? close : open;
  const days = Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86_400_000));

  return { isLive, target, days };
}

export function DarkmoonEventTimer() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <Panel className="text-center">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Loading timer…
        </span>
      </Panel>
    );
  }

  const { isLive, target, days } = computeWindow(now);
  const dateLabel = target.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <Panel className="border-primary/25 bg-primary/5 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {isLive ? 'Faire is live — closes in' : 'Next Darkmoon Faire opens in'}
      </span>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <span className="text-5xl font-bold text-primary">{days}</span>
        <span className="text-lg text-muted-foreground">{days === 1 ? 'day' : 'days'}</span>
      </div>
      <p className="mt-3 text-sm text-foreground">
        {isLive ? 'Closes' : 'Opens'} {dateLabel} (approx.)
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        {isLive
          ? 'Faire is up: buy Firewater and event materials now while supply is highest.'
          : 'Estimated from the standard first-Sunday schedule. Confirm the exact date in-game.'}
      </p>
    </Panel>
  );
}
