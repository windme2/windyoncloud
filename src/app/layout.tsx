import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist_Mono, Fraunces, Outfit, Prompt } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";
import { siteUrl } from "@/lib/site";

// Three families only: Outfit (display + body), Fraunces (italic accents), Geist Mono (labels)
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Thai glyphs (the /services page): Outfit has none, so Prompt (also geometric) fills them in.
// Declared here, not on that page, so it lives in the main stylesheet: a page-only CSS file got
// preloaded on every page that prefetches /services and went unused (console warnings). Its files are
// unicode-range split, so they only download where Thai text actually renders. No preload, same reason.
const prompt = Prompt({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500"],
  preload: false,
});

// Define global SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "windyoncloud — Intouch Charoenphon | Full-stack Developer Portfolio",
  description:
    "Portfolio of Intouch Charoenphon (windyoncloud), a Full-stack Developer with professional experience in logistics management, building elegant, user-centered web applications that simplify business processes.",
  keywords: [
    "Intouch Charoenphon",
    "windyoncloud",
    "Full-stack Developer",
    "DevOps Engineer",
    "Software Engineer",
    "Web Development",
    "IT Automation Specialist",
    "IT Infrastructure Engineer",
  ],
  authors: [{ name: "Intouch Charoenphon" }],
  creator: "Intouch Charoenphon",
  openGraph: {
    title: "windyoncloud — Intouch Charoenphon",
    description:
      "Full-stack Developer portfolio focusing on efficiency and user-centered design.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "windyoncloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "windyoncloud — Intouch Charoenphon",
    description:
      "Full-stack Developer portfolio focusing on efficiency and user-centered design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${fraunces.variable} ${outfit.variable} ${prompt.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Skill and certification icons are fetched from Iconify at runtime */}
        <link
          rel="preconnect"
          href="https://api.iconify.design"
          crossOrigin="anonymous"
        />
        {/* Before first paint: a returning visit (this session) or reduced motion hides the intro
            overlay right away, so a reload never flashes the terminal before React takes over */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("windy-intro")==="done"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.introSeen=""}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          {/* Reads the URL (usePathname) and renders nothing, so its own boundary keeps that URL read
              out of the shared shell; Next's instant-navigation check flags it otherwise */}
          <Suspense fallback={null}>
            <SmoothScroll />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
