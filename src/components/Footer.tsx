import { MessageCircle } from 'lucide-react'
import { navHrefs, phones, site, whatsappLink, phoneLink } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import SocialFollow from './SocialFollow'

export default function Footer() {
  const { t } = useLanguage()

  const navLinks = navHrefs.map((link) => ({
    href: link.href,
    label: t.nav[link.key],
  }))

  return (
    <footer className="bg-forest-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="#top" className="flex items-center gap-3 mb-4">
              <img src={site.logo} alt={site.name} className="h-10 sm:h-11 w-auto object-contain" />
              <div className="min-w-0">
                <span className="block font-serif text-sm sm:text-base text-white leading-tight">
                  {site.navBrandLine1}
                </span>
                <span className="block text-[10px] sm:text-xs text-gold/90 leading-snug mt-0.5">
                  {site.navBrandLine2}
                </span>
              </div>
            </a>
            <p className="text-white/60 text-sm leading-relaxed">{t.footer.description}</p>
            <p className="text-white/30 text-xs mt-2 tracking-wide">{t.footer.seoLine}</p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">{t.footer.explore}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">{t.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                {t.location.address.name}
                <br />
                {site.address.street}
                <br />
                {t.location.address.line2}
                <br />
                {t.location.address.line3}
              </li>
              <li>
                <span className="block text-white/40 text-xs mb-1">{t.contact.phonesCombinedLabel}</span>
                <span className="leading-relaxed text-base font-medium">
                  {phones.map((p, i) => (
                    <span key={p.number}>
                      {i > 0 && <span className="text-white/30"> / </span>}
                      <a
                        href={phoneLink(p.number)}
                        className="hover:text-gold transition-colors whitespace-nowrap"
                      >
                        +91 {p.number}
                      </a>
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-gold transition-colors">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(t.whatsapp.default)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  {t.footer.whatsappBookings}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">{t.footer.connect}</h4>
            <a
              href={whatsappLink(t.whatsapp.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mb-4 p-2.5 bg-white/10 rounded-full hover:bg-whatsapp transition-colors"
              aria-label={t.aria.whatsapp}
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <SocialFollow variant="inline" />
            <p className="text-xs text-white/40 mt-3 leading-relaxed">{t.footer.followInstagram}</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center sm:text-left text-sm text-white/40">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. {t.common.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
