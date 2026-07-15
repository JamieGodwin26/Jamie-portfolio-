'use client'

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeInProps extends HTMLMotionProps<'div'> {
  direction?: Direction
  delay?: number
  duration?: number
  /** Animate once on first viewport entry, or every time */
  once?: boolean
}

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 28 },
  down:  { y: -28 },
  left:  { x: 28 },
  right: { x: -28 },
  none:  {},
}

function buildVariants(direction: Direction, duration: number, delay: number): Variants {
  return {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }
}

export function FadeIn({
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  className,
  children,
  ...rest
}: FadeInProps) {
  const variants = buildVariants(direction, duration, delay)

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-64px 0px' }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
