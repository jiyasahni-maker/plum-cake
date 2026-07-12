"use client";

interface MoonProps {
  onClick: () => void;
}

export default function Moon({
  onClick,
}: MoonProps) {
  return (
    <button
      onClick={onClick}
      className="
        h-28
        w-28
        rounded-full
        bg-white
        shadow-[0_0_120px_rgba(255,255,255,.25)]
        transition
        duration-500
        hover:scale-105
        hover:shadow-[0_0_150px_rgba(255,255,255,.35)]
      "
    />
  );
}