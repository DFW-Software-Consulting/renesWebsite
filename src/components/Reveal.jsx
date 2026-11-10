import { motion } from 'motion/react'

/** Fade/slide content in once when it scrolls into view. */
export default function Reveal({ as = 'div', delay = 0, y = 32, className = '', children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Section eyebrow label with the stripe motif. */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase ${className}`}>
      <span aria-hidden="true" className="flex flex-col gap-[3px]">
        <span className="block h-[3px] w-7 bg-current" />
        <span className="block h-[3px] w-5 bg-current" />
        <span className="block h-[3px] w-3 bg-current" />
      </span>
      {children}
    </p>
  )
}
