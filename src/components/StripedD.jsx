import { motion } from 'motion/react'

const LINES = [0, 1, 2]

/**
 * The three parallel stripes of the logo's "D", drawn as nested strokes.
 * Decorative; draws itself in on mount (opacity-only under reduced motion).
 */
export default function StripedD({ className = '', delay = 0.2, strokeClassName = 'stroke-white' }) {
  return (
    <svg viewBox="-10 -10 260 280" className={className} aria-hidden="true" focusable="false" fill="none">
      {LINES.map((i) => {
        const o = i * 26
        const r = 130 - o
        return (
          <motion.path
            key={i}
            d={`M ${o - 10} ${o} H 110 A ${r} ${r} 0 0 1 110 ${260 - o} H ${o + 14} V ${o + 70}`}
            className={strokeClassName}
            strokeWidth="14"
            strokeLinecap="butt"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: delay + i * 0.18, ease: [0.65, 0, 0.35, 1] }}
          />
        )
      })}
    </svg>
  )
}
