import { SITE } from "@/lib/site";
import { work } from "@/content/work";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      source: `${SITE.url}/api/work`,
      note: "Full forensic case studies, same data that renders /work. See also /api/cv and /llms.txt.",
      caseStudies: work.map((w) => ({
        slug: w.slug,
        url: `${SITE.url}/work/${w.slug}`,
        liveUrl: w.url ?? null,
        name: w.name,
        tagline: w.tagline,
        period: w.period,
        stamps: w.stamps,
        stack: w.stack,
        keyMetric: w.keyMetric,
        situation: w.situation,
        evidence: w.evidence,
        diagnosis: w.diagnosis,
        intervention: w.intervention,
        outcome: w.outcome,
      })),
    },
    {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
