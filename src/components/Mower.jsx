import { motion } from 'motion/react'

const spin = { rotate: 360 }
const spinTransition = { duration: 0.6, ease: 'linear', repeat: Infinity }
const wheelStyle = { transformBox: 'fill-box', transformOrigin: 'center' }

/** Side-view zero-turn mower in brand red. Decorative: always aria-hidden. */
export default function Mower({ className = '', spinning = true }) {
  const Wheel = spinning ? motion.g : 'g'
  const wheelProps = spinning ? { animate: spin, transition: spinTransition, style: wheelStyle } : {}

  return (
    <svg viewBox="0 0 124 84" className={className} aria-hidden="true" focusable="false">
      {/* engine */}
      <rect x="8" y="30" width="18" height="18" rx="3" fill="#2a2a2a" />
      <rect x="10" y="33" width="14" height="2" fill="#555" />
      <rect x="10" y="38" width="14" height="2" fill="#555" />
      {/* body */}
      <path d="M14 46 L84 46 Q92 46 96 54 L98 58 L22 60 Q14 60 14 52 Z" fill="#e3262b" />
      <path d="M20 46 L84 46 Q90 46 93 51 L22 52 Z" fill="#ff4a4f" opacity="0.6" />
      {/* cutting deck */}
      <path d="M46 60 L112 60 Q118 60 118 65 L118 67 L46 67 Z" fill="#b8161b" />
      {/* seat */}
      <path d="M28 20 Q28 14 34 14 L38 14 Q40 14 40 18 L40 40 L30 40 Q28 40 28 38 Z" fill="#9a9a9a" />
      <path d="M30 38 L56 38 Q60 38 60 42 L60 46 L30 46 Z" fill="#222" />
      {/* lap bars */}
      <path d="M58 44 L64 22 L72 22" stroke="#cfcfcf" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M52 44 L57 26" stroke="#9a9a9a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* rear drive wheel */}
      <g transform="translate(34 64)">
        <circle r="17" fill="#111" />
        <Wheel {...wheelProps}>
          <circle r="17" fill="#111" />
          <circle r="11" fill="none" stroke="#3a3a3a" strokeWidth="4" strokeDasharray="5 3" />
          <circle r="6" fill="#d9d9d9" />
          <rect x="-1.2" y="-6" width="2.4" height="12" fill="#888" />
        </Wheel>
      </g>
      {/* front caster */}
      <rect x="99" y="54" width="3" height="12" fill="#b8161b" />
      <g transform="translate(101 74)">
        <circle r="9" fill="#111" />
        <Wheel {...wheelProps}>
          <circle r="9" fill="#111" />
          <circle r="4" fill="#d9d9d9" />
          <rect x="-0.8" y="-4" width="1.6" height="8" fill="#888" />
        </Wheel>
      </g>
    </svg>
  )
}

/** Lucide-style outline mower icon to sit alongside the other service icons. */
export function MowerIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 13h13l3 3H9" />
      <path d="M6 13V7a1 1 0 0 1 1-1h2v7" />
      <path d="M12 13l2-6h3" />
      <circle cx="7" cy="18" r="2.5" />
      <circle cx="18" cy="19" r="1.5" />
    </svg>
  )
}
