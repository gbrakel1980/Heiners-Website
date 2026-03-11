# Full-Site QA Review -- Focus: Mobile Display & Cross-Feature

**Tested:** 2026-03-11
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS -- `npm run build` succeeds, `npm run lint` passes, zero TypeScript errors
**Dev Server:** Running on port 3000

---

## 1. Build & Infrastructure

| Check | Result | Notes |
|-------|--------|-------|
| `npm run build` | PASS | Next.js 16.1.1 (Turbopack), 5 pages generated, 0 errors |
| `npm run lint` | PASS | ESLint clean |
| TypeScript | PASS | No compilation errors |
| Security headers | PASS | X-Frame-Options DENY, X-Content-Type-Options nosniff, HSTS, Referrer-Policy, Permissions-Policy all present |
| HTTPS/HSTS | PASS | max-age=63072000; includeSubDomains; preload |
| hreflang links | PASS | Alternate links for EN, DE, and x-default in response headers |
| OG meta tags | PASS | og:title, og:description, og:image, og:url, og:type, og:locale, og:site_name all present |
| NEXT_LOCALE cookie | PASS | SameSite=lax, Path=/ |

---

## 2. Mobile Display Analysis (375px)

### 2.1 Header (PROJ-1)

| Check | Result | Notes |
|-------|--------|-------|
| Height | PASS | `h-14` on mobile, `h-16` on desktop |
| Logo text | PASS | "BCC Cable Consulting" readable at mobile size |
| Hamburger menu | PASS | Visible below `md` breakpoint, triggers Sheet overlay |
| Mobile menu Sheet | PASS | `w-72` width, right-side slide, nav items + language switcher |
| Language switcher in mobile menu | PASS | EN/DE buttons with active state styling |
| Fixed position | PASS | `fixed top-0 left-0 right-0 z-50` |
| Backdrop blur | PASS | `backdrop-blur-md` on scroll |

**Mobile bugs found:** None

### 2.2 Hero Section (PROJ-2)

| Check | Result | Notes |
|-------|--------|-------|
| Full-screen height | PASS | `min-h-screen` |
| Content centering | PASS | `flex flex-col items-center justify-center` |
| Top padding for fixed header | PASS | `pt-16 md:pt-20` |
| CTA buttons stacking | PASS | `flex-col gap-3 sm:flex-row` -- buttons stack vertically on mobile |
| Stats grid | PASS | `grid-cols-2 gap-6 md:grid-cols-4` -- 2 columns on mobile |
| Background image | PASS | `object-cover object-center` with gradient overlay |
| Text readability | PASS | White text on dark gradient overlay |
| Name text size | **CONCERN** | `text-2xl` on mobile for "Prof. Dr.-Ing. em. Heinrich Brakelmann" -- long name, but wraps cleanly |
| Title "BCC Cable Consulting" | PASS | `text-4xl md:text-5xl lg:text-6xl` scales well |
| Scroll indicator | PASS | `bottom-8` positioned, `animate-bounce` |

**Mobile bugs found:**

**BUG-SITE-1: Hero CTA buttons both look identical on mobile**
- **Severity:** Low
- **Description:** Both "Get in Touch" and "Explore Services" buttons use the same outline variant styling (`border-white/30 bg-transparent text-white`). There is no visual differentiation between the primary and secondary CTA. The spec says the primary should use `bg-accent` styling.
- **Steps to Reproduce:**
  1. Open http://localhost:3000/en at 375px viewport
  2. Scroll to the CTA buttons in the hero
  3. Expected: Primary CTA stands out visually from secondary
  4. Actual: Both buttons have identical outline styling
- **Priority:** Fix before deployment -- the primary CTA should be visually prominent

### 2.3 About Section (PROJ-2)

| Check | Result | Notes |
|-------|--------|-------|
| Photo + credentials layout | PASS | Single column on mobile (`lg:grid-cols-[3fr_2fr]`), stacks vertically |
| Photo sizing | PASS | `w-full` with aspect ratio preserved |
| L-frame accent | PASS | Decorative border-left/bottom visible |
| Credential sidebar | PASS | Stacks below photo on mobile |
| Bio text | PASS | Justified with auto-hyphenation (`text-justify hyphens-auto`) |
| Bio columns | PASS | Single column on mobile, 2 columns on `lg:` |
| Awards band | PASS | Dark background, single column on mobile (`sm:grid-cols-3`) |
| Specialization tags | PASS | `flex-wrap` wraps tags properly on narrow screens |
| Scroll reveal animation | PASS | `reveal-hidden` / `reveal-visible` transitions |

