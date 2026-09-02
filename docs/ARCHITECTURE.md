# ARCHITECTURE.md

## 1. Overview & System Goals

Forge is a developer platform landing application that aims to help aspiring developers turn their software ideas into something real and production-ready. The primary objective of the application is to facilitate a seamless onboarding process for creators:

**Choose an idea → Develop your project → Deploy your project → Share your project**

The architecture of the application is divided into two main subsystems:
1. **Frontend Application**: Multi-page Next.js web application responsible for the primary landing page, templates page ([/templates](src/app/templates/page.tsx)), and builds community page ([/community](src/app/community/page.tsx)).
2. **Backend API & Data Tier**: Next.js Route Handler (`POST /api/waitlist`) linked with Supabase (PostgreSQL) that implements Row Level Security (RLS) for waitlist data management and validation.

The architecture is focused on providing great product UX, aesthetic design, responsiveness, performance, and server-side input validation.
---

## 2. Tech Stack & Justification

### Frontend Layer
- **Next.js 16 (App Router)**: Performs server side rendering (SSR), static page generation (SSG), file-based routing and API route handlers within one consistent framework.
- **TypeScript**: Performs strict compile time type safety checks for component properties, static data types and API payloads.
- **Tailwind CSS v4**: Utility based CSS framework that is customized with custom theme variables in order to provide dark mode high-density charcoal look and feel with technical stroke borders and electric indigo primary colors.

### Backend Layer
- **Next.js Route Handler**: `/api/waitlist POST` processes JSON requests, performs server side validations, queries Supabase and returns standard HTTP status codes (`201`, `400`, `409`, `500`).

### Database Layer & Security
- **PostgreSQL (via Supabase)**: Persistently stores waitlist requests in `public.waitlist` table using a unique index `LOWER(email)`.
- **Row Level Security (RLS)**: Ensures database security policies that only allow public anonymous inserts and restrict SELECT queries to `service_role` administrators.

### Static Data Tier
Product content that does not require database persistence is maintained as local JSON files in `src/data/`:
- `features.json` — Core platform capabilities
- `templates.json` — Starter kit templates & CLI commands
- `projects.json` — Community showcase builds & reaction stats
- `statistics.json` — Platform metric counters
- `testimonials.json` — Developer quotes & roles
- `navigation.json` — Header & footer link metadata

---

## 3. High-Level System Architecture

```text
┌───────────────────────────────────────────────────────────────────┐
│                           User Browser                            │
│                                                                   │
│  Landing Page (/)    Templates (/templates)   Community (/community) │
└─────────────────────────────────┬─────────────────────────────────┘
                                  │
                   ┌──────────────┴──────────────┐
                   │                             │
                   ▼                             ▼
      ┌──────────────────────────┐   ┌──────────────────────────┐
      │ Static JSON Data Modules │   │  Interactive Form UI     │
      │ (templates, projects)    │   │  (Client-side validation)│
      └──────────────────────────┘   └────────────┬─────────────┘
                                                  │
                                                  │ POST /api/waitlist
                                                  ▼
                                     ┌──────────────────────────┐
                                     │ Next.js Route Handler    │
                                     │ (Server-side validation) │
                                     └────────────┬─────────────┘
                                                  │
                                                  ▼
                                     ┌──────────────────────────┐
                                     │  Supabase (PostgreSQL)   │
                                     │  RLS Table: waitlist     │
                                     └──────────────────────────┘
```

---

## 4. Frontend Structure & Component Breakdown

