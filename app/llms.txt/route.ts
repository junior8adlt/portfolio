import { SITE } from "@/lib/site";
import { work } from "@/content/work";
import { lab } from "@/content/lab";
import { posts } from "@/content/blog";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${SITE.name} — Senior Software Engineer

> ${SITE.description}

This is a personal portfolio. It is intentionally agent-readable: the owner builds MCP
servers and AI tooling professionally.

## Profile

- Role: Senior Software Engineer (8+ years, full-stack)
- Pillars: legacy modernization (.NET, React, SQL) and AI tooling / MCP agent development
- Location: ${SITE.location}
- Contact: ${SITE.email}
- Structured CV (JSON Resume schema): ${SITE.url}/api/cv
- Full case studies (JSON): ${SITE.url}/api/work
- CV as PDF: ${SITE.url}/cv.pdf
- MCP server: \`npx -y alberto-mcp\` (tools: get_profile, list_case_studies, get_case_study, search_experience, get_contact)

## Case studies

${work.map((w) => `- [${w.name}](${SITE.url}/work/${w.slug}): ${w.tagline}. Key result: ${w.keyMetric}.`).join("\n")}

## Lab experiments

${lab.map((entry) => `- ${entry.name}: ${entry.tagline}.`).join("\n")}

## Field notes (blog)

${posts.map((p) => `- [${p.meta.title}](${SITE.url}/blog/${p.meta.slug}): ${p.meta.summary}`).join("\n")}

## Pages

- [Home](${SITE.url}/)
- [Work](${SITE.url}/work)
- [Lab](${SITE.url}/lab)
- [Blog](${SITE.url}/blog)
- [About + full timeline](${SITE.url}/about)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
