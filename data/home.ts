/**
 * Home page media slots. Structure only — copy lives in the dictionaries.
 *
 * `image` is a filename inside /public/images/ccs/hero/. Leave it empty until
 * a real CCS photo (a large horizontal shot of a finished industrial concrete
 * floor) is provided — the Hero shows a neutral placeholder meanwhile.
 */

export interface HeroConfig {
  image: string;
  /** object-position for the photo once it exists, e.g. "center", "50% 35%". */
  imagePosition: string;
}

export const heroConfig: HeroConfig = {
  image: "",
  imagePosition: "center",
};

/** Resolves the hero image slot to a public path, or "" when none is set. */
export function heroImageSrc(): string {
  return heroConfig.image ? `/images/ccs/hero/${heroConfig.image}` : "";
}

/**
 * "Our story" section image. Filename inside /public/images/ccs/company/.
 * Empty => placeholder.
 */
export interface StoryConfig {
  image: string;
  imagePosition: string;
}

export const storyConfig: StoryConfig = {
  image: "",
  imagePosition: "center",
};

/** Resolves the story image slot to a public path, or "" when none is set. */
export function storyImageSrc(): string {
  return storyConfig.image ? `/images/ccs/company/${storyConfig.image}` : "";
}

/**
 * Background photo for the end-of-page conversion band (a large shot of a
 * coating being applied). Filename inside /public/images/ccs/services/.
 * Empty => placeholder.
 */
export interface CtaConfig {
  image: string;
  imagePosition: string;
}

export const ctaConfig: CtaConfig = {
  image: "",
  imagePosition: "center",
};

/** Resolves the CTA image slot to a public path, or "" when none is set. */
export function ctaImageSrc(): string {
  return ctaConfig.image ? `/images/ccs/services/${ctaConfig.image}` : "";
}
