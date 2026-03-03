# PROJ-2: Hero & About — Brakelmann Profile

## Status: In Review
**Created:** 2026-02-25
**Last Updated:** 2026-02-27

## Dependencies
- Requires: PROJ-1 (Website Foundation) — design system, layout, and i18n must be in place

## User Stories
- As a potential client, I want to immediately understand who Brakelmann is and why he is exceptional so that I know within 5 seconds if I'm in the right place
- As a potential client, I want to see his key stats (projects completed, years of experience) so that I can quickly gauge his track record
- As a visitor, I want to read his full biography so that I can understand his academic and professional background before reaching out
- As a visitor, I want to see his awards and credentials prominently so that I trust his authority
- As a potential client, I want a clear call-to-action button in the hero so that I know how to get in touch

## Acceptance Criteria
- [ ] Full-screen hero section with Brakelmann's name, title ("Prof. Dr.-Ing. Heinrich Brakelmann"), and tagline in both EN and DE
- [ ] Hero includes animated statistics counter: "110+ Projects", "40+ Offshore", "70+ Onshore", "258 Publications"
- [ ] Hero has a prominent CTA button "Get in Touch" / "Kontakt aufnehmen" scrolling to the contact section
- [ ] High-quality background image (offshore wind farm / cable infrastructure) with proper overlay for readability
- [ ] About section includes full bilingual biography covering:
  - Academic background (TU Aachen diploma 1971, doctoral thesis 1973)
  - Career at Felten & Guilleaume Energietechnik AG
  - Professor emeritus at University of Duisburg-Essen (Institute for Energy-Transport and -Storage)
- [ ] Awards highlighted visually: ETG Award (1982), 2019 IEEE Transactions Prize Paper Award
- [ ] Brakelmann's photo displayed professionally in the About section
- [ ] Section is fully bilingual (EN/DE via next-intl)
- [ ] Accessible: all images have alt text, proper heading hierarchy (h1 for name, h2 for About)

## Edge Cases
- What if Brakelmann's photo is unavailable? → Show a professional placeholder with initials "HB"
- What if the stats counter animation causes layout shift? → Pre-reserve space, animate only the number value
- What if the hero background image fails to load? → Solid navy background fallback maintains readability
- What if the user has `prefers-reduced-motion`? → Skip counter animation, show final values directly

## Technical Requirements
- Hero image: Free-license offshore wind / cable image from Unsplash (e.g., search: "offshore wind farm cable")
  - Candidate: https://unsplash.com/photos/white-windmill-on-body-of-water-9pRhFpPpBQo
- Stats counter: CSS/JS animation that counts up on scroll into viewport (Intersection Observer)
- Performance: Hero image lazy-loaded with next/image, properly sized (WebP format)
- Bilingual content: All text in /messages/en.json and /messages/de.json translation files

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Components
- `HeroSection.tsx` — full-viewport section with background image overlay, name/title/tagline, StatCounter strip, CTA button
- `AboutSection.tsx` — two-column layout: Brakelmann photo (left) + bio text with award badges (right)
- `StatCounter.tsx` (shared) — accepts a target number and label; animates count-up on scroll into viewport using Intersection Observer API; respects `prefers-reduced-motion`

### Content Source
All text (tagline, bio, award descriptions) in `messages/en.json` and `messages/de.json`. Photo stored in `public/` or referenced via next/image.

### Hero Background Image
next/image component with priority loading (above the fold). Dark overlay via Tailwind `bg-gradient-to-b from-primary/80` for text readability.

### Stats Strip
Four counters displayed in a horizontal band: "110+ Projects", "40+ Offshore", "70+ Onshore", "258 Publications". Shared `StatCounter` component reused here and in PROJ-4.

## QA Test Results

**Tested:** 2026-02-28 (re-test after fixes from 2026-02-27 QA run)
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)

### Previous QA Run (2026-02-27) -- All Fixed

| ID | Severity | Description | Status |
|----|----------|-------------|--------|
| BUG-1 | High | Missing hero background image | FIXED -- verified |
| BUG-2 | Medium | No photo fallback (HB initials) | FIXED -- verified |
| BUG-3 | Medium | Missing security headers | FIXED -- verified |
| BUG-4 | Low | `npm run lint` failed | FIXED -- verified |
| BUG-5 | Low | Copyright year 2025 instead of 2026 | FIXED -- verified |

### Acceptance Criteria Status (Re-test 2026-02-28)

