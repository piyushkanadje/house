import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const siteUrl = (process.env.VITE_SITE_URL ?? 'https://srushtifarmhouse.in').replace(/\/$/, '')
const distDir = process.env.DIST_DIR ?? 'dist'
const lastmod = new Date().toISOString().slice(0, 10)

// Path-based locale URLs (matches the prerendered pages: /, /hi/, /mr/).
const urls = [
  { loc: `${siteUrl}/`, lang: 'en' },
  { loc: `${siteUrl}/hi/`, lang: 'hi' },
  { loc: `${siteUrl}/mr/`, lang: 'mr' },
]

const alternates = `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="hi" href="${siteUrl}/hi/" />
    <xhtml:link rel="alternate" hreflang="mr" href="${siteUrl}/mr/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    ({ loc }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${alternates}
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
console.log(`Wrote ${join(distDir, 'sitemap.xml')}`)
