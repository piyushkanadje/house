import { useEffect } from 'react'
import { absoluteUrl, site } from '../data/siteContent'
import type { Locale } from '../i18n/types'

interface SeoMeta {
  title: string
  description: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let el = document.querySelector(selector) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    if (hreflang) el.hreflang = hreflang
    document.head.appendChild(el)
  }
  el.href = href
}

function pageUrl(locale: Locale) {
  if (locale === 'en') return absoluteUrl('/')
  return absoluteUrl(`/?lang=${locale}`)
}

export function useSeo(locale: Locale, meta: SeoMeta) {
  useEffect(() => {
    document.title = meta.title

    upsertMeta('name', 'description', meta.description)
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', pageUrl(locale))
    upsertMeta('property', 'og:image', absoluteUrl(site.ogImage))
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:locale', locale === 'hi' ? 'hi_IN' : locale === 'mr' ? 'mr_IN' : 'en_IN')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', absoluteUrl(site.ogImage))

    upsertLink('canonical', pageUrl(locale))
    upsertLink('alternate', absoluteUrl('/'), 'en')
    upsertLink('alternate', absoluteUrl('/?lang=hi'), 'hi')
    upsertLink('alternate', absoluteUrl('/?lang=mr'), 'mr')
    upsertLink('alternate', absoluteUrl('/'), 'x-default')
  }, [locale, meta.title, meta.description])
}
