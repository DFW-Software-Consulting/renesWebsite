// Build step 3/3: render every route to static HTML (dist/<route>.html), plus 404.html and
// sitemap.xml. Runs after `vite build` (client) and `vite build --ssr` (dist-ssr).
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const ssr = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> placeholders')
}

// Preload the display font (hero headline) so it doesn't swap late.
const assets = await fs.readdir(path.join(dist, 'assets'))
const anton = assets.find((f) => /^anton-latin-400-normal-.+\.woff2$/.test(f))
const sharedHead = anton
  ? [`<link rel="preload" href="/assets/${anton}" as="font" type="font/woff2" crossorigin />`]
  : []

const fileFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`)

async function prerender(url, file) {
  const meta = ssr.getPageMeta(url)
  const head = [...sharedHead]
  if (url === '/') head.push(`<link rel="preload" href="${ssr.heroImage}" as="image" fetchpriority="high" />`)
  head.push(ssr.renderHead(meta))
  const html = template
    .replace('<!--app-head-->', head.join('\n    '))
    .replace('<!--app-html-->', await ssr.render(url))
  const out = path.join(dist, file)
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, html)
  console.log(`  prerendered ${url.padEnd(40)} -> dist/${file}`)
}

for (const url of ssr.routes) await prerender(url, fileFor(url))
// Served by Vercel with a real 404 status for any unknown URL.
await prerender('/404', '404.html')

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ssr.routes
  .map((url) => `  <url>\n    <loc>${ssr.getPageMeta(url).canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap)
console.log(`  wrote sitemap.xml (${ssr.routes.length} URLs)`)

await fs.rm(ssrDir, { recursive: true, force: true })