```text
src/
├── app/
│   ├── layout.tsx                # Root layout with fonts & metadata
│   ├── page.tsx                  # Main landing page
│   ├── globals.css               # Theme colors, CSS variables & animations
│   ├── templates/
│   │   └── page.tsx              # Dedicated Starter Kits page (/templates)
│   ├── community/
│   │   └── page.tsx              # Dedicated Community Showcase page (/community)
│   └── api/
│       └── waitlist/
│           └── route.ts          # Waitlist API endpoint (POST)
│
├── components/
│   ├── navbar/                   # Navigation header with routing links
│   ├── hero/                     # Main headline & forge-cli terminal card
│   ├── features/                 # Core capabilities grid
│   ├── templates/                # Interactive templates grid & category filters
│   ├── audience/                 # Value prop breakdown (Who, Why, Difference)
│   ├── how-it-works/             # 4-step process guide
│   ├── social-proof/             # Community builds grid & statistics
│   ├── waitlist/                 # Form state management & API integration
│   └── footer/                   # Footer links & copyright
│
├── data/
│   ├── features.json
│   ├── templates.json
│   ├── projects.json
│   ├── statistics.json
│   └── navigation.json
│
├── lib/
│   ├── db.ts                     # Supabase REST client interface & fallback
│   └── validation.ts             # RFC 5322 email regex validation logic
│
├── types/
│   └── index.ts                  # TypeScript definitions
│
└── __tests__/
    ├── validation.test.ts        # Vitest unit tests for validation
    └── waitlist-api.test.ts      # Vitest integration tests for API route
```

### Components Breakdown

#### Navbar (`src/components/navbar/index.tsx`)
- Offers sticky header navigation, branding (Forge), links (`Features`, `Templates`, `How it works`, `Community`), and primary waitlist CTA button.
- Mobile navigation layout.

#### Hero (`src/components/hero/index.tsx`)
- Shows the main product tagline ("*From 'I have an idea' to 'I built it.'*") displayed clearly over two lines.
- Supporting product text, primary CTA ("*Join the waitlist*"), and secondary CTA ("*See how it works*").
- Interactive `code terminal` card displaying `forge-cli` command line (`forge init`/`forge deploy`) and live output preview.

#### Capabilities / Features (`src/components/features/index.tsx`)
- Shows 4 capabilities cards with Material Symbols (`auto_awesome_mosaic`, `smart_toy`, `rocket_launch`, `forum`) and numbered badges (`01` - `04`).

#### Templates Page & Component (`src/app/templates/page.tsx` & `src/components/templates/index.tsx`)
- Independent page route serving production-ready starter kits.
- Interactive category filter tabs (`All`, `Full-Stack`, `Frontend`, `AI / ML`, `Systems`).
- Copyable `forge-cli` commands with visual feedback.

#### Audience & Value Proposition (`src/components/audience/index.tsx`)
- 3-column explanation of *Who it is for* (Builders with Ideas), *Why use it* (Frictionless Flow), and *What's different* (Ship, Not Just Learn).

#### How It Works (`src/components/how-it-works/index.tsx`)
- Explanation of the 4-step user process: `1. Choose your path` → `2. Build` → `3. Deploy` → `4. Share`.

#### Community Showcase Page & Component (`src/app/community/page.tsx` & `src/components/social-proof/index.tsx`)
- Community showcase page showing platform statistics, projects that developers built and contributed to (*DevPulse*, *PixelCraft*, *EchoDB*, *AgentFlow*, *HyperScale*, *TaskCraft*), demo links, star & upvote count, and verified testimonials from developers.

#### Waitlist Form (`src/components/waitlist/index.tsx`)
- Email signup form with client-side regex validation, loading button state (`Joining...`) and dynamic feedback banners (*Success*, *Duplicate*, *Error*).

#### Footer (`src/components/footer/index.tsx`)
- Navigation items, legal & privacy policy placeholders
---

## 5. Waitlist API & Backend Architecture

The waitlist backend handles incoming POST requests to `/api/waitlist`.

### HTTP Request Payload
```http
POST /api/waitlist
Content-Type: application/json

{
  "email": "developer@example.com"
}
```

### HTTP Response Specifications

#### 1. Success (`201 Created`)
```json
{
  "success": true,
  "message": "You have been successfully added to the waitlist!"
}
```

#### 2. Invalid Input (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Please enter a valid email address."
}
```

#### 3. Duplicate Email (`409 Conflict`)
```json
{
  "success": false,
  "error": "This email address is already on the waitlist."
}
```

#### 4. Internal Error (`500 Internal Server Error`)
```json
{
  "success": false,
  "error": "Internal server error. Please try again later."
}
```

### Data Flow Diagram

```text
User Submits Email
       │
       ▼
