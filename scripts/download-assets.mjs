import { execSync } from 'child_process'
import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const imagesDir = join(root, 'public/assets/images')
const videoDir = join(root, 'public/assets/video')

const assets = [
  {
    url: 'https://customer-assets.emergentagent.com/job_pixel-perfect-clone-61/artifacts/3cf7u90t_WhatsApp%20Video%202026-05-27%20at%2012.10.01%20AM.mp4',
    filename: 'hero-video.mp4',
    dir: 'video',
    category: 'hero',
  },
  {
    url: 'https://framerusercontent.com/images/eRQy0WhBqLf629L7o1VilLO4tQ.jpeg',
    filename: 'gallery-pool-01.jpeg',
    category: 'pool',
  },
  {
    url: 'https://framerusercontent.com/images/5TRt3bYAO57CVEqME8E6mUPjGL8.jpeg',
    filename: 'gallery-rooms-01.jpeg',
    category: 'rooms',
  },
  {
    url: 'https://framerusercontent.com/images/d5NrgoJPvEJX2c0HEECSkzlTsEs.jpeg',
    filename: 'gallery-rooms-02.jpeg',
    category: 'rooms',
  },
  {
    url: 'https://framerusercontent.com/images/qOlLBHIZ7N0X4nNpkDxOSdMqJBI.jpeg',
    filename: 'gallery-rooms-03.jpeg',
    category: 'rooms',
  },
  {
    url: 'https://framerusercontent.com/images/7jxHfypctXfNomLe1UlaBns.jpeg',
    filename: 'gallery-nature-01.jpeg',
    category: 'nature',
  },
  {
    url: 'https://framerusercontent.com/images/6wKGVf2zpFRIi92gXf2VjKyevg.jpeg',
    filename: 'gallery-nature-02.jpeg',
    category: 'nature',
  },
  {
    url: 'https://framerusercontent.com/images/2VoU4FZfXP09bXcPmLtqQiOjFRw.jpeg',
    filename: 'gallery-activities-01.jpeg',
    category: 'activities',
  },
  {
    url: 'https://framerusercontent.com/images/fOmBUFVpFJb1aalOhZHmZe55Fw.jpeg',
    filename: 'gallery-activities-02.jpeg',
    category: 'activities',
  },
  {
    url: 'https://framerusercontent.com/images/iusaVlKZYUW9t5TLECdy9WyiL0.jpeg',
    filename: 'gallery-food-01.jpeg',
    category: 'food',
  },
  {
    url: 'https://framerusercontent.com/images/DfQXButLqrVQqiMNIK9ciFYeXYU.jpeg',
    filename: 'gallery-food-02.jpeg',
    category: 'food',
  },
  {
    url: 'https://framerusercontent.com/images/VQGQlNHtjIKfFbdwUuxLuuGpvMY.jpeg',
    filename: 'gallery-food-03.jpeg',
    category: 'food',
  },
  {
    url: 'https://framerusercontent.com/images/bhEasiVQscxKOAOV2327TuhZPTA.jpg',
    filename: 'gallery-food-04.jpg',
    category: 'food',
  },
  {
    url: 'https://framerusercontent.com/images/BYKp9aZVNWnH4397CjNNc98CIQ.jpg',
    filename: 'gallery-food-05.jpg',
    category: 'food',
  },
  {
    url: 'https://framerusercontent.com/images/SnzS6p2kkVBXZP3nXB7JZB5ayo.jpeg',
    filename: 'gallery-events-01.jpeg',
    category: 'events',
  },
  {
    url: 'https://framerusercontent.com/images/Av3A6ROPs9Mo6cqsZO9MI4ISuNU.jpeg',
    filename: 'gallery-events-02.jpeg',
    category: 'events',
  },
  {
    url: 'https://framerusercontent.com/images/r5g6H2Fza9FyYukqAMPO55fGRA.jpeg',
    filename: 'gallery-events-03.jpeg',
    category: 'events',
  },
  {
    url: 'https://framerusercontent.com/images/eRQy0WhBqLf629L7o1VilLO4tQ.jpeg',
    filename: 'about-hero.jpeg',
    category: 'about',
  },
]

async function download(url, dest) {
  await mkdir(dirname(dest), { recursive: true })
  execSync(`curl -fsSL -4 -o "${dest}" "${url}"`, { stdio: 'inherit' })
  console.log(`Downloaded: ${dest}`)
}

async function main() {
  await mkdir(imagesDir, { recursive: true })
  await mkdir(videoDir, { recursive: true })

  const galleryItems = []

  for (const asset of assets) {
    const dir = asset.dir === 'video' ? videoDir : imagesDir
    const dest = join(dir, asset.filename)
    if (asset.filename === 'about-hero.jpeg') continue
    await download(asset.url, dest)
    if (asset.category !== 'brand' && asset.category !== 'hero') {
      galleryItems.push({
        src: `/assets/images/${asset.filename}`,
        category: asset.category,
        alt: `Srushti Farm House - ${asset.category}`,
      })
    }
  }

  const galleryTs = `export type GalleryCategory =
  | 'all'
  | 'pool'
  | 'rooms'
  | 'nature'
  | 'activities'
  | 'food'
  | 'events'

export interface GalleryItem {
  src: string
  category: Exclude<GalleryCategory, 'all'>
  alt: string
}

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pool', label: 'Pool' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'nature', label: 'Nature' },
  { id: 'activities', label: 'Activities' },
  { id: 'food', label: 'Food' },
  { id: 'events', label: 'Events' },
]

export const galleryItems: GalleryItem[] = ${JSON.stringify(galleryItems, null, 2)}
`

  await writeFile(join(root, 'src/data/gallery.ts'), galleryTs)
  console.log('Generated src/data/gallery.ts')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
