/**
 * Journey section data
 * Timeline data for education and professional experience
 */
import {
  GraduationCap,
  Code,
  Package,
  ShoppingCart,
  ClipboardList,
  Server,
  Terminal,
  PenTool,
} from "lucide-react";

export const educationData = [
  {
    year: "Jun 2016 - Jan 2018",
    title: "Bachelor of Science and Technology",
    subtitle: "Industrial Product Design",
    institution: "Rajamangala University of Technology Krungthe (RMUTK)",
    description:
      "Focused on industrial product and furniture design, including AutoCAD drafting, 3D modeling, and computer-generated 3D animations.",
    icon: PenTool,
    status: "incomplete",
  },
  {
    year: "Jun 2024 - Mar 2026",
    title: "Higher Vocational Certificate",
    subtitle: "Information Technology",
    institution: "Attawit Commercial Technology College (ATC)",
    description:
      "Built a strong foundation in information technology systems, database management, web development, and software engineering principles.",
    icon: Code,
    status: "completed",
  },
  {
    year: "Aug 2026 - 2028 (Expected)",
    title: "Bachelor of Engineering",
    subtitle: "Computer Engineering and Artificial Intelligence",
    institution: "University of the Thai Chamber of Commerce (UTCC)",
    description:
      "Advancing technical expertise in software architecture, system automation, machine learning, and artificial intelligence applications.",
    icon: GraduationCap,
    status: "current",
  },
];

export const experienceData = [
  {
    year: "Jan 2018 - Mar 2020",
    title: "Packaging & Warehouse Operation",
    subtitle: "Industrial Manufacturing",
    company: "Apex Plastech (Thailand) Company Limited",
    description:
      "Executed quality inspection, sorting, and industrial packaging for molded plastic products. Managed finished goods put-away, inventory tracking, and palletization to ensure accurate dispatch and supply chain efficiency.",
    icon: Package,
    status: "completed",
  },
  {
    year: "May 2020 - May 2021",
    title: "Warehouse Operation (Online)",
    subtitle: "E-Commerce & Fulfillment",
    company: "Com7 Public Company Limited",
    description:
      "Organized warehouse layout and category-based put-away. Received goods, performed QC, and distributed products to branches nationwide.",
    icon: ShoppingCart,
    status: "completed",
  },
  {
    year: "Jun 2021 - Mar 2022",
    title: "Senior Inventory Management",
    subtitle: "Supply Chain & Procurement",
    company: "Susan Croissant Company Limited",
    description:
      "Planned raw material procurement to align with production timelines and budgets. Maintained real-time stock accuracy and optimized warehouse storage capacity.",
    icon: ClipboardList,
    status: "completed",
  },
  {
    year: "Apr 2022 - May 2026",
    title: "System Engineer",
    subtitle: "IT Infrastructure & Operations",
    company: "System Dot Com Company Limited",
    description:
      "Transitioned from senior inventory management to IT infrastructure, driving hardware data analysis through Microsoft Dynamics 365 Business Central. Managed core servers and storage with VMware and remote management tools including iDRAC, iLO, and IMM. Engineered automated workflows that eliminated configuration errors and reduced setup times.",
    icon: Server,
    status: "completed",
  },
  {
    year: "May 2026 - Sep 2026",
    title: "IT Automation Specialist",
    subtitle: "Automation & Optimization",
    company: "G-Able Public Company Limited at Siam Piwat via PRTR",
    description:
      "Managed OS and package deployment through MDT and Endpoint Central. Developed Windows applications with C#, PowerShell, Bash, and CMD scripts for task automation, while using Power Platform for workflow optimization. Oversaw centralized endpoint patching, Power BI metrics tracking, and sandboxed security analysis. Reduced setup time by 40% and configuration errors through workflow automation.",
    icon: Terminal,
    status: "completed",
  },
  {
    year: "Sep 2026 - Present",
    title: "Software Engineer",
    subtitle: "Full-Stack Developer",
    company: "Yip In Tsoi Company Limited",
    description:
      "Architect, develop, and maintain scalable web applications and enterprise solutions using Next.js, Node.js, pnpm, PostgreSQL, and Supabase. Integrate AI capabilities with Python and deploy containerized applications through Docker and DigitalOcean. Migrated data to Google Cloud Platform (GCP), reducing monthly infrastructure costs by approximately 81–88%.",
    icon: Code,
    status: "current",
  },
];
