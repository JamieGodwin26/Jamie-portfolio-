import type { ReactNode } from 'react'
import { Hanken_Grotesk, Montserrat, JetBrains_Mono } from 'next/font/google'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'
import { buildMetadata } from '@/lib/metadata'
import './globals.css'

/* ─── Fonts
   Loaded server-side via next/font: zero layout shift, self-hosted automatically.
   Variables are applied to <html> and referenced in @theme inside globals.css.
─── */

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
  preload: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
})

/* ─── Site-wide metadata ─── */

export const metadata = buildMetadata()

/* ─── Root layout: server component ─── */

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Blocking script: applies the saved theme before first paint so there's
          no flash of the wrong mode. Light is the default when nothing is stored.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-svh flex-col bg-surface text-ink antialiased" suppressHydrationWarning>
        {/*
          Providers is a client component that wraps MotionConfig (React context).
          Everything inside (Nav, children, Footer) can still be server components;
          only the context boundary itself runs on the client.
        */}
        <Providers>
          <Nav />
          <div className="flex flex-1 flex-col">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
