import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { ContactForm } from '@/components/sections/ContactForm'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Working on a product, venture, or design problem? Get in touch.',
})

export default function ContactPage() {
  return (
    <main>
      <section aria-labelledby="contact-heading" className="section-padding">
        <Container className="max-w-[640px]">

          {/* ── Header ── */}
          <div className="mb-10 flex flex-col gap-3 md:mb-16">
            <FadeIn direction="up" className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 flex-shrink-0 bg-accent" />
              <h1 id="contact-heading" className="text-label text-ink">
                Contact
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.05}>
              <p className="max-w-[52ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                Working on a product, venture, or design problem? Tell me a bit about it and I&rsquo;ll get back to you.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.1}>
            <ContactForm />
          </FadeIn>

        </Container>
      </section>
    </main>
  )
}
