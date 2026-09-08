/**
 * Project / case-study catalogue.
 *
 * `projects` is intentionally EMPTY. Real projects — with real photos, names,
 * locations and systems — are added later. Never invent a client name, a
 * location or a project.
 *
 * The type below is the full shape a project can take once real data exists.
 * On the Home only the cover photo and the short name (on hover) are shown.
 */

export type ProjectCategory =
  | "industrial"
  | "commercial"
  | "residential"
  | "specialized";

export interface LocalizedText {
  es: string;
  en: string;
}

export interface ProjectPhoto {
  /** Filename inside /public/images/ccs/projects/. */
  src: string;
  alt: LocalizedText;
}

export interface ProjectBeforeAfter {
  /** Filenames inside /public/images/ccs/projects/. */
  before: string;
  after: string;
}

export interface ProjectItem {
  slug: string;
  category: ProjectCategory;
  /** Short display name (used on the Home hover). */
  name: LocalizedText;
  /** Optional location text; "" when unknown. Never invented. */
  location: string;
  /** System / product used; "" when unknown. */
  system: LocalizedText;
  description: LocalizedText;
  /** Cover photo filename inside /public/images/ccs/projects/. */
  cover: string;
  photos: ProjectPhoto[];
  beforeAfter: ProjectBeforeAfter[];
}

export const projects: ProjectItem[] = [];

/** Filter buckets for the work gallery, in display order. */
export const projectFilters = [
  "all",
  "industrial",
  "commercial",
  "residential",
  "specialized",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

/**
 * Layout slots for the Home "Our work" mosaic while there are no real
 * projects yet. A slot is NOT a project: it only carries a filter bucket and
 * an (empty) photo slot, so the editorial layout and the category filter can
 * be seen. No names, clients or locations.
 */
export interface GallerySlot {
  id: string;
  category: ProjectCategory;
  /** Filename inside /public/images/ccs/projects/. Empty => placeholder. */
  image: string;
}

export const homeGallerySlots: GallerySlot[] = [
  { id: "slot-1", category: "industrial", image: "" },
  { id: "slot-2", category: "commercial", image: "" },
  { id: "slot-3", category: "residential", image: "" },
  { id: "slot-4", category: "specialized", image: "" },
  { id: "slot-5", category: "industrial", image: "" },
  { id: "slot-6", category: "commercial", image: "" },
];

export function projectImageSrc(filename: string): string {
  return filename ? `/images/ccs/projects/${filename}` : "";
}
