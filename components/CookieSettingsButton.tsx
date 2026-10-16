'use client';
import { CONSENT_EVENT } from '@/lib/analytics';
export function CookieSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))} className="hover:text-primary">Cookie settings</button>;
}