#### AC-1: Full-screen hero section with name, title, and tagline in EN and DE
- [x] Hero section present with `id="hero"` and `min-h-screen`
- [x] Title Line 1: "Prof. Dr.-Ing. em." in accent color
- [x] Title Line 2: "Heinrich Brakelmann" in white
- [x] English subtitle: "Expert Consulting in High-Voltage Cable Systems & Offshore Wind Energy"
- [x] German subtitle: "Expertenberatung fur Hochspannungskabelsysteme & Offshore-Windenergie"
- [x] English tagline: "50+ years of pioneering research. 110+ projects delivered. IEEE Prize Paper Award 2019."
- [x] German tagline: "50+ Jahre Pionierforschung. 110+ Projekte. IEEE Prize Paper Award 2019."
- [x] Proper `<h1>` tag used for the name (correct heading hierarchy)

#### AC-2: Hero includes animated statistics counter
- [x] Four stat counters displayed: "110+ Projects", "40+ Offshore", "70+ Onshore", "258 Publications"
- [x] German labels: "Abgeschlossene Projekte", "Offshore-Windparks", "Onshore-Projekte", "Publikationen"
- [x] StatCounter uses `IntersectionObserver` to animate on scroll into viewport
- [x] `easeOutCubic` easing function for smooth count-up animation (4s duration)
- [x] `prefers-reduced-motion` respected: shows final values directly without animation
- [x] `aria-label` on stat values provides accessible final number (e.g., `aria-label="110+"`)

#### AC-3: Hero has a prominent CTA button scrolling to contact section
- [x] Primary CTA: "Get in Touch" (EN) / "Kontakt aufnehmen" (DE) -- scrolls to `#contact`
- [x] Secondary CTA: "Explore Services" (EN) / "Leistungen entdecken" (DE) -- scrolls to `#services`
- [x] Primary button uses `bg-accent` styling (electric cyan, high contrast)
- [x] Secondary button uses outline variant

#### AC-4: High-quality background image with proper overlay
- [x] Background image: `nicholas-doherty-UMgb7Z2Yi3E-unsplash.jpg` (Race Bank Offshore Wind Farm)
- [x] Uses `next/image` with `fill` and `object-cover` and `priority` loading
- [x] Dark gradient overlay: `from-primary/85 via-primary/70 to-primary/90` ensures text readability
- [x] `aria-hidden="true"` on decorative background image (correct accessibility)

#### AC-5: About section includes full bilingual biography
- [x] Academic background: RWTH Aachen (Diploma 1971), doctoral thesis 1973 -- present in EN and DE
- [x] Career at Felten & Guilleaume Energietechnik AG in Cologne -- present in EN and DE
- [x] Professor emeritus at University of Duisburg-Essen, Institute for Energy Transport and Storage -- present in EN and DE
- [x] Lead paragraph provides executive summary of expertise
- [x] Three bio paragraphs covering full career arc

#### AC-6: Awards highlighted visually
- [x] IEEE PES Prize Paper Award 2019 -- with Trophy icon and description
- [x] ETG Award 1982 -- with Award icon and description (EN: "ETG Award 1982", DE: "ETG-Preis 1982")
- [x] CIGRE Working Group Contributor -- with Users icon and description
- [x] Award cards use `rounded-xl border border-accent/20` styling with hover effect
- [x] Icons are `aria-hidden="true"` (correct accessibility)

#### AC-7: Brakelmann's photo displayed professionally in About section
- [x] Photo: `/images/brakelmann.png` loaded via `next/image` with `priority`
- [x] Alt text: "Prof. Dr.-Ing. Heinrich Brakelmann" (descriptive, accessible)
- [x] Photo displayed in left column of a two-column layout (`lg:grid-cols-[2fr_3fr]`)
- [x] Photo has decorative border and shadow (`rounded-2xl border border-accent/20 shadow-lg`)

#### AC-8: Section is fully bilingual
- [x] All hero text in `messages/en.json` and `messages/de.json`
- [x] All about text in both locale files
- [x] All stats in both locale files
- [x] Language switching correctly renders the corresponding locale content

#### AC-9: Accessible -- all images have alt text, proper heading hierarchy
- [x] Hero background image: `alt=""` (decorative, correct)
- [x] Brakelmann photo: `alt="Prof. Dr.-Ing. Heinrich Brakelmann"` (descriptive)
- [x] Heading hierarchy: `<h1>` for name in hero, `<h2>` for About heading, `<h3>` for Awards, `<h4>` for individual awards
- [x] `aria-label` on hero section and about section
- [x] `aria-label` on scroll-down button
- [x] Icons use `aria-hidden="true"`

### Edge Cases Status (Re-test)

#### EC-1: Brakelmann's photo unavailable
- [x] `onError` handler on `<Image>` sets `photoError` state to `true`
- [x] Fallback renders "HB" initials in a styled div (`text-6xl font-bold text-accent/60`)
- [x] Fallback container matches photo dimensions (`h-[600px] w-full max-w-sm`)

