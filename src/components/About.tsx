import { useEffect, useState } from 'react'
import { aboutSlides } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeader from './SectionHeader'

const INTERVAL_MS = 5000

export default function About() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % aboutSlides.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="about" className="section-padding bg-cream-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} align="left" className="mb-5" />
            <p className="text-forest/75 leading-relaxed mb-8">{t.about.intro}</p>
            <div className="grid grid-cols-2 gap-3">
              {t.about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-forest/10"
                >
                  <p className="text-xs text-sage uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="font-serif text-forest text-sm sm:text-base leading-snug">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              className="relative rounded-2xl shadow-xl w-full aspect-[4/3] overflow-hidden bg-forest/5 border border-gold/30 p-1"
              aria-live="polite"
              aria-roledescription="carousel"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                {aboutSlides.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={t.about.slides[index]?.alt ?? ''}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[900ms] ease-in-out ${
                      index === activeIndex ? 'opacity-100 animate-ken-burns' : 'opacity-0'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
            <p className="text-center font-serif text-forest/80 text-sm mt-3 tracking-wide">
              {t.about.slides[activeIndex]?.caption}
            </p>
            <div className="flex justify-center gap-1 mt-3">
              {aboutSlides.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="grid place-items-center h-11 w-11 rounded-full"
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${
                      index === activeIndex ? 'w-6 bg-forest' : 'w-2 bg-forest/30'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-serif text-forest text-xl sm:text-2xl mb-6 text-center">
            {t.about.useCasesTitle}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.about.useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-forest/10"
              >
                <h4 className="font-serif text-forest text-base sm:text-lg mb-1.5">{useCase.title}</h4>
                <p className="text-sage text-sm leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
