import type { ExperienceEntry } from "./types";

export const experienceEn: ExperienceEntry[] = [
  {
    role: "Senior Software Engineer",
    company: "Nexaminds",
    period: "Sep 2024 — present",
    summary:
      "Enterprise CRM modernization for a large US logistics client: WinForms + stored procedures → .NET Web API + React.",
    bullets: [
      "End-to-end ownership across 6+ quarterly releases: SQL design, API, React UI, production support.",
      "Critical screens from user-visible timeouts to sub-second; led stored-procedure-to-LINQ migration and API consolidation.",
      "Built MCP servers (Python + Playwright) automating ITSM ticket extraction and change-management artifacts.",
      "Release support lead: production issue queue, hotfix cherry-picks, change-approval coordination.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Pentalog",
    period: "Jul 2021 — Aug 2024",
    summary:
      "Enterprise platform managing programs, coaches and students across multiple US universities.",
    bullets: [
      "React + GraphQL interfaces with real-time feedback and automatic session handling; +15% process efficiency through automation.",
      "Designed reusable component architecture and state-management patterns.",
      "Presented demos directly to clients; led frontend candidate screening and technical evaluations.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Edgebound",
    period: "Jan 2021 — Jul 2021",
    summary: "Ecommerce platform features on VTEX and HCL Commerce.",
    bullets: [
      "Checkout flows, cart systems, shipping and payment integrations.",
      "Sales and usage analytics dashboards.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Rokode",
    period: "Jun 2019 — Dec 2020",
    summary: "Frontend solutions for enterprise clients, including major automotive companies.",
    bullets: [
      "Employee transport tracking, event platforms, interactive plant maps — React and React Native.",
      "Led a team of 4 frontend developers.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Ferax",
    period: "Jul 2018 — May 2019",
    summary: "Logistics and waste-management web and mobile applications.",
    bullets: [
      "Route scheduling and real-time vehicle tracking (AngularJS, Node.js, React Native + Google Maps).",
      "Payment integrations and identity verification modules.",
    ],
  },
];

export const skills = {
  backend: [".NET / C#", "ASP.NET Core", "LINQ", "SQL Server (T-SQL, optimization)", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Redis"],
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "React Native"],
  ai: ["MCP server development", "Claude API", "Python", "Playwright", "prompt engineering", "agent workflows"],
  practices: ["legacy modernization", "API-first design", "feature flags", "release management", "incident forensics", "load testing (k6)"],
} as const;
