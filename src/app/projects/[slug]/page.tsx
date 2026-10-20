import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { AccessBadge } from "@/components/AccessBadge";
import { ProjectTile } from "@/components/ProjectTile";
import { Github } from "@/components/icons";
import { projects, type Project } from "@/data/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkyBackground } from "@/components/SkyBackground";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — windyoncloud`,
    description: project.summary ?? project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

const pill =
  "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background";

const label =
  "font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground";

/** Section title in the site style: light display word + italic serif accent. */
function SubHeading({ title, accent }: { title: string; accent: string }) {
  return (
    <h2 className="reveal font-display text-3xl font-extralight leading-none tracking-tight md:text-5xl">
      <span className="text-sky">
        {title}{" "}
        <span className="accent font-serif font-light italic">{accent}</span>
        <span className="accent">.</span>
      </span>
    </h2>
  );
}

/** Numbered columns (01, 02, 03…) divided by thin rules. */
function NumberedGrid({
  items,
}: {
  items: NonNullable<Project["highlights"]>;
}) {
  return (
    <ol className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
      {items.map((item, i) => {
        const { title, text } =
          typeof item === "string" ? { title: undefined, text: item } : item;
        return (
          <li
            key={i}
            className="reveal border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-primary-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            {title && (
              <h3 className="mt-4 font-display text-xl font-light tracking-tight">
                {title}
              </h3>
            )}
            <p
              className={`${title ? "mt-3" : "mt-4"} text-sm leading-relaxed text-muted-foreground md:text-base`}
            >
              {text}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  // The projects that follow this one (wrapping round), up to three
  const more = Array.from(
    { length: Math.min(3, projects.length - 1) },
    (_, i) => projects[(index + 1 + i) % projects.length],
  );

  const meta = [
    ["Year", project.year],
    ["Role", project.role],
    ["Type", project.category],
    ["Status", project.status],
    ["Access", project.access && `${project.access} — no public link`],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const story = project.story;
  const storyParts = (
    [
      ["The problem", story?.problem],
      ["The approach", story?.approach],
      ["The outcome", story?.outcome],
    ] as const
  ).filter(([, text]) => text);

  return (
    <div className="page-sky relative isolate flex min-h-screen flex-col justify-between text-foreground">
      <SkyBackground />
      <Header />

      <main className="flex-1 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="container mx-auto max-w-6xl">
          {/* Title + links */}
          <div className="reveal flex flex-wrap items-center gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-ink">
              Case study
            </p>
            {project.access && <AccessBadge access={project.access} />}
          </div>
          <h1 className="reveal mt-4 font-display text-4xl font-extralight leading-tight tracking-tight sm:text-5xl md:text-7xl">
            <span className="text-sky">{project.title}</span>
          </h1>

          {(project.demoLink || project.codeLink) && (
            <div className="reveal mt-8 flex flex-wrap gap-3">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pill}
                >
                  <ExternalLink size={12} /> Live site
                </a>
              )}
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pill}
                >
                  <Github className="h-3 w-3" /> Source
                </a>
              )}
            </div>
          )}

          <div className="reveal glass relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl p-2 md:p-3">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                loading="eager"
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1150px"
              />
            </div>
          </div>

          {/* Side panel (facts) + statement */}
          <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-16">
            <aside className="reveal md:col-span-4">
              <dl>
                {meta.map(([term, value]) => (
                  <div key={term} className="border-b pb-5 pt-5 first:pt-0">
                    <dt className={label}>{term}</dt>
                    <dd className="mt-2 text-base">{value}</dd>
                  </div>
                ))}
                <div className="pt-5">
                  <dt className={label}>Stack</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-foreground/20 bg-background/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/85"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </aside>

            <div className="md:col-span-8">
              <p className="reveal font-display text-2xl font-light leading-snug tracking-tight md:text-4xl">
                {project.summary ?? project.description}
              </p>

              {storyParts.length > 0 && (
                <div className="mt-12 space-y-10">
                  {storyParts.map(([title, text]) => (
                    <section key={title} className="reveal">
                      <h2 className={label}>{title}</h2>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                        {text}
                      </p>
                    </section>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Numbered highlights / decisions */}
          {project.highlights && project.highlights.length > 0 && (
            <section className="mt-24 md:mt-32">
              <SubHeading title="Key" accent="highlights" />
              <NumberedGrid items={project.highlights} />
            </section>
          )}

          {/* Architecture diagram: on a light panel so exported diagrams read in both themes */}
          {project.diagram && (
            <section className="mt-24 md:mt-32">
              <SubHeading title="System" accent="architecture" />
              <figure className="reveal mt-10 md:mt-14">
                <div className="overflow-x-auto rounded-3xl border bg-white p-4 md:p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element -- SVG of unknown size */}
                  <img
                    src={project.diagram.src}
                    alt={
                      project.diagram.caption ??
                      `${project.title} architecture diagram`
                    }
                    className="mx-auto h-auto w-full min-w-[640px] max-w-5xl"
                  />
                </div>
                {project.diagram.caption && (
                  <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                    {project.diagram.caption}
                  </figcaption>
                )}
              </figure>
            </section>
          )}

          {/* Gallery: first shot full width, the rest two per row */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-24 md:mt-32">
              <SubHeading title="Inside the" accent="product" />
              <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
                {project.gallery.map((shot, i) => (
                  <figure
                    key={shot.src + i}
                    className={`reveal ${i === 0 ? "md:col-span-2" : ""}`}
                  >
                    <div className="glass relative aspect-[16/10] overflow-hidden rounded-2xl p-1.5">
                      <div className="relative h-full w-full overflow-hidden rounded-xl">
                        <Image
                          src={shot.src}
                          alt={
                            shot.caption ??
                            `${project.title} screenshot ${i + 1}`
                          }
                          fill
                          className="object-cover"
                          sizes={
                            i === 0
                              ? "(max-width: 1200px) 100vw, 1150px"
                              : "(max-width: 768px) 100vw, 570px"
                          }
                        />
                      </div>
                    </div>
                    {shot.caption && (
                      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {story?.decisions && story.decisions.length > 0 && (
            <section className="mt-24 md:mt-32">
              <SubHeading title="Key" accent="decisions" />
              <NumberedGrid items={story.decisions} />
            </section>
          )}

          {/* More projects */}
          {more.length > 0 && (
            <section className="mt-24 md:mt-32">
              <div className="flex items-end justify-between gap-6">
                <SubHeading title="More" accent="projects" />
                <Link
                  href="/projects"
                  className="reveal hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground sm:block"
                >
                  All projects →
                </Link>
              </div>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
                {more.map((p) => (
                  <li key={p.slug} className="reveal">
                    <ProjectTile project={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </div>
  );
}
