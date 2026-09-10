import type { ReactNode } from 'react'
import { Hanken_Grotesk, Montserrat, JetBrains_Mono, Work_Sans } from 'next/font/google'
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

/* Orbit's own brand typeface, used only in that case study's live style-guide
   preview (never site-wide) so the sample actually renders in Work Sans
   instead of a generic fallback. */
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-work-sans',
  display: 'swap',
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
      className={`${hankenGrotesk.variable} ${montserrat.variable} ${jetbrainsMono.variable} ${workSans.variable}`}
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
        {/* Orbit's brand heading font, loaded for that case study's style-guide preview only */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,500&display=swap"
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
