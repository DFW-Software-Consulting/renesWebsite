import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import lawn from '../../assets/lawn.webp'
import Mower from '../Mower'
import StripedD from '../StripedD'
import { CallButton, QuoteButton } from '../Buttons'
import { trustBadges } from '../../data/site'

const LINES = [
  { words: ['Lawns', 'that'] },
  { words: ['look'], outline: true },
  { words: ['top', 'flight.'], accent: true },
]

const word = {
  hidden: { y: '110%', rotate: 6 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

function KineticHeadline() {
  let i = 0
  return (
    <motion.h1
      id="hero-title"
      className="font-display text-[clamp(3.5rem,13vw,9.5rem)] leading-[0.88] tracking-tight uppercase"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
    >
      {LINES.map((line, li) => (
        <span key={li} className="block">
          {line.words.map((w) => {
            i += 1
            return (
              <span key={w + i} className="mr-[0.18em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0">
                <motion.span
                  variants={word}
                  className={`inline-block origin-bottom-left ${line.accent ? 'text-mower' : ''} ${
                    line.outline ? 'text-outline' : ''
                  }`}
                >
                  {w}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </motion.h1>
  )
}

/** The signature moment: a mower driving the strip, leaving freshly cut stripes behind. */
function MowingStrip() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="bg-mow-stripes relative h-20 overflow-hidden sm:h-24">
      <motion.div
        className="bg-mow-stripes-cut absolute inset-0"
        initial={{ x: '-100%' }}
        animate={reduce ? { x: '-35%' } : { x: ['-100%', '0%'] }}
        transition={reduce ? { duration: 0 } : { duration: 7, ease: 'linear', repeat: Infinity, repeatDelay: 0.6 }}
      >
        <div className="absolute top-1/2 right-0 w-24 translate-x-[70%] -translate-y-[62%] sm:w-28">
          <Mower spinning={!reduce} className="w-full drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]" />
        </div>
      </motion.div>
      <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/40 to-transparent" />
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1.25])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-30%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])
  const dRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -12])
  const dY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '20%'])

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <motion.img
        src={lawn}
        alt=""
        fetchPriority="high"
        width="1600"
        height="900"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ y: bgY, scale: bgScale }}
      />
      <div className="from-ink via-ink/85 to-ink/30 absolute inset-0 -z-10 bg-gradient-to-r" />
      <div className="from-ink absolute inset-0 -z-10 bg-gradient-to-t via-transparent to-transparent" />
      <div className="grain absolute inset-0 -z-10 opacity-60" />

      <motion.div
        className="pointer-events-none absolute top-[12%] -right-24 -z-10 w-[min(80vw,620px)] opacity-15 sm:-right-10 lg:opacity-20"
        style={{ rotate: dRotate, y: dY }}
      >
        <StripedD className="w-full" delay={0.6} />
      </motion.div>

      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-32 pb-16 sm:px-8"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.p
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-turf size-2 rounded-full" aria-hidden="true" />
          Locally owned &middot; Dallas, TX
        </motion.p>

        <KineticHeadline />

        <motion.p
          className="mt-8 max-w-xl text-lg text-white/80 sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Mowing, trimming, clean-ups, gutters, and weed control for Dallas homes and businesses. Call us and get
          a free quote.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <QuoteButton />
          <CallButton />
        </motion.div>

        <motion.ul
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          aria-label="Why Top Flight"
        >
          {trustBadges.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-turf">
                &#10003;
              </span>
              {b}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <MowingStrip />
    </section>
  )
}
