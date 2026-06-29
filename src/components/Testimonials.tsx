import { useLanguage } from '../i18n/LanguageContext'
import SectionHeader from './SectionHeader'

export default function Testimonials() {
  const { t } = useLanguage()
  const [featured, ...rest] = t.testimonials.items

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.testimonials.title} />

        <blockquote className="max-w-3xl mx-auto text-center mb-12 px-4">
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-forest leading-snug italic">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <footer className="mt-6 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest text-gold flex items-center justify-center font-serif">
              {featured.initial}
            </div>
            <div className="text-left">
              <cite className="not-italic font-medium text-forest text-sm">{featured.name}</cite>
              <p className="text-xs text-sage">{featured.location}</p>
            </div>
          </footer>
        </blockquote>

        <div className="grid sm:grid-cols-3 gap-4">
          {rest.map((item) => (
            <div key={item.name} className="bg-white/80 rounded-xl p-5 border border-forest/10">
              <p className="text-forest/80 text-sm leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center font-serif text-xs">
                  {item.initial}
                </div>
                <div>
                  <p className="font-medium text-forest text-sm">{item.name}</p>
                  <p className="text-xs text-sage">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
