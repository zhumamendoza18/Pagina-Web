import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { site } from "@/config/site";
import { heroImageSrc, heroConfig } from "@/data/home";
import { getProjectsHref, getQuoteHref } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Full-bleed opening screen. A large horizontal photo of a finished industrial
 * concrete floor (placeholder until provided), a dark elegant overlay for
 * legibility, a short two-line headline and the two primary CTAs. Text is
 * kept minimal on purpose.
 */
export function Hero({ locale, dict }: HeroProps) {
  const { hero } = dict;

  return (
    <section
      aria-label={hero.titleLines.join(" ")}
      className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-ccs-navy lg:min-h-[90svh]"
    >
      {/* Photo / placeholder */}
      <Media
        src={heroImageSrc()}
        alt={hero.imageAlt}
        placeholderLabel={hero.imagePlaceholder}
        placeholderTone="dark"
        position={heroConfig.imagePosition}
        priority
        sizes="100vw"
        fill
      />

      {/* Elegant dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ccs-charcoal/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ccs-navy/90 via-ccs-navy/45 to-ccs-navy/10"
      />

      {/* Content */}
      <Container className="relative z-10 pb-16 pt-36 sm:pb-24 sm:pt-44 lg:pb-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/70 sm:text-sm">
            {hero.tagline}
          </p>

          <h1 className="mt-5 text-[1.9rem] font-extrabold leading-[1.08] text-white [text-wrap:balance] sm:text-5xl sm:leading-[1.05] lg:text-7xl">
            <span className="block">{hero.titleLines[0]}</span>
            <span className="block">{hero.titleLines[1]}</span>
          </h1>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-ccs-cyan sm:text-sm sm:tracking-[0.26em]">
            {hero.sinceLabel} {site.foundedYear}
          </p>

          <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80 sm:text-base">
            {hero.markets.map((market, index) => (
              <li key={market} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/40">
                    &middot;
                  </span>
                )}
                {market}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              href={getProjectsHref(locale)}
              variant="on-dark"
              size="lg"
              className="w-full sm:w-auto"
            >
              {dict.actions.viewProjects}
            </Button>
            <Button
              href={getQuoteHref(locale)}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {dict.actions.requestQuote}
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center"
      >
        <span className="motion-safe:animate-bounce text-white/60">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
        <span className="sr-only">{hero.scrollHint}</span>
      </div>
    </section>
  );
}
