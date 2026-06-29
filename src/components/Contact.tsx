import { MessageCircle, Phone } from 'lucide-react'
import { phones, site, whatsappLink, phoneLink } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeader from './SectionHeader'

export default function Contact() {
  const { t } = useLanguage()

  const phoneConfig = phones.map((p) => ({
    number: p.number,
    label: t.contact.phoneLabels[p.key],
  }))

  return (
    <section id="contact" className="section-padding bg-cream-texture">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader eyebrow={t.contact.eyebrow} title={t.contact.title} />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a
            href={whatsappLink(t.whatsapp.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-whatsapp text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" />
            {t.contact.whatsappBooking}
          </a>
          <a
            href={phoneLink(phones[0].number)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-forest text-forest font-semibold rounded-full hover:bg-forest/5 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {t.common.call}
          </a>
          <a
            href="#packages"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-forest text-white font-semibold rounded-full hover:bg-forest-dark transition-colors"
          >
            {t.contact.viewPackages}
          </a>
        </div>

        <div className="bg-white/90 rounded-2xl border border-forest/10 p-6 text-left space-y-3">
          {phoneConfig.map((p) => (
            <div key={p.number} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-sage">{p.label}</span>
              <a
                href={phoneLink(p.number)}
                className="font-serif text-forest hover:text-gold transition-colors"
              >
                {p.number}
              </a>
            </div>
          ))}
          <div className="pt-3 border-t border-forest/10 flex items-center justify-between gap-4 text-sm">
            <span className="text-sage">Email</span>
            <a href={`mailto:${site.email}`} className="text-forest hover:text-gold transition-colors truncate">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
