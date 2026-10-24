'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CONSENT_EVENT, readConsent, saveConsent, startAnalytics, stopAnalytics, type AnalyticsChoice } from '@/lib/analytics';

const defaultCopy = { cookies: 'Analytics cookies', cookieText: 'Can I use Google Analytics to see which videos and guides people visit? It stays off unless you accept.', privacy: 'Privacy policy', english: 'English', accept: 'Accept', reject: 'Reject' };
export function GoogleAnalytics({ measurementId, enabled, copy = defaultCopy }: { measurementId: string; enabled: boolean; copy?: typeof defaultCopy }) {
  const pathname = usePathname();
  const [choice, setChoice] = useState<AnalyticsChoice | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const lastPage = useRef('');

  useEffect(() => {
    const current = readConsent();
    setChoice(current); setShowBanner(!current); setLoaded(true);
    const open = () => setShowBanner(true);
    const syncChoice = () => setChoice(readConsent());
    window.addEventListener(CONSENT_EVENT, open);
    window.addEventListener('storage', syncChoice);
    return () => {
      window.removeEventListener(CONSENT_EVENT, open);
      window.removeEventListener('storage', syncChoice);
    };
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
    <section role="region" aria-label={copy.cookies} className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-xl border border-border bg-card p-4 shadow-2xl sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-lg"><h2 className="text-sm font-bold text-foreground">{copy.cookies}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy.cookieText} <Link href="/privacy" className="text-primary underline underline-offset-2">{copy.privacy}{copy === defaultCopy ? '' : ` (${copy.english})`}</Link></p></div>
        <div className="flex shrink-0 gap-2"><button type="button" onClick={() => choose('declined')} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary">{copy.reject}</button><button type="button" onClick={() => choose('accepted')} className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">{copy.accept}</button></div>
      </div>
    </section>
  );
}
