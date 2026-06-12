import Link from "next/link";
import { P, H2, Code, Term, Note, UL, LI } from "@/components/prose";
import { ZombieSim } from "@/components/zombie-sim";

export const meta = {
  slug: "zombie-on-port-3000",
  title: "The zombie on port 3000: a restart that never happened",
  summary:
    "A green build, a freshly 'restarted' server, and every route answering 404. Nobody had broken anything — we were just interrogating a corpse. A short forensic on orphaned processes, and why 'I restarted it' is a claim that needs evidence.",
  date: "2026-06-11",
  readingMin: 4,
  tags: ["forensics", "node.js", "local-dev", "debugging"],
};

export default function Post() {
  return (
    <>
      <H2>symptom</H2>
      <P>
        Local production server, minutes after a clean build: every route — pages that existed,
        pages that didn&apos;t, even image routes — answered 404. The server log repeated one
        line, unhelpfully:
      </P>
      <Term title="next start (log)">
{`✓ Ready in 154ms
Error: Internal: NoFallbackError
Error: Internal: NoFallbackError
Error: Internal: NoFallbackError`}
      </Term>
      <P>
        The same commit was serving production flawlessly at that exact moment. So the code was
        innocent, the build was innocent, and yet localhost was a wall of 404s. When the same
        artifact behaves differently in two places, stop reading the artifact and start reading
        the <em>processes</em>.
      </P>

      <H2>evidence</H2>
      <UL>
        <LI>
          The server had been &quot;restarted&quot; moments earlier — its supervisor had even
          reported the old one as dead.
        </LI>
        <LI>
          Between the old start and the failure, the <Code>.next</Code> build directory had been
          deleted and rebuilt twice — while something was still holding it.
        </LI>
        <LI>
          The smoking gun arrived when the &quot;new&quot; server&apos;s log was finally read end
          to end:
        </LI>
      </UL>
      <Term title="the 'restarted' server's log">
{`Error: listen EADDRINUSE: address already in use :::3000
  code: 'EADDRINUSE',
  syscall: 'listen',
  port: 3000`}
      </Term>

      <H2>root cause</H2>
      <P>
        The restart never happened. The old Node process had outlived its supervisor — the task
        wrapper died, the process didn&apos;t — and kept squatting on port 3000. Every
        &quot;new&quot; server since then was born, found the port taken, printed{" "}
        <Code>EADDRINUSE</Code> into a log nobody read, and exited. Meanwhile the squatter had
        had its <Code>.next</Code> directory rebuilt underneath it twice: its in-memory route
        manifests pointed at files that no longer existed, which Next surfaces as{" "}
        <Code>NoFallbackError</Code> and a 404 for absolutely everything.
      </P>
      <P>
        A zombie: dead to its supervisor, alive to the operating system, and answering requests
        with the routing table of a build that had been deleted half an hour earlier.
      </P>

      <H2>the crime scene, reenacted</H2>
      <P>
        Words only carry so far. Below is the incident itself, undead and interactive: try to
        restart the server and watch the lie happen in real time. The zombie only goes down one
        way.
      </P>
      <ZombieSim lang="en" />

      <H2>intervention</H2>
      <P>
        Ask the OS — the only witness that doesn&apos;t lie about processes — who actually owns
        the port, kill that PID, and start clean:
      </P>
      <Term title="powershell">
{`Get-NetTCPConnection -LocalPort 3000 -State Listen
  | Select -Expand OwningProcess | Stop-Process -Force
npm run start   # binds, serves 200s`}
      </Term>

      <H2>lessons</H2>
      <UL>
        <LI>
          <strong>&quot;Restarted&quot; is a claim, not a fact.</strong> The proof is the port
          owner&apos;s PID changing — not the supervisor&apos;s report, not the absence of an
          error you didn&apos;t scroll down to see.
        </LI>
        <LI>
          Never rebuild artifacts underneath a live process. A server reading <Code>.next</Code>{" "}
          while you replace it enters a state nobody tested: not the old build, not the new one,
          but a chimera of both.
        </LI>
        <LI>
          Supervisors and task managers track their children, not the truth. Processes get
          orphaned; the OS port table is the source of record.
        </LI>
        <LI>
          This is the quiet cousin of{" "}
          <Link
            href="/blog/navigation-that-secretly-reloaded"
            className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor"
          >
            the bug that worked
          </Link>
          : the zombie didn&apos;t crash, didn&apos;t scream, didn&apos;t die. It just kept
          politely answering 404 — and the error that explained everything was sitting unread in
          the log of a process that lived for two seconds.
        </LI>
      </UL>
      <Note>
        The most dangerous line in a log is the one printed by a process you believe is running —
        but was written by one that already failed to start.
      </Note>
    </>
  );
}
