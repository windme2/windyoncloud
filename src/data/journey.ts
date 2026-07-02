/**
 * Journey section data
 * Timeline data for education and professional experience
 */
import {
  GraduationCap,
  Briefcase,
  Code,
  Building,
  Package,
  Laptop,
} from "lucide-react";

export const educationData = [
  {
    year: "2012-2015",
    title: "Vocational Certificate",
    subtitle: "Business Computer",
    institution: "Viboon Business Administration Technological College",
    description:
      "Foundation in business computer systems and basic programming concepts.",
    icon: GraduationCap,
    status: "completed",
  },
  {
    year: "2017-2020",
    title: "Bachelor of Science and Technology",
    subtitle: "Industrial Product Design (Drop out)",
    institution: "Rajamangala University of Technology Krungthep",
    description:
      "Focused on industrial product and furniture design, including AutoCAD drafting, 3D modeling, and computer-generated 3D animations.",
    icon: Laptop,
    status: "completed",
  },
  {
    year: "2024-2026",
    title: "High Vocational Certificate",
    subtitle: "Information Technology",
    institution: "Attawit Commercial Technology College",
    description:
      "Foundation in information technology concepts, web development, and software engineering.",
    icon: Code,
    status: "completed",
  },
  {
    year: "2026-2028",
    title: "Bachelor of Engineering",
    subtitle: "Computer Engineering and Artificial Intelligence",
    institution: "University of the Thai Chamber of Commerce",
    description:
      "To deepen technical knowledge in software engineering, system automation, and artificial intelligence principles.",
    icon: GraduationCap,
    status: "current",
  },
];

export const experienceData = [
  {
    year: "2020-2021",
    title: "Operation Online Warehouse",
    subtitle: "Warehouse & Fulfillment",
    company: "Com7 Public Company Limited",
    description:
      "Organized warehouse layout and category-based put-away. Received goods, performed QC, and distributed products to branches nationwide.",
    icon: Package,
    status: "completed",
  },
  {
    year: "2021-2022",
    title: "Inventory Control",
    subtitle: "Ingredient Management",
    company: "Susan Croissant Company Limited",
    description:
      "Planned material procurement to meet production timelines and budget. Maintained accurate stock levels and optimized storage usage.",
    icon: Building,
    status: "completed",
  },
  {
    year: "2022-2026",
    title: "System Engineer",
    subtitle: "IT Infrastructure & Operations",
    company: "System Dot Com Company Limited",
    description:
      "Originally managing senior inventory, optimized the performance of IT hardware and spare parts while driving data analysis via Microsoft Dynamics 365 Business Central. Concurrently managed core IT infrastructure by maintaining server and storage systems using VMware and remote tools (iDRAC, iLO, IMM), while engineering automated workflows to eliminate hardware configuration errors. These automation efforts successfully reduced system setup times and significantly improved operational reliability.",
    icon: Briefcase,
    status: "completed",
  },
  {
    year: "2026-Present",
    title: "IT Automation Specialist",
    subtitle: "Automation & Optimization",
    company: "G-Able Public Company Limited @Siam Piwat via PRTR",
    description:
      "Manage OS and package deployment via MDT and Endpoint Central, developing custom applications and PowerShell/Bash scripts for task automation. Oversee centralized endpoint patching, Power BI metrics tracking, and sandboxed security analysis.",
    icon: Code,
    status: "current",
  },
];
