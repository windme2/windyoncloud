import { projects } from "@/data/projects";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Header } from "@/components/Header";
import { FilteredProjects } from "@/components/Projects";
import { SkyBackground } from "@/components/SkyBackground";
import { SectionHeading } from "@/components/SectionHeading";

/** Dedicated projects page — every project, with the same category filter as the home section. */
export default function AllProjectsPage() {
  return (
    <div className="page-sky relative isolate flex min-h-screen flex-col justify-between text-foreground">
      <SkyBackground />
      <Header />

      <main className="flex-1 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="container mx-auto max-w-7xl">
          <SectionHeading
            as="h1"
            index="All"
            label="Work"
            title="All"
            accent="projects"
          />
          <FilteredProjects items={projects} eagerFirst />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </div>
  );
}
