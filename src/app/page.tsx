import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SkyBackground } from "@/components/SkyBackground";
import { HomeClientWrapper } from "@/components/HomeClientWrapper";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};


/** Structured data so search engines can show a proper result for the name. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Intouch Charoenphon",
  alternateName: "windyoncloud",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: "Software Engineer",
  description:
    "Full-stack developer and software engineer with a background in logistics and IT infrastructure.",
  email: "mailto:intouch.crp@gmail.com",
  sameAs: [
    "https://github.com/windme2",
    "https://linkedin.com/in/intouch-charoenphon-a89b21207/",
    "https://instagram.com/withcrpn/",
  ],
  knowsAbout: ["Full-stack development", "TypeScript", "React", "Next.js", "Node.js", "DevOps", "IT infrastructure"],
};

export default function Home() {
  return (
    <HomeClientWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="page-sky relative isolate min-h-screen">
        <SkyBackground />
        <Header />
        <main>
          <Hero />
          <Stats />
          <About />
          <Journey />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <ScrollReveal />
      </div>
    </HomeClientWrapper>
  );
}
