import { LuPlus } from 'react-icons/lu'
import Reveal, { Eyebrow } from './Reveal'
import { faqs } from '../data/site'

/**
 * Native <details> accordion: keyboard and screen-reader friendly out of the box, works
 * without JS, and every answer is in the HTML (crawlers and answer engines can read it).
 */
export function FaqList({ items, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((f) => (
        <details
          key={f.q}
          className="group bg-ink-2 open:border-mower/50 rounded-3xl border border-white/10 transition-colors"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 rounded-3xl px-6 py-5 text-lg font-bold sm:px-8 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="group-open:bg-mower grid size-9 shrink-0 place-items-center rounded-full border border-white/20 transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:border-transparent motion-reduce:transition-none"
            >
              <LuPlus />
            </span>
          </summary>
          <p className="px-6 pb-6 text-white/75 sm:px-8">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

/** Home-page FAQ section. */
export default function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <Eyebrow className="text-mower">FAQ</Eyebrow>
        <h2 id="faq-title" className="font-display mt-4 text-5xl leading-[0.95] uppercase sm:text-7xl">
          Questions, answered.
        </h2>
      </Reveal>
      <FaqList items={faqs} className="mt-12" />
    </section>
  )
}
