# PROJ-4: Projects & Portfolio Section

## Status: In Review
**Created:** 2026-02-25
**Last Updated:** 2026-02-25

## Dependencies
- Requires: PROJ-1 (Website Foundation) — design system and i18n in place

## User Stories
- As a potential client, I want to see the scope and scale of BCC's project history so that I am confident in the track record
- As an engineer, I want to understand which types of projects BCC has delivered so that I can assess relevance to my own project
- As a visitor, I want to see key project highlights so that I understand what "110+ projects" actually means in practice
- As a German speaker, I want to read project descriptions in German so that I understand the details fully

## Acceptance Criteria
- [ ] Statistics bar displays prominently at the top of the section:
  - "110+ Projects Completed" / "110+ Projekte abgeschlossen"
  - "40+ Offshore Wind Farm Projects" / "40+ Offshore-Windpark-Projekte"
  - "70+ Onshore Projects" / "70+ Onshore-Projekte"
  - "50+ Years of Expertise" / "50+ Jahre Expertise"
- [ ] At least 4 representative project highlight cards covering:
  - Offshore inpark grid layout for a major wind farm
  - Onshore HV cable system integration
  - Submarine cable thermal analysis
  - Magnetic shielding implementation
- [ ] Each project card shows: project type badge, title, short description (2-3 sentences), key technology used
- [ ] Filter tabs or toggle: "All / Offshore / Onshore" to filter visible cards
- [ ] Section heading and all content bilingual (EN/DE via next-intl)
- [ ] Section is responsive: 2-column grid on desktop, 1-column on mobile
- [ ] Note displayed: "Project details available upon request / Projektdetails auf Anfrage" (client confidentiality)

