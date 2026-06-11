import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionRule } from "@/components/section-rule";
import { Stamp } from "@/components/stamp";
import { ExhibitList } from "@/components/exhibit";
import { Annotation } from "@/components/annotation";
import { work, getCaseStudy } from "@/content/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.name} — case file ${cs.index}`,
    description: cs.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const next = work[(work.findIndex((w) => w.slug === cs.slug) + 1) % work.length];

  return (
    <article className="pt-12 pb-8 sm:pt-16">
      {/* file header */}
      <header>
        <p className="font-mono text-xs text-paper-dim">
          <span className="text-phosphor-dim">❯</span> cat /work/{cs.slug}.case
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-phosphor-dim">[{cs.index}]</span>
          {cs.stamps.map((s) => (
            <Stamp key={s} value={s} />
          ))}
          <span className="font-mono text-xs text-paper-dim">{cs.period}</span>
        </div>
        <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-5xl">
          {cs.name}
        </h1>
        <p className="mt-4 max-w-[58ch] font-serif text-xl leading-relaxed text-paper-dim">
          {cs.tagline}
        </p>
        <p className="mt-6 font-mono text-xs leading-relaxed text-paper-dim">
          stack: <span className="text-paper">{cs.stack.join(" · ")}</span>
        </p>
      </header>

      {/* situation */}
      <section className="mt-16" aria-labelledby="situation">
        <SectionRule label="situation" />
        <h2 id="situation" className="sr-only">
          Situation
        </h2>
        <p className="mt-6 max-w-[68ch] font-serif text-lg leading-[1.65] text-paper">
          {cs.situation}
        </p>
      </section>

      {/* evidence */}
      <section className="mt-16" aria-labelledby="evidence">
        <SectionRule label="evidence" />
        <h2 id="evidence" className="sr-only">
          Evidence
        </h2>
        <div className="mt-6">
          <ExhibitList items={cs.evidence} />
        </div>
      </section>

      {/* diagnosis */}
      <section className="mt-16" aria-labelledby="diagnosis">
        <SectionRule label="diagnosis" tone="amber" />
        <h2 id="diagnosis" className="sr-only">
          Diagnosis
        </h2>
        <p className="mt-6 max-w-[68ch] font-serif text-lg leading-[1.65] text-paper">
          {cs.diagnosis}
        </p>
      </section>

      {/* intervention */}
      <section className="mt-16" aria-labelledby="intervention">
        <SectionRule label="intervention" />
        <h2 id="intervention" className="sr-only">
          Intervention
        </h2>
        <ol className="mt-6 space-y-4">
          {cs.intervention.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 font-mono text-xs leading-7 text-phosphor-dim tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[64ch] font-serif text-[17px] leading-relaxed text-paper">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* outcome */}
      <section className="mt-16" aria-labelledby="outcome">
        <SectionRule label="outcome · verified" />
        <h2 id="outcome" className="sr-only">
          Outcome
        </h2>
        <div className="mt-6">
          <ExhibitList items={cs.outcome} />
        </div>
      </section>

      {/* examiner's note */}
      {cs.annotation && (
        <section className="mt-16" aria-label="Examiner's note">
          <Annotation>{cs.annotation}</Annotation>
        </section>
      )}

      {/* next file */}
      <nav className="mt-20 border-t border-ink-line pt-6" aria-label="Next case file">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-baseline justify-between gap-4 py-2 font-mono text-sm"
        >
          <span className="text-paper-dim">next file</span>
          <span className="text-paper transition-colors duration-150 group-hover:text-phosphor">
            [{next.index}] {next.name} →
          </span>
        </Link>
      </nav>
    </article>
  );
}