**Mobile bugs found:**

**BUG-SITE-2: Awards grid is 1 column on mobile but has no visual separation between award items**
- **Severity:** Low
- **Description:** On mobile (<sm), the awards grid renders as a single column. The three award items are stacked with `gap-8` spacing, which provides adequate separation. However, unlike the credential sidebar which uses `border-l-2` dividers, the award items have no visual divider between them.
- **Priority:** Nice to have

### 2.4 Services Section (PROJ-3)

| Check | Result | Notes |
|-------|--------|-------|
| Grid columns | PASS | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Card min-height | PASS | `min-h-[180px]` applied |
| Card content on mobile | PASS | Full-width cards, icon + title + description readable |
| Gap spacing | PASS | `gap-6` (24px) |
| Stagger reveal | PASS | Children animate in with delay |

**Mobile bugs found:**

**BUG-SITE-3: Only 6 of 7 services displayed (spec requires 7)**
- **Severity:** Medium
- **Status: ACCEPTED — By Design (2026-03-11)**
- **Description:** The "Transmission Behavior Analysis" service was intentionally merged into the existing "Thermal Analysis & Cable Rating" service. Acceptance criteria updated accordingly in PROJ-3 spec.
- **Resolution:** Spec updated to reflect 6 services as the correct implementation.

### 2.5 Projects Section (PROJ-4)

| Check | Result | Notes |
|-------|--------|-------|
| Stats bar | PASS | `grid-cols-2 gap-8 md:grid-cols-4` -- 2 columns on mobile |
| Stats bar overflow | PASS | Negative margin `-mx-4` extends to edges on mobile |
| Project cards | PASS | Single column (`flex flex-col gap-6`) |
| Card layout | PASS | Content stacks vertically on mobile (`md:flex-row`), tech spec below with border-top |
| Ghost number | PASS | Decorative number positioned `right-2 top-0`, clipped by overflow-hidden |
| Confidentiality note | PASS | Centered, italic, readable |

**Mobile bugs found:**

**BUG-SITE-4: Only 3 project cards displayed (spec requires at least 4)**
- **Severity:** Medium
- **Status: ACCEPTED — By Design (2026-03-11)**
- **Description:** 3 project cards is the intentional final scope. Acceptance criteria updated accordingly in PROJ-4 spec.
- **Resolution:** Spec updated to reflect 3 project cards as the correct implementation.

**BUG-SITE-5: Filter tabs removed but AC still requires them**
- **Severity:** Medium
- **Status: ACCEPTED — By Design (2026-03-11)**
- **Description:** Filter tabs were intentionally removed. The cleaner design without filters was preferred over the broken filter tab implementation.
- **Resolution:** Spec updated to remove filter tab requirement from PROJ-4 AC.

### 2.6 Testimonials / Professional Network Section (PROJ-6)

| Check | Result | Notes |
|-------|--------|-------|
| Mobile horizontal scroll | PASS | `overflow-x-auto` with `snap-x snap-mandatory` |
| Card sizing in scroll | PASS | `min-w-[280px] max-w-[320px]` fits within viewport |
| Desktop grid | PASS | `md:flex-wrap md:justify-center` with centered rows |
| Logo strip | PASS | `flex-wrap` with logos wrapping to multiple rows |
| Logo containers | PASS | `h-16 px-5` on mobile |

**Mobile bugs found:** See BUG-PROJ6-2 in PROJ-6 spec (no scroll indicator).

### 2.7 Book Spotlight Section (new, not in original specs)

| Check | Result | Notes |
|-------|--------|-------|
| Layout | PASS | `flex-col lg:flex-row` -- stacks vertically on mobile |
| Book cover | PASS | `w-52` centered on mobile, `lg:w-full` on desktop |
| 3D tilt effect | PASS | CSS perspective transform, flattens on hover |
| Text alignment | PASS | `text-center lg:text-left` |
| CTA button | PASS | External link to BoD bookshop, `target="_blank" rel="noopener noreferrer"` |
| Section title size | PASS | `clamp(2rem, 4vw, 3.5rem)` responsive font size |
| Padding | PASS | `py-24 md:py-32` |

**Mobile bugs found:**

**BUG-SITE-6: Book Spotlight section has no feature spec**
- **Severity:** Low
- **Description:** The BookSpotlightSection is rendered between Testimonials and Publications on the page, but has no corresponding feature specification in `features/`. It also has no entry in `features/INDEX.md`. This section was added without going through the standard feature workflow.
- **Priority:** Nice to have (add to INDEX.md)

