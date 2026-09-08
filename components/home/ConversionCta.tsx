import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { ctaImageSrc, ctaConfig } from "@/data/home";
import { QUOTE_ANCHOR } from "@/lib/navigation";
import { whatsappHref, telHref } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface ConversionCtaProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * End-of-page conversion band: large coating-application photo, navy overlay,
 * short prompt and three actions. The WhatsApp and Call buttons read the
 * central config — when a number is not set they render as disabled buttons
 * rather than fake links.
 */
export function ConversionCta({ dict }: ConversionCtaProps) {
  const { cta } = dict;
  const whatsapp = whatsappHref(cta.whatsappMessage);
  const tel = telHref();

  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-ccs-navy"
    >
      <Media
        src={ctaImageSrc()}
        alt={cta.imageAlt}
        placeholderLabel={cta.imagePlaceholder}
        placeholderTone="dark"
        position={ctaConfig.imagePosition}
        sizes="100vw"
        fill
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ccs-navy/85"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ccs-navy via-ccs-navy/70 to-ccs-navy/60"
      />

      <Container className="relative z-10 py-20 text-center sm:py-28 lg:py-32">
        <Reveal>
        <h2
          id="cta-title"
          className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{cta.body}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            href={whatsapp}
            external
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {dict.actions.whatsapp}
          </Button>
          <Button
            href={tel}
            external
            newTab={false}
            variant="on-dark"
            size="lg"
            className="w-full sm:w-auto"
          >
            {cta.call}
          </Button>
          <Button
            href={`#${QUOTE_ANCHOR}`}
            variant="on-dark"
            size="lg"
            className="w-full sm:w-auto"
          >
            {dict.actions.requestQuote}
          </Button>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
