"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SITE } from "@/lib/site";
import { href, t, type Lang } from "@/lib/i18n";

interface Command {
  id: string;
  label: string;
  hint: string;
  action: () => void;
}

export function CommandPalette({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const ui = t(lang);

  const commands = useMemo<Command[]>(() => {
    const basePath = lang === "es" ? pathname.replace(/^\/es(?=\/|$)/, "") || "/" : pathname;
    const other: Lang = lang === "en" ? "es" : "en";
    const cvFile = lang === "es" ? "/cv-es.pdf" : "/cv.pdf";
    return [
      { id: "home", label: ui.palette.home, hint: href(lang, "/"), action: () => router.push(href(lang, "/")) },
      { id: "work", label: ui.palette.work, hint: href(lang, "/work"), action: () => router.push(href(lang, "/work")) },
      { id: "lab", label: ui.palette.lab, hint: href(lang, "/lab"), action: () => router.push(href(lang, "/lab")) },
      { id: "blog", label: ui.palette.blog, hint: href(lang, "/blog"), action: () => router.push(href(lang, "/blog")) },
      { id: "about", label: ui.palette.about, hint: href(lang, "/about"), action: () => router.push(href(lang, "/about")) },
      { id: "lang", label: ui.palette.switchLang, hint: href(other, basePath), action: () => router.push(href(other, basePath)) },
      { id: "email", label: ui.palette.email, hint: SITE.email, action: () => { window.location.href = `mailto:${SITE.email}`; } },
      { id: "linkedin", label: ui.palette.linkedin, hint: "external", action: () => window.open(SITE.linkedin, "_blank", "noopener") },
      { id: "github", label: ui.palette.github, hint: "external", action: () => window.open(SITE.github, "_blank", "noopener") },
      { id: "cv", label: ui.palette.cvJson, hint: "/api/cv", action: () => router.push("/api/cv") },
      { id: "cvpdf", label: ui.palette.cvPdf, hint: cvFile, action: () => window.open(cvFile, "_blank", "noopener") },
    ];
  }, [router, lang, pathname, ui]);

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
        className="cursor-pointer border border-ink-line px-2.5 py-2 font-mono text-xs text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor sm:py-1"
        aria-label={ui.a11y.openPalette}
      >
        <span className="hidden sm:inline">⌘K</span>
        <span aria-hidden="true" className="sm:hidden">❯_</span>
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
                placeholder={ui.palette.placeholder}
                className="w-full bg-transparent font-mono text-sm text-paper placeholder:text-paper-dim/50 focus:outline-none"
                aria-label="Search commands"
              />
              <kbd className="font-mono text-[10px] text-paper-dim">esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto py-1" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <li className="px-4 py-3 font-mono text-xs text-paper-dim">
                  {ui.palette.notFound} {query}
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
