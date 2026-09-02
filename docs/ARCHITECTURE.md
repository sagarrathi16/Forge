# ARCHITECTURE.md

## 1. Overview & System Goals

Forge is a developer platform landing application that aims to help aspiring developers turn their software ideas into something real and production-ready. The primary objective of the application is to facilitate a seamless onboarding process for creators:

**Choose an idea → Develop your project → Deploy your project → Share your project**

The architecture of the application is divided into two main subsystems:
1. **Frontend Application**: Multi-page Next.js web application responsible for the primary landing page (`/`), templates page ([/templates](src/app/templates/page.tsx)), and dynamic community showcase page ([/community](src/app/community/page.tsx)).
2. **Backend API & Data Tier**: Next.js Route Handlers (`POST /api/waitlist`, `GET /api/templates`, `GET /api/community`, and `POST /api/community`) connected directly to Supabase (PostgreSQL) implementing Row Level Security (RLS) for waitlist capture, starter templates, community projects, and live star/upvote reactions.

The architecture is focused on providing great product UX, aesthetic design, responsiveness, performance, zero hardcoded JSON data, and server-side input validation.

---

## 2. Tech Stack & Justification

### Frontend Layer
- **Next.js 16 (App Router)**: Performs server-side rendering (SSR), dynamic data fetching, file-based routing and API route handlers within one consistent framework.
- **TypeScript**: Performs strict compile-time type safety checks for component properties, data models, and API payloads.
- **Tailwind CSS v4**: Utility-based CSS framework customized with semantic design system tokens providing a dark-mode high-density charcoal aesthetic with technical stroke borders and electric indigo accents.

### Backend Layer
- **Next.js Route Handlers**:
  - `POST /api/waitlist`: processes email submissions, performs RFC 5322 validation, inserts into Supabase, and returns standard HTTP status codes (`201`, `400`, `409`, `500`).
  - `GET /api/templates`: retrieves starter kit templates dynamically from PostgreSQL.
  - `GET /api/community`: retrieves community projects, verified builder testimonials, and platform statistics dynamically from PostgreSQL.
  - `POST /api/community`: processes live reaction increments (stars and upvotes) with database persistence.

### Database Layer & Security (Supabase PostgreSQL)
- **`public.waitlist`**: Stores waitlist emails using a case-insensitive unique index `LOWER(email)`.
- **`public.templates`**: Stores starter kit definitions, categories, tech tags, and CLI scaffolding commands.
- **`public.community_projects`**: Stores community builds, tech tags, demo links, star counts, and upvotes.
- **`public.community_testimonials`**: Stores verified developer testimonials and feedback.
- **`public.community_stats`**: Stores platform metric counters (`projects_built`, `community_members`, `projects_deployed`).
- **Row Level Security (RLS)**: Public anonymous visitors are permitted to read templates, community projects, testimonials, stats, and submit waitlist entries, while waitlist reads are strictly restricted to `service_role` administrators.

---

## 3. High-Level System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              User Browser                              │
│                                                                        │
│   Landing Page (/)     Templates (/templates)   Community (/community) │
└──────────────┬───────────────────────┬─────────────────────────┬───────┘
               │                       │                         │
               │ GET /api/templates    │ GET /api/community      │ POST /api/waitlist
               ▼                       ▼                         ▼
  ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
  │  Templates API Route   │  │  Community API Route   │  │   Waitlist API Route   │
  │   (GET /api/templates) │  │  (GET/POST /api/comm)  │  │  (Server-side valid.)  │
  └────────────┬───────────┘  └────────────┬───────────┘  └────────────┬───────────┘
               │                           │                           │
               ▼                           ▼                           ▼
  ┌────────────────────────────────────────────────────────────────────────────────┐
  │                             Supabase (PostgreSQL)                              │
  │                                                                                │
  │  • public.waitlist                 (RLS: anon insert, service_role read)       │
  │  • public.templates                (RLS: anon public read)                     │
  │  • public.community_projects       (RLS: anon public read, reaction update)    │
  │  • public.community_testimonials   (RLS: anon public read)                     │
  │  • public.community_stats          (RLS: anon public read)                     │
  └────────────────────────────────────────────────────────────────────────────────┘
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
│   │   └── page.tsx              # Dedicated dynamic Community Showcase (/community)
│   └── api/
│       ├── waitlist/
│       │   └── route.ts          # Waitlist API endpoint (POST)
│       ├── templates/
│       │   └── route.ts          # Templates API endpoint (GET)
│       └── community/
│           └── route.ts          # Community API endpoint (GET, POST)
│
├── components/
│   ├── navbar/                   # Navigation header with routing & hash cleanup
│   ├── hero/                     # Main headline & multi-tab terminal
│   ├── features/                 # Core capabilities grid & mobile snap slider
│   ├── templates/                # Interactive templates grid & category filters
│   ├── audience/                 # Value prop breakdown (Who, Why, Difference)
│   ├── how-it-works/             # 4-step process guide & mobile snap slider
│   ├── social-proof/             # Dynamic community showcase & live reactions
│   ├── waitlist/                 # Form state management, spinner & pulse animation
│   └── footer/                   # Footer links & status indicators
│
├── lib/
│   ├── db.ts                     # Supabase REST client & in-memory fallbacks
│   ├── navigation.ts             # Smooth animated scroll utilities
│   └── validation.ts             # RFC 5322 email regex validation logic
│
└── types/
    └── index.ts                  # Shared TypeScript interfaces
