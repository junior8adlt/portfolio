import type { CaseStudy } from "./types";

export const workEn: CaseStudy[] = [
  {
    slug: "enterprise-crm-modernization",
    index: "001",
    name: "Enterprise CRM Modernization",
    tagline:
      "Legacy WinForms + stored procedures → .NET Web API + React, for a large US logistics company",
    stamps: ["PRODUCTION", "NDA", "CLIENT"],
    stack: [".NET", "C#", "React", "SQL Server", "LINQ", "Azure DevOps", "LaunchDarkly"],
    period: "2024 — present",
    keyMetric: "timeouts → sub-second",
    situation:
      "A US logistics company runs its customer operations on a decades-old WinForms application backed by hundreds of undocumented stored procedures. The business logic exists only in production behavior: no specs, no original authors. The mandate: rebuild it as a modern .NET Web API + React platform without regressing a single workflow the business depends on.",
    evidence: [
      {
        metric: "6+ quarterly releases",
        caption:
          "sustained delivery cadence with end-to-end ownership: SQL design, API, React UI, release support",
      },
      {
        metric: "user-visible timeouts",
        caption:
          "critical customer screens timed out on large datasets before query and endpoint optimization",
      },
      {
        metric: "fragmented service layer",
        caption:
          "redundant auth layers and base64-encoded payloads accumulated across years of patchwork services",
      },
    ],
    visuals: [
      {
        src: "/exhibits/crm-redacted",
        title: "~/crm — production screens",
        caption:
          "Client screens withheld under NDA. The work shows in the numbers; the screenshots stay home.",
        width: 2880,
        height: 1800,
        redacted: true,
      },
    ],
    diagnosis:
      "The risk was never the new stack: it was silent behavioral drift. Legacy stored procedures encoded business rules nobody could enumerate. Every migrated module needed its legacy behavior reverse-engineered, characterized, and proven equivalent before the WinForms version could be retired.",
    intervention: [
      "Reverse-engineered undocumented stored-procedure behavior and rebuilt customer-management modules (approval workflows, classification, billing and payment surfaces) as .NET APIs + React, at feature parity.",
      "Led the stored-procedure-to-LINQ migration and consolidated fragmented services into a single experience API, removing redundant auth layers and base64 overhead.",
      "Optimized production SQL and endpoints: critical screens went from user-visible timeouts to sub-second responses; resolved recurring cold-start and pagination failures on large datasets.",
      "Served as release support lead across quarterly releases: production issue queue, hotfix cherry-picks onto release branches, change-approval coordination.",
      "Built custom MCP servers (Python + Playwright) that extract ITSM tickets and generate change-management artifacts, cutting hours of release paperwork per cycle.",
      "Defined a 6-phase forensic investigation methodology (data-first, refutation-required) now used to diagnose and document production incidents.",
    ],
    outcome: [
      { metric: "< 1s", caption: "response time on previously timing-out critical screens" },
      { metric: "0 regressions", caption: "legacy workflows replaced at parity across releases" },
      { metric: "hours/release", caption: "saved by MCP-automated change-management paperwork" },
      { metric: "stable defect ratio", caption: "across releases under mandatory AI-assisted + peer review" },
    ],
    annotation:
      "Client and internal identifiers withheld under NDA. Scope and outcomes as published in my CV.",
  },
  {
    slug: "el-carril",
    index: "002",
    name: "el-carril",
    tagline:
      "Real-money betting platform for Mexican parejeras horse racing — wallet, ledger, live events",
    stamps: ["PRODUCTION", "PERSONAL"],
    stack: ["NestJS", "Prisma", "PostgreSQL", "Redis", "React", "k6"],
    period: "2025 — present",
    url: "https://elcarrilmx.com",
    keyMetric: "double-entry ledger, 0 invariant violations",
    situation:
      "Parejeras (match-race) betting in Mexico runs on cash, paper notebooks, and trust. I designed and built a platform that moves real money between real people: deposits, bet matching, settlement, withdrawals. In a system like this a rounding error is not a bug, it is someone's money.",
    evidence: [
      {
        metric: "floats are forbidden",
        caption:
          "every monetary value is Decimal/NUMERIC end-to-end; serialization boundaries audited for precision loss",
      },
      {
        metric: "one write path",
        caption:
          "a single LedgerService owns every balance mutation; no other code path can touch money",
      },
      {
        metric: "spike: 200 VUs",
        caption:
          "k6 load tests against production-shaped data found the CPU ceiling at password hashing (argon2), not the ledger",
      },
    ],
    visuals: [
      {
        src: "/exhibits/el-carril-home.webp",
        title: "elcarrilmx.com — today's card, open book",
        caption:
          "The live racing card: peer-to-peer stakes, no house counterparty — every posted bet comes from another bettor.",
        width: 2880,
        height: 1800,
      },
      {
        src: "/exhibits/el-carril-mobile.webp",
        title: "elcarrilmx.com — mobile",
        caption: "Same book, ranch-friendly: most bettors follow the races from a phone.",
        width: 780,
        height: 1688,
      },
    ],
    diagnosis:
      "Financial integrity cannot be a code-review convention; it has to be structural. The design makes incorrect money handling unrepresentable: append-only ledger, idempotency keys on every mutation, serializable isolation on settlement, and balance snapshots that are recomputable from the ledger at any time.",
    intervention: [
      "Double-entry, append-only ledger on PostgreSQL with serializable transactions for settlement and idempotency keys for every money mutation.",
      "Admin cannot grant balance by design: the only money entry point is a deposit with a verified receipt — an invariant, not a policy.",
      "Audit log scoped to what matters (money movements, race results, identity changes) and partitioned by month with cold-storage archival, after costing the naive log-everything approach.",
      "Load-tested with k6 against a production-shaped dataset using a backup → prepare → throttle-off → test → restore runbook; established a capacity ceiling (~100 sustained VUs on current infra) and the upgrade path beyond it.",
      "Redis for session and hot-path caching; rate limiting on auth and money endpoints.",
    ],
    outcome: [
      { metric: "100% reconcilable", caption: "balances recomputable from the ledger at any point in time" },
      { metric: "~100 VUs", caption: "sustained load on minimal infra, with a measured (not guessed) ceiling" },
      { metric: "argon2", caption: "identified as the true CPU bottleneck via load forensics, not assumption" },
    ],
    annotation:
      "The most valuable line of code in this project is the one that makes admin balance grants impossible.",
  },
  {
    slug: "viridental",
    index: "003",
    name: "Viridental",
    tagline:
      "Clinical management system for a dental practice — odontogram, periodontics, patient records",
    stamps: ["LIVE", "CLIENT"],
    stack: ["NestJS", "Prisma", "PostgreSQL", "React", "PWA"],
    period: "2025 — present",
    keyMetric: "AAP/EFP 2018 classification, digitized",
    situation:
      "A dental practice (Dra. Viridiana Ochoa) ran clinical records on paper: odontograms drawn by hand, periodontal staging looked up in printed tables, patient history in folders. The goal was a system a dentist actually uses chairside, not generic practice-management software.",
    evidence: [
      {
        metric: "AAP/EFP 2018",
        caption:
          "official periodontitis staging/grading and gingivitis classification tables, encoded as the domain model",
      },
      {
        metric: "chairside = tablet",
        caption: "PWA installed on the clinic tablet; offline-tolerant, touch-first interactions",
      },
    ],
    visuals: [
      {
        src: "/exhibits/viridental-dashboard.webp",
        title: "viridental — today, chairside",
        caption:
          "The doctor's day on one screen: today's agenda, collected vs. outstanding, and receivables past 30 days.",
        width: 2880,
        height: 1800,
      },
      {
        src: "/exhibits/viridental-perio.webp",
        title: "viridental — periodontal chart",
        caption:
          "Per-site capture with auto-advance following the real probing path; AAP/EFP stage and grade derived from findings, then signed.",
        width: 2880,
        height: 1800,
      },
      {
        src: "/exhibits/viridental-odonto.webp",
        title: "viridental — odontogram",
        caption:
          "Conditions and treatments recorded directly on teeth, with the clinical legend and a per-surface treatment plan.",
        width: 2880,
        height: 1800,
      },
    ],
    diagnosis:
      "Clinical software fails when it digitizes forms instead of clinical reasoning. The periodontal classification is a decision procedure (bone loss, tooth loss, complexity factors → stage; progression rate, risk factors → grade), so the system should compute it from findings, not ask the dentist to fill in a dropdown.",
    intervention: [
      "Interactive odontogram as the primary navigation surface: conditions and treatments are recorded directly on teeth.",
      "Periodontal module that derives stage and grade from recorded clinical findings, following the official AAP/EFP 2018 tables the doctor already used on paper.",
      "Patient timeline unifying treatments, payments and clinical notes; NestJS + Prisma + PostgreSQL backend with role-based access.",
      "Built as a PWA so the clinic tablet runs it like a native app, with no app-store friction.",
    ],
    outcome: [
      { metric: "paper → 0", caption: "clinical records fully digital for new patients" },
      { metric: "computed staging", caption: "periodontal classification derived from findings, not transcribed" },
    ],
  },
  {
    slug: "mikeas-movement",
    index: "004",
    name: "MIKEAS Movement",
    tagline: "D2C ecommerce for a Mexican lifestyle apparel brand — storefront, checkout, admin",
    stamps: ["PRODUCTION", "CLIENT"],
    stack: ["Next.js 15", "TypeScript", "PostgreSQL", "Playwright", "Vitest"],
    period: "2025 — present",
    url: "https://www.mikeasmovement.com",
    keyMetric: "E2E on 3 devices before every release",
    situation:
      "A Mexican apparel brand selling direct-to-consumer needed a storefront and back office built from zero: catalog, cart, checkout, order management, analytics. Most of its traffic is mobile, so mobile is the design target, not an afterthought.",
    evidence: [
      {
        metric: "mobile-first, enforced",
        caption: "storefront and admin are designed at phone width first, from the first mock onward",
      },
      {
        metric: "cookies/CORS/touch",
        caption:
          "the bug classes that unit tests cannot catch — the reason every module ships with cross-device E2E",
      },
    ],
    visuals: [
      {
        src: "/exhibits/mikeas-home.webp",
        title: "mikeasmovement.com — storefront",
        caption: "The storefront carries the brand: minimalist apparel, minimalist canvas.",
        width: 2880,
        height: 1800,
      },
      {
        src: "/exhibits/mikeas-mobile.webp",
        title: "mikeasmovement.com — mobile",
        caption:
          "The viewport that actually sells: designed at phone width first, where most of the traffic lives.",
        width: 780,
        height: 1688,
      },
    ],
    diagnosis:
      "Ecommerce quality is an integration property: a checkout that passes unit tests can still lose carts to a cookie misconfiguration on iOS Safari. The discipline that matters is full-flow testing on the devices customers actually use, run before anything reaches production.",
    intervention: [
      "Next.js 15 full-stack build: storefront, cart and checkout flows, and an admin dashboard with shadcn charts for sales analytics.",
      "Test pyramid per module: Vitest integration suites plus Playwright E2E covering the golden path and edge cases on desktop, iPad and iPhone viewports.",
      "Release gate: E2E suite runs against the local API + database before any push, because a push deploys to production.",
      "Admin and storefront share a design system; responsive behavior is reviewed at every breakpoint as part of the definition of done.",
    ],
    outcome: [
      { metric: "3 devices", caption: "desktop, iPad, iPhone — every module E2E-tested before release" },
      { metric: "push = prod", caption: "trunk deploys safely because the release gate is non-negotiable" },
    ],
  },
  {
    slug: "be-all",
    index: "005",
    name: "Be All",
    tagline:
      "Hybrid learning + commerce platform — courses, webinars, physical and digital products, one checkout",
    stamps: ["PRODUCTION", "CLIENT"],
    stack: ["Next.js 14", "MySQL", "Prisma", "Stripe", "Clerk", "Claude API"],
    period: "2024 — present",
    url: "https://www.beallfam.com",
    keyMetric: "31 models · 84 API routes",
    situation:
      "A Spanish-language education business needed to sell what most platforms force you to split across three tools: video courses, live webinars, and physical and digital products — plus handle Mexican-market payments, refunds and shipping. The usual answer is an LMS glued to a store glued to an events tool, with three checkouts and three admin panels. The brief was one platform, one checkout, one back office.",
    evidence: [
      {
        metric: "31 Prisma models",
        caption:
          "courses with chapters and progress, webinars with capacity and early-bird pricing, products with inventory, unified orders",
      },
      {
        metric: "84 API routes",
        caption:
          "covering 16+ feature domains: checkout, refunds, coupons, analytics, shipping, notifications, admin",
      },
      {
        metric: "three purchase lifecycles",
        caption:
          "a course, a webinar seat and a t-shirt sell, refund and account differently — but the business needs one ledger of orders",
      },
    ],
    visuals: [
      {
        src: "/exhibits/be-all-home.webp",
        title: "beallfam.com — landing",
        caption:
          "One storefront for three verticals: courses, webinars and products behind a single checkout.",
        width: 2880,
        height: 1800,
      },
      {
        src: "/exhibits/be-all-mobile.webp",
        title: "beallfam.com — mobile",
        caption: "The same catalog on the device where the audience actually enrolls.",
        width: 780,
        height: 1688,
      },
    ],
    diagnosis:
      "Hybrid commerce fails when each vertical grows its own purchase pipeline: refunds and reporting fragment until nobody can answer 'how much did we sell this month'. The architecture had to share an order, refund and coupon core across verticals while letting each keep its domain logic — progress tracking for courses, capacity for webinars, inventory for physical goods.",
    intervention: [
      "Unified order system over Stripe Checkout with webhook-driven fulfillment: courses unlock, digital products deliver, physical orders enter shipping — all from one payment event.",
      "Refund engine with a real state machine (pending → review → approved → processing → completed), a configurable auto-approval policy service, per-state audit log, and webinar seat release on refund.",
      "Coupon system supporting percentage, fixed-amount and free-shipping discounts with per-user limits, category targeting and a full usage audit trail (original price, final price, IP).",
      "LMS core: chaptered video courses with per-user progress; webinars with early-bird windows, attendee caps and reschedule notifications; product reviews with approval workflow.",
      "AI analytics consultant: a Claude-powered dashboard that reads 30-day revenue, refund and category metrics and answers questions about them, with Excel and PDF report export.",
      "Transactional email flows for every purchase type, plus admin dashboards for orders, refunds and team management.",
    ],
    outcome: [
      { metric: "1 checkout", caption: "for three product verticals with different fulfillment and refund rules" },
      { metric: "auto-resolved refunds", caption: "policy engine approves routine cases; humans only see the exceptions" },
      { metric: "in production", caption: "live at beallfam.com serving a Spanish-speaking market" },
    ],
  },
];
