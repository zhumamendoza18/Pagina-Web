import type { Dictionary } from "@/content/types";
import { site } from "@/config/site";
import { visibleBrands, brandLogoSrc } from "@/data/brands";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LogoCarousel } from "@/components/company/LogoCarousel";

interface BrandsProps {
  dict: Dictionary;
}

/**
 * "Technology and materials" (suppliers / brands). Hidden entirely — renders
 * nothing and occupies no space — until `site.flags.showBrands` is true AND
 * there is real brand data. No fictitious suppliers or logos.
 */
export function Brands({ dict }: BrandsProps) {
  const roster = visibleBrands();
  if (!site.flags.showBrands || roster.length === 0) return null;

  const items = roster.map((brand) => ({
    name: brand.name,
    src: brandLogoSrc(brand.logo),
    url: brand.url,
  }));

  return (
    <Section variant="light" spacing="normal" reveal aria-labelledby="brands-title">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
          {dict.brands.kicker}
        </p>
        <h2
          id="brands-title"
          className="mt-4 max-w-xl text-2xl font-extrabold leading-tight text-ccs-navy sm:text-3xl lg:text-4xl"
        >
          {dict.brands.title}
        </h2>

        <div className="mt-10">
          <LogoCarousel
            items={items}
            ariaLabel={dict.brands.carouselLabel}
            prevLabel={dict.brands.prev}
            nextLabel={dict.brands.next}
          />
        </div>
      </Container>
    </Section>
  );
}