```

### Components Breakdown

#### Navbar (`src/components/navbar/index.tsx`)
- Offers sticky header navigation, branding (Forge), links (`Features`, `Templates`, `How it works`, `Community`), and primary waitlist CTA button.
- Clean URL state management: clicking the logo smoothly scrolls to top and clears any existing anchor hashes (`#features`, `#how-it-works`) from the browser address bar.
- Interactive mobile navigation drawer with animated hamburger toggle and operational status indicator.

#### Hero (`src/components/hero/index.tsx`)
- Shows the main product tagline ("*From 'I have an idea' to 'I built it.'*") displayed clearly over two lines.
- Supporting product text, primary CTA ("*Join the waitlist*") triggering smooth animated scroll and input pulse highlight, and secondary CTA ("*See how it works*").
- Multi-command interactive terminal preview supporting tab switching across CLI workflows (`init`, `test`, `deploy`) with one-click copy feedback.

#### Capabilities / Features (`src/components/features/index.tsx`)
- Shows 4 capabilities cards with Material Symbols (`auto_awesome_mosaic`, `smart_toy`, `rocket_launch`, `forum`) and numbered badges (`01` - `04`).
- Full-width background wrapper with `scroll-mt-16 md:scroll-mt-20` for sticky navbar offset clearance.
- Responsive horizontal snap slider on mobile devices with indicator pagination dots.

#### Templates Page & Component (`src/app/templates/page.tsx` & `src/components/templates/index.tsx`)
- Dedicated dynamic route serving production-ready starter kits fetched directly from Supabase PostgreSQL (`public.templates`).
- Interactive category filter tabs (`All`, `Full-Stack`, `Frontend`, `AI / ML`, `Systems`).
- One-click copyable `forge init` CLI commands with tactile visual feedback.

#### Audience & Value Proposition (`src/components/audience/index.tsx`)
- 3-column explanation of *Who it is for* (Builders with Ideas), *Why use it* (Frictionless Flow), and *What's different* (Ship, Not Just Learn).
- Mobile-friendly horizontal snap slider with indicator dots.

#### How It Works (`src/components/how-it-works/index.tsx`)
- Explanation of the 4-step user process: `1. Pick a path` → `2. Build & Iterate` → `3. Zero-Config Deploy` → `4. Share & Grow`.
- Simulated CLI execution chips for each step.
- Full-width background wrapper with `scroll-mt-16 md:scroll-mt-20` offset alignment and mobile horizontal snap scrolling.

#### Community Showcase Page & Component (`src/app/community/page.tsx` & `src/components/social-proof/index.tsx`)
- Dynamic community showcase page backed by Supabase PostgreSQL (`public.community_projects`, `public.community_testimonials`, `public.community_stats`).
- Platform metric counters: Projects Scaffolded (`1,240+`), Active Builders (`860+`), Edge Deployments (`970+`).
- Community shared builds with live interactive star (`★`) and upvote (`▲`) buttons that sync state directly to the database via `POST /api/community`.
- Verified builder testimonials.

#### Waitlist Form (`src/components/waitlist/index.tsx`)
- Email signup form with dual-layer validation (client RFC 5322 regex + server validation).
- Animated loading spinner during submission, live recent builder social proof counter, and dynamic feedback banners (*Success*, *Duplicate*, *Error*).
- Highlight pulse keyframe animation (`.pulse-highlight`) triggered when navigating from external CTA buttons.

#### Footer (`src/components/footer/index.tsx`)
- Sticky-bottom branding, operational status badge, direct navigation links, and copyright metadata.

---

## 5. API Specifications & Endpoints

### 1. Waitlist API (`POST /api/waitlist`)
- **Request**: `{ "email": "developer@example.com" }`
- **Responses**:
  - `201 Created`: `{ "success": true, "message": "Successfully joined the waitlist!" }`
  - `400 Bad Request`: `{ "success": false, "error": "Please enter a valid email address." }`
  - `409 Conflict`: `{ "success": false, "error": "This email address is already on the waitlist." }`
  - `500 Internal Error`: `{ "success": false, "error": "Internal server error. Please try again later." }`

### 2. Templates API (`GET /api/templates`)
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "react-supabase",
        "title": "React + Supabase Fullstack",
        "description": "Production-ready starter with authentication, database RLS, and real-time data sync.",
        "category": "Full-Stack",
        "tags": ["React", "Supabase", "TypeScript", "Tailwind"],
        "badge": "Popular",
        "cliCommand": "forge init --template react-supabase"
      }
    ]
  }
  ```

### 3. Community API (`GET /api/community`)
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": {
      "projects": [ ... ],
      "testimonials": [ ... ],
      "stats": { "projectsBuilt": 1240, "communityMembers": 860, "projectsDeployed": 970 }
    }
  }
  ```

