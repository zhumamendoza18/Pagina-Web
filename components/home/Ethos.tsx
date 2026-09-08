import type { Dictionary } from "@/content/types";
import { ETHOS_ANCHOR } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EthosGrid } from "@/components/company/EthosGrid";

interface EthosProps {
  dict: Dictionary;
}

/**
 * "Mission, vision & values" — three large visual cards. The Home shows only
 * icon + title + "Learn more"; the full text opens in an accessible modal.
 */
export function Ethos({ dict }: EthosProps) {
  const { ethos } = dict;

  return (
    <Section
      id={ETHOS_ANCHOR}
      variant="light"
      spacing="large"
      reveal
      aria-labelledby="ethos-title"
    >
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
          {ethos.kicker}
        </p>
        <h2
          id="ethos-title"
          className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-ccs-navy sm:text-4xl lg:text-5xl"
        >
          {ethos.title}
        </h2>

        <div className="mt-10 lg:mt-12">
          <EthosGrid ethos={ethos} />
        </div>
      </Container>
    </Section>
  );
}
