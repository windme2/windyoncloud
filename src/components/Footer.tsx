import { Mail, MapPin, Phone } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/icons";
import { navLinks } from "@/data/navigation";

/**
 * Rebuilt Full-Set Footer component.
 * Layout structured according to user reference image:
 * - Left column: Brand logo, customized portfolio description, and social circular icons.
 * - Middle column: QUICK LINKS site navigation items.
 * - Right column: CONNECT INFO location and email contact specs.
 * - Bottom row: Trademark statement separated by a subtle dividing horizontal line.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-neutral-950 border-t border-gray-200 dark:border-gray-900 pt-16 pb-8 transition-colors duration-300 text-left">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Left Column: Brand Logo, Description, and Socials */}
          <div className="space-y-6">
            <a
              href="#home"
              className="text-2xl font-bold tracking-tighter hover:text-orange-500 transition-colors inline-block"
            >
              <span>windyoncloud</span>
              <span className="text-orange-500 ml-0.5">.</span>
              <span className="text-muted-foreground text-lg">me</span>
            </a>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Building clean, high-performance web applications: where
              operational efficiency and modern design meet to create scalable
              digital solutions.
            </p>

            {/* Circular outline social links */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://github.com/windme2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="https://linkedin.com/in/intouch-charoenphon-a89b21207/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-600 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="https://instagram.com/withcrpn/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-pink-500 hover:border-pink-500 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Middle Column: QUICK LINKS Navigation */}
          <div className="space-y-6 md:pl-12">
            <h4 className="text-sm font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: CONNECT INFO (Replacing Get in touch) */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
              Connect Info
            </h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a
                  href="mailto:intouch.crp@gmail.com"
                  className="hover:text-orange-500 transition-colors"
                >
                  intouch.crp@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+66 63-952-5873</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Bangkok, Thailand</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex justify-center items-center text-center text-xs font-semibold text-slate-400 dark:text-slate-500">
          <div>© {currentYear} windyoncloud | All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
