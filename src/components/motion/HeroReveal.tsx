'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/* ─── Container: staggers each HeroWord child ─── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

/* ─── Word: slides up from clipped overflow ─── */

const wordVariants: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1], /* expo-out feel */
    },
  },
}

/* ─── Exports ─── */

interface HeroRevealProps {
  children: ReactNode
  className?: string
}

export function HeroReveal({ children, className }: HeroRevealProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      aria-hidden="false"
    >
      {children}
    </motion.div>
  )
}

export function HeroWord({ children, className }: HeroRevealProps) {
  return (
    /* overflow-hidden clips the word as it slides up, creating the reveal */
    <span className="block overflow-hidden cursor-default select-none">
      <motion.span className={`block ${className ?? ''}`} variants={wordVariants}>
        {children}
      </motion.span>
    </span>
  )
}
