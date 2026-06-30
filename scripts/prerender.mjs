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

// Vercel / AWS Lambda build images have no system libraries for Chrome, so use
// @sparticuz/chromium there. Locally, drive an installed Chrome (or a path from
// PUPPETEER_EXECUTABLE_PATH).
const isServerless = !!(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.AWS_EXECUTION_ENV
)

async function launchBrowser() {
  if (isServerless) {
    const { default: chromium } = await import('@sparticuz/chromium')
    return puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless ?? true,
    })
  }
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
  return puppeteer.launch({
    ...(executablePath ? { executablePath } : { channel: 'chrome' }),
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
