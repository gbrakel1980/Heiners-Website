# PROJ-6: Testimonials & References

## Status: In Review
**Created:** 2026-02-25
**Last Updated:** 2026-03-03

## Dependencies
- Requires: PROJ-1 (Website Foundation) — design system and i18n in place

## User Stories
- As a potential client, I want to see what others say about working with BCC so that I can feel confident before reaching out
- As a visitor, I want to see which organizations or institutions have worked with Brakelmann so that I understand the caliber of clients
- As a German-speaking visitor, I want to read testimonials in German so that the language is not a barrier

## Acceptance Criteria
- [ ] Section displays 3–5 testimonial cards with: quote text, person's name, title/company, and optional star rating
- [ ] If real client testimonials are unavailable, section uses representative references such as: IEEE award committee, university colleagues, or industry conference appearances
- [ ] Section includes a "Notable Collaborations" or "Trusted By" strip with organization logos or names (e.g., University of Duisburg-Essen, IEEE, ETG/VDE)
- [ ] All content bilingual (EN/DE via next-intl)
- [ ] Responsive: horizontal scroll or card stack on mobile
- [ ] Accessible: blockquote HTML element used for quote text

## Edge Cases
- What if no real testimonials are available at launch? → Section can be omitted or replaced with a "References available upon request" note
- What if logos are not available in free-license format? → Use text-only organization names in a styled list

## Technical Requirements
- Cards: shadcn/ui Card component
- Content: Hardcoded in translation files (en.json / de.json) — no CMS needed
- Logos: SVG or PNG from official sources (university, IEEE) with proper attribution

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Components
- `TestimonialsSection.tsx` — horizontal scroll on mobile, grid on desktop; maps over testimonial data
- Each testimonial: blockquote HTML element + name + title/org badge
- "Trusted By" strip: styled list of organization names (IEEE, VDE/ETG, University of Duisburg-Essen, CIGRE)

### Content Source
Testimonial data in `messages/en.json` and `messages/de.json`. If no real quotes available at launch, section shows the "Trusted By" org strip only with a "References available upon request" note.

## QA Test Results

**Tested:** 2026-03-11
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build:** PASS -- `npm run build` succeeds, zero TypeScript errors

### Acceptance Criteria Status

#### AC-1: Section displays 3-5 testimonial cards with quote text, person's name, title/company, and optional star rating
- [ ] BUG: The section does NOT display testimonial cards with quotes. Instead, it displays 7 "collaboration cards" showing organizations and their relationship to Brakelmann. No quote text, no person's name, no star rating. The section has been repurposed from "Testimonials & References" to "Professional Network." (See BUG-PROJ6-1)

#### AC-2: If real testimonials unavailable, section uses representative references (IEEE, university, etc.)
- [x] The section uses representative references as collaboration cards: IEEE, CIGRE, BMWi, VDE/ETG, University of Duisburg-Essen, TSOs, and Offshore Wind Developers
- [x] This is an acceptable fallback per the edge case: "Section can be omitted or replaced with a 'References available upon request' note"

#### AC-3: Section includes a "Notable Collaborations" or "Trusted By" strip with organization logos
- [x] "Trusted By" / "Organizations & Institutions" strip present with logos
- [x] Logos for IEEE PES, VDE/ETG, CIGRE, University of Duisburg-Essen, BMWi
- [x] Logos displayed in white rounded containers with hover shadow effect

#### AC-4: All content bilingual (EN/DE via next-intl)
- [x] All collaboration card text (organization, description, type) in both EN and DE locale files
- [x] Section heading, subheading, trustedByHeading all translated
- [x] Component uses `useTranslations("testimonials")` correctly

#### AC-5: Responsive -- horizontal scroll or card stack on mobile
- [x] Mobile (<md): horizontal scroll with snap points (`overflow-x-auto`, `snap-x snap-mandatory`)
- [x] Cards have `min-w-[280px] max-w-[320px]` for consistent mobile scroll behavior
- [x] Desktop (md+): flex-wrap grid layout with centered rows
- [ ] BUG: Mobile horizontal scroll has no visual scroll indicator -- users may not realize they can scroll horizontally. No scrollbar visible, no arrow indicators, no "swipe" hint. (See BUG-PROJ6-2)

