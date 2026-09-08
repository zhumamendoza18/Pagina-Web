interface SkipLinkProps {
  label: string;
  targetId?: string;
}

/** Hidden until focused; lets keyboard users jump straight to the main content. */
export function SkipLink({ label, targetId = "main-content" }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ccs-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      {label}
    </a>
  );
}
