/**
 * Projects section data configurations.
 * Contains portfolio projects metadata and list of filter categories.
 * Updated to contain exactly 9 projects.
 */

export const projects = [
  // ⭐ Featured Projects (Web Applications)
  /*
  {
    title: "Intouch-folio - Web Portfolio",
    description:
      "Modern, responsive portfolio website showcasing projects, skills, and professional journey with smooth animations and dark mode support.",
    image: "/assets/screenshots/intouch-folio-preview.webp",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn UI",
      "Radix UI",
      "Lucide React",
    ],
    demoLink: "https://intouch-folio.vercel.app/",
    codeLink: "https://github.com/windme2/intouch-folio",
    featured: true,
    category: "Web Application",
  },
  */
  {
    title: "WindSpace - Personal blog platform",
    description:
      "Personal blog platform with modern features, and responsive design for seamless content creation.",
    image: "/assets/screenshots/windspace-preview.webp",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Supabase (PostgreSQL)",
    ],
    demoLink: "https://windspace.vercel.app",
    codeLink: "https://github.com/windme2/windspace",
    featured: true,
    category: "Full-Stack",
  },
  {
    title: "WindSphere - Weather forecast",
    description:
      "Weather forecast Web Application with 5-day analytics for Bangkok region, featuring glassmorphic UI and responsive design layout.",
    image: "/assets/screenshots/windsphere-preview.webp",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn UI",
      "Radix UI",
      "Lucide React",
      "Open Weather API",
    ],
    demoLink: "https://windsphere.vercel.app",
    codeLink: "https://github.com/windme2/windsphere",
    featured: true,
    category: "Frontend",
  },
  {
    title: "Windle - Word Puzzle Game",
    description:
      "Word Puzzle game with engaging gameplay and modern UI design.",
    image: "/assets/screenshots/windle-preview.webp",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express.js",
      "Shadcn UI",
      "Radix UI",
      "Lucide React",
    ],
    demoLink: "https://windle.vercel.app",
    codeLink: "https://github.com/windme2/windle",
    featured: true,
    category: "Frontend",
  },
  /*
  {
    title: "WindyOnCloud - Portfolio v2",
    description:
      "Rebuilt portfolio using Next.js App Router with SSR, enhanced SEO, improved performance, and an upgraded visual experience.",
    image: "/assets/screenshots/intouch-folio-preview.webp",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS v4",
      "next-themes",
      "Lucide React",
      "Iconify",
    ],
    demoLink: "https://windyoncloud.vercel.app",
    codeLink: "https://github.com/windme2/windyoncloud",
    featured: true,
    category: "Web Application",
  },

  // 🚀 API & Microservices Projects
  {
    title: "WindyAuth - Secure Gateway Service",
    description:
      "High-performance centralized authentication microservice featuring token validation, OAuth2 integrations, and Redis sessions.",
    image: "/assets/screenshots/windspace-preview.webp",
    tags: ["Node.js", "Express", "TypeScript", "Redis", "JWT", "PostgreSQL", "Docker"],
    demoLink: "",
    codeLink: "https://github.com/windme2/windy-auth",
    featured: false,
    category: "API & Microservices",
  },
  {
    title: "WindyDNS - Fast Fastify API Service",
    description:
      "Ultra-low latency DNS query helper service built on Fastify with caching layers and direct socket connections.",
    image: "/assets/screenshots/windsphere-preview.webp",
    tags: ["Node.js", "Fastify", "TypeScript", "DNS Modules", "Memory Cache", "Docker"],
    demoLink: "",
    codeLink: "https://github.com/windme2/windy-dns",
    featured: false,
    category: "API & Microservices",
  },

  // 🛠️ CI/CD & DevOps Projects
  {
    title: "AutoDeployer - Multicloud Deploy Pipeline",
    description:
      "Fully automated CI/CD pipeline template using GitHub Actions to build, scan, and deploy Docker images to AWS ECS & Vercel.",
    image: "/assets/screenshots/windsphere-preview.webp",
    tags: ["GitHub Actions", "Docker", "AWS", "Bash", "Snyk Security", "Slack Webhooks"],
    demoLink: "",
    codeLink: "https://github.com/windme2/auto-deployer",
    featured: false,
    category: "CI/CD",
  },

  // ☁️ Infrastructure & Cloud Projects
  {
    title: "GCP-Terraform-Cluster - IaC Deployment",
    description:
      "Declarative Infrastructure as Code (IaC) configuration utilizing Terraform to provision load-balanced Google Kubernetes Engine (GKE) clusters.",
    image: "/assets/screenshots/windspace-preview.webp",
    tags: ["Terraform", "Google Cloud", "Kubernetes", "GKE", "Bash", "IAM Security"],
    demoLink: "",
    codeLink: "https://github.com/windme2/gcp-terraform-cluster",
    featured: false,
    category: "Infrastructure & Cloud",
  },
  */
];

// Project categorization tab lists
export const categories = ["All", "Frontend", "Full-Stack"];
