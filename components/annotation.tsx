export function Annotation({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-t border-b border-ink-line py-4 font-serif text-lg italic text-amber">
      <span className="mr-2 font-mono text-xs not-italic tracking-[0.2em] uppercase" aria-hidden="true">
        »
      </span>
      {children}
    </p>
  );
}