**BUG-SITE-7: Book cover image uses `priority` loading but is far below the fold**
- **Severity:** Low
- **Description:** The book cover image (`Erdkabel_fur_den_Netzausbau.avif`) has `priority` attribute set, which means it is preloaded during page load. This image is in the 6th section of the page, far below the fold. Using `priority` on below-fold images hurts LCP by adding unnecessary preload requests. Only above-fold images (hero, Brakelmann photo) should have `priority`.
- **Steps to Reproduce:**
  1. View page source of http://localhost:3000/en
  2. Check `<head>` section: the book cover image is included in `<link rel="preload">`
  3. Expected: Only above-fold images preloaded
  4. Actual: Below-fold book cover image is unnecessarily preloaded
- **Priority:** Fix before deployment (performance impact on LCP)

### 2.8 Publications Section (PROJ-7)

| Check | Result | Notes |
|-------|--------|-------|
| Awards grid | PASS | `sm:grid-cols-2` -- 1 col on mobile, 2 on sm+ |
| Publication list | PASS | Single column on all sizes |
| Publication cards | PASS | `p-4 md:p-5` -- adequate mobile padding |
| CTA buttons | PASS | `flex-col sm:flex-row` -- stack vertically on mobile, `w-full sm:w-auto` |
| External links | PASS | All have `target="_blank" rel="noopener noreferrer"` |
| PDF download | PASS | Links to `/List%20of%20publications.pdf`, opens in new tab |

**Mobile bugs found:** None

### 2.9 Contact Section (PROJ-5)

| Check | Result | Notes |
|-------|--------|-------|
| Layout | PASS | `flex-col lg:flex-row` -- form stacks above contact info on mobile |
| Form fields | PASS | `grid-cols-1 sm:grid-cols-2` -- name/company side by side on sm+, stacked on mobile |
| Divider | PASS | Horizontal on mobile (`lg:hidden`), vertical on desktop (`hidden lg:block`) |
| Input styling | PASS | Dark inputs with subtle borders, readable on dark background |
| Submit button | PASS | `w-full`, `h-12` -- prominent full-width on mobile |
| Character counter | PASS | Visible below textarea |
| Contact info | PASS | Stacks below form, full-width |
| Phone/email links | PASS | Clickable `tel:` and `mailto:` links |
| Honeypot field | PASS | Hidden via `absolute -left-[9999px] opacity-0` |

**Mobile bugs found:**

**BUG-SITE-8: Contact info items have negative margin that may cause touch target issues on mobile**
- **Severity:** Low
- **Description:** `ContactItem` uses `-mx-3` negative margin for hover padding expansion. On mobile, this could cause the touch/click target to extend beyond the visible container boundary, potentially overlapping with other elements.
- **Priority:** Nice to have

### 2.10 Footer (PROJ-1)

| Check | Result | Notes |
|-------|--------|-------|
| Grid layout | PASS | `grid-cols-1 md:grid-cols-12` -- single column on mobile |
| Footer nav | **FAIL** | Still uses `<button>` elements, not `<a href>` (BUG-PROJ1-6 from prior QA) |
| "Navigation" heading | **FAIL** | Hardcoded English string, not from i18n (BUG-PROJ1-7) |
| "Back to top" text | **FAIL** | Hardcoded English -- "Back to top" not translated (See BUG-SITE-9) |
| "Impressum" link | PASS | Links to `/${locale}/impressum` |
| Copyright | PASS | From translation file |
| Email link | PASS | `mailto:` link |
| Bottom bar | PASS | `flex-col sm:flex-row` -- stacks on mobile |

**Mobile bugs found:**

**BUG-SITE-9: Footer "Back to top" text is hardcoded English**
- **Severity:** Low
- **Description:** The "Back to top" text on the footer's back-to-top button (line 110 of Footer.tsx) is hardcoded in English: `<span className="hidden sm:inline">Back to top</span>`. On the German version of the site, this should read "Nach oben" or similar. However, the text is `hidden sm:inline`, meaning it is only shown on sm+ screens, not on mobile. On mobile, only the chevron icon is visible.
- **Priority:** Nice to have

**BUG-SITE-10: Footer navigation still uses button elements (regression from BUG-PROJ1-6)**
- **Severity:** Medium
- **Description:** The PROJ-1 re-test on 2026-03-02 identified BUG-PROJ1-6 (Footer nav uses `<button>` instead of `<a href>`). This bug remains UNFIXED. Footer navigation items at lines 57-63 are still `<button onClick>` elements. With JavaScript disabled, footer navigation does not work. This also means search engine crawlers cannot follow footer navigation links.
- **Steps to Reproduce:**
  1. Open http://localhost:3000/en
  2. Scroll to footer, inspect the navigation links
  3. Elements are `<button>` not `<a href="#section">`
