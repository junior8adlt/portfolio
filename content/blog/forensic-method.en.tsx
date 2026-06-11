import Link from "next/link";
import { P, H2, Note, UL, LI } from "@/components/prose";

export const meta = {
  slug: "forensic-method",
  title: "The forensic method: six phases for production incidents",
  summary:
    "Production debugging fails when it runs on intuition: the loudest hypothesis wins and the evidence evaporates. This is the six-phase method I use instead — data before theories, and no hypothesis survives without surviving an attempt to kill it.",
  date: "2026-06-11",
  readingMin: 8,
  tags: ["forensics", "incident-response", "methodology", "debugging"],
};

function Phase({
  n,
  name,
  question,
  children,
  exit,
}: {
  n: number;
  name: string;
  question: string;
  children: React.ReactNode;
  exit: string;
}) {
  return (
    <section className="mt-10 max-w-[68ch] border border-ink-line">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-ink-line bg-ink-raise px-5 py-3">
        <span className="font-mono text-xs text-phosphor-dim">phase {String(n).padStart(2, "0")}</span>
        <h3 className="font-mono text-base font-semibold text-paper">{name}</h3>
        <span className="font-serif text-[15px] italic text-paper-dim">{question}</span>
      </header>
      <div className="px-5 pb-5 [&>p]:max-w-none [&>ul]:max-w-none">{children}</div>
      <footer className="border-t border-ink-line px-5 py-3 font-mono text-xs text-amber">
        exit criteria: {exit}
      </footer>
    </section>
  );
}

export default function Post() {
  return (
    <>
      <P>
        Most production debugging is conducted like a séance. Someone senior names a suspect in
        the first five minutes, everyone starts looking for evidence that confirms it, and the
        artifacts that could have proven them wrong get destroyed by the first well-intentioned
        restart. When the incident closes, nothing is written down, so the same séance reconvenes
        three months later.
      </P>
      <P>
        After enough of those, I formalized what I actually do when it works. Six phases, two
        non-negotiable principles. I have used this on enterprise production incidents, on
        personal projects, and on{" "}
        <Link
          href="/blog/phantom-build-failure"
          className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor"
        >
          a build failure caused by a single capital letter
        </Link>
        . The method is the same at every scale; only the stakes change.
      </P>

      <H2>the two principles</H2>
      <UL>
        <LI>
          <strong>Data first.</strong> No theories until the evidence is collected. The order
          matters because theories contaminate collection: once you believe it&apos;s the cache,
          you only look at the cache.
        </LI>
        <LI>
          <strong>Refutation required.</strong> You do not gather support for a hypothesis; you
          design the experiment that would kill it. A hypothesis is only allowed to survive by
          surviving. Confirmation feels faster and is how teams burn a day on the wrong suspect.
        </LI>
      </UL>

      <H2>the six phases</H2>

      <Phase
        n={1}
        name="preserve the scene"
        question="what will stop being true in an hour?"
        exit="volatile evidence captured; nothing destructive has run"
      >
        <P>
          Before anything else, capture what rots: exact error text, timestamps, log windows,
          process state, versions deployed, recent changes, who is affected and since when.
          Restarting a service is destroying a crime scene; sometimes you must (mitigation
          outranks diagnosis when users are bleeding), but do it knowingly and screenshot first.
          The instinct this phase fights: the reflexive restart that &quot;fixes&quot; it and
          guarantees a rerun next week.
        </P>
      </Phase>

      <Phase
        n={2}
        name="define the symptom"
        question="what exactly is failing, for whom, since when?"
        exit="a falsifiable one-sentence symptom statement"
      >
        <P>
          Convert &quot;it&apos;s broken&quot; into a statement precise enough to be wrong:{" "}
          <em>expected X, observed Y, scope Z, first seen T</em>. Half of all incidents change
          shape in this phase — the report says &quot;the API is down&quot; and the symptom turns
          out to be &quot;one endpoint times out for accounts with more than 10k rows.&quot; If
          you cannot state when it last worked, finding that out becomes the first task.
        </P>
      </Phase>

      <Phase
        n={3}
        name="collect before theorizing"
        question="what does the system say happened?"
        exit="a timeline of facts, each with a source"
      >
        <P>
          Now the data: logs, query plans, traces, diffs of everything that changed near T-zero
          (deploys, config, data, dependencies, infrastructure). Build a timeline where every
          entry cites its source. Facts only — &quot;response time tripled at 14:02&quot;
          qualifies, &quot;the new release broke it&quot; does not, because that is a theory
          wearing a fact&apos;s clothes.
        </P>
      </Phase>

      <Phase
        n={4}
        name="the hypothesis ledger"
        question="what could explain this, and what would kill each candidate?"
        exit="every open hypothesis has survived a designed refutation"
      >
        <P>
          Enumerate every explanation consistent with the timeline, including the unflattering
          ones. For each, design the cheapest experiment that would <em>disprove</em> it, then
          run them cheapest-first. The pristine-baseline test belongs here: reproduce on a clean
          environment before suspecting your own code. Record kills in the ledger — a refuted
          hypothesis is paid-for knowledge, and the ledger is what stops the team from
          re-investigating it at 2am.
        </P>
      </Phase>

      <Phase
        n={5}
        name="convict the cause"
        question="can you switch the failure on and off?"
        exit="cause demonstrated in both directions, or explicitly downgraded to 'best supported'"
      >
        <P>
          The surviving hypothesis still has to earn a conviction: reintroduce the cause and the
          failure must return; remove it and the failure must vanish. Where you can, get a second
          witness — a different tool observing the same fault tells you which parts of the story
          are real. In the capital-letter incident, webpack was the second witness that made
          Turbopack&apos;s vague invariant confess. If bidirectional proof is impossible (it
          happens: unreproducible data races, third-party black boxes), say so in the report
          instead of upgrading suspicion to fact.
        </P>
      </Phase>

      <Phase
        n={6}
        name="intervene and write the autopsy"
        question="what prevents the rerun?"
        exit="minimal fix shipped, regression guard in place, report written"
      >
        <P>
          The fix should be as small as the conviction allows — large &quot;while we&apos;re in
          here&quot; fixes smuggle new suspects into the next incident. Add the guard that makes
          the regression loud (test, alert, invariant, lint rule), then write the autopsy:
          symptom, timeline, ledger with kills, conviction evidence, fix, guard. Twenty minutes
          of writing converts the incident from tribal memory into infrastructure. It is also,
          not incidentally, how this blog gets its material.
        </P>
      </Phase>

      <H2>why the order is the method</H2>
      <P>
        Nothing in the six phases is exotic; every senior engineer does each piece sometimes. The
        discipline is the sequence. Evidence before theories (1–3) keeps collection honest.
        Refutation before conviction (4–5) keeps the loudest voice in the room from deciding the
        outcome. Writing before closing (6) keeps the organization from paying for the same
        lesson twice.
      </P>
      <Note>
        Under pressure you do not rise to your insight; you fall back on your procedure. Make the
        procedure one that cannot fool itself.
      </Note>
    </>
  );
}
