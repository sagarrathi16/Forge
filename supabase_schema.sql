-- ========================================================
-- Supabase SQL Schema & Row Level Security (RLS) for Forge
-- Tables: waitlist, templates, community_projects, community_testimonials, community_stats
-- Run this in your Supabase SQL Editor: Dashboard -> SQL Editor
-- ========================================================

-- ========================================================
-- 1. WAITLIST TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique_idx ON public.waitlist (LOWER(email));

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public waitlist submissions" ON public.waitlist;
CREATE POLICY "Allow public waitlist submissions"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (length(trim(email)) > 0);

DROP POLICY IF EXISTS "Restrict select to service role" ON public.waitlist;
CREATE POLICY "Restrict select to service role"
  ON public.waitlist
  FOR SELECT
  TO service_role
  USING (true);

-- Function allowing public to safely read the count of waitlist members without exposing emails
CREATE OR REPLACE FUNCTION public.get_waitlist_count()
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT count(*)::integer FROM public.waitlist;
$$;

GRANT EXECUTE ON FUNCTION public.get_waitlist_count() TO anon, authenticated, service_role;


-- ========================================================
-- 2. STARTER KIT TEMPLATES TABLE
-- ========================================================
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

DROP POLICY IF EXISTS "Allow public read templates" ON public.templates;
CREATE POLICY "Allow public read templates"
  ON public.templates
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed Starter Kit Templates
INSERT INTO public.templates (id, title, description, category, tags, badge, cli_command)
VALUES
  ('react-supabase', 'React + Supabase Fullstack', 'Production-ready starter with authentication, database RLS, and real-time data sync.', 'Full-Stack', ARRAY['React', 'Supabase', 'TypeScript', 'Tailwind'], 'Popular', 'forge init --template react-supabase'),
  ('nextjs-saas', 'Next.js App Router SaaS', 'High-performance SSR architecture with Server Actions, dark mode, and UI components.', 'Frontend', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS'], 'Featured', 'forge init --template nextjs-saas'),
  ('fastapi-llm', 'FastAPI + LLM Orchestration', 'Async Python microservice configured for streaming LLM responses and vector search.', 'AI / ML', ARRAY['Python', 'FastAPI', 'LangChain', 'Vector DB'], 'New', 'forge init --template fastapi-llm'),
  ('vite-wasm', 'Vite + WebAssembly Rust', 'Low-latency browser app template with Rust Wasm toolchain and Canvas API.', 'Systems', ARRAY['Rust', 'Wasm', 'TypeScript', 'Vite'], NULL, 'forge init --template vite-wasm'),
  ('mobile-react-native', 'Expo React Native Cross-Platform', 'Mobile application starter with tab navigation, vector icons, and offline storage.', 'Frontend', ARRAY['React Native', 'Expo', 'TypeScript'], NULL, 'forge init --template expo-mobile'),
  ('chrome-extension-mv3', 'Chrome Extension Manifest V3', 'Modern browser extension boilerplate with service worker, popup UI, and content scripts.', 'Systems', ARRAY['TypeScript', 'Manifest V3', 'Tailwind'], NULL, 'forge init --template chrome-mv3')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  badge = EXCLUDED.badge,
  cli_command = EXCLUDED.cli_command;


-- ========================================================
-- 3. COMMUNITY PROJECTS TABLE
-- ========================================================
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

DROP POLICY IF EXISTS "Allow public read community projects" ON public.community_projects;
CREATE POLICY "Allow public read community projects"
  ON public.community_projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public update reactions" ON public.community_projects;
CREATE POLICY "Allow public update reactions"
  ON public.community_projects
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Seed Community Projects
INSERT INTO public.community_projects (id, title, description, author, role, tags, stars, upvotes, demo_url, github_url)
VALUES
  ('1', 'DevPulse', 'Real-time collaborative code review dashboard built in 48 hours using Forge templates and AI debugging.', 'Alex Rivera', 'Full-Stack Builder', ARRAY['Next.js', 'Tailwind', 'AI'], 342, 128, 'https://devpulse.forge.dev', 'https://github.com/alexrivera/devpulse'),
  ('2', 'PixelCraft', 'Browser-based generative art studio powered by WebAssembly, WebGL, and custom shader pipelines.', 'Sarah Chen', 'Frontend Specialist', ARRAY['TypeScript', 'Canvas', 'Wasm'], 512, 240, 'https://pixelcraft.forge.dev', 'https://github.com/sarahchen/pixelcraft'),
  ('3', 'EchoDB', 'Lightweight distributed key-value store with interactive web management dashboard and metrics graph.', 'Marcus Vance', 'Systems Engineer', ARRAY['Rust', 'React', 'PostgreSQL'], 189, 95, 'https://echodb.forge.dev', 'https://github.com/marcusv/echodb'),
  ('4', 'AgentFlow', 'Visual node-based drag-and-drop editor for orchestrating autonomous AI agent tools and workflows.', 'Elena Rostova', 'AI Researcher', ARRAY['Python', 'FastAPI', 'React'], 620, 310, 'https://agentflow.forge.dev', 'https://github.com/elena/agentflow'),
  ('5', 'HyperScale', 'Global edge latency testing & monitoring tool designed specifically for microservice developers.', 'David Kim', 'DevOps Architect', ARRAY['Go', 'Next.js', 'Edge'], 275, 142, 'https://hyperscale.forge.dev', 'https://github.com/davidkim/hyperscale'),
  ('6', 'TaskCraft', 'Keyboard-first developer task manager featuring local markdown synchronization and offline support.', 'Maya Lin', 'UI/UX Developer', ARRAY['Electron', 'Tailwind', 'SQLite'], 410, 198, 'https://taskcraft.forge.dev', 'https://github.com/mayalin/taskcraft')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  author = EXCLUDED.author,
  role = EXCLUDED.role,
  tags = EXCLUDED.tags,
  stars = EXCLUDED.stars,
  upvotes = EXCLUDED.upvotes,
  demo_url = EXCLUDED.demo_url,
  github_url = EXCLUDED.github_url;


-- ========================================================
-- 4. COMMUNITY TESTIMONIALS TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.community_testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.community_testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read testimonials" ON public.community_testimonials;
CREATE POLICY "Allow public read testimonials"
  ON public.community_testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed Community Testimonials
INSERT INTO public.community_testimonials (id, quote, author, role)
VALUES
  ('1', 'Forge turned my rough hackathon idea into a live deployed app in just a single afternoon.', 'Jordan Lee', 'High School Developer'),
  ('2', 'The AI tools are actually tuned for how developers think. It eliminated all setup friction.', 'Priya Patel', 'Open Source Contributor')
ON CONFLICT (id) DO UPDATE SET
  quote = EXCLUDED.quote,
  author = EXCLUDED.author,
  role = EXCLUDED.role;


-- ========================================================
-- 5. COMMUNITY STATS TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.community_stats (
  id TEXT PRIMARY KEY DEFAULT 'default',
  projects_built INTEGER NOT NULL DEFAULT 1240,
  community_members INTEGER NOT NULL DEFAULT 860,
  projects_deployed INTEGER NOT NULL DEFAULT 970,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.community_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read community stats" ON public.community_stats;
CREATE POLICY "Allow public read community stats"
  ON public.community_stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed Default Platform Stats
INSERT INTO public.community_stats (id, projects_built, community_members, projects_deployed)
VALUES ('default', 1240, 860, 970)
ON CONFLICT (id) DO UPDATE SET
  projects_built = EXCLUDED.projects_built,
  community_members = EXCLUDED.community_members,
  projects_deployed = EXCLUDED.projects_deployed;
