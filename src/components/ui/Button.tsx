import Link from 'next/link'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/* ─── Variants ─── */

const variants = {
  pill:  'bg-ink text-surface px-5 py-2.5 rounded-[var(--radius-pill)] font-sans font-normal text-base leading-normal hover:opacity-75 focus-visible:opacity-75',
  ghost: 'text-ink font-sans font-normal text-base leading-normal underline-offset-4 hover:underline',
  link:  'text-ink font-sans font-normal text-base leading-normal group',
} as const

type Variant = keyof typeof variants

const baseClasses =
  'inline-flex items-center gap-2 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm'

/* ─── Polymorphic props ─── */

interface CommonProps {
  variant?: Variant
  className?: string
  children: ReactNode
}

interface ButtonProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  as?: 'button'
  href?: never
  external?: never
}

interface AnchorProps extends CommonProps {
  as: 'a'
  href: string
  external?: boolean
}

interface LinkProps extends CommonProps {
  as: 'link'
  href: string
  external?: never
}

type Props = ButtonProps | AnchorProps | LinkProps

/* ─── Component ─── */

export function Button({ variant = 'pill', className, children, ...rest }: Props) {
  const cls = cn(baseClasses, variants[variant], className)

  if (rest.as === 'a') {
    const { as: _as, external, href, ...anchorRest } = rest as AnchorProps
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorRest}
      >
        {children}
      </a>
    )
  }

  if (rest.as === 'link') {
    const { as: _as, href, ...linkRest } = rest as LinkProps
    return (
      <Link href={href} className={cls} {...(linkRest as object)}>
        {children}
      </Link>
    )
  }

  const { as: _as, ...btnRest } = rest as ButtonProps
  return (
    <button type="button" className={cls} {...btnRest}>
      {children}
    </button>
  )
}
