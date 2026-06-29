import type { Locale, Translations } from './types'
import en from './locales/en'
import hi from './locales/hi'
import mr from './locales/mr'

export const locales: Record<Locale, Translations> = { en, hi, mr }

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  hi: 'हिंदी',
  mr: 'मराठी',
}
