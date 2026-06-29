import { MapPin, Navigation, Phone } from 'lucide-react'
import { locationVistaImage, phones, phoneLink, site } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeader from './SectionHeader'

export default function Location() {
  const { t } = useLanguage()

  return (
    <section id="location" className="section-padding bg-forest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.location.title} light className="mb-8" />

        <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
          <img
            src={locationVistaImage}
            alt={t.location.vistaAlt}
            className="w-full aspect-[21/9] object-cover"
            loading="lazy"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <a
            href={site.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.location.address.name} — ${t.common.getDirections}`}
            className="group relative block rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-auto lg:min-h-[320px]"
          >
            <img
              src={site.mapImage}
              alt={`Map showing ${t.location.address.name}`}
              className="w-full h-full min-h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 px-4 py-2 bg-gold text-forest font-semibold rounded-full text-sm shadow-lg opacity-95 group-hover:opacity-100 transition-opacity">
              <Navigation className="w-4 h-4" />
              {t.common.getDirections}
            </span>
          </a>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-serif text-lg mb-2">{t.location.addressLabel}</h3>
                <p className="text-white/80 leading-relaxed text-sm font-medium">{t.location.address.name}</p>
                <p className="text-white/80 leading-relaxed text-sm">
                  {site.address.street}
                  <br />
                  {t.location.address.line2}
                  <br />
                  {t.location.address.line3}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-serif text-lg mb-2">{t.location.phoneLabel}</h3>
                <ul className="space-y-1 text-sm text-white/80">
                  {phones.map((p) => (
                    <li key={p.number}>
                      <span className="text-white/60">{t.contact.phoneLabels[p.key]}: </span>
                      <a href={phoneLink(p.number)} className="hover:text-gold transition-colors">
                        +91 {p.number}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href={site.mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-forest font-semibold rounded-full hover:bg-gold-light transition-colors text-sm"
            >
              <Navigation className="w-4 h-4" />
              {t.common.getDirections}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
