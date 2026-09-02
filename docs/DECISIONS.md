# DECISIONS.md

## 1. Executive Architectural Summary

When planning the architecture for Forge, the core engineering goal was to create a fast, polished developer product landing experience combined with a reliable backend API for waitlist capture.

To keep the application performant and easy to maintain, the data layer is split into two categories:
- **Static & Showcase Content** → Stored as local JSON modules (`src/data/*.json`)
- **Dynamic User Submissions** → Stored in PostgreSQL via Supabase with Row Level Security (RLS)

This decision ensures database operations stay focused on user data, while static product copy loads instantly with zero database query overhead.

---

## 2. Framework & Language Choice: Why Next.js (App Router) & TypeScript?

### Decision
Build the application using **Next.js 16 (App Router)** with **TypeScript** and **Tailwind CSS v4**.

### Key Technical Reasons

1. **Unified Application Architecture**: Next.js allows us to build the frontend pages (`/`, `/templates`, `/community`) and the backend API endpoint (`POST /api/waitlist`) inside a single repository. This avoids managing separate client and server repositories for an MVP product.
2. **Compile-Time Type Safety**: TypeScript enforces strict types across UI props, static JSON datasets, and API payload contracts, preventing runtime errors.
3. **Static Page Generation (SSG)**: Pre-rendering the landing pages at build time guarantees sub-millisecond initial page loads and superior SEO performance.
4. **Tailwind CSS v4 Utility Theme**: Theme variables defined in `src/app/globals.css` provide a cohesive dark-mode high-density charcoal aesthetic with technical stroke borders and electric indigo primary accents.

### Alternative Considered: Separate React SPA + Express/Fastify API
We considered building a standalone Vite/React SPA connected to an Express or Fastify backend API. While viable, managing CORS headers, dual deployments, and separate environment configurations added friction without offering any performance advantage over Next.js Route Handlers.

---

## 3. Storage Strategy: Why Supabase (PostgreSQL)?

### Decision
Use **PostgreSQL via Supabase** for waitlist persistence and Row Level Security.

### Technical Reasons
1. **Relational Data Integrity**: PostgreSQL is ideal for structured user records (`id`, `email`, `created_at`).
2. **Case-Insensitive Unique Index**: Enforcing `CREATE UNIQUE INDEX waitlist_email_unique_idx ON public.waitlist (LOWER(email))` prevents duplicate registrations at the database layer, eliminating race conditions.
3. **Row Level Security (RLS)**: Supabase RLS policies permit public anonymous `INSERT` requests while strictly blocking unauthorized `SELECT` reads, protecting user email privacy.

### Why not store all product copy in PostgreSQL?
Storing features, templates, testimonials, and community projects in PostgreSQL would introduce:
- Extra database queries on every page request
- Schema migration files for static text changes
- Unnecessary database connection pooling overhead
- Additional deployment dependencies

Therefore, static demo copy remains in JSON modules (`src/data/*.json`).

---

## 4. Multi-Page Routing Architecture vs Single-Page Scroll

### Decision
Create dedicated routes for **Starter Kits & Templates** (`/templates`) and **Community Showcase** (`/community`), keeping the main landing page (`/`) focused on the core product story.

### Technical & UX Reasons
1. **Cognitive Load & Visual Hierarchy**: Packing dozens of template cards, filtering tabs, and community showcase projects onto the main landing page causes visual clutter and inflates DOM size.
2. **Dedicated UX Flows**: Users clicking "Templates" or "Community" in the navbar expect dedicated, focused views with search, category filtering, and copyable CLI commands.
3. **SEO & Deep Linking**: Separate URLs allow users and search engines to link directly to starter templates or community projects.

---

## 5. Double Validation Strategy (Client + Server)

### Decision
Implement email validation on both the client-side React form component and the server-side Next.js Route Handler.

### Technical Reasons
- **Client Validation**: Provides instant user feedback on empty or invalid inputs before triggering a network request, improving form UX.
- **Server Validation**: Client validation cannot be trusted as a security boundary. Server-side validation using RFC 5322 regex checks ensures invalid payloads submitted via cURL, Postman, or custom scripts never reach the database.

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
