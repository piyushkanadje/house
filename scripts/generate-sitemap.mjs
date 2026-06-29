import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const siteUrl = (process.env.VITE_SITE_URL ?? 'https://srushtifarmhouse.in').replace(/\/$/, '')
const distDir = process.env.DIST_DIR ?? 'dist'

const urls = [
  { loc: `${siteUrl}/`, lang: 'en' },
  { loc: `${siteUrl}/?lang=hi`, lang: 'hi' },
  { loc: `${siteUrl}/?lang=mr`, lang: 'mr' },
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    ({ loc }) => `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="hi" href="${siteUrl}/?lang=hi" />
    <xhtml:link rel="alternate" hreflang="mr" href="${siteUrl}/?lang=mr" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
console.log(`Wrote ${join(distDir, 'sitemap.xml')}`)
