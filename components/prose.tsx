/** Typography primitives for blog posts — forensic register. */

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 max-w-[68ch] font-serif text-[17px] leading-[1.7] text-paper">{children}</p>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-phosphor">
      <span aria-hidden="true">──</span>
      {children}
      <span className="h-px flex-1 bg-ink-line" aria-hidden="true" />
    </h2>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-none border border-ink-line bg-ink-raise px-1.5 py-0.5 font-mono text-[0.85em] text-amber">
      {children}
    </code>
  );
}

export function Term({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <figure className="mt-6 max-w-[72ch] border border-ink-line bg-ink-raise">
      {title && (
        <figcaption className="border-b border-ink-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
          {title}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-paper">
        {children}
      </pre>
    </figure>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-[68ch] border-t border-b border-ink-line py-4 font-serif text-lg italic leading-relaxed text-amber">
      {children}
    </p>
  );
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="mt-5 max-w-[68ch] space-y-2.5">{children}</ul>;
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 font-serif text-[17px] leading-relaxed text-paper">
      <span className="text-phosphor-dim" aria-hidden="true">
        ▸
      </span>
      <span>{children}</span>
    </li>
  );
}
