import { SITE } from "@/lib/site";
import { experience, skills } from "@/content/experience";
import { work } from "@/content/work";
import { lab } from "@/content/lab";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      $schema: "https://jsonresume.org/schema",
      basics: {
        name: SITE.name,
        label: "Senior Software Engineer",
        email: SITE.email,
        url: SITE.url,
        summary: SITE.description,
        location: { region: "Jalisco", countryCode: "MX" },
        profiles: [
          { network: "LinkedIn", url: SITE.linkedin },
          { network: "GitHub", url: SITE.github },
        ],
      },
      work: experience.map((job) => ({
        position: job.role,
        name: job.company,
        period: job.period,
        summary: job.summary,
        highlights: job.bullets,
      })),
      skills: Object.entries(skills).map(([name, keywords]) => ({ name, keywords })),
      projects: [
        ...work.map((w) => ({
          name: w.name,
          type: "case-study",
          description: w.tagline,
          keywords: w.stack,
          url: `${SITE.url}/work/${w.slug}`,
          highlights: w.outcome.map((o) => `${o.metric} — ${o.caption}`),
        })),
        ...lab.map((entry) => ({
          name: entry.name,
          type: "experiment",
          description: entry.tagline,
          keywords: entry.stack,
          highlights: [entry.highlight],
        })),
      ],
      education: [
        {
          institution: "Instituto Tecnológico Superior de Chapala, México",
          area: "Computer Systems Engineering",
        },
      ],
      languages: [
        { language: "English", fluency: "Fluent" },
        { language: "Spanish", fluency: "Native" },
      ],
      meta: {
        canonical: `${SITE.url}/api/cv`,
        note: "Machine-readable CV. Human version at the site root. Built by an engineer who ships MCP servers; agents welcome.",
      },
    },
    {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
