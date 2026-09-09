import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import Link from "next/link";
import { getSolutionsHref, getSolutionHref } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";

interface DemandingEnvironmentsProps {
  locale: Locale;
  dict: Dictionary;
}

const ARROW = (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * Compact, image-first band: four resinous-system environments (ESD, high
 * traffic, chemical resistance, self-levelling). No paragraphs — image, name,
 * arrow, discreet hover. Every tile anchors to the resinous family on the
 * /soluciones index.
 */
export function DemandingEnvironments({ locale, dict }: DemandingEnvironmentsProps) {
  const { demanding } = dict;
  const href = getSolutionHref(locale, "sistemas-resinosos");

  const tiles: { key: keyof typeof demanding.items; name: string }[] = [
    { key: "esd", name: demanding.items.esd },
    { key: "highTraffic", name: demanding.items.highTraffic },
    { key: "chemical", name: demanding.items.chemical },
    { key: "selfLeveling", name: demanding.items.selfLeveling },
  ];

  return (
    <Section variant="light" spacing="normal" reveal aria-labelledby="demanding-title">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
              {demanding.kicker}
            </p>
            <h2
              id="demanding-title"
              className="mt-4 max-w-xl text-2xl font-extrabold leading-tight text-ccs-navy sm:text-3xl lg:text-4xl"
            >
              {demanding.title}
            </h2>
          </div>

          <Button
            href={getSolutionsHref(locale)}
            variant="secondary"
            size="md"
            className="self-start sm:self-auto"
          >
            {demanding.cta}
          </Button>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {tiles.map((tile) => (
            <li key={tile.key}>
              <Link
                href={href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-ccs-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan"
              >
                <Media
                  src=""
                  alt={tile.name}
                  placeholderLabel={demanding.imagePlaceholder}
                  placeholderTone="dark"
                  sizes="(min-width: 1024px) 24vw, 50vw"
                  fill
                  imageClassName="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ccs-navy/90 via-ccs-navy/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <h3 className="text-base font-semibold leading-tight text-white sm:text-lg">
                    {tile.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mb-0.5 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                  >
                    {ARROW}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
