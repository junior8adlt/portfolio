import type { Metadata } from "next";
import { SectionRule } from "@/components/section-rule";
import { getExperience } from "@/content/experience";
import { SITE } from "@/lib/site";
import { isLang, langAlternates, t, type Lang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const ui = t(lang);
  return {
    title: ui.about.metaTitle,
    description: ui.about.metaDescription,
    alternates: langAlternates(lang, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Lang;
  if (!isLang(lang)) return null;
  const ui = t(lang);
  const experience = getExperience(lang);
  const cvFile = lang === "es" ? "/cv-es.pdf" : "/cv.pdf";

  return (
    <div className="pt-12 pb-8 sm:pt-16">
      <p className="font-mono text-xs text-paper-dim">
        <span className="text-phosphor-dim">❯</span> {ui.about.cmd}
      </p>
      <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        Alberto Ochoa
      </h1>
      <p className="mt-2 font-mono text-sm text-phosphor">
        {ui.about.role} · {SITE.location}
      </p>

      <div className="mt-8 max-w-[64ch] space-y-5 font-serif text-lg leading-[1.65] text-paper">
        {ui.about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section className="mt-16" aria-labelledby="timeline">
        <SectionRule label={ui.about.timelineLabel} />
        <h2 id="timeline" className="sr-only">
          Timeline
        </h2>
        <ol className="mt-8 space-y-12">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-8">
              <p className="font-mono text-xs leading-6 text-paper-dim">{job.period}</p>
              <div>
                <h3 className="font-mono text-lg font-semibold text-paper">
                  {job.role} <span className="text-phosphor-dim">@ {job.company}</span>
                </h3>
                <p className="mt-2 max-w-[58ch] font-serif text-[17px] leading-relaxed text-paper-dim">
                  {job.summary}
                </p>
                <ul className="mt-3 space-y-2">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 font-serif text-[15px] leading-relaxed text-paper">
                      <span className="text-phosphor-dim" aria-hidden="true">
                        ▸
                      </span>
                      <span className="max-w-[56ch]">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="contact">
        <SectionRule label={ui.about.contactLabel} />
        <h2 id="contact" className="sr-only">
          {ui.about.contactLabel}
        </h2>
        <p className="mt-6 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
          {ui.about.contactText}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={`mailto:${SITE.email}`}
            className="border border-phosphor-dim px-5 py-2.5 font-mono text-sm text-phosphor transition-colors duration-150 hover:bg-phosphor hover:text-ink"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink-line px-5 py-2.5 font-mono text-sm text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
          >
            linkedin ↗
          </a>
          <a
            href={cvFile}
            target="_blank"
            rel="noopener"
            className="border border-ink-line px-5 py-2.5 font-mono text-sm text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
          >
            {ui.about.cvPdf}
          </a>
        </div>
      </section>
    </div>
  );
}
