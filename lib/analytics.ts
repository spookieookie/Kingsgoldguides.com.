export const CONSENT_KEY = 'kgg-analytics-consent-v1';
export const CONSENT_EVENT = 'kgg:cookie-settings';
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsChoice = 'accepted' | 'declined';

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    kggAnalyticsStarted?: string;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function readConsent(): AnalyticsChoice | null {
  if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return 'declined';
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    if ((value.choice === 'accepted' || value.choice === 'declined') && typeof value.updatedAt === 'number' && Date.now() - value.updatedAt < CONSENT_MAX_AGE) return value.choice;
  } catch { /* Browser storage can be unavailable. Keep tracking off. */ }
  return null;
}

export function saveConsent(choice: AnalyticsChoice) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, updatedAt: Date.now() })); } catch { /* The choice still applies to this page. */ }
}

export function startAnalytics(id: string) {
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  window[`ga-disable-${id}`] = false;
  if (window.kggAnalyticsStarted === id) {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 15552000, page_location: `${location.origin}${location.pathname}`, page_referrer: document.referrer.split(/[?#]/)[0] });
  window.kggAnalyticsStarted = id;
  const script = document.createElement('script');
  script.id = 'kgg-google-analytics';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

export function stopAnalytics(id: string) {
  if (!id) return;
  window[`ga-disable-${id}`] = true;
  window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of ['', location.hostname, `.${location.hostname}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export function trackVideoStart(videoId: string, title: string) {
  if (readConsent() !== 'accepted' || !window.kggAnalyticsStarted) return;
  window.gtag?.('event', 'video_start', { video_provider: 'youtube', video_title: title, video_url: `https://www.youtube.com/watch?v=${videoId}`, page_location: `${location.origin}${location.pathname}` });
}
