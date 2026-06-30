export type Locale = 'en' | 'hi' | 'mr'

export interface PackageTranslation {
  name: string
  timing: string
  price: number
  features: string[]
  popular?: boolean
  familyPick?: boolean
  whatsappMessage: string
}

export interface ExperienceTranslation {
  title: string
  description?: string
  tag?: string
}

export interface AboutStat {
  label: string
  value: string
}

export interface UseCase {
  title: string
  description: string
}

export interface NearbyPlace {
  name: string
  distance: string
  description: string
}

export interface TestimonialTranslation {
  quote: string
  name: string
  location: string
  initial: string
}

export interface PolicyTranslation {
  title: string
  body: string
}

export interface Translations {
  meta: {
    title: string
    description: string
  }
  common: {
    bookNow: string
    call: string
    whatsapp: string
    perPerson: string
    getDirections: string
    callNow: string
    allRightsReserved: string
    bookOnWhatsApp: string
    seePackages: string
  }
  nav: {
    about: string
    experiences: string
    packages: string
    gallery: string
    location: string
    contact: string
  }
  hero: {
    tagline: string
    title: string
    subtitle: string
    bookStay: string
    explorePackages: string
    scrollToExplore: string
    badges: string[]
  }
  about: {
    eyebrow: string
    title: string
    intro: string
    useCasesTitle: string
    useCases: UseCase[]
    stats: AboutStat[]
    slides: { alt: string; caption: string }[]
  }
  nearby: {
    eyebrow: string
    title: string
    intro: string
    places: NearbyPlace[]
    reachTitle: string
    reachPoints: string[]
  }
  experiences: {
    title: string
    outdoorTitle: string
    indoorTitle: string
    outdoor: ExperienceTranslation[]
    indoor: ExperienceTranslation[]
  }
  packages: {
    eyebrow: string
    title: string
    mostPopular: string
    bestForFamilies: string
    footerNote: string
    askCustomPlan: string
    foodNote: string
    foodHighlights: string[]
    items: PackageTranslation[]
  }
  gallery: {
    title: string
    categories: {
      pool: string
      rooms: string
      nature: string
      activities: string
      food: string
      events: string
      videos: string
    }
    imageAlt: (category: string) => string
    instagramCta: string
    instagramButton: string
    facebookButton: string
    viewMorePhotos: string
  }
  testimonials: {
    title: string
    seeMore: string
    allReviewsTitle: string
    items: TestimonialTranslation[]
  }
  policies: {
    title: string
    badges: string[]
    items: PolicyTranslation[]
  }
  location: {
    title: string
    addressLabel: string
    phoneLabel: string
    vistaAlt: string
    address: {
      name: string
      line2: string
      line3: string
    }
  }
  contact: {
    eyebrow: string
    title: string
    whatsappBooking: string
    viewPackages: string
    phonesCombinedLabel: string
  }
  footer: {
    tagline: string
    description: string
    seoLine: string
    explore: string
    contact: string
    connect: string
    whatsappBookings: string
    followInstagram: string
    followFacebook: string
  }
  whatsapp: {
    default: string
    customPlan: string
    menu: string
    fab: string
    outreach: (purpose: string) => string
  }
  aria: {
    openMenu: string
    closeMenu: string
    pause: string
    play: string
    mute: string
    unmute: string
    whatsapp: string
    instagram: string
    facebook: string
  }
}
