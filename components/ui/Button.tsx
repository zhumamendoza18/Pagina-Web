import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "on-dark";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ccs-cyan-dark text-white hover:bg-ccs-navy focus-visible:outline-ccs-cyan-dark",
  secondary:
    "border border-ccs-navy text-ccs-navy hover:bg-ccs-navy hover:text-white focus-visible:outline-ccs-navy",
  ghost:
    "text-ccs-navy hover:bg-ccs-light focus-visible:outline-ccs-navy",
  "on-dark":
    "border border-white/70 text-white hover:bg-white hover:text-ccs-navy focus-visible:outline-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm sm:text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

interface ButtonAsLink extends CommonProps {
  /**
   * Destination. Pass `null` when the underlying data does not exist yet
   * (e.g. no phone number configured) — the component renders a disabled
   * button instead of a broken link.
   */
  href: string | null;
  /** Render a plain <a> (for `tel:`, `mailto:`, `https://wa.me/…`, etc.). */
  external?: boolean;
  /** When `external`, open in a new tab. Defaults to true. */
  newTab?: boolean;
  onClick?: () => void;
}

type ButtonProps = ButtonAsLink;

export function Button({
  href,
  external = false,
  newTab = true,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (href == null) {
    return (
      <button type="button" className={classes} disabled aria-disabled="true">
        {children}
      </button>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
