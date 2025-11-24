import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper relative text-ink selection:bg-sand/30 selection:text-ink font-mono">
      {/* IDE Layout Container */}
      <div className="flex flex-col min-h-screen pt-12"> 
        {/* Top Navigation is fixed, so we add pt-12 padding to body */}
        
        <Header />
        
        <div className="flex-1 flex flex-col divide-y divide-grid">
           <Hero />
           <Experience />
           <Skills />
           <Contact />
        </div>
        
        <Footer />
      </div>
    </main>
  );
}
