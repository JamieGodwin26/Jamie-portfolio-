import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Process } from '@/components/sections/Process'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata()

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedWork />
      <Process />
    </main>
  )
}
