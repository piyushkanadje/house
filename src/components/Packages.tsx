import { Check, MessageCircle, UtensilsCrossed } from 'lucide-react'
import { formatPrice, whatsappLink } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeader from './SectionHeader'

export default function Packages() {
  const { t } = useLanguage()

  return (
    <section id="packages" className="section-padding bg-forest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.packages.eyebrow} title={t.packages.title} light />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.packages.items.map((pkg, i) => (
            <div
              key={`${pkg.name}-${pkg.timing}-${i}`}
              className={`relative rounded-2xl p-5 lg:p-6 border transition-all flex flex-col backdrop-blur-sm ${
                pkg.popular
                  ? 'bg-cream/95 text-forest border-2 border-gold shadow-lg lg:scale-[1.02]'
                  : 'bg-white/10 border-white/15 hover:border-gold/40 text-white'
              }`}
            >
              {(pkg.popular || pkg.familyPick) && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full whitespace-nowrap ${
                    pkg.popular ? 'bg-gold text-forest' : 'bg-white/20 text-white'
                  }`}
                >
                  {pkg.popular ? t.packages.mostPopular : t.packages.bestForFamilies}
                </span>
              )}
              <h3 className="font-serif text-xl mb-0.5">{pkg.name}</h3>
              <p className={`text-sm mb-4 ${pkg.popular ? 'text-forest/70' : 'text-white/60'}`}>
                {pkg.timing}
              </p>
              <div className="mb-5">
                <span className="text-4xl font-serif font-semibold">₹{formatPrice(pkg.price)}</span>
                <span className={`text-sm ml-1 ${pkg.popular ? 'text-forest/70' : 'text-white/60'}`}>
                  {t.common.perPerson}
                </span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-gold' : 'text-gold'}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(pkg.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm transition-colors mt-auto ${
                  pkg.popular
                    ? 'bg-forest text-white hover:bg-forest-dark'
                    : 'bg-gold text-forest hover:bg-gold-light'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                {t.common.whatsapp}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6">
          <p className="text-white/80 text-sm text-center mb-4">{t.packages.foodNote}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {t.packages.foodHighlights.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/90">
                <UtensilsCrossed className="w-4 h-4 text-gold flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-white/70 text-sm">{t.packages.footerNote}</p>
          <a
            href={whatsappLink(t.whatsapp.customPlan)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gold hover:text-gold-light text-sm underline underline-offset-4"
          >
            {t.packages.askCustomPlan}
          </a>
        </div>
      </div>
    </section>
  )
}
