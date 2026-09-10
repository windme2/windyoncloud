/**
 * Certifications — shown as a row under the Skills grid. Hidden when empty.
 * icon: any Iconify id (https://icon-sets.iconify.design), e.g. "logos:aws",
 *       or an image path under /public for logos Iconify does not have.
 * link: the credential / verification URL (Credly, Microsoft Learn…), or "".
 */
export interface Certification {
  name: string;
  issuer: string;
  /** Year earned; leave "" to hide it. */
  year: string;
  icon: string;
  /** Tint for single-colour icons (simple-icons / mdi); brand-colour icons ignore it. */
  color?: string;
  link: string;
  /** Keep the entry but leave it off the page. */
  hidden?: boolean;
}

// Ordered by how much each one says about the target role (cloud / DevOps / software).
export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "",
    icon: "logos:aws",
    link: "",
    hidden: true,
  },
  {
    name: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    year: "",
    icon: "simple-icons:cisco",
    color: "#049fd9",
    link: "",
    hidden: true,
  },
  {
    name: "Software Engineer Certificate",
    issuer: "HackerRank",
    year: "",
    icon: "simple-icons:hackerrank",
    color: "#00b051",
    link: "",
  },
  {
    name: "Enterprise Cybersecurity Mastery",
    issuer: "BOI STEM",
    year: "",
    icon: "mdi:shield-lock-outline",
    color: "#1e3a8a",
    link: "",
  },
  {
    name: "Certified Cybersecurity Educator Professional (CCEP)",
    issuer: "Red Team Leaders",
    year: "",
    icon: "mdi:shield-account-outline",
    color: "#c81e1e",
    link: "",
  },
  {
    name: "AI Fundamentals Certification",
    issuer: "DataCamp",
    year: "",
    icon: "simple-icons:datacamp",
    color: "#05192d",
    link: "",
  },
  {
    name: "Exploratory Data Analysis with Excel",
    issuer: "Skooldio",
    year: "",
    icon: "/assets/logos/skooldio.png",
    link: "",
  },
];
