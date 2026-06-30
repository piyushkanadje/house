import { useEffect, useState } from 'react'
import { Star, ArrowUpRight, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import type { TestimonialTranslation } from '../i18n/types'
import SectionHeader from './SectionHeader'

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
  )
}

function ReviewCard({ item }: { item: TestimonialTranslation }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl p-6 border border-forest/10 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-3">
        <Stars />
      </div>
      <p className="text-forest/80 text-sm leading-relaxed mb-5 flex-1">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-forest text-gold flex items-center justify-center font-serif text-sm">
          {item.initial}
        </div>
        <div>
          <p className="font-medium text-forest text-sm">{item.name}</p>
          <p className="text-xs text-sage">{item.location}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const topReviews = t.testimonials.items.slice(0, 3)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.testimonials.title} />

        <div className="grid sm:grid-cols-3 gap-5">
          {topReviews.map((item) => (
            <ReviewCard key={item.name} item={item} />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-gold transition-colors"
          >
            {t.testimonials.seeMore}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.testimonials.allReviewsTitle}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-forest/10">
              <h3 className="font-serif text-xl text-forest">{t.testimonials.allReviewsTitle}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1.5 rounded-full text-forest hover:bg-forest/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-6 grid sm:grid-cols-2 gap-5">
              {t.testimonials.items.map((item) => (
                <ReviewCard key={`${item.name}-${item.quote}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
