interface PlaceholderProps {
  /** Optional short caption, e.g. "Imagen próximamente". */
  label?: string;
  /** Match the surrounding surface so it blends in. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Neutral image stand-in used until a real CCS photo is provided. It keeps the
 * layout proportions of the slot it fills. It is deliberately abstract — never
 * a fake photo and never a fake logo.
 */
export function Placeholder({
  label,
  tone = "light",
  className = "",
}: PlaceholderProps) {
  const surface =
    tone === "dark"
      ? "bg-ccs-charcoal text-white/60"
      : "bg-ccs-light text-ccs-gray";
  const stroke = tone === "dark" ? "rgba(255,255,255,0.10)" : "rgba(14,42,68,0.08)";

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center overflow-hidden ${surface} ${className}`.trim()}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${stroke} 0 1px, transparent 1px 14px)`,
      }}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <svg
          viewBox="0 0 48 48"
          className="h-9 w-9 opacity-70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="10" width="36" height="28" rx="2" />
          <path d="m10 32 9-9 7 7 6-6 6 6" />
          <circle cx="18" cy="19" r="3" />
        </svg>
        {label && (
          <span className="text-xs font-medium uppercase tracking-[0.18em]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
