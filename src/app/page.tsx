import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HomeClientWrapper } from "@/components/HomeClientWrapper";

export default function Home() {
  return (
    <HomeClientWrapper>
      <div className="relative min-h-screen bg-background transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Journey />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <ScrollReveal />
      </div>
    </HomeClientWrapper>
  );
}
