import { motion } from 'motion/react'
import Reveal from '../Reveal'
import { CallButton, QuoteButton } from '../Buttons'

export default function CtaBand({ title = 'Ready for a top flight lawn?' }) {
  return (
    <section aria-labelledby="cta-title" className="px-3 pb-24 sm:px-6">
      <div className="bg-mower relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-20 text-center sm:px-12 sm:py-28">
        <div aria-hidden="true" className="bg-hazard animate-stripes absolute inset-0 -z-10 opacity-60" />
        <motion.div
          aria-hidden="true"
          className="absolute -top-24 -right-24 -z-10 size-72 rounded-full border-[40px] border-dashed border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <Reveal>
          <p aria-hidden="true" className="font-script mb-3 -rotate-2 text-4xl leading-[1.4] text-white sm:text-5xl sm:leading-[1.4]">
            Let&rsquo;s talk grass
          </p>
          <h2 id="cta-title" className="font-display mx-auto mt-2 max-w-4xl text-5xl leading-[0.92] text-white uppercase sm:text-8xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-semibold text-white">
            Call us and get a free quote. Residential and commercial, all across Dallas.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <QuoteButton variant="dark" />
          <CallButton />
        </Reveal>
      </div>
    </section>
  )
}
