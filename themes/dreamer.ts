import { Theme } from "@/types/theme";

export const dreamerTheme: Theme = {
  name: "dreamer",

  colors: {
    background: "#050816",
    surface: "#111827",
    primary: "#7C3AED",
    secondary: "#C084FC",
    accent: "#FFD166",
    text: "#F8FAFC",
  },

  fonts: {
    heading: "var(--font-cinzel)",
    body: "var(--font-inter)",
  },

  animation: {
    duration: 0.8,
    easing: "easeInOut",
  },
};