import { ImageResponse } from "next/og";
import { locales, isLocale } from "@/lib/i18n";
import { site } from "@/config/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "es";
  const tagline = site.tagline[l];
  const since = l === "es" ? "Desde 2009" : "Since 2009";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e2a44",
          padding: 88,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {since}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            {site.name}
          </div>
          <div style={{ color: "#0fa9dc", fontSize: 42, fontWeight: 600 }}>
            {tagline}
          </div>
        </div>

        <div
          style={{ height: 8, width: 200, background: "#0fa9dc", borderRadius: 4 }}
        />
      </div>
    ),
    { ...size },
  );
}
