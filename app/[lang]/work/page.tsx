import type { Metadata } from "next";
import { SectionRule } from "@/components/section-rule";
import { LedgerRow } from "@/components/ledger-row";
import { getWork } from "@/content/work";
import { href, isLang, langAlternates, t, type Lang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const ui = t(lang);
  return {
    title: ui.work.metaTitle,
    description: ui.work.metaDescription,
    alternates: langAlternates(lang, "/work"),
  };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Lang;
  if (!isLang(lang)) return null;
  const ui = t(lang);
  const work = getWork(lang);

  return (
    <div className="pt-12 pb-8 sm:pt-16">
      <p className="font-mono text-xs text-paper-dim">
        <span className="text-phosphor-dim">❯</span> {ui.work.cmd}
      </p>
      <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        {ui.work.title}
      </h1>
      <p className="mt-4 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
        {ui.work.intro}
      </p>

      <div className="mt-12">
        <SectionRule label={ui.work.filesLabel(work.length)} />
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
      </div>
    </div>
  );
}
