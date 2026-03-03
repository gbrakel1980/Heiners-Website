# Product Requirements Document

## Vision
BCC Cable Consulting is a specialized engineering consultancy directed by Prof. Dr.-Ing. Heinrich Brakelmann — a world-leading authority in high-voltage and high-current cable systems with over 110 completed projects. The new website is a bold, high-impact digital presence designed to attract qualified international clients in the energy sector and convert them into consulting inquiries by instantly establishing Brakelmann's unmatched expertise and authority.

## Target Users
**Primary:** Engineering decision-makers, project managers, and procurement leads at energy companies, offshore wind developers, transmission system operators, and grid utilities (Germany and international).

**Their needs and pain points:**
- Need highly specialized expertise in cable technology for complex offshore/onshore energy projects
- Hard to find consultants who combine academic depth (Professor emeritus, published researcher) with real-world project delivery (110+ projects)
- Must quickly assess credibility from a website — within seconds
- Operate both in English and German

## Core Features (Roadmap)

| Priority | Feature | Status |
|----------|---------|--------|
| P0 (MVP) | Website Foundation & Bilingual Navigation | Planned |
| P0 (MVP) | Hero & About — Brakelmann Profile | Planned |
| P0 (MVP) | Services Section | Planned |
| P0 (MVP) | Projects & Portfolio Section | Planned |
| P0 (MVP) | Contact Form with Email Delivery | Planned |
| P1 | Testimonials & References | Planned |
| P1 | Publications & Awards | Planned |

## Success Metrics
- Contact form submission rate > 2% of page visits
- Time to understand Brakelmann's expertise < 5 seconds on the hero section
- Page load < 2s (Core Web Vitals green)
- Mobile-responsive on all devices (375px–1440px)
- Bilingual coverage: 100% of content available in EN and DE

## Constraints
- Single developer build
- No database needed (static content + email delivery for contact)
- Contact form via Resend email API
- Bilingual: English + German (next-intl)
- Free-license images from Unsplash/Pexels for visual assets

## Non-Goals
- Blog or CMS for content updates
- E-commerce or payment processing
- Client portal or user authentication
- Languages beyond English and German
- Automated chatbot or AI assistant

---

Use `/requirements` to create detailed feature specifications for each item in the roadmap above.
