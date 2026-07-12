import { Project } from "../types/content";

export const projects: Project[] = [
  {
    id: "personal-platform",

    title: "Personal Platform",

    tagline:
      "A dual-world portfolio that transforms between imagination and engineering.",

    description:
      "An immersive portfolio experience designed around a celestial universe where creativity and engineering coexist through two unique viewing modes.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],

    github: "https://github.com/jiyasahni-maker",

    live: "",

    featured: true,

    status: "in-progress",

    year: "2026",

    problem:
      "Traditional portfolios often showcase projects but rarely communicate personality or engineering philosophy.",

    solution:
      "Build an experience where storytelling and software architecture become equally important.",

    architecture:
      "Component-driven architecture using reusable UI primitives, a universe engine and theme system.",

    learnings: [
      "Design systems",
      "Component architecture",
      "Advanced React",
      "UI storytelling",
    ],
  },

  {
    id: "wardrobe-ai",

    title: "AI Wardrobe Assistant",

    tagline:
      "Helping people make better clothing decisions with AI.",

    description:
      "A smart wardrobe management application that recommends outfits, tracks clothing usage and encourages sustainable fashion.",

    technologies: [
      "Flutter",
      "MERN",
      "AI",
    ],

    github: "",

    live: "",

    featured: false,

    status: "in-progress",

    year: "2026",

    problem:
      "People repeatedly wear the same clothes while forgetting what they already own.",

    solution:
      "Create an intelligent wardrobe assistant capable of recommending outfits based on multiple contextual factors.",

    architecture:
      "Flutter frontend with MERN backend and recommendation engine.",

    learnings: [
      "Mobile architecture",
      "Recommendation systems",
      "Backend APIs",
    ],
  },

  {
    id: "battery-widget",

    title: "macOS Battery Widget",

    tagline:
      "A lightweight macOS widget for monitoring battery status.",

    description:
      "A native macOS widget built using SwiftUI that displays battery information in a clean and elegant interface.",

    technologies: [
      "SwiftUI",
      "WidgetKit",
    ],

    github: "",

    live: "",

    featured: false,

    status: "completed",

    year: "2025",

    problem:
      "Battery information should be instantly accessible without opening system settings.",

    solution:
      "Create a lightweight desktop widget using Apple's native frameworks.",

    architecture:
      "SwiftUI + WidgetKit.",

    learnings: [
      "Apple ecosystem",
      "SwiftUI",
      "Widget development",
    ],
  },
];