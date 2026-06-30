import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useSeo } from '../seo/useSeo'
import { detectLanguage, normalizeLocaleUrl, pathForLocale, saveLanguage } from './detectLanguage'
import { locales } from './index'
import type { Locale, Translations } from './types'

interface LanguageContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLanguage())
  const t = locales[locale]

  // Each locale is its own prerendered page (/, /hi/, /mr/), so switching
  // navigates to that path. This keeps URL === content === canonical for SEO.
  const setLocale = (next: Locale) => {
    saveLanguage(next)
    setLocaleState(next)
    if (next !== locale) {
      window.location.assign(`${pathForLocale(next)}${window.location.hash}`)
    }
  }

  useSeo(locale, t.meta)

  useEffect(() => {
    // Rewrite legacy ?lang= URLs to their path form without reloading.
    normalizeLocaleUrl(locale)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
