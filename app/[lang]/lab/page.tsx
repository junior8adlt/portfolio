import type { Metadata } from "next";
import { SectionRule } from "@/components/section-rule";
import { Stamp } from "@/components/stamp";
import { getLab } from "@/content/lab";
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
    title: ui.lab.metaTitle,
    description: ui.lab.metaDescription,
    alternates: langAlternates(lang, "/lab"),
  };
}

export default async function LabPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Lang;
  if (!isLang(lang)) return null;
  const ui = t(lang);
  const lab = getLab(lang);

  return (
    <div className="pt-12 pb-8 sm:pt-16">
      <p className="font-mono text-xs text-paper-dim">
        <span className="text-phosphor-dim">❯</span> {ui.lab.cmd}
      </p>
      <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        {ui.lab.title}
      </h1>
      <p className="mt-4 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
        {ui.lab.intro}
      </p>

      <div className="mt-12 space-y-14">
        {lab.map((entry) => (
          <section key={entry.slug} aria-labelledby={`lab-${entry.slug}`}>
            <SectionRule label={`${ui.lab.process} ${entry.index}`} tone="amber" />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h2
                id={`lab-${entry.slug}`}
                className="font-mono text-xl font-semibold tracking-tight text-paper"
              >
                {entry.name}
              </h2>
              {entry.stamps.map((s) => (
                <Stamp key={s} value={s} />
              ))}
            </div>
            <p className="mt-2 font-serif text-lg text-paper-dim">{entry.tagline}</p>
            <p className="mt-4 max-w-[64ch] font-serif text-[17px] leading-relaxed text-paper">
              {entry.detail}
            </p>
            <p className="mt-4 max-w-[64ch] border border-ink-line bg-ink-raise px-4 py-3 font-serif text-[15px] leading-relaxed text-paper-dim">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor">
                {ui.lab.highlight}
              </span>
              {entry.highlight}
            </p>
            <p className="mt-4 font-mono text-xs text-paper-dim">
              {ui.lab.stack}: <span className="text-paper">{entry.stack.join(" · ")}</span>
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
