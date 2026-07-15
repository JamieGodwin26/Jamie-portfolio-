import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children: ReactNode
}

export function Container({ as: As = 'div', className, children, ...rest }: ContainerProps) {
  return (
    <As className={cn('container-site', className)} {...rest}>
      {children}
    </As>
  )
}
