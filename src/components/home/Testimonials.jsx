import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LuArrowLeft, LuArrowRight, LuQuote } from 'react-icons/lu'
import Reveal, { Eyebrow } from '../Reveal'
import { testimonials } from '../../data/site'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const count = testimonials.length
  const t = testimonials[index]
  const go = (d) => setIndex((i) => (i + d + count) % count)

  return (
    <section aria-labelledby="reviews-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="bg-mower/20 absolute top-1/2 left-1/2 -z-10 size-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow className="text-mower">Client spotlight</Eyebrow>
          <h2 id="reviews-title" className="font-display mt-4 text-5xl uppercase sm:text-6xl">
            Straight from the yard
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-14">
          <motion.div
            aria-hidden="true"
            className="text-mower absolute -top-10 -left-2 z-10 sm:-left-8"
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
          >
            <LuQuote className="size-20 sm:size-28" />
          </motion.div>

          <div aria-live="polite" className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur sm:p-14">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-xl leading-relaxed font-medium text-white/90 sm:text-2xl sm:leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="bg-mower font-display grid size-12 place-items-center rounded-full text-xl" aria-hidden="true">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="font-display block text-xl tracking-wide uppercase">{t.name}</span>
                    <span className="text-sm text-white/60">Top Flight client</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {count > 1 && (
              <div className="mt-8 flex items-center justify-end gap-3">
                <span className="mr-auto text-sm text-white/60">
                  {index + 1} / {count}
                </span>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous review"
                  className="hover:bg-mower grid size-11 place-items-center rounded-full border border-white/20 transition-colors"
                >
                  <LuArrowLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next review"
                  className="hover:bg-mower grid size-11 place-items-center rounded-full border border-white/20 transition-colors"
                >
                  <LuArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
