import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-paper relative text-ink selection:bg-sand/30 selection:text-ink font-mono">
      <div className="flex flex-col min-h-screen pt-12">
        <Header />

        <section className="flex-1 px-6 md:px-12 py-12">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="bg-white border-2 border-grid rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-100 border-b border-grid px-5 py-3 flex items-center justify-between text-sm">
                <span className="text-gray-600">vim blog.md</span>
                <Link
                  href="/"
                  className="text-xs text-sand hover:text-ink transition-colors"
                >
                  cd ~/ && open main.terminal
                </Link>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-500">root@fzrsahi:~/blog$ echo &quot;journal mode&quot;</p>
                <h1 className="text-2xl md:text-3xl font-bold text-ink">
                  Blog Random by Fzrsahi
                </h1>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  Di sini saya berbagi berbagai eksperimen backend, catatan seputar observability, hingga tulisan random lainnya. apapun yang menurut saya menarik dan layak untuk dibagikan. Tidak melulu soal teknis; semua inspirasi, pemikiran, dan pengalaman bisa saja saya tuliskan di sini.

                  Mahal? Mahal.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-grid rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-100 border-b border-grid px-5 py-3 text-sm text-gray-600">
                root@fzrsahi:~/blog$ ls -lh posts/
              </div>

              <div className="divide-y divide-grid">
                {blogPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/70 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                  >
                    <article className="p-6 flex flex-col gap-4 bg-white hover:bg-gray-50 transition-colors">
                      <header className="space-y-1">
                        <p className="text-xs uppercase tracking-widest text-gray-400">
                          #{String(index + 1).padStart(2, "0")} — {post.date}
                        </p>
                        <h2 className="text-xl font-semibold text-ink">
                          {post.title}
                        </h2>
                      </header>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <footer className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="px-2 py-1 border border-grid rounded bg-gray-100">
                          {post.readingTime}
                        </span>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 border border-grid rounded bg-white text-graphite"
                          >
                            #{tag}
                          </span>
                        ))}
                        <span className="ml-auto text-sand group-hover:text-ink transition-colors font-semibold">
                          cat ~/blog/{post.slug}.md
                        </span>
                      </footer>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-grid rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-100 border-b border-grid px-5 py-3 text-sm text-gray-600">
                root@fzrsahi:~/blog$ tail -f ideas.log
              </div>
              <div className="p-6 flex flex-col gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-gray-500 text-sm">Selalu ingin tahu</p>
                  <h3 className="text-xl font-semibold text-ink">
                    Punya topik atau request tulisan?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Mention saya via <span className="text-sand">LinkedIn</span> atau
                    jalankan <span className="text-sand">contact.sh</span> di halaman utama.
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center border border-grid px-5 py-2 text-sm hover:bg-ink hover:text-white transition-colors font-semibold"
                >
                  {'>_'} kirim ide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

