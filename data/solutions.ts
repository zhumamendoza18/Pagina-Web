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
 */

export type Market = "industrial" | "commercial" | "residential";

export interface SolutionSubtopic {
  slug: string;
  name: { es: string; en: string };
  /** Filename inside /public/images/ccs/services/. Optional; empty => placeholder. */
  image?: string;
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
      { slug: "beneficios", name: { es: "Beneficios", en: "Benefits" } },
      { slug: "endurecedor", name: { es: "Endurecedor", en: "Hardener" } },
      {
        slug: "litio-vs-sodio",
        name: { es: "Litio vs Sodio", en: "Lithium vs Sodium" },
      },
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
    slug: "impermeabilizacion",
    titleKey: "waterproofing",
    icon: "waterproofing",
    image: "",
    order: 3,
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
    ],
  },
  {
    slug: "recubrimientos-especializados",
    titleKey: "specialized",
    icon: "specialized",
    image: "",
    order: 4,
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
    slug: "reparacion-de-concreto",
    titleKey: "repair",
    icon: "repair",
    image: "",
    order: 5,
    featuredOnHome: false,
    markets: ["industrial", "commercial", "residential"],
    subtopics: [],
  },
  {
    slug: "mantenimiento-de-sistemas-existentes",
    titleKey: "maintenance",
    icon: "maintenance",
    image: "",
    order: 6,
    featuredOnHome: false,
    markets: ["industrial", "commercial"],
    subtopics: [],
  },
];

/** The four main families shown on the Home, in order. */
export function featuredSolutions(): SolutionCategory[] {
  return solutionCategories
    .filter((category) => category.featuredOnHome)
    .sort((a, b) => a.order - b.order);
}

/** All categories, in order. */
export function allSolutions(): SolutionCategory[] {
  return [...solutionCategories].sort((a, b) => a.order - b.order);
}

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
      if (!category || !subtopic) return null;
      return { category, subtopic } satisfies SpecializedApplication;
    })
    .filter((entry): entry is SpecializedApplication => entry !== null);
}
