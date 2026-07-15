'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

/*
  Thin client boundary for app-wide providers.
  Kept separate from layout.tsx so the root layout remains a server component —
  preserving RSC streaming, metadata, and font injection optimisations.
*/
export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
