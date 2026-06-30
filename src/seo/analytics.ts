// Thin GA4 wrapper. `gtag` is defined in index.html and stays inert until a real
// Measurement ID is configured, so these calls are safe no-ops until then.
type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    GA_MEASUREMENT_ID?: string
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  window.gtag?.('event', name, params)
}
