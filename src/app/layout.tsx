import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// Configure optimized Google Fonts locally at build time
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Define global SEO metadata
export const metadata: Metadata = {
  title: "windyoncloud — Intouch Charoenphon | Full-stack Developer Portfolio",
  description:
    "Portfolio of Intouch Charoenphon (windyoncloud), a Full-stack Developer with professional experience in logistics management, building elegant, user-centered web applications that simplify business processes.",
  keywords: [
    "Intouch Charoenphon",
    "windyoncloud",
    "Full-stack Developer",
    "DevOps Engineer",
    "Software Engineer",
    "Web Developer",
    "IT Automation Specialist",
    "IT Infrastructure",
  ],
  authors: [{ name: "Intouch Charoenphon" }],
  creator: "Intouch Charoenphon",
  openGraph: {
    title: "windyoncloud — Intouch Charoenphon",
    description:
      "Full-stack Developer portfolio focusing on efficiency and user-centered design.",
    type: "website",
    locale: "en_US",
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
