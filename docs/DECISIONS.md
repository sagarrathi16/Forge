# DECISIONS.md

## 1. Executive Architectural Overview

In terms of Forge architecture planning, the primary design objective was to have a fast, polished developer product experience with a robust backend API and complete database persistence.

To ensure the platform is dynamic, collaborative, and free of stale hardcoded files:
- **100% Database-Driven Dynamic Architecture** → All platform entities are persisted in PostgreSQL via Supabase:
  - `waitlist`: User email signups with case-insensitive unique constraints (`LOWER(email)`).
  - `templates`: Production starter kits with category tags and CLI scaffolding commands.
  - `community_projects`: Shared builder projects with real-time star and upvote reactions.
  - `community_testimonials`: Verified developer testimonials.
  - `community_stats`: Platform metric counters.

Zero business data is hardcoded in local JSON files. Everything is managed via Supabase tables governed by Row Level Security (RLS) policies.

---

## 2. Framework & Language Choice: Why Next.js (App Router) & TypeScript?

### The Decision
Implement the app using **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

### The Key Technological Rationale

1. **Unified Application Architecture**: Next.js enables development of both the frontend pages (`/`, `/templates`, `/community`) and the backend API endpoints (`/api/waitlist`, `/api/templates`, `/api/community`) within a single repository.
2. **Type Safety at Compile Time**: TypeScript enforces strict contracts across database models, component properties, and API payload schemas.
3. **Hybrid Rendering**: Combines static page pre-rendering for speed with dynamic server rendering for real-time templates and community data.
4. **Tailwind CSS v4 Utility System**: High-density charcoal aesthetic with technical stroke borders and electric indigo accents.

---

## 3. Storage Strategy: Why Supabase (PostgreSQL) for All Platform Entities?

### Decision
Migrate all data—starter templates, community projects, builder testimonials, platform metrics, and waitlist submissions—to **PostgreSQL via Supabase** with Row Level Security (RLS).

### Technical Reasons
1. **Dynamic Community Interaction**: Storing community builds in the database allows real-time live reactions (`stars` and `upvotes`) that persist across sessions.
2. **Centralized Template Management**: Starter templates can be added, updated, or deprecated directly in PostgreSQL without requiring code redeployments.
3. **Data Integrity & Relational Model**: PostgreSQL guarantees structured typing, default UUID generation, and unique constraint enforcement.
4. **Row Level Security (RLS)**:
   - Anonymous visitors can view templates, submit waitlist entries, read community projects, and increment reactions.
   - Waitlist email lists are strictly locked down from public read access.

---

## 4. Multi-Page Routing Design vs. Single-Page Scrolling

### Choice
Build separate routes for **Starter Kits & Templates** (`/templates`) and **Community Showcase** (`/community`) to keep the landing page (`/`) focused and lightweight.

### Technical & UX Rationale
1. **Cognitive Load & Visual Hierarchy**: Consolidating dozens of template cards, filtering tabs, and community showcase projects onto one page creates unnecessary DOM bloating.
2. **Dedicated Views**: Users navigating to "Templates" or "Community" receive dedicated, focused interfaces with category filtering and live demo links.
3. **Deep Linking & SEO**: Dedicated URLs allow direct linking to community showcases or starter templates.

---

## 5. Double Validation Strategy (Client + Server)

### Decision
Implement validation on both the client-side React form and the server-side Next.js Route Handler.

### Technical Reasons
- **Client Validation**: Instant user feedback on empty or malformed inputs before triggering network traffic.
- **Server Validation**: Protects the database against invalid payloads sent via cURL, automated bots, or direct API requests.

---

## 6. Testing Strategy: Why Vitest?

### Decision
Use **Vitest** for automated unit and API integration testing (`npm run test`).

### Technical Reasons
1. **Instant Execution**: Vitest executes native TypeScript tests with zero build delay, completing 14 tests across 4 test suites in under 300ms.
2. **Route Handler Integration**: Tests Next.js Route Handlers (`/api/waitlist`, `/api/templates`, `/api/community`) directly in an isolated test runner.

---

## 7. Production Readiness Roadmap

1. **Redis Rate Limiting**: Throttle API requests to prevent abuse.
2. **Bot Protection**: Integrate Cloudflare Turnstile on form submission.
3. **Double Opt-in Verification**: Send confirmation emails via Resend or Postmark.
4. **End-to-End Testing**: Playwright cross-browser testing.
