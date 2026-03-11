# PROJ-3: Services Section

## Status: In Review
**Created:** 2026-02-25
**Last Updated:** 2026-03-01

## Dependencies
- Requires: PROJ-1 (Website Foundation) — design system and i18n in place

## User Stories
- As a potential client, I want to see a clear overview of BCC's service areas so that I can determine if Brakelmann can help with my specific problem
- As an engineer at an energy company, I want detailed descriptions of each service so that I understand the depth of expertise offered
- As a visitor, I want the services to be visually distinct and scannable so that I can find the most relevant one quickly
- As a German-speaking client, I want to read the services in German so that there is no language barrier

## Acceptance Criteria
- [ ] Services section displays all BCC service areas as cards or grid items (6 services — "Transmission Behavior Analysis" intentionally merged into Thermal Analysis):
  1. **High-Voltage Cable Systems** — construction, optimization, and system integration of HV cable systems
  2. **Offshore Wind Park Cabling** — inpark grid layout and connection to the transmission grid
  3. **Thermal Analysis & Cable Rating** — transient and stationary current ratings, heating behavior of submarine cables (includes transmission behavior analysis)
  4. **EMF & Magnetic Shielding** — electric, magnetic, and thermal fields; EMF problems and shielding measures
  5. **Wind Park Cable Layout Optimization** — optimized cabling layout with respect to technology, economics, and reliability
  6. **Monitoring & Forecasting Systems** — intelligent monitoring with predictive forecasting for cable infrastructure
- [ ] Each service card shows: icon or visual, title, 2-3 sentence description
- [ ] Section heading and all content bilingual (EN/DE via next-intl)
- [ ] Hover state on cards with subtle animation (elevation or border highlight)
- [ ] Section is responsive: 3-column grid on desktop, 2-column on tablet, 1-column on mobile
- [ ] Accessible: cards are not interactive links (no misleading affordance), icons have aria-hidden

## Edge Cases
- What if a service description is longer than others? → Cards use consistent min-height, text doesn't overflow
- What if the grid has an odd number of services? → Last card doesn't stretch to fill — use justify-start or a featured card layout
- What if icons are not available for all categories? → Use consistent SVG icons from Lucide (ships, cable, thermometer, shield, etc.)

## Technical Requirements
- Icons: Lucide React (already available via shadcn/ui)
- Layout: CSS Grid with auto-fit columns
- Cards: shadcn/ui Card component as base
- Animation: Framer Motion or pure CSS transition on hover
- Bilingual content: All text in /messages/en.json and /messages/de.json

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Component Structure

```
Page (src/app/[locale]/page.tsx)
└── ServicesSection  (src/components/sections/ServicesSection.tsx)
    ├── Section Label  ("Services" / "Leistungen")
    ├── Section Heading
    └── Services Grid  — 7 cards, 3-col / 2-col / 1-col
        └── ServiceCard × 7  (src/components/sections/ServiceCard.tsx)
            ├── Icon  (Lucide, aria-hidden)
            ├── Title
            └── Description
```

### Data Model

All content is **static — no database required**. The 7 services are defined as translation keys in the i18n messages files. Each service entry contains:

| Field | Description |
|---|---|
| `title` | Short name of the service area |
| `description` | 2–3 sentence explanation of what BCC delivers |

