import { motion } from 'motion/react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Eyebrow } from '../components/Reveal'
import { CallButton, QuoteButton } from '../components/Buttons'
import { ServiceGrid } from '../components/home/Services'
import CtaBand from '../components/home/CtaBand'
import { business } from '../data/site'

const fadeUp = (delay = 0, fade = true) => ({
  initial: fade ? { opacity: 0, y: 24 } : { y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function ServicesOverview() {
  return (
    <>
      <section aria-labelledby="services-page-title" className="relative isolate overflow-hidden px-5 pt-36 pb-16 sm:px-8 sm:pt-44">
        <div aria-hidden="true" className="bg-mower/20 absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
            ]}
          />
          <Eyebrow className="text-mower mt-8">Residential &amp; commercial</Eyebrow>
          <motion.h1
            id="services-page-title"
            className="font-display mt-6 text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase"
            {...fadeUp()}
          >
            Lawn care services in <span className="text-mower">Dallas, TX</span>
          </motion.h1>
          <motion.p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl" {...fadeUp(0.15, false)}>
            {business.name} is a locally owned Dallas company offering lawn mowing, shrub and tree trimming, clean-ups
            and leaf pick-up, gutter cleaning, weed control, and flowerbeds and mulch for homes and businesses. Every
            quote is free. Call {business.phoneDisplay} or send us a message.
          </motion.p>
          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" {...fadeUp(0.25)}>
            <QuoteButton />
            <CallButton />
          </motion.div>
        </div>
      </section>

      <section aria-label="All services" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
        <ServiceGrid headingAs="h2" />
      </section>

      <CtaBand />
    </>
  )
}
