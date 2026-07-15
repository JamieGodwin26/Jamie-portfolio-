'use client'

import { useId } from 'react'

interface RotatingBadgeProps {
  text: string
  size?: number
}

/*
  Slowly-rotating circular label — a signature detail rather than a stock
  "since 20XX" sticker. Center dot reuses the same accent-square marker as
  the section labels (see FeaturedWork's "SELECTED WORK" heading) for
  continuity with the rest of the system.
*/
export function RotatingBadge({ text, size = 96 }: RotatingBadgeProps) {
  const pathId = useId()
  const radius = size / 2 - 9
  const repeated = `${text}   ▪   `.repeat(2)

  return (
    <div
      className="relative flex-shrink-0 text-ink-faint"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-badge-spin"
      >
        <defs>
          <path
            id={pathId}
            d={`M ${size / 2},${size / 2} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          className="font-mono uppercase"
          style={{ fontSize: 8, letterSpacing: '0.14em', fill: 'currentColor' }}
        >
          <textPath href={`#${pathId}`}>{repeated}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  )
}
