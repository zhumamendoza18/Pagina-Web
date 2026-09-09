/**
 * Solution catalogue for Concrete Coatings Solutions.
 *
 * This is the navigation / taxonomy structure only. Category headings come
 * from the dictionaries (via `titleKey`); subtopic names live here because
 * they are catalogue terms (often proper / technical names) rather than UI
 * copy. NO technical descriptions or features are invented — only the names
 * provided by CCS.
 *
 * `image` is a filename inside /public/images/ccs/services/. Empty => the
 * card shows a neutral placeholder.
 *
 * Updated with the CCS Curriculum Empresarial 2026: added resinous systems,
 * joint sealing, industrial floor marking and high-strength mortars; folded
 * the polishing and maintenance families into broader names. Only names are
 * stored — no technical specifications, PSI, temperatures, etc. are invented.
 */

import { site } from "@/config/site";

export type Market = "industrial" | "commercial" | "residential";

/** Ordered stages a project album can walk through. Purely a label. */
export type GalleryStage =
  | "before-after"
  | "initial"
  | "prep"
  | "process"
  | "application"
  | "repair"
  | "progress"
  | "final";

export interface GalleryImage {
  /** Public path under /images/ccs/services/…, or "" to show a placeholder slide. */
  src: string;
  alt: { es: string; en: string };
  stage?: GalleryStage;
}

export interface SolutionSubtopic {
  slug: string;
  name: { es: string; en: string };
  /** Filename inside /public/images/ccs/services/. Optional; empty => placeholder. */
  image?: string;
  /**
   * The fields below stay OMITTED until CCS provides approved copy / real
   * photos. No technical claims (PSI, temperatures, %, warranties, chemistry)
   * are invented here.
   */
  /** Short "what is it" copy, 2–4 lines. */
  summary?: { es: string; en: string };
  /** 2–4 short bullet points. */
  benefits?: { es: string[]; en: string[] };
  /** Short list of confirmed applications. */
  idealFor?: { es: string[]; en: string[] };
  /** Album cover (the "before | after" composite). Empty => placeholder. */
  coverImage?: string;
  /** Ordered album; the first entry is the cover / before-after. */
  gallery?: GalleryImage[];
}

export interface SolutionCategory {
  slug: string;
  /** Key into `dict.solutions.categories[...]`. */
  titleKey: string;
  /** Icon id resolved by <SolutionIcon />. */
  icon: string;
  image: string;
  order: number;
  /** One of the four main families shown on the Home. */
  featuredOnHome: boolean;
  markets: Market[];
  subtopics: SolutionSubtopic[];
  /** Subtopic selected first in its section. Defaults to the first subtopic. */
  defaultTopicSlug?: string;
}

