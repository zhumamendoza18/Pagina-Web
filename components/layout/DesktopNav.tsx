"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type { NavItem } from "@/lib/navigation";

interface DesktopNavProps {
  locale: Locale;
  items: NavItem[];
}

export function DesktopNav({ locale, items }: DesktopNavProps) {
  const pathname = usePathname();
  const home = `/${locale}`;

  return (
    <ul className="flex items-center gap-7 xl:gap-9">
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== home && pathname.startsWith(`${item.href}/`));
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative py-2 text-sm font-medium tracking-wide transition-colors ${
                isActive
                  ? "text-ccs-navy"
                  : "text-ccs-charcoal/80 hover:text-ccs-navy"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-ccs-cyan-dark transition-transform duration-200 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
