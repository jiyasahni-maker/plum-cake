"use client";

import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { site } from "@/data";

export default function Hero() {
  const { mode, toggleTheme } = useTheme();

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-4 text-lg opacity-70">
        Hi, I'm
      </p>

      <h1 className="text-6xl font-black md:text-8xl">
        {site.name}
      </h1>

      <p className="mt-6 max-w-2xl text-lg opacity-80 md:text-xl">
        {site.tagline}
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