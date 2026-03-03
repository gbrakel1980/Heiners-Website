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
_To be added by /qa_

## Deployment
_To be added by /deploy_
