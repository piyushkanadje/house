import { absoluteUrl, phones, site, whatsappLink } from '../data/siteContent'
import type { PackageTranslation, PolicyTranslation } from '../i18n/types'

const AMENITIES = [
  'Swimming Pool',
  'Rain Dance',
  'Campfire',
  'Bonfire',
  'Lawn Games',
  'Indoor Games',
  'Karaoke',
  'Unlimited Meals',
  'Veg & Non-veg Food',
  'Free Parking',
  'Family Friendly',
  'Group & Event Hosting',
]

export function buildLodgingBusinessSchema(packages: PackageTranslation[], description?: string) {
  const offers = packages.map((pkg) => ({
    '@type': 'Offer',
    name: pkg.name,
    description: pkg.features.join(', '),
    price: pkg.price,
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url: absoluteUrl('/#packages'),
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${site.siteUrl}/#lodging`,
    name: site.name,
    alternateName: [
      'Srushti Farmhouse',
      'Srushti Farm House Donje Pune',
      'Srushti Farm House Sinhgad',
    ],
    description,
    url: site.siteUrl,
    image: [absoluteUrl(site.ogImage), absoluteUrl(site.logo)],
    logo: absoluteUrl(site.logo),
    telephone: phones.map((p) => `+91${p.number}`),
    email: site.email,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street}, ${site.address.locality}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.googleMapsUrl,
    areaServed: ['Pune', 'Sinhgad', 'Khadakwasla', 'Donje', 'Panshet', 'Swargate'],
    amenityFeature: AMENITIES.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    sameAs: site.sameAs,
    makesOffer: offers,
    potentialAction: {
      '@type': 'ReserveAction',
      target: whatsappLink('Hi Srushti Farm House, I want to book a stay.'),
      name: 'Book on WhatsApp',
    },
  }
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.siteUrl,
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.siteUrl,
      logo: absoluteUrl(site.logo),
    },
  }
}

export function buildFaqSchema(policies: PolicyTranslation[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: policies.map((policy) => ({
      '@type': 'Question',
      name: policy.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: policy.body,
      },
    })),
  }
}
