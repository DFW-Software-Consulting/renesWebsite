import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import FloatingCall from './components/FloatingCall'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import { About, Contact, NotFound, ServicePage, ServicesOverview } from './pages'
import { useMounted } from './lib/hooks'
import { applyHead, getPageMeta } from './seo'

function page(element) {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-[100svh]" />}>{element}</Suspense>
    </PageTransition>
  )
}

export default function App() {
  const location = useLocation()
  const mounted = useMounted()

  // Warm the likely-next routes once the browser is idle.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500))
    idle(() => {
      ServicesOverview.preload()
      ServicePage.preload()
      Contact.preload()
      About.preload()
    })
  }, [])

  // The prerendered HTML ships the right <head>; keep it in sync after client-side navigation.
  useEffect(() => {
    applyHead(getPageMeta(location.pathname))
  }, [location.pathname])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="bg-mower sr-only z-[80] rounded-full px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />

      <main id="main" tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={page(<Home />)} />
            <Route path="/services" element={page(<ServicesOverview />)} />
            <Route path="/services/:slug" element={page(<ServicePage />)} />
            <Route path="/about" element={page(<About />)} />
            <Route path="/contact" element={page(<Contact />)} />
            <Route path="*" element={page(<NotFound />)} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingCall />
      {/* Client-only: toasts are never part of the prerendered HTML. */}
      {mounted && <Toaster theme="dark" position="top-center" richColors closeButton />}
    </MotionConfig>
  )
}
