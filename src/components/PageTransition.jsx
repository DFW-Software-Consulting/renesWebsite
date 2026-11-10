import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const ease = [0.76, 0, 0.24, 1]

// The enter curtain is skipped on the very first paint so it never delays the hero.
let hasNavigated = false

/**
 * Wraps each route. A striped red curtain wipes away on enter and sweeps in on exit.
 * Under reduced motion the curtain is skipped and only a quick fade remains.
 */
export default function PageTransition({ children }) {
  const reduce = useReducedMotion()
  const [showEnterCurtain] = useState(() => hasNavigated)
  useEffect(() => {
    hasNavigated = true
  }, [])
  return (
    <>
      <motion.div
        initial={showEnterCurtain ? { opacity: 0, y: reduce ? 0 : 24 } : false}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: reduce || !showEnterCurtain ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        {children}
      </motion.div>
      {!reduce && (
        <>
          {showEnterCurtain && (
            <motion.div
              aria-hidden="true"
              className="bg-mower pointer-events-none fixed inset-0 z-[70] origin-top"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0, transition: { duration: 0.55, ease } }}
              exit={{ scaleY: 0 }}
            >
              <div className="bg-hazard absolute inset-0" />
            </motion.div>
          )}
          <motion.div
            aria-hidden="true"
            className="bg-mower pointer-events-none fixed inset-0 z-[70] origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1, transition: { duration: 0.45, ease } }}
          >
            <div className="bg-hazard absolute inset-0" />
          </motion.div>
        </>
      )}
    </>
  )
}