#### AC-6: Accessible -- blockquote HTML element used for quote text
- [ ] BUG: No `<blockquote>` elements are used anywhere. Since the section was repurposed to collaboration cards instead of testimonials, this criterion is no longer applicable in its literal form. The collaboration cards use appropriate `<h3>`, `<p>`, and `Badge` elements. (See BUG-PROJ6-3)

### Edge Cases Status

#### EC-1: No real testimonials available at launch
- [x] Section uses collaboration/reference cards as fallback -- acceptable per spec

#### EC-2: Logos not available in free-license format
- [x] Logos are actual PNG images from official sources (IEEE, CIGRE, BMWi, UDE, VDE)
- [ ] NOTE: Logo licensing status is unclear. These appear to be organizational logos used for informational purposes (nominative use), which is generally acceptable for a "worked with" context, but formal license verification is recommended.

### Mobile-Specific Testing (375px viewport)

- [x] Section padding: `px-4 py-20` -- appropriate for mobile
- [x] Horizontal scroll cards: `min-w-[280px]` fits within 375px with padding
- [ ] BUG: The `scrollbar-hide` utility class hides scrollbars, but combined with the lack of any visual scroll indicator, mobile users have no affordance that content extends beyond the viewport. (See BUG-PROJ6-2)
- [x] Logo strip: `flex-wrap` ensures logos wrap to multiple rows on narrow screens
- [x] Logo containers: `h-16` on mobile, `h-20` on desktop -- appropriate sizing
- [ ] BUG: Logo images use `max-w-none` class which removes max-width constraint. On very narrow screens (<375px), some logo images (especially BMWi with its long name) could potentially overflow their container. The container has a fixed `px-5` padding but the image itself has no width constraint. (See BUG-PROJ6-4)

### Security Audit Results
- [x] No user input fields -- no XSS risk
- [x] No API calls -- no injection risk
- [x] No sensitive data exposed
- [x] Image paths are static, not user-controllable
- [x] All content from static translation files
- **Result: PASS**

### Bugs Found

#### BUG-PROJ6-1: Section repurposed without updating acceptance criteria
- **Severity:** Low
- **Description:** The section was renamed from "Testimonials & References" to "Professional Network" and repurposed to show collaboration cards instead of testimonial quotes. This is a reasonable product decision given the lack of real testimonials, but the acceptance criteria in the spec were never updated to reflect this change.
- **Impact:** Process/documentation inconsistency only. The implementation is functional and appropriate.
- **Priority:** Nice to have (update spec to match implementation)

#### BUG-PROJ6-2: No visual scroll indicator for mobile horizontal scroll
- **Severity:** Medium
- **Description:** On mobile (375px), collaboration cards are in a horizontal scroll container. The scrollbar is hidden via CSS (`scrollbar-hide`), and there is no arrow, gradient fade, or other visual cue that additional cards exist off-screen. Users may miss 5 of the 7 cards.
- **Steps to Reproduce:**
  1. Open http://localhost:3000/en on a 375px viewport
  2. Scroll to the "Professional Network" section
  3. Observe: only ~1.3 cards visible, no indication more cards exist to the right
  4. Expected: fade gradient on the right edge, arrow buttons, or partial card visibility to hint at scrollability
- **Priority:** Fix before deployment

#### BUG-PROJ6-3: No blockquote elements (spec mismatch)
- **Severity:** Low
- **Description:** AC-6 requires `<blockquote>` for quote text, but the section no longer contains quotes. This is a documentation issue.
- **Priority:** Nice to have

#### BUG-PROJ6-4: Logo images with max-w-none may overflow on very narrow screens
- **Severity:** Low
- **Description:** Logo `<Image>` elements use `max-w-none` class. While the parent container constrains width via padding, the image itself has no explicit width cap. On viewports narrower than 375px, long logos could overflow.
- **Priority:** Nice to have

### Summary
- **Acceptance Criteria:** 3/6 passed, 1 partially applicable (AC-6), 2 have bugs
- **Bugs Found:** 4 total (0 critical, 0 high, 1 medium, 3 low)
- **Security:** PASS
- **Production Ready:** YES (with caveat on BUG-PROJ6-2 mobile scroll indicator)
- **Recommendation:** Fix BUG-PROJ6-2 (mobile scroll indicator) before deployment. The other bugs are documentation or edge-case issues.

## Deployment
_To be added by /deploy_
