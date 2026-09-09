import type { ReactNode, SVGProps } from "react";

export type SolutionIconName =
  | "polishing"
  | "floors"
  | "waterproofing"
  | "specialized"
  | "repair"
  | "maintenance"
  | "resinous"
  | "jointSealing"
  | "marking"
  | "mortars";

const paths: Record<SolutionIconName, ReactNode> = {
  // shine / gloss
  polishing: (
    <>
      <path d="M12 3l2.2 5.1L19.5 10l-5.3 1.9L12 17l-2.2-5.1L4.5 10l5.3-1.9L12 3z" />
      <path d="M19 15.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9z" />
    </>
  ),
  // stacked floor layers
  floors: (
    <>
      <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5z" />
      <path d="M3 13.5 12 18l9-4.5" />
    </>
  ),
  // water drop
  waterproofing: (
    <path d="M12 3.5c3.5 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.5-6 6-10z" />
  ),
  // badge / specialized
  specialized: (
    <>
      <path d="M12 3l7 3.5v5c0 4.3-2.9 7.7-7 9-4.1-1.3-7-4.7-7-9v-5L12 3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  // wrench / repair
  repair: (
    <path d="M14.5 6.5a3.5 3.5 0 0 0-4.6 4.6l-5 5A2 2 0 0 0 7.7 19l5-5a3.5 3.5 0 0 0 4.6-4.6l-2 2-2-2 2-2z" />
  ),
  // gear / maintenance
  maintenance: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M4.2 7l2.1 1.2M17.7 15.8 19.8 17M4.2 17l2.1-1.2M17.7 8.2 19.8 7" />
    </>
  ),
  // poured / self-levelling resin
  resinous: (
    <>
      <path d="M4 15c2-1 4-1 6 0s4 1 6 0 2-1 4-1" />
      <path d="M6 15V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
      <path d="M9 7V5M15 7V5" />
    </>
  ),
  // sealed joint between two slabs
  jointSealing: (
    <>
      <path d="M4 8h6v9H4zM14 8h6v9h-6z" />
      <path d="M12 5v14" />
    </>
  ),
  // floor marking lines + arrow
  marking: (
    <>
      <path d="M4 20 20 4" />
      <path d="M4 14 10 8M10 20 16 14" />
      <path d="M15 4h5v5" />
    </>
  ),
  // trowel / mortar
  mortars: (
    <>
      <path d="M3 6h11l-5.5 7L3 6z" />
      <path d="M9.5 13 14 20l3-2-3.5-5" />
    </>
  ),
};

interface SolutionIconProps extends SVGProps<SVGSVGElement> {
  name: SolutionIconName;
}

/** Small, discreet line icon for a solution category. Decorative by default. */
export function SolutionIcon({ name, ...props }: SolutionIconProps) {
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
