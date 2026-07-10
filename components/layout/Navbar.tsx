"use client";

import { useTheme } from "@/contexts/ThemeContext";

const links = [
  "projects",
  "about",
  "skills",
  "journey",
  "research",
  "creative",
  "contact",
];

export default function Navbar() {
  const { mode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <a
          href="#hero"
          className="text-xl font-bold"
        >
          Jiya.
        </a>

        <div className="hidden gap-8 md:flex">

          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="capitalize hover:opacity-70 transition"
            >
              {link}
            </a>
          ))}

        </div>

        <button
          onClick={toggleTheme}
          className="rounded-lg border px-4 py-2"
        >
          {mode === "dreamer"
            ? "Engineer"
            : "Dreamer"}
        </button>

      </div>
    </nav>
  );
}