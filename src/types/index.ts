export interface Skill {
  id: number;
  name: string;
  icon: string;
  logoUrl?: string;
  color: string;
  textColor?: string;
  description: string;
  level?: number;
  category?: string;
  features?: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  category: string;
  role: string;
  challenges?: string;
  features?: string[];
  date?: string;
  duration?: string;
  team?: number;
  client?: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
}
