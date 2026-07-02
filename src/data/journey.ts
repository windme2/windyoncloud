/**
 * Journey section data
 * Timeline data for education and professional experience
 */
import {
  GraduationCap,
  Briefcase,
  Code,
  Building,
  Target,
  Package,
  Laptop,
} from "lucide-react";

export const educationData = [
  {
    year: "2015-2018",
    title: "Vocational Certificate",
    subtitle: "Business Computer",
    institution: "Viboon Business Administration Technological College",
    description:
      "Foundation in business computer systems and basic programming concepts.",
    icon: GraduationCap,
    status: "completed",
  },
  {
    year: "2020-2024",
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
      "Initially responsible for senior inventory management, they fully dedicated themselves to improving the performance of all hardware and spare parts, recording data, and monitoring via Dynamics 365 Central, including data analysis. They were also heavily involved in IT infrastructure work, maintaining primary server and storage infrastructure using VMware/remote tools (iDRAC, iLO, IMM), and designing automated workflows to minimize hardware configuration errors.",
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
