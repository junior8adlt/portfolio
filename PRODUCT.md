# PRODUCT.md — Alberto O. Portfolio

## Register

brand — this is a personal portfolio: the design IS the product. Every screen is a brand statement.

## Product purpose

Personal portfolio for Alberto Ochoa, senior full-stack software engineer (8+ years, Mexico, working for US clients). The site must convert two audiences:

1. **US technical recruiters / hiring managers** scanning for senior signal in under 60 seconds.
2. **Engineers and tech leads** who will actually dig into case studies and judge craft.

Primary conversions: open a case study, download/view CV, contact via email or LinkedIn.

## Positioning (the one thing to remember)

"I take legacy systems nobody understands, reverse-engineer them, and modernize them without regressions — and I build AI agents (MCP servers) that do real production work."

Two pillars: **legacy modernization** (WinForms + stored procedures → .NET APIs + React) and **AI tooling / agent development** (custom MCP servers, forensic incident methodology, Claude-powered workflows).

## Users & context

Hiring manager or recruiter opens the link from a CV or LinkedIn, usually at a desk, often at night or between meetings. They have seen 200 identical developer portfolios. The site must read as "this person operates production systems," not "this person followed a portfolio tutorial."

## Tone

Forensic, precise, calm confidence. A case file, not a sales pitch. Evidence over adjectives: every claim is backed by a measurable outcome ("user-visible timeouts → sub-second"). Dry humor allowed in microcopy (terminal messages), never memes.

## Content model

- **Work** — 4 forensic case studies (Situation → Evidence → Diagnosis → Intervention → Outcome): enterprise CRM modernization (NDA-safe), el-carril (real-money betting platform), Viridental (dental clinic system), MIKEAS Movement (D2C ecommerce).
- **Lab** — experiments: RuneForge, LolCoachingAI, claude-memory-mcp, OpenClaw / ITSM MCP servers.
- **About** — profile + experience timeline (from CV).
- **Machine-readable layer** — /api/cv (JSON), /llms.txt, JSON-LD. The portfolio itself demonstrates the AI-tooling pillar: agents can read it.

## Anti-references (what this must NOT look like)

- Generic dev portfolio: purple gradient hero, "Hi, I'm X 👋", identical project cards with GitHub stars.
- SaaS landing template: hero metric blocks, testimonial carousels, pricing-page energy.
- Overdone hacker cosplay: Matrix rain, green-on-black everything at full saturation, fake "hacking" animations. The terminal aesthetic must feel like a real engineer's tooling, restrained and purposeful.

## Strategic principles

1. Evidence over adjectives — numbers and artifacts, never "passionate" or "rockstar".
2. The medium is the message — site performance, a11y and machine-readability ARE the portfolio.
3. English-only content; SEO for "senior software engineer" + legacy modernization + MCP/agent keywords.
4. Mobile-first responsive; recruiters open links from phones.
5. Performance budget is a requirement: LCP < 1.5s, CLS ~0, minimal JS.

## Canonical domain

https://albertoochoa.dev (configured via single SITE constant; deployable to *.vercel.app meanwhile).
