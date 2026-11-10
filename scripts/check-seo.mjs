// SEO smoke test over the prerendered output. Run after `npm run build`.
// Usage: node scripts/check-seo.mjs [distDir]
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://tfls.dfwsc.com'
const dist = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, '..', 'dist'))
const errors = []
const fail = (where, msg) => errors.push(`${where}: ${msg}`)

const read = (file) => (fs.existsSync(path.join(dist, file)) ? fs.readFileSync(path.join(dist, file), 'utf8') : null)

// Routes come from the sitemap, so the sitemap itself is the source of truth.
const sitemap = read('sitemap.xml')
let routes = []
if (sitemap === null) fail('sitemap.xml', 'missing')
else {
  if (!/^\s*<\?xml[^>]*\?>\s*<urlset[\s>]/.test(sitemap) || !/<\/urlset>\s*$/.test(sitemap)) {
    fail('sitemap.xml', 'not well-formed (expected <urlset> root)')
  }
  const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].trim())
  if (locs.length === 0) fail('sitemap.xml', 'lists no URLs')
  if (new Set(locs).size !== locs.length) fail('sitemap.xml', 'contains duplicate URLs')
  for (const loc of locs) {
    if (!loc.startsWith(SITE)) fail('sitemap.xml', `URL not on ${SITE}: ${loc}`)
    routes.push(new URL(loc).pathname)
  }
}

for (const file of ['robots.txt', 'llms.txt']) if (read(file) === null) fail(file, 'missing from dist')
if (read('404.html') === null) fail('404.html', 'missing from dist')

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]
const metas = (html) => [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0])
const hasType = (node, re) => {
  if (Array.isArray(node)) return node.some((n) => hasType(n, re))
  if (node && typeof node === 'object') {
    const t = [node['@type']].flat().filter(Boolean)
    return t.some((x) => re.test(x)) || Object.values(node).some((v) => hasType(v, re))
  }
  return false
}
const BANNED = /^(AggregateRating|Review|Rating)$/

const titles = new Map()
for (const route of routes) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  const where = file
  const html = read(file)
  if (html === null) {
    fail(where, `prerendered file missing for route ${route}`)
    continue
  }

  const h1s = (html.match(/<h1[\s>]/g) ?? []).length
  if (h1s !== 1) fail(where, `expected exactly one <h1>, found ${h1s}`)

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim()
  if (!title) fail(where, 'missing or empty <title>')
  else if (titles.has(title)) fail(where, `duplicate <title> "${title}" (also ${titles.get(title)})`)
  else titles.set(title, where)

  const tags = metas(html)
  const named = (n) => tags.find((t) => attr(t, 'name') === n)
  const prop = (p) => tags.find((t) => attr(t, 'property') === p)
  if (!attr(named('description') ?? '', 'content')?.trim()) fail(where, 'missing meta description')

  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0]
  const href = canonical && attr(canonical, 'href')
  if (!href) fail(where, 'missing canonical link')
  else if (!href.startsWith(SITE)) fail(where, `canonical must start with ${SITE}, got ${href}`)

  const og = attr(prop('og:image') ?? '', 'content')
  if (!og) fail(where, 'missing og:image')
  else if (!/^https?:\/\//.test(og)) fail(where, `og:image must be absolute, got ${og}`)

  const blocks = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  blocks.forEach((b, i) => {
    try {
      const data = JSON.parse(b[1])
      if (hasType(data, BANNED)) fail(where, `JSON-LD block ${i + 1} contains AggregateRating/Review markup`)
    } catch (e) {
      fail(where, `JSON-LD block ${i + 1} is not valid JSON (${e.message})`)
    }
  })
}

const notFound = read('404.html')
if (notFound && !/noindex/.test(notFound)) fail('404.html', 'should be noindex')

if (errors.length) {
  console.error(`SEO check failed (${errors.length}):\n${errors.map((e) => `  - ${e}`).join('\n')}`)
  process.exit(1)
}
console.log(`SEO check passed: ${routes.length} routes, sitemap, robots.txt, llms.txt, 404.html`)
