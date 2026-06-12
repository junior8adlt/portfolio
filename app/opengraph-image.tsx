import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — Senior Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          padding: 72,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", color: "#5fae74", fontSize: 26 }}>
            {">"} opening case_file: alberto_ochoa.log
          </div>
          <div style={{ display: "flex", color: "#5fae74", fontSize: 26 }}>
            {">"} specialty: legacy_modernization + ai_tooling
            <span style={{ color: "#46f06e", marginLeft: 12 }}>[OK]</span>
          </div>
        </div>
        <div
          style={{
            color: "#e6eae2",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 980,
            display: "flex",
          }}
        >
          I modernize legacy systems without regressions.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2c352e",
            paddingTop: 28,
          }}
        >
          <div style={{ color: "#46f06e", fontSize: 28 }}>{SITE.handle}</div>
          <div style={{ color: "#9aa396", fontSize: 24 }}>albertoochoa.dev</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
