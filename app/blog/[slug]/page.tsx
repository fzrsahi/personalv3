import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import { ExternalLink } from "lucide-react";

interface BlogDetailParams {
  slug: string;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogDetailParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | blog.md`,
    description: post.excerpt,
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<BlogDetailParams>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-paper relative text-ink selection:bg-sand/30 selection:text-ink font-mono">
      <div className="flex flex-col min-h-screen pt-12">
        <Header />

        <section className="flex-1 px-6 md:px-12 py-12">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="bg-white border-2 border-grid rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-100 border-b border-grid px-5 py-3 flex flex-col gap-1 text-sm">
                <span className="text-gray-600">
                  root@fzrsahi:~/blog$ cat posts/{post.slug}.md
                </span>
                <span className="text-xs text-gray-400">
                  {post.date} · {post.readingTime}
                </span>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <p className="text-xs uppercase text-gray-400 tracking-[0.2em]">
                    blog.md
                  </p>
                  <h1 className="text-3xl font-bold text-ink">{post.title}</h1>
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
                  {post.imageUrls && post.imageUrls.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gray-400">
                        visual
                        <span className="text-[10px] text-gray-400 normal-case tracking-normal">
                          (klik untuk membuka link)
                        </span>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {post.imageUrls.map((url, idx) => (
                          <Link
                            key={url}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-md border border-grid overflow-hidden bg-white"
                          >
                            <div className="relative w-full bg-gray-50">
                              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-[10px] tracking-[0.3em] uppercase z-10">
                                #{String(idx + 1).padStart(2, "0")}
                              </div>
                              <Image
                                src={url}
                                alt={`${post.title} visual ${idx + 1}`}
                                width={1600}
                                height={900}
                                className="w-full h-auto object-contain bg-white transition-opacity duration-300 group-hover:opacity-90"
                                sizes="(min-width: 640px) 50vw, 100vw"
                                priority={idx === 0}
                              />
                            </div>
                            <div className="flex items-center justify-between px-3 py-2 text-xs text-sand group-hover:text-ink">
                              <span>Lihat gambar</span>
                              <ExternalLink size={12} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700">
                  {post.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center border border-grid px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-white transition-colors"
              >
                {'<'} back to blog.md
              </Link>
              <Link
                href="/#blog"
                className="inline-flex items-center justify-center border border-grid px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-white transition-colors"
              >
                {'>_'} lihat highlight blog.log
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

