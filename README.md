# Forge — Developer Platform Landing Page & Waitlist API

Forge is a developer platform designed to help young developers take software ideas from concept to production. It combines curated starter templates, AI-assisted development tools, one-click global edge deployment, and a community showcase.

This repository contains the complete frontend landing website, multi-page routing (`/templates`, `/community`), backend waitlist API, Supabase database configuration with Row Level Security (RLS), and an automated Vitest test suite.

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

- **High-Density Technical UI**: Customized dark charcoal theme with technical stroke borders and electric indigo primary accents matching the design system specifications.
- **Hero & Interactive CLI Visual**: Clean 2-line headline layout with a code terminal preview simulating `forge-cli` commands.
- **Dedicated Starter Kits Page (`/templates`)**: Interactive category filtering (`Full-Stack`, `Frontend`, `AI / ML`, `Systems`) and one-click copyable CLI commands.
- **Community Showcase Page (`/community`)**: Project showcase cards detailing community builds, demo links, tech tags, stars, upvotes, and developer testimonials.
- **Waitlist API (`POST /api/waitlist`)**: Full double validation (client-side and server-side), duplicate email detection (`409 Conflict`), and Supabase REST integration.
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

If you want to persist waitlist entries in a live Supabase project:

1. Log into your [Supabase Dashboard](https://supabase.com).
2. Go to **SQL Editor** $\rightarrow$ **New Query**.
3. Copy and run the contents of [supabase_schema.sql](supabase_schema.sql):

```sql
-- Create Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Case-Insensitive Unique Index
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique_idx ON public.waitlist (LOWER(email));

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow Public Submissions
CREATE POLICY "Allow public waitlist submissions"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (length(trim(email)) > 0);

-- Restrict Reading Entries to Service Role
CREATE POLICY "Restrict select to service role"
  ON public.waitlist
  FOR SELECT
  TO service_role
  USING (true);
```

---

## Testing

Automated testing is configured using **Vitest**. The test suite includes unit tests for email validation and integration tests for the `POST /api/waitlist` route.

Run the test suite:
```bash
npm run test
```

### What is Tested
- `src/__tests__/validation.test.ts`:
  - Valid standard and complex tagged email addresses
  - Empty, missing, or whitespace-only inputs
  - Malformed email strings
  - Max length limit enforcement (254 chars)
- `src/__tests__/waitlist-api.test.ts`:
  - `400 Bad Request` on missing or invalid email payloads
  - `201 Created` on valid email submission
  - `409 Conflict` when submitting duplicate emails

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
