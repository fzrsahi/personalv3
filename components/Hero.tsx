"use client";

import { personalInfo } from '@/data/resume';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useActiveCommand } from '@/contexts/ActiveCommandContext';

export const Hero = () => {
  const [commandText, setCommandText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const { setActiveCommand } = useActiveCommand();
  const sectionRef = useRef<HTMLElement>(null);
  const command = "whoami";
  const navbarCommand = "whoami.txt";

  useEffect(() => {
    let i = 0;
    setCommandText(''); // Reset command text
    const timer = setInterval(() => {
      if (i < command.length) {
        setCommandText(command.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setShowOutput(true);
        }, 300);
      }
    }, 150);
    return () => clearInterval(timer);
  }, [command]);

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
        setActiveCommand(navbarCommand);
      }
    };

    // Initial check with delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(checkVisibility);
    }, 150);

    // Debounced scroll handler
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        requestAnimationFrame(checkVisibility);
      }, 10);
    };

    // Check on scroll and resize
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setActiveCommand, navbarCommand]);

  return (
    <section ref={sectionRef} id="main" className="min-h-[90vh] pt-24 pb-12 px-6 md:px-12 flex flex-col justify-center bg-paper relative overflow-hidden">
       <div className="max-w-6xl w-full mx-auto z-10">
         {/* Terminal Window */}
         <div className="bg-white border-2 border-grid rounded-lg shadow-lg overflow-hidden">
           {/* Terminal Header */}
           <div className="bg-gray-100 border-b border-grid px-4 py-2 flex items-center gap-2">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="flex-1 text-center">
               <span className="text-gray-500 text-xs font-mono">root@fzrsahi: ~</span>
             </div>
           </div>

           {/* Terminal Body */}
           <div className="p-6 md:p-8 font-mono text-sm md:text-base bg-white">
             {/* Prompt Line */}
             <div className="flex items-center gap-2 mb-4">
               <span className="text-green-600">root@fzrsahi:~$</span>
               <span className="text-ink">{commandText}</span>
               {commandText.length < command.length && (
                 <span className="animate-pulse text-sand">▊</span>
               )}
             </div>

             {/* Output */}
             {showOutput && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.3 }}
                 className="space-y-4"
               >
                 {/* Terminal-style Photo Display */}
                 <div className="border border-grid bg-gray-50 p-4 font-mono text-xs">
                   <div className="text-gray-400 mb-3">$ file profil.JPG</div>
                   <button
                     onClick={() => setShowImageModal(true)}
                     className="border border-grid bg-ink p-2 inline-block cursor-pointer hover:opacity-90 transition-opacity"
                   >
                     <div className="relative w-48 h-64 md:w-56 md:h-72">
                       <Image
                         src="/profil.JPG"
                         alt={personalInfo.name}
                         fill
                         className="object-cover"
                       />
                     </div>
                   </button>
                   <div className="text-gray-500 mt-2 text-[10px]">profil.JPG: JPEG image data, EXIF standard</div>
                   <div className="text-gray-400 mt-1 text-[9px]">(click to view full size)</div>
                 </div>

                 {/* Terminal Output Lines */}
                 <div className="space-y-1 text-ink">
                   <div className="text-gray-500">$ ls -la ~/about/</div>
                   <div className="text-gray-400 text-xs font-mono">
                     <div>total 4</div>
                     <div>drwxr-xr-x  2 root root 4096 Jan  1 00:00 .</div>
                     <div>drwxr-xr-x  3 root root 4096 Jan  1 00:00 ..</div>
                     <div>-rw-r--r--  1 root root   20 Jan  1 00:00 <span className="text-blue-400">status.txt</span></div>
                     <div>-rw-r--r--  1 root root   13 Jan  1 00:00 <span className="text-blue-400">location.txt</span></div>
                     <div>-rw-r--r--  1 root root  200 Jan  1 00:00 <span className="text-blue-400">description.txt</span></div>
                   </div>
                   <div className="text-gray-500">$ cat ~/about/status.txt</div>
                   <div className="text-green-600">Available for hire</div>
                   <div className="text-gray-500">$ cat ~/about/location.txt</div>
                   <div className="text-sand">Jakarta, Indonesia</div>
                   <div className="text-gray-500">$ cat ~/about/description.txt</div>
                   <div className="text-sand max-w-3xl">{personalInfo.summary}</div>
                 </div>
               </motion.div>
             )}
           </div>
         </div>
       </div>

       {/* Image Modal */}
       {showImageModal && (
         <div
           className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
           onClick={() => setShowImageModal(false)}
         >
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="relative max-w-4xl max-h-[90vh] w-full h-full"
             onClick={(e) => e.stopPropagation()}
           >
             <button
               onClick={() => setShowImageModal(false)}
               className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 z-10"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
             <div className="relative w-full h-full">
               <Image
                 src="/profil.JPG"
                 alt={personalInfo.name}
                 fill
                 className="object-contain"
               />
             </div>
           </motion.div>
         </div>
       )}
    </section>
  );
};