### 4. Community Reaction API (`POST /api/community`)
- **Request**: `{ "projectId": "1", "type": "star", "delta": 1 }`
- **Response (`200 OK`)**: `{ "success": true }`

---

## 6. Database Schema & Row Level Security (RLS)

All database entities are managed in Supabase PostgreSQL with strict Row Level Security policies:

```sql
-- 1. Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique_idx ON public.waitlist (LOWER(email));
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public waitlist submissions"
  ON public.waitlist FOR INSERT TO anon, authenticated
  WITH CHECK (length(trim(email)) > 0);

CREATE POLICY "Restrict select to service role"
  ON public.waitlist FOR SELECT TO service_role USING (true);

-- 2. Starter Kit Templates Table
CREATE TABLE IF NOT EXISTS public.templates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  badge TEXT,
  cli_command TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read templates"
  ON public.templates FOR SELECT TO anon, authenticated USING (true);

-- 3. Community Projects Table
CREATE TABLE IF NOT EXISTS public.community_projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  stars INTEGER NOT NULL DEFAULT 0,
  upvotes INTEGER NOT NULL DEFAULT 0,
  demo_url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.community_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read community projects"
  ON public.community_projects FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public update reactions"
  ON public.community_projects FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- 4. Community Testimonials Table
CREATE TABLE IF NOT EXISTS public.community_testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.community_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read testimonials"
  ON public.community_testimonials FOR SELECT TO anon, authenticated USING (true);

-- 5. Community Stats Table
CREATE TABLE IF NOT EXISTS public.community_stats (
  id TEXT PRIMARY KEY DEFAULT 'default',
  projects_built INTEGER NOT NULL DEFAULT 1240,
  community_members INTEGER NOT NULL DEFAULT 860,
  projects_deployed INTEGER NOT NULL DEFAULT 970,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.community_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read community stats"
  ON public.community_stats FOR SELECT TO anon, authenticated USING (true);
```

---

## 7. Form UI State Machine

The waitlist form component uses an explicit state machine to handle visual feedback:

```text
       [ DEFAULT ]
            │
            │ Submit Form
            ▼
     [ SUBMITTING ]  ---> Button disabled, spinner active, text "Joining..."
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
Banner   Banner   Banner          & Retry
```

---

## 8. Responsive Architecture & Accessibility (WCAG)

### Responsive Breakpoints
- **Desktop (`≥ 1440px`)**: Full 12-column multi-card technical grid layout, 64px horizontal margins, interactive multi-tab terminal preview alongside headline.
- **Tablet (`768px - 1024px`)**: 2-column feature and template grids, collapsible navigation.
- **Mobile (`< 768px`)**:
  - Horizontal swipeable snap sliders (`overflow-x-auto snap-x snap-mandatory scrollbar-none`) with card peek margins (`min-w-[82vw]` to `min-w-[84vw]`), eliminating vertical scroll fatigue.
  - Interactive pagination dot indicators reflecting current active slide.
  - Sticky navbar offset alignment via `scroll-mt-16 md:scroll-mt-20`.
  - Accessible touch target sizes $\ge 44\text{px}$.
  - Mobile slide-down navigation drawer.

### Accessibility Standards
- **Semantic Structure**: Built strictly with `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, and `<form>`.
- **Keyboard Usability**: All interactive buttons, tabs, and links feature visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary`).
- **Screen Reader Support**: Form feedback banners use `role="status"` and `role="alert"` for live ARIA announcements.
- **Reduced Motion**: All animations (`.fade-in-up`, `.pulse-highlight`) respect `prefers-reduced-motion: reduce`.

---

## 9. Performance & Rendering Strategy

- **Hybrid Rendering**: Static pre-rendering for the landing page with dynamic server rendering for real-time templates and community showcases.
- **Zero Static JSON Files**: All business data is centralized in PostgreSQL via Supabase with fallback sets for resilient offline development.
- **Turbopack Build**: Application compiles production builds in under 500ms.
- **Font Optimization**: Google Fonts (`Inter`, `JetBrains Mono`) are loaded efficiently without blocking paint.

---

## 10. Automated Testing Architecture

Testing is automated using **Vitest** (`npm run test`):
- `src/__tests__/validation.test.ts` (6 tests): RFC 5322 email regex validation unit tests.
- `src/__tests__/waitlist-api.test.ts` (4 tests): Waitlist API HTTP status integration tests (`201`, `400`, `409`).
- `src/__tests__/templates-api.test.ts` (1 test): Templates API HTTP status and structure integration test (`200`).
- `src/__tests__/community-api.test.ts` (3 tests): Community API integration tests (`GET 200`, `POST 400`, `POST 200`).

---

## 11. Deployment Architecture

- **Hosting**: Deployed on Vercel Edge Network.
- **Database**: Connected via Supabase REST API & PostgreSQL connection pool.
- **Environment Configuration**: Managed via environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
