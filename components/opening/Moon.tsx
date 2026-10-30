"use client";

import { useRef } from "react";
import BrandMark from "@/components/brand/BrandMark";

interface MoonProps {
  onClick: (origin: { x: number; y: number }) => void;
}

export default function Moon({ onClick }: MoonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClick() {
    const rect = buttonRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    onClick(origin);
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      aria-label="Enter the site"
      className="group relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <BrandMark
        size={180}
        revealed={false}
        className="transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </button>
  );
}