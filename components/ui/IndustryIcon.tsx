import type { ReactNode, SVGProps } from "react";
import type { IndustryTitleKey } from "@/data/industries";

const paths: Record<IndustryTitleKey, ReactNode> = {
  // factory
  industrial: (
    <>
      <path d="M3 20h18M4 20V10l6 4V10l6 4V6l4 2v12" />
      <path d="M7 20v-3M12 20v-3M17 20v-3" />
    </>
  ),
  // storefront
  commercial: (
    <>
      <path d="M4 9h16l-1-4H5L4 9z" />
      <path d="M5 9v11h14V9" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  // house
  residential: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  // target / specialized
  specialized: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
};

interface IndustryIconProps extends SVGProps<SVGSVGElement> {
  name: IndustryTitleKey;
}

/** Minimal line icon for a market segment. Decorative by default. */
export function IndustryIcon({ name, ...props }: IndustryIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
