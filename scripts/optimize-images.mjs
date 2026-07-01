// Build-time image optimizer. Runs after `vite build` on every deploy (incl.
// Vercel Linux, where sharp installs prebuilt binaries). Re-encodes and resizes
// the JPEG/PNG files already copied into dist/assets, overwriting them in place —
// paths are unchanged, so no component/reference edits and no <picture> needed.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

const distDir = process.env.DIST_DIR ?? 'dist'
const assetsDir = join(distDir, 'assets')

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.warn('[optimize-images] sharp unavailable — skipping (images left as-is)')
  process.exit(0)
}

const JPEG_EXT = new Set(['.jpg', '.jpeg'])
const SKIP = new Set(['favicon.png']) // already tiny; leave untouched
const MAX_WIDTH = 1600
const LOGO_WIDTH = 220 // website-logo.png renders at ~55px, 2–4x is plenty

function walk(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else files.push(full)
  }
  return files
}

let optimized = 0
let savedBytes = 0

for (const file of walk(assetsDir)) {
  const ext = extname(file).toLowerCase()
  const name = basename(file)
  const isJpeg = JPEG_EXT.has(ext)
  const isPng = ext === '.png'
  if ((!isJpeg && !isPng) || SKIP.has(name)) continue

  const before = statSync(file).size
  const input = readFileSync(file) // read fully first so we can overwrite safely
  const width = name === 'website-logo.png' ? LOGO_WIDTH : MAX_WIDTH

  let pipeline = sharp(input).rotate().resize({ width, withoutEnlargement: true })
  pipeline = isJpeg
    ? pipeline.jpeg({ quality: 70, mozjpeg: true })
    : pipeline.png({ quality: 70, compressionLevel: 9, palette: true })

  const output = await pipeline.toBuffer()
  if (output.length < before) {
    writeFileSync(file, output)
    optimized += 1
    savedBytes += before - output.length
  }
}

console.log(
  `[optimize-images] optimized ${optimized} files, saved ${(savedBytes / 1024).toFixed(0)} KiB`,
)
