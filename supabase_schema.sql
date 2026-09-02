-- ========================================================
-- Supabase SQL Schema & Row Level Security (RLS) for Forge Waitlist
-- Run this in your Supabase SQL Editor: Dashboard -> SQL Editor
-- ========================================================

-- 1. Create Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Create Case-Insensitive Unique Index on Email
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique_idx ON public.waitlist (LOWER(email));

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow Public (Anon) Users to Submit Emails
CREATE POLICY "Allow public waitlist submissions"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Ensure email is not empty
    length(trim(email)) > 0
  );

-- 5. RLS Policy: Restrict Reading Waitlist Entries to Service Role (Admin)
CREATE POLICY "Restrict select to service role"
  ON public.waitlist
  FOR SELECT
  TO service_role
  USING (true);
