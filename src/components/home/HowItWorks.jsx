import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { LuClipboardCheck, LuPhoneCall, LuScissors, LuSun } from 'react-icons/lu'
import Mower from '../Mower'
import Reveal, { Eyebrow } from '../Reveal'
import { steps } from '../../data/site'
import { useReducedMotion } from '../../lib/hooks'

const ICONS = [LuPhoneCall, LuClipboardCheck, LuScissors, LuSun]

function Step({ step, index, progress }) {
  const start = index / steps.length
  const lit = useTransform(progress, [start, start + 0.12], [0.3, 1])
  const Icon = ICONS[index]
  return (
    <li className="relative">
      <motion.span aria-hidden="true" className="font-display text-mower block text-7xl leading-none" style={{ opacity: lit }}>
        {String(index + 1).padStart(2, '0')}
      </motion.span>
      <h3 className="font-display mt-4 flex items-center gap-3 text-2xl tracking-wide uppercase">
        <Icon aria-hidden="true" className="text-turf size-6 shrink-0" />
        <span>
          <span className="sr-only">Step {index + 1}: </span>
          {step.title}
        </span>
      </h3>
      <p className="mt-2 text-white/70">{step.body}</p>
    </li>
  )
}

export default function HowItWorks() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const x = useTransform(progress, [0, 1], reduce ? ['0%', '0%'] : ['-100%', '0%'])

  return (
    <section ref={ref} aria-labelledby="how-title" className="bg-ink-2 relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow className="text-turf">How it works</Eyebrow>
          <h2 id="how-title" className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] uppercase sm:text-7xl">
            From first call to <span className="text-mower">fresh stripes.</span>
          </h2>
        </Reveal>

        <div aria-hidden="true" className="bg-mow-stripes relative mt-16 h-16 overflow-hidden rounded-full opacity-90">
          <motion.div className="bg-mow-stripes-cut absolute inset-0" style={{ x }}>
            <div className="absolute top-1/2 right-0 w-20 translate-x-[60%] -translate-y-[58%]">
              <Mower spinning={!reduce} className="w-full" />
            </div>
          </motion.div>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Step key={s.title} step={s} index={i} progress={reduce ? scrollYProgress : progress} />
          ))}
        </ol>
      </div>
    </section>
  )
}
