import Link from "next/link";
import { SectionRule } from "@/components/section-rule";
import { LedgerRow } from "@/components/ledger-row";
import { work } from "@/content/work";
import { lab } from "@/content/lab";
import { skills } from "@/content/experience";
import { SITE } from "@/lib/site";

function BootLine({
  delay,
  children,
  className = "",
}: {
  delay: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`boot-line ${className}`} style={{ "--boot-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ── boot sequence hero ── */}
      <section className="pt-16 pb-20 sm:pt-24" aria-label="Introduction">
        <div className="space-y-1.5 font-mono text-xs text-paper-dim sm:text-sm">
          <BootLine delay={0}>
            <span className="text-phosphor-dim">❯</span> opening case_file:{" "}
            <span className="text-paper">alberto_ochoa.log</span>
          </BootLine>
          <BootLine delay={120}>
            <span className="text-phosphor-dim">❯</span> clearance:{" "}
            <span className="text-paper">senior_software_engineer · 8+ yrs</span>
          </BootLine>
          <BootLine delay={240}>
            <span className="text-phosphor-dim">❯</span> specialty:{" "}
            <span className="text-paper">legacy_modernization + ai_tooling</span>{" "}
            <span className="text-phosphor">[OK]</span>
          </BootLine>
        </div>

        <BootLine delay={450}>
          <h1 className="caret mt-10 max-w-[24ch] font-mono text-3xl font-semibold leading-tight tracking-tight text-paper sm:text-5xl">
            I take legacy systems nobody understands and modernize them{" "}
            <span className="text-phosphor glow">without regressions</span>.
          </h1>
        </BootLine>

        <BootLine delay={700}>
          <p className="mt-8 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
            Full-stack engineer across .NET, React and SQL for US enterprise clients. I also
            build MCP servers and AI agents that do real production work: release paperwork,
            incident forensics, ticket automation. Evidence below.
          </p>
        </BootLine>

        <BootLine delay={850} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="border border-phosphor-dim px-5 py-2.5 font-mono text-sm text-phosphor transition-colors duration-150 hover:bg-phosphor hover:text-ink"
          >
            open case files →
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="border border-ink-line px-5 py-2.5 font-mono text-sm text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
          >
            contact
          </a>
        </BootLine>
      </section>

      {/* ── featured case files ── */}
      <section className="pb-20" aria-labelledby="evidence-heading">
        <SectionRule label="case files · evidence" />
        <h2 id="evidence-heading" className="sr-only">
          Featured work
        </h2>
        <div className="mt-4">
          {work.map((w) => (
            <LedgerRow
              key={w.slug}
              href={`/work/${w.slug}`}
              index={w.index}
              name={w.name}
              tagline={w.tagline}
              keyMetric={w.keyMetric}
              stamps={w.stamps}
            />
          ))}
        </div>
      </section>

      {/* ── lab preview ── */}
      <section className="pb-20" aria-labelledby="lab-heading">
        <SectionRule label="lab · running experiments" tone="amber" />
        <h2 id="lab-heading" className="sr-only">
          Lab experiments
        </h2>
        <ul className="mt-6 space-y-3">
          {lab.map((entry) => (
            <li key={entry.slug} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-xs text-amber" aria-hidden="true">
                [{entry.index}]
              </span>
              <span className="font-mono text-sm font-medium text-paper">{entry.name}</span>
              <span className="font-serif text-[15px] text-paper-dim">{entry.tagline}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/lab"
          className="mt-6 inline-block py-2 font-mono text-sm text-paper-dim transition-colors duration-150 hover:text-phosphor"
        >
          inspect lab →
        </Link>
      </section>

      {/* ── toolchain ── */}
      <section className="pb-20" aria-labelledby="stack-heading">
        <SectionRule label="toolchain" tone="dim" />
        <h2 id="stack-heading" className="sr-only">
          Skills
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {(
            [
              ["backend", skills.backend],
              ["frontend", skills.frontend],
              ["ai / agents", skills.ai],
              ["practices", skills.practices],
            ] as const
          ).map(([label, items]) => (
            <div key={label}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor-dim">
                {label}
              </h3>
              <p className="mt-2 font-mono text-sm leading-relaxed text-paper-dim">
                {items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── machine-readable ── */}
      <section className="pb-8" aria-labelledby="agents-heading">
        <SectionRule label="for ai agents" />
        <h2 id="agents-heading" className="sr-only">
          Machine-readable profile
        </h2>
        <p className="mt-6 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
          This site is readable by your agent, not just by you. Structured CV at{" "}
          <a href="/api/cv" className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor">
            /api/cv
          </a>
          , agent instructions at{" "}
          <a href="/llms.txt" className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor">
            /llms.txt
          </a>
          . I build MCP servers for a living; the least my portfolio can do is speak the protocol&apos;s
          language — plug it straight into your agent:
        </p>
        <pre className="mt-4 max-w-[58ch] overflow-x-auto border border-ink-line bg-ink-raise px-4 py-3 font-mono text-[13px] leading-relaxed text-paper">
          <span className="text-phosphor-dim">❯</span> npx -y alberto-mcp{"\n"}
          <span className="text-paper-dim">
            # MCP tools: get_profile · search_experience · get_case_study · get_contact
          </span>
        </pre>
      </section>
    </>
  );
}
