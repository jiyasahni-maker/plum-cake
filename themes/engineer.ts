import { Theme } from "@/types/theme";

export const engineerTheme: Theme = {
  name: "engineer",

  colors: {
    background: "#FFFFFF",
    surface: "#F4F4F5",
    primary: "#111827",
    secondary: "#4B5563",
    accent: "#2563EB",
    text: "#18181B",
  },

  fonts: {
    heading: "var(--font-inter)",
    body: "var(--font-inter)",
  },

  animation: {
    duration: 0.4,
    easing: "easeOut",
  },
};