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

