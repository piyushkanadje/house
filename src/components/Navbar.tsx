import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { navHrefs, phones, site, whatsappLink, phoneLink } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = navHrefs.map((link) => ({
    href: link.href,
    label: t.nav[link.key],
  }))

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-forest/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#top" className="flex items-center gap-3 group">
            <img src={site.logo} alt={site.name} className="h-10 sm:h-11 w-auto object-contain" />
            <div className="text-left min-w-0">
              <span className="block font-serif text-sm sm:text-base text-white leading-tight">
                {site.navBrandLine1}
              </span>
              <span className="block text-[10px] sm:text-xs text-gold/90 leading-snug mt-0.5">
                {site.navBrandLine2}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/80 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href={whatsappLink(t.whatsapp.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-gold text-forest text-sm font-semibold rounded-full hover:bg-gold-light transition-colors"
            >
              {t.common.bookOnWhatsApp}
            </a>
            <a
              href={phoneLink(phones[0].number)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t.common.call}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2 text-white"
              onClick={() => setOpen(!open)}
              aria-label={open ? t.aria.closeMenu : t.aria.openMenu}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-forest border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-white/90 hover:text-gold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink(t.whatsapp.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 bg-gold text-forest font-semibold rounded-full"
          >
            {t.common.bookOnWhatsApp}
          </a>
          <a
            href={phoneLink(phones[0].number)}
            className="flex items-center justify-center gap-2 w-full py-3 border border-white/30 text-white font-semibold rounded-full"
          >
            <Phone className="w-4 h-4" />
            {t.common.call}
          </a>
        </div>
      )}
    </header>
  )
}
