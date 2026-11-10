import { motion, useScroll, useSpring } from 'motion/react'
import { useReducedMotion } from '../lib/hooks'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className="bg-mower fixed inset-x-0 top-0 z-[60] h-1 origin-left"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  )
}
