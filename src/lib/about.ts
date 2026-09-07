export interface AboutSection {
  label: string
  paragraphs: string[]
}

/*
  Sourced from Jamie's CV and LinkedIn (About section + recent post on the
  designer-to-product-venture-lead shift), July 2026. Structure follows a
  punchy opening line + two dense sections rather than a five-way accordion.
  See VISUAL_DIRECTION.md for the daniela-rivas.com reference this borrows from.
*/
export const aboutIntro =
  'Product Designer and design leader with experience across product, UX/UI, branding and venture development. I enjoy working through the early stages of a problem, exploring opportunities, validating ideas and figuring out what is actually worth building. My background spans hands-on product and UX/UI design, design systems, brand strategy and visual design, with a focus on understanding people, solving real problems and creating products and brands that work for both users and the business.'

export const aboutSections: AboutSection[] = [
  {
    label: 'My approach',
    paragraphs: [
      'Most of my work now focuses on shaping early-stage ideas before they become expensive to build, helping teams define clearer products, stronger positioning, and more grounded user experiences.',
      'My background is in design, but the focus has grown into product, strategy, and venture development, with a real interest in how AI can change the way teams think, build, and move.',
      'That shift is not away from the craft, it is toward owning more of the thinking behind it: not just how something looks or works, but why it matters and how it moves a business forward. I still practice hands-on design too, currently designing enterprise banking experiences at FNB.',
    ],
  },
  {
    label: 'Outside of work',
    paragraphs: [
      'You would find me at the dog park, on a yoga mat, in the gym, or searching for the next wine tasting. I am learning to find gratitude in the simple things: the ones that do not need to be complicated to matter.',
    ],
  },
]
