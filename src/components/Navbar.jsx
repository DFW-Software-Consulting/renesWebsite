import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { LuMenu, LuPhone, LuX } from 'react-icons/lu'
import logoMark from '../assets/logo-mark.webp'
import { business, navLinks } from '../data/site'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 rounded-lg" aria-label={`${business.name}, home`}>
      <img src={logoMark} alt="" width="40" height="40" className="size-10 rounded-full ring-2 ring-white/20" />
      <span className="leading-none">
        <span className="font-display block text-xl tracking-wide uppercase">Top Flight</span>
        <span className="block text-[0.65rem] font-bold tracking-[0.3em] text-white/70 uppercase">Lawn Services</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  // While open: lock scroll, move focus into the menu, close on Escape, trap Tab.
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector('a')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const items = [...headerRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length)
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [open])

  const condensed = scrolled && !open

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div
        className={`relative z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-500 ease-out sm:px-6 ${
          condensed
            ? 'bg-ink/70 border border-white/10 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl'
            : 'border border-transparent py-4'
        }`}
      >
        <Brand />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end className="relative block rounded-full px-4 py-2 text-sm font-bold tracking-wide uppercase">
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/15"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className={`relative ${isActive ? 'text-white' : 'text-white/75 hover:text-white'}`}>
                        {l.label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={business.phoneHref}
          className="bg-mower hover:bg-mower-dark hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold text-white transition-colors md:inline-flex"
        >
          <LuPhone aria-hidden="true" />
          {business.phoneDisplay}
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/5 text-xl md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'x' : 'menu'}
              className="block"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="bg-ink fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pt-28 pb-10 md:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div aria-hidden="true" className="bg-mow-stripes absolute inset-x-0 bottom-0 h-40 opacity-25" />
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={l.to}
                      end
                      className={({ isActive }) =>
                        `font-display block py-1 text-6xl uppercase ${isActive ? 'text-mower' : 'text-white'}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative mt-auto space-y-3 pt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href={business.phoneHref}
                className="bg-mower flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-extrabold text-white"
              >
                <LuPhone aria-hidden="true" /> Call {business.phoneDisplay}
              </a>
              <a
                href={business.emailHref}
                className="block py-2 text-center text-white/80 underline-offset-4 hover:underline"
              >
                {business.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