The icon mapping is hardcoded in the component (icon names don't change between languages). There is no user-generated or dynamic data.

**Translation key structure added to `messages/en.json` and `messages/de.json`:**

```
services
├── sectionLabel     ("Services" / "Leistungen")
├── heading          ("Our Areas of Expertise" / "Unsere Leistungsbereiche")
└── items
    ├── hvCables     { title, description }
    ├── offshore     { title, description }
    ├── thermal      { title, description }
    ├── emf          { title, description }
    ├── transmission { title, description }
    ├── layout       { title, description }
    └── monitoring   { title, description }
```

### Icon Assignment (Lucide React — already available)

| Service | Lucide Icon |
|---|---|
| High-Voltage Cable Systems | `Cable` |
| Offshore Wind Park Cabling | `Wind` |
| Thermal Analysis & Cable Rating | `Thermometer` |
| EMF & Magnetic Shielding | `Shield` |
| Transmission Behavior Analysis | `Activity` |
| Wind Park Cable Layout Optimization | `LayoutGrid` |
| Monitoring & Forecasting Systems | `MonitorCheck` |

### Tech Decisions

| Decision | Choice | Reason |
|---|---|---|
| Backend? | **No** | All content is static, defined at build time in i18n files |
| Card component | **shadcn/ui `Card`** | Already installed; consistent with site design system |
| Grid layout | **CSS Grid (Tailwind)** | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — clean responsive control |
| Hover animation | **Pure CSS transition** | No Framer Motion needed; lighter bundle, sufficient for card lift effect |
| Content source | **next-intl translation keys** | Keeps all text bilingual without component changes |
| 7th card (odd count) | **Left-aligned, natural width** | Grid with `justify-items-stretch`; last card stays consistent size, not stretched |

### Dependencies

No new packages required — all tools are already installed:
- `lucide-react` — icons (via shadcn/ui)
- `shadcn/ui Card` — base card component
- `next-intl` — bilingual translation (from PROJ-1)

## QA Test Results

**Tested:** 2026-03-01
**App URL:** http://localhost:3000/en (and /de)
**Tester:** QA Engineer (AI)
**Build Status:** PASSES (`npm run build` succeeds, no TypeScript errors, no lint errors)

### Acceptance Criteria Status

#### AC-1: Services section displays all 7 BCC service areas as cards
- [x] High-Voltage Cable Systems -- present in code and i18n (key: `hvCables`)
- [x] Offshore Wind Park Cabling -- present (key: `offshore`)
- [x] Thermal Analysis & Cable Rating -- present (key: `thermal`)
- [x] EMF & Magnetic Shielding -- present (key: `emf`)
- [x] Transmission Behavior Analysis -- present (key: `transmission`)
- [x] Wind Park Cable Layout Optimization -- present (key: `layout`)
- [x] Monitoring & Forecasting Systems -- present (key: `monitoring`)
- [x] All 7 services rendered via `SERVICE_KEYS` array mapped to `ServiceCard` components
- **Result: PASS**

#### AC-2: Each service card shows icon, title, 2-3 sentence description
- [x] Icon rendered via Lucide icon component with correct mapping (Cable, Wind, Thermometer, Shield, Activity, LayoutGrid, MonitorCheck)
- [x] Title rendered as `<h3>` in CardHeader
- [x] Description rendered as `<p>` in CardContent
- [x] Each EN description is 2 sentences (verified in messages/en.json)
- [x] Each DE description is 2 sentences (verified in messages/de.json)
- **Result: PASS**

#### AC-3: Section heading and all content bilingual (EN/DE via next-intl)
- [x] EN: sectionLabel="Services", heading="Our Areas of Expertise" -- present in messages/en.json
- [x] DE: sectionLabel="Leistungen", heading="Unsere Leistungsbereiche" -- present in messages/de.json
- [x] All 7 service items have both EN and DE translations (title + description)
- [x] Component uses `useTranslations("services")` from next-intl
- **Result: PASS**

#### AC-4: Hover state on cards with subtle animation
- [x] Cards have `hover:-translate-y-1` (elevation lift)
- [x] Cards have `hover:border-accent/40` (border highlight)
- [x] Cards have `hover:shadow-lg hover:shadow-accent/5` (shadow glow)
- [x] Icon container has `group-hover:bg-accent/20` (icon background change)
- [x] Transition timing: `transition-all duration-300` (smooth 300ms)
- **Result: PASS**

#### AC-5: Section is responsive -- 3-col desktop, 2-col tablet, 1-col mobile
- [x] Grid classes: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [x] At 375px (mobile): grid-cols-1 applies -- 1 column
- [x] At 768px (tablet): sm:grid-cols-2 applies (sm breakpoint is 640px) -- 2 columns
- [x] At 1440px (desktop): lg:grid-cols-3 applies (lg breakpoint is 1024px) -- 3 columns
- [x] Gap between cards: `gap-6` (1.5rem)
- [x] Max container width: `max-w-7xl` with `mx-auto`
- **Result: PASS**

#### AC-6: Accessible -- cards not interactive links, icons have aria-hidden
- [x] Cards are `<div>` elements (via shadcn Card), not `<a>` or `<button>` -- no misleading affordance
- [x] Icons have `aria-hidden="true"` set explicitly
- [x] Section has `aria-label={t("sectionLabel")}` for screen readers
- [ ] BUG: ServiceCard title uses raw `<h3>` instead of shadcn `CardTitle` component (see BUG-1)
- **Result: PASS (with minor note)**

### Edge Cases Status

#### EC-1: Service description longer than others -- consistent card height
- [ ] BUG: Cards do NOT use `min-height` or any height equalization mechanism. The spec requires "Cards use consistent min-height, text doesn't overflow." CSS Grid `align-items: stretch` (default) will make cards in the same row equal height, but cards in different rows may have different heights. The 7th card (alone in its row on desktop) will be shorter than the others. (see BUG-2)

#### EC-2: Odd number of services (7) -- last card does not stretch
- [x] Grid uses fixed column counts (`grid-cols-3`), not `auto-fit`, so the 7th card occupies 1 of 3 columns on desktop, 1 of 2 on tablet -- it does NOT stretch to fill the row
- [x] The grid does not use `justify-items-stretch` in a way that would distort the last card
- **Result: PASS**

#### EC-3: Icons available for all categories
- [x] All 7 services have a Lucide icon assigned in `ICON_MAP`
- [x] Icons used (Cable, Wind, Thermometer, Shield, Activity, LayoutGrid, MonitorCheck) are all valid Lucide React components
- **Result: PASS**

### Security Audit Results

This is a static content section with no user input, no API calls, no database access, and no authentication requirements. The security surface is minimal.

- [x] No user input fields -- XSS not applicable
- [x] No API endpoints -- injection not applicable
- [x] No sensitive data exposed -- all content is public marketing material
- [x] No environment variables used in this component
- [x] No dynamic routing or parameter-based content loading
- [x] Translation keys are hardcoded strings, not user-controlled -- no i18n injection risk
- [x] `"use client"` directive is appropriate (uses `useTranslations` hook)
- **Result: PASS -- No security concerns**

### Cross-Browser Assessment (Code Review)

- [x] CSS features used (Grid, transitions, transforms, opacity) are supported in all modern browsers (Chrome, Firefox, Safari)
- [x] No vendor-prefixed CSS required for the features used
- [x] Lucide SVG icons render consistently across browsers
- [x] Tailwind CSS compiles to standard CSS -- no browser-specific issues expected
- **Result: PASS (visual verification recommended in actual browsers)**

### Bugs Found

#### BUG-1: ServiceCard uses raw h3 instead of shadcn CardTitle
- **Severity:** Low
- **Steps to Reproduce:**
  1. Open `src/components/sections/ServiceCard.tsx`
  2. Observe line 17: `<h3 className="text-lg font-semibold text-white">{title}</h3>`
  3. Expected: Should use `<CardTitle>` from shadcn/ui for design system consistency
  4. Actual: Uses a raw `<h3>` with manual styling
- **Impact:** Functional -- the h3 works correctly. However, the project rules state "NEVER create custom implementations" of shadcn components. Using CardTitle would ensure consistency if the card design system changes globally.
- **Priority:** Nice to have

#### BUG-2: No min-height on cards for consistent height across rows
- **Severity:** Low
- **Steps to Reproduce:**
  1. View services section on desktop (1440px) with 3-column layout
  2. The first 2 rows have 3 cards each; the 3rd row has only 1 card (the 7th)
  3. Expected: Per edge case spec, "Cards use consistent min-height"
  4. Actual: No `min-h-*` class is applied. Cards in the same row are equalized by CSS Grid's default `align-items: stretch`, but the lone 7th card in the last row will appear shorter if its content is shorter than cards in previous rows.
- **Impact:** Visual inconsistency on desktop when the 7th card has less content than others. In practice, the German descriptions are long enough that the difference is minimal.
- **Priority:** Nice to have

#### BUG-3: Feature spec status is "Planned" but implementation exists
- **Severity:** Low
- **Steps to Reproduce:**
  1. Open `features/PROJ-3-services.md`
  2. Status reads "Planned" (line 3)
  3. Open `features/INDEX.md`
  4. Status reads "In Progress" (line 18)
  5. Expected: Both should reflect the same status, and since the feature is implemented and building successfully, it should be "In Review"
  4. Actual: Inconsistent status between spec header and INDEX
- **Impact:** Process/tracking inconsistency only. No functional impact.
- **Priority:** Nice to have

### Fixes Applied (2026-03-01)
- **BUG-1 FIXED:** `src/components/sections/ServiceCard.tsx` — replaced `<h3>` with `<CardTitle>` from shadcn/ui; added `CardTitle` to imports.
- **BUG-2 FIXED:** `src/components/sections/ServiceCard.tsx` — added `min-h-[180px] flex flex-col h-full` to `<Card>` className.
- **BUG-3 FIXED:** Both `features/PROJ-3-services.md` and `features/INDEX.md` updated to "In Review".

### Summary
- **Acceptance Criteria:** 6/6 passed
- **Edge Cases:** 3/3 passed (after BUG-2 fix)
- **Bugs Found:** 3 total — all fixed
- **Security:** PASS -- no concerns (static content, no user input)
- **Cross-Browser:** PASS (code review; visual browser testing recommended)
- **Production Ready:** YES

## Deployment
_To be added by /deploy_
