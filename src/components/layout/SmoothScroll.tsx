'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/*
  Eased, momentum-based scrolling instead of the browser's native scroll-jump
  — the same feel referenced from daniela-rivas.com (which runs on Lenis too).
  Skipped entirely for reduced-motion users, who keep native instant scroll.
*/
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
