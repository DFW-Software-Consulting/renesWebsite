import { useEffect, useState } from 'react'
import { useReducedMotion as useMotionReducedMotion } from 'motion/react'

/** False during SSR and the hydration render, true after mount. */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

/**
 * Hydration-safe reduced-motion check. The server can't know the user's preference,
 * so the first client render must match it (false); the real value applies after mount.
 * MotionConfig reducedMotion="user" still suppresses transform animations meanwhile.
 */
export function useReducedMotion() {
  const reduce = useMotionReducedMotion()
  return useMounted() ? Boolean(reduce) : false
}
