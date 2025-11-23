import { ExperienceItem, SkillCategory } from '@/types';

export const personalInfo = {
  name: "Fazrul Anugrah Sahi",
  title: "Backend Developer",
  email: "fazrul.anugrah17@gmail.com",
  linkedin: "https://www.linkedin.com/in/fzrsahi/",
  summary: "Backend Developer with 2 years of professional experience designing and building RESTful APIs and microservices using Go, Node.js (NestJS), and PostgreSQL. Proven track record of optimizing search query performance by 40% and raising test coverage to 90% via TDD practices."
};

export const experiences: ExperienceItem[] = [
  {
    company: "80&Co Tokyo, Japan",
    role: "Software Developer",
    period: "Dec 2024 - Present",
    description: [
      "Developed 'powerpoint_prototype' connecting Gemini API using NestJS to transform data into presentations.",
      "Contributed to an AI phone project by integrating OpenAI's real-time API for voice conversations.",
      "Optimized LMS backend API response times and drove unit test coverage up to 90%.",
    ]
  },
  {
    company: "Ditjen Diktiristek",
    role: "Backend Developer Internship",
    period: "Feb 2024 - July 2024",
    description: [
      "Engineered complex SQL queries across 10+ tables for KEDAIREKA products, improving search performance.",
      "Refactored legacy Go search modules to support flexible multi-parameter capabilities.",
      "Authored comprehensive unit tests boosting coverage to 90% for critical modules.",
    ]
  },
  {
    company: "Thinkspedia",
    role: "Backend Developer Internship",
    period: "July 2023 - Oct 2023",
    description: [
      "Led the POLMARK project backend (Election monitoring), overseeing a microservice architecture of 15 services.",
      "Developed incident reporting features for 'Saksi' app utilizing NestJS, MongoDB, and RabbitMQ.",
      "Integrated MinIO for efficient file storage and documented APIs extensively with Swagger.",
    ]
  }
];

export const skills: SkillCategory[] = [
  {
    title: "Languages",
    icon: "code",
    skills: ["Go (Golang)", "TypeScript", "JavaScript", "PHP", "SQL", "Java"]
  },
  {
    title: "Backend Stack",
    icon: "server",
    skills: ["NestJS", "Express.js", "PostgreSQL", "MongoDB", "RabbitMQ", "Redis", "Microservices", "REST API"]
  },
  {
    title: "Cloud & Tools",
    icon: "cloud",
    skills: ["AWS (EC2, RDS)", "Docker", "CI/CD", "Git", "Linux", "Unit Testing", "Swagger"]
  }
];

