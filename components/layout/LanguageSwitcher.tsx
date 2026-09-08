"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  tone?: "dark" | "light";
  className?: string;
  /** Called when a language link is activated (e.g. to close a menu). */
  onNavigate?: () => void;
}

/**
 * ES | EN switch. Keeps the visitor on the same page: it swaps only the
 * leading locale segment of the current path.
 */
export function LanguageSwitcher({
  locale,
  label,
  tone = "dark",
  className = "",
  onNavigate,
}: LanguageSwitcherProps) {
  const pathname = usePathname() || `/${locale}`;

  function hrefFor(target: Locale): string {
    const segments = pathname.split("/");
    // segments[0] is "" (leading slash), segments[1] is the current locale.
    if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
    } else {
      return `/${target}`;
    }
    return segments.join("/") || `/${target}`;
  }

  const idle = tone === "light" ? "text-white/60 hover:text-white" : "text-ccs-gray hover:text-ccs-navy";
  const active = tone === "light" ? "text-white" : "text-ccs-navy";

  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center gap-1 text-xs font-semibold tracking-wide ${className}`.trim()}
    >
      {locales.map((l, index) => {
        const isActive = l === locale;
        return (
          <span key={l} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden="true" className={tone === "light" ? "text-white/30" : "text-ccs-line"}>
                |
              </span>
            )}
            <Link
              href={hrefFor(l)}
              hrefLang={l}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex min-h-[40px] items-center rounded px-2 py-1.5 transition-colors ${isActive ? active : idle}`}
            >
              {localeLabels[l]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
