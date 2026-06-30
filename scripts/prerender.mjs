// Build-time prerender: render each locale to static HTML so crawlers and social
// scrapers receive fully-populated content + JSON-LD without executing JS.
//
// Flow: serve the freshly built `dist/` with Vite's preview server, drive a real
// headless Chrome (Puppeteer) to each route, wait for the React app to render,
// then write the resulting HTML back over the file the route maps to.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { preview } from 'vite'
import puppeteer from 'puppeteer'

const PORT = Number(process.env.PRERENDER_PORT ?? 4178)
const distDir = process.env.DIST_DIR ?? 'dist'

// route on the preview server -> output file relative to distDir
const ROUTES = [
  { path: '/', out: 'index.html' },
  { path: '/hi/', out: 'hi/index.html' },
  { path: '/mr/', out: 'mr/index.html' },
]

const server = await preview({ preview: { port: PORT, strictPort: true } })

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  for (const route of ROUTES) {
    const page = await browser.newPage()

    // Skip media/fonts so a slow remote hero video can't stall networkidle.
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const type = req.resourceType()
      if (type === 'media' || type === 'font') req.abort()
      else req.continue()
    })

    const url = `http://localhost:${PORT}${route.path}`
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
    await page.waitForSelector('main', { timeout: 30000 })
    await page.waitForFunction(
      () => (document.getElementById('root')?.childElementCount ?? 0) > 0,
      { timeout: 30000 },
    )

    const html = await page.content()
    const outPath = join(distDir, route.out)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)
    console.log(`Prerendered ${route.path} -> ${outPath}`)
    await page.close()
  }
} finally {
  await browser.close()
  await server.close()
}
