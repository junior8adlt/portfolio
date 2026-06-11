import type { Metadata } from "next";
import { SectionRule } from "@/components/section-rule";
import { LedgerRow } from "@/components/ledger-row";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Work — case files",
  description:
    "Forensic case studies: enterprise CRM modernization, a real-money betting platform, clinical software, and D2C ecommerce.",
};

export default function WorkPage() {
  return (
    <div className="pt-12 pb-8 sm:pt-16">
      <p className="font-mono text-xs text-paper-dim">
        <span className="text-phosphor-dim">❯</span> ls /work --format=case_file
      </p>
      <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        Case files
      </h1>
      <p className="mt-4 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
        Each entry follows the same forensic structure: situation, evidence, diagnosis,
        intervention, outcome. Claims come with numbers; the adjectives stay home.
      </p>

      <div className="mt-12">
        <SectionRule label={`${work.length} files on record`} />
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
      </div>
    </div>
  );
}
