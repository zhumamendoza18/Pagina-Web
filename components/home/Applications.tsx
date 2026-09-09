import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { specializedApplications, subtopicImageSrc } from "@/data/solutions";
import { getSolutionSubtopicHref, getSolutionsHref } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ApplicationsCarousel } from "@/components/solutions/ApplicationsCarousel";

interface ApplicationsProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Secondary, photo-first section: a touch-friendly carousel of specialized
 * applications. Each card is image + name + arrow — no descriptions — and
 * "View all solutions" leads to the full index so the Home stays uncluttered.
 */
export function Applications({ locale, dict }: ApplicationsProps) {
  const { applications } = dict;

  const items = specializedApplications().map(({ category, subtopic }) => ({
    // category + subtopic slugs: unique per card and identical in ES / EN,
    // even though several cards share the same family anchor as `href`.
    id: `${category.slug}__${subtopic.slug}`,
    href: getSolutionSubtopicHref(locale, category.slug),
    name: subtopic.name[locale],
    imageSrc: subtopicImageSrc(subtopic),
  }));

  return (
    <Section variant="muted" spacing="large" reveal aria-labelledby="applications-title">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
              {applications.kicker}
            </p>
            <h2
              id="applications-title"
              className="mt-4 max-w-xl text-2xl font-extrabold leading-tight text-ccs-navy sm:text-3xl lg:text-4xl"
            >
              {applications.title}
            </h2>
          </div>

          <Button
            href={getSolutionsHref(locale)}
            variant="secondary"
            size="md"
            className="self-start sm:self-auto"
          >
            {applications.viewAll}
          </Button>
        </div>

        <div className="mt-10">
          <ApplicationsCarousel
            items={items}
            labels={{
              prev: applications.prev,
              next: applications.next,
              carouselLabel: applications.carouselLabel,
              imagePlaceholder: applications.imagePlaceholder,
            }}
          />
        </div>
      </Container>
    </Section>
  );
}
