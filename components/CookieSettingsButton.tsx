'use client';
import { CONSENT_EVENT } from '@/lib/analytics';
export function CookieSettingsButton({ label = 'Cookie settings' }: { label?: string }) {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))} className="hover:text-primary">{label}</button>;
}
