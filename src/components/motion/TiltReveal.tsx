'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface TiltRevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/*
  Scroll-driven perspective tilt — starts angled back and straightens as the
  element crosses into view, instead of the plain fade-up used everywhere
  else. Reserved for one moment per page (the case study Screens grid) so it
  reads as a highlight rather than a tic.
*/
export function TiltReveal({ children, className, style }: TiltRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'start 40%'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX, opacity, transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  )
}
