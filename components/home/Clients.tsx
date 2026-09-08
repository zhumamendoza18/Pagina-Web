import type { Dictionary } from "@/content/types";
import { site } from "@/config/site";
import { clients, clientLogoSrc } from "@/data/clients";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LogoCarousel } from "@/components/company/LogoCarousel";

interface ClientsProps {
  dict: Dictionary;
}

/**
 * "Companies that have trusted us." Hidden entirely — renders nothing and
 * occupies no space — until `site.flags.showClients` is true AND there is
 * real client data. No fictitious names or logos.
 */
export function Clients({ dict }: ClientsProps) {
  if (!site.flags.showClients || clients.length === 0) return null;

  const items = clients.map((client) => ({
    name: client.name,
    src: clientLogoSrc(client.logo),
    url: client.url,
  }));

  return (
    <Section variant="muted" spacing="normal" reveal aria-labelledby="clients-title">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
          {dict.clients.kicker}
        </p>
        <h2
          id="clients-title"
          className="mt-4 max-w-xl text-2xl font-extrabold leading-tight text-ccs-navy sm:text-3xl lg:text-4xl"
        >
          {dict.clients.title}
        </h2>

        <div className="mt-10">
          <LogoCarousel
            items={items}
            ariaLabel={dict.clients.carouselLabel}
            prevLabel={dict.clients.prev}
            nextLabel={dict.clients.next}
          />
        </div>
      </Container>
    </Section>
  );
}
