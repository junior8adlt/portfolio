"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

/** Maps the current path to its twin in the other language. */
export function LangSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "/";
  const basePath = lang === "es" ? pathname.replace(/^\/es(?=\/|$)/, "") || "/" : pathname;
  const target: Lang = lang === "en" ? "es" : "en";
  const targetHref = target === "en" ? basePath : `/es${basePath === "/" ? "" : basePath}`;

  return (
    <Link
      href={targetHref}
      hrefLang={target}
      className="border border-ink-line px-2.5 py-2 font-mono text-xs uppercase text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor sm:py-1"
      aria-label={target === "es" ? "Cambiar a español" : "Switch to English"}
    >
      {target}
    </Link>
  );
}
