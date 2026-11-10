import { lazyPage } from '../lib/lazyPage'

export const About = lazyPage(() => import('./About'))
export const Contact = lazyPage(() => import('./Contact'))
export const ServicesOverview = lazyPage(() => import('./ServicesOverview'))
export const ServicePage = lazyPage(() => import('./ServicePage'))
export const NotFound = lazyPage(() => import('./NotFound'))

export const allPages = [About, Contact, ServicesOverview, ServicePage, NotFound]

/** The lazy page a URL renders (null for the eagerly loaded home page). */
export function pageFor(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (p === '/') return null
  if (p === '/about') return About
  if (p === '/contact') return Contact
  if (p === '/services') return ServicesOverview
  if (/^\/services\/[^/]+$/.test(p)) return ServicePage
  return NotFound
}
