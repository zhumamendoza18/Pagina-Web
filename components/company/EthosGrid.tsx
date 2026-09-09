"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/content/types";
import { Modal } from "@/components/ui/Modal";

type EthosKey = "mission" | "vision" | "values";

/**
 * Company photos for the "what guides us" section. Each file already carries
 * the corporate design (logo, title, graphics), so nothing is drawn on top of
 * them. They are shown WHOLE — width 100% / height auto, real proportion,
 * never a fixed height, never `object-cover`, never cropped.
 */
const IMAGE_WIDTH = 1672;
const IMAGE_HEIGHT = 941;

const cardSources: Record<EthosKey, string> = {
  mission: "/images/ccs/company/mission.png",
  vision: "/images/ccs/company/vision.png",
  values: "/images/ccs/company/values.png",
};

/**
 * Full-image modal content. Paths keep the real folder capitalisation
 * ("Modal"). Files are shared by /es and /en for now. Shown whole (width
 * 100% / height auto) — never cropped, no fixed height, no object-cover.
 */
const MODAL_IMAGE_WIDTH = 1484;
const MODAL_IMAGE_HEIGHT = 1060;

const modalSources: Record<EthosKey, string> = {
  mission: "/images/ccs/company/Modal/Mision1.png",
  vision: "/images/ccs/company/Modal/Vision1.png",
  values: "/images/ccs/company/Modal/Valores1.png",
};

const modalAlt: Record<EthosKey, string> = {
  mission: "Misión de Concrete Coatings Solutions",
  vision: "Visión de Concrete Coatings Solutions",
  values: "Valores de Concrete Coatings Solutions",
};

function EthosModalContent({
  ethos,
  which,
}: {
  ethos: Dictionary["ethos"];
  which: EthosKey;
}) {
  const title =
    which === "mission"
      ? ethos.mission.title
      : which === "vision"
        ? ethos.vision.title
        : ethos.values.title;

  return (
    <>
      {/* Kept only as the dialog's accessible name — not shown; the image
          itself carries the visible title and text. */}
      <h2 id="ethos-modal-title" className="sr-only">
        {title}
      </h2>
      {/* eslint-disable-next-line @next/next/no-img-element -- a raw <img> so the
          browser honours max-width AND max-height together (object-fit: contain)
          and shrinks this local static image to fit the viewport with no scroll;
          next/image imposes its own width-driven sizing. */}
      <img
        src={modalSources[which]}
        alt={modalAlt[which]}
        width={MODAL_IMAGE_WIDTH}
        height={MODAL_IMAGE_HEIGHT}
        className="block h-auto w-auto rounded-lg object-contain max-w-[calc(100vw-24px)] max-h-[calc(100dvh-24px)] sm:max-w-[calc(100vw-40px)] sm:max-h-[calc(100dvh-40px)]"
      />
    </>
  );
}

interface EthosGridProps {
  ethos: Dictionary["ethos"];
}

/**
 * Editorial 2 + 1 composition on a light background — no cards, no dark boxes,
 * no backgrounds behind the images. Mission and Vision share the first row with
 * equal width; Values sits centred below at the same individual width. Each
 * block is one accessible <button> (whole image + link) that opens its modal.
 */
export function EthosGrid({ ethos }: EthosGridProps) {
  const [openKey, setOpenKey] = useState<EthosKey | null>(null);

  const cards: { key: EthosKey; label: string }[] = [
    { key: "mission", label: ethos.exploreMission },
    { key: "vision", label: ethos.exploreVision },
    { key: "values", label: ethos.exploreValues },
  ];

  function block({ key, label }: { key: EthosKey; label: string }) {
    return (
      <button
        type="button"
        onClick={() => setOpenKey(key)}
        className="group block w-full cursor-pointer rounded-lg text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan-dark"
      >
        {/* Wrapper matches the image's own ratio; overflow-hidden only clips the
            hover zoom, never the image in its normal state. */}
        <span className="block overflow-hidden rounded-lg">
          <Image
            src={cardSources[key]}
            alt=""
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            sizes="(min-width: 768px) 44vw, 92vw"
            style={{ width: "100%", height: "auto" }}
            className="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.015]"
          />
        </span>
        <span className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-ccs-navy underline-offset-4 transition-all duration-200 group-hover:text-ccs-cyan-dark group-hover:underline">
          {label}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
    );
  }

  const [mission, vision, values] = cards;

  return (
    <>
      <ul className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
        <li>{block(mission)}</li>
        <li>{block(vision)}</li>
        <li className="md:col-span-2">
          <div className="md:mx-auto md:w-[calc((100%-3rem)/2)] lg:w-[calc((100%-4rem)/2)]">
            {block(values)}
          </div>
        </li>
      </ul>

      <Modal
        open={openKey !== null}
        onClose={() => setOpenKey(null)}
        labelledBy="ethos-modal-title"
        closeLabel={ethos.close}
        size="media"
      >
        {openKey && <EthosModalContent ethos={ethos} which={openKey} />}
      </Modal>
    </>
  );
}
