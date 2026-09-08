/**
 * Market segments CCS serves. Navigation / taxonomy structure only — the
 * displayed names come from the dictionaries (via `titleKey`). No copy or
 * claims are invented here.
 *
 * `image` is a filename inside /public/images/ccs/industries/. Empty => the
 * card shows a neutral placeholder.
 */

export type IndustryTitleKey =
  | "industrial"
  | "commercial"
  | "residential"
  | "specialized";

export interface IndustrySegment {
  slug: string;
  titleKey: IndustryTitleKey;
  /** Icon id resolved by <IndustryIcon />. */
  icon: IndustryTitleKey;
  image: string;
  order: number;
}

export const industrySegments: IndustrySegment[] = [
  { slug: "industrial", titleKey: "industrial", icon: "industrial", image: "", order: 1 },
  { slug: "comercial", titleKey: "commercial", icon: "commercial", image: "", order: 2 },
  { slug: "residencial", titleKey: "residential", icon: "residential", image: "", order: 3 },
  {
    slug: "aplicaciones-especializadas",
    titleKey: "specialized",
    icon: "specialized",
    image: "",
    order: 4,
  },
];

/** All segments, in order. */
export function allIndustries(): IndustrySegment[] {
  return [...industrySegments].sort((a, b) => a.order - b.order);
}

export function getIndustryBySlug(slug: string): IndustrySegment | undefined {
  return industrySegments.find((segment) => segment.slug === slug);
}

/** Resolves a segment image slot to a public path, or "" when none is set. */
export function industryImageSrc(segment: IndustrySegment): string {
  return segment.image ? `/images/ccs/industries/${segment.image}` : "";
}
