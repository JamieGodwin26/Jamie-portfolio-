'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/*
  Real "J" glyph outline traced from Hanken Grotesk (medium), extracted via
  fontTools so the stroke draw matches the site's actual letterform exactly,
  not an approximation. Font units: 552 x 709, y-up (flipped in the SVG
  transform below to normal top-left screen coordinates).
*/
const J_PATH =
  'M256 -12Q159 -12 97.0 47.0Q35 106 28 209L115 218Q120 142 157.0 106.0Q194 70 256 70Q327 70 359.5 117.0Q392 164 392 252V618H116V697H480V247Q480 166 453.5 108.0Q427 50 377.0 19.0Q327 -12 256 -12Z'

/*
  Shown once, on the very first paint of a hard load (not on client-side route
  transitions, since this lives in the root layout, which App Router keeps
  mounted across navigations). The "J" draws itself as an outline, then
  crossfades into a solid fill, then the whole overlay fades to reveal the
  page. MotionConfig's reducedMotion="user" (set in Providers) already
  shortens this automatically for anyone with reduced motion enabled.
*/
export function InitialLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
        >
          <svg viewBox="0 0 552 709" className="h-36 w-auto text-ink" aria-hidden="true">
            <motion.path
              d={J_PATH}
              transform="matrix(1 0 0 -1 0 697)"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={14}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }}
              animate={{ pathLength: 1, fillOpacity: 1, strokeOpacity: 0 }}
              transition={{
                pathLength: { duration: 1.4, ease: [0.65, 0, 0.35, 1] },
                fillOpacity: { duration: 0.75, delay: 1.3 },
                strokeOpacity: { duration: 0.75, delay: 1.4 },
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
