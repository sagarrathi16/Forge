export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'Full-Stack' | 'Frontend' | 'AI / ML' | 'Systems';
  tags: string[];
  badge?: string;
  cliCommand: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  role: string;
  avatar?: string;
  tags: string[];
  stars: number;
  upvotes: number;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface PlatformStatistics {
  projectsBuilt: number;
  communityMembers: number;
  projectsDeployed: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface WaitlistRequest {
  email: string;
}

export interface WaitlistResponse {
  success: boolean;
  message?: string;
  error?: string;
}
