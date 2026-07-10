// Local definition to avoid relying on path aliases or external type files
type SiteContent = {
  name: string;
  tagline?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
};

export const site: SiteContent = {
  name: "Jiya Sahni",

  tagline: "Building intelligent software with curiosity, creativity, and purpose.",

  email: "sahnijiya06@gmail.com",

  github: "https://github.com/jiyasahni-maker",

  linkedin: "https://www.linkedin.com/in/jiya-sahni2020/",

  resume: "/resume.pdf",
};