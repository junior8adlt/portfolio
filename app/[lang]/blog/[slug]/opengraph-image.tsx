import { ImageResponse } from "next/og";
import { getPost } from "@/content/blog";
import { isLang, t, type Lang } from "@/lib/i18n";

export const alt = "Field note — Alberto Ochoa, Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "en") as Lang;
  const post = getPost(lang, slug);
  if (!post) return new Response("not found", { status: 404 });
  const { meta } = post;

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
        <div style={{ display: "flex", color: "#5fae74", fontSize: 24 }}>
          {">"} cat /blog/{meta.slug}.md
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", color: "#9aa396", fontSize: 22, gap: 14 }}>
            <span>{meta.date}</span>
            <span>·</span>
            <span>
              {meta.readingMin} {t(lang).blog.minRead}
            </span>
            <span>·</span>
            <span style={{ color: "#d4a843" }}>{meta.tags.join(" · ")}</span>
          </div>
          <div
            style={{
              display: "flex",
              color: "#e6eae2",
              fontSize: meta.title.length > 60 ? 44 : 54,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 1020,
            }}
          >
            {meta.title}
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
          <div style={{ display: "flex", color: "#46f06e", fontSize: 24 }}>alberto@ochoa:~$</div>
          <div style={{ display: "flex", color: "#9aa396", fontSize: 24 }}>
            albertoochoa.dev/blog
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
