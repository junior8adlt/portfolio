import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/content/work";
import { isLang, type Lang } from "@/lib/i18n";

export const alt = "Case study — Alberto Ochoa, Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const cs = getCaseStudy(lang, slug);
  if (!cs) return new Response("not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0d0b",
          padding: 64,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", color: "#5fae74", fontSize: 24 }}>
            {">"} cat /work/{cs.slug}.case
          </div>
          <div style={{ display: "flex", color: "#5fae74", fontSize: 24 }}>[{cs.index}]</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {cs.stamps.map((s) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  border: s === "NDA" ? "1.5px solid #d4a843" : "1.5px solid #3e6b4a",
                  color: s === "NDA" ? "#d4a843" : "#46f06e",
                  padding: "4px 12px",
                  fontSize: 18,
                  letterSpacing: 2,
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              color: "#e6eae2",
              fontSize: cs.name.length > 22 ? 56 : 72,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {cs.name}
          </div>
          <div
            style={{
              display: "flex",
              color: "#9aa396",
              fontSize: 26,
              lineHeight: 1.35,
              maxWidth: 980,
            }}
          >
            {cs.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2c352e",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", color: "#d4a843", fontSize: 24 }}>{cs.keyMetric}</div>
          <div style={{ display: "flex", color: "#46f06e", fontSize: 24 }}>albertoochoa.dev</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
