"use client";

import { useMemo } from "react";
import Moon from "./Moon";
import Prompt from "./Prompt";
import { useExperience } from "@/providers/ExperienceProvider";

interface Star {
  top: string;
  left: string;
  size: number;
  delay: number;
}

function useStarfield(count: number): Star[] {
  return useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 4,
      })),
    [count]
  );
}

export default function OpeningExperience() {
  const { triggerEntry } = useExperience();
  const stars = useStarfield(90);

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-white/80"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* soft nebula wash behind the moon */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.25),_transparent_70%)]" />
      </div>

      <Moon onClick={triggerEntry} />

      <Prompt />
    </section>
  );
}