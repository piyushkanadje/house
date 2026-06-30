import type { Locale } from './types'

const STORAGE_KEY = 'srushti-lang'
const SUPPORTED: Locale[] = ['en', 'hi', 'mr']

// Vite base path (e.g. '/'). Always ends with a slash.
const BASE = import.meta.env.BASE_URL || '/'

function withTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`
}

// Pathname with the configured base stripped, always starting with '/'.
function stripBase(pathname: string): string {
  const base = withTrailingSlash(BASE)
  if (base !== '/' && pathname.startsWith(base)) {
    return `/${pathname.slice(base.length)}`
  }
  return pathname
}

// Path the locale lives at: en -> '/', hi -> '/hi/', mr -> '/mr/'.
export function pathForLocale(locale: Locale): string {
  const base = withTrailingSlash(BASE)
  return locale === 'en' ? base : `${base}${locale}/`
}

// Reads the locale from the URL path segment (/hi/, /mr/). Returns null on the root/en path.
export function getLangFromPath(): Locale | null {
  const path = stripBase(window.location.pathname)
  const segment = path.split('/').filter(Boolean)[0]
  if (segment && segment !== 'en' && SUPPORTED.includes(segment as Locale)) {
    return segment as Locale
  }
  return null
}

// Back-compat: older links / sitemaps used ?lang=hi.
export function getLangFromUrl(): Locale | null {
  const param = new URLSearchParams(window.location.search).get('lang')
  if (param && SUPPORTED.includes(param as Locale)) {
    return param as Locale
  }
  return null
}

// URL path is authoritative for the locale (keeps URL === content === canonical for SEO).
// The ?lang= param is honoured only as a fallback for legacy links.
export function detectLanguage(): Locale {
  return getLangFromPath() ?? getLangFromUrl() ?? 'en'
}

// Rewrite a legacy `?lang=hi` URL to its path form (`/hi/`) without reloading,
// so the address bar, canonical and content all agree.
export function normalizeLocaleUrl(locale: Locale): void {
  const pathLocale = getLangFromPath()
  const expected = locale === 'en' ? null : locale
  if (pathLocale === expected) return
  const hash = window.location.hash
  window.history.replaceState(null, '', `${pathForLocale(locale)}${hash}`)
}

export function saveLanguage(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // localStorage unavailable
  }
}
