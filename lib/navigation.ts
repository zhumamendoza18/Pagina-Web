import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";

export interface NavItem {
  key: string;
  /** Absolute path including the locale prefix. */
  href: string;
  label: string;
}

/** Anchor id of the Mission / Vision / Values section on the Home. */
export const ETHOS_ANCHOR = "mision-vision-valores";

/**
 * Primary navigation. Route segments are shared across languages for now;
 * the pages themselves are added in later phases, so these links may 404
 * until then.
 */
export function getNavItems(locale: Locale, dict: Dictionary): NavItem[] {
  const base = `/${locale}`;
  return [
    { key: "home", href: base, label: dict.nav.home },
    { key: "solutions", href: `${base}/soluciones`, label: dict.nav.solutions },
    { key: "industries", href: `${base}/industrias`, label: dict.nav.industries },
    { key: "projects", href: `${base}/proyectos`, label: dict.nav.projects },
    { key: "about", href: `${base}/nosotros`, label: dict.nav.about },
    { key: "contact", href: `${base}/contacto`, label: dict.nav.contact },
  ];
}

/** Where the Mission / Vision / Values link points. */
export function getEthosHref(locale: Locale): string {
  return `/${locale}#${ETHOS_ANCHOR}`;
}

/**
 * Footer navigation: the primary nav plus a "Mission, Vision & Values" link,
 * inserted just before "Contact".
 */
export function getFooterNavItems(locale: Locale, dict: Dictionary): NavItem[] {
  const items = getNavItems(locale, dict);
  const contactIndex = items.findIndex((item) => item.key === "contact");
  const ethosItem: NavItem = {
    key: "ethos",
    href: getEthosHref(locale),
    label: dict.footer.ethosLink,
  };
  const at = contactIndex === -1 ? items.length : contactIndex;
  return [...items.slice(0, at), ethosItem, ...items.slice(at)];
}

/** Anchor id of the quote form section on the Home. */
export const QUOTE_ANCHOR = "cotizacion";

/** Where the "Request a quote" button points — the quote form on the Home. */
export function getQuoteHref(locale: Locale): string {
  return `/${locale}#${QUOTE_ANCHOR}`;
}

/** Where the "View projects" button points. */
export function getProjectsHref(locale: Locale): string {
  return `/${locale}/proyectos`;
}

/** Where the "Learn more about us" button points. */
export function getAboutHref(locale: Locale): string {
  return `/${locale}/nosotros`;
}

/** Solutions index page. */
export function getSolutionsHref(locale: Locale): string {
  return `/${locale}/soluciones`;
}

/**
 * A solution family. Per-category detail routes are not built yet, so this
 * anchors to the family block on the single /soluciones index page.
 */
export function getSolutionHref(locale: Locale, slug: string): string {
  return `/${locale}/soluciones#${slug}`;
}

/**
 * A subtopic. Detail routes are not built yet, so this anchors to the parent
 * family block on the /soluciones index page.
 */
export function getSolutionSubtopicHref(
  locale: Locale,
  categorySlug: string,
): string {
  return `/${locale}/soluciones#${categorySlug}`;
}

/** Industries index page. */
export function getIndustriesHref(locale: Locale): string {
  return `/${locale}/industrias`;
}

/** A single industry / market segment page. */
export function getIndustryHref(locale: Locale, slug: string): string {
  return `/${locale}/industrias/${slug}`;
}
