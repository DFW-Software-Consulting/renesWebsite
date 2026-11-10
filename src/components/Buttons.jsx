import { Link } from 'react-router'
import { motion } from 'motion/react'
import { LuArrowRight, LuPhone } from 'react-icons/lu'
import { business } from '../data/site'

const MotionLink = motion.create(Link)

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-extrabold tracking-wide uppercase transition-colors'

const press = { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }

export function QuoteButton({ className = '', variant = 'red', children = 'Get a Free Quote' }) {
  const look = variant === 'dark' ? 'bg-ink hover:bg-ink-3' : 'bg-mower hover:bg-mower-dark'
  return (
    <MotionLink to="/contact" className={`${base} ${look} text-white ${className}`} {...press}>
      <span
        aria-hidden="true"
        className="bg-hazard animate-stripes absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
      <LuArrowRight aria-hidden="true" className="relative transition-transform group-hover:translate-x-1" />
    </MotionLink>
  )
}

export function CallButton({ className = '', variant = 'light' }) {
  const look =
    variant === 'light'
      ? 'border-2 border-white/80 text-white hover:bg-white hover:text-ink'
      : 'border-2 border-ink text-ink hover:bg-ink hover:text-white'
  return (
    <motion.a href={business.phoneHref} className={`${base} ${look} ${className}`} {...press}>
      <LuPhone aria-hidden="true" className="transition-transform group-hover:rotate-12" />
      <span>Call {business.phoneDisplay}</span>
    </motion.a>
  )
}
