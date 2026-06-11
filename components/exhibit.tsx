import type { Exhibit as ExhibitType } from "@/content/types";

export function ExhibitList({ items, tone = "phosphor" }: { items: ExhibitType[]; tone?: "phosphor" | "amber" }) {
  return (
    <dl className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={item.metric} className="bg-ink px-5 py-4">
          <dt className="sr-only">Exhibit {i + 1}</dt>
          <dd>
            <span className="mr-2 font-mono text-[10px] text-paper-dim" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-mono text-base font-semibold tabular-nums ${
                tone === "amber" ? "text-amber" : "text-phosphor"
              }`}
            >
              {item.metric}
            </span>
            <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-paper-dim">
              {item.caption}
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
