"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/site";

interface Command {
  id: string;
  label: string;
  hint: string;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      { id: "home", label: "go: home", hint: "/", action: () => router.push("/") },
      { id: "work", label: "go: work — case files", hint: "/work", action: () => router.push("/work") },
      { id: "lab", label: "go: lab — experiments", hint: "/lab", action: () => router.push("/lab") },
      { id: "about", label: "go: about — profile + timeline", hint: "/about", action: () => router.push("/about") },
      { id: "email", label: "contact: email", hint: SITE.email, action: () => { window.location.href = `mailto:${SITE.email}`; } },
      { id: "linkedin", label: "open: linkedin", hint: "external", action: () => window.open(SITE.linkedin, "_blank", "noopener") },
      { id: "github", label: "open: github", hint: "external", action: () => window.open(SITE.github, "_blank", "noopener") },
      { id: "cv", label: "read: cv.json — machine-readable", hint: "/api/cv", action: () => router.push("/api/cv") },
    ],
    [router],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const run = (cmd: Command) => {
    close();
    cmd.action();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer border border-ink-line px-2 py-1 font-mono text-xs text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
        aria-label="Open command palette"
      >
        ⌘K
      </button>

      {open && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center bg-black/60 px-4 pt-[18vh]"
          onClick={close}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg border border-ink-line bg-ink-raise shadow-[0_0_40px_oklch(0.82_0.21_148/0.08)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
              <span className="font-mono text-sm text-phosphor" aria-hidden="true">
                ❯
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, filtered.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  }
                  if (e.key === "Enter" && filtered[active]) run(filtered[active]);
                }}
                placeholder="type a command…"
                className="w-full bg-transparent font-mono text-sm text-paper placeholder:text-paper-dim/50 focus:outline-none"
                aria-label="Search commands"
              />
              <kbd className="font-mono text-[10px] text-paper-dim">esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto py-1" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <li className="px-4 py-3 font-mono text-xs text-paper-dim">
                  command not found: {query}
                </li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left font-mono text-sm transition-colors duration-100 ${
                      i === active ? "bg-ink text-phosphor" : "text-paper"
                    }`}
                  >
                    <span>{cmd.label}</span>
                    <span className="text-[10px] text-paper-dim">{cmd.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
