import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import FloatingCall from './components/FloatingCall'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'

const loadAbout = () => import('./pages/About')
const loadContact = () => import('./pages/Contact')
const About = lazy(loadAbout)
const Contact = lazy(loadContact)
const NotFound = lazy(() => import('./pages/NotFound'))

function page(element) {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-[100svh]" />}>{element}</Suspense>
    </PageTransition>
  )
}

export default function App() {
  const location = useLocation()

  // Warm the likely-next routes once the browser is idle.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500))
    idle(() => {
      loadAbout()
      loadContact()
    })
  }, [])

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
            <Route path="/about" element={page(<About />)} />
            <Route path="/contact" element={page(<Contact />)} />
            <Route path="*" element={page(<NotFound />)} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingCall />
      <Toaster theme="dark" position="top-center" richColors closeButton />
    </MotionConfig>
  )
}
