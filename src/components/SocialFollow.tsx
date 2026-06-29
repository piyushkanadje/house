import { site } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import FacebookIcon from './FacebookIcon'
import InstagramIcon from './InstagramIcon'

interface SocialFollowProps {
  variant?: 'banner' | 'inline'
}

export default function SocialFollow({ variant = 'banner' }: SocialFollowProps) {
  const { t } = useLanguage()

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 hover:border-gold hover:text-gold transition-colors text-sm"
          aria-label={t.aria.instagram}
        >
          <InstagramIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{site.instagramHandle}</span>
        </a>
        <a
          href={site.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 hover:border-gold hover:text-gold transition-colors text-sm"
          aria-label={t.aria.facebook}
        >
          <FacebookIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{site.facebookLabel}</span>
        </a>
      </div>
    )
  }

  return (
    <div className="mt-10 rounded-2xl border border-forest/10 bg-cream/80 p-6 sm:p-8 text-center shadow-sm">
      <p className="text-base sm:text-lg text-forest/80 mb-5 max-w-lg mx-auto font-serif italic">
        {t.gallery.instagramCta}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-6 py-3 rounded-full border-2 border-forest text-forest font-medium text-sm hover:bg-forest hover:text-white transition-colors"
        >
          <InstagramIcon className="w-5 h-5" />
          <span>{t.gallery.instagramButton}</span>
        </a>
        <a
          href={site.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-6 py-3 rounded-full border-2 border-gold text-forest font-medium text-sm hover:bg-gold hover:text-forest transition-colors"
        >
          <FacebookIcon className="w-5 h-5" />
          <span>{t.gallery.facebookButton}</span>
        </a>
      </div>
    </div>
  )
}
