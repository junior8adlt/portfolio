import Link from "next/link";
import { SectionRule } from "@/components/section-rule";
import { LedgerRow } from "@/components/ledger-row";
import { getWork } from "@/content/work";
import { getLab } from "@/content/lab";
import { skills } from "@/content/experience";
import { SITE } from "@/lib/site";
import { href, isLang, t, type Lang } from "@/lib/i18n";

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

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Lang;
  if (!isLang(lang)) return null;
  const ui = t(lang);
  const work = getWork(lang);
  const lab = getLab(lang);

  return (
    <>
      {/* ── boot sequence hero ── */}
      <section className="pt-16 pb-20 sm:pt-24" aria-label="Introduction">
        <div className="space-y-1.5 font-mono text-xs text-paper-dim sm:text-sm">
          <BootLine delay={0}>
            <span className="text-phosphor-dim">❯</span> {ui.home.boot1a}{" "}
            <span className="text-paper">alberto_ochoa.log</span>
          </BootLine>
          <BootLine delay={120}>
            <span className="text-phosphor-dim">❯</span> {ui.home.boot2a}{" "}
            <span className="text-paper">{ui.home.boot2b}</span>
          </BootLine>
          <BootLine delay={240}>
            <span className="text-phosphor-dim">❯</span> {ui.home.boot3a}{" "}
            <span className="text-paper">{ui.home.boot3b}</span>{" "}
            <span className="text-phosphor">[OK]</span>
          </BootLine>
        </div>

        <BootLine delay={450}>
          <h1 className="caret mt-10 max-w-[24ch] font-mono text-3xl font-semibold leading-tight tracking-tight text-paper sm:text-5xl">
            {ui.home.h1a}
            <span className="text-phosphor glow">{ui.home.h1Accent}</span>.
          </h1>
        </BootLine>

        <BootLine delay={700}>
          <p className="mt-8 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
            {ui.home.sub}
          </p>
        </BootLine>

        <BootLine delay={850} className="mt-10 flex flex-wrap gap-4">
          <Link
            href={href(lang, "/work")}
            className="border border-phosphor-dim px-5 py-2.5 font-mono text-sm text-phosphor transition-colors duration-150 hover:bg-phosphor hover:text-ink"
          >
            {ui.home.ctaWork}
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="border border-ink-line px-5 py-2.5 font-mono text-sm text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
          >
            {ui.home.ctaContact}
          </a>
        </BootLine>
      </section>

      {/* ── featured case files ── */}
      <section className="pb-20" aria-labelledby="evidence-heading">
        <SectionRule label={ui.home.evidenceLabel} />
        <h2 id="evidence-heading" className="sr-only">
          {ui.work.title}
        </h2>
        <div className="mt-4">
          {work.map((w) => (
            <LedgerRow
              key={w.slug}
              href={href(lang, `/work/${w.slug}`)}
              index={w.index}
              name={w.name}
              tagline={w.tagline}
              keyMetric={w.keyMetric}
              stamps={w.stamps}
              morphName={`cs-${w.slug}`}
            />
          ))}
        </div>
      </section>

      {/* ── lab preview ── */}
      <section className="pb-20" aria-labelledby="lab-heading">
        <SectionRule label={ui.home.labLabel} tone="amber" />
        <h2 id="lab-heading" className="sr-only">
          {ui.lab.title}
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
          href={href(lang, "/lab")}
          className="mt-6 inline-block py-2 font-mono text-sm text-paper-dim transition-colors duration-150 hover:text-phosphor"
        >
          {ui.home.labLink}
        </Link>
      </section>

      {/* ── toolchain ── */}
      <section className="pb-20" aria-labelledby="stack-heading">
        <SectionRule label={ui.home.stackLabel} tone="dim" />
        <h2 id="stack-heading" className="sr-only">
          {ui.home.stackLabel}
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {(
            [
              [ui.home.skillGroups.backend, skills.backend],
              [ui.home.skillGroups.frontend, skills.frontend],
              [ui.home.skillGroups.ai, skills.ai],
              [ui.home.skillGroups.practices, skills.practices],
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
        <SectionRule label={ui.home.agentsLabel} />
        <h2 id="agents-heading" className="sr-only">
          {ui.home.agentsLabel}
        </h2>
        <p className="mt-6 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
          {ui.home.agentsText1}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- JSON route handler, not a page */}
          <a href="/api/cv" className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor">
            /api/cv
          </a>
          {ui.home.agentsText2}
          <a href="/llms.txt" className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor">
            /llms.txt
          </a>
          {ui.home.agentsText3}
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
