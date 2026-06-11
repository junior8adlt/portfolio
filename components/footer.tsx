import { SITE } from "@/lib/site";
import { t, type Lang } from "@/lib/i18n";

export function Footer({ lang }: { lang: Lang }) {
  const ui = t(lang);
  return (
    <footer className="mt-24 border-t border-ink-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 font-mono text-xs text-paper-dim sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="text-phosphor" aria-hidden="true">●</span> {ui.footer.session} ·{" "}
          {SITE.location}
        </p>
        <nav aria-label="Contact" className="flex flex-wrap gap-4">
          <a
            href={`mailto:${SITE.email}`}
            className="py-2 transition-colors duration-150 hover:text-phosphor"
          >
            email
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 transition-colors duration-150 hover:text-phosphor"
          >
            linkedin ↗
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 transition-colors duration-150 hover:text-phosphor"
          >
            github ↗
          </a>
          <a href="/llms.txt" className="py-2 transition-colors duration-150 hover:text-phosphor">
            llms.txt
          </a>
        </nav>
      </div>
    </footer>
  );
}
