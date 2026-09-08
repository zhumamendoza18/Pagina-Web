import { site, type SocialPlatform } from "@/config/site";

/**
 * Helpers that turn the central config into links — but ONLY when the
 * underlying data actually exists. When a value is empty they return null,
 * and the calling component must render nothing (never a fake / broken link).
 */

export function telHref(): string | null {
  const phone = site.contact.phone.trim();
  if (!phone) return null;
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(message?: string): string | null {
  const number = site.contact.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function emailHref(subject?: string): string | null {
  const email = site.contact.email.trim();
  if (!email) return null;
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
}

export function hasAnyContact(): boolean {
  const { phone, whatsapp, email, address } = site.contact;
  return Boolean(phone || whatsapp || email || address);
}

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

/** Only the social platforms that have a URL configured. */
export function activeSocialLinks(): SocialLink[] {
  return (Object.entries(site.social) as [SocialPlatform, string][])
    .filter(([, url]) => url.trim().length > 0)
    .map(([platform, href]) => ({ platform, href }));
}
