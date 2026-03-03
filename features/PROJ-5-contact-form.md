# PROJ-5: Contact Form with Email Delivery

## Status: In Review
**Created:** 2026-02-25
**Last Updated:** 2026-02-25

## Dependencies
- Requires: PROJ-1 (Website Foundation) — design system, i18n, and layout in place

## User Stories
- As a potential client, I want to send an inquiry to BCC so that I can start a consulting conversation
- As a visitor, I want to see clear validation feedback so that I know my message was sent correctly
- As a visitor, I want a confirmation message after submission so that I know my inquiry was received
- As Heinrich Brakelmann, I want to receive inquiry emails with all relevant details so that I can follow up promptly
- As a German speaker, I want the form labels and error messages in German so that there is no confusion

## Acceptance Criteria
- [ ] Contact form with the following fields:
  - Full Name (required, min 2 chars)
  - Company / Organization (optional)
  - Email Address (required, valid email format)
  - Subject (required, min 5 chars)
  - Message (required, min 20 chars, max 2000 chars)
- [ ] Client-side validation with inline error messages (react-hook-form + Zod)
- [ ] Server-side validation in the API route (same Zod schema, never trust client)
- [ ] On successful submission: show a success toast/message, reset form
- [ ] On error: show an error message, preserve form values so user doesn't lose their text
- [ ] Email delivered to BCC's email address via Resend API (email address stored in environment variable)
- [ ] Email contains all form fields formatted clearly
- [ ] Form is fully bilingual: all labels, placeholders, error messages, and success message in EN/DE
- [ ] Honeypot field to prevent basic spam bots (hidden field that must remain empty)
- [ ] Rate limiting: max 5 submissions per IP per hour (via Vercel edge or simple in-memory check)
- [ ] Contact section also displays Brakelmann's direct contact info below the form:
  - Email: brakelmann.heinrich@gmail.com (clickable mailto link)
  - Phone: +49 2843 6391 (clickable tel link)
  - Mobile: +49 174 3224725 (clickable tel link)
  - Address: Schwalbenweg 8, D-47495 Rheinberg, Germany
  - University affiliation: Universität Duisburg-Essen, IW/ETS, Bismarckstr. 81, D-47048 Duisburg

