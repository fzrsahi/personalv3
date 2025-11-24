"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useActiveCommand } from '@/contexts/ActiveCommandContext';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [manualTab, setManualTab] = useState(() => {
    if (typeof window === 'undefined') return '#main';
    return window.location.hash || '#main';
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { activeCommand } = useActiveCommand();
  const pathname = usePathname();
  
  // Map command to tab ID
  const commandToTabMap: Record<string, string> = useMemo(() => ({
    'whoami.txt': '#main',
    'git log --graph --oneline': '#experience',
    'stack.config.json': '#skills',
    'blog.log': '#blog',
    'contact.sh': '#contact',
  }), []);

  // Listen for hash changes to keep manual tab in sync
  useEffect(() => {
    const handleHashChange = () => {
      setManualTab(window.location.hash || '#main');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeTab = activeCommand && commandToTabMap[activeCommand]
    ? commandToTabMap[activeCommand]
    : manualTab;

  // Listen for hash changes to update active tab state manually if needed
  // Simple implementation for single page
  const links = [
    { name: 'whoami.txt', href: '/#main', id: '#main' },
    { name: 'experience.log', href: '/#experience', id: '#experience' },
    { name: 'stack.config.json', href: '/#skills', id: '#skills' },
    { name: 'blog.log', href: '/#blog', id: '#blog' },
    { name: 'contact.sh', href: '/#contact', id: '#contact' },
  ];

  const handleLinkClick = (id: string) => {
    setManualTab(id);
    setIsMobileNavOpen(false);
  };

  const workspacePills = (pillClass = '') =>
    links.map((link) => {
      const isActive = activeTab === link.id && pathname === '/';
      return (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => handleLinkClick(link.id)}
          className={`
            group relative px-3 sm:px-4 py-2 border border-grid/70 rounded-full transition-all duration-200 flex items-center gap-2 whitespace-nowrap
            ${isActive ? 'bg-ink text-white shadow-lg shadow-ink/20' : 'bg-white/70 text-gray-500 hover:text-ink hover:border-ink/40'}
            ${pillClass}
          `}
        >
          <span className="text-xs text-gray-400 group-hover:text-sand hidden md:inline">
            {link.name.endsWith('.tsx') && '⚛'}
            {link.name.endsWith('.log') && '✎'}
            {link.name.endsWith('.json') && '{}'}
            {link.name.endsWith('.sh') && '>_'}
          </span>
          <span>{link.name}</span>
          {isActive && (
            <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-ink" />
          )}
        </Link>
      );
    });

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/95 border-b border-grid/80 text-sm"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Status rail */}
        <div className="flex items-center justify-between min-h-[48px] border-b border-grid/60 py-2">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-graphite">
            <span className="px-3 py-1 rounded-full bg-ink text-white flex items-center gap-2 text-[10px] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              fzrsahi@terminal
            </span>
            <span className="hidden md:inline text-gray-400">session: personal-web</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-sand">mode: focused</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono">
            <span className="hidden sm:inline">branch main</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>v1.0.0</span>
            <button
              type="button"
              className="md:hidden rounded-full border border-grid/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em]"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
            >
              {isMobileNavOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-wrap items-center gap-3 py-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-gray-400 uppercase tracking-[0.35em]">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              ws
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {workspacePills()}
          </div>

          <div className="flex items-center gap-2 pl-3 pr-4 border-l border-grid/60 text-gray-400 uppercase tracking-[0.35em]">
            pages
          </div>
          <Link
            href="/blog"
            className={`
              relative inline-flex items-center gap-3 px-5 py-2 rounded-full font-semibold border border-transparent transition-all
              ${pathname.startsWith('/blog')
                ? 'bg-gradient-to-r from-ink to-gray-900 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
                : 'bg-gradient-to-r from-sand to-amber-200 text-ink hover:shadow-lg'}
            `}
          >
            <span className="text-xs opacity-80">✎</span>
            blog.md
            <span className="text-[10px] tracking-[0.4em] text-white/70">
              {pathname.startsWith('/blog') ? 'OPEN' : 'VIEW'}
            </span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMobileNavOpen && (
          <div className="md:hidden py-3 text-xs font-mono space-y-3">
            <div className="flex items-center gap-2 text-gray-400 uppercase tracking-[0.35em]">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                ws
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {workspacePills('text-[11px]')}
            </div>
            <div className="flex items-center gap-2 pt-1 text-gray-400 uppercase tracking-[0.35em]">
              pages
            </div>
            <Link
              href="/blog"
              onClick={() => setIsMobileNavOpen(false)}
              className={`
                relative inline-flex items-center gap-3 px-5 py-2 rounded-full font-semibold border border-transparent transition-all w-full justify-center
                ${pathname.startsWith('/blog')
                  ? 'bg-gradient-to-r from-ink to-gray-900 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
                  : 'bg-gradient-to-r from-sand to-amber-200 text-ink hover:shadow-lg'}
              `}
            >
              <span className="text-xs opacity-80">✎</span>
              blog.md
              <span className="text-[10px] tracking-[0.4em] text-white/70">
                {pathname.startsWith('/blog') ? 'OPEN' : 'VIEW'}
              </span>
            </Link>
          </div>
        )}
      </div>
    </motion.header>
  );
};
