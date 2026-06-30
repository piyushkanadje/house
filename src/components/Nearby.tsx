import { MapPin, Navigation } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeader from './SectionHeader'

export default function Nearby() {
  const { t } = useLanguage()

  return (
    <section id="nearby" className="section-padding bg-cream-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.nearby.eyebrow} title={t.nearby.title} />
        <p className="text-forest/75 leading-relaxed max-w-3xl mx-auto text-center mb-10">
          {t.nearby.intro}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {t.nearby.places.map((place) => (
            <div
              key={place.name}
              className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-forest/10"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <h3 className="font-serif text-forest text-base sm:text-lg">{place.name}</h3>
              </div>
              <p className="text-xs text-sage uppercase tracking-wide mb-2">{place.distance}</p>
              <p className="text-sage text-sm leading-relaxed">{place.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-forest/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-forest text-lg sm:text-xl">{t.nearby.reachTitle}</h3>
          </div>
          <ul className="space-y-2">
            {t.nearby.reachPoints.map((point) => (
              <li key={point} className="flex gap-2 text-sage text-sm leading-relaxed">
                <span className="text-gold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