Client Validation (validation.ts)
       │
       ├── invalid → Show instant client error
       │
       └── valid
             │
             ▼
POST /api/waitlist Route Handler
       │
       ▼
Server Validation (RFC 5322 regex)
       │
       ├── invalid → Return 400 Bad Request
       │
       └── valid
             │
             ▼
Supabase REST API (db.ts)
       │
       ├── unique constraint violation (23505) → Return 409 Conflict
       │
       ├── database error → Return 500 Internal Server Error
       │
       └── inserted successfully → Return 201 Created
             │
             ▼
Update Form UI State & Display Banners
```

---

## 6. Database Schema & Row Level Security (RLS)

The persistent database tier is powered by Supabase (PostgreSQL).

### Table Schema DDL
```sql
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
```

### Case-Insensitive Unique Index
```sql
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique_idx ON public.waitlist (LOWER(email));
```

### Row Level Security Policies
```sql
-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public (anon + authenticated) to submit waitlist emails
CREATE POLICY "Allow public waitlist submissions"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (length(trim(email)) > 0);

-- Policy 2: Restrict SELECT queries exclusively to service_role (admins)
CREATE POLICY "Restrict select to service role"
  ON public.waitlist
  FOR SELECT
  TO service_role
  USING (true);
```

---

## 7. Form UI State Machine

The waitlist form component uses an explicit state machine to handle visual feedback:

```text
       [ DEFAULT ]
            │
            │ Submit Form
            ▼
     [ SUBMITTING ]  ---> Button disabled, text "Joining..."
            │
      POST /api/waitlist
            │
   ┌────────┼────────┬────────────────┐
   ▼        ▼        ▼                ▼
[ 201 ]  [ 400 ]  [ 409 ]          [ 500 ]
Success  Invalid Duplicate        Server Error
   │        │        │                │
   ▼        ▼        ▼                ▼
SUCCESS   ERROR    DUPLICATE       ERROR UI
Message  Message   Message        & Retry path
```

---

## 8. Responsive Architecture & Accessibility (WCAG)

### Responsive Breakpoints
- **Desktop** (`≥ 1440px`): Full 12-column grid layout, 64px margins, code terminal preview alongside headline.
- **Tablet** (`768px - 1024px`): 2-column feature and template grids, collapsible navigation.
- **Mobile** (`< 768px`): Single column stacked layout, 16px margins, touch target sizes $\ge 44\text{px}$.

### Accessibility Standards
- **Semantic Structure**: Built using `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, and `<form>`.
- **Keyboard Usability**: All buttons and links feature visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary`).
- **Screen Reader Support**: Form feedback banners use `role="status"` and `role="alert"` for ARIA announcements.
- **Reduced Motion**: Animations (`.fade-in-up`) respect `prefers-reduced-motion`.

---

## 9. Performance & Rendering Strategy

- **Static Page Generation (SSG)**: Landing page (`/`), Templates (`/templates`), and Community (`/community`) are pre-rendered at build time.
- **Minimal Dependencies**: Avoided heavy component libraries or unnecessary UI frameworks.
- **Turbopack Build**: Application compiles production builds in under 400ms.
- **Font Optimization**: Google Fonts (`Inter`, `JetBrains Mono`) are loaded efficiently without blocking paint.

---

## 10. Automated Testing Architecture

Testing is implemented using **Vitest**:
- **Unit Tests** (`src/__tests__/validation.test.ts`): Tests email validation logic for valid, malformed, empty, whitespace, and over-length strings.
- **API Integration Tests** (`src/__tests__/waitlist-api.test.ts`): Tests Next.js Route Handler HTTP responses (`201 Created`, `400 Bad Request`, `409 Conflict`).

---

## 11. Deployment Architecture

- **Hosting**: Deployed on Vercel Edge Network.
- **Database**: Connected via Supabase REST API & PostgreSQL pool.
- **Environment Configuration**: Secrets managed via `.env` variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`).
