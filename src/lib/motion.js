// Shared entrance animation for page heroes.
export const fadeUp = (delay = 0, fade = true) => ({
  initial: fade ? { opacity: 0, y: 24 } : { y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})
