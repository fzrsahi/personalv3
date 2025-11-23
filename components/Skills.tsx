"use client";

import { skills } from '@/data/resume';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const Skills = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const json = JSON.stringify(skills, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 border-t border-grid bg-paper">
      <div className="max-w-5xl mx-auto">
        
        {/* File Header */}
        <div className="flex items-center justify-between bg-gray-100 border border-grid border-b-0 rounded-t-md px-4 py-2">
           <div className="flex items-center gap-2 text-sm text-graphite font-medium">
              <span className="text-yellow-600">{}</span>
              <span>stack.config.json</span>
           </div>
           <button 
             onClick={handleCopy}
             className="flex items-center gap-2 text-xs text-gray-500 hover:text-ink transition-colors"
           >
             {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
             {copied ? "Copied!" : "Copy raw"}
           </button>
        </div>

        {/* Code Editor Window */}
        <div className="bg-[#fafafa] border border-grid rounded-b-md p-6 md:p-8 overflow-x-auto shadow-sm font-mono text-sm md:text-base leading-relaxed relative group">
           
           {/* Line Numbers */}
           <div className="absolute left-0 top-8 bottom-8 w-12 text-right pr-4 text-gray-300 select-none hidden md:block font-mono text-sm leading-relaxed">
              {Array.from({ length: 20 }).map((_, i) => (
                 <div key={i}>{i + 1}</div>
              ))}
           </div>

           <pre className="md:pl-12">
             <code className="block">
               <span className="text-ink">{`{`}</span>
               {skills.map((category, index) => (
                 <motion.div 
                   key={index}
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="block pl-4 hover:bg-gray-200/50 -mx-4 px-4 rounded transition-colors cursor-text"
                 >
                   <span className="text-ink font-bold">&quot;{category.title.toLowerCase().replace(/\s/g, '_')}&quot;</span>: <span className="text-ink">[</span>
                   <div className="pl-4 flex flex-wrap gap-1 py-1">
                      {category.skills.map((skill, i) => (
                        <span key={i} className="inline-block">
                           <span className="text-sand">&quot;{skill}&quot;</span>
                           {i < category.skills.length - 1 && <span className="text-ink mr-1">,</span>}
                        </span>
                      ))}
                   </div>
                   <span className="text-ink">]</span>{index < skills.length - 1 && <span className="text-ink">,</span>}
                 </motion.div>
               ))}
               <span className="text-ink">{`}`}</span>
             </code>
           </pre>
        </div>
      </div>
    </section>
  );
};
