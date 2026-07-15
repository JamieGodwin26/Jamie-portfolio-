export interface KeyDecision {
  title: string
  description: string
}

export interface Persona {
  name: string
  role: string
  detail: string
}

export interface Journey {
  /** Label for this flow — e.g. "Journey map", or a role name when a project has more than one flow */
  label: string
  stages: string[]
}

export interface ProcessContent {
  /** Short framing line — used on projects without personas/quotes (e.g. brand or single-feature work) */
  intro?: string
  personas?: Persona[]
  /** Verbatim research quotes only — never paraphrased or invented */
  quotes?: string[]
  journeys?: Journey[]
}

export interface CaseStudyContent {
  /** One-line description for the hero — factual, not marketing copy */
  summary: string
  /** The problem being solved — what was broken and for whom, only written where real, verified content exists */
  problem?: string
  /** Real research artifacts — personas, quotes, journey stages — shown as evidence, not narrated as prose */
  process?: ProcessContent
  keyDecisions?: KeyDecision[]
  /** What changed or was learned — honest and qualitative where no verified metric exists, never an invented number */
  outcome?: string[]
  /** Set false when the case study is still a structural placeholder */
  hasContent: boolean
  /** Shows a "More detail available on request" mailto note — for work with confidential parts that aren't shown here */
  moreDetailNote?: boolean
  /** Link to the real, shipped site — only set when verified live */
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
      'A centralised operations platform that keeps teams aligned on projects, files, and progress — with peer recognition built into the same workflow, not bolted on as a separate app.',
    problem:
      "Most internal dashboards are cluttered, slow, and confusing, and the teams I interviewed — project leads and creative leads working across departments — felt it directly: people wasted time jumping between apps, files got lost in scattered systems, and there was no single place to plan, manage, and track work. Orbit needed to be intuitive from day one, not another tool competing for attention.",
    process: {
      personas: [
        { name: 'Liam', role: 'Project Manager', detail: 'Wants a clear overview of timelines, progress, and team responsibilities.' },
        { name: 'Amara', role: 'Creative Lead', detail: 'Needs fast access to shared assets and a system that helps her team stay on track.' },
      ],
      quotes: [
        "Sometimes we don't even know where the latest file lives.",
        'Project updates fall through the cracks because of disjointed systems.',
      ],
      journeys: [
        { label: 'Journey map', stages: ['Planning', 'File Sharing', 'Collaboration', 'Feedback', 'Handoff'] },
      ],
    },
    keyDecisions: [
      {
        title: 'Grounded the platform in two distinct personas, not one generic "user"',
        description:
          "Research surfaced a Project Manager who needed a clear overview of timelines and team responsibilities, and a Creative Lead who needed fast access to shared assets — different enough that the journey map (Planning → File Sharing → Collaboration → Feedback → Handoff) had to work for both roles, not just the loudest one.",
      },
      {
        title: 'Built recognition into the workflow instead of bolting it on',
        description:
          "Rather than treating peer recognition as a separate 'kudos' app, it lives inside the same platform teams already use for tracking work — a Company / Personal / All Time feed sits alongside the project and file tools, so acknowledging a teammate's contribution takes the same number of clicks as checking a deadline.",
      },
    ],
    outcome: [
      'Research shapes structure — understanding how teams actually work, not how we assumed they worked, shaped the journey map and the final navigation, not just the copy.',
      "Consistency wins — it's easy for brand and system guidelines to drift apart once real screens get built. Keeping them tight kept the final product clear and usable end to end.",
      'Test, revise, repeat — iterating against real testing throughout caught major UX issues early, instead of after launch when they would have been expensive to fix.',
    ],
    hasContent: true,
  },
  eventhub: {
    summary: 'A digital-first platform for hosting and entering sports events — built to replace WhatsApp groups and spreadsheets.',
    problem:
      "Clubs and organisers were relying on manual tools — WhatsApp groups, PDFs, spreadsheets — to run sports events, which made communication hard and the entry process fragmented for everyone involved. Research across organisers, athletes, and club managers surfaced the same pattern from every side: people were wasting hours following up manually and collecting data across disconnected platforms, with no central hub either side could trust.",
    process: {
      personas: [
        {
          name: 'Josh',
          role: 'Club Organiser',
          detail: 'Wants to simplify event setup, manage bookings, and track payments — without wasting hours following up manually.',
        },
      ],
      quotes: [
        'Most clubs use outdated tools like email threads, spreadsheets, or DMs.',
        "Athletes want a simple 'book and go' experience.",
        "There's no central hub that everyone trusts.",
      ],
      journeys: [
        { label: 'Journey map', stages: ['Planning', 'Promotion', 'Booking', 'Payment'] },
      ],
    },
    keyDecisions: [
      {
        title: 'Interviewed across every side of the transaction, not just the end user',
        description:
          "Most redesigns interview the person clicking the buttons. This one also interviewed the organisers running the event and the club managers coordinating logistics — surfacing frustrations like wasting hours following up manually and collecting data across platforms that an athlete-only research pass would have missed.",
      },
      {
        title: "Solved the organiser's visibility problem, not just the athlete's booking flow",
        description:
          "User insights showed organisers needed better visibility of entries and payments as much as athletes needed a simple 'book and go' experience. The journey map treated both as first-class flows — planning and promotion through to booking and payment — rather than designing one happy path and retrofitting the other.",
      },
    ],
    outcome: [
      'Early interviews surfaced pain points that a survey alone would have missed — the flows were grounded in what organisers and athletes actually said, not assumptions made on their behalf.',
      'Refining small details — microcopy, button hierarchy, entry points — made a bigger difference to the booking flow than any single big feature would have.',
      "Testing throughout the process, not just at the end, kept the team from overbuilding features people didn't actually need.",
    ],
    hasContent: true,
  },
  'ey-catalyst': {
    summary: 'A Find & Replace feature for EY Catalyst’s enterprise process-authoring tool — built to replace slow, error-prone manual edits.',
    problem:
      "Before this feature, users had no way to make bulk updates across complex process documents — the only option was manual, one-at-a-time edits with no visibility into what would change. That caused manual workarounds, errors during updates, and low confidence in the platform for editing at scale, on a tool other teams already depended on daily. The team needed a solution that was fast, intuitive, and safe to ship without disrupting that existing workflow.",
    process: {
      intro:
        "No formal personas here — this was scoped directly from three recurring pain points flagged inside an existing enterprise tool, then validated with the Product Owners, BAs, developers, and designers who used it daily.",
    },
    keyDecisions: [
      {
        title: 'Simplified the authoring journey instead of a disruptive redesign',
        description:
          "Rather than rebuilding the authoring tool from scratch, the fix layered a simplified structure and a focused workflow onto the existing navigation, turning a cluttered, unclear hierarchy into something scannable — without asking users to relearn a tool they used every day.",
      },
      {
        title: 'Built preview-then-confirm into the flow, not silent bulk edits',
        description:
          "Editing at scale on a platform other teams rely on daily is risky if changes happen invisibly. The final design lets users find terms, preview replacements, and confirm changes within their current workspace before anything is applied — answering the 'low confidence in editing at scale' problem the research surfaced, without bolting on a separate confirmation screen.",
      },
    ],
    outcome: [
      'Solved a real user pain point with a lightweight, scalable solution, without requiring a disruptive redesign of the authoring tool.',
      'Fit into the existing platform without needing major workflow changes — reducing manual errors and improving editing efficiency for the teams who used it daily.',
      'Designed to support future updates, like more advanced search logic, rather than a one-off fix that would need revisiting.',
    ],
    hasContent: true,
    moreDetailNote: true,
  },
  xenith: {
    summary:
      'A brand identity and website for Xenith, a new UK accounting firm whose existing presence felt rigid and outdated. The rebrand paired bold electric blues with soft peach tones and a no-fluff typographic voice, aiming for a site that read as confident and approachable rather than corporate.',
    problem:
      "Xenith was a new firm with real expertise, but the old site felt rigid and outdated — it undersold what they were good at. They needed a brand and online presence that felt confident but approachable, showing professionalism without tipping into corporate stiffness, in a category (accounting and financial services) where most competitors default to one or the other.",
    process: {
      intro:
        'Grounded in stakeholder interviews and competitor research before a single visual was made, then tested through wireframes and refined with the Xenith team through ongoing feedback loops.',
      journeys: [
        { label: 'Process', stages: ['Interviews & research', 'User flows', 'Wireframes', 'Visual identity', 'Feedback loops'] },
      ],
    },
    keyDecisions: [
      {
        title: 'Grounded the visual identity in a UX process, not just a mood board',
        description:
          "Before any brand execution, the team ran stakeholder interviews and competitor research to define clear user flows, tested structure early with wireframes, then brought in the visual identity through high-fidelity mockups — refining through feedback loops so the finished brand stayed focused on clarity, trust, and confidence rather than decoration.",
      },
      {
        title: 'Treated motion as part of the brand feel, not a finishing touch',
        description:
          "The site was hand-built in Webflow with custom animations and micro-interactions, but every scroll, hover, and transition was considered deliberately — enough motion to support the brand feel, not enough to distract from a site whose job was to make complex financial services feel simple.",
      },
    ],
    outcome: [
      'Designing for a financial services brand meant learning to simplify complex information without losing credibility — and how much visual language alone can shape trust before a word is read.',
      'Close collaboration with the Xenith team — clear feedback cycles, shared ownership of ideas — kept the brand and the build aligned from strategy through to shipped site, instead of drifting apart the way brand guidelines and real screens often do.',
      'The project was a reminder that thoughtful design paired with precise execution can shift how an entire brand is perceived online, not just how one page looks.',
    ],
    hasContent: true,
    liveUrl: 'https://www.xenithwealth.co.uk',
  },
  'pt-flash': {
    summary:
      "An app that helps parents manage their children's extra-mural activities while giving providers a portal to list and track them. Research surfaced two distinct needs — parents wanted one mobile-first place to browse, book, and track schedules instead of scattered WhatsApp groups and paper notes, while providers wanted to manage capacity and cancellations without extra admin — so the product split into two tailored journeys built from that research.",
    problem:
      "Parents faced a scattered, time-consuming process managing their children's extra-mural activities — communication with providers was fragmented and handled manually, and schedules were hard to track. On the other side, service providers had no centralised way to promote their offerings or manage enrolments efficiently. Neither side had a system built for how they actually worked.",
    process: {
      personas: [
        {
          name: 'Parent',
          role: 'Ages 30–45, primary-school-age children',
          detail: 'Wants one central place to manage activities, reminders, and confirmations — frustrated by fragmented communication and double-bookings.',
        },
      ],
      quotes: [
        'Parents want transparency, clear schedules, pricing, and easy booking confirmations.',
        'Providers want control — the ability to update class times, manage capacity, and handle cancellations.',
        "Both sides value simplicity and don't want to learn a complex system.",
      ],
      journeys: [
        { label: 'Parents', stages: ['Discover', 'Book', 'Track', 'Manage'] },
        { label: 'Providers', stages: ['Create', 'Manage', 'Engage', 'Review'] },
      ],
    },
    keyDecisions: [
      {
        title: 'Designed two tailored journeys from day one, not one generic flow',
        description:
          "Research made the split obvious: parents wanted a simple, mobile-first way to browse, book, and track activities without learning a new system, while providers wanted control over class times, capacity, and cancellations without extra admin. The journey map treated Discover → Book → Track → Manage (parents) and Create → Manage → Engage → Review (providers) as two first-class flows, not a parent app with a provider settings page bolted on.",
      },
      {
        title: 'Prioritised mobile-first, low-friction booking based on what parents actually said',
        description:
          "Research showed mobile is the primary touchpoint for parents managing schedules on the go, and that both sides valued simplicity over feature depth. Wireframes were built mobile-first around a streamlined booking flow with minimal steps, instead of porting a desktop-first admin tool down to a smaller screen as an afterthought.",
      },
    ],
    outcome: [
      'Designing for two distinct but connected user groups meant balancing consistency and specificity — shared, clear patterns across both portals, with individual features tailored to how parents and providers actually behave.',
      'Reminders and notifications mattered more than expected in a behaviour-driven app like this — a small detail that shaped how much people ended up trusting and using the product.',
      'Early wireframes stayed deliberately narrow — calendar-based dashboards, streamlined booking, mobile-first layouts — rather than trying to fit every admin feature into the first version.',
    ],
    hasContent: true,
  },
}
