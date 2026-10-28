# Jamie Godwin Portfolio — Master README

> Everything from the Claude Code working sessions on this project, consolidated so you (or a fresh Claude account) can pick up and keep shipping without any context loss.
> Written 2026-10-28 from the live repo state plus the full chat history. File lives at `/Users/jamiegodwin/Documents/PORTFOLIO-README.md` (outside the git repo on purpose — it's a personal handover doc, not site documentation).

---

## 0. Hit-the-ground-running checklist

```bash
cd /Users/jamiegodwin/Documents/documents/portfolio
npm install                 # if node_modules is missing
npm run dev                 # http://localhost:3000  (next dev --turbopack)
npx tsc --noEmit            # type-check  (also: npm run type-check)
npx next build              # full prod build + ESLint (needs internet — fetches Google Fonts)
git push                    # main -> GitHub -> Vercel auto-deploys to production
```

**Deploy loop (what we did every single time):**
1. Edit → `npx tsc --noEmit` → `npx next build` → commit → `git push`.
2. Poll production until the change is live (don't assume):
   ```bash
   for i in $(seq 1 20); do
     code=$(curl -sL -o /dev/null -w "%{http_code}" "https://www.jamiegodwin.co.za/<path>?cb=$i")
     [ "$code" = "200" ] && echo "LIVE" && break; sleep 15; done
   ```
   (Use a cache-busting `?cb=` query string. Deploys typically land within ~30–60 s.)
3. Verify desktop **and** mobile (375px) — see §9 for the overflow-check snippet.

**Gotcha you will hit:** running `next build` while the dev server is running corrupts the dev cache (`ENOENT … app-build-manifest.json`). Fix: stop dev server → `rm -rf .next` → start dev server again. Always `rm -rf .next` after a build.

---

## 1. Accounts, hosting & services

| Thing | Detail |
|---|---|
| Live site | https://www.jamiegodwin.co.za (apex `jamiegodwin.co.za` 308-redirects to `www`) |
| Repo | `git@github.com:JamieGodwin26/Jamie-portfolio-.git` (note the trailing hyphen in the repo name), branch `main` |
| Hosting | Vercel — auto-deploys on push to `main` |
| Contact form email | Resend (`resend` npm package). Sends from `onboarding@resend.dev` to `jamie@neslotech.co.za` (`CONTACT_EMAIL` in `src/lib/metadata.ts`), `replyTo` = visitor's email |
| Env vars | `NEXT_PUBLIC_SITE_URL` (defaults to `https://jamiegodwin.co.za` if unset), `RESEND_API_KEY` — both in `.env.local` locally (gitignored) and must be set in Vercel project settings. **I deliberately haven't copied any secret values here.** |
| CV | `public/jamie-godwin-cv.pdf` (replace the file in place to update; nav + About link to `/jamie-godwin-cv.pdf`) |
| Local path | `/Users/jamiegodwin/Documents/documents/portfolio` |

**If you transfer Claude accounts:** nothing above is tied to a Claude account. GitHub, Vercel and Resend are independent — only the *Claude-side* memory/transcript is lost (see §13).

---

## 2. Stack

Next.js 15 (App Router, Turbopack dev) · React 19 · TypeScript 5.7 · Tailwind CSS v4 (`@tailwindcss/postcss`, tokens in `@theme` inside `globals.css`) · framer-motion 11 · Lenis (desktop smooth scroll) · Resend · `clsx` + `tailwind-merge`.

Fonts via `next/font/google`: **Hanken Grotesk** (primary `--font-sans`, weights 300/400/500/700/800), **Montserrat** (`--font-display`), **JetBrains Mono** (`--font-mono`, labels/meta), **Work Sans** (only for Orbit's live style-guide preview). Orbit also loads Fontshare *Cabinet Grotesk* via a `<link>` in `layout.tsx` for the same preview. `next.config.ts`: AVIF/WebP image formats, `optimizePackageImports: ['framer-motion']`.

---

## 3. Site map

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | `Hero` → `About` → `FeaturedWork` (horizontal filmstrip) → `Process` |
| `/projects` | `src/app/projects/page.tsx` | **Typographic index only** (`ProjectManifest`): full case studies first, then a "More work" list of archived ones. No imagery by design. |
| `/<slug>` | `src/app/[slug]/page.tsx` | Case study; `generateStaticParams` from `projects.filter(linked)`. Renders `FullCaseStudy` or `ArchivedCaseStudy` by `depth`. |
| `/about`, `/contact` | `src/app/about`, `contact` | Contact form posts to `/api/contact` |
| `/api/contact` | `src/app/api/contact/route.ts` | Validates, honeypot field `company` (bots that fill it get a silent 200), sends via Resend |
| `/robots.txt`, `/sitemap.xml` | `robots.ts`, `sitemap.ts` | Sitemap = `/`, `/about`, every linked project slug (note: `/projects` and `/contact` aren't in it) |
| `/og.png` | `public/og.png` | Site-wide Open Graph image (see §11) |

App-wide client providers (`Providers.tsx`): `MotionConfig reducedMotion="user"`, `InitialLoader`, `SmoothScroll` (Lenis — **skipped on touch devices and reduced-motion**), `CustomCursor`. Light is default; dark mode toggles a `dark` class on `<html>` (persisted in `localStorage('theme')`, applied by a blocking script in `<head>` to avoid flash).

---

## 4. Source map

```
src/
  app/            layout.tsx · globals.css (tokens, dark mode) · page.tsx · [slug]/ · about/ · contact/ · projects/ · api/contact/ · robots.ts · sitemap.ts · not-found.tsx · icon.svg
  components/
    case-study/   FullCaseStudy.tsx (deep-dive template) · ArchivedCaseStudy.tsx (lighter "snapshot" template)
    layout/       Nav.tsx · Footer.tsx · Providers.tsx · SmoothScroll.tsx · InitialLoader.tsx
    motion/       FadeIn · HeroReveal · StaggerGroup · TiltReveal
    sections/     Hero · About · FeaturedWork · Process · ContactForm
    ui/           ProjectFilmstrip (homepage reel) · ProjectManifest (/projects index) · Button · Container · Tag · ThemeToggle · CustomCursor · AccordionItem · RotatingBadge · PlaceholderIcon/Image
  lib/            projects.ts (project list) · case-studies.ts (all written content + types) · metadata.ts (SEO/OG builder, CV_URL, CONTACT_EMAIL) · about.ts · process.ts · utils.ts
  types/index.ts  Project, ProjectScreen, ProcessStep, NavLink
public/
  images/projects/<slug>/…   per-project assets
  videos/projects/           neslo-brand-reel.mp4 · xenith-social-post.mp4
  og.png · jamie-godwin-cv.pdf
```

### Design tokens (from `globals.css`)
Light: surface `#f5efe3` · surface-raised `#ece3cf` · **surface-2 `#fbf8f0` (nav header)** · border `#e0d8c3` · ink `#16150f` · ink-secondary `#5c5643` · ink-faint/muted `#7c7460` · accent `#c1552f` · accent-text `#9b4324`.
Dark (`html.dark`): surface `#100f0b` · raised `#1a1811` · surface-2 `#221f16` · ink `#f1eada` · accent-text `#e28a5c`.
Per-project wash colours (`--color-wash-*`): cream `#f1ebdc`, sage `#e3e9dd`, khaki `#e9e6cc`, mustard `#f6e7c9`, terracotta `#f5ddce` (each has a dark variant).
Custom utilities: `text-label` (11px mono uppercase), `text-meta`, `text-display-hero`, `container-site`, `section-padding`. Radii: card 0.363rem, panel 0.625rem, pill 2.5rem.

---

## 5. How case studies work (the data model)

Two files drive everything:

- **`src/lib/projects.ts`** → `Project[]`: `id`, `slug`, `title`, `categories[]`, `year`, `thumbnail`, `thumbnailAlt`, `linked`, `featured`, `order`, `depth: 'full' | 'archived'`, `wash`, optional `confidential`, `screens`, `leadScreens`, `heroMockups`, `midMockups`.
- **`src/lib/case-studies.ts`** → `caseStudyContent[slug]: CaseStudyContent` — summary, myRole, problem, goal, process, userResearch, journeyMap, wireframes, validation, componentLibrary, keyDecisions, platformShowcase, styleGuide, colourPalette, typography, closingScreens, result, outcome, nextSteps, liveUrl, `hasContent`, etc. (Every field is optional except `summary`/`hasContent`; sections only render when present.)

### Rendering rules that bite (read before editing)

1. **`thumbnail` is only rendered by `ProjectFilmstrip`** (homepage "Selected work"), and the filmstrip only shows `featuredProjects` (`featured: true`, sorted by `order`) — i.e. all the full case studies (all are featured) but not the archived ones. Neslo and Edufy are `featured: false`, so their `thumbnail` field is currently *unused data* (`/projects` is text-only).
2. **`heroMockups` / `midMockups` must be exactly 3 images** (`[big, small, small]` / `[small, small, big]`). When `heroMockups` is set, `screens[0]` is **not** rendered at the top; `screens[0]`/`screens[1]` are the fallback hero/mid shots only when no mockup group exists.
3. The "Screens" abstract wash+icon placeholder renders **only** when a project has no `screens` **and** no `heroMockups`. (Bug fixed in commit `25f722f`.)
4. **`FullCaseStudy` section order:** hero visual → (leadScreens) → The problem → The goal → User research / insights → Journey map → Wireframes → Testing before building → Component library → mid visual → Key decisions → Desktop & mobile (`platformShowcase`) → Style guide (+ palette, typography, mood) → Screens/closing → Where it landed → What I learned → What's next → next-project chain. Sidebar is sticky on `md+`.
5. **`ArchivedCaseStudy`** ("Snapshot" badge): lead visual = `reelVideo` → else **`leadImage`** (added for Edufy) → else abstract placeholder. Then Approach (`process.intro`), problem, goal, key decisions (with optional `images`), style guide (+ `colourPalette`, `typography`), `closingScreens` (layout: 1 image = single, **3 = 2-up + wide**, anything else = 2-col grid), Where it landed (`result`), What I learned, What's next, optional "full write-up on request" note (`moreDetailNote`).
6. **`platformShowcase`** (CellMed): desktop+mobile pairs side by side, *intrinsic sizing, never cropped* — `w-full sm:w-[450px]` desktop + `w-full sm:w-[135px]` mobile, `h-auto`, `min-w-0` on the flex row. Do **not** reintroduce `object-cover`/fixed aspect boxes (they cropped sidebars — see §10).
7. Single-image `keyDecisions[].images` render at native aspect ratio; 2 images render as a 4:3 cropped grid.
8. `FadeIn` components start near-invisible — right after navigation a screenshot may show only a loading dot or washed-out content. Wait ~2 s.

---

## 6. Project-by-project status

Homepage/`/projects` order is by `order` within each tier. All are `linked: true`.

| # | Slug | Tier | Featured | Wash | Hero approach | Thumbnail (homepage card) | Notes |
|---|---|---|---|---|---|---|---|
| 1 | `fnb` | full | yes | mustard | `screens` (2) | `fnb-for-my-business-desktop.png` | **Confidential**. Only 2 real images exist; thumbnail = `screens[1]` (mid-page) — accepted distant reuse. |
| 2 | `ey-catalyst` | full | yes | mustard | none | `ey-catalyst.png` banner | **Confidential**, no screens/mockups. |
| 3 | `gbt` (Girls & Boys Town) | full | yes | terracotta | `screens[0]` = donor record, `midMockups` (prospects list, approval queue, dashboard) | `gbt-mockup-dashboard.jpg` | Fundraising CRM. Thumbnail changed off the hero image (was identical). Dashboard shot is also `midMockups[2]` — accepted distant reuse. Has component-library crops + prospect-wizard in key decisions. |
| 4 | `cellmed` | full | yes | sage | `heroMockups`: contributions iMac / dashboard laptop / menu-open phone | `cellmed-mockup-claims-laptop.jpg` | Most elaborate page: component library (buttons + selectors), 3 key decisions (claims laptop mockup in #1), 5-pair `platformShowcase`, `closingScreens` (profile laptop + dashboard phone), 4 outcomes, 3 next steps. |
| 5 | `orbit` | full | yes | sage | `heroMockups` (laptop, phone podium, phone) | `orbit.png` banner | Live style-guide preview uses Work Sans + Cabinet Grotesk. `screens[0]` duplicates `heroMockups[0]` but isn't rendered (dead data). |
| 6 | `eventhub` (EHUB) | full | yes | khaki | `heroMockups` | `ehub.png` banner | Same dead-`screens` situation as Orbit. |
| 7 | `xenith` | full | yes | terracotta | `screens` (homepage + services laptops) | `xenith.png` banner | Has `xenith-social-post.mp4` video + brand collateral images in the folder. |
| 8 | `pt-flash` | full | yes | cream | `leadScreens` (3 flat mobile screens) then `screens` | `pt-flash.png` banner | 2021 project, mobile-first parent/provider activity app. |
| 8 | `neslo` | **archived** | no | cream | `reelVideo` (`neslo-brand-reel.mp4`, 1080×1920) | `neslo-site-services-phones.jpg` (unused today) | Brand + site for Neslo and its subsidiary Edufy; "Head of Design at Neslo". Live: neslotech.co.za. |
| 9 | `edufy` | **archived** | no | terracotta | `leadImage` (two-laptop hero) | `edufy-site-home-split.jpg` (unused today) | Added this session. Live: edufy.neslotech.co.za (verified 200). |

Raw source-material folders sit in the repo root (see §12 — **these only exist on your Mac**).

---

## 7. Content & voice rules (non-negotiable — Jamie's standard)

- **Real content only.** Never invent metrics, client names, outcomes, quotes, or copy. Every claim must trace to: a client brief/PDF, a screenshot Jamie dropped in a folder, copy visible in those screenshots, or something Jamie told Claude in chat. When a brief and screenshots disagree in scope, stick to what's verifiable on screen.
- **Never state a URL as "live" without checking it** (`curl -s -o /dev/null -w "%{http_code}"`).
- **Pull colours from pixels, not by eye** (PIL `getpixel` on the real style-guide export) — see Edufy palette `#000000 / #eb5d3e / #ececec`.
- Voice: plain, first-person where describing the work ("I mapped every flow…"), third person for client/context framing. Honest, qualitative outcomes; no inflated numbers.
- **Avoid overused portfolio tropes.** Jamie rejected the numbered-list + cursor-follows-thumbnail pattern as "over used lately" and wants distinctive, not merely trendy, interaction patterns. When proposing UI, offer 2–4 genuinely different directions and flag well-known tropes up front. The homepage keeps the filmstrip; `/projects` is deliberately a separate, image-free typographic index. Don't collapse them into one component.
- Mobile is checked after **every** change, always.

---

## 8. Everything that was done (chronological)

### Earlier history (from git log, before the sessions this doc is most detailed on)
GBT case study built out (style guide folded into component library, "Testing before building" section, real mockups woven through, two-then-one mid mockup stack) → Neslo wired with real brand reel + mockups → archived tier restyled to match the full case-study shell → category tags broadened and content width unified → CellMed added (`4b8fa07`), moved to sit right after GBT in order (`43146c6`) → "Desktop & mobile" paired-device section added (`c8c4b8c`) → real component-library screenshots, then Claims/Benefits/Dashboard pairs wired in.

### This long session (what the transcript covers)

**A. CellMed polish (many rounds)**
- Wired Buttons/Selectors component-library crops, then Claims, Benefits, Dashboard pairs, then added My Policy and Dependents (verified by actually viewing each image, not by filename).
- **Cropping saga:** my first "same size" fix used fixed-ratio `object-cover` boxes → sidebars cut off. A second ratio tweak still cropped (user sent a screenshot: "elcome back"). Final fix abandoned cropping entirely (intrinsic width/height, no `fill`). Verified by DOM: `parentH == natH` for all 10 images.
- **Mobile overflow:** fixed-`450px` boxes forced the whole CSS-Grid layout to ~474px min-width on a 375px phone (117 overflowing elements). Fixed with `w-full sm:w-[…]` + `min-w-0`; re-verified `scrollWidth == viewport`, 0 offenders.
- Removed the "Screens" placeholder bug (template condition ignored `heroMockups`).
- Copy: ZWG→ZiG; "component library not complete" → complete; What's next rewritten with brief-grounded items (usability testing; push notifications + downloadable statements; wallet/payment integration) and no components/style-guide talk; new "What I learned" bullet on being sole client contact + testing earlier.
- Hero mockup repetition (Dashboard shown twice) fixed by swapping phone shots between hero and closing groups. Commits `ab64b93` etc.

**B. Homepage thumbnail changes + duplication audit**
- CellMed thumbnail was identical to a hero image → swapped to Claims (`1587081`).
- Audited every project with a script (see §9): GBT thumbnail **was literally the hero image** → fixed; Neslo thumbnail duplicated a key-decision image → fixed (but unused in UI). Orbit/EventHub duplicates are dead data. FNB and CellMed remain as accepted "distant" reuses because no spare real assets exist. (Commit `d19abd3`.)

**C. Mobile nav "gap above the bar while scrolling" (recurring complaint)**
- Prior sessions had already: switched header `sticky`→`fixed` and disabled Lenis on touch devices.
- Root cause found this time: header is `bg-surface-2 (#fbf8f0)` but page/`html` background is `bg-surface (#f5efe3)` — on iOS elastic overscroll/toolbar collapse a sliver of page background shows above the header and reads as a gap.
- Fix in `Nav.tsx`: hidden `<div aria-hidden className="absolute inset-x-0 bottom-full h-64 bg-surface-2" />` bleeding the header colour upward.
- **Not yet confirmed on a real iPhone** (the in-app browser is Chromium). If it still happens, next candidates: make `html`/`body` background equal `surface-2`, or `overscroll-behavior-y: none` on `html`.

**D. Edufy — new archived case study (`f42fe0e`)**
- Source: folder `eduft/` (Jamie's typo) with 5 Figma exports + a pasted brief table (client Neslo Tech, EdTech/SaaS, services, process, outcome).
- Processed 4 images → JPEG in `public/images/projects/edufy/` (`hero-laptops`, `site-flow-laptop`, `site-home-split`, `training-models-mobile`); `Styles.png` (raw style sheet) mined for colours/typography facts but **not** published.
- Added optional `leadImage` to `CaseStudyContent` + a branch in `ArchivedCaseStudy` so stills can lead an archived page when there's no video.
- Content: two-track model (Internal Training-to-Consulting 6-month + 2-year contract; "Resource" model), six-step numbered site structure as navigation, style guide (shares Neslo's neutral base but uses the coral accent in-product), palette swatches, 2 outcomes.

**E. Full re-check sweeps**
- Desktop + mobile re-verified: Neslo, CellMed, Edufy; mobile-verified every other case study (GBT, Orbit, EventHub, EY Catalyst, Xenith, PT Flash, FNB) — **0 horizontal overflow anywhere**.

**F. Open Graph 404 (`bfde830`)** — see §11.

**G. Misc**: attempted raw session export (too large — 230 MB vs a 200 MB cap), so a recap file was written instead; this README supersedes it.

### Commit log (newest first, from `git log`)
```
bfde830 Add missing og:image, fixing 404 on link previews site-wide
f42fe0e Add Edufy as a new archived case study
d19abd3 Fix nav overscroll gap on mobile; dedupe GBT and Neslo thumbnails
1587081 CellMed: swap homepage thumbnail off the shared Dashboard shot
ab64b93 CellMed: fix duplicate screen in hero mockups, add a client-process reflection
d65e9a1 CellMed: drop components/style guide from What's next
6d738e2 CellMed: component library is complete, update copy to match
25f722f Fix mobile overflow on Desktop & mobile pairs; drop the Screens placeholder
cc2f7f4 CellMed: stop cropping screens entirely, use fixed width instead
9816560 CellMed: stop cropping sidebars on Claims and Benefits
f4506eb CellMed: vary the mockup layout instead of repeating it
1710a62 CellMed: uniform-size screen pairs, two more flows
ee1423c CellMed: separate real screens from styled mockups
629e136 Trigger redeploy
cf0b882 CellMed: add Dashboard as a third desktop/mobile pair
aa1a983 CellMed: wire in the real Claims and Benefits desktop/mobile pairs
f52c594 CellMed: wire in the real component library screenshots
43146c6 Move CellMed to right after GBT in project order
c8c4b8c Add a "Desktop & mobile" section for paired device screens
99d95be Fix mismatched heights in paired key-decision images
77bf326 Archived tier: match the full case-study layout shell
8b42374 Neslo: widen the brand reel to match the content column
54f7f86 Neslo: wire in real mockups from the team's export
64eb41f Broaden category tags; align case-study content to one consistent width
4b8fa07 Add CellMed case study (full tier)
b292d29 Neslo: wire in the real brand reel
… (older GBT / initial-site commits below)
```
Commit message convention: short imperative subject + a "why" paragraph, ending with the `Co-Authored-By: Claude …` trailer (the trailer name tracks whichever model made the commit — Sonnet 5 earlier, Sonnet 5.5 now).

---

## 9. Recipes & scripts

### Add a new archived case study (what Edufy did)
1. Put raw exports in a folder in the repo root; **view every image** (Read tool / Preview) and note real on-screen copy.
2. Flatten/convert to web assets:
   ```python
   from PIL import Image
   im = Image.open('src.png').convert('RGBA')
   bg = Image.new('RGB', im.size, (255,255,255)); bg.paste(im, mask=im.getchannel('A'))
   bg.save('public/images/projects/<slug>/<slug>-<descriptor>.jpg', 'JPEG', quality=92)
   ```
   (PIL is installed; `numpy` is **not**. `sips` also works: `sips -s format jpeg -s formatOptions 85 -Z 2200 in.png --out out.jpg`.)
3. Add the entry to `projects.ts` (`depth: 'archived'`, `featured: false`, unique `order`) and the content object to `case-studies.ts` (key = slug). Use exact pixel `width`/`height` for each image.
4. Check the image allocation has **no repeats** (script below), then tsc → build → commit → push → poll live → mobile check.

### Duplicate-image audit (finds any file used twice within a project)
```python
import re
from collections import defaultdict
text = ''.join(open(f).read() for f in ['src/lib/projects.ts','src/lib/case-studies.ts'])
byproj = defaultdict(list)
for s in re.findall(r"(?:src|thumbnail):\s*'(/images/projects/[^']+)'", text):
    byproj[s.split('/')[3]].append(s)
for p, l in byproj.items():
    d = {x for x in l if l.count(x) > 1}
    if d: print(p, d)
```
Expected output today (all understood/accepted): gbt dashboard, orbit dashboard-laptop, eventhub mobile-entry-list, fnb desktop, cellmed claims-laptop.

### Sample real colours from a design export
```python
from PIL import Image
im = Image.open('Styles.png').convert('RGB'); print('#%02x%02x%02x' % im.getpixel((x, y)))
```

### Mobile overflow check (run in the browser pane at 375×812)
```js
const vw = innerWidth;
JSON.stringify({scrollW: document.documentElement.scrollWidth, vw,
  offenders: [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > vw + 1).length})
```
Pass = `scrollW === vw` and 0 offenders. (On `/` the filmstrip legitimately has off-screen cards inside its own scroller — judge by `scrollW`.)

### Tooling quirks (Claude Code Browser pane)
- Pane must be **fronted/visible** or `innerWidth` reads 0 and images never load (`tabs_select`).
- Screenshots can come back blank or show a ghost duplicate of the header after scrolling — it's a capture artifact. Trust `read_page`/`get_page_text`/DOM queries; nudge-scroll down 1 and up 1 then re-shoot if you need pixels.
- Video elements may not composite in screenshots; check `video.currentTime/readyState` instead.
- `resize_window` mobile preset = 375×812 with an Android Chrome UA; reset with the `desktop` preset when done.
- Dev-server launch name is `portfolio-dev` (defined in `/Users/jamiegodwin/Documents/.claude/launch.json`, cwd = the repo). The repo also has its own `.claude/launch.json` with a `portfolio` config.

---

## 10. Hard-won lessons (don't repeat these)

1. **`object-fit: cover` crops by direction** — a box *narrower* than the image's ratio crops the sides. Reasoning about ratios got this wrong twice in one session. For anything that mustn't lose content, use intrinsic `width`/`height` + `h-auto w-full`.
2. A fixed-pixel-width descendant inside a CSS Grid forces the grid item's min-content → page-wide horizontal overflow on phones. Use `w-full sm:w-[Npx]` + `min-w-0`.
3. **Swapping a thumbnail to "another real image" just moves a duplicate** if that image is also used in the case study. Check with the audit script, and know when assets are finite (CellMed has exactly 6 styled mockups; FNB has 2 images total).
4. Template conditions must mirror each other: the Screens-placeholder check ignored `heroMockups`, so a project with real mockups still showed the placeholder.
5. Confirm a field is actually *rendered* before "fixing" it (Neslo's thumbnail change fixed an invisible duplicate; Orbit/EventHub `screens` are dead data).
6. Don't trust that a metadata file exists because the code references it (`/og.png` was referenced since day one but never committed).
7. Overscroll/URL-bar glitches on iOS: first suspect a **background-colour mismatch** between the fixed element and the page behind it.
8. Never claim a mobile-only/WebKit-only fix is verified when testing in Chromium — say so (as done in §8C).

---

## 11. Open Graph image (what was wrong, what's there now)

- `src/lib/metadata.ts` sets `siteMetadata.ogImage = ${BASE_URL}/og.png` (1200×630) for **every** route via `buildMetadata()`; no page overrides `openGraph.images`/`twitter.images`, and no `opengraph-image.*` convention file exists.
- `public/og.png` **never existed** → 404 on both domains (not a casing problem).
- Fix: generated a real 1200×630 card reproducing the homepage hero (Hanken Grotesk 300 "Creative" + 800 uppercase "PRODUCT DESIGNER", tagline, small "J" mark, `#f5efe3` background, ink `#16150f`) with PIL using the locally installed font `~/Library/Fonts/HankenGrotesk-VariableFont_wght.ttf` (set the weight axis via `set_variation_by_axes([weight])`). Verified 200 + `image/png` + 28,867 bytes on `www`; meta tags verified on home and a case-study page; checked under a mobile UA.
- **Not done (optional enhancement):** per-project unique OG images. Today every page shares the one card. If wanted: add `openGraph.images` override in `[slug]/page.tsx`'s `generateMetadata` or use `app/[slug]/opengraph-image.tsx` (`next/og` `ImageResponse`) pulling each project's thumbnail/title.
- Social platforms cache previews hard — use LinkedIn Post Inspector / Facebook Sharing Debugger to force a re-scrape after the fix.

---

## 12. Known issues & open items

**Open / worth doing**
- [ ] **Back up the raw asset folders.** Untracked, not gitignored, exist only on this Mac: `cell med/`, `Neslo/`, `eduft/`, `girls and boys town/`, plus stray `image.png` and `Jamie 1 2 2.png`. (Older ones — `Orbit/ eventhub/ xenith/ PT Flash/ FNB project/ projects/` — are in `.gitignore` but equally local-only.) Source PDFs/briefs aren't in the repo either. Consider a cloud/external-drive copy, and decide whether to `.gitignore` the untracked ones to stop them showing in `git status`.
- [ ] **Verify the nav-gap fix on a real iPhone** (Safari + Chrome iOS). Fallbacks listed in §8C.
- [ ] Per-project OG images (optional, §11). Also consider adding `/projects` and `/contact` to `sitemap.ts`.
- [ ] `ProjectFilmstrip` fallback to `screens[0]` is dead code (all projects set `thumbnail`) — harmless.
- [ ] Remove dead data if tidying: `screens` on Orbit/EventHub (never rendered because `heroMockups` wins); Neslo/Edufy `thumbnail` (unused).
- [ ] ESLint warnings in `src/components/ui/Button.tsx` (`'_as' is assigned a value but never used`) — pre-existing, non-blocking.
- [ ] The theme toggle appears twice in the DOM (desktop + mobile instances, one hidden by CSS) — expected, but accessibility tree lists two buttons.
- [ ] `next build` occasionally fails with transient Google Fonts fetch errors — just retry.

**Accepted trade-offs (decided, not bugs)**
- Homepage thumbnails for GBT (dashboard), FNB (desktop shot) and CellMed (Claims laptop) reuse an image that also appears deeper in their own case study, because there's no spare real asset and the repeat is far from the thumbnail's context.
- FNB/EY Catalyst are confidential — minimal imagery by design.

**Stale notes you may meet in Claude's old memory** (they were corrected this session — don't trust them): memory claimed `/projects` uses `ProjectSplitIndex.tsx` (split-screen live preview). That component no longer exists; `/projects` now uses the typographic `ProjectManifest.tsx`. Working dir in those notes (`…/Documents/portfolio`) is also out of date — it's `…/Documents/documents/portfolio`.

---

## 13. Transferring to a new Claude account — what carries over and what doesn't

| Carries over | Does NOT carry over |
|---|---|
| The whole repo (GitHub), Vercel project, Resend, domain, `.env.local` | This chat's transcript (230 MB — over the 200 MB export cap, so no automatic export) |
| This file | Claude's auto-memory (`~/.claude/projects/-Users-jamiegodwin-Documents/memory/…`) — it's per-machine/per-account |
| `.claude/launch.json` in the repo (dev-server definition) | Any account-level connectors/MCP auth (Figma, Vercel plugins need re-authorizing via `/mcp`) |

**Kickoff prompt to paste into the new account's first message:**

> Read `/Users/jamiegodwin/Documents/PORTFOLIO-README.md` fully before doing anything. It's the handover for my portfolio (`/Users/jamiegodwin/Documents/documents/portfolio`, Next.js 15 → Vercel). Follow its content rules (real content only, verify live with curl, tsc + next build before every commit, mobile check after every change, commit trailer with the current model name). Raw design folders in the repo root are source material only. Then tell me you've understood the open items in §12 and ask what we're working on.

**Optionally re-seed memory** by telling the new Claude: *"Remember: (1) I want distinctive, non-trendy portfolio patterns — flag known tropes and offer 2–4 directions; (2) homepage uses the filmstrip, /projects is an image-free typographic index — don't merge them; (3) real content only, never invent metrics; (4) always verify live + mobile."*

---

## 14. Quick reference — "where do I change X?"

| I want to… | Edit |
|---|---|
| Add/reorder a project, change its thumbnail/hero images/tier | `src/lib/projects.ts` |
| Change any case-study text or add sections/images | `src/lib/case-studies.ts` |
| Change how a section renders | `src/components/case-study/FullCaseStudy.tsx` / `ArchivedCaseStudy.tsx` |
| Change the nav | `src/components/layout/Nav.tsx` |
| Colours, fonts, spacing, dark mode | `src/app/globals.css`, `src/app/layout.tsx` |
| Site title/description/OG image/CV path/contact email | `src/lib/metadata.ts` |
| Homepage sections | `src/components/sections/*`, `src/app/page.tsx`, `src/lib/about.ts`, `src/lib/process.ts` |
| The contact form behaviour | `src/components/sections/ContactForm.tsx`, `src/app/api/contact/route.ts` |
| The CV | replace `public/jamie-godwin-cv.pdf` |
| The social-share card | regenerate `public/og.png` (1200×630) |
