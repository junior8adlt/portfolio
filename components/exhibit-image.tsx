import Image from "next/image";
import type { Visual } from "@/content/types";

/** Screenshot framed in a terminal window, captioned like a numbered exhibit. */
export function ExhibitImage({
  visual,
  letter,
  redactedLabel,
}: {
  visual: Visual;
  letter: string;
  redactedLabel: string;
}) {
  const tall = visual.height > visual.width;

  return (
    <figure className={tall ? "max-w-[320px]" : "w-full"}>
      <div className="overflow-hidden border border-ink-line bg-ink-raise">
        <div className="flex items-center gap-2 border-b border-ink-line px-3 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-ink-line bg-alarm/60" />
            <span className="h-2.5 w-2.5 rounded-full border border-ink-line bg-amber/60" />
            <span className="h-2.5 w-2.5 rounded-full border border-ink-line bg-phosphor-dim/60" />
          </span>
          <span className="truncate font-mono text-[11px] text-paper-dim">{visual.title}</span>
        </div>
        {visual.redacted ? (
          <div
            className="flex items-center justify-center bg-ink"
            style={{ aspectRatio: `${visual.width} / ${visual.height}` }}
          >
            <span className="border border-alarm px-4 py-2 font-mono text-sm uppercase tracking-[0.3em] text-alarm">
              {redactedLabel}
            </span>
          </div>
        ) : (
          <Image
            src={visual.src}
            alt={visual.caption}
            width={visual.width}
            height={visual.height}
            sizes={tall ? "(max-width: 640px) 80vw, 320px" : "(max-width: 1024px) 100vw, 1024px"}
            className="block w-full"
          />
        )}
      </div>
      <figcaption className="mt-2.5 max-w-[60ch] font-serif text-[15px] leading-relaxed text-paper-dim">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor">
          exhibit {letter}
        </span>
        {visual.caption}
      </figcaption>
    </figure>
  );
}
