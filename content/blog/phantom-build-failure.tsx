import { P, H2, Code, Term, Note, UL, LI } from "@/components/prose";

export const meta = {
  slug: "phantom-build-failure",
  title: "The phantom build failure: when a capital letter takes down your Next.js build",
  summary:
    "Every page of a fully static site failed to prerender with an invariant blaming Next.js itself. The framework was innocent. A forensic walkthrough of refuting the obvious suspects until a single character confessed.",
  date: "2026-06-11",
  readingMin: 6,
  tags: ["forensics", "next.js", "windows", "debugging"],
};

export default function Post() {
  return (
    <>
      <H2>symptom</H2>
      <P>
        A brand-new Next.js 16 site — fully static, no database, sixteen routes — compiled clean,
        type-checked clean, then died during prerender. Not one flaky page: every single one,
        including <Code>/_not-found</Code> and <Code>/_global-error</Code>, pages I never wrote.
      </P>
      <Term title="next build">
{`Error occurred prerendering page "/_not-found".
Error [InvariantError]: Invariant: Expected workStore
to be initialized. This is a bug in Next.js.`}
      </Term>
      <P>
        Note the last sentence. The error message itself testifies that the framework is at
        fault. Hold that thought, because the first rule of incident forensics is that
        confessions volunteered this early are usually misdirection.
      </P>

      <H2>evidence</H2>
      <UL>
        <LI>
          The dev server rendered all sixteen routes perfectly. Only the production build died.
        </LI>
        <LI>
          The failure was total, not partial: framework-generated pages failed alongside mine,
          which means the trigger sat below my application code.
        </LI>
        <LI>
          The failing chunk had the same content hash across every experiment that followed — a
          detail that seemed irrelevant until it wasn&apos;t.
        </LI>
      </UL>

      <H2>refutations</H2>
      <P>
        Data-first, refutation-required: every hypothesis earns a controlled experiment, and the
        experiment&apos;s job is to kill the hypothesis, not to flatter it.
      </P>
      <UL>
        <LI>
          <strong>“My code broke it.”</strong> Stashed everything and built the pristine{" "}
          <Code>create-next-app</Code> scaffold. It failed identically. My code was acquitted.
        </LI>
        <LI>
          <strong>“The Next.js version is buggy.”</strong> Downgraded a patch release. Identical
          failure, identical chunk hash.
        </LI>
        <LI>
          <strong>“The Node runtime is the problem.”</strong> The invariant smells like{" "}
          <Code>AsyncLocalStorage</Code> losing context, which is runtime territory. Switched
          from Node 20 to Node 24. Identical failure.
        </LI>
      </UL>
      <P>
        Three suspects interrogated, three alibis confirmed. When every reasonable explanation is
        refuted, the cause is something you have not yet thought to vary.
      </P>

      <H2>the tell</H2>
      <P>
        Next 16 still ships a webpack escape hatch. Same build through a different bundler — not
        because webpack would fix anything, but because a second witness describes the same crime
        differently. Webpack&apos;s testimony:
      </P>
      <Term title="next build --webpack">
{`There are multiple modules with names that only
differ in casing.
 * C:\\...\\Desktop\\Dev\\portfolio\\node_modules\\next\\...
 * C:\\...\\Desktop\\dev\\portfolio\\node_modules\\next\\...`}
      </Term>
      <P>
        There it is. <Code>Dev</Code> and <Code>dev</Code>. The folder on disk is capitalized;
        the shell session had been navigating with a lowercase path. Windows&apos; filesystem is
        case-insensitive, so both spellings resolve to the same bytes — but Node&apos;s module
        registry keys modules by path <em>string</em>, and strings are case-sensitive.
      </P>

      <H2>root cause</H2>
      <P>
        Every module imported through the lowercase path and the same module imported through the
        capitalized path became two separate instances. That includes the module holding
        Next.js&apos;s <Code>workAsyncStorage</Code> — the AsyncLocalStorage that carries render
        context. The build wrote the store into one copy and read it from the other. The read
        came back empty, and Next reported, with complete sincerity, a bug in itself.
      </P>
      <Note>
        The invariant was not lying; it was scoped wrong. It was a bug in Next.js&apos;s process —
        injected by a single character of my working directory.
      </Note>

      <H2>intervention</H2>
      <P>
        One line: <Code>Set-Location C:\...\Desktop\Dev\portfolio</Code> with the exact on-disk
        casing before building. Sixteen out of sixteen pages prerendered. Total cost of the
        defect: one capital letter. Total cost of finding it without a method: unbounded.
      </P>

      <H2>lessons</H2>
      <UL>
        <LI>
          Error messages assign blame by guessing. Treat “this is a bug in X” as a claim to
          verify, not a verdict to accept.
        </LI>
        <LI>
          Reproduce on a pristine baseline before touching your own code. It is the cheapest
          experiment with the highest information yield.
        </LI>
        <LI>
          When one tool is opaque, run the same operation through a sibling tool. Different
          failure renderings of the same fault triangulate the cause.
        </LI>
        <LI>
          Case-insensitive filesystems with case-sensitive runtimes are a standing hazard on
          Windows and macOS. If module-identity weirdness appears — duplicated singletons, lost
          context, double React — audit your path casing first.
        </LI>
      </UL>
    </>
  );
}
