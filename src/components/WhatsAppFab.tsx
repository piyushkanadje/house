import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../data/siteContent'
import { useLanguage } from '../i18n/LanguageContext'

export default function WhatsAppFab() {
  const { t } = useLanguage()

  return (
    <a
      href={whatsappLink(t.whatsapp.default)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 bg-whatsapp text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      aria-label={t.whatsapp.fab}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">{t.whatsapp.fab}</span>
    </a>
  )
}
