export const site = {
  name: 'Srushti Farm House',
  email: 'srushti.farm.sinhgad@gmail.com',
  logo: '/assets/images/website-logo.png',
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://srushtifarmhouse.in',
  heroVideo:
    'https://customer-assets.emergentagent.com/job_pixel-perfect-clone-61/artifacts/3cf7u90t_WhatsApp%20Video%202026-05-27%20at%2012.10.01%20AM.mp4',
  heroPoster: '/assets/images/hero-img-1759.jpg',
  ogImage: '/assets/images/gallery-pool-01.jpeg',
  mapImage: '/assets/images/map-location.png',
  mapsEmbed:
    'https://www.google.com/maps?q=Srushti+Farm+House,+Sinhgad,+Donje,+Pune&output=embed',
  mapsDirections: 'https://maps.app.goo.gl/5uZjdHJuyxR4ScDP7',
  googleMapsUrl: 'https://maps.app.goo.gl/5uZjdHJuyxR4ScDP7',
  geo: {
    latitude: 18.4371,
    longitude: 73.7553,
  },
  address: {
    street: 'Survey No. 412, Panshet Road, Opposite Surajya Apt.',
    locality: 'Donje, Sinhgad',
    city: 'Pune',
    region: 'Maharashtra',
    postalCode: '411025',
    country: 'IN',
  },
  sameAs: [
    'https://maps.app.goo.gl/5uZjdHJuyxR4ScDP7',
    'https://www.justdial.com/Pune/Srushti-Farm-House-Sinhgad-Donje-Pune-Opposite-Surajya-Donje/020PXX20-XX20-181127203410-L5I5_BZDET',
    'https://www.instagram.com/srushti_farm_sinhgad_pune',
    'https://www.facebook.com/share/1JKNujGrQY/',
  ],
  instagramUrl:
    'https://www.instagram.com/srushti_farm_sinhgad_pune?igsh=MW5qaWdpd2V6ZWp2&utm_source=qr',
  instagramHandle: '@srushti_farm_sinhgad_pune',
  facebookUrl: 'https://www.facebook.com/share/1JKNujGrQY/?mibextid=wwXIfr',
  facebookLabel: 'Srushti Farm House',
  navBrandLine1: 'Srushti Farm House,',
  navBrandLine2: 'Sinhgad, Donje, Pune',
}

export const phones = [
  { key: 'bookings' as const, number: '7767994666' },
  { key: 'reservations' as const, number: '9404953555' },
  { key: 'inquiries' as const, number: '7058863476' },
]

export const aboutSlides = [
  '/assets/gallery/photos/pool-deck-view.jpg',
  '/assets/gallery/photos/outdoor-thali-dinner.jpg',
  '/assets/gallery/photos/family-get-together.jpg',
] as const

export const locationVistaImage = '/assets/gallery/photos/sinhgad-terrace-view.jpg'

export const FEATURED_GALLERY_LIMIT = 8

export const navHrefs = [
  { href: '#about', key: 'about' as const },
  { href: '#experiences', key: 'experiences' as const },
  { href: '#packages', key: 'packages' as const },
  { href: '#gallery', key: 'gallery' as const },
  { href: '#location', key: 'location' as const },
  { href: '#contact', key: 'contact' as const },
]

const BOOKING_PHONE = '917767994666'

export function whatsappLink(message: string) {
  return `https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(message)}`
}

export function phoneLink(number: string) {
  return `tel:+91${number}`
}

export function formatPrice(price: number) {
  return price.toLocaleString('en-IN')
}

export function absoluteUrl(path: string) {
  const base = site.siteUrl.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
