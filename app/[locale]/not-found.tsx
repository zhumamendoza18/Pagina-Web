import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/dictionaries";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/**
 * Localized 404 for paths under /es or /en. Defaults to Spanish copy since
 * the segment locale is not available to not-found.tsx.
 */
export default function LocaleNotFound() {
  const dict = getDictionary("es");

  return (
    <Section variant="light" spacing="large">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan">
          404
        </p>
        <h1 className="mt-5 text-4xl font-extrabold text-ccs-navy sm:text-5xl">
          {dict.notFound.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-ccs-gray">{dict.notFound.body}</p>
        <Link
          href="/es"
          className="mt-8 inline-flex rounded-md bg-ccs-cyan-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ccs-navy"
        >
          {dict.notFound.back}
        </Link>
      </Container>
    </Section>
  );
}
