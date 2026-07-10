import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";

export default function Hero() {
  const { mode, toggleTheme } = useTheme();

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-4 text-lg opacity-70">Hi, I'm</p>

      <h1 className="text-6xl font-black md:text-8xl">
        Jiya Sahni
      </h1>

      <p className="mt-6 max-w-2xl text-lg opacity-80 md:text-xl">
        Building intelligent software with curiosity,
        creativity, and purpose.
      </p>

      <Button
        className="mt-10"
        onClick={toggleTheme}
      >
        {mode === "dreamer"
          ? "Enter Engineer World"
          : "Enter Dreamer World"}
      </Button>
    </section>
  );
}