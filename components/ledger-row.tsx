import { ViewTransition } from "react";
import Link from "next/link";
import { Stamp } from "./stamp";
import type { Stamp as StampType } from "@/content/types";

export function LedgerRow({
  href,
  index,
  name,
  tagline,
  keyMetric,
  stamps,
  morphName,
}: {
  href?: string;
  index: string;
  name: string;
  tagline: string;
  keyMetric: string;
  stamps: StampType[];
  /** shared view-transition name to morph this title into the detail page h1 */
  morphName?: string;
}) {
  const title = (
    <h3 className="font-mono text-lg font-semibold tracking-tight text-paper transition-colors duration-150 group-hover:text-phosphor">
      {name}
    </h3>
  );

  const body = (
    <div className="sweep grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-ink-line px-2 py-5 transition-colors duration-200 sm:grid-cols-[auto_1fr_auto] sm:items-baseline group-hover:bg-ink-raise">
      <span className="font-mono text-xs text-phosphor-dim" aria-hidden="true">
        [{index}]
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {morphName ? (
            <ViewTransition name={morphName} share="morph">
              {title}
            </ViewTransition>
          ) : (
            title
          )}
          {stamps.map((s) => (
            <Stamp key={s} value={s} />
          ))}
        </div>
        <p className="mt-1 max-w-[60ch] font-serif text-base text-paper-dim">{tagline}</p>
      </div>
      <span className="col-start-2 font-mono text-xs text-amber sm:col-start-3 sm:text-right">
        {keyMetric}
      </span>
    </div>
  );

  if (!href) return <div className="group">{body}</div>;

  return (
    <Link href={href} className="group block focus-visible:bg-ink-raise">
      {body}
    </Link>
  );
}
