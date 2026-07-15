export interface AboutSection {
  label: string
  paragraphs: string[]
}

/*
  Sourced from Jamie's CV and LinkedIn (About section + recent post on the
  designer-to-product-venture-lead shift), July 2026. Structure follows a
  punchy opening line + two dense sections rather than a five-way accordion —
  see VISUAL_DIRECTION.md for the daniela-rivas.com reference this borrows from.
*/
export const aboutIntro =
  "I'm Jamie — a product venture lead working at the intersection of product thinking, venture design, and brand clarity, based in Johannesburg."

export const aboutSections: AboutSection[] = [
  {
    label: 'My approach',
    paragraphs: [
      'Most of my work now focuses on shaping early-stage ideas before they become expensive to build — helping teams define clearer products, stronger positioning, and more grounded user experiences, as Product Venture Lead at Neslo.',
      'My background is in design, but the focus has grown into product, strategy, and venture development, with a real interest in how AI can change the way teams think, build, and move.',
      "That shift isn't away from the craft, it's toward owning more of the thinking behind it: not just how something looks or works, but why it matters and how it moves a business forward. I still practice hands-on design too, currently designing enterprise banking experiences at FNB alongside the product and venture work at Neslo.",
    ],
  },
  {
    label: 'Outside of work',
    paragraphs: [
      'I like things that feel clear and calm — clean systems, organised files, and layouts that just work. When I am not at my desk, I am outside with my dog, catching a walk or a bit of sun. I appreciate simple things that bring calm to the chaos.',
    ],
  },
]