export const solutionCategories: SolutionCategory[] = [
  {
    slug: "abrillantado-de-concreto",
    titleKey: "polishing",
    icon: "polishing",
    image: "",
    order: 1,
    featuredOnHome: true,
    markets: ["industrial", "commercial"],
    subtopics: [
      {
        slug: "polished-concrete",
        name: { es: "Polished Concrete", en: "Polished Concrete" },
      },
      { slug: "abrillantado", name: { es: "Abrillantado", en: "Burnishing" } },
      { slug: "densificado", name: { es: "Densificado", en: "Densification" } },
      { slug: "pulido", name: { es: "Pulido", en: "Grinding & Polishing" } },
      { slug: "beneficios", name: { es: "Beneficios", en: "Benefits" } },
      { slug: "endurecedor", name: { es: "Endurecedor", en: "Hardener" } },
    ],
  },
  {
    slug: "recubrimientos-para-pisos",
    titleKey: "floors",
    icon: "floors",
    image: "",
    order: 2,
    featuredOnHome: true,
    markets: ["industrial", "commercial", "residential"],
    subtopics: [
      {
        slug: "procesadores-de-alimentos",
        name: { es: "Procesadores de Alimentos", en: "Food Processors" },
      },
      {
        slug: "resistentes-a-quimicos",
        name: { es: "Resistentes a Químicos", en: "Chemical Resistant" },
      },
      {
        slug: "restauradores-de-concreto",
        name: { es: "Restauradores de Concreto", en: "Concrete Restoration" },
      },
      { slug: "selladores", name: { es: "Selladores", en: "Sealers" } },
      { slug: "senalizacion", name: { es: "Señalización", en: "Line Marking" } },
      {
        slug: "sistemas-anti-estaticos",
        name: { es: "Sistemas Anti-Estáticos", en: "Anti-Static Systems" },
      },
    ],
  },
  {
    slug: "sistemas-resinosos",
    titleKey: "resinous",
    icon: "resinous",
    image: "",
    order: 3,
    featuredOnHome: false,
    markets: ["industrial", "commercial"],
    subtopics: [
      { slug: "sistemas-esd", name: { es: "Sistemas ESD", en: "ESD Systems" } },
      {
        slug: "alto-trafico",
        name: { es: "Sistemas para Alto Tráfico", en: "High-Traffic Systems" },
      },
      {
        slug: "resistentes-a-quimicos",
        name: {
          es: "Sistemas Resistentes a Químicos",
          en: "Chemical-Resistant Systems",
        },
      },
      {
        slug: "autonivelantes",
        name: { es: "Sistemas Autonivelantes", en: "Self-Leveling Systems" },
      },
    ],
  },
  {
    slug: "impermeabilizacion",
    titleKey: "waterproofing",
    icon: "waterproofing",
    image: "",
    order: 4,
    featuredOnHome: true,
    markets: ["industrial", "commercial", "residential"],
    subtopics: [
      { slug: "acrilicos", name: { es: "Acrílicos", en: "Acrylics" } },
      { slug: "asfalticos", name: { es: "Asfálticos", en: "Asphaltic" } },
      { slug: "cementicios", name: { es: "Cementicios", en: "Cementitious" } },
      {
        slug: "espuma-de-poliuretano",
        name: { es: "Espuma de Poliuretano", en: "Polyurethane Foam" },
      },
      { slug: "poliurea", name: { es: "Poliurea", en: "Polyurea" } },
      {
        slug: "poliuretanos",
        name: { es: "Poliuretanos", en: "Polyurethanes" },
      },
      { slug: "vinilica", name: { es: "Vinílica", en: "Vinyl" } },
      {
        slug: "pintura-epoxica",
        name: { es: "Pintura Epóxica", en: "Epoxy Paint" },
      },
      {
        slug: "epoxico-poliamida",
        name: { es: "Epóxico Poliamida", en: "Polyamide Epoxy" },
      },
    ],
  },
  {
    slug: "recubrimientos-especializados",
    titleKey: "specialized",
    icon: "specialized",
    image: "",
    order: 5,
    featuredOnHome: true,
    markets: ["commercial", "residential"],
    subtopics: [
      {
        slug: "canchas-deportivas",
        name: { es: "Canchas Deportivas", en: "Sports Courts" },
      },
      { slug: "cool-deck", name: { es: "Cool Deck", en: "Cool Deck" } },
      { slug: "decorativos", name: { es: "Decorativos", en: "Decorative" } },
    ],
  },
  {
    slug: "sello-de-juntas",
    titleKey: "jointSealing",
    icon: "jointSealing",
    image: "",
    order: 6,
    featuredOnHome: false,
    markets: ["industrial", "commercial"],
    subtopics: [
      {
        slug: "juntas-constructivas",
        name: { es: "Juntas Constructivas", en: "Construction Joints" },
      },
      {
        slug: "juntas-regenerativas",
        name: { es: "Juntas Regenerativas", en: "Regenerative Joint Repair" },
      },
    ],
  },
  {
    slug: "senalizacion-industrial",
    titleKey: "marking",
    icon: "marking",
    image: "",
    order: 7,
    featuredOnHome: false,
    markets: ["industrial", "commercial"],
    subtopics: [
      { slug: "indicativa", name: { es: "Indicativa", en: "Informational" } },
      {
        slug: "delimitativa",
        name: { es: "Delimitativa", en: "Area Delimitation" },
      },
      { slug: "preventiva", name: { es: "Preventiva", en: "Preventive" } },
      { slug: "restrictiva", name: { es: "Restrictiva", en: "Restrictive" } },
    ],
  },
  {
    slug: "mantenimiento-de-sistemas-existentes",
    titleKey: "maintenance",
    icon: "maintenance",
    image: "",
    order: 8,
    featuredOnHome: false,
    markets: ["industrial", "commercial"],
    subtopics: [
      { slug: "mantenimiento", name: { es: "Mantenimiento", en: "Maintenance" } },
      { slug: "regenerativo", name: { es: "Regenerativo", en: "Restoration" } },
    ],
  },
  {
    slug: "reparacion-de-concreto",
    titleKey: "repair",
    icon: "repair",
    image: "",
    order: 9,
    featuredOnHome: false,
    markets: ["industrial", "commercial", "residential"],
    subtopics: [
      { slug: "epoxicos", name: { es: "Epóxicos", en: "Epoxy" } },
      { slug: "cementicios", name: { es: "Cementicios", en: "Cementitious" } },
      { slug: "poliuretanos", name: { es: "Poliuretanos", en: "Polyurethane" } },
    ],
  },
  {
    slug: "morteros-de-alta-resistencia",
    titleKey: "mortars",
    icon: "mortars",
    image: "",
    order: 10,
    featuredOnHome: false,
    markets: ["industrial"],
    subtopics: [
      { slug: "epoxicos", name: { es: "Epóxicos", en: "Epoxy" } },
      {
        slug: "poliuretanos-cementicios",
        name: { es: "Poliuretanos Cementicios", en: "Cementitious Urethane" },
      },
      { slug: "refractarios", name: { es: "Refractarios", en: "Refractory" } },
      { slug: "poliurea", name: { es: "Poliurea", en: "Polyurea" } },
    ],
  },
];

