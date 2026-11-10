import { useState } from 'react'
import { motion } from 'motion/react'
import { LuArrowLeft, LuArrowRight, LuQuote } from 'react-icons/lu'
import Reveal, { Eyebrow } from '../Reveal'
import { FaFacebook } from 'react-icons/fa'
import { ExternalButton } from '../Buttons'
import { testimonials, business } from '../../data/site'
import { useReducedMotion } from '../../lib/hooks'

const KEY_STEPS = { ArrowRight: 1, ArrowLeft: -1 }

const vis = (delay) => ({ delay })
const SLIDE_SHOWN = { opacity: 1, y: 0, visibility: 'visible' }
const slideHidden = (y) => ({ opacity: 0, y, visibility: 'hidden' })
// Indexed by (reduce ? 2 : 0) + (active ? 1 : 0).
const SLIDE_STATES = [
  { animate: slideHidden(20), transition: { duration: 0.4, delay: 0, visibility: vis(0.4) } },
  { animate: SLIDE_SHOWN, transition: { duration: 0.4, delay: 0.2, visibility: vis(0) } },
  { animate: slideHidden(0), transition: { duration: 0.01, delay: 0, visibility: vis(0) } },
  { animate: SLIDE_SHOWN, transition: { duration: 0.01, delay: 0, visibility: vis(0) } },
]
const slideMotion = (active, reduce) => SLIDE_STATES[(reduce ? 2 : 0) + (active ? 1 : 0)]

function Slide({ review: r, active, reduce }) {
  return (
    <motion.figure
      aria-hidden={!active || undefined}
      inert={!active}
      className="[grid-area:1/1]"
      initial={false}
      {...slideMotion(active, reduce)}
    >
      <blockquote className="text-xl leading-relaxed font-medium text-white/90 sm:text-2xl sm:leading-relaxed">
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <span className="bg-mower font-display grid size-12 place-items-center rounded-full text-xl" aria-hidden="true">
          {r.name[0]}
        </span>
        <span>
          <span className="font-display block text-xl tracking-wide uppercase">{r.name}</span>
          <span className="text-sm text-white/60">{r.source || 'Top Flight client'}</span>
        </span>
      </figcaption>
    </motion.figure>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const count = testimonials.length
  const go = (d) => setIndex((i) => (i + d + count) % count)
  const onKeyDown = (e) => {
    const step = count > 1 ? KEY_STEPS[e.key] : undefined
    if (step) go(step)
  }

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

          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            aria-live="polite"
            tabIndex={count > 1 ? 0 : undefined}
            onKeyDown={onKeyDown}
            className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur sm:p-14">
            <div className="grid">
              {testimonials.map((r, i) => (
                <Slide key={r.name} review={r} active={i === index} reduce={reduce} />
              ))}
            </div>

            {count > 1 && (
              <div className="mt-8 flex items-center justify-end gap-3">
                <div className="mr-auto flex items-center gap-2" role="group" aria-label="Choose review">
                  {testimonials.map((r, i) => (
                    <button
                      key={r.name}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Review ${i + 1} of ${count}: ${r.name}`}
                      aria-current={i === index || undefined}
                      className="grid size-6 place-items-center"
                    >
                      <span className={`h-2.5 rounded-full transition-all ${i === index ? 'bg-mower w-8' : 'w-2.5 bg-white/30'}`} />
                    </button>
                  ))}
                </div>
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

        <Reveal delay={0.2} className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <ExternalButton href={business.facebookReviewsUrl} icon={FaFacebook}>
            See reviews on Facebook
          </ExternalButton>
          <ExternalButton href={business.facebookReviewsUrl} variant="ghost">
            Leave a review
          </ExternalButton>
        </Reveal>
      </div>
    </section>
  )
}
