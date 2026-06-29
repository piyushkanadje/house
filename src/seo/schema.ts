import { absoluteUrl, phones, site } from '../data/siteContent'
import type { PackageTranslation, PolicyTranslation } from '../i18n/types'

export function buildLodgingBusinessSchema(packages: PackageTranslation[]) {
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
    name: site.name,
    alternateName: [
      'Srushti Farmhouse',
      'Srushti Farm House Donje Pune',
      'Srushti Farm House Sinhgad',
    ],
    url: site.siteUrl,
    image: [absoluteUrl(site.ogImage), absoluteUrl(site.logo)],
    telephone: phones.map((p) => `+91${p.number}`),
    email: site.email,
    priceRange: '₹₹',
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
    areaServed: ['Pune', 'Sinhgad', 'Khadakwasla', 'Donje'],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Rain Dance', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Campfire', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Meals Included', value: true },
    ],
    sameAs: site.sameAs,
    makesOffer: offers,
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
