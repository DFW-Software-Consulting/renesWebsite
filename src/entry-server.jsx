import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { allPages } from './pages'
import heroImage from './assets/lawn.webp'

export { getPageMeta, renderHead, routes } from './seo'
export { services, servicePath, faqs, business, SITE_URL } from './data/site'
export { heroImage }

/** Render a URL to HTML. All page chunks are preloaded so nothing suspends. */
export async function render(url) {
  await Promise.all(allPages.map((p) => p.preload()))
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
