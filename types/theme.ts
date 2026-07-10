export interface Theme {
  name: "dreamer" | "engineer";

  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };

  fonts: {
    heading: string;
    body: string;
  };

  animation: {
    duration: number;
    easing: string;
  };
}