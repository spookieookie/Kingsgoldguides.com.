'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CONSENT_EVENT, readConsent, saveConsent, startAnalytics, stopAnalytics, type AnalyticsChoice } from '@/lib/analytics';

export function GoogleAnalytics({ measurementId, enabled }: { measurementId: string; enabled: boolean }) {
  const pathname = usePathname();
  const [choice, setChoice] = useState<AnalyticsChoice | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const lastPage = useRef('');

  useEffect(() => {
    const current = readConsent();
    setChoice(current); setShowBanner(!current); setLoaded(true);
    const open = () => setShowBanner(true);
    window.addEventListener(CONSENT_EVENT, open);
    return () => window.removeEventListener(CONSENT_EVENT, open);
  }, []);

  useEffect(() => {
    if (!loaded || !enabled || !measurementId) return;
    if (choice !== 'accepted') { stopAnalytics(measurementId); lastPage.current = ''; return; }
    startAnalytics(measurementId);
    if (lastPage.current === pathname) return;
    // Do not send URL query strings or fragments to Analytics.
    window.gtag?.('event', 'page_view', { page_title: document.title, page_location: `${location.origin}${pathname}` });
    lastPage.current = pathname;
  }, [loaded, enabled, measurementId, choice, pathname]);

  function choose(next: AnalyticsChoice) {
    const privacySignal = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
    const effective = privacySignal ? 'declined' : next;
    saveConsent(effective); setChoice(effective); setShowBanner(false);
  }
  if (!showBanner) return null;
  return (
    <section role="region" aria-label="Analytics cookie choices" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-xl border border-border bg-card p-4 shadow-2xl sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-lg"><h2 className="text-sm font-bold text-foreground">Analytics cookies</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Can I use Google Analytics to see which videos and guides people visit? It stays off unless you accept. <Link href="/privacy" className="text-primary underline underline-offset-2">Privacy policy</Link></p></div>
        <div className="flex shrink-0 gap-2"><button type="button" onClick={() => choose('declined')} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary">Reject</button><button type="button" onClick={() => choose('accepted')} className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Accept</button></div>
      </div>
    </section>
  );
}
