# PROJ-4: Projects & Portfolio Section

## Status: In Progress
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
_To be added by /qa_

## Deployment
_To be added by /deploy_
