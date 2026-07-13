"use client";

import BrandMark from "@/components/brand/BrandMark";

interface MoonProps {
  onClick: () => void;
}

export default function Moon({ onClick }: MoonProps) {
  return (
    <button
      onClick={onClick}
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