- **Priority:** Fix before deployment

### 2.11 Impressum Page

| Check | Result | Notes |
|-------|--------|-------|
| Header offset | PASS | `pt-32` provides clearance for fixed header |
| Padding | PASS | `px-4 md:px-8` |
| Content width | PASS | `max-w-3xl` |
| All text from i18n | PASS (partial) | Section headings translated, but address details hardcoded |
| Responsive | PASS | Single column, readable at all sizes |

**Mobile bugs found:** None significant.

---

## 3. Cross-Feature Issues

### BUG-SITE-11: Scroll reveal animation may cause invisible content on slow scroll
- **Severity:** Medium
- **Description:** Multiple sections use `reveal-hidden` CSS class which sets `opacity: 0; transform: translateY(30px)`. If a user scrolls quickly past a section and back, or if the IntersectionObserver threshold is not met (e.g., user scrolls too fast), content may remain invisible. The `useScrollReveal` hook unobserves after first intersection, so this is only a concern if the observer never fires.
- **Steps to Reproduce:**
  1. Open the page and quickly scroll to the bottom
  2. Some sections may appear blank if the IntersectionObserver didn't fire
  3. The threshold is 0.15 for single reveals and 0.1 for stagger reveals, which is relatively low (should fire when 10-15% visible), but with a rootMargin of `-30px` to `-50px`, the effective trigger is delayed
- **Impact:** Users may see blank sections temporarily. The content does eventually appear on any scroll that brings the section into view.
- **Priority:** Fix before deployment -- consider adding a fallback timeout or using a lower threshold

### BUG-SITE-12: Services section "Transmission Behavior Analysis" removed without acceptance criteria update
- **Severity:** Medium
- **Status: ACCEPTED — By Design (2026-03-11)**
- **Description:** The "transmission" service was intentionally merged into "thermal." Spec updated in PROJ-3.
- **Resolution:** PROJ-3 acceptance criteria updated to reflect 6 services.

---

## 4. Security Audit (Red-Team Perspective)

| Check | Result | Notes |
|-------|--------|-------|
| Security headers | PASS | All required headers present (X-Frame-Options, HSTS, etc.) |
| No secrets in HTML source | PASS | No API keys, tokens, or credentials exposed |
| Contact form XSS | PASS | React auto-escapes JSX. Server sends plain text email via Resend. No `dangerouslySetInnerHTML`. |
| Contact form CSRF | NOTE | No CSRF token, but this is a public contact form with rate limiting -- acceptable risk |
| Honeypot anti-spam | PASS | Hidden field, silently succeeds if filled (bots get 200 response) |
| Rate limiting | PASS | 5 requests per IP per hour, in-memory store |
| Server-side validation | PASS | Zod schema validates all inputs before Resend API call |
| Environment variables | PASS | RESEND_API_KEY and CONTACT_EMAIL_TO in .env.local (gitignored) |
| .env.local.example | PASS | Documents required vars with dummy values |
| External links | PASS | All use `target="_blank" rel="noopener noreferrer"` |
| Content-Security-Policy | ABSENT | No CSP header configured. Hardening recommendation for production. |
| images.unsplash.com remote pattern | NOTE | Configured in next.config.ts but unused (all images are now local). Not a security issue, just cleanup. |
| X-Powered-By header | NOTE | `X-Powered-By: Next.js` is exposed. Consider removing to reduce information leakage. |

---

## 5. Overall Bug Summary

### New Bugs Found in This QA Session

