import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeader from './SectionHeader'

export default function Policies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  return (
    <section className="section-padding bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.policies.title} className="mb-6" />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {t.policies.badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 text-xs sm:text-sm bg-cream rounded-full text-forest border border-forest/10"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {t.policies.items.map((policy, i) => (
            <div key={policy.title} className="border border-forest/10 rounded-xl overflow-hidden">
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 text-left bg-cream/50 hover:bg-cream transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-forest text-sm">{policy.title}</span>
                <ChevronDown
                  className={`w-4 h-4 text-sage flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-sage text-sm leading-relaxed">{policy.body}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
