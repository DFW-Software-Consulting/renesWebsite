import { motion } from 'motion/react'
import Breadcrumbs from '../Breadcrumbs'
import { CallButton, QuoteButton } from '../Buttons'
import { fadeUp } from '../../lib/motion'

// Full class names so Tailwind can see them.
const GLOW = {
  left: '-top-40 -left-40',
  right: '-top-40 -right-40',
}
const PAD_BOTTOM = { sm: 'pb-16', md: 'pb-20' }

/** Hero shared by the services overview and individual service pages. */
export default function PageHero({
  titleId,
  glow = 'left',
  padBottom = 'md',
  breadcrumbs,
  lead,
  headingClassName = '',
  heading,
  children,
}) {
  return (
    <section
      aria-labelledby={titleId}
      className={`relative isolate overflow-hidden px-5 pt-36 ${PAD_BOTTOM[padBottom]} sm:px-8 sm:pt-44`}
    >
      <div aria-hidden="true" className={`bg-mower/20 absolute ${GLOW[glow]} -z-10 size-[36rem] rounded-full blur-3xl`} />
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />
        {lead}
        <motion.h1
          id={titleId}
          className={['font-display mt-6', headingClassName, 'text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase'].filter(Boolean).join(' ')}
          {...fadeUp()}
        >
          {heading}
        </motion.h1>
        <motion.p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl" {...fadeUp(0.15, false)}>
          {children}
        </motion.p>
        <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" {...fadeUp(0.25)}>
          <QuoteButton />
          <CallButton />
        </motion.div>
      </div>
    </section>
  )
}
