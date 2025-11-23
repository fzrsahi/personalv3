"use client";

import { personalInfo } from '@/data/resume';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-gray-200 bg-white">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-graphite/60">
        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <div className="flex items-center gap-6 font-mono text-xs">
          <span>v2.0.0 (Light_Theme)</span>
          <span>Built with Next.js & Tailwind</span>
        </div>
      </div>
    </footer>
  );
};
