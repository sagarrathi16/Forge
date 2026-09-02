/**
 * Supabase / PostgreSQL Database Interface for Forge
 * Manages waitlist submissions, starter templates, and community data (projects, testimonials, platform statistics).
 * Reads credentials dynamically from process.env without hardcoding.
 */

import { Template, Project, Testimonial, PlatformStatistics } from '@/types';

export interface WaitlistRecord {
  id?: string;
  email: string;
  created_at?: string;
}

// In-memory fallback datasets for local development or offline testing
const inMemoryWaitlist = new Set<string>();

const fallbackTemplates: Template[] = [
  {
    id: 'react-supabase',
    title: 'React + Supabase Fullstack',
    description: 'Production-ready starter with authentication, database RLS, and real-time data sync.',
    category: 'Full-Stack',
    tags: ['React', 'Supabase', 'TypeScript', 'Tailwind'],
    badge: 'Popular',
    cliCommand: 'forge init --template react-supabase',
  },
  {
    id: 'nextjs-saas',
    title: 'Next.js App Router SaaS',
    description: 'High-performance SSR architecture with Server Actions, dark mode, and UI components.',
    category: 'Frontend',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    badge: 'Featured',
    cliCommand: 'forge init --template nextjs-saas',
  },
  {
    id: 'fastapi-llm',
    title: 'FastAPI + LLM Orchestration',
    description: 'Async Python microservice configured for streaming LLM responses and vector search.',
    category: 'AI / ML',
    tags: ['Python', 'FastAPI', 'LangChain', 'Vector DB'],
    badge: 'New',
    cliCommand: 'forge init --template fastapi-llm',
  },
  {
    id: 'vite-wasm',
    title: 'Vite + WebAssembly Rust',
    description: 'Low-latency browser app template with Rust Wasm toolchain and Canvas API.',
    category: 'Systems',
    tags: ['Rust', 'Wasm', 'TypeScript', 'Vite'],
    cliCommand: 'forge init --template vite-wasm',
  },
  {
    id: 'mobile-react-native',
    title: 'Expo React Native Cross-Platform',
    description: 'Mobile application starter with tab navigation, vector icons, and offline storage.',
    category: 'Frontend',
    tags: ['React Native', 'Expo', 'TypeScript'],
    cliCommand: 'forge init --template expo-mobile',
  },
  {
    id: 'chrome-extension-mv3',
    title: 'Chrome Extension Manifest V3',
    description: 'Modern browser extension boilerplate with service worker, popup UI, and content scripts.',
    category: 'Systems',
    tags: ['TypeScript', 'Manifest V3', 'Tailwind'],
    cliCommand: 'forge init --template chrome-mv3',
  },
];

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'DevPulse',
    description: 'Real-time collaborative code review dashboard built in 48 hours using Forge templates and AI debugging.',
    author: 'Alex Rivera',
    role: 'Full-Stack Builder',
    tags: ['Next.js', 'Tailwind', 'AI'],
    stars: 342,
    upvotes: 128,
    demoUrl: 'https://devpulse.forge.dev',
    githubUrl: 'https://github.com/alexrivera/devpulse',
  },
  {
    id: '2',
    title: 'PixelCraft',
    description: 'Browser-based generative art studio powered by WebAssembly, WebGL, and custom shader pipelines.',
    author: 'Sarah Chen',
    role: 'Frontend Specialist',
    tags: ['TypeScript', 'Canvas', 'Wasm'],
    stars: 512,
    upvotes: 240,
    demoUrl: 'https://pixelcraft.forge.dev',
    githubUrl: 'https://github.com/sarahchen/pixelcraft',
  },
  {
    id: '3',
    title: 'EchoDB',
    description: 'Lightweight distributed key-value store with interactive web management dashboard and metrics graph.',
    author: 'Marcus Vance',
    role: 'Systems Engineer',
    tags: ['Rust', 'React', 'PostgreSQL'],
    stars: 189,
    upvotes: 95,
    demoUrl: 'https://echodb.forge.dev',
    githubUrl: 'https://github.com/marcusv/echodb',
  },
  {
    id: '4',
    title: 'AgentFlow',
    description: 'Visual node-based drag-and-drop editor for orchestrating autonomous AI agent tools and workflows.',
    author: 'Elena Rostova',
    role: 'AI Researcher',
    tags: ['Python', 'FastAPI', 'React'],
    stars: 620,
    upvotes: 310,
    demoUrl: 'https://agentflow.forge.dev',
    githubUrl: 'https://github.com/elena/agentflow',
  },
  {
    id: '5',
    title: 'HyperScale',
    description: 'Global edge latency testing & monitoring tool designed specifically for microservice developers.',
    author: 'David Kim',
    role: 'DevOps Architect',
    tags: ['Go', 'Next.js', 'Edge'],
    stars: 275,
    upvotes: 142,
    demoUrl: 'https://hyperscale.forge.dev',
    githubUrl: 'https://github.com/davidkim/hyperscale',
  },
  {
    id: '6',
    title: 'TaskCraft',
    description: 'Keyboard-first developer task manager featuring local markdown synchronization and offline support.',
    author: 'Maya Lin',
    role: 'UI/UX Developer',
    tags: ['Electron', 'Tailwind', 'SQLite'],
    stars: 410,
    upvotes: 198,
    demoUrl: 'https://taskcraft.forge.dev',
    githubUrl: 'https://github.com/mayalin/taskcraft',
  },
];

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Forge turned my rough hackathon idea into a live deployed app in just a single afternoon.',
    author: 'Jordan Lee',
    role: 'High School Developer',
  },
  {
    id: '2',
    quote: 'The AI tools are actually tuned for how developers think. It eliminated all setup friction.',
    author: 'Priya Patel',
    role: 'Open Source Contributor',
  },
];

