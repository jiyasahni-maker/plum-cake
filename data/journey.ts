// Placeholder milestones: edit titles, dates and wording so they're accurate.
export interface JourneyEntry {
  period: string;
  title: string;
  place?: string;
  description: string;
  current?: boolean;
}

export const journey: JourneyEntry[] = [
  {
    period: "2025",
    title: "Began my B.Tech in Computer Science",
    place: "IGDTUW, Delhi",
    description:
      "Started my degree and began building with Python, JavaScript and the web.",
  },
  {
    period: "2025–26",
    title: "Rotaract Club of IGDTUW",
    place: "IGDTUW",
    description:
      "Joined the club's community and service work alongside my first year of studies.",
  },
  {
    period: "Summer 2026",
    title: "Machine learning research internship",
    place: "Anveshan Foundation of IGDTUW",
    description:
      "Spent two months building a phishing-detection system with machine learning.",
  },
  {
    period: "Now",
    title: "Second year, looking ahead",
    place: "IGDTUW",
    description:
      "Going deeper into AI/ML and cybersecurity, and building projects where the design matters as much as the code.",
    current: true,
  },
];
