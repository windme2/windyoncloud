import { navLinks } from "@/data/navigation";
import { SocialLinks } from "@/components/SocialIcon";

/**
 * Footer — oversized light wordmark, link columns and social outline circles.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t pb-8 pt-16 text-left">
      <div className="container mx-auto max-w-7xl">
        <a
          href="#home"
          className="text-sky block font-display text-[clamp(2.75rem,11.5vw,10rem)] font-extralight leading-[0.9] tracking-tight"
        >
          windyoncloud
        </a>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Full-stack developer in Bangkok, coming from logistics and IT
            infrastructure. I build web applications and internal tools that
            automate real workflows, from ERP data to deployment, and keep them
            clean, fast and easy to use.
          </p>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[10px] font-medium uppercase tracking-[0.25em]">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="space-y-4 md:text-right">
            <a
              href="mailto:intouch.crp@gmail.com"
              className="block text-sm transition-colors hover:text-primary-ink"
            >
              intouch.crp@gmail.com
            </a>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Bangkok, Thailand
            </p>
            <SocialLinks size="sm" all className="md:justify-end" />
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between gap-6 border-t pt-6 pr-16 md:pr-20 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>© {currentYear} windyoncloud</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