const fallbackStats: PlatformStatistics = {
  projectsBuilt: 1240,
  communityMembers: 860,
  projectsDeployed: 970,
};

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return { supabaseUrl, supabaseKey };
}

/**
 * Fetch all starter templates from Supabase PostgreSQL
 */
export async function getTemplates(): Promise<Template[]> {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/templates?select=*&order=created_at.asc`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (response.ok) {
        const rows = await response.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return rows.map((r: Record<string, unknown>) => ({
            id: String(r.id),
            title: String(r.title),
            description: String(r.description),
            category: r.category as Template['category'],
            tags: Array.isArray(r.tags) ? r.tags : [],
            badge: r.badge ? String(r.badge) : undefined,
            cliCommand: String(r.cli_command || ''),
          }));
        }
      }
    } catch (error) {
      console.warn('Could not fetch templates from Supabase, using fallback data:', error);
    }
  }

  return fallbackTemplates;
}

/**
 * Fetch all community projects from Supabase PostgreSQL
 */
export async function getCommunityProjects(): Promise<Project[]> {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/community_projects?select=*&order=stars.desc`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (response.ok) {
        const rows = await response.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return rows.map((r: Record<string, unknown>) => ({
            id: String(r.id),
            title: String(r.title),
            description: String(r.description),
            author: String(r.author),
            role: String(r.role),
            tags: Array.isArray(r.tags) ? r.tags : [],
            stars: Number(r.stars || 0),
            upvotes: Number(r.upvotes || 0),
            demoUrl: r.demo_url ? String(r.demo_url) : undefined,
            githubUrl: r.github_url ? String(r.github_url) : undefined,
          }));
        }
      }
    } catch (error) {
      console.warn('Could not fetch projects from Supabase, using fallback data:', error);
    }
  }

  return fallbackProjects;
}

/**
 * Fetch testimonials from Supabase PostgreSQL
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/community_testimonials?select=*&order=created_at.asc`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (response.ok) {
        const rows = await response.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return rows.map((r: Record<string, unknown>) => ({
            id: String(r.id),
            quote: String(r.quote),
            author: String(r.author),
            role: String(r.role),
          }));
        }
      }
    } catch (error) {
      console.warn('Could not fetch testimonials from Supabase, using fallback data:', error);
    }
  }

  return fallbackTestimonials;
}

/**
 * Fetch platform statistics from Supabase PostgreSQL
 */
