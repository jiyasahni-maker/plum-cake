// Placeholder entries drafted for you: edit wording, add links, add or remove projects.
// The first project is shown large. Add `links` as { label, href } to show link buttons.
export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  highlight?: { value: string; label: string };
  tech: string[];
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "phishing-detection",
    category: "Research",
    title: "Hybrid Phishing Detection",
    description:
      "A machine learning framework that spots phishing websites. Two feature-selection methods agree on the strongest signals, and three models vote together as a soft ensemble, validated with stratified cross-validation and leakage-safe splits.",
    highlight: { value: "13", label: "selected features deliver performance comparable to the full set" },
    tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Jupyter"],
    // links: [{ label: "GitHub", href: "https://github.com/..." }],
  },
  {
    id: "hypelens",
    category: "Hackathon",
    title: "HypeLens",
    description:
      "An AI-powered tool that tells genuine products from hype, built for a creator-economy hackathon with a high-fidelity interactive prototype and a pitch aimed at creators and brands.",
    tech: ["AI", "Prototype", "Product design"],
  },
  {
    id: "codex-personalis",
    category: "Tool",
    title: "Codex Personalis",
    description:
      "A gothic dark-academia tracker in a single HTML file: syllabus progress, journaling, projects and resume building in one place.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "portfolio",
    category: "Web",
    title: "This Portfolio",
    description:
      "An observatory you can walk through, with a studio mode for a calmer read. Painted rooms, a 3D armillary sphere and a switch that carries you between both worlds.",
    tech: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
    links: [{ label: "GitHub", href: "https://github.com/jiyasahni-maker/plum-cake" }],
  },
  {
    id: "early-experiments",
    category: "Early work",
    title: "Early Experiments",
    description:
      "Where it started: a terminal game written in C and a macOS widget, small projects that taught me how software comes together.",
    tech: ["C", "SwiftUI"],
  },
];
