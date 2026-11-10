// Per-route metadata and JSON-LD. Used at build time (prerender) to write <head>,
// and on the client to keep <head> in sync after SPA navigation.
import { SITE_URL, business, faqs, serviceBySlug, servicePath, services } from './data/site'

const BUSINESS_ID = `${SITE_URL}/#business`
const WEBSITE_ID = `${SITE_URL}/#website`
const OWNER_ID = `${SITE_URL}/#rene-guillen`
const OG_IMAGE = { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }

const abs = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)
const brand = (t) => `${t} | ${business.name}`

const dallas = {
  '@type': 'City',
  name: 'Dallas',
  containedInPlace: { '@type': 'State', name: business.regionName },
}

const serviceId = (s) => `${abs(servicePath(s))}#service`

function businessEntity() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    additionalType: 'https://en.wikipedia.org/wiki/Lawn_care',
    name: business.name,
    description: business.description,
    slogan: 'High-quality lawn & home maintenance at the best prices',
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/apple-touch-icon.png`, width: 180, height: 180 },
    image: OG_IMAGE.url,
    telephone: business.phoneIntl,
    email: business.email,
    founder: { '@id': OWNER_ID },
    employee: { '@id': OWNER_ID },
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.locality,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    areaServed: dallas,
    sameAs: ['https://www.facebook.com/profile.php?id=100086916005109'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Lawn care and yard maintenance services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', '@id': serviceId(s), name: s.title, url: abs(servicePath(s)) },
      })),
    },
  }
}

const graphBase = () => [
  businessEntity(),
  {
    '@type': 'Person',
    '@id': OWNER_ID,
    name: business.owner,
    jobTitle: 'Owner',
    worksFor: { '@id': BUSINESS_ID },
  },
  {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: business.name,
    inLanguage: 'en-US',
    publisher: { '@id': BUSINESS_ID },
  },
]

const faqPage = (path, items) => ({
  '@type': 'FAQPage',
  '@id': `${abs(path)}#faq`,
  url: abs(path),
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

const breadcrumbs = (path, trail) => ({
  '@type': 'BreadcrumbList',
  '@id': `${abs(path)}#breadcrumb`,
  itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path) })),
})

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': [...graphBase(), ...nodes] })

/** Every indexable route, in sitemap order. */
export const routes = ['/', '/services', ...services.map(servicePath), '/about', '/contact']

const NOT_FOUND = {
  title: brand('Page Not Found'),
  description: 'This page does not exist. Visit Top Flight Lawn Services for Dallas lawn care and free quotes.',
  noindex: true,
}

export function getPageMeta(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  let meta

  if (path === '/') {
    meta = {
      title: `${business.name} | Dallas Lawn Care & Free Quotes`,
      description:
        'Locally owned Dallas lawn care: mowing, shrub and tree trimming, clean-ups and leaf pick-up, gutter cleaning, weed control, and flowerbeds. Call 214-779-4259 for a free quote.',
      jsonLd: graph(faqPage('/', faqs)),
    }
  } else if (path === '/about') {
    meta = {
      title: brand('About Us: Locally Owned Dallas Lawn Care'),
      description:
        'Top Flight Lawn Services is a locally owned Dallas lawn care company led by owner Rene Guillen, serving residential and commercial properties. Free quotes.',
      jsonLd: graph(),
    }
  } else if (path === '/contact') {
    meta = {
      title: brand('Contact Us for a Free Quote'),
      description:
        'Get a free lawn care quote in Dallas, TX. Call Top Flight Lawn Services at 214-779-4259, email mowtopflight@gmail.com, or send a message.',
      jsonLd: graph(),
    }
  } else if (path === '/services') {
    meta = {
      title: brand('Lawn Care Services in Dallas, TX'),
      description:
        'Lawn mowing, shrub and tree trimming, clean-ups and leaf pick-up, gutter cleaning, weed control, and flowerbeds and mulch in Dallas, TX. Residential and commercial. Free quotes.',
      jsonLd: graph(
        breadcrumbs('/services', [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]),
      ),
    }
  } else if (path.startsWith('/services/')) {
    const s = serviceBySlug(path.slice('/services/'.length))
    if (s) {
      meta = {
        title: brand(`${s.title} in Dallas, TX`),
        description: s.metaDescription,
        jsonLd: graph(
          {
            '@type': 'Service',
            '@id': serviceId(s),
            name: `${s.title} in Dallas, TX`,
            serviceType: s.serviceType,
            description: s.intro,
            url: abs(path),
            provider: { '@id': BUSINESS_ID },
            areaServed: dallas,
            audience: { '@type': 'Audience', audienceType: 'Residential and commercial property owners' },
          },
          breadcrumbs(path, [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: s.title, path },
          ]),
          faqPage(path, s.faqs),
        ),
      }
    }
  }

  if (!meta) return { ...NOT_FOUND, jsonLd: null, canonical: null }
  return { ...meta, canonical: abs(path), noindex: false }
}

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// `<` is escaped so a string in the data can never close the script tag.
export const jsonLdString = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

/** Head tags for the prerendered HTML. */
export function renderHead(meta) {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
  ]
  if (meta.noindex) tags.push('<meta name="robots" content="noindex" />')
  if (meta.canonical) tags.push(`<link rel="canonical" href="${meta.canonical}" />`)
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(business.name)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
  )
  if (meta.canonical) tags.push(`<meta property="og:url" content="${meta.canonical}" />`)
  tags.push(
    `<meta property="og:image" content="${OG_IMAGE.url}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${esc(business.name)} logo" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE.url}" />`,
  )
  if (meta.jsonLd) tags.push(`<script type="application/ld+json">${jsonLdString(meta.jsonLd)}</script>`)
  return tags.join('\n    ')
}

/** Client-side: sync <head> after an SPA navigation. */
export function applyHead(meta) {
  document.title = meta.title
  const set = (selector, attr, value, create) => {
    let el = document.head.querySelector(selector)
    if (value == null) {
      el?.remove()
      return
    }
    if (!el) {
      el = document.createElement(create.tag)
      for (const [k, v] of Object.entries(create.attrs)) el.setAttribute(k, v)
      document.head.append(el)
    }
    el.setAttribute(attr, value)
  }
  const metaName = (name, value) => set(`meta[name="${name}"]`, 'content', value, { tag: 'meta', attrs: { name } })
  const metaProp = (property, value) =>
    set(`meta[property="${property}"]`, 'content', value, { tag: 'meta', attrs: { property } })

  metaName('description', meta.description)
  metaName('robots', meta.noindex ? 'noindex' : null)
  set('link[rel="canonical"]', 'href', meta.canonical, { tag: 'link', attrs: { rel: 'canonical' } })
  metaProp('og:title', meta.title)
  metaProp('og:description', meta.description)
  metaProp('og:url', meta.canonical)
  metaName('twitter:title', meta.title)
  metaName('twitter:description', meta.description)
  set('script[type="application/ld+json"]', 'textContent', null)
  if (meta.jsonLd) {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.textContent = JSON.stringify(meta.jsonLd)
    document.head.append(s)
  }
}
