import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { featuredSolutions, solutionImageSrc } from "@/data/solutions";
import { getSolutionHref, getSolutionsHref } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import type { SolutionIconName } from "@/components/ui/SolutionIcon";

interface SolutionsProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * "Our solutions" — the four main families as large photographic cards.
 * Purely visual: photo, title, discreet icon, arrow, elegant hover.
 * The Home shows only the featured families; "View all services" leads to
 * the full index.
 */
export function Solutions({ locale, dict }: SolutionsProps) {
  const { solutions } = dict;
  const families = featuredSolutions();

  return (
    <Section variant="navy" spacing="large" reveal aria-labelledby="solutions-title">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan">
              {solutions.kicker}
            </p>
            <h2
              id="solutions-title"
              className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {solutions.title}
            </h2>
          </div>

          <Button
            href={getSolutionsHref(locale)}
            variant="on-dark"
            size="md"
            className="self-start sm:self-auto"
          >
            {solutions.viewAll}
          </Button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:gap-6">
          {families.map((family, index) => {
            const title = solutions.categories[
              family.titleKey as keyof typeof solutions.categories
            ];
            return (
              <SolutionCard
                key={family.slug}
                href={getSolutionHref(locale, family.slug)}
                title={title}
                icon={family.icon as SolutionIconName}
                imageSrc={solutionImageSrc(family)}
                imageAlt={title}
                placeholderLabel={solutions.imagePlaceholder}
                priority={index < 2}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
