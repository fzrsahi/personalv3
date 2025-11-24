"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useActiveCommand } from "@/contexts/ActiveCommandContext";
import { useEffect, useRef } from "react";
import { blogPosts } from "@/data/blog";

export const BlogHighlight = () => {
  const { setActiveCommand } = useActiveCommand();
  const sectionRef = useRef<HTMLElement>(null);
  const command = "blog.log";

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const checkVisibility = () => {
      const rect = currentSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const headerHeight = 48;
      const isInActiveZone =
        rect.top >= headerHeight &&
        rect.top < windowHeight * 0.7 &&
        rect.bottom > headerHeight + 50;

      if (isInActiveZone) {
        setActiveCommand(command);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(checkVisibility);
    }, 150);

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        requestAnimationFrame(checkVisibility);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [setActiveCommand]);

  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-24 px-6 md:px-12 border-t border-grid bg-paper"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-grid">
          <span className="text-sand text-xl">✎</span>
          <h2 className="text-2xl font-bold text-ink font-mono">blog.log</h2>
        </div>

        <div className="bg-white border-2 border-grid rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 border-b border-grid px-5 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm">
            <p className="text-gray-600">root@fzrsahi:~/blog$ tail -n 3 posts.log</p>
            <span className="text-xs text-gray-400">
              Highlight terbaru dari jurnal di terminal
            </span>
          </div>

          <div className="divide-y divide-grid">
            {featuredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/70 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              >
                <motion.article
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 flex flex-col gap-3 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 uppercase tracking-widest">
                    <span className="font-semibold text-gray-700">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{post.date}</span>
                    <span className="text-sand">{post.readingTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-ink group-hover:text-sand transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-graphite">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 border border-grid rounded bg-gray-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 text-sand text-sm font-semibold group-hover:text-ink transition-colors">
                    cat ~/blog/{post.slug}.md
                    <span className="text-xs text-gray-400 group-hover:text-ink">↗</span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          <div className="bg-gray-100 border-t border-grid px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-gray-600 text-sm">
              Pingin baca lengkap? Halaman blog penuh gaya terminal siap dibuka.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center border border-grid px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-white transition-colors"
            >
              {'>_'} buka blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