## Edge Cases
- What if filter results in 0 cards? → Show "No projects in this category" message (shouldn't happen with current data, but defensive)
- What if project card descriptions differ greatly in length? → Cards use consistent height with text truncation + "read more" if needed
- What if real project names are confidential? → Use descriptive generic names like "North Sea Offshore Wind Park, 2019" without client names

## Technical Requirements
- Filter state: React useState (no URL state needed for this level of complexity)
- Project images: Free-license offshore/onshore cable images from Unsplash/Pexels
  - Candidate images: search "offshore wind cable", "high voltage cable installation", "underground cable"
- Statistics: Same animated counter component as PROJ-2 (reuse)
- Cards: shadcn/ui Card + Badge components
- Bilingual: All text in /messages/en.json and /messages/de.json

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Component Structure

```
ProjectsSection  (src/components/sections/ProjectsSection.tsx)
+-- SectionHeading                        [shared — exists]
+-- Stats Bar (dark background band)
|   +-- StatCounter "110+"  "Projects Completed"  [shared — exists]
|   +-- StatCounter "40+"   "Offshore Wind Farms"  [shared — exists]
|   +-- StatCounter "70+"   "Onshore Projects"     [shared — exists]
|   +-- StatCounter "50+"   "Years of Expertise"   [shared — exists]
+-- Filter Tabs                           [shadcn/ui Tabs — installed]
|   +-- Tab "All"
|   +-- Tab "Offshore"
|   +-- Tab "Onshore"
+-- Project Cards Grid (2-col desktop / 1-col mobile)
|   +-- ProjectCard x4   (src/components/sections/ProjectCard.tsx)
|       +-- next/image   (project photo, lazy-loaded)
|       +-- Badge        [shadcn/ui Badge — installed]  "Offshore" | "Onshore"
|       +-- Card / CardHeader / CardContent  [shadcn/ui — installed]
|           - Project title
|           - Short description (2–3 sentences)
|           - Key technology chip / tag
+-- Empty State (conditional, "No projects in this category")
+-- Confidentiality Note
    "Project details available upon request /
     Projektdetails auf Anfrage"
```

### Data Model

Four static project highlights — no database required. Stored entirely in the i18n message files:

```
Each project entry contains:
  key          — unique identifier (e.g. "northSeaOffshore")
  category     — "offshore" | "onshore"
  title        — bilingual, generic name (no client names)
  description  — 2–3 bilingual sentences
  tech         — key technology label (bilingual)
  image        — Unsplash/Pexels free-license URL, hardcoded in component
```

The four representative projects:
1. **Offshore inpark grid layout** — North Sea wind farm (Offshore)
2. **Onshore HV cable system integration** — inland transmission corridor (Onshore)
3. **Submarine cable thermal analysis** — deepwater export cable study (Offshore)
4. **Magnetic shielding implementation** — urban underground cable route (Onshore)

Stored in: `messages/en.json` and `messages/de.json` under a `projects` namespace.
Image URLs: hardcoded constant array in `ProjectsSection.tsx` (not sensitive, not translatable).

### Filter Logic

`ProjectsSection` holds a single React `useState`: `activeFilter: "all" | "offshore" | "onshore"`.
The project list is filtered at render time using the `category` field — no URL state, no API call, no additional package.

### Stats Bar

Reuses the existing `StatCounter` shared component (scroll-triggered animated counter with easeOutCubic).
Values: 110 (suffix "+"), 40 (suffix "+"), 70 (suffix "+"), 50 (suffix "+").
Labels from the existing `stats` namespace in the i18n files — no new translation keys needed here.

### Tech Decisions

| Decision | Choice | Reason |
|---|---|---|
| Content source | i18n JSON (no DB) | 4 static items — no dynamic data, no CMS needed |
| Filter state | React `useState` | Simple exclusive toggle; URL state would be overkill |
| Filter UI | shadcn/ui `Tabs` | Already installed; semantically correct for exclusive choice |
| Images | `next/image` + Unsplash URLs | Automatic optimization, lazy loading, responsive sizing |
| Stats | Reuse `StatCounter` | Avoids duplication; consistent animation across sections |
| Cards | shadcn/ui `Card` + `Badge` | Both already installed; no custom components needed |

### Dependencies

No new packages required. All needed components are already installed:
- `shadcn/ui`: Card, CardHeader, CardContent, Badge, Tabs, TabsList, TabsTrigger, TabsContent
- `next/image`: built into Next.js
- `next-intl`: already configured

## QA Test Results

**Tested by:** QA Engineer (Claude)
**Date:** 2026-03-02
**Build status:** PASS (Next.js 16.1.1 Turbopack, clean compile)

### Acceptance Criteria Results

| # | Criterion | Result | Notes |
|---|-----------|--------|-------|
| AC-1 | Statistics bar displays 110+, 40+, 70+, 50+ with bilingual labels | PASS (after fix) | "Years of Expertise" was hardcoded in English -- fixed during QA by adding `stats.yearsLabel` key to both locale files. All four counters now use i18n keys. |
| AC-2 | At least 4 project cards: offshore grid, onshore HV, submarine thermal, magnetic shielding | PASS | Four cards defined in PROJECTS array matching all required topics. |
| AC-3 | Each card shows: badge, title, description (2-3 sentences), key technology | PASS | ProjectCard renders Badge, CardTitle, description paragraph, and tech label/value. |
| AC-4 | Filter tabs: All / Offshore / Onshore | FAIL -- see BUG-4 | Filter logic is correct, but `useStaggerReveal` only fires once. After switching tabs, newly rendered cards remain stuck with `reveal-hidden` (opacity: 0). Cards disappear and never reappear. |
| AC-5 | Section heading and all content bilingual (EN/DE) | FAIL -- see BUG-2, BUG-3 | Badge text and image alt text are hardcoded in English. |
| AC-6 | Responsive: 2-col desktop, 1-col mobile | PASS | Grid uses `grid-cols-1 sm:grid-cols-2`. Stats bar uses `grid-cols-2 md:grid-cols-4`. |
| AC-7 | Confidentiality note displayed | PASS | `t("confidentialityNote")` rendered, both EN and DE translations present. |

### Edge Case Results

| # | Edge Case | Result | Notes |
|---|-----------|--------|-------|
| EC-1 | Filter yields 0 results shows empty state | PASS | Conditional render shows `t("emptyState")` when `filteredProjects.length === 0`. Cannot happen with current data but code handles it. |
| EC-2 | Inconsistent card description length | PASS (partial) | Cards use `h-full` and `flex-1` on description for consistent height. No "read more" truncation implemented, but descriptions are currently similar length so this is acceptable. |
| EC-3 | Confidential project names | PASS | All project titles use generic descriptive names with year, no client names. |

### Bugs Found

**BUG-1 (Medium, FIXED): "Years of Expertise" hardcoded in English**
- File: `src/components/sections/ProjectsSection.tsx` line 65
- Was: `label="Years of Expertise"` (hardcoded string)
- Fix applied: Changed to `label={tStats("yearsLabel")}` and added `stats.yearsLabel` to both `messages/en.json` ("Years of Expertise") and `messages/de.json` ("Jahre Expertise").
- Status: RESOLVED

**BUG-2 (Medium, OPEN): Badge text "Offshore"/"Onshore" hardcoded in English**
- File: `src/components/sections/ProjectCard.tsx` line 44
- Code: `{category === "offshore" ? "Offshore" : "Onshore"}`
- Impact: Badge text will not translate when the site is viewed in German. The words "Offshore" and "Onshore" happen to be the same in German usage, but this bypasses the i18n system and sets a bad precedent. Should use i18n keys like `projects.filterOffshore` / `projects.filterOnshore` or dedicated badge keys.
- Severity: Medium (functional i18n gap, though visually acceptable in DE)
- Priority: P2

**BUG-3 (Low, OPEN): Image alt text hardcoded in English**
- File: `src/components/sections/ProjectsSection.tsx` lines 18, 25, 32, 39
- Code: `imageAlt: "Offshore wind turbines in the North Sea"` (etc.)
- Impact: Screen readers will read English alt text to German-speaking users. Alt text should be in i18n message files for proper bilingual accessibility.
- Severity: Low (accessibility impact for DE screen reader users)
- Priority: P3

**BUG-4 (High, OPEN): Project cards disappear when switching filter tabs**
- Files: `src/hooks/useScrollReveal.ts` (useStaggerReveal), `src/components/sections/ProjectsSection.tsx`
- Steps to reproduce:
  1. Open the Projects section so cards are visible (scroll down until they animate in)
  2. Click any filter tab (e.g., "Offshore" or "Onshore")
  3. Observe: no project cards are displayed
  4. Switch to another tab -- still no cards
- Root cause: `useStaggerReveal` runs its IntersectionObserver effect only once (dependencies: `[threshold, rootMargin]`). On first intersection, it transitions children from `reveal-hidden` to `reveal-visible` and then calls `observer.unobserve(container)`. When React re-renders with a new filtered list, newly mounted `<div className="reveal-hidden">` elements have `opacity: 0` and `transform: translateY(30px)`, but the observer has already fired and will never run again. The new cards remain invisible.
- Impact: Core functionality completely broken -- users cannot use the project filter at all. After the first filter change, no cards are ever shown again regardless of which tab is selected.
- Severity: High (core feature broken, no workaround)
- Priority: P0
- Suggested fix: Either (a) add `activeFilter` to the useEffect dependency array so the observer re-initializes on filter change, or (b) skip the `reveal-hidden` class for cards that are rendered after the initial reveal (e.g., track whether the initial animation has already played and render subsequent cards as `reveal-visible` directly), or (c) do not use `useStaggerReveal` for dynamically filtered content -- apply the reveal only once and let filter changes render cards immediately visible.

**BUG-5 (Low, OPEN): Stats bar labels differ from acceptance criteria wording** (previously BUG-4)
- The AC specifies: "110+ Projects Completed" / "110+ Projekte abgeschlossen"
- Actual EN: "Projects Completed" (matches). Actual DE: "Abgeschlossene Projekte" (close but reworded).
- The AC specifies: "40+ Offshore Wind Farm Projects" / "40+ Offshore-Windpark-Projekte"
- Actual EN: "Offshore Wind Farms". Actual DE: "Offshore-Windparks" (shortened, missing "Projects/Projekte").
- Severity: Low (cosmetic mismatch with spec, content is still meaningful)
- Priority: P3

### Security Audit (Red-Team)

| Check | Result | Notes |
|-------|--------|-------|
| XSS via i18n keys | PASS | All text rendered via React JSX (auto-escaped). No `dangerouslySetInnerHTML`. |
| External image loading | PASS | `next.config.ts` restricts `remotePatterns` to `images.unsplash.com` only. No open proxy. |
| Security headers | PASS | X-Frame-Options DENY, X-Content-Type-Options nosniff, HSTS with includeSubDomains, Referrer-Policy, Permissions-Policy all configured. |
| No secrets in code | PASS | No API keys, tokens, or credentials in any PROJ-4 files. |
| Client-side only | PASS | No API routes, no server actions, no user input. Pure static rendering -- minimal attack surface. |

### Responsive Checks (Code-based)

| Breakpoint | Check | Result |
|------------|-------|--------|
| 375px (mobile) | Stats: 2-col grid, cards: 1-col | PASS (`grid-cols-2` / `grid-cols-1`) |
| 768px (tablet) | Stats: 4-col grid, cards: 2-col | PASS (`md:grid-cols-4` / `sm:grid-cols-2`) |
| 1440px (desktop) | Max-width container, 2-col cards | PASS (`max-w-7xl` container) |

### Regression Check

No regressions detected in PROJ-1, PROJ-2, or PROJ-3 files. The only change to shared files was adding `stats.yearsLabel` to locale JSON files, which is additive and non-breaking.

### Summary

- **3 of 7 acceptance criteria PASS**
- **1 PASS after fix applied during QA** (AC-1)
- **1 FAIL** (AC-4 -- filter tabs broken due to BUG-4)
- **1 FAIL** (AC-5 partial -- badge and alt text not fully bilingual)
- **5 bugs total**: 1 fixed, 4 open (0 critical, 1 high, 1 medium, 2 low)
- **Security audit**: PASS -- no vulnerabilities found
- **Production-ready: NO** -- BUG-4 (High) must be fixed first. Filter functionality is completely broken.
- **Recommendation**: Fix BUG-4 (filter cards disappear) as P0, then BUG-2 (badge i18n) as P2. BUG-3 and BUG-5 can be addressed in a follow-up.

## Deployment
_To be added by /deploy_
