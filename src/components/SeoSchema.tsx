import { buildFaqSchema, buildLodgingBusinessSchema, buildWebSiteSchema } from '../seo/schema'
import { useLanguage } from '../i18n/LanguageContext'

export default function SeoSchema() {
  const { t } = useLanguage()

  const graphs = [
    buildWebSiteSchema(),
    buildLodgingBusinessSchema(t.packages.items),
    buildFaqSchema(t.policies.items),
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphs) }}
    />
  )
}