## Edge Cases
- What if Resend API is down? → Return 503 error, show user-friendly error message ("Please try again later or contact us directly at [email]")
- What if the user submits twice quickly? → Disable submit button after first click until response received
- What if the email field has typos (e.g., "user@gmial.com")? → Validate format only; cannot verify deliverability on client
- What if the message is too long (>2000 chars)? → Show character counter, block submission, display error
- What if JavaScript fails? → Form still submits via native HTML POST (graceful degradation)
- What if the honeypot field is filled? → Silently return success without sending email (don't alert the bot)

## Technical Requirements
- API route: `/api/contact` (POST) — Next.js App Router route handler
- Email service: Resend (https://resend.com) — free tier sufficient for low volume
- Validation: Zod schema shared between client and server
- Form library: react-hook-form with zodResolver
- Environment variable: `RESEND_API_KEY`, `CONTACT_EMAIL_TO` (never hardcoded)
- Document both vars in `.env.local.example`
- shadcn/ui components: Input, Textarea, Button, Form, Label
- Bilingual: All text in /messages/en.json and /messages/de.json

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Components
- `ContactSection.tsx` — two-column layout: contact form (left) + direct contact info (right)
- Form built with shadcn/ui `Form`, `Input`, `Textarea`, `Button`, `Label`

### Validation Flow
1. Browser: react-hook-form + zodResolver validates on blur and submit
2. Server: `/api/contact/route.ts` re-validates with the same Zod schema before calling Resend
3. Honeypot: hidden `<input name="website">` field — if filled, API returns 200 silently without sending

### API Route: /api/contact (POST)
- Parses request body → validates with Zod → checks honeypot → calls Resend → returns JSON response
- `RESEND_API_KEY` and `CONTACT_EMAIL_TO` stored in environment variables (never in code)
- Both vars documented in `.env.local.example`

### Environment Variables Required
```
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=brakelmann.heinrich@gmail.com
```

## QA Test Results (2026-03-03)

### Build & Lint
- **Build:** PASS — `npm run build` succeeds, no TypeScript errors
- **Lint:** PASS — `npm run lint` clean, no warnings

### Acceptance Criteria Verification

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | Contact form fields (Name, Company, Email, Subject, Message) | PASS | All fields present with correct required/optional markers |
| 2 | Client-side validation (react-hook-form + Zod) | PASS | Validates on blur, inline error messages work |
| 3 | Server-side validation (same Zod schema) | PASS | Returns 400 with field-specific errors |
| 4 | Success toast + form reset on submit | PASS | Sonner toast shown, form resets |
| 5 | Error message + preserve form values | PASS | Form values preserved on error, error toast shown |
| 6 | Email via Resend API | PASS | Sends to CONTACT_EMAIL_TO with all fields formatted |
| 7 | Email contains all form fields | PASS | Includes name, company, email, subject, message |
| 8 | Bilingual (EN/DE) | PASS | All labels, placeholders, validation messages, success/error in both languages |
| 9 | Honeypot field | PASS | Fixed — silently returns 200 without sending email |
| 10 | Rate limiting (5/IP/hour) | PASS | Returns 429 after 5 requests per IP per hour |
| 11 | Contact info display | PASS | Email, phone, mobile (clickable), address, university |

### Edge Case Verification

| Edge Case | Status | Notes |
|-----------|--------|-------|
| Resend API down | PASS | Returns 503, user-friendly error message |
| Double submit | PASS | Button disabled while submitting, loading spinner shown |
| Invalid email format | PASS | Client & server validation rejects it |
| Message > 2000 chars | PASS | Character counter turns red, validation blocks submit |
| Honeypot filled | PASS | Silent 200 success, no email sent (fixed in this QA) |

### Security Audit

| Check | Status | Notes |
|-------|--------|-------|
| XSS in form fields | PASS | Resend API receives plain text, no HTML rendering of user input |
| Environment variables | PASS | RESEND_API_KEY and CONTACT_EMAIL_TO in .env.local (gitignored) |
| .env.local.example | PASS | Documents both vars with dummy values |
| Rate limiting | PASS | In-memory rate limiter, 5 req/IP/hour |
| Input validation | PASS | Server-side Zod validation on all inputs |
| No hardcoded secrets | PASS | All credentials via environment variables |

### Bugs Fixed During QA

**BUG-PROJ5-002: Honeypot field rejected by Zod validation (FIXED)**
- **Severity:** Critical
- **File:** `src/lib/contact-schema.ts`
- **Issue:** The honeypot `website` field had `z.string().max(0).optional()` in the Zod schema, which caused validation to reject any non-empty value with a 400 error. This revealed the honeypot to bots by returning the error `"Too big: expected string to have <=0 characters"` instead of silently accepting and ignoring.
- **Fix:** Changed to `z.string().optional()` — the API route's honeypot check (line 52-54 in route.ts) now handles detection silently.

### Open Production Items

**BUG-PROJ5-001: Production email configuration not yet completed**
- **Severity:** High
- **Status:** Open
- **Description:** The contact form email delivery is not yet configured for production use. The following steps must be completed once the domain is verified:
  1. Verify the domain in Resend (e.g., `bcc-cable.com`)
  2. Update the `from` address in `src/app/api/contact/route.ts` to a verified domain address, e.g. `noreply@bcc-cable.com`
  3. Set the environment variable `CONTACT_EMAIL_TO` to the production recipient email
- **Priority:** Must be completed before production launch
- **Blocked by:** Domain verification in Resend

**NOTE-PROJ5-001: Contact email display — testing only**
- **Severity:** Low (informational)
- **Status:** Acknowledged
- **Description:** `ContactInfo.tsx` currently shows `gerrit.brakelmann@gmail.com` for testing purposes. Must be updated to `brakelmann.heinrich@gmail.com` before production launch.

## Deployment
_To be added by /deploy_
