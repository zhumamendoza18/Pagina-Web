"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/content/types";
import { Media } from "@/components/ui/Media";
import { Modal } from "@/components/ui/Modal";

type EthosKey = "mission" | "vision" | "values";

const icons: Record<EthosKey, ReactNode> = {
  mission: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  vision: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  values: (
    <>
      <path d="M12 3l7 3v5c0 4.3-2.9 7.7-7 9-4.1-1.3-7-4.7-7-9V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

function EthosIcon({ name }: { name: EthosKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function EthosModalContent({
  ethos,
  which,
}: {
  ethos: Dictionary["ethos"];
  which: EthosKey;
}) {
  if (which === "values") {
    return (
      <div className="pr-8">
        <h2 id="ethos-modal-title" className="text-2xl font-bold text-ccs-navy">
          {ethos.values.title}
        </h2>
        <ul className="mt-5 flex flex-col gap-2.5">
          {ethos.values.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ccs-charcoal">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ccs-cyan-dark"
              />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const block = which === "mission" ? ethos.mission : ethos.vision;
  return (
    <div className="pr-8">
      <h2 id="ethos-modal-title" className="text-2xl font-bold text-ccs-navy">
        {block.title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-ccs-charcoal/85">
        {block.body}
      </p>
    </div>
  );
}

interface EthosGridProps {
  ethos: Dictionary["ethos"];
}

export function EthosGrid({ ethos }: EthosGridProps) {
  const [openKey, setOpenKey] = useState<EthosKey | null>(null);

  const cards: { key: EthosKey; title: string }[] = [
    { key: "mission", title: ethos.mission.title },
    { key: "vision", title: ethos.vision.title },
    { key: "values", title: ethos.values.title },
  ];

  return (
    <>
      <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
        {cards.map(({ key, title }) => (
          <li key={key}>
            <article className="group relative flex h-full min-h-[21rem] flex-col justify-end overflow-hidden rounded-lg bg-ccs-navy p-6 lg:min-h-[25rem]">
              <Media
                src=""
                alt=""
                placeholderLabel={ethos.imagePlaceholder}
                placeholderTone="dark"
                sizes="(min-width: 768px) 33vw, 100vw"
                fill
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-ccs-navy/80"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ccs-navy via-ccs-navy/45 to-ccs-navy/20"
              />

              <div className="relative flex flex-col items-start gap-4 text-white">
                <span className="text-ccs-cyan">
                  <EthosIcon name={key} />
                </span>
                <h3 className="text-2xl font-bold">{title}</h3>
                <button
                  type="button"
                  onClick={() => setOpenKey(key)}
                  className="mt-1 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-white/60 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ccs-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {ethos.learnMore}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Modal
        open={openKey !== null}
        onClose={() => setOpenKey(null)}
        labelledBy="ethos-modal-title"
        closeLabel={ethos.close}
      >
        {openKey && <EthosModalContent ethos={ethos} which={openKey} />}
      </Modal>
    </>
  );
}
