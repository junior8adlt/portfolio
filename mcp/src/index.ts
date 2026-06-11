#!/usr/bin/env node
/**
 * alberto-mcp — MCP server for Alberto Ochoa's CV and portfolio.
 *
 * Add to any MCP client (Claude Code, Claude Desktop, etc.):
 *   { "command": "npx", "args": ["-y", "alberto-mcp"] }
 *
 * Data is fetched live from https://albertoochoa.dev — the same dataset that
 * renders the site, its PDF CV and its llms.txt. No local state, no tracking.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SITE = process.env.ALBERTO_MCP_BASE ?? "https://albertoochoa.dev";

async function fetchJson(path: string): Promise<unknown> {
  const res = await fetch(`${SITE}${path}`, {
    headers: { "User-Agent": "alberto-mcp" },
  });
  if (!res.ok) throw new Error(`${SITE}${path} responded ${res.status}`);
  return res.json();
}

function text(content: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: typeof content === "string" ? content : JSON.stringify(content, null, 2),
      },
    ],
  };
}

const server = new McpServer({
  name: "alberto-mcp",
  version: "0.1.0",
});

server.tool(
  "get_profile",
  "Profile, contact info, skills, education, languages and work history of Alberto Ochoa (senior software engineer, 8+ years: legacy modernization + AI tooling). JSON Resume schema.",
  {},
  async () => text(await fetchJson("/api/cv")),
);

server.tool(
  "list_case_studies",
  "List Alberto's portfolio case studies (name, slug, tagline, stack, key result). Use get_case_study for the full forensic write-up.",
  {},
  async () => {
    const data = (await fetchJson("/api/work")) as {
      caseStudies: Array<{ slug: string; name: string; tagline: string; stack: string[]; keyMetric: string }>;
    };
    return text(
      data.caseStudies.map(({ slug, name, tagline, stack, keyMetric }) => ({
        slug,
        name,
        tagline,
        stack,
        keyResult: keyMetric,
      })),
    );
  },
);

server.tool(
  "get_case_study",
  "Full forensic case study (situation, evidence, diagnosis, intervention, outcome) for one of Alberto's projects, by slug from list_case_studies.",
  { slug: z.string().describe("Case study slug, e.g. 'el-carril'") },
  async ({ slug }) => {
    const data = (await fetchJson("/api/work")) as {
      caseStudies: Array<{ slug: string }>;
    };
    const cs = data.caseStudies.find((c) => c.slug === slug);
    if (!cs) {
      const available = data.caseStudies.map((c) => c.slug).join(", ");
      return text(`No case study '${slug}'. Available: ${available}`);
    }
    return text(cs);
  },
);

server.tool(
  "search_experience",
  "Search Alberto's work history, skills and projects for a keyword (e.g. 'SQL optimization', 'MCP', 'React Native'). Returns matching entries.",
  { query: z.string().describe("Keyword or phrase to search for") },
  async ({ query }) => {
    const cv = (await fetchJson("/api/cv")) as {
      work: Array<{ position: string; name: string; period: string; summary: string; highlights: string[] }>;
      skills: Array<{ name: string; keywords: string[] }>;
      projects: Array<{ name: string; description: string; keywords: string[]; highlights?: string[] }>;
    };
    const q = query.toLowerCase();
    const matches = (s: string) => s.toLowerCase().includes(q);

    const jobs = cv.work.filter(
      (j) => matches(j.summary) || matches(j.name) || matches(j.position) || j.highlights.some(matches),
    );
    const skills = cv.skills.filter((s) => s.keywords.some(matches));
    const projects = cv.projects.filter(
      (p) => matches(p.name) || matches(p.description) || p.keywords.some(matches) || (p.highlights ?? []).some(matches),
    );

    if (!jobs.length && !skills.length && !projects.length) {
      return text(`No matches for '${query}'. Try broader terms, or call get_profile for everything.`);
    }
    return text({ query, jobs, skills, projects });
  },
);

server.tool(
  "get_contact",
  "How to contact Alberto Ochoa: email, LinkedIn, GitHub, website, location and availability.",
  {},
  async () => {
    const cv = (await fetchJson("/api/cv")) as {
      basics: { email: string; url: string; profiles: Array<{ network: string; url: string }> };
    };
    return text({
      email: cv.basics.email,
      website: cv.basics.url,
      profiles: cv.basics.profiles,
      cvPdf: `${SITE}/cv.pdf`,
      availability: "Open to senior full-stack roles and consulting with US teams.",
    });
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("alberto-mcp ready — data source: " + SITE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
