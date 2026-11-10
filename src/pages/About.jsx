import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { LuHandshake, LuMapPin, LuSparkles } from 'react-icons/lu'
import yard from '../assets/yard.webp'
import logo from '../assets/logo-large.webp'
import StripedD from '../components/StripedD'
import Reveal, { Eyebrow } from '../components/Reveal'
import CtaBand from '../components/home/CtaBand'
import { business, services } from '../data/site'

const values = [
  {
    icon: LuMapPin,
    title: 'Trusted & local',
    body: 'A reliable, locally owned Dallas company serving residential and commercial customers.',
  },
  {
    icon: LuSparkles,
    title: 'Passionate pros',
    body: 'An experienced team that cares about creating and keeping beautiful, healthy lawns.',
  },
  {
    icon: LuHandshake,
    title: 'Tailored to you',
    body: 'Personalized service built around the unique needs of each customer and property.',
  },
]

const heading = { hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }

export default function About() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.2, 1])

  return (
    <>
      <title>About | Top Flight Lawn Services</title>
      <meta
        name="description"
        content="Top Flight Lawn Services is a trusted, locally owned Dallas lawn care company led by owner Rene Guillen."
      />

      <section aria-labelledby="about-title" className="relative isolate overflow-hidden px-5 pt-36 pb-20 sm:px-8 sm:pt-44">
        <StripedD
          className="pointer-events-none absolute -top-10 -right-28 -z-10 w-[min(90vw,560px)] opacity-15"
          strokeClassName="stroke-mower"
        />
        <div className="mx-auto max-w-6xl">
          <Eyebrow className="text-mower">About us</Eyebrow>
          <motion.h1
            id="about-title"
            className="font-display mt-6 text-[clamp(3.25rem,12vw,8.5rem)] leading-[0.88] uppercase"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12 }}
          >
            {['Lawn care', 'with a', 'local edge.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={heading} className={`block ${i === 2 ? 'text-mower' : ''}`}>
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>
      </section>

      <section aria-label="Our story" className="mx-auto grid max-w-6xl overflow-x-clip pt-4 gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div aria-hidden="true" className="bg-mow-stripes absolute -inset-2 -z-10 rotate-2 rounded-[2rem]" />
          <img
            src={logo}
            alt="Top Flight Lawn Services logo: a white striped D on black with a red zero-turn mower and the Dallas skyline"
            width="553"
            height="760"
            loading="lazy"
            className="w-full rounded-[1.75rem] shadow-2xl shadow-black/60"
          />
        </Reveal>

        <div className="space-y-6 text-lg leading-relaxed text-white/80">
          <Reveal>
            <p className="text-2xl leading-snug font-semibold text-white">
              {business.name} is a trusted and reliable local lawn service company that specializes in high-quality
              lawn care for residential and commercial customers.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Our team of experienced professionals is passionate about creating and maintaining beautiful, healthy
              lawns that boost the curb appeal of your property.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              We offer a wide range of services, including lawn mowing, shrub and tree trimming, clean-ups and leaf
              pick-up, gutter cleaning, weed control, and more.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              We pride ourselves on personalized, tailored service that meets the unique needs of each customer.
              Contact us today to get started, and let us make your lawn the envy of the neighborhood!
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="flex flex-wrap gap-2 pt-2" aria-label="Services">
              {services.map((s) => (
                <li key={s.id} className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold text-white">
                  {s.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-ink-2 py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 id="values-title" className="font-display text-5xl uppercase sm:text-6xl">
              What we stand for
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <v.icon aria-hidden="true" className="text-mower size-9" />
                <h3 className="font-display mt-6 text-2xl tracking-wide uppercase">{v.title}</h3>
                <p className="mt-2 text-white/70">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section ref={ref} aria-labelledby="owner-title" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem]">
          <motion.img
            src={yard}
            alt="A bright home with a landscaped yard and trimmed greenery"
            width="1200"
            height="800"
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ scale: imgScale }}
          />
        </div>
        <Reveal>
          <Eyebrow className="text-turf">Owner</Eyebrow>
          <h2 id="owner-title" className="font-display mt-4 text-6xl uppercase sm:text-7xl">
            {business.owner}
          </h2>
          {/* TODO(rene): add a short owner bio and a real photo of Rene or the crew here. */}
          <p className="mt-4 text-lg text-white/75">
            Questions about your yard? Reach Rene directly for a free quote.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.phoneHref}
              className="bg-mower hover:bg-mower-dark inline-flex min-h-12 items-center justify-center rounded-full px-6 font-extrabold text-white transition-colors"
            >
              {business.phoneDisplay}
            </a>
            <a
              href={business.emailHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/70 px-6 font-extrabold break-all transition-colors hover:bg-white hover:text-black"
            >
              {business.email}
            </a>
          </div>
        </Reveal>
      </section>

      <CtaBand title="Let's make your lawn the envy of the block." />
    </>
  )
}
