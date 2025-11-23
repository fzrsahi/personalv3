"use client";

import { experiences } from '@/data/resume';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, GitMerge } from 'lucide-react';
import { useMemo } from 'react';

export const Experience = () => {
  // Generate stable commit hashes for each experience
  const commitHashes = useMemo(() => {
    return experiences.map((_, index) => {
      // Use a simple hash function based on index for stability
      const seed = index * 1000 + experiences.length;
      return seed.toString(16).substr(0, 7);
    });
  }, []);
  return (
    <section id="experience" className="py-24 px-6 md:px-12 border-t border-grid bg-paper">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-16 pb-4 border-b border-grid">
           <GitBranch className="text-sand" />
           <h2 className="text-2xl font-bold text-ink">git log --graph --oneline</h2>
        </div>

        <div className="relative space-y-0">
           {/* The main branch line */}
           <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200" />

           {experiences.map((exp, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.2 }}
               className="group relative pl-16 py-8 hover:bg-gray-50 transition-colors -ml-6 pl-22 pr-6 rounded border border-transparent hover:border-grid cursor-default"
             >
               {/* Commit Dot */}
               <div className="absolute left-[13px] top-10 z-10 bg-paper p-1">
                 <GitCommit className="text-gray-400 group-hover:text-sand transition-colors" size={16} />
               </div>
               
               {/* Commit Hash & Date */}
               <div className="flex items-center gap-4 text-xs text-gray-400 font-mono mb-2">
                  <span className="text-sand font-bold">{commitHashes[index]}</span>
                  <span>{exp.period}</span>
               </div>

               {/* Commit Message (Role) */}
               <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-ink group-hover:underline decoration-sand underline-offset-4 decoration-2">
                     feat({exp.company.toLowerCase().replace(/\s/g, '-')}): {exp.role}
                  </h3>
               </div>

               {/* Diff Content */}
               <div className="pl-4 border-l-2 border-gray-200 group-hover:border-sand transition-colors space-y-1 text-sm text-graphite/80 font-mono">
                  {exp.description.map((desc, i) => (
                    <div key={i} className="flex items-start gap-2">
                       <span className="text-green-600 select-none">+</span>
                       <span>{desc}</span>
                    </div>
                  ))}
               </div>
             </motion.div>
           ))}
           
           <div className="relative pl-16 py-4">
              <div className="absolute left-[13px] top-2 z-10 bg-paper p-1">
                 <GitMerge className="text-gray-300" size={16} />
              </div>
              <span className="text-gray-300 text-sm italic">Initial commit</span>
           </div>
        </div>
      </div>
    </section>
  );
};
