import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { homeGallerySlots } from "@/data/projects";
import { getProjectsHref } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WorkGallery } from "@/components/projects/WorkGallery";

interface WorkProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * "Our work" — photo-first editorial gallery. Real projects will replace the
 * placeholder tiles later; for now nothing is invented (no names, clients or
 * locations).
 */
export function Work({ locale, dict }: WorkProps) {
  const { work } = dict;

  return (
    <Section variant="light" spacing="large" reveal aria-labelledby="work-title">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
          {work.kicker}
        </p>
        <h2
          id="work-title"
          className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-ccs-navy sm:text-4xl lg:text-5xl"
        >
          {work.title}
        </h2>

        <div className="mt-10">
          <WorkGallery
            slots={homeGallerySlots}
            filterLabels={work.filters}
            categoryLabels={{
              industrial: work.filters.industrial,
              commercial: work.filters.commercial,
              residential: work.filters.residential,
              specialized: work.filters.specialized,
            }}
            filtersAriaLabel={work.filtersLabel}
            placeholderLabel={work.imagePlaceholder}
            comingSoonLabel={work.comingSoon}
            emptyLabel={work.emptyState}
          />
        </div>

        <div className="mt-12">
          <Button href={getProjectsHref(locale)} variant="secondary" size="lg">
            {work.viewMore}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
