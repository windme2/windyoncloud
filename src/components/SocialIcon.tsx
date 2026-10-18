import type { ReactNode } from "react";
import { BriefcaseBusiness, Mail } from "lucide-react";
import { Github, Instagram, Linkedin, Tiktok } from "@/components/icons";
import { cn } from "@/lib/utils";
import { serviceContact } from "@/data/services";

interface SocialIconProps {
  label: string;
  href: string;
  /** Brand colour (or gradient, e.g. Instagram) that fills the circle from the bottom on hover. */
  fill: string;
  /** Icon colour once filled: white (default) or dark (for light fills). */
  dark?: boolean;
  size?: "md" | "sm";
  children: ReactNode;
}

/** Outline circle whose brand colour fills up from the bottom on hover. */
export function SocialIcon({
  label,
  href,
  fill,
  dark = false,
  size = "md",
  children,
}: SocialIconProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group relative grid shrink-0 place-items-center overflow-hidden rounded-full border transition-colors duration-500 hover:border-transparent",
        size === "md" ? "h-11 w-11" : "h-10 w-10",
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
        style={{ background: fill }}
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-500",
          dark ? "group-hover:text-black" : "group-hover:text-white",
        )}
      >
        {children}
      </span>
    </a>
  );
}

/** The one social set, so the hero and the footer always show the same icons in the same order. */
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/windme2",
    fill: "#24292e",
    icon: <Github className="h-4 w-4" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/intouch-charoenphon-a89b21207/",
    fill: "#0a66c2",
    icon: <Linkedin className="h-4 w-4" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/withcrpn/",
    fill: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
    icon: <Instagram className="h-4 w-4" />,
  },
  {
    label: "Email",
    href: "mailto:intouch.crp@gmail.com",
    fill: "#ea4335",
    icon: <Mail size={16} strokeWidth={1.5} />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@windyoncloud",
    fill: "#000000",
    icon: <Tiktok className="h-4 w-4" />,
    footerOnly: true,
  },
  {
    // freelance profile: footer only (the hero stays personal/professional); hidden until set
    label: "Fastwork",
    href: serviceContact.fastwork,
    fill: "#1b5ff2",
    icon: <BriefcaseBusiness size={16} strokeWidth={1.5} />,
    footerOnly: true,
  },
].filter((s) => s.href);

/** Row of social circles (brand colour fills in on hover). */
export function SocialLinks({
  size = "md",
  className,
  all = false,
}: {
  size?: "md" | "sm";
  className?: string;
  /** Include footer-only links (Fastwork). */
  all?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socials
        .filter((s) => all || !("footerOnly" in s && s.footerOnly))
        .map((s) => (
          <SocialIcon
            key={s.label}
            label={s.label}
            href={s.href}
            fill={s.fill}
            size={size}
          >
            {s.icon}
          </SocialIcon>
        ))}
    </div>
  );
}