export async function getCommunityStats(): Promise<PlatformStatistics> {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/community_stats?id=eq.default&select=*`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (response.ok) {
        const rows = await response.json();
        if (Array.isArray(rows) && rows.length > 0) {
          const s = rows[0];
          return {
            projectsBuilt: Number(s.projects_built || 1240),
            communityMembers: Number(s.community_members || 860),
            projectsDeployed: Number(s.projects_deployed || 970),
          };
        }
      }
    } catch (error) {
      console.warn('Could not fetch stats from Supabase, using fallback data:', error);
    }
  }

  return fallbackStats;
}

/**
 * Update reaction (star or upvote) count on a community project in Supabase
 */
export async function updateProjectReaction(
  projectId: string,
  type: 'star' | 'upvote',
  delta: number
): Promise<boolean> {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (supabaseUrl && supabaseKey) {
    try {
      // 1. Fetch current project
      const getRes = await fetch(`${supabaseUrl}/rest/v1/community_projects?id=eq.${projectId}&select=stars,upvotes`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (getRes.ok) {
        const rows = await getRes.json();
        if (rows.length > 0) {
          const currentVal = type === 'star' ? rows[0].stars : rows[0].upvotes;
          const newVal = Math.max(0, currentVal + delta);

          const patchBody = type === 'star' ? { stars: newVal } : { upvotes: newVal };
          const patchRes = await fetch(`${supabaseUrl}/rest/v1/community_projects?id=eq.${projectId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              Prefer: 'return=minimal',
            },
            body: JSON.stringify(patchBody),
          });

          return patchRes.ok;
        }
      }
    } catch (error) {
      console.error('Failed to update reaction in Supabase:', error);
    }
  }

  // Fallback update in-memory
  const project = fallbackProjects.find((p) => p.id === projectId);
  if (project) {
    if (type === 'star') project.stars = Math.max(0, project.stars + delta);
    if (type === 'upvote') project.upvotes = Math.max(0, project.upvotes + delta);
    return true;
  }

  return false;
}

/**
 * Inserts a new waitlist email into Supabase PostgreSQL
 */
export async function insertWaitlistEmail(email: string): Promise<{ success: boolean; duplicate?: boolean }> {
  const normalizedEmail = email.toLowerCase().trim();
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (response.status === 201 || response.status === 200 || response.ok) {
        return { success: true };
      }

      if (response.status === 409) {
        return { success: false, duplicate: true };
      }

      const errorText = await response.text();
      if (
        errorText.includes('duplicate key') ||
        errorText.includes('23505') ||
        errorText.includes('already exists')
      ) {
        return { success: false, duplicate: true };
      }

      console.error('Supabase REST error:', response.status, errorText);
      throw new Error(`Supabase returned status ${response.status}`);
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  // Fallback if environment variables are missing
  if (inMemoryWaitlist.has(normalizedEmail)) {
    return { success: false, duplicate: true };
  }
  inMemoryWaitlist.add(normalizedEmail);
  return { success: true };
}

/**
 * Retrieves the total count of waitlist subscribers from Supabase or memory
 */
export async function getWaitlistCount(): Promise<number> {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (supabaseUrl && supabaseKey) {
    try {
      // 1. Try Supabase RPC get_waitlist_count
      const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/get_waitlist_count`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (rpcRes.ok) {
        const count = await rpcRes.json();
        if (typeof count === 'number') {
          return count;
        }
      }

      // 2. Fallback to querying with Prefer: count=exact
      const countRes = await fetch(`${supabaseUrl}/rest/v1/waitlist?select=id`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'count=exact',
        },
      });

      if (countRes.ok) {
        const contentRange = countRes.headers.get('content-range');
        if (contentRange) {
          const total = contentRange.split('/')[1];
          if (total && !isNaN(Number(total))) {
            return Number(total);
          }
        }
        const data = await countRes.json();
        if (Array.isArray(data)) {
          return data.length;
        }
      }
    } catch (error) {
      console.warn('Could not fetch waitlist count from Supabase:', error);
    }
  }

  return 14 + inMemoryWaitlist.size;
}

