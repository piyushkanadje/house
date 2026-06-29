import { execSync, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'
import { photoSources, videoSources } from './gallery-source.config.mjs'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const sourceDir = join(root, 'images')
const photosOut = join(root, 'public', 'assets', 'gallery', 'photos')
const videosOut = join(root, 'public', 'assets', 'gallery', 'videos')
const postersOut = join(root, 'public', 'assets', 'gallery', 'posters')
const manifestPath = join(root, 'src', 'data', 'gallery-manifest.json')

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'])
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm'])

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' })
  if (result.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(' ')}`)
  }
}

function hasSips() {
  try {
    execSync('which sips', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function processPhoto(entry) {
  const src = join(sourceDir, entry.file)
  if (!existsSync(src)) {
    console.warn(`Skip missing photo: ${entry.file}`)
    return null
  }

  const out = join(photosOut, `${entry.slug}.jpg`)
  const ext = extname(entry.file).toLowerCase()

  if (hasSips()) {
    if (ext === '.heic' || ext === '.heif') {
      run('sips', ['-s', 'format', 'jpeg', src, '--out', out])
    } else if (ext === '.png') {
      run('sips', ['-s', 'format', 'jpeg', src, '--out', out])
    } else {
      run('cp', [src, out])
    }
    run('sips', ['-Z', '1920', out])
  } else {
    run('cp', [src, out])
    console.warn('sips not found — copied photo without resize')
  }

  return {
    src: `/assets/gallery/photos/${entry.slug}.jpg`,
    type: 'image',
    category: entry.category,
    alt: entry.alt,
  }
}

function getVideoBitrate(inputPath) {
  try {
    const out = execSync(
      `"${ffmpegPath}" -i "${inputPath}" 2>&1 | grep Duration || true`,
      { shell: true, encoding: 'utf8' },
    )
    const match = out.match(/Duration: (\d+):(\d+):(\d+)/)
    if (!match) return '1200k'
    const seconds = Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3])
    if (seconds <= 0) return '1200k'
    const targetBytes = 14 * 1024 * 1024
    const bitrate = Math.floor((targetBytes * 8) / seconds / 1000)
    return `${Math.min(Math.max(bitrate, 600), 2500)}k`
  } catch {
    return '1200k'
  }
}

function processVideo(entry) {
  const src = join(sourceDir, entry.file)
  if (!existsSync(src)) {
    console.warn(`Skip missing video: ${entry.file}`)
    return null
  }

  const out = join(videosOut, `${entry.slug}.mp4`)
  const poster = join(postersOut, `${entry.slug}.jpg`)
  const bitrate = getVideoBitrate(src)

  run(ffmpegPath, [
    '-y',
    '-i',
    src,
    '-vf',
    'scale=1280:-2',
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-b:v',
    bitrate,
    '-maxrate',
    bitrate,
    '-bufsize',
    `${parseInt(bitrate, 10) * 2}k`,
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-movflags',
    '+faststart',
    out,
  ])

  run(ffmpegPath, ['-y', '-ss', '00:00:01', '-i', out, '-vframes', '1', '-update', '1', '-q:v', '3', poster])

  return {
    src: `/assets/gallery/videos/${entry.slug}.mp4`,
    type: 'video',
    category: entry.category ?? 'videos',
    alt: entry.alt,
    poster: `/assets/gallery/posters/${entry.slug}.jpg`,
  }
}

function assertNoOversizedFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    const size = execSync(`stat -f%z "${path}"`, { encoding: 'utf8' }).trim()
    if (Number(size) > 100 * 1024 * 1024) {
      throw new Error(`File exceeds 100MB: ${path}`)
    }
  }
}

mkdirSync(photosOut, { recursive: true })
mkdirSync(videosOut, { recursive: true })
mkdirSync(postersOut, { recursive: true })

if (!existsSync(sourceDir)) {
  throw new Error(`Source folder not found: ${sourceDir}`)
}

if (!ffmpegPath) {
  throw new Error('ffmpeg-static binary not found. Run npm install.')
}

const processedPhotos = photoSources.map(processPhoto).filter(Boolean)
const processedVideos = videoSources.map(processVideo).filter(Boolean)

assertNoOversizedFiles(videosOut)

const manifest = {
  photos: processedPhotos,
  videos: processedVideos,
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Wrote ${manifestPath}`)
console.log(`Photos: ${processedPhotos.length}, Videos: ${processedVideos.length}`)

// Warn about unlisted source files (website_logo.png is handled by prepare-logo.mjs)
const listed = new Set([
  ...photoSources.map((p) => p.file),
  ...videoSources.map((v) => v.file),
  'website_logo.png',
])
const unlisted = readdirSync(sourceDir).filter((name) => {
  const ext = extname(name).toLowerCase()
  return (IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext)) && !listed.has(name)
})
if (unlisted.length) {
  console.warn('Unlisted files in images/:', unlisted.join(', '))
}
