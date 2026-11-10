import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { LuArrowUpRight, LuBadgeCheck } from 'react-icons/lu'
import hedges from '../../assets/hedges.webp'
import Reveal, { Eyebrow } from '../Reveal'
import { business, trustBadges } from '../../data/site'
import { useReducedMotion } from '../../lib/hooks'

export default function AboutTeaser() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])
  const clip = useTransform(scrollYProgress, [0, 0.35], reduce ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(18% 12% 18% 12% round 2rem)', 'inset(0% 0% 0% 0% round 2rem)'])

  return (
    <section ref={ref} aria-labelledby="about-teaser-title" className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
      <motion.div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-[4/5]" style={{ clipPath: clip }}>
        <motion.img
          src={hedges}
          alt="Neatly trimmed hedges lining a garden path"
          loading="lazy"
          width="1200"
          height="675"
          className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
          style={{ y: imgY }}
        />
        <div className="from-ink/70 absolute inset-0 bg-gradient-to-t to-transparent" />
        <p className="font-display absolute bottom-6 left-6 text-3xl uppercase sm:text-4xl">
          Sharp edges.
          <br />
          <span className="text-mower">Clean lines.</span>
        </p>
      </motion.div>

      <div>
        <Reveal>
          <Eyebrow className="text-mower">About us</Eyebrow>
          <h2 id="about-teaser-title" className="font-display mt-4 text-5xl leading-[0.95] uppercase sm:text-6xl">
            Your neighbors in Dallas lawn care.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-white/75">
            {business.name} is a trusted, reliable local company led by owner {business.owner}. We care for
            residential and commercial properties, and we tailor every job to what your yard actually needs.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            {trustBadges.map((b) => (
              <li key={b} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 font-semibold">
                <LuBadgeCheck aria-hidden="true" className="text-turf size-5 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            to="/about"
            className="group hover:text-mower mt-10 inline-flex items-center gap-2 text-lg font-extrabold uppercase underline decoration-2 underline-offset-8 transition-colors"
          >
            Meet Top Flight
            <LuArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
