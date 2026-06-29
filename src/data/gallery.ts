import manifest from './gallery-manifest.json'

export type GalleryCategory =
  | 'pool'
  | 'rooms'
  | 'nature'
  | 'activities'
  | 'food'
  | 'events'
  | 'videos'

export interface GalleryItem {
  src: string
  type: 'image' | 'video'
  category: GalleryCategory
  alt: string
  poster?: string
}

const importedPhotos = manifest.photos as GalleryItem[]
const importedVideos = manifest.videos as GalleryItem[]

export const galleryItems: GalleryItem[] = [...importedPhotos, ...importedVideos]

export function filterGalleryItems(
  items: GalleryItem[],
  active: GalleryCategory,
): GalleryItem[] {
  if (active === 'videos') {
    return items.filter((item) => item.type === 'video')
  }
  return items.filter((item) => item.category === active)
}
