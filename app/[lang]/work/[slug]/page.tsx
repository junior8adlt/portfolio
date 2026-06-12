import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionRule } from "@/components/section-rule";
import { Stamp } from "@/components/stamp";
import { ExhibitList } from "@/components/exhibit";
import { ExhibitImage } from "@/components/exhibit-image";
import { Annotation } from "@/components/annotation";
import { getWork, getCaseStudy } from "@/content/work";
import { href, isLang, langAlternates, LANGS, t, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => getWork(lang).map((w) => ({ lang, slug: w.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const cs = getCaseStudy(lang, slug);
  if (!cs) return {};
  return {
    title: `${cs.name} — ${t(lang).work.title} ${cs.index}`,
    description: cs.tagline,
    alternates: langAlternates(lang, `/work/${slug}`),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = raw as Lang;
  if (!isLang(lang)) notFound();
  const ui = t(lang);
  const work = getWork(lang);
  const cs = getCaseStudy(lang, slug);
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
          {cs.url && (
            <a
              href={cs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-phosphor underline decoration-phosphor-dim underline-offset-4 transition-colors duration-150 hover:decoration-phosphor"
            >
              {ui.work.visit}
            </a>
          )}
        </div>
        <ViewTransition name={`cs-${cs.slug}`} share="morph">
          <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-5xl">
            {cs.name}
          </h1>
        </ViewTransition>
        <p className="mt-4 max-w-[58ch] font-serif text-xl leading-relaxed text-paper-dim">
          {cs.tagline}
        </p>
        <p className="mt-6 font-mono text-xs leading-relaxed text-paper-dim">
          {ui.work.stack}: <span className="text-paper">{cs.stack.join(" · ")}</span>
        </p>
      </header>

      {/* situation */}
      <section className="mt-16" aria-labelledby="situation">
        <SectionRule label={ui.work.situation} />
        <h2 id="situation" className="sr-only">
          {ui.work.situation}
        </h2>
        <p className="mt-6 max-w-[68ch] font-serif text-lg leading-[1.65] text-paper">
          {cs.situation}
        </p>
      </section>

      {/* evidence */}
      <section className="mt-16" aria-labelledby="evidence">
        <SectionRule label={ui.work.evidence} />
        <h2 id="evidence" className="sr-only">
          {ui.work.evidence}
        </h2>
        <div className="mt-6">
          <ExhibitList items={cs.evidence} />
        </div>
      </section>

      {/* visual evidence */}
      {cs.visuals && cs.visuals.length > 0 && (
        <section className="mt-16" aria-labelledby="visual-evidence">
          <SectionRule label={ui.work.visualEvidence} />
          <h2 id="visual-evidence" className="sr-only">
            {ui.work.visualEvidence}
          </h2>
          <div className="mt-6 flex flex-wrap items-start gap-8">
            {cs.visuals.map((v, i) => (
              <ExhibitImage
                key={v.src}
                visual={v}
                letter={String.fromCharCode(65 + i)}
                redactedLabel={ui.work.redacted}
              />
            ))}
          </div>
        </section>
      )}

      {/* diagnosis */}
      <section className="mt-16" aria-labelledby="diagnosis">
        <SectionRule label={ui.work.diagnosis} tone="amber" />
        <h2 id="diagnosis" className="sr-only">
          {ui.work.diagnosis}
        </h2>
        <p className="mt-6 max-w-[68ch] font-serif text-lg leading-[1.65] text-paper">
          {cs.diagnosis}
        </p>
      </section>

      {/* intervention */}
      <section className="mt-16" aria-labelledby="intervention">
        <SectionRule label={ui.work.intervention} />
        <h2 id="intervention" className="sr-only">
          {ui.work.intervention}
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
        <SectionRule label={ui.work.outcome} />
        <h2 id="outcome" className="sr-only">
          {ui.work.outcome}
        </h2>
        <div className="mt-6">
          <ExhibitList items={cs.outcome} />
        </div>
      </section>

      {/* examiner's note */}
      {cs.annotation && (
        <section className="mt-16" aria-label={ui.work.examinerNote}>
          <Annotation>{cs.annotation}</Annotation>
        </section>
      )}

      {/* next file */}
      <nav className="mt-20 border-t border-ink-line pt-6" aria-label={ui.work.nextFile}>
        <Link
          href={href(lang, `/work/${next.slug}`)}
          className="group flex items-baseline justify-between gap-4 py-2 font-mono text-sm"
        >
          <span className="text-paper-dim">{ui.work.nextFile}</span>
          <span className="text-paper transition-colors duration-150 group-hover:text-phosphor">
            [{next.index}] {next.name} →
          </span>
        </Link>
      </nav>
    </article>
  );
}
