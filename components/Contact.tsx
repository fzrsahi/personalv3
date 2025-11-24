"use client";

import { contactInfo } from '@/data/resume';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useActiveCommand } from '@/contexts/ActiveCommandContext';
import Link from 'next/link';

export const Contact = () => {
  const { setActiveCommand } = useActiveCommand();
  const sectionRef = useRef<HTMLElement>(null);
  const command = "contact.sh";

  // Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const checkVisibility = () => {
      const rect = currentSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const headerHeight = 48;
      
      // Section is active when it's visible in the upper portion of viewport
      // Top of section should be below header and above 70% of viewport
      const isInActiveZone = rect.top >= headerHeight && rect.top < windowHeight * 0.7 && rect.bottom > headerHeight + 50;
      
      if (isInActiveZone) {
        setActiveCommand(command);
      }
    };

    // Initial check
    const timeoutId = setTimeout(checkVisibility, 100);

    // Check on scroll and resize
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [setActiveCommand, command]);

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 md:px-12 border-t border-grid bg-paper">
      <div className="max-w-5xl mx-auto">
        {/* Terminal-style Header */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-grid">
          <span className="text-sand text-xl">$</span>
          <h2 className="text-2xl font-bold text-ink font-mono">contact.sh</h2>
        </div>

        {/* Terminal Output */}
        <div className="bg-white border border-grid rounded-lg p-6 md:p-8 font-mono text-sm md:text-base">
          <div className="space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 group"
            >
              <Mail className="text-sand" size={20} />
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-1">EMAIL</div>
                <Link 
                  href={`mailto:${contactInfo.email}`}
                  className="text-ink hover:text-sand transition-colors flex items-center gap-2"
                >
                  {contactInfo.email}
                  <ExternalLink size={14} className="opacity-50" />
                </Link>
              </div>
            </motion.div>

            {/* GitHub */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 group"
            >
              <Github className="text-sand" size={20} />
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-1">GITHUB</div>
                <Link 
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-sand transition-colors flex items-center gap-2"
                >
                  {contactInfo.github.replace('https://', '')}
                  <ExternalLink size={14} className="opacity-50" />
                </Link>
              </div>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 group"
            >
              <Linkedin className="text-sand" size={20} />
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-1">LINKEDIN</div>
                <Link 
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-sand transition-colors flex items-center gap-2"
                >
                  {contactInfo.linkedin.replace('https://www.', '')}
                  <ExternalLink size={14} className="opacity-50" />
                </Link>
              </div>
            </motion.div>

            {/* Terminal Command Example */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-6 border-t border-grid"
            >
              <div className="text-gray-500 text-xs mb-2">$ ./contact.sh</div>
              <div className="text-green-600">✓ Contact information loaded successfully</div>
              <div className="text-gray-400 text-xs mt-2">Ready to connect!</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

