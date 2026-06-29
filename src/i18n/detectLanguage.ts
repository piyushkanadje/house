import type { Locale } from './types'

const STORAGE_KEY = 'srushti-lang'
const SUPPORTED: Locale[] = ['en', 'hi', 'mr']

export function getLangFromUrl(): Locale | null {
  const param = new URLSearchParams(window.location.search).get('lang')
  if (param && SUPPORTED.includes(param as Locale)) {
    return param as Locale
  }
  return null
}

export function syncLangToUrl(locale: Locale): void {
  const url = new URL(window.location.href)
  if (locale === 'en') {
    url.searchParams.delete('lang')
  } else {
    url.searchParams.set('lang', locale)
  }
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}

export function detectLanguage(): Locale {
  const fromUrl = getLangFromUrl()
  if (fromUrl) return fromUrl

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED.includes(saved as Locale)) {
      return saved as Locale
    }
  } catch {
    // localStorage unavailable
  }

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  for (const lang of languages) {
    const code = lang.toLowerCase()
    if (code.startsWith('mr')) return 'mr'
    if (code.startsWith('hi')) return 'hi'
  }

  return 'en'
}

export function saveLanguage(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // localStorage unavailable
  }
}
