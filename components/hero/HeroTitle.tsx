import { useTheme } from "@/contexts/ThemeContext";

export default function HeroTitle() {
  const { mode } = useTheme();

  return (
    <>
      <h1 className="text-7xl font-bold">
        Jiya Sahni
      </h1>

      <p className="mt-4 text-xl opacity-80">
        {mode === "dreamer"
          ? "Building magical digital experiences."
          : "Computer Science Student • AI • Cybersecurity"}
      </p>
    </>
  );
}