/**
 * Families that a feature flag can hide. They stay fully defined above; only
 * the public listings below skip them while their flag is false. Add an entry
 * here to gate another family the same way.
 */
const FAMILY_FLAG: Record<string, keyof typeof site.flags> = {
  "recubrimientos-especializados": "showSpecializedCoatings",
};

/** True unless the family is gated by a feature flag that is currently off. */
export function isFamilyPublic(category: SolutionCategory): boolean {
  const flag = FAMILY_FLAG[category.slug];
  return flag ? site.flags[flag] : true;
}

/** The main families shown on the Home, in order (flag-gated ones excluded). */
export function featuredSolutions(): SolutionCategory[] {
  return solutionCategories
    .filter((category) => category.featuredOnHome && isFamilyPublic(category))
    .sort((a, b) => a.order - b.order);
}

/** All publicly visible categories, in order. */
export function allSolutions(): SolutionCategory[] {
  return solutionCategories
    .filter(isFamilyPublic)
    .sort((a, b) => a.order - b.order);
}

/**
 * Raw lookup — returns the family even if a flag currently hides it (needed to
 * keep its data reachable for reactivation and internal use).
 */
export function getSolutionBySlug(slug: string): SolutionCategory | undefined {
  return solutionCategories.find((category) => category.slug === slug);
}

/** Resolves a category image slot to a public path, or "" when none is set. */
export function solutionImageSrc(category: SolutionCategory): string {
  return category.image ? `/images/ccs/services/${category.image}` : "";
}

/** Resolves a subtopic image slot to a public path, or "" when none is set. */
export function subtopicImageSrc(subtopic: SolutionSubtopic): string {
  return subtopic.image ? `/images/ccs/services/${subtopic.image}` : "";
}

/**
 * Folder convention for real album photos:
 *   /images/ccs/services/<family-slug>/<subtopic-slug>/<file>
 * (e.g. …/abrillantado-de-concreto/abrillantado/cover.jpg). Used only to
 * document where files go — the actual order comes from `subtopic.gallery`.
 */
export function subtopicMediaDir(
  familySlug: string,
  subtopicSlug: string,
): string {
  return `/images/ccs/services/${familySlug}/${subtopicSlug}`;
}

/** The cover shown on a subtopic's visual pane, or "" for the placeholder. */
export function subtopicCoverSrc(subtopic: SolutionSubtopic): string {
  return (
    subtopic.coverImage ||
    subtopic.gallery?.find((g) => g.src)?.src ||
    subtopicImageSrc(subtopic) ||
    ""
  );
}

export interface SpecializedApplication {
  category: SolutionCategory;
  subtopic: SolutionSubtopic;
}

/**
 * Curated cross-cut of subtopics shown in the Home "specialized applications"
 * carousel, in the order requested. Each entry links to its subtopic anchored
 * within the parent category page.
 */
export function specializedApplications(): SpecializedApplication[] {
  const picks: [string, string][] = [
    ["recubrimientos-para-pisos", "procesadores-de-alimentos"],
    ["recubrimientos-para-pisos", "resistentes-a-quimicos"],
    ["recubrimientos-para-pisos", "sistemas-anti-estaticos"],
    ["recubrimientos-para-pisos", "senalizacion"],
    ["recubrimientos-para-pisos", "restauradores-de-concreto"],
    ["recubrimientos-para-pisos", "selladores"],
    ["recubrimientos-especializados", "canchas-deportivas"],
    ["recubrimientos-especializados", "cool-deck"],
    ["recubrimientos-especializados", "decorativos"],
  ];

  return picks
    .map(([categorySlug, subtopicSlug]) => {
      const category = getSolutionBySlug(categorySlug);
      const subtopic = category?.subtopics.find((s) => s.slug === subtopicSlug);
      if (!category || !subtopic || !isFamilyPublic(category)) return null;
      return { category, subtopic } satisfies SpecializedApplication;
    })
    .filter((entry): entry is SpecializedApplication => entry !== null);
}
