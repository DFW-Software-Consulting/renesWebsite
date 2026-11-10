import { useSyncExternalStore } from 'react'
import { useReducedMotion as useMotionReducedMotion } from 'motion/react'

const subscribeNoop = () => () => {}

/** False during SSR and the hydration render, true after mount. */
export function useMounted() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false)
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
