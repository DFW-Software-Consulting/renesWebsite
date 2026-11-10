import { lazyPage } from '../lib/lazyPage'

export const About = lazyPage(() => import('./About'))
export const Contact = lazyPage(() => import('./Contact'))
export const ServicesOverview = lazyPage(() => import('./ServicesOverview'))
export const ServicePage = lazyPage(() => import('./ServicePage'))
export const NotFound = lazyPage(() => import('./NotFound'))

export const allPages = [About, Contact, ServicesOverview, ServicePage, NotFound]

const STATIC_PAGES = {
  '/': null,
  '/about': About,
  '/contact': Contact,
  '/services': ServicesOverview,
}
const SERVICE_PATH = /^\/services\/[^/]+$/

/** The lazy page a URL renders (null for the eagerly loaded home page). */
export function pageFor(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (p in STATIC_PAGES) return STATIC_PAGES[p]
  return SERVICE_PATH.test(p) ? ServicePage : NotFound
}
