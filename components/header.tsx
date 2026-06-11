import Link from "next/link";
import { SITE } from "@/lib/site";
import { CommandPalette } from "./command-palette";
import { Scramble } from "./scramble";

const nav = [
  { href: "/work", label: "work" },
  { href: "/lab", label: "lab" },
  { href: "/about", label: "about" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm text-phosphor glow transition-opacity duration-150 hover:opacity-80"
        >
          {SITE.handle}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 font-mono text-sm text-paper-dim transition-colors duration-150 hover:text-phosphor"
            >
              <span aria-hidden="true" className="text-ink-line">[</span>
              <Scramble text={item.label} />
              <span aria-hidden="true" className="text-ink-line">]</span>
            </Link>
          ))}
          <span className="hidden sm:block">
            <CommandPalette />
          </span>
        </nav>
      </div>
    </header>
  );
}
