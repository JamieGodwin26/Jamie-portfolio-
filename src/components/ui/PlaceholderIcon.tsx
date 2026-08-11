/* Shared placeholder icon: used anywhere a real image/screenshot doesn't exist yet */
export function PlaceholderIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="2.5" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="6" cy="6.5" r="1.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3.5 13 7 9.5l2.5 2.5 2-2 3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
