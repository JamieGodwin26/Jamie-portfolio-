'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { CV_URL } from '@/lib/metadata'

const NAV_LINKS = [
  { label: 'Projects', href: '/projects', num: '01' },
  { label: 'About',    href: '/about',    num: '02' },
  { label: 'Contact',  href: '/contact', num: '03' },
] as const

interface NavProps {
  cvUrl?: string
}

export function Nav({ cvUrl = CV_URL }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-surface-2/80 backdrop-blur-md border-b border-border/60">
      <Container as="nav" aria-label="Primary navigation">
        <div className="flex h-[60px] items-center justify-between gap-8">

          {/* ── Logo: reveals the full name on hover/focus. The reveal is
               absolutely positioned so it overlays rather than pushing the
               centered nav links when it expands. ── */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group relative flex flex-shrink-0 items-baseline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink"
            aria-label="Jamie Godwin, home"
          >
            <span className="relative font-sans text-xl font-medium leading-none tracking-tight text-ink">
              J
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-full top-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-300 ease-out group-hover:max-w-[12rem] group-hover:opacity-100 group-focus-visible:max-w-[12rem] group-focus-visible:opacity-100"
              >
                amie Godwin
              </span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden items-center gap-8 md:flex" role="list">
            {NAV_LINKS.map(({ label, href, num }) => (
              <div role="listitem" key={href}>
                <Link
                  href={href}
                  className="text-label text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm transition-colors duration-150"
                >
                  {label}
                  <sup className="ml-0.5 text-[9px] text-ink-faint">{num}</sup>
                </Link>
              </div>
            ))}
          </div>

          {/* ── Desktop CV + theme toggle ── */}
          <div className="hidden items-center gap-5 md:flex">
            <Link
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm transition-colors duration-150"
              aria-label="Download CV, opens in new tab"
            >
              CV
            </Link>
            <ThemeToggle />
          </div>

          {/* ── Mobile: theme toggle + hamburger ── */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </Container>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-border bg-surface-2 md:hidden"
          >
            <Container>
              <nav className="flex flex-col gap-1 py-4" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, href, num }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="text-label flex items-baseline gap-2 py-3 text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
                  >
                    <span className="text-ink-faint">{num}</span>
                    {label}
                  </Link>
                ))}
                <div className="mt-3 border-t border-border pt-4">
                  <Link
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-label block py-3 text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
                    aria-label="Download CV, opens in new tab"
                  >
                    CV
                  </Link>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ─── Hamburger icon: animates between ☰ and ✕ ─── */

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { d: 'M4 4L16 16' } : { d: 'M3 6H17' }}
        transition={{ duration: 0.18 }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.1 }}
        d="M3 10H17"
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { d: 'M4 16L16 4' } : { d: 'M3 14H17' }}
        transition={{ duration: 0.18 }}
      />
    </svg>
  )
}
