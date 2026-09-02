export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
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
