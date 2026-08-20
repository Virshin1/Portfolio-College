export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Full-Stack' | 'Cloud & DevOps' | 'AI & Tools' | 'Frontend' | 'Academic' | 'Developer Tools';
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlights?: string[];
  stars?: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Internship' | 'Open Source / Contributor' | 'Full-Time';
  description: string[];
  skills: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  items: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Familiar';
    icon?: string;
  }[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
  status?: string;
  focus?: string[];
  relevantCoursework?: string[];
}

export interface Accomplishment {
  title: string;
  event: string;
  description: string;
  badge: string;
}

export interface PortfolioData {
  name: string;
  title?: string;
  role?: string;
  tagline: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  githubUsername?: string;
  linkedin?: string;
  timezone?: string;
  status?: string;
  bio?: string;
  education: Education;
  experiences: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  accomplishments: Accomplishment[];
}
