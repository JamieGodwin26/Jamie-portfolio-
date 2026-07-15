import { cn } from '@/lib/utils'

interface TagProps {
  children: string
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'font-sans text-sm font-normal leading-normal text-ink-secondary',
        className,
      )}
    >
      {children}
    </span>
  )
}
