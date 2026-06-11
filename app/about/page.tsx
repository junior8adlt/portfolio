import type { Metadata } from "next";
import { SectionRule } from "@/components/section-rule";
import { experience } from "@/content/experience";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — profile and timeline",
  description:
    "Senior full-stack engineer, 8+ years: .NET, React, SQL, NestJS — legacy modernization and AI tooling for US clients.",
};

export default function AboutPage() {
  return (
    <div className="pt-12 pb-8 sm:pt-16">
      <p className="font-mono text-xs text-paper-dim">
        <span className="text-phosphor-dim">❯</span> whoami --verbose
      </p>
      <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        Alberto Ochoa
      </h1>
      <p className="mt-2 font-mono text-sm text-phosphor">senior software engineer · {SITE.location}</p>

      <div className="mt-8 max-w-[64ch] space-y-5 font-serif text-lg leading-[1.65] text-paper">
        <p>
          I&apos;ve spent 8+ years shipping enterprise software across the full stack: SQL design
          and query optimization, .NET and Node APIs, React frontends. My specialty is the work
          most engineers avoid: taking undocumented legacy behavior, reverse-engineering it, and
          delivering a modern replacement that doesn&apos;t regress the business.
        </p>
        <p>
          The second pillar is AI tooling that earns its keep in production: custom MCP servers
          that automate release paperwork and ticket extraction, a forensic investigation
          methodology for production incidents, and agent experiments that stress-test what this
          tech can actually do.
        </p>
        <p>
          Computer Systems Engineering, Instituto Tecnológico Superior de Chapala. English fluent,
          Spanish native. I work daily with US teams.
        </p>
      </div>

      <section className="mt-16" aria-labelledby="timeline">
        <SectionRule label="timeline · git log --career" />
        <h2 id="timeline" className="sr-only">
          Experience
        </h2>
        <ol className="mt-8 space-y-12">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-8">
              <p className="font-mono text-xs leading-6 text-paper-dim">{job.period}</p>
              <div>
                <h3 className="font-mono text-lg font-semibold text-paper">
                  {job.role} <span className="text-phosphor-dim">@ {job.company}</span>
                </h3>
                <p className="mt-2 max-w-[58ch] font-serif text-[17px] leading-relaxed text-paper-dim">
                  {job.summary}
                </p>
                <ul className="mt-3 space-y-2">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 font-serif text-[15px] leading-relaxed text-paper">
                      <span className="text-phosphor-dim" aria-hidden="true">
                        ▸
                      </span>
                      <span className="max-w-[56ch]">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="contact">
        <SectionRule label="open channel" />
        <h2 id="contact" className="sr-only">
          Contact
        </h2>
        <p className="mt-6 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
          Open to senior full-stack roles and consulting with US teams.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={`mailto:${SITE.email}`}
            className="border border-phosphor-dim px-5 py-2.5 font-mono text-sm text-phosphor transition-colors duration-150 hover:bg-phosphor hover:text-ink"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink-line px-5 py-2.5 font-mono text-sm text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
          >
            linkedin ↗
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener"
            className="border border-ink-line px-5 py-2.5 font-mono text-sm text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
          >
            cv.pdf ↓
          </a>
        </div>
      </section>
    </div>
  );
}
