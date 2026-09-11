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
  /** Omit when the persona already is a role title (name = "Branch Manager"), rather than a named person with a separate role */
  role?: string
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
  /** Heading above the personas grid. Defaults to "Persona" — set to e.g. "Roles" when the entries are role titles rather than named individuals */
  personasLabel?: string
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

export interface ComponentLibrary {
  intro: string
  /** Real Figma component library / file-structure screens only, e.g. component sets with states, dev-mode annotations, or a page/frame overview. Omit until they exist — the section renders as intro-only rather than a heading with nothing under it. */
  images?: ProjectScreen[]
  /** Compact functional colour legend for system/tool work where colour carries a fixed meaning rather than brand expression. Renders as a tight legend inside this section, not as large brand swatches. */
  colourLegend?: ColourLegendEntry[]
  /** Short design-system notes (tone of voice, type rationale, colour principle) folded into this section instead of a separate style-guide block. */
  notes?: StyleGuideItem[]
}

export interface ColourLegendEntry {
  role: string
  /** Real hex sampled from the system's own palette, never guessed */
  hex: string
  /** Where this colour is allowed to appear and what it means there */
  usage: string
}

export interface Validation {
  /** How the work was pressure-tested before it was built: the prototype-and-review loop, what it ran on, who reacted to it. Use \n\n for paragraph breaks. */
  intro: string
  /** Concrete things the clickable prototype changed, each a before → after. Only real changes that came out of a review session, never invented rounds. */
  changes?: { before: string; after: string }[]
  /** Why working this way mattered and where it's heading — one closing paragraph. */
  note?: string
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
  /** A real brand reel or walkthrough video, used as the lead visual on an archived case study in place of the abstract screens placeholder — for projects whose strongest available real asset is motion rather than stills. */
  reelVideo?: ProjectVideo
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
  /** "Testing before building": the prototype-and-review loop that ran ahead of visual design. Shown before the component library and key decisions, since it produced them. */
  validation?: Validation
  /** Real Figma component library / file-structure proof, shown after wireframes — only when genuine screens exist, never described without them */
  componentLibrary?: ComponentLibrary
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
  /** Section label above moodImage, e.g. "Logos" when the shot is really a logo-lockup showcase rather than lifestyle photography. Defaults to "Mood". */
  moodLabel?: string
  /** Where the work actually landed: shipped/adoption status, a concrete before/after, or similar — one honest sentence, never an invented metric. Shown as a distinct visual callout before "What I learned". */
  result?: string
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
  gbt: {
    summary:
      "A multi-role fundraising CRM for a national children's charity, replacing spreadsheets and institutional memory with a single donor record that serves the consultant on the road, the manager approving their work, and the director reading the national picture.",
    myRole:
      'UX Researcher and UI/UX Designer, working as the sole point of contact directly with the client throughout the engagement.',
    problem:
      "Girls & Boys Town South Africa funds residential care, family outreach and education programmes across nine provinces entirely through donors: individuals on monthly debit orders, corporates, family trusts, foundations. The fundraising operation behind that funding had no system holding it together.\n\nConsultant notes lived in personal spreadsheets. Donor transfers between consultants happened over email. Section 18A tax certificates were generated one at a time, by hand, at the busiest point in the financial year. When a consultant left, their relationship knowledge left with them.\n\nThe organisation had a functional requirements document and a set of Figma screens, but not a product. The requirements described features; the screens described fields. Neither described what a consultant actually does at 9am on a Monday, and four different roles were all meant to work off the same data without getting in each other's way.",
    goal:
      'One record per donor that every role can trust: a consultant sees what needs them today, a manager sees what is blocked, and leadership sees the national picture, without anyone maintaining a spreadsheet on the side.',
    userResearch: {
      intro:
        "There were no users to interview at the outset, since this was a system being specified before it was built, and my access was to the client's documentation and the client themselves. So the research was documentary and diagnostic rather than generative.\n\nI worked through the functional requirements document line by line and audited the existing Figma file against it, looking specifically for the gaps between what was specified and what would actually happen in use. Then I took the questions that surfaced directly to the client, in sessions I ran myself, and treated their answers as the primary evidence.",
      keyFindings: [
        'The requirements described fields and features, not tasks. Nothing in them answered "what does a consultant do first thing on a Monday?"',
        'Four roles had been treated as permission levels on one interface, when they have genuinely different jobs.',
        'Several requirements would have caused problems downstream: deletable records destroying audit trails, dashboards promising analytics the product did not have.',
        'The most painful job in the fundraising year (tax season) was specified as a single-record action, with no acknowledgement of volume.',
      ],
    },
    process: {
      personasLabel: 'Roles',
      personas: [
        {
          name: 'Service Consultant',
          detail: 'Manages a portfolio of prospects and donors. Needs to know what needs them today, and to log what happened without it feeling like admin.',
        },
        {
          name: 'Branch Manager',
          detail: "Runs a branch team. Needs to see what is blocked, approve or reject their consultants' requests, and know who needs support.",
        },
        {
          name: 'Head of Fundraising',
          detail: 'Owns the national picture. Needs targets, regional performance and the exceptions worth escalating, not the day-to-day.',
        },
        {
          name: 'Super Administrator',
          detail: 'Keeps the system honest. Needs final approvals, user and branch management, and a system-wide view across every branch.',
        },
      ],
    },
    journeyMap: {
      intro:
        "I mapped the consultant's relationship cycle end to end, the role with the most daily contact with the system, to find where the record actually breaks down.",
      flows: [
        {
          label: 'Girls & Boys Town',
          rows: [
            { step: 'Prospect research', experience: 'Notes in personal spreadsheets, no shared history.', emotion: 'Working blind', opportunity: 'One profile carrying the full relationship history.' },
            { step: 'Contact and logging', experience: 'Calls happen, notes get written later or not at all.', emotion: 'Behind', opportunity: 'Make logging faster than not logging.' },
            { step: 'Follow-up', experience: 'Reminders live in personal calendars, disconnected from the record.', emotion: 'Anxious', opportunity: 'Link the task to the conversation that caused it.' },
            { step: 'Conversion to donor', experience: 'Contribution captured, banking details re-entered each time.', emotion: 'Repetitive', opportunity: 'Capture banking once; reuse it everywhere.' },
            { step: 'Stewardship and compliance', experience: 'Tax certificates hand-generated, one at a time, in season.', emotion: 'Overwhelmed', opportunity: 'Bulk generation, with the record updated automatically.' },
            { step: 'Handover and transfer', experience: 'Reassignment over email; history often lost.', emotion: 'Rushed', opportunity: 'A traceable approval chain that carries the record with it.' },
          ],
        },
      ],
    },
    keyDecisions: [
      {
        title: 'Mapped every flow before designing a screen',
        description:
          "I mapped every flow before designing a screen, including the branches nobody asks for but everybody hits: a duplicate prospect name, a rejected transfer, a paused donation, an empty portfolio on day one. Two flows drove most of the system's shape. The diary to reminder loop has a consultant log a diary entry after a call and create a reminder from it, and when the reminder comes due and they complete it, the system offers a pre-filled diary entry to close the loop, so the record stays accurate because keeping it accurate is the path of least resistance. The two-stage approval chain sends a transfer or pool claim from Consultant to Branch Manager to Super Administrator, with distinct states at each gate, reasons required on rejection, and a notification at every step, including one back to the consultant confirming their request cleared the first stage.",
        images: [
          {
            src: '/images/projects/gbt/gbt-mockup-prospect-wizard.jpg',
            width: 1920,
            height: 1440,
            alt: 'The add-a-prospect flow as a guided three-step wizard: select type, prospect details, confirmation, with the detail sections broken into personal, address and general',
          },
        ],
      },
      {
        title: 'Archive, do not delete',
        description:
          'The brief asked for completed reminders to be deletable. But a completed reminder is a record of intent, evidence someone committed to an action and honoured it, and deleting it destroys the audit trail that makes the whole diary trustworthy. I designed an archive pattern instead: completed items clear out of the active list but stay restorable and auditable. The client accepted it, and the same reasoning went on to shape donations, where cancelling stops collection but preserves the giving history that tax certificates and reporting depend on. Where a true delete does exist (super administrators only), the interface actively steers toward cancelling and states plainly what deleting destroys.',
      },
      {
        title: 'Made the two-stage approval legible',
        description:
          'Two-stage approval was a requirement; making it visible was not. A consultant who submits a request and sees only "pending" has no idea whether they are waiting on their manager or head office. I designed an explicit three-step tracker (Submitted, Branch Manager, Super Admin) onto every request, with distinct statuses per stage, a timeline recording who acted and when, and action buttons that name their real consequence: "Approve and forward" for the manager, "Approve and assign" for the admin.',
      },
      {
        title: 'Gave the system an obligation to the record',
        description:
          'If the diary is the trustworthy source of truth, the product cannot just permit people to keep it complete, it has to contribute. Issuing a tax certificate, singly or in bulk, now writes a "Tax Certificate Sent" entry to the donor\'s diary automatically, marked system-generated and not hand-authorable.',
      },
      {
        title: 'Designed for volume, not just the single case',
        description:
          'The requirements described generating a tax certificate from a donor\'s profile. Correct, but it ignores the actual problem: tax season means hundreds of certificates, and one at a time is the biggest chore of the fundraising year. I added a bulk flow: filter by branch or by who is outstanding, review the batch, send or download in one action, and put a standing prompt on the donor list showing how many donors still lack a certificate, so the job is visible before it is urgent.',
      },
      {
        title: 'Cut what the product could not yet honour',
        description:
          'The original dashboards were dense with KPI scorecards, income versus target charts and performance analytics. Much of it graded consultants rather than helping them, and some referenced features that did not exist. I stripped every KPI block from all four dashboards and rebuilt them around a "Needs attention" queue that links straight into real work, moving the analytical content to a dedicated Reports section where it belongs. Navigation got the same treatment: every remaining item now leads to a page that exists. A dashboard that promises features the product does not have costs more trust than an empty state ever will.',
      },
    ],
    validation: {
      intro:
        "The whole system was built and tested as a working prototype before any of it was designed in Figma. I used Claude to stand up all 19 screens across the four roles as connected pages: real navigation, real state, every empty, loading, success and error state, and a role switcher that re-renders the entire application when you change persona. The client could click through their own product, as any of its four users, weeks before a single screen was drawn.\n\nThat changed what the review sessions were. Instead of presenting a transfer-approval screen and talking through it, I could say “approve this request” and we would both watch what the consultant receives. Feedback stopped being layout opinion and became whether the flow was right. Scoping problems that would have been expensive to unpick after visual design and development surfaced while they were still a five-minute change: a feature that felt essential for one role turning out to be noise for another, an approval step missing a notification nobody had specified, a screen that no role actually needed.\n\nSeveral of the decisions below were settled in a single session because the client could feel the consequence instead of imagining it. Only what survived that testing went into Figma for visual design, and then into development.",
      changes: [
        {
          before: 'The brief had completed reminders being deleted once actioned.',
          after: 'Clicking the diary end to end in the prototype made it obvious the history was the asset. Moved to an archive pattern, and the client signed it off in the session rather than a follow-up email.',
        },
        {
          before: 'One dashboard, with content shown or hidden by permission level.',
          after: 'Running each role against it live showed most of the dashboard was irrelevant to whoever was looking. Split into four purpose-built dashboards before any of them were designed.',
        },
        {
          before: 'Tax certificates handled one donor at a time, as specified.',
          after: 'A mock run at tax-season volume in the prototype made the single-record flow indefensible. Added the bulk flow and the outstanding-count prompt while it was still just a wiring change.',
        },
      ],
      note:
        'Prototyping this way keeps moving the point where a decision gets made earlier, and cheaper: Figma and development only ever touch things a real person has already reacted to. The part that carries the most value is framing the right thing to put in front of the client and reading the response honestly, not producing the first artefact. End-user testing with fundraisers is the next step, and the prototype is already the thing to run it on.',
    },
    componentLibrary: {
      intro:
        "This was a system design, not a rebrand: the organisation's existing mark stayed as-is, and the work went into building one shared system rather than per-page styling. A single token set for colour, type and spacing, with shared navigation, cards, modals, tables, toasts, status pills and empty states reused across all 19 screens. Two patterns did the most work. Status pills carry meaning consistently wherever a record has state, so a colour learned in one place reads correctly everywhere. And every state is designed, including the ones usually skipped: first-run empty states, filtered-to-nothing states with a clear route out, in-flight loading, and errors that say what to do next. What follows is a snapshot of the system, not the full component set.",
      images: [
        {
          src: '/images/projects/gbt/gbt-component-library-buttons.png',
          width: 2600,
          height: 1791,
          alt: 'Girls & Boys Town design system: the Button component set, with filled, outlined and borderless variants across primary, secondary and neutral colours, every size, and default, hover, pressed, disabled and loading states, plus the component architecture diagram',
        },
        {
          src: '/images/projects/gbt/gbt-component-library-search.png',
          width: 2600,
          height: 1042,
          alt: 'Girls & Boys Town design system: the Search component set, with small, medium and large sizes across default, focused, typing and filled states, plus the component architecture diagram',
        },
      ],
      colourLegend: [
        { role: 'Identity', hex: '#F46A3C', usage: "The charity's existing orange, fenced off to identity and primary actions only, so it never competes with a status." },
        { role: 'Information', hex: '#2E5AAC', usage: 'Neutral system messages and in-progress states.' },
        { role: 'Confirmed', hex: '#287C3C', usage: 'Approved, sent, reconciled — anything successfully done.' },
        { role: 'Caution', hex: '#8A5A00', usage: 'Needs attention soon: a deadline approaching or data missing.' },
        { role: 'Overdue', hex: '#DA1414', usage: 'Past due or destructive: overdue follow-ups, delete actions.' },
      ],
      notes: [
        { label: 'Tone of voice', detail: 'Plain, specific, and never blaming. Buttons name their consequence; errors say what to do next.' },
        { label: 'Type', detail: 'Work Sans for interface text, Roboto for dense tables and numeric data.' },
      ],
    },
    result:
      'Delivered as a complete interactive prototype: 19 connected screens across four roles, with every state designed, now serving as the reference the build is based on. The client has been very happy with the work to date.',
    outcome: [
      'The requirements document is not the design. Requirements tell you what a client believes they need; they rarely tell you what a user does at 4pm on a Friday. The archive pattern, the completion nudge, the bulk certificate flow and the stripped-back dashboards all came from asking what happens after a feature ships.',
      'A working prototype changes the conversation. Being able to say "click approve and see what the consultant gets" moved client sessions from opinion to observation. As the sole designer liaising directly with the client, that was the difference between defending decisions and demonstrating them.',
      'Prototyping with AI before Figma is changing how I work. Building the structural draft fast and disposable in AI means Figma and development only ever touch decisions that have already survived a real client test. The line between prototype and design keeps moving earlier, and more of the value sits in framing the right questions and reading the answers than in producing the first artefact.',
      'Designing four things beats designing one thing four ways. Four dashboards was more work than one with permissions, and it was the right call: the moment each dashboard had to answer one specific question, most of the clutter eliminated itself.',
      'Saying no is part of the service. Every decision I am proudest of here started as a disagreement with the brief. Being the sole point of contact meant I had to make those cases myself, in plain language, with the reasoning visible.',
    ],
    nextSteps: [
      "Bank file formats still need to be finalised. Debit order and credit card collection exports are designed and previewed in-product, with the column layout defined in one place so the bank's final spec is a single change.",
      'National versus per-branch collections: the scope selector supports both while the client confirms how collections are actually run.',
      'Usability testing with real fundraisers is next. The prototype is complete enough to test against real daily use, which is where I would expect the diary and reminder flows to earn their keep or get revised.',
    ],
    hasContent: true,
  },
  orbit: {
    summary:
      'A centralised operations platform that keeps teams aligned on projects, files, and progress, with peer recognition built into the same workflow instead of bolted on as a separate app.',
    problem:
      "Most internal dashboards are cluttered, slow, and confusing. Users struggle to find what they need or take action quickly, and the teams I interviewed (project leads and creative leads working across departments) felt it directly: people wasted time jumping between apps, files got lost in scattered systems, and there was no single place to plan, manage, and track work. Orbit needed to be intuitive from day one, not another tool competing for attention.",
    goal:
      'A clean, all-in-one platform where teams can manage projects, share files, and stay aligned from start to finish.',
    userResearch: {
      intro:
        'I interviewed project leads and creative teams working across multiple departments, aiming to understand their pain points, workflows, and what slows them down day to day. I also used AI tools early on to help synthesise interview notes into clear patterns faster, freeing up more time for the interviews themselves.',
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
        'I mapped each flow end to end before any screen was designed, using AI to help draft and stress-test flow and requirement variations before refining them by hand. That meant every decision point, branch, and edge case got caught on a flowchart, not in a working prototype.',
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
    componentLibrary: {
      intro:
        'Wireframes fed into a proper component library, not a one-off screen file: buttons, inputs, dropdowns, and form patterns built as reusable sets with every state (default, hover, active, disabled, error) defined once and reused everywhere, each one marked Ready For Dev with handoff notes for anything a developer could otherwise misread.',
      images: [
        {
          src: '/images/projects/orbit/orbit-component-library-buttons.png',
          width: 2212,
          height: 3101,
          alt: 'Orbit Figma component library: button variants across primary, secondary, warning, and text styles, each with default, hover, and disabled states',
        },
        {
          src: '/images/projects/orbit/orbit-component-library-inputs.png',
          width: 2814,
          height: 2749,
          alt: 'Orbit Figma component library: text input, calendar, and dropdown field components with a developer handoff note',
        },
        {
          src: '/images/projects/orbit/orbit-component-library-pages.png',
          width: 1240,
          height: 895,
          alt: 'Orbit Figma file pages for buttons, icon buttons, and button groups, marked with dev-mode status',
        },
        {
          src: '/images/projects/orbit/orbit-component-library-overview.png',
          width: 1255,
          height: 227,
          alt: 'Orbit Figma file overview showing the full set of component pages, from text inputs through to feature-specific patterns like Give Kudos',
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
      alt: 'Orbit logo lockup shown across a tote bag, notebooks, and foil-stamped and embossed surfaces',
    },
    moodLabel: 'Logos',
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
    result:
      'Built and running in an internal environment, ahead of a full team rollout.',
    outcome: [
      'Research shapes structure: understanding how teams actually work, not how we assumed they worked, shaped the journey map and the final navigation, not just the copy.',
      'Consistency wins: it is easy for brand and system guidelines to drift apart once real screens get built. Keeping them tight kept the final product clear and usable end to end.',
      'Test, revise, repeat: iterating against real testing throughout, including AI-assisted testing of features before they shipped, caught major UX issues early, instead of after launch when they would have been expensive to fix.',
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
      alt: 'EHUB logo lockup shown across a cap, tote bags, printed cards, and studio and urban settings',
    },
    moodLabel: 'Logos',
    result:
      'Live in an internal environment, with rollout to clubs and organisers still ahead.',
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
    result:
      'The Find & Replace feature and the broader heuristic fixes shipped to production across the OpEx portfolio.',
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
    result:
      "Fully replaced Xenith's previous site. The team runs their business on it today.",
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
    result:
      'Design completed and handed off to development for build.',
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
    result:
      'Strong feedback from stakeholders so far, with a target of migrating more than 100 pages onto the new system.',
    outcome: [
      'This is ongoing: the business is partway through the migration, with a number of pages already moved onto the shared framework and the rest in progress.',
      'A UI designer being central to this kind of migration, not downstream of it, is what turns a technical re-platform into a product upgrade users actually feel, rather than just a swapped-out rendering engine.',
    ],
    hasContent: true,
    moreDetailNote: true,
  },
  neslo: {
    summary:
      'A ground-up brand and website for Neslo, an end-to-end product delivery consultancy, and for Edufy, its subsidiary training and placing the next generation of South African developers. Two brands in one family, built as a team.',
    myRole:
      'Part of the Neslo team across brand and web, from strategy through to the built sites.',
    reelVideo: {
      src: '/videos/projects/neslo/neslo-brand-reel.mp4',
      width: 1080,
      height: 1920,
      alt: 'A walkthrough of the Neslo brand system: iconography grid and system in use',
    },
    problem:
      "Neslo works in a market full of agencies that place developers by the seat. Its whole pitch is the opposite: embedded teams, senior leadership, long-term ownership, and accountability for the outcome rather than the timesheet. The brand and the site had to carry that difference straight away. And the identity could not be a one-off, because Edufy, the training and placement subsidiary, was coming next, aimed at a completely different audience.",
    goal:
      'A brand and site for Neslo that reads senior, restrained and delivery-focused, sitting on a system flexible enough for Edufy to feel like family without feeling like the same thing.',
    process: {
      intro:
        'This was a creative, collaborative project rather than a solo one: brand strategy first, then the identity, then the site, worked through together as a team in the studio. Once Neslo was settled, the same thinking extended to Edufy, whose audience (junior developers looking for a way into the industry, and the companies hiring them) called for a warmer, more energetic expression of the same underlying system.',
    },
    keyDecisions: [
      {
        title: 'Two brands, one family, deliberately different in temperature',
        description:
          'Neslo is almost entirely monochrome on an off-white ground, restraint doing the talking: the look of a firm senior enough not to shout. Edufy keeps the same structural DNA but turns the temperature up, leading with a single confident accent against the same neutral base, because its job is to feel like an opportunity rather than a procurement process. One system, two clearly different reads.',
      },
      {
        title: 'Built the site, not just the brand',
        description:
          'The engagement ran past the identity into a built, live website, so the brand was pressure-tested in a real product rather than a set of guidelines. Structuring it as a family from the start meant Edufy could be added as a subdomain later without unpicking the parent.',
      },
    ],
    styleGuide: [
      { label: 'Colour', detail: 'Neslo runs almost fully monochrome on an off-white ground, restraint as the signal of seniority. Edufy shares that neutral base but adds one confident accent, carrying the warmth its audience needs.' },
      { label: 'Tone of voice', detail: 'Neslo is plain and direct, with no sales gloss. Edufy is warmer and more encouraging, written for people still deciding whether a tech career is open to them at all.' },
    ],
    result:
      'Both sites are live: neslotech.co.za for the consultancy and edufy.neslotech.co.za for the subsidiary.',
    outcome: [
      'Designing a parent brand and a subsidiary together forces the system to be real. Making one brand look good is easy; making a second one clearly belong to it without copying it is where the actual system work happens.',
      'A restrained brand is harder than a loud one. With almost no colour to lean on, the work goes into type, spacing and pace, and every decision is more exposed because there is less to hide behind.',
      'Working as a team, in the room, made it better. Quick reactions to work in progress caught things early that a formal review cycle would have waved through.',
    ],
    hasContent: true,
    liveUrl: 'https://www.neslotech.co.za/',
  },
}
