import { motion } from 'motion/react'
import Mower from '../components/Mower'
import { CallButton, QuoteButton } from '../components/Buttons'
import { Link } from 'react-router'
import { useReducedMotion } from '../lib/hooks'

export default function NotFound() {
  const reduce = useReducedMotion()
  return (
    <>
      <section aria-labelledby="nf-title" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-20 text-center">
        <p aria-hidden="true" className="font-display text-outline text-[clamp(8rem,40vw,22rem)] leading-none opacity-30 select-none">
          404
        </p>

        <div aria-hidden="true" className="bg-mow-stripes relative -mt-10 h-14 w-full max-w-md overflow-hidden rounded-full sm:-mt-16">
          <motion.div
            className="absolute top-1/2 left-1/2 -ml-12 w-24 -translate-y-[60%]"
            animate={reduce ? undefined : { x: [-110, 110, 110, -110, -110], scaleX: [1, 1, -1, -1, 1] }}
            transition={{ duration: 6, times: [0, 0.45, 0.5, 0.95, 1], repeat: Infinity, ease: 'easeInOut' }}
          >
            <Mower spinning={!reduce} className="w-full" />
          </motion.div>
        </div>

        <h1 id="nf-title" className="font-display mt-10 text-5xl uppercase sm:text-6xl">
          You wandered off the mowing path.
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/70">
          This page doesn&rsquo;t exist, but your yard still needs some love. Head{' '}
          <Link to="/" className="text-mower font-bold underline underline-offset-4">
            back home
          </Link>{' '}
          or grab a free quote.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <QuoteButton />
          <CallButton />
        </div>
      </section>
    </>
  )
}
