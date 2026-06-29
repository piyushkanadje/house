import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useSeo } from '../seo/useSeo'
import { detectLanguage, saveLanguage, syncLangToUrl } from './detectLanguage'
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

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    saveLanguage(next)
    syncLangToUrl(next)
  }

  useSeo(locale, t.meta)

  useEffect(() => {
    syncLangToUrl(locale)
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
