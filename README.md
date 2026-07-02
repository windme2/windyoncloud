# windyoncloud — Intouch Charoenphon Portfolio

A modern, responsive, and visually stunning personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. The portfolio showcases my professional journey, technical skills, open-source projects, and contact information.

## ✨ Features

- **Dynamic Hero Section**: Interactive introductory terminal and typing animations showcasing multiple technical roles.
- **Interactive Timeline**: Detailed showcase of academic background and professional experience.
- **Projects Grid**: Categorized view of projects with descriptions, tags, and links to source code/live previews.
- **Skills Directory**: Technical expertise categorized by proficiency and domain.
- **Dark/Light Mode**: Seamless theme toggling with `next-themes` and a custom toggle component.
- **Smooth Animations**: Custom page load splash screens, terminal transitions, and interactive components.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Iconify](https://iconify.design/)
- **State/Theme**: `next-themes`
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router layouts and page entries
├── components/           # Reusable UI components (Hero, About, Projects, Journey, etc.)
│   └── ui/               # Lower-level design primitives
├── data/                 # Static data configurations (skills, projects, journey data)
└── lib/                  # Core helpers and utility functions
```

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure you have Node.js (version 18 or higher) and npm/yarn/pnpm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/windme2/intouch-folio.git
   cd intouch-folio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build and Lint

- **Production Build**:
  ```bash
  npm run build
  ```
- **Linter Check**:
  ```bash
  npm run lint
  ```

## 📬 Contact

- **GitHub**: [@windme2](https://github.com/windme2)
