import { PlaceholderIcon } from '@/components/ui/PlaceholderIcon'

/*
  Drop-in stand-in for next/image's Image component: same prop surface, so
  swapping the import at the top of a file is enough to turn every real
  photo/screenshot in that file into a neutral placeholder box, without
  touching any of the JSX below. Revert by switching the import back to
  'next/image' once real images are wanted again.
*/
interface PlaceholderImageProps {
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  src?: string
}

export default function Image({ alt, className, width, height, fill }: PlaceholderImageProps) {
  const style = !fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined

  return (
    <div
      role="img"
      aria-label={alt}
      style={style}
      className={`flex items-center justify-center bg-surface-raised text-ink-faint ${fill ? 'absolute inset-0' : 'w-full'} ${className ?? ''}`}
    >
      <PlaceholderIcon size={28} />
    </div>
  )
}
