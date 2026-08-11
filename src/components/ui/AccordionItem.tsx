'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  /** Optional leading index (e.g. '01'), omit for sections without numbering */
  number?: string
  label: string
  description: string
  defaultOpen?: boolean
}

export function AccordionItem({ number, label, description, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const id = useId()
  const contentId = `accordion-content-${id}`
  const triggerId = `accordion-trigger-${id}`

  return (
    <div
      className={cn(
        'border-t border-border transition-colors duration-150',
        'last:border-b',
      )}
    >
      {/* ── Trigger ── */}
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between gap-6 py-5',
          'text-left',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm',
          'group',
        )}
      >
        <div className="flex items-baseline gap-5">
          {number && (
            <span className="text-meta text-ink-muted tabular-nums">
              {number}
            </span>
          )}
          <span className="font-sans text-base font-normal uppercase tracking-wider leading-normal text-ink">
            {label}
          </span>
        </div>

        {/* ── Icon: rotates on open ── */}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-ink-secondary"
        >
          <PlusIcon />
        </motion.span>
      </button>

      {/* ── Expandable content ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="flex items-baseline gap-5 pb-5">
              {number && (
                <span aria-hidden="true" className="text-meta invisible tabular-nums">
                  {number}
                </span>
              )}
              <p className="font-sans text-base font-light leading-relaxed text-ink-secondary">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 3.75V14.25M3.75 9H14.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}
