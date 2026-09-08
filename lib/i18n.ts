/**
 * Locale primitives for the bilingual (ES / EN) site.
 * Routing is prefix based: every page lives under /es or /en.
 */

export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && (locales as readonly string[]).includes(value);
}

/** Human readable label used in the language switcher. */
export const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};
