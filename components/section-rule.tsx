export function SectionRule({
  label,
  tone = "phosphor",
}: {
  label: string;
  tone?: "phosphor" | "amber" | "alarm" | "dim";
}) {
  const color = {
    phosphor: "text-phosphor",
    amber: "text-amber",
    alarm: "text-alarm",
    dim: "text-paper-dim",
  }[tone];

  return (
    <div className={`flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase ${color}`} aria-hidden="false">
      <span className="select-none">──</span>
      <span>{label}</span>
      <span className="h-px flex-1 bg-ink-line" aria-hidden="true" />
    </div>
  );
}
