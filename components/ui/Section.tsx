import type { ElementType, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export type SectionVariant = "light" | "muted" | "navy" | "charcoal";

const variantClasses: Record<SectionVariant, string> = {
  light: "bg-white text-ccs-charcoal",
  muted: "bg-ccs-light text-ccs-charcoal",
  navy: "bg-ccs-navy text-white",
  charcoal: "bg-ccs-charcoal text-white",
};

interface SectionProps {
  as?: ElementType;
  variant?: SectionVariant;
  /** Vertical padding size. Sections are meant to be tall and airy. */
  spacing?: "normal" | "large";
  /** Wrap the content in a discreet scroll-in animation. */
  reveal?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Full-width horizontal band with generous vertical rhythm. Alternate
 * `variant` between sections to build the long, scrolling page.
 */
export function Section({
  as: Tag = "section",
  variant = "light",
  spacing = "normal",
  reveal = false,
  id,
  className = "",
  children,
}: SectionProps) {
  const pad =
    spacing === "large"
      ? "py-24 sm:py-32 lg:py-40"
      : "py-20 sm:py-28 lg:py-32";

  return (
    <Tag
      id={id}
      className={`${variantClasses[variant]} ${pad} ${className}`.trim()}
    >
      {reveal ? <Reveal>{children}</Reveal> : children}
    </Tag>
  );
}
