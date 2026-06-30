import { MessageCircle, Phone } from 'lucide-react'
import { phoneLink, phone, whatsappLink } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'
import { trackEvent } from '../seo/analytics'

export default function WhatsAppFab() {
  const { t } = useLanguage()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href={phoneLink(phone)}
        onClick={() => trackEvent('call_click', { location: 'fab' })}
        className="flex items-center gap-2 px-5 py-3.5 bg-forest text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        aria-label={t.common.call}
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-semibold hidden sm:inline">{t.common.call}</span>
      </a>
      <a
        href={whatsappLink(t.whatsapp.default)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { location: 'fab' })}
        className="flex items-center gap-2 px-5 py-3.5 bg-whatsapp text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        aria-label={t.whatsapp.fab}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-semibold hidden sm:inline">{t.whatsapp.fab}</span>
      </a>
    </div>
  )
}
