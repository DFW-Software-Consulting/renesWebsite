import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { LuCloudRain, LuFlower2, LuShrub, LuSprout, LuTreeDeciduous, LuWind } from 'react-icons/lu'
import { MowerIcon } from '../Mower'
import Reveal, { Eyebrow } from '../Reveal'
import { QuoteButton } from '../Buttons'
import { services } from '../../data/site'

const ICONS = {
  mowing: MowerIcon,
  shrubs: LuShrub,
  trees: LuTreeDeciduous,
  cleanup: LuWind,
  gutters: LuCloudRain, LuFlower2,
  weeds: LuSprout,
  flowerbeds: LuFlower2,
}

// Wide cards keep the grid balanced with 7 items (2+1 / 3 / 1+2 on desktop, 1 + 3x2 on tablet).
const WIDE = { mowing: 'sm:col-span-2', flowerbeds: 'lg:col-span-2' }

const spring = { stiffness: 260, damping: 22 }

function ServiceCard({ service, index }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const gx = useMotionValue(-400)
  const gy = useMotionValue(-400)
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring)
  const glow = useMotionTemplate`radial-gradient(360px circle at ${gx}px ${gy}px, rgb(227 38 43 / 0.28), transparent 65%)`
  const Icon = ICONS[service.id]

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
    gx.set(e.clientX - r.left)
    gy.set(e.clientY - r.top)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    gx.set(-400)
    gy.set(-400)
  }

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full [perspective:1000px]">
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group bg-ink-2 hover:border-mower/60 relative h-full overflow-hidden rounded-3xl border border-white/10 p-7 transition-colors sm:p-8"
      >
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div
          aria-hidden="true"
          className="bg-mow-stripes absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        />
        <div className="relative flex items-start justify-between" style={{ transform: 'translateZ(40px)' }}>
          <span className="bg-mower grid size-14 place-items-center rounded-2xl text-white shadow-lg shadow-black/40 transition-transform duration-500 group-hover:-rotate-6">
            <Icon className="size-7" />
          </span>
          <span aria-hidden="true" className="font-display text-5xl text-white/10">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-display relative mt-8 text-3xl tracking-wide text-balance uppercase" style={{ transform: 'translateZ(30px)' }}>
          {service.title}
        </h3>
        <p className="relative mt-3 text-white/70">{service.blurb}</p>
      </motion.article>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section aria-labelledby="services-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <p aria-hidden="true" className="font-script text-mower mb-4 origin-left -rotate-2 text-3xl leading-[1.4] sm:text-4xl sm:leading-[1.4]">
            Free quotes!
          </p>
          <Eyebrow className="text-mower mt-2">What we do</Eyebrow>
          <h2 id="services-title" className="font-display mt-4 text-5xl leading-[0.95] uppercase sm:text-7xl">
            Full-service yard care.
            <br />
            <span className="text-white/40">Residential &amp; commercial.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <QuoteButton />
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.id} className={WIDE[s.id]}>
            <ServiceCard service={s} index={i} />
          </li>
        ))}
      </ul>
    </section>
  )
}
