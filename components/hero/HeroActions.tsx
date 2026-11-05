"use client";

import clsx from "clsx";
import { useTheme } from "@/contexts/ThemeContext";

export default function HeroActions() {
  const { mode } = useTheme();

  if (mode === "dreamer") {
    const base =
      "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.3em] transition-all duration-300 active:scale-95";
    return (
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="#projects"
          className={clsx(
            base,
            "bg-gradient-to-r from-[#7C3AED] to-[#C084FC] text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_45px_rgba(192,132,252,0.7)]"
          )}
        >
          Explore my work
        </a>
        {/* Drop your resume at public/resume.pdf and this will download it. */}
        <a
          href="/resume.pdf"
          download
          className={clsx(
            base,
            "border border-[#ffd9a0]/50 bg-[#0b0820]/40 text-[#ffe9c2] hover:bg-[#ffd9a0]/15"
          )}
        >
          Download resume
        </a>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
      <a
        href="#projects"
        className="inline-flex items-center rounded-full bg-[var(--accent)] px-7 py-3 text-base font-medium text-white transition hover:brightness-110 active:scale-95"
      >
        Explore my work
      </a>
      <a
        href="/resume.pdf"
        download
        className="text-base font-medium text-[var(--accent)] hover:underline"
      >
        Download resume &rsaquo;
      </a>
    </div>
  );
}
