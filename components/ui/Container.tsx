import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Centered, width-constrained wrapper with responsive gutters. */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
