import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { site } from "@/config/site";

/**
 * Absolute site origin. MUST be provided via NEXT_PUBLIC_SITE_URL in every
 * deployed environment; the localhost fallback is for local development only.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

/** Open Graph locale codes. Region kept generic — no city is implied. */
export const OG_LOCALE: Record<Locale, string> = {
  es: "es_MX",
  en: "en_US",
};

/** Locale-prefixed path. `path` is the route below the locale, no leading slash. */
export function localePath(locale: Locale, path = ""): string {
  return path ? `/${locale}/${path.replace(/^\/+/, "")}` : `/${locale}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * `alternates` block for a page: self canonical + hreflang for every locale
 * plus `x-default` (the default locale).
 *
 * Every page.tsx MUST call this with its own `path` so its canonical is
 * correct — otherwise it inherits the layout's (home) canonical.
 */
export function alternatesFor(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(defaultLocale, path);
  return { canonical: localePath(locale, path), languages };
}

/** Default page description per locale. No location is stated (none confirmed). */
export function defaultDescription(locale: Locale): string {
  return locale === "es"
    ? "Soluciones especializadas para superficies y pisos de concreto: recubrimientos, abrillantado, impermeabilización, reparación y mantenimiento para industria, comercio y proyectos especializados. Desde 2009."
    : "Specialized solutions for concrete surfaces and floors: coatings, polishing, waterproofing, repair and maintenance for industrial, commercial and specialized projects. Since 2009.";
}

/**
 * Organization structured data.
 *
 * LOCAL SEO — READY, NOT ACTIVE: when CCS confirms address / phone / service
 * area, upgrade `@type` to "LocalBusiness" (or a subtype) and add
 * `address` (PostalAddress), `telephone`, `areaServed`, `geo` and
 * `openingHoursSpecification`. Do not add any of those until confirmed.
 */
export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline[locale],
    foundingDate: String(site.foundedYear),
    url: absoluteUrl(localePath(locale)),
    logo: absoluteUrl("/icon.svg"),
  };
}
