"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Header = () => {
  const [activeTab, setActiveTab] = useState('#main');
  
  // Listen for hash changes to update active tab state manually if needed
  // Simple implementation for single page
  const links = [
    { name: 'main.tsx', href: '#', id: '#main' },
    { name: 'experience.log', href: '#experience', id: '#experience' },
    { name: 'stack.config.json', href: '#skills', id: '#skills' },
    { name: 'contact.sh', href: 'mailto:fazrul.anugrah17@gmail.com', id: 'mail' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-grid text-sm"
    >
      <div className="flex items-center h-12 px-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center border-r border-grid px-4 h-full bg-gray-50 min-w-fit">
           <span className="font-bold text-ink mr-2">Fzrsahi</span>
           <span className="text-xs text-gray-400">v2.4.0</span>
        </div>

        {links.map((link) => (
          <Link 
            key={link.name}
            href={link.href}
            onClick={() => setActiveTab(link.id)}
            className={`
              relative h-full flex items-center px-6 border-r border-grid min-w-fit transition-colors
              ${activeTab === link.id ? 'bg-white text-ink' : 'bg-gray-50/50 text-gray-400 hover:bg-white hover:text-graphite'}
            `}
          >
            <span className="mr-2 opacity-50">
               {link.name.endsWith('.tsx') && '⚛'}
               {link.name.endsWith('.log') && '✎'}
               {link.name.endsWith('.json') && '{}'}
               {link.name.endsWith('.sh') && '>_'}
            </span>
            {link.name}
            {activeTab === link.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute top-0 left-0 right-0 h-[2px] bg-sand" 
              />
            )}
          </Link>
        ))}
      </div>
    </motion.header>
  );
};
