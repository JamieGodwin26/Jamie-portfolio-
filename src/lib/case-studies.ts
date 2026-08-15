import type { ProjectScreen } from '@/types'

export interface ProjectVideo {
  src: string
  width: number
  height: number
  alt: string
}

export interface KeyDecision {
  title: string
  description: string
  /** Real screens that directly illustrate this decision, shown inline with it rather than dumped in a generic screens grid */
  images?: ProjectScreen[]
  /** A real motion/video asset that illustrates this decision — used sparingly, only when static screens can't show it (e.g. an actual motion-design decision) */
  video?: ProjectVideo
}

export interface Persona {
  name: string
  role: string
  detail: string
}

export interface Journey {
  /** Label for this flow, e.g. "Journey map", or a role name when a project has more than one flow */
  label: string
  stages: string[]
}

export interface ProcessContent {
  /** Short framing line, used on projects without personas/quotes (e.g. brand or single-feature work) */
  intro?: string
  personas?: Persona[]
  /** Verbatim research quotes only, never paraphrased or invented */
  quotes?: string[]
  journeys?: Journey[]
  /** Real user-flow / logic diagrams (flowcharts) — distinct from wireframes: these show navigation and decision logic, not UI layout. Shown with the journey map, since that's the same underlying artifact. */
  flowImages?: ProjectScreen[]
  /** What creating the flow diagrams actually involved, written as the business-analyst-style groundwork it was, not just "I made a flowchart" */
  flowImagesNote?: string
  /** Real screens shown alongside the research quotes, when they directly back up a finding */
  insightImages?: ProjectScreen[]
}

export interface UserResearch {
  intro?: string
  /** Real findings from interviews/research, stated plainly, not dressed up as insight-porn */
  keyFindings?: string[]
}

export interface JourneyMapRow {
  step: string
  experience: string
  /** Not every project's research captured an emotion column — omit rather than guess */
  emotion?: string
  opportunity: string
}

export interface JourneyMapFlow {
  /** Role name when a project maps more than one flow (e.g. "Parents" / "Providers"), otherwise the project name */
  label: string
  rows: JourneyMapRow[]
}

export interface JourneyMap {
  intro?: string
  flows: JourneyMapFlow[]
}

export interface Wireframes {
  intro: string
  bullets?: string[]
  /** Real low-fidelity/greyscale wireframe screens — only ever the genuine article, never a polished screen mislabeled as one */
  images?: ProjectScreen[]
}

export interface StyleGuideItem {
  label: string
  detail: string
}

export interface ColourSwatch {
  name: string
  /** Real hex value sampled directly from the brand's own colour palette artwork, never guessed */
  hex: string
}

export interface TypographySample {
  name: string
  /** CSS font-family value, rendered live rather than baked into an image */
  cssFamily: string
}

export interface CaseStudyContent {
  /** One-line description for the hero: factual, not marketing copy */
  summary: string
  /** Title, engagement type, and who was worked with — shown in the sidebar. Used sparingly, for confidential/team-based work where scope of contribution isn't otherwise visible. */
  myRole?: string
  /** The problem being solved: what was broken and for whom, only written where real, verified content exists */
  problem?: string
  /** A real supporting video shown right under the problem statement, autoplaying muted like a hero visual */
  problemVideo?: ProjectVideo
  /** What the finished thing needed to achieve, distinct from the problem it started from */
  goal?: string
  /** Real research artifacts (personas, quotes, journey stages) shown as evidence, not narrated as prose */
  process?: ProcessContent
  /** Research phase detail: who was interviewed, what it surfaced */
  userResearch?: UserResearch
  /** The full step-by-step journey map, with per-stage experience/emotion/opportunity — richer than process.journeys' pill-chip summary */
  journeyMap?: JourneyMap
  /** The actual wireframing narrative, distinct from the flow diagram already shown in Process */
  wireframes?: Wireframes
  keyDecisions?: KeyDecision[]
  /** Logo, colour, typography, tone-of-voice — brand-identity projects only */
  styleGuide?: StyleGuideItem[]
  /** Real wordmark/logo-mark photography, shown before the colour palette when a project's source material had a distinct branding section */
  brandMarkImages?: ProjectScreen[]
  /** Real colour swatches, rendered as live theme-safe chips rather than a flattened image, so they hold up in dark mode */
  colourPalette?: ColourSwatch[]
  /** Shape used for the colour swatches, matching the project's own brand mark — omit for a plain circle */
  colourSwatchShape?: 'circle' | 'petal'
  /** Real brand typefaces, rendered live in their actual font rather than described in prose */
  typography?: TypographySample[]
  /** Real brand mood/collateral photography only — never baked-in headings or type, which don't survive a theme switch */
  moodImage?: ProjectScreen
  /** What changed or was learned: honest and qualitative where no verified metric exists, never an invented number */
  outcome?: string[]
  /** Real, stated future plans only — omit rather than invent a roadmap for a project with none */
  nextSteps?: string[]
  /** Real screens shown as a closing visual beat before the outcome, for images that don't tie to one specific decision — not a catch-all grid, just the last couple of supporting shots */
  closingScreens?: ProjectScreen[]
  /** Set false when the case study is still a structural placeholder */
  hasContent: boolean
  /** Shows a "More detail available on request" mailto note, for work with confidential parts that aren't shown here */
  moreDetailNote?: boolean
  /** Link to the real, shipped site, only set when verified live */
  liveUrl?: string
}

