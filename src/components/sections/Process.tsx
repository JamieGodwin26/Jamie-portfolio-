import { FadeIn } from '@/components/motion/FadeIn'
import { Container } from '@/components/ui/Container'
import { AccordionItem } from '@/components/ui/AccordionItem'
import { processSteps } from '@/lib/process'

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-surface-raised section-padding"
    >
      <Container>

        {/* ── Header ── */}
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <FadeIn direction="up">
            <h2
              id="process-heading"
              className="text-label text-ink"
            >
              Process
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.08}>
            <p className="max-w-[52ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
              A decision caught in Figma is dramatically cheaper than the same fix after launch — I&rsquo;ve seen that gap play out enough times to design around it by default.
            </p>
          </FadeIn>
        </div>

        {/* ── Accordion ── */}
        <FadeIn direction="up" delay={0.12}>
          <div role="list" aria-label="Design process steps">
            {processSteps.map((step) => (
              <div role="listitem" key={step.number}>
                <AccordionItem number={step.number} label={step.label} description={step.description} />
              </div>
            ))}
          </div>
        </FadeIn>

      </Container>
    </section>
  )
}
