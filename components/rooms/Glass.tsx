"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/** A panel that is lit glass in the observatory and a clean card in the studio. */
export default function Glass({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { mode } = useTheme();
  return (
    <div
      className={clsx(
        "rounded-3xl p-6 transition-shadow duration-500 md:p-8",
        mode === "dreamer"
          ? "border border-[#ffd9a0]/20 bg-[#0b0820]/55 shadow-[0_0_40px_rgba(124,58,237,0.18)] backdrop-blur-md hover:shadow-[0_0_55px_rgba(255,190,100,0.24)]"
          : "border border-black/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}
