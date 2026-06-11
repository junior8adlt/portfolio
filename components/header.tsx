import Link from "next/link";
import { SITE } from "@/lib/site";
import { href, t, type Lang } from "@/lib/i18n";
import { CommandPalette } from "./command-palette";
import { LangSwitcher } from "./lang-switcher";
import { Scramble } from "./scramble";

export function Header({ lang }: { lang: Lang }) {
  const ui = t(lang);
  const nav = [
    { href: href(lang, "/work"), label: ui.nav.work },
    { href: href(lang, "/lab"), label: ui.nav.lab },
    { href: href(lang, "/blog"), label: ui.nav.blog },
    { href: href(lang, "/about"), label: ui.nav.about },
  ];

  return (
    <header
      className="sticky top-0 z-40 border-b border-ink-line bg-ink/90 backdrop-blur-sm"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
        <Link
          href={href(lang, "/")}
          className="shrink-0 font-mono text-sm text-phosphor glow transition-opacity duration-150 hover:opacity-80"
        >
          <span className="hidden md:inline">{SITE.handle}</span>
          <span className="md:hidden">a@o:~$</span>
        </Link>
        <nav aria-label={ui.a11y.main} className="flex min-w-0 items-center gap-3 sm:gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 font-mono text-xs text-paper-dim transition-colors duration-150 hover:text-phosphor sm:text-sm"
            >
              <span aria-hidden="true" className="hidden text-ink-line sm:inline">[</span>
              <Scramble text={item.label} />
              <span aria-hidden="true" className="hidden text-ink-line sm:inline">]</span>
            </Link>
          ))}
          <LangSwitcher lang={lang} />
          <CommandPalette lang={lang} />
        </nav>
      </div>
    </header>
  );
}
