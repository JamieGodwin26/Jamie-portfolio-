'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/*
  Replaces the native pointer with a small accent-coloured dot that expands
  into a ring over links, buttons, and cards. Only activates on fine-pointer
  (real mouse) devices with no reduced-motion preference, so touch and
  accessibility-sensitive visitors always keep their normal cursor.
*/
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 28, stiffness: 420, mass: 0.4 })
  const springY = useSpring(cursorY, { damping: 28, stiffness: 420, mass: 0.4 })

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      setVisible(true)
    }
    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      setHovering(!!target?.closest('a, button, [role="button"], input, textarea'))
    }
    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [cursorX, cursorY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full border-2 border-accent bg-accent/20"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hovering ? 46 : 28,
        height: hovering ? 46 : 28,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    />
  )
}
