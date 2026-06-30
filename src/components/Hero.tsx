import { useRef, useState } from 'react'
import { ChevronDown, Pause, Play, Phone, Volume2, VolumeX } from 'lucide-react'
import { site, phone, whatsappLink, phoneLink } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const { t } = useLanguage()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (playing) video.pause()
    else video.play()
    setPlaying(!playing)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !muted
    setMuted(!muted)
  }

  return (
    <section id="top" className="section-padding relative min-h-screen flex items-center justify-center overflow-hidden">
      {isMobile ? (
        <img
          src={site.heroPoster}
          alt={t.about.slides[0].alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={site.heroPoster}
          aria-label={t.about.slides[0].alt}
        >
          <source src={site.heroVideo} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-forest/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white pt-24 pb-28">
        <p className="eyebrow mb-4 text-gold-light font-bold text-sm! sm:text-base! md:text-lg! lg:text-xl!">{t.hero.tagline}</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-5">
          {t.hero.title}
        </h1>
        <p className="text-base sm:text-lg text-white/85 max-w-lg mx-auto mb-8 leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a
            href={whatsappLink(t.whatsapp.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-gold text-forest font-semibold rounded-full hover:bg-gold-light transition-colors"
          >
            {t.hero.bookStay}
          </a>
          <a
            href={phoneLink(phone)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/40 text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {t.common.call}
          </a>
          <a
            href="#packages"
            className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white rounded-full hover:bg-white/10 transition-colors"
          >
            {t.hero.explorePackages}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {t.hero.badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 text-xs sm:text-sm bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs tracking-widest uppercase">{t.hero.scrollToExplore}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

      {!isMobile && (
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          <button
            type="button"
            onClick={togglePlay}
            className="p-2.5 bg-black/40 backdrop-blur rounded-full text-white hover:bg-black/60"
            aria-label={playing ? t.aria.pause : t.aria.play}
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="p-2.5 bg-black/40 backdrop-blur rounded-full text-white hover:bg-black/60"
            aria-label={muted ? t.aria.unmute : t.aria.mute}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}
    </section>
  )
}
