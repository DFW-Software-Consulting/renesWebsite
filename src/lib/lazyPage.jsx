import { lazy } from 'react'

/**
 * Code-split page that can be preloaded. Once preloaded it renders synchronously, so the
 * prerendered HTML and the first client render are the same tree (no Suspense fallback
 * during hydration). Before that it falls back to React.lazy for normal SPA navigation.
 */
export function lazyPage(load) {
  let Component = null
  const preload = () =>
    load().then((m) => {
      Component = m.default
      return m
    })
  const Lazy = lazy(preload)
  function Page(props) {
    return Component ? <Component {...props} /> : <Lazy {...props} />
  }
  Page.preload = preload
  return Page
}
