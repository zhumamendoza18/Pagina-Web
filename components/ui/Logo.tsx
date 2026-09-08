import Link from "next/link";
import { site } from "@/config/site";
import type { Locale } from "@/lib/i18n";

interface LogoProps {
  locale: Locale;
  /** Accessible label for the link (localized). */
  label: string;
  /** Visual treatment: light backgrounds vs dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Text wordmark used until the real CCS logo file is supplied at
 * /public/images/ccs/company/. No fake logo image is generated.
 */
export function Logo({ locale, label, tone = "dark", className = "" }: LogoProps) {
  const primary = tone === "light" ? "text-white" : "text-ccs-navy";
  // Brighter cyan on dark backgrounds; darker cyan meets AA on light ones.
  const accent = tone === "light" ? "text-ccs-cyan" : "text-ccs-cyan-dark";

  return (
    <Link
      href={`/${locale}`}
      aria-label={label}
      className={`group inline-flex flex-col leading-none ${className}`.trim()}
    >
      <span
        className={`text-base font-extrabold uppercase tracking-[0.14em] sm:text-lg ${primary}`}
      >
        Concrete Coatings
      </span>
      <span
        className={`text-[0.7rem] font-semibold uppercase tracking-[0.34em] sm:text-xs ${accent}`}
      >
        Solutions
      </span>
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}
