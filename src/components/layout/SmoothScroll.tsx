'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/*
  Eased, momentum-based scrolling instead of the browser's native scroll-jump
  — the same feel referenced from daniela-rivas.com (which runs on Lenis too).
  Skipped for reduced-motion users, who keep native instant scroll, and for
  touch devices: touch already has native momentum scrolling, and Lenis
  driving scroll via JS there fights with iOS Safari's address-bar collapse,
  which was causing the sticky header to visibly lag/gap while scrolling.
*/
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isTouchDevice) return

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
