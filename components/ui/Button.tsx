import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-xl font-semibold transition-all duration-300",
        "active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        {
          "bg-[var(--primary)] text-white hover:opacity-90":
            variant === "primary",

          "bg-[var(--surface)] text-[var(--text)] hover:opacity-90":
            variant === "secondary",

          "border border-[var(--primary)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-white":
            variant === "outline",
        },

        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}