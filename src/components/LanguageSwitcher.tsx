import { localeLabels } from '../i18n'
import { useLanguage } from '../i18n/LanguageContext'
import { pathForLocale, saveLanguage } from '../i18n/detectLanguage'
import type { Locale } from '../i18n/types'

const options: Locale[] = ['en', 'hi', 'mr']

export default function LanguageSwitcher() {
  const { locale } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 border border-white/20">
      {options.map((code) => (
        <a
          key={code}
          href={pathForLocale(code)}
          onClick={() => saveLanguage(code)}
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
            locale === code
              ? 'bg-gold text-forest'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-label={`Switch to ${localeLabels[code]}`}
          aria-current={locale === code ? 'true' : undefined}
        >
          {localeLabels[code]}
        </a>
      ))}
    </div>
  )
}
