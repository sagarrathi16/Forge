# DECISIONS.md

## 1. Executive Architectural Overview

In terms of Forge architecture planning, the primary design objective was to have a fast and elegant experience for landing product development along with a robust backend API that would help capture waitlists.

In order to ensure that the application remains performant and easily maintainable, the data structure is classified into two parts:
- **Static & Product Copy** → Saved in local JSON modules (`src/data/*.json`)
- **Dynamic User Submissions** → Saved in PostgreSQL using Supabase along with Row Level Security (RLS)

This helps ensure that all operations in the database are related to the users, while static product copy loads immediately without any queries to the database.
---

## 2. The Framework & Language Choice: Why Next.js (App Router) & TypeScript?

### The Decision
Implement the app using **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

### The Key Technological Rationale

1. **Consistent App Architecture**: Next.js enables development of both the frontend pages (`/`, `/templates`, `/community`) and the backend API endpoint (`POST /api/waitlist`) within one repo. This eliminates the necessity of having client and server repos for an MVP app.
2. **Type Safety at Compile Time**: TypeScript ensures type safety in UI props, static JSON datasets, and API payload contracts, which helps avoid potential bugs at runtime.
3. **Static Site Generation (SSG)**: Pages generation at the build time results in sub-millisecond first load times and improved SEO.
4. **Dark Mode High-Density Charcoal Utility Theme in Tailwind CSS v4**: Theme variables specified in `src/app/globals.css` create a dark-mode high-density charcoal theme with technical stroke borders and electric indigo accents.

### Alternative Considered: Separate React SPA + Express/Fastify API
I considered building a standalone Vite/React SPA connected to an Express or Fastify backend API. While viable, managing CORS headers, dual deployments, and separate environment configurations added friction without offering any performance advantage over Next.js Route Handlers.

---

## 3. Storage Strategy: Why Supabase (PostgreSQL)?

### Decision
Use **PostgreSQL via Supabase** for waitlist persistence and Row Level Security.

### Technical Reasons
1. **Data Integrity in Relational Model**: PostgreSQL is suitable for user record tables that are id, email, created_at.
2. **Unique Case Insensitive Index**: `CREATE UNIQUE INDEX waitlist_email_unique_idx ON public.waitlist (LOWER(email))` ensures there is no registration duplication via the database index, avoiding race condition.
3. **Row Level Security (RLS)**: Supabase's RLS allows publicly accessible `INSERT` request but restricts unauthorized `SELECT` read access to maintain user email confidentiality.

### But why not store everything in PostgreSQL Database?
If all the product descriptions are stored in PostgreSQL, then:
- More database queries for every request to any page
- Schema migrations for any update to static text data
- No need for extra database connections
- No extra deployment dependencies

Therefore, the static demo texts will remain in JSON files (`src/data/*.json`).

---

## 4. Multi-Page Routing Design vs. Single-Page Scrolling

### Choice
Build separate routes for **Starter Kits & Templates** (`/templates`) and **Community Showcase** (`/community`) to keep the landing page (`/`) clean and centered around the key message.

### Technical & UX Rationale
1. **Cognitive Overload & Visual Hierarchy**: Putting lots of template cards, filters, and community showcase items on the landing page will create visual clutter and increase DOM weight.
2. **User Expectations & Experience**: When the user clicks on "Templates" or "Community" from the navbar, they are expecting a dedicated view with searching, filtering capabilities, and copyable commands.
3. **SEO & Deep Links**: Separate URLs will enable deep links to the starter kits or community showcase projects.
---

## 5. Double Validation Strategy (Client + Server)

### Decision
Implement email validation on both the client-side React form component and the server-side Next.js Route Handler.

### Technical Reasons
- **Client-side Form Validation**: Offers immediate feedback to users for empty or invalid input prior to the execution of any network request.
- **Server-side Form Validation**: One can't rely on client-side form validation for ensuring security since it is possible to bypass client-side validation using cURL, Postman, or scripts.

---

## 6. Form UI State Machine Design

### Decision
Model the waitlist form using an explicit 5-state machine (*Default*, *Submitting*, *Success*, *Duplicate*, *Error*).

### Technical Reasons
- Prevents accidental multiple submissions by disabling the submit button during pending requests (`Joining...`).
- Provides explicit user feedback banners for duplicate emails (`409 Conflict`), invalid formats (`400 Bad Request`), and server failures (`500 Internal Error`).

---

## 7. Testing Strategy: Why Vitest?

### Decision
Use **Vitest** for automated unit and API integration testing.

### Technical Reasons
1. **Instant Execution**: Vitest executes native TypeScript tests with zero build delay, completing the test suite in under 300ms.
2. **Next.js Integration**: Allows direct testing of standalone utility functions (`validation.ts`) and API Route Handlers (`route.ts`).

---

## 8. What Was Deliberately NOT Built Yet

To maintain a clean MVP focus, the following features were deliberately postponed:
- **User Authentication / OAuth UI**: Full login/signup flows are postponed until the product dashboard is built.
- **Dynamic Database CMS for Templates**: Templates remain in static JSON files for fast iteration.
- **Live WebSocket Chat**: Community interaction is currently showcased via static project cards and testimonials.

---

## 9. Production Readiness Roadmap

Before deploying Forge to a high-traffic production environment, the following improvements would be added:
1. **Rate Limiting**: Integrate Redis (Upstash) to throttle `/api/waitlist` requests (e.g., max 5 submissions per IP per minute).
2. **Bot Protection**: Add Cloudflare Turnstile or hCaptcha to the waitlist form.
3. **Double Opt-in Email Verification**: Send a confirmation link via Resend or Postmark before marking emails active.
4. **End-to-End Testing**: Add Playwright E2E tests for visual regression and cross-browser testing.
