import type { Dictionary } from "@/content/types";
import { QUOTE_ANCHOR } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/forms/QuoteForm";

interface QuoteSectionProps {
  dict: Dictionary;
}

/**
 * "Request a quote" form. Frontend only — it never pretends a submission was
 * sent; a persistent note and the post-submit panel say so plainly.
 */
export function QuoteSection({ dict }: QuoteSectionProps) {
  const { quoteForm } = dict;

  return (
    <Section
      id={QUOTE_ANCHOR}
      variant="light"
      spacing="large"
      reveal
      aria-labelledby="quote-title"
    >
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
          {quoteForm.kicker}
        </p>
        <h2
          id="quote-title"
          className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-ccs-navy sm:text-4xl lg:text-5xl"
        >
          {quoteForm.title}
        </h2>

        <div className="mt-10">
          <QuoteForm form={quoteForm} />
        </div>
      </Container>
    </Section>
  );
}