| ID | Feature | Severity | Description | Priority |
|----|---------|----------|-------------|----------|
| BUG-SITE-1 | PROJ-2 (Hero) | Low | Both CTA buttons look identical (both outline) -- primary should stand out | Fix before deployment |
| BUG-SITE-3 | PROJ-3 (Services) | Medium | Only 6 of 7 services displayed (missing "Transmission Behavior Analysis") | Fix or update AC |
| BUG-SITE-4 | PROJ-4 (Projects) | Medium | Only 3 of 4+ project cards (spec requires at least 4) | Fix or update AC |
| BUG-SITE-5 | PROJ-4 (Projects) | Medium | Filter tabs removed but AC still requires them | Update AC |
| BUG-SITE-6 | Book Spotlight | Low | No feature spec or INDEX.md entry | Nice to have |
| BUG-SITE-7 | Book Spotlight | Low | Below-fold image unnecessarily uses `priority` loading | Fix before deployment |
| BUG-SITE-9 | PROJ-1 (Footer) | Low | "Back to top" text hardcoded English | Nice to have |
| BUG-SITE-10 | PROJ-1 (Footer) | Medium | Footer nav still uses `<button>` not `<a href>` (unfixed from prior QA) | Fix before deployment |
| BUG-SITE-11 | Cross-feature | Medium | Scroll reveal content may stay invisible on fast scroll | Fix before deployment |
| BUG-SITE-12 | PROJ-3 (Services) | Medium | "Transmission" service removed without AC update | Update AC |
| BUG-PROJ6-1 | PROJ-6 | Low | Section repurposed without updating AC | Nice to have |
| BUG-PROJ6-2 | PROJ-6 | Medium | No visual scroll indicator for mobile horizontal scroll | Fix before deployment |
| BUG-PROJ6-3 | PROJ-6 | Low | No blockquote elements (spec mismatch) | Nice to have |
| BUG-PROJ6-4 | PROJ-6 | Low | Logo images max-w-none may overflow on very narrow screens | Nice to have |
| BUG-SITE-8 | PROJ-5 (Contact) | Low | ContactItem negative margin touch target issue | Nice to have |
| BUG-SITE-2 | PROJ-2 (About) | Low | No visual separator between stacked award items on mobile | Nice to have |

### Previously Identified Unfixed Bugs (from prior QA sessions)

| ID | Feature | Severity | Status |
|----|---------|----------|--------|
| BUG-PROJ1-5 | PROJ-1 | Medium | UNFIXED -- i18n fallback uses shallow merge (nested keys don't fall back) |
| BUG-PROJ1-6 | PROJ-1 | Medium | UNFIXED -- Footer nav uses `<button>` not `<a href>` (same as BUG-SITE-10) |
| BUG-PROJ1-7 | PROJ-1 | Low | UNFIXED -- Footer "Navigation" heading hardcoded English |
| BUG-PROJ1-8 | PROJ-1 | Low | UNFIXED -- Mobile menu SheetTitle hardcoded English "Navigation Menu" |
| BUG-PROJ4-2 | PROJ-4 | Medium | STATUS UNCLEAR -- Badge text hardcoded English (filter removed, badges removed) |
| BUG-PROJ5-001 | PROJ-5 | High | OPEN -- Production email configuration not yet completed (domain verification needed) |

---

## 6. Production-Ready Decision

### Totals
- **New bugs:** 16 total (0 critical, 0 high, 6 medium, 10 low)
- **Unfixed from prior QA:** 6 bugs (0 critical, 1 high, 3 medium, 2 low)
- **Security:** PASS (no vulnerabilities, hardening recommendations noted)

### Must-Fix Before Deployment (Medium+ priority)
1. **BUG-SITE-10 / BUG-PROJ1-6:** Footer navigation uses `<button>` instead of `<a href>` -- blocks SEO and JS-disabled users
2. **BUG-SITE-11:** Scroll reveal may leave content invisible
3. **BUG-PROJ6-2:** Mobile horizontal scroll has no visual indicator
4. **BUG-SITE-7:** Book cover `priority` hurts LCP
5. **BUG-PROJ5-001:** Production email configuration (Resend domain verification, from address update)
6. **BUG-PROJ1-5:** i18n deep merge for nested fallback keys

### Should Fix
7. **BUG-SITE-1:** Hero CTA buttons not visually differentiated
8. ~~BUG-SITE-3/12, BUG-SITE-4, BUG-SITE-5~~ — ACCEPTED by product decision (specs updated)

### Verdict: **NOT READY FOR PRODUCTION**

The site has 6 medium-severity bugs and 1 high-severity open item (email configuration) that should be addressed before launch. The most impactful issues for mobile users are:
- Missing scroll indicators on the Testimonials horizontal scroll (BUG-PROJ6-2)
- Scroll reveal animation reliability (BUG-SITE-11)
- Footer navigation not working without JavaScript (BUG-SITE-10)
- Book image priority loading hurting performance (BUG-SITE-7)

---

## 7. Recommendation

The developer needs to fix the medium-severity bugs listed above before deployment. After fixes, run `/qa` again to verify. The acceptance criteria for PROJ-3 (Services) and PROJ-4 (Projects) should be updated to reflect the current implementation if the reductions from 7 to 6 services and from 4+ to 3 projects were intentional product decisions.

> Found 22 bugs total across new and unfixed prior issues (0 critical, 1 high, 9 medium, 12 low). The developer needs to fix these before deployment. After fixes, run `/qa` again.
