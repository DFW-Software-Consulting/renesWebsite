import { useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { LuPhone } from 'react-icons/lu'
import { business } from '../data/site'

/** Mobile-only floating click-to-call, shown once the user scrolls past the hero. */
export default function FloatingCall() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 360))

  return (
    <AnimatePresence>
      {show && pathname !== '/contact' && (
        <motion.a
          href={business.phoneHref}
          className="bg-mower fixed right-4 bottom-4 z-40 inline-flex min-h-14 items-center gap-2 rounded-full px-5 font-extrabold text-white shadow-xl shadow-black/50 md:hidden"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        >
          <motion.span
            aria-hidden="true"
            className="border-mower absolute inset-0 rounded-full border-2"
            animate={{ scale: [1, 1.25], opacity: [0.8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
          <LuPhone aria-hidden="true" className="text-lg" />
          Call now
          <span className="sr-only"> {business.phoneDisplay}</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
