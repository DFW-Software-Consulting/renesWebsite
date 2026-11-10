import { useEffect, useRef, useState } from 'react'
import { LuArrowLeft, LuArrowRight, LuX } from 'react-icons/lu'
import Reveal, { Eyebrow } from '../Reveal'
import { workPhotos } from '../../data/site'

/** Drag (or arrow-key) comparison slider. Uses a native range input for a11y. */
function BeforeAfter({ before, after, alt, className = '' }) {
  const [pos, setPos] = useState(50)
  return (
    <div className={`relative isolate overflow-hidden select-none ${className}`}>
      <img src={after} alt={alt} loading="lazy" draggable="false" className="block h-full w-full object-cover" />
      <img
        src={before}
        alt=""
        aria-hidden="true"
        loading="lazy"
        draggable="false"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span aria-hidden="true" className="bg-ink/80 absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">Before</span>
      <span aria-hidden="true" className="bg-mower absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">After</span>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
        <span className="text-ink absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg">
          <LuArrowLeft className="size-3" />
          <LuArrowRight className="size-3" />
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Before and after comparison"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}

function Lightbox({ photos, index, onClose, onIndex }) {
  const ref = useRef(null)
  const p = photos[index]
  const n = photos.length

  // Native <dialog> gives us a focus trap, inert background, and Esc handling.
  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
  }, [])

  const go = (dir) => onIndex((index + dir + n) % n)

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        else if (e.key === 'ArrowLeft') go(-1)
      }}
      className="m-0 h-full max-h-none w-full max-w-none bg-black/95 p-4 text-white backdrop:bg-black sm:p-8"
    >
      <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center gap-4">
        <img src={p.src} alt={p.alt} className="max-h-[75vh] max-w-full rounded-2xl object-contain" />
        <p className="text-center text-white/80" aria-live="polite">{p.caption}</p>
        <p className="text-sm text-white/50">{index + 1} / {n}</p>
      </div>
      <button type="button" autoFocus onClick={() => ref.current.close()} aria-label="Close photo viewer" className="hover:bg-mower absolute top-4 right-4 grid size-12 place-items-center rounded-full border border-white/30">
        <LuX aria-hidden="true" className="size-6" />
      </button>
      {n > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="hover:bg-mower absolute top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/30">
            <LuArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className="hover:bg-mower absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/30">
            <LuArrowRight aria-hidden="true" />
          </button>
        </>
      )}
    </dialog>
  )
}

export default function Gallery({ photos = workPhotos }) {
  const [open, setOpen] = useState(null)
  if (!photos.length) return null

  // Before/after items are not lightboxed; they get an inline slider.
  const lightboxPhotos = photos.filter((p) => !p.before)

  return (
    <section aria-labelledby="work-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p aria-hidden="true" className="font-script text-mower mb-4 origin-left -rotate-2 text-3xl leading-[1.4] sm:text-4xl sm:leading-[1.4]">Fresh cuts</p>
        <Eyebrow className="text-mower mt-2">Recent work</Eyebrow>
        <h2 id="work-title" className="font-display mt-4 text-5xl leading-[0.95] uppercase sm:text-7xl">
          Our work, up close
        </h2>
      </Reveal>

      <ul className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <Reveal as="li" key={p.src} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
            <figure className="bg-ink-2 overflow-hidden rounded-3xl border border-white/10">
              {p.before ? (
                <BeforeAfter before={p.before} after={p.src} alt={p.alt} />
              ) : (
                <button
                  type="button"
                  onClick={() => setOpen(lightboxPhotos.indexOf(p))}
                  aria-label={`Open photo: ${p.caption || p.alt}`}
                  className="group block w-full overflow-hidden"
                >
                  <img src={p.src} alt={p.alt} loading="lazy" className="block w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                </button>
              )}
              {p.caption && <figcaption className="p-4 text-sm text-white/70">{p.caption}</figcaption>}
            </figure>
          </Reveal>
        ))}
      </ul>

      {open !== null && <Lightbox photos={lightboxPhotos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </section>
  )
}
