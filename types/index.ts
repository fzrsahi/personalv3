export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: 'code' | 'server' | 'cloud';
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string[];
  imageUrls?: string[];
}