#### EC-2: Stats counter animation causes layout shift
- [x] StatCounter uses fixed `flex flex-col items-center text-center` layout
- [x] Number element has consistent `text-4xl font-bold` styling regardless of animation state
- [x] Grid container has `gap-6 md:gap-0` with `md:divide-x` -- layout is pre-reserved

#### EC-3: Hero background image fails to load
- [ ] BUG: No explicit `onError` fallback for the hero background image. If the image file is missing or corrupt, the dark overlay gradient still renders over the `bg-primary` section background, so the site remains readable. However, there is no explicit error handling like the about photo has.

#### EC-4: prefers-reduced-motion
- [x] `prefersReducedMotion()` function checks `window.matchMedia("(prefers-reduced-motion: reduce)")`
- [x] When true: `displayValue` starts at final `value` (no animation)
- [x] When true: `hasAnimated` starts as `true` (IntersectionObserver skipped)

### Security Audit Results
- [x] No user input fields in Hero or About sections -- no XSS or injection risk
- [x] Images served locally from `/public/images/` -- no external dependency for core content
- [x] No API calls or data fetching -- no SSRF or data leak risk
- [x] `aria-hidden` properly used on decorative elements
- [x] Email address exposed in footer (intentional -- public contact info)
- [x] All security headers verified (see PROJ-1 audit)

### New Bugs Found (2026-02-28)

#### BUG-PROJ2-1: No error handling for hero background image load failure
- **Severity:** Low
- **Steps to Reproduce:**
  1. Rename or delete `public/images/nicholas-doherty-UMgb7Z2Yi3E-unsplash.jpg`
  2. Load http://localhost:3000/en
  3. Expected: A graceful fallback (solid navy background or placeholder text)
  4. Actual: The `<Image>` component shows a broken image but the gradient overlay + `bg-primary` on the section still provides a readable dark background. No explicit error handling like the about photo has.
- **Impact:** Very low -- the fallback appearance is acceptable even without explicit handling, because the dark overlay and bg-primary render on top. This is more of a code consistency issue.
- **Priority:** Nice to have

### Summary
- **Acceptance Criteria:** 9/9 passed
- **Previous bugs (2026-02-27):** 5/5 verified as fixed
- **New bugs found (2026-02-28):** 1 total (0 critical, 0 high, 0 medium, 1 low)
- **Security:** PASS -- no input surfaces, no API calls, all content static
- **Production Ready:** YES (conditioned on PROJ-1 OG tags and favicon fixes)
- **Recommendation:** PROJ-2 is production-ready. The one low-severity bug (hero image error handling) is a code consistency improvement and does not block deployment.

### Bug Fix (2026-02-28)

| Bug | Status | Fix |
|-----|--------|-----|
| BUG-PROJ2-1 | ✅ Fixed | Added `useState<boolean>(false)` for `bgError` and `onError={() => setBgError(true)}` on hero `<Image>`. When image fails, the entire image container is unmounted; `bg-primary` CSS on the `<section>` provides a clean navy fallback. |

### Re-Test Results (2026-03-02)

**Tester:** QA Engineer (AI)
**Build:** PASSES

#### Previous Bug Fix Verification
| Bug | Re-Test Result |
|-----|---------------|
| BUG-PROJ2-1 (hero bg error handling) | VERIFIED FIXED -- `bgError` state + `onError` handler on hero Image; container unmounts on error, bg-primary fallback renders cleanly. |

#### Re-Test Acceptance Criteria
- [x] AC-1: Hero with name, title, tagline in EN and DE -- all rendering correctly
- [x] AC-2: Animated stat counters (110+, 40+, 70+, 258) with IntersectionObserver + prefers-reduced-motion
- [x] AC-3: CTA buttons ("Get in Touch" / "Kontakt aufnehmen") scroll to #contact
- [x] AC-4: Background image with gradient overlay renders; priority loading confirmed
- [x] AC-5: About section bio text complete in EN and DE (RWTH Aachen, F&G, UDE)
- [x] AC-6: Awards (IEEE 2019, ETG 1982, CIGRE) with icons and hover effects
- [x] AC-7: Brakelmann photo with alt text, priority loading, error fallback
- [x] AC-8: Fully bilingual -- all text from i18n translation files
- [x] AC-9: Accessible -- alt text, heading hierarchy h1>h2>h3>h4, aria-labels, aria-hidden on icons

#### No New Bugs Found
All previously identified and fixed bugs remain fixed. No regressions detected.

#### Re-Test Summary
- **Acceptance Criteria:** 9/9 passed
- **Previous Bugs:** 1/1 verified fixed
- **New Bugs:** 0
- **Security:** PASS (no input surfaces, static content only)
- **Production Ready:** YES

## Deployment
_To be added by /deploy_
