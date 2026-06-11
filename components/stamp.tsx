import type { Stamp as StampType } from "@/content/types";

const tones: Record<StampType, string> = {
  PRODUCTION: "border-phosphor-dim text-phosphor",
  LIVE: "border-phosphor-dim text-phosphor",
  MVP: "border-ink-line text-paper-dim",
  BETA: "border-ink-line text-paper-dim",
  NDA: "border-amber text-amber",
  CLIENT: "border-ink-line text-paper-dim",
  PERSONAL: "border-ink-line text-paper-dim",
  OSS: "border-ink-line text-paper-dim",
};

export function Stamp({ value }: { value: StampType }) {
  return (
    <span
      className={`inline-block border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${tones[value]}`}
    >
      {value}
    </span>
  );
}
