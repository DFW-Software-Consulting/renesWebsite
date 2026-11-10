import { services } from '../../data/site'

function Row({ items, reverse = false }) {
  // Rendered twice so the -50% translate loops seamlessly. The copy is aria-hidden.
  return (
    <div className="flex w-max">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className={`flex shrink-0 items-center ${reverse ? 'animate-marquee-rev' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
        >
          {items.map((s) => (
            <li key={s.id} className="flex items-center">
              <span className="font-display px-6 text-4xl whitespace-nowrap uppercase sm:text-6xl">{s.title}</span>
              <span aria-hidden="true" className="flex -skew-x-[20deg] gap-1.5">
                <span className="block h-8 w-1.5 bg-current opacity-80 sm:h-10" />
                <span className="block h-8 w-1.5 bg-current opacity-60 sm:h-10" />
                <span className="block h-8 w-1.5 bg-current opacity-40 sm:h-10" />
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default function ServicesMarquee() {
  return (
    <section aria-label="Services we offer" className="group relative overflow-hidden py-20">
      <div className="bg-mower relative z-10 -mx-10 -rotate-3 py-4 text-white shadow-2xl shadow-black/60 sm:py-5">
        <Row items={services} />
      </div>
      <div className="text-ink absolute -inset-x-10 top-1/2 -translate-y-1/2 rotate-3 bg-white py-4 sm:py-5" aria-hidden="true">
        <Row items={[...services].reverse()} reverse />
      </div>
    </section>
  )
}
