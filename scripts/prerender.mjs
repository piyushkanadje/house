// Build-time prerender: render each locale to static HTML so crawlers and social
// scrapers receive fully-populated content + JSON-LD without executing JS.
//
// Flow: serve the freshly built `dist/` with Vite's preview server, drive a real
// headless Chrome (Puppeteer) to each route, wait for the React app to render,
// then write the resulting HTML back over the file the route maps to.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { preview } from 'vite'
import puppeteer from 'puppeteer-core'

const PORT = Number(process.env.PRERENDER_PORT ?? 4178)
const distDir = process.env.DIST_DIR ?? 'dist'

// Linux build images (Vercel, AWS Lambda, most CI) have no system libraries for
// a normal Chrome, so use the self-contained @sparticuz/chromium there. Only use
// a locally installed Chrome on macOS / Windows dev, or an explicit path override.
// Platform is the reliable signal — env vars like VERCEL may not be exposed.
const localExecutable = process.env.PUPPETEER_EXECUTABLE_PATH
const useLocalChrome =
  !!localExecutable || process.platform === 'darwin' || process.platform === 'win32'

async function launchBrowser() {
  if (!useLocalChrome) {
    console.log('[prerender] launching @sparticuz/chromium (serverless)')
    const { default: chromium } = await import('@sparticuz/chromium')
    return puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless ?? true,
    })
  }
  console.log(`[prerender] launching local Chrome (${localExecutable || 'channel: chrome'})`)
  return puppeteer.launch({
    ...(localExecutable ? { executablePath: localExecutable } : { channel: 'chrome' }),
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
}

// route on the preview server -> output file relative to distDir
const ROUTES = [
  { path: '/', out: 'index.html' },
  { path: '/hi/', out: 'hi/index.html' },
  { path: '/mr/', out: 'mr/index.html' },
]

const server = await preview({ preview: { port: PORT, strictPort: true } })

const browser = await launchBrowser()

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