/*
  Real content only. Where a project doesn't have verified copy yet, hasContent
  stays false and the template renders an honest "coming soon" state instead of
  inventing outcomes, metrics, or narrative details we can't back up.
  See CONTENT_STRATEGY.md for provenance of the Orbit content.
*/
export const caseStudyContent: Record<string, CaseStudyContent> = {
  orbit: {
    summary:
      'A centralised operations platform that keeps teams aligned on projects, files, and progress, with peer recognition built into the same workflow instead of bolted on as a separate app.',
    problem:
      "Most internal dashboards are cluttered, slow, and confusing. Users struggle to find what they need or take action quickly, and the teams I interviewed (project leads and creative leads working across departments) felt it directly: people wasted time jumping between apps, files got lost in scattered systems, and there was no single place to plan, manage, and track work. Orbit needed to be intuitive from day one, not another tool competing for attention.",
    goal:
      'A clean, all-in-one platform where teams can manage projects, share files, and stay aligned from start to finish.',
    userResearch: {
      intro:
        'I interviewed project leads and creative teams working across multiple departments, aiming to understand their pain points, workflows, and what slows them down day to day.',
      keyFindings: [
        'People waste time jumping between apps.',
        'Confusion grows when files are lost or scattered.',
        'Teams want one place to plan, manage, and track everything.',
      ],
    },
    process: {
      personas: [
        { name: 'Liam', role: 'Project Manager', detail: 'Wants a clear overview of timelines, progress, and team responsibilities.' },
        { name: 'Amara', role: 'Creative Lead', detail: 'Needs fast access to shared assets and a system that helps her team stay on track.' },
      ],
      quotes: [
        "Sometimes we don't even know where the latest file lives.",
        'Too many apps create silos. We need one space for everything.',
        'Project updates fall through the cracks because of disjointed systems.',
      ],
      flowImages: [
        {
          src: '/images/projects/orbit/orbit-user-flow.png',
          width: 596,
          height: 479,
          alt: 'Orbit user flow mapping the admin first-time login journey',
        },
        {
          src: '/images/projects/orbit/orbit-user-flow-kudos.png',
          width: 596,
          height: 479,
          alt: 'Orbit user flow mapping the admin kudos management journey',
        },
      ],
      flowImagesNote:
        'I mapped each flow end to end before any screen was designed: every decision point, branch, and edge case a user could hit, from first-time login through to managing kudos. Working this way meant the navigation logic held up on its own, independent of visual design, so gaps and dead ends got caught on a flowchart, not in a working prototype.',
    },
    journeyMap: {
      intro:
        'I mapped the full user journey from planning to project handoff to spot pain points and areas for improvement, designing features that support users at every step and reduce friction across teams.',
      flows: [
        {
          label: 'Orbit',
          rows: [
            { step: 'Planning', experience: 'Disjointed tools, inconsistent formats.', emotion: 'Frustrated', opportunity: 'Combine planning and assets in one space.' },
            { step: 'File sharing', experience: 'Shared drives and emails.', emotion: 'Anxious', opportunity: 'Keep all files stored, searchable, and versioned.' },
            { step: 'Collaboration', experience: 'Comments lost in chat threads.', emotion: 'Confused', opportunity: 'Centralise communication.' },
            { step: 'Feedback', experience: 'Feedback is hard to organise.', emotion: 'Overwhelmed', opportunity: 'Structure feedback in context.' },
            { step: 'Handoff', experience: 'Files are not always version-controlled.', emotion: 'Rushed', opportunity: 'Make delivery seamless and documented.' },
          ],
        },
      ],
    },
    wireframes: {
      intro:
        'Once flows and requirements were mapped, I created high-fidelity wireframes to visualise structure, layout, and functionality before applying the final visual design. These wireframes helped test usability early and align stakeholders on layout decisions.',
      images: [
        {
          src: '/images/projects/orbit/orbit-settings-personal-info.png',
          width: 540,
          height: 489,
          alt: 'Orbit onboarding, personal info settings step',
        },
        {
          src: '/images/projects/orbit/orbit-kudos-timeline.png',
          width: 574,
          height: 408,
          alt: 'Orbit kudos feed with company leaderboard',
        },
      ],
    },
    keyDecisions: [
      {
        title: 'Grounded the platform in two distinct personas, not one generic "user"',
        description:
          "Research surfaced a Project Manager who needed a clear overview of timelines and team responsibilities, and a Creative Lead who needed fast access to shared assets, different enough that the journey map (Planning → File Sharing → Collaboration → Feedback → Handoff) had to work for both roles, not just the loudest one.",
      },
      {
        title: 'Built recognition into the workflow instead of bolting it on',
        description:
          "Rather than treating peer recognition as a separate 'kudos' app, it lives inside the same platform teams already use for tracking work: a Company / Personal / All Time feed sits alongside the project and file tools, so acknowledging a teammate's contribution takes the same number of clicks as checking a deadline.",
      },
    ],
    styleGuide: [
      { label: 'Logo', detail: 'A circular mark suggesting orbit paths: focused and connected.' },
      { label: 'Typography', detail: 'Cabinet Grotesk for headings, Work Sans for body text.' },
      { label: 'Colour', detail: 'Soft monochrome with a blue accent to highlight key elements.' },
      { label: 'Tone of voice', detail: 'Focused, helpful, clear.' },
    ],
    colourPalette: [
      { name: 'Shark', hex: '#1c1c24' },
      { name: 'Axtec', hex: '#0f2121' },
      { name: 'Tango', hex: '#ed772f' },
      { name: 'Crunchy', hex: '#ed642d' },
      { name: 'White Out', hex: '#ffffff' },
    ],
    colourSwatchShape: 'petal',
    typography: [
      { name: 'Cabinet Grotesk', cssFamily: "'Cabinet Grotesk', sans-serif" },
      { name: 'Work Sans', cssFamily: 'var(--font-work-sans), sans-serif' },
    ],
    moodImage: {
      src: '/images/projects/orbit/orbit-brand-mood.png',
      width: 2320,
      height: 1600,
      alt: 'Orbit brand mood photography: tote bag, notebooks, and foil-stamped logo across textured surfaces',
    },
    closingScreens: [
      {
        src: '/images/projects/orbit/orbit-team-grid-laptop.png',
        width: 560,
        height: 299,
        alt: 'Orbit team overview grid on a laptop',
      },
      {
        src: '/images/projects/orbit/orbit-kanban-laptop.png',
        width: 560,
        height: 299,
        alt: 'Orbit scheduling board on a laptop',
      },
      {
        src: '/images/projects/orbit/orbit-kudos-phones.png',
        width: 1232,
        height: 606,
        alt: 'Orbit kudos screen shown on two phones',
      },
    ],
    outcome: [
      'Research shapes structure: understanding how teams actually work, not how we assumed they worked, shaped the journey map and the final navigation, not just the copy.',
      'Consistency wins: it is easy for brand and system guidelines to drift apart once real screens get built. Keeping them tight kept the final product clear and usable end to end.',
      'Test, revise, repeat: iterating against real testing throughout caught major UX issues early, instead of after launch when they would have been expensive to fix.',
    ],
    nextSteps: [
      'Real-time sync is next: exploring live updates across pages and dashboards instead of requiring a refresh to see the latest state.',
      'More workflow tools are planned, extending functionality based on what the research already surfaced about how teams want to work.',
      'A closed beta with internal teams comes before wider access, to validate the platform against real daily use first.',
    ],
    hasContent: true,
  },
  eventhub: {
    summary: 'A digital-first platform for hosting and entering sports events, built to replace WhatsApp groups and spreadsheets.',
    problem:
      "Clubs and organisers were relying on manual tools (WhatsApp groups, PDFs, spreadsheets) to run sports events, which made communication hard and the entry process fragmented for everyone involved. Research across organisers, athletes, and club managers surfaced the same pattern from every side: people were wasting hours following up manually and collecting data across disconnected platforms, with no central hub either side could trust.",
    goal:
      'Create a seamless, digital-first product that brings structure, clarity, and trust to the way sports events are hosted and entered.',
    userResearch: {
      intro:
        'I interviewed event organisers, athletes, and club managers to understand what their day to day looked like when managing or entering events: how they currently manage or enter events, the biggest frustration with the current process, and what an ideal experience would look like.',
      keyFindings: [
        'Most clubs use outdated tools like email threads, spreadsheets, or DMs.',
        "Athletes want a simple 'book and go' experience.",
        'Organisers need better visibility of entries and payments.',
        "There's no central hub that everyone trusts.",
      ],
    },
    process: {
      personas: [
        {
          name: 'Josh',
          role: 'Club Organiser',
          detail: 'Wants to simplify event setup, manage bookings, and track payments, without wasting hours following up manually.',
        },
      ],
      flowImages: [
        {
          src: '/images/projects/eventhub/eventhub-user-flow.png',
          width: 850,
          height: 346,
          alt: 'EHUB user flow mapping the competitions viewing journey',
        },
        {
          src: '/images/projects/eventhub/eventhub-user-flow-organiser.png',
          width: 850,
          height: 346,
          alt: 'EHUB user flow mapping the organiser competition and entry form creation journey',
        },
      ],
      flowImagesNote:
        "I mapped the organiser's and the athlete's flows separately before touching a single screen: how an organiser sets up a competition and its entry form, and how someone simply finds and views one. Keeping those two jobs to be done apart on paper first meant the eventual navigation could serve both properly, instead of one flow being a compromised version of the other.",
    },
    journeyMap: {
      intro:
        'I mapped the user experience before and after Eventhub to identify gaps and build a better flow for both organisers and participants. The goal was to simplify every step, from planning and promotion to booking and payment.',
      flows: [
        {
          label: 'EHUB',
          rows: [
            { step: 'Plan event', experience: 'Uses the Eventhub dashboard.', opportunity: 'Structured templates and saved presets.' },
            { step: 'Share info', experience: 'One event link or QR code.', opportunity: 'All event details in one place.' },
            { step: 'Collect entries', experience: 'Centralised dashboard.', opportunity: 'Auto-organised entries and data export.' },
            { step: 'Manage payments', experience: 'Integrated payments.', opportunity: 'Automated tracking and payouts.' },
            { step: 'Update participants', experience: 'Sends bulk messages or updates via the app.', opportunity: 'Instant delivery, confirmed reads.' },
          ],
        },
      ],
    },
    wireframes: {
      intro:
        'I began by mapping user flows to define the key journeys and interactions within the product, which guided the structure and logic of the experience. From there, low-fidelity wireframes shaped layout and hierarchy, then were refined into high-fidelity wireframes focused on clarity, interactions, and usability before moving into the final UI design.',
      images: [
        {
          src: '/images/projects/eventhub/eventhub-wireframes.png',
          width: 2464,
          height: 1464,
          alt: 'EHUB low-fidelity wireframes for the participant dashboard and competition entry form',
        },
      ],
    },
    keyDecisions: [
      {
        title: 'Interviewed across every side of the transaction, not just the end user',
        description:
          "Most redesigns interview the person clicking the buttons. This one also interviewed the organisers running the event and the club managers coordinating logistics, surfacing frustrations like wasting hours following up manually and collecting data across platforms that an athlete-only research pass would have missed.",
        images: [
          {
            src: '/images/projects/eventhub/eventhub-competition-details.png',
            width: 560,
            height: 374,
            alt: 'EHUB competition details page',
          },
          {
            src: '/images/projects/eventhub/eventhub-ticket-checkout.png',
            width: 1160,
            height: 606,
            alt: 'EHUB ticket checkout flow',
          },
        ],
      },
      {
        title: "Solved the organiser's visibility problem, not just the athlete's booking flow",
        description:
          "User insights showed organisers needed better visibility of entries and payments as much as athletes needed a simple 'book and go' experience. The journey map treated both as first-class flows (planning and promotion through to booking and payment) rather than designing one happy path and retrofitting the other.",
      },
    ],
    styleGuide: [
      { label: 'Typography', detail: 'SF Pro throughout, for consistency across web and mobile.' },
      { label: 'Colour', detail: 'A cool, structured navy-to-blue-grey palette, built to feel trustworthy rather than playful.' },
    ],
    brandMarkImages: [
      {
        src: '/images/projects/eventhub/eventhub-wordmark-banner.png',
        width: 2464,
        height: 560,
        alt: 'EHUB wordmark on a lavender background',
      },
      {
        src: '/images/projects/eventhub/eventhub-logo-mark.png',
        width: 2464,
        height: 453,
        alt: 'EHUB logo mark alongside brand photography of a motorbike rider',
      },
    ],
    colourPalette: [
      { name: 'Ink', hex: '#353840' },
      { name: 'Primary', hex: '#4D70FF' },
      { name: 'Secondary', hex: '#738FE4' },
      { name: 'Tint 1', hex: '#98A9F1' },
      { name: 'Tint 2', hex: '#C5CCE9' },
      { name: 'Off White', hex: '#F9F9F9' },
    ],
    typography: [
      { name: 'SF Pro', cssFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" },
    ],
    moodImage: {
      src: '/images/projects/eventhub/eventhub-brand-mood.png',
      width: 2464,
      height: 1150,
      alt: 'EHUB brand mood photography: cap, tote bags, and printed cards across urban and studio settings',
    },
    outcome: [
      'Early interviews surfaced pain points that a survey alone would have missed: the flows were grounded in what organisers and athletes actually said, not assumptions made on their behalf.',
      'Refining small details (microcopy, button hierarchy, entry points) made a bigger difference to the booking flow than any single big feature would have.',
      'Testing throughout the process, not just at the end, kept the team from overbuilding features people did not actually need.',
    ],
    nextSteps: [
      'Expanding personalisation is next: giving users more control over saved events, preferences, and reminders to increase long-term engagement.',
      'Accessibility is a priority for the next iteration: colour contrast, font scaling, and keyboard navigation for a wider audience.',
      'Exploring partner dashboards tailored for event organisers could open up a two-sided platform and new features down the line.',
    ],
    hasContent: true,
  },
  'ey-catalyst': {
    summary:
      "Contract UI/UX design work across EY Catalyst's Operational Excellence (OpEx) portfolio: five cloud applications used to track manufacturing performance, shopfloor execution, and supply chain standards, improved hands-on through heuristic evaluation and direct user testing.",
    myRole:
      'UI/UX Designer (contract), working across five applications in the OpEx portfolio, collaborating directly with stakeholders, business analysts, and product owners on each one.',
    problem:
      "Across the five applications, day-to-day friction varied by team and workflow, but the pattern held: usability issues that had gone unaddressed because there was no structured process for surfacing them, no heuristic review, and no direct testing with the people actually using each feature.",
    goal:
      'Improve each of the five applications for the people using them and for the business, through hands-on, feature-level work: heuristic evaluations to catch structural issues early, and user testing to validate that each individual feature actually worked for the people using it, not just the team that built it.',
    process: {
      intro:
        'Working as a UI/UX Designer (contract) across the OpEx portfolio, engaging directly with stakeholders, business analysts, and product owners on each application. The work was hands-on and feature-level, run largely as heuristic evaluations done as a team, followed by user testing to see how each individual feature could actually improve for its users.',
      journeys: [
        { label: 'Process', stages: ['Heuristic evaluation', 'Stakeholder & BA alignment', 'User testing', 'Iteration'] },
      ],
    },
    keyDecisions: [
      {
        title: 'Paired heuristic evaluation with hands-on user testing on every feature',
        description:
          'Across all five applications, changes were not shipped on instinct. The team ran heuristic evaluations first to catch structural and usability issues early, then tested directly with users to see how each individual feature actually needed to improve for the people using it, rather than assuming a fix that looked right on paper would hold up in practice.',
      },
      {
        title: 'One example: replaced slow, error-prone manual edits with a Find & Replace feature, not a disruptive redesign',
        description:
          "In one of the five applications, users had no way to make bulk updates across complex process documents: the only option was manual, one-at-a-time edits with no visibility into what would change. Rather than rebuilding the tool from scratch, the fix layered a simplified find, preview, and confirm workflow onto the existing navigation, without asking users to relearn a tool they used every day.",
      },
    ],
    outcome: [
      'Working across five applications inside a large enterprise portfolio meant reaching shared clarity with stakeholders, business analysts, and product owners early on each one, that mattered as much as the interface work itself.',
      'Heuristic evaluation caught structural issues before they reached users, but user testing on individual features is what actually validated whether a fix held up in practice.',
      'The Find & Replace feature is one example: a lightweight, scalable fix that solved a real pain point without a disruptive redesign, designed to support future updates like more advanced search logic rather than needing revisiting.',
    ],
    hasContent: true,
    moreDetailNote: true,
  },
  xenith: {
    summary:
      'A brand identity and website for Xenith, a new UK accounting firm whose existing presence felt rigid and outdated. The rebrand paired bold electric blues with soft peach tones and a no-fluff typographic voice, aiming for a site that read as confident and approachable rather than corporate.',
    problem:
      "Xenith was a new firm with real expertise, but the old site felt rigid and outdated: it undersold what they were good at. They needed a brand and online presence that felt confident but approachable, showing professionalism without tipping into corporate stiffness, in a category (accounting and financial services) where most competitors default to one or the other.",
    problemVideo: {
      src: '/videos/projects/xenith/xenith-social-post.mp4',
      width: 1080,
      height: 1920,
      alt: 'Xenith social post animation showing the brand motion in use',
    },
    goal:
      'Create a friendly yet professional brand, and a website that delivers clarity and trust while making complex services easy to understand and access.',
    process: {
      intro:
        'Grounded in stakeholder interviews and competitor research before a single visual was made, then tested through wireframes and refined with the Xenith team through ongoing feedback loops. Site architecture mirrored the handful of tasks users actually needed to complete, so the structure came from research, not a template.',
      journeys: [
        { label: 'Process', stages: ['Interviews & research', 'User flows', 'Wireframes', 'Visual identity', 'Feedback loops'] },
        { label: 'Site architecture', stages: ['Discover the firm', 'Understand services', 'Follow the process', 'Get in touch'] },
      ],
    },
    wireframes: {
      intro:
        'Wireframes let me test structure early, before high-fidelity mockups brought in the visual identity, focused on clarity, trust, and confidence. The experience was refined through feedback loops to keep it focused and user-led throughout.',
    },
    styleGuide: [
      { label: 'Colour', detail: 'Bold electric blues paired with soft peach tones, balancing professionalism with warmth.' },
      { label: 'Typography', detail: 'Clean and modern, supporting a no-fluff tone of voice that makes complex financial services feel simple.' },
    ],
    keyDecisions: [
      {
        title: 'Grounded the visual identity in a UX process, not just a mood board',
        description:
          "Before any brand execution, the team ran stakeholder interviews and competitor research to define clear user flows, tested structure early with wireframes, then brought in the visual identity through high-fidelity mockups, refining through feedback loops so the finished brand stayed focused on clarity, trust, and confidence rather than decoration.",
      },
      {
        title: "Shaped the wordmark around the name's meaning, not a separate symbol",
        description:
          "Xenith refers to the highest point, so the logo exploration focused on leading lines and vertical movement before landing on the tallest letter in the wordmark: a slight manipulation of the 'T' into a soft point. That gave the identity a conceptual anchor without bolting on a separate icon.",
        images: [
          {
            src: '/images/projects/xenith/xenith-logo-banner.png',
            width: 1242,
            height: 376,
            alt: 'Xenith wordmark on a gradient banner',
          },
          {
            src: '/images/projects/xenith/xenith-brand-assets.png',
            width: 2014,
            height: 1578,
            alt: 'Xenith brand assets: letterhead, business cards, and card box',
          },
        ],
      },
      {
        title: 'Treated motion as part of the brand feel, not a finishing touch',
        description:
          "The site was hand-built in Webflow with custom animations and micro-interactions, but every scroll, hover, and transition was considered deliberately: enough motion to support the brand feel, not enough to distract from a site whose job was to make complex financial services feel simple.",
      },
    ],
    closingScreens: [
      {
        src: '/images/projects/xenith/xenith-tote-bag.png',
        width: 560,
        height: 882,
        alt: 'Xenith branded tote bag',
      },
      {
        src: '/images/projects/xenith/xenith-card-box.png',
        width: 445,
        height: 293,
        alt: 'Xenith business card box',
      },
      {
        src: '/images/projects/xenith/xenith-billboard.png',
        width: 560,
        height: 461,
        alt: 'Xenith brand billboard on a street',
      },
    ],
    outcome: [
      'Designing for a financial services brand meant learning to simplify complex information without losing credibility, and how much visual language alone can shape trust before a word is read.',
      'Close collaboration with the Xenith team (clear feedback cycles, shared ownership of ideas) kept the brand and the build aligned from strategy through to shipped site, instead of drifting apart the way brand guidelines and real screens often do.',
      'The project was a reminder that thoughtful design paired with precise execution can shift how an entire brand is perceived online, not just how one page looks.',
    ],
    hasContent: true,
    liveUrl: 'https://www.xenithwealth.co.uk',
  },
  'pt-flash': {
    summary:
      "An app that helps parents manage their children's extra-mural activities while giving providers a portal to list and track them. Research surfaced two distinct needs: parents wanted one mobile-first place to browse, book, and track schedules instead of scattered WhatsApp groups and paper notes, while providers wanted to manage capacity and cancellations without extra admin. So the product split into two tailored journeys built from that research.",
    problem:
      "Parents faced a scattered, time-consuming process managing their children's extra-mural activities: communication with providers was fragmented and handled manually, and schedules were hard to track. On the other side, service providers had no centralised way to promote their offerings or manage enrolments efficiently. Neither side had a system built for how they actually worked.",
    goal:
      'Design a digital tool that simplifies the entire extra-mural experience for both parents and providers: one place for parents to browse, book, and track activities, a professional portal for vendors to list services and manage schedules, a seamless experience across desktop and mobile, and trust built through clarity, organisation, and ease of use.',
    userResearch: {
      intro:
        'To understand the needs of both parents and providers, I gathered insights through informal interviews, online research, and competitor analysis. This validated the need for two tailored user flows, one for parents and one for providers, while keeping the overall experience unified and easy to use.',
      keyFindings: [
        'Parents struggle with scattered communication (WhatsApp groups, emails, paper notes).',
        "Many parents manage multiple children's schedules, making overlap and double-booking common.",
        'Providers often rely on outdated systems (spreadsheets, manual payments) to manage enrolments.',
        'Parents expect mobile-first access and simple reminders.',
        'Providers value tools that save time, not add extra admin.',
      ],
    },
    process: {
      personas: [
        {
          name: 'Parent',
          role: 'Ages 30–45, primary-school-age children',
          detail: 'Wants one central place to manage activities, reminders, and confirmations, frustrated by fragmented communication and double-bookings.',
        },
        {
          name: 'Provider',
          role: 'Ages 28–50, offers specialised classes',
          detail: 'Wants a simple system to publish, update, and manage classes, frustrated by manual processes, inconsistent enrolment tracking, and admin overload.',
        },
      ],
      quotes: [
        'Parents want transparency, clear schedules, pricing, and easy booking confirmations.',
        'Providers want control: the ability to update class times, manage capacity, and handle cancellations.',
        "Both sides value simplicity and don't want to learn a complex system.",
        'Mobile is the primary touchpoint for parents managing schedules on the go.',
      ],
      journeys: [
        { label: 'Parents', stages: ['Discover', 'Book', 'Track', 'Manage'] },
        { label: 'Providers', stages: ['Create', 'Manage', 'Engage', 'Review'] },
      ],
    },
    wireframes: {
      intro: 'Initial wireframes focused on clarity and simplicity across both portals.',
      bullets: [
        'Parent dashboard with a calendar view and upcoming activities.',
        'Vendor dashboard for managing listings and schedules.',
        'Streamlined booking flow with minimal steps.',
        'Mobile-first layouts, ensuring all features were accessible on small screens.',
      ],
    },
    keyDecisions: [
      {
        title: 'Designed two tailored journeys from day one, not one generic flow',
        description:
          "Research made the split obvious: parents wanted a simple, mobile-first way to browse, book, and track activities without learning a new system, while providers wanted control over class times, capacity, and cancellations without extra admin. The journey map treated Discover → Book → Track → Manage (parents) and Create → Manage → Engage → Review (providers) as two first-class flows, not a parent app with a provider settings page bolted on.",
        images: [
          {
            src: '/images/projects/pt-flash/pt-flash-calendar-states.png',
            width: 1232,
            height: 1043,
            alt: 'PT Flash calendar screen shown across booking states, from ready to attend through cancelled',
          },
        ],
      },
      {
        title: 'Prioritised mobile-first, low-friction booking based on what parents actually said',
        description:
          "Research showed mobile is the primary touchpoint for parents managing schedules on the go, and that both sides valued simplicity over feature depth. Wireframes were built mobile-first around a streamlined booking flow with minimal steps, instead of porting a desktop-first admin tool down to a smaller screen as an afterthought.",
        images: [
          {
            src: '/images/projects/pt-flash/pt-flash-dashboard-iphone-mockup.png',
            width: 560,
            height: 883,
            alt: 'PT Flash calendar dashboard shown on an iPhone',
          },
        ],
      },
    ],
    outcome: [
      'Designing for two distinct but connected user groups meant balancing consistency and specificity: shared, clear patterns across both portals, with individual features tailored to how parents and providers actually behave.',
      'Reminders and notifications mattered more than expected in a behaviour-driven app like this, a small detail that shaped how much people ended up trusting and using the product.',
      'Early wireframes stayed deliberately narrow (calendar-based dashboards, streamlined booking, mobile-first layouts) rather than trying to fit every admin feature into the first version.',
    ],
    hasContent: true,
  },
  fnb: {
    summary:
      "Ongoing UI/UX design work at FNB, helping migrate a large enterprise banking platform onto a single shared framework and using the migration as a chance to improve the underlying flows, not just reskin what existed.",
    myRole:
      "UI/UX Designer within FNB's enterprise banking team, collaborating directly with stakeholders, the business, developers, and subject matter experts.",
    problem:
      "FNB's site had grown page by page, with different areas built on different frameworks and no shared consistency between them. That made the experience unpredictable for customers and made it harder to improve any one part without affecting the rest. The business needed every page migrated onto a single framework, and treated that migration as an opportunity to create a more impactful experience for users, not just a like-for-like rebuild.",
    goal:
      'Move the platform from a rigid, template-driven framework, where screens were assembled from fixed layout slots with limited compositional flexibility, to a component-driven, token-aware system that supports dynamic theming, responsive containers, and real-time data binding, so pages stop being built by developers per spec and start being composed by designers from a governed system.',
    process: {
      intro:
        "Working as a UI/UX Designer within FNB's enterprise banking team, sitting at the translation layer between the legacy framework and the new one rather than downstream of the migration. Specifics of individual pages and the underlying architecture are confidential, but the shift itself was structural, not cosmetic: from developers building pages per spec, to designers composing surfaces from a governed system, in close collaboration with stakeholders and developers throughout.",
    },
    keyDecisions: [
      {
        title: 'Questioned scope before executing it',
        description:
          "Every request got weighed as 'should we' before 'could we': design decisions were never made just because they were technically possible. Where a request did not clearly serve the user or the business, that got pushed back on rather than quietly built.",
      },
      {
        title: 'Audited every legacy screen and defined the token contracts before design work began',
        description:
          'Rather than starting the new component library from a blank page, I mapped every existing screen against the new component model, deciding case by case what deserved to become a reusable component versus a one-off composition that did not need to set a pattern. I also defined the colour, spacing, typography, and elevation token contracts the legacy framework had never had, so development had a governed system to build against instead of hardcoded values per screen.',
      },
      {
        title: 'Owned consistency across two frameworks running in production at once',
        description:
          'For a stretch of the migration, old and new pages rendered side by side in production, so consistency had to be actively maintained rather than assumed. I also moved design handoff onto a Figma source of truth that developers could consume directly through the new component pipeline, replacing the old process of screenshots and written specs.',
      },
    ],
    outcome: [
      'This is ongoing: the business is partway through the migration, with a number of pages already moved onto the shared framework and the rest in progress.',
      'A UI designer being central to this kind of migration, not downstream of it, is what turns a technical re-platform into a product upgrade users actually feel, rather than just a swapped-out rendering engine.',
    ],
    hasContent: true,
    moreDetailNote: true,
  },
}
