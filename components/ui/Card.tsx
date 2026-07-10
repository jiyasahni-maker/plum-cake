import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl",
        "border border-white/10",
        "bg-[var(--surface)]",
        "p-8",
        "transition-all duration-300",
        "hover:-translate-y-2",
        "hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}