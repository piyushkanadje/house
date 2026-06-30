import { useState } from 'react'
import { filterGalleryItems, galleryItems, type GalleryCategory } from '../data/gallery'
import { FEATURED_GALLERY_LIMIT, site } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeader from './SectionHeader'
import SocialFollow from './SocialFollow'

const categoryKeys: GalleryCategory[] = [
  'pool',
  'activities',
  'food',
  'rooms',
  'events',
  'nature',
  'videos',
]

export default function Gallery() {
  const [active, setActive] = useState<GalleryCategory>('pool')
  const { t } = useLanguage()

  const allFiltered = filterGalleryItems(galleryItems, active)
  const filtered = allFiltered.slice(0, FEATURED_GALLERY_LIMIT)
  const hasMore = allFiltered.length > FEATURED_GALLERY_LIMIT

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.gallery.title} />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? 'bg-forest text-white'
                  : 'bg-cream text-forest hover:bg-forest/10'
              }`}
            >
              {t.gallery.categories[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-forest/5"
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label={item.alt}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          ))}
        </div>

        {hasMore && (
          <p className="text-center mt-6">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-forest/70 hover:text-gold font-medium tracking-wide transition-colors"
            >
              {t.gallery.viewMorePhotos}
            </a>
          </p>
        )}

        <SocialFollow />
      </div>
    </section>
  )
}
