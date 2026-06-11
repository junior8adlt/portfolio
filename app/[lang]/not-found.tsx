import Link from "next/link";

/**
 * notFound() boundaries receive no params, so this page is bilingual by design —
 * fitting for a terminal: errors come in every locale.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-6 pt-24 pb-12">
      <p className="font-mono text-xs text-paper-dim">
        <span className="text-phosphor-dim">❯</span> cat {`{requested_path}`}
      </p>
      <h1 className="font-mono text-3xl font-semibold text-paper sm:text-4xl">
        404: <span className="text-alarm">file not found</span>
      </h1>
      <p className="max-w-[50ch] font-serif text-lg text-paper-dim">
        No case file at this path. Either the evidence was moved, or it never existed.
      </p>
      <p className="max-w-[50ch] font-serif text-lg italic text-paper-dim">
        No hay expediente en esta ruta. O la evidencia fue movida, o nunca existió.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/"
          className="border border-phosphor-dim px-5 py-2.5 font-mono text-sm text-phosphor transition-colors duration-150 hover:bg-phosphor hover:text-ink"
        >
          cd ~ →
        </Link>
        <Link
          href="/es"
          className="border border-ink-line px-5 py-2.5 font-mono text-sm text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
        >
          cd ~/es →
        </Link>
      </div>
    </div>
  );
}
