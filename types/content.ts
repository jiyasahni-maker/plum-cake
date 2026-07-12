export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteContent {
  name: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  github: string;
  live?: string;
  featured: boolean;
  status: "planned" | "ongoing" | "in-progress" | "completed";
  year: string;
  problem: string;
  solution: string;
  architecture: string;
  learnings: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface JourneyItem {
  id: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  status: "planned" | "ongoing" | "completed";
}

export interface CreativeItem {
  id: string;
  title: string;
  description: string;
}