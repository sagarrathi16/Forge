# Forge — Developer Platform Landing Page & Waitlist API

Link - [https://forge-alpha-liart.vercel.app/](https://forge-alpha-liart.vercel.app/) 

Forge is a development platform built to enable early-stage developers to bring software ideas from conception to production. It comprises a set of carefully selected starter templates, AI-powered development, deployment with one click globally at the edge, and a showcase community.

This repo consists of the entire frontend landing site, multi-page routing (`/templates`, `/community`), backend waitlist API, Supabase Database configured with RLS, and a Vitest testing suite.

---

## Technical Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Testing**: Vitest (Unit & API Integration tests)
- **Deployment Target**: Vercel

---

## Documentation

Comprehensive technical documentation is organized inside the [`docs/`](docs/) directory:
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Technical system design, frontend structure, waitlist API flow, Supabase schema & RLS security rules.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — Architecture decisions, framework selection rationale, trade-offs, and production roadmap.

---

## Features Built

- **Technical UI with High Density**: Dark charcoal color scheme with technical stroke borders and electric indigo accent colors that follow design system guidelines.
- **Visuals for Hero and Interactive CLI**: Simple 2-line headline structure with a code terminal that demonstrates `forge-cli` commands.
- **Page for Starter Kits (`/templates`)**: Filtering based on categories (`Full-Stack`, `Frontend`, `AI / ML`, `Systems`), one click copy-able commands in CLI.
- **Community Showcase Page (`/community`)**: Cards for project showcase that contain information about community projects, demos, technology used, stars, upvotes, and feedback from developers.
- **API for Waitlist (`POST /api/waitlist`)**: Double validation (Client side and Server side), email duplication check (`409 Conflict`), and Supabase REST API integration.
- **State Management**: Reactive UI feedback states (*Default*, *Submitting*, *Success*, *Duplicate*, *Error*).
---

## Local Development Setup

### 1. Prerequisites
- Node.js `v18+` or `v20+` installed.

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/sagarrathi16/Forge.git
cd Forge
npm install
```

### 3. Configure Environment Variables
Create or edit your `.env` file in the root directory:

```env
# Supabase Project Credentials
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"

# Application URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NODE_ENV="development"
```

*(Note: If Supabase env variables are missing during local testing, the backend automatically falls back to an in-memory waitlist set so you can test locally without needing live credentials).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database & Row Level Security (RLS) Setup

If you want to persist waitlist entries, starter templates, and community projects in your Supabase project:

1. Log into your [Supabase Dashboard](https://supabase.com).
2. Go to **SQL Editor** $\rightarrow$ **New Query**.
3. Copy and run the complete contents of [supabase_schema.sql](supabase_schema.sql).

This provisions:
- `public.waitlist`: Email waitlist storage with case-insensitive unique index (`LOWER(email)`).
- `public.templates`: Starter kit templates, categories, tech tags, and CLI commands.
- `public.community_projects`: Shared builder projects with live reaction counters (`stars` and `upvotes`).
- `public.community_testimonials`: Verified builder quotes and reviews.
- `public.community_stats`: Platform metrics counters.
- **Row Level Security (RLS)**: Public read policies for templates, projects, testimonials, and stats, with strict read protection for waitlist emails.

---

## Testing

Automated testing is configured using **Vitest**. The test suite includes unit tests for validation and integration tests for `/api/waitlist`, `/api/templates`, and `/api/community` route handlers.

Run the test suite:
```bash
npm run test
```

### What is Tested (14 Tests, 100% Passing)
- `src/__tests__/validation.test.ts` (6 tests):
  - Valid standard and complex tagged email addresses
  - Empty, missing, or whitespace-only inputs
  - Malformed email strings
  - Max length limit enforcement (254 chars)
- `src/__tests__/waitlist-api.test.ts` (4 tests):
  - `400 Bad Request` on missing or invalid email payloads
  - `201 Created` on valid email submission
  - `409 Conflict` when submitting duplicate emails
- `src/__tests__/templates-api.test.ts` (1 test):
  - `GET /api/templates`: Returns starter kit templates with `200 OK`
- `src/__tests__/community-api.test.ts` (3 tests):
  - `GET /api/community`: Returns projects, testimonials, and stats with `200 OK`
  - `POST /api/community`: Rejects invalid reaction payloads with `400 Bad Request`
  - `POST /api/community`: Updates reaction count with `200 OK`

---

## Deployment Instructions

### Deploy to Vercel
1. Push your code to GitHub.
2. Import your repository into [Vercel](https://vercel.com).
3. In Project Settings $\rightarrow$ **Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
4. Click **Deploy**.

---

## Known Limitations & Production Improvements

If given additional development time for a full production release, I would implement:
1. **Rate Limiting / Abuse Protection**: Introduce Redis (Upstash) rate limiting on `/api/waitlist` to prevent automated spamming (e.g. max 5 requests per IP per minute).
2. **Bot Prevention**: Integrate Cloudflare Turnstile or hCaptcha on the waitlist form.
3. **Double Opt-in Email Verification**: Send a transactional confirmation email via Resend/Postmark before finalizing waitlist activation.
4. **End-to-End Testing**: Add Playwright E2E tests for browser form interaction and responsive viewports.
