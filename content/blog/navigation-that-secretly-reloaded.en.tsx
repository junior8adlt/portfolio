import Link from "next/link";
import { P, H2, Code, Term, Note, UL, LI } from "@/components/prose";

export const meta = {
  slug: "navigation-that-secretly-reloaded",
  title: "The navigation that secretly reloaded: a Vercel RSC forensic",
  summary:
    "Every page worked, every link navigated, and every single client-side navigation was quietly failing with a 404. A forensic on the gap between 'it works' and 'it does what you built' — and on bugs that only exist in production's body, never on your machine.",
  date: "2026-06-11",
  readingMin: 7,
  tags: ["forensics", "next.js", "vercel", "rsc"],
};

export default function Post() {
  return (
    <>
      <H2>symptom</H2>
      <P>
        This site had just shipped view transitions: navigate between pages and titles morph,
        content crossfades, no flash. It looked great locally. It looked great in production
        too — until the network tab told a different story:
      </P>
      <Term title="devtools · network">
{`GET /about?_rsc=6uX5vha9H4xuNaaV     404
GET /work?_rsc=6uX5vha9H4xuNaaV      404
GET /blog/forensic-method?_rsc=...   404
GET /?_rsc=6uX5vha9H4xuNaaV          404`}
      </Term>
      <P>
        Those <Code>?_rsc=</Code> requests are React Server Component payloads: what the Next.js
        router fetches to navigate client-side instead of reloading the document. All of them
        were 404ing. And yet the site navigated fine. That contradiction is the actual symptom:
        when a failing request doesn&apos;t produce a failing experience, something is silently
        absorbing the failure.
      </P>
      <P>
        The absorber is the router&apos;s fallback: when an RSC fetch fails, Next.js gives up on
        soft navigation and performs a full document load. Every click on the site was a
        disguised page reload. The pages rendered, the links worked — and the view transitions I
        had just shipped never ran for a single visitor, because they only exist on soft
        navigations.
      </P>

      <H2>evidence</H2>
      <P>
        One detail before the experiments: this site serves English unprefixed and Spanish under{" "}
        <Code>/es</Code>, implemented with a rewrite that maps <Code>/work</Code> to the
        prerendered <Code>/en/work</Code>. Keep that in mind. Now, isolate the variables:
      </P>
      <Term title="reproduction">
{`curl /about                          -> 200   document, fine
curl -H "RSC: 1" /about?_rsc=test    -> 404   payload, dead
curl -H "RSC: 1" /es/about?_rsc=test -> 200   payload, fine (!)
curl -H "RSC: 1" /?_rsc=test         -> 200   payload, fine (!)`}
      </Term>
      <P>
        The pattern is the confession: Spanish routes (real paths, no rewrite involved) serve
        their payloads. Unprefixed English routes (which only exist via the rewrite) do not. The
        bug lives in the interaction between RSC requests and the locale rewrite. One more
        experiment to find the mechanism:
      </P>
      <Term title="mechanism">
{`curl /work.rsc     -> 404
curl /es/work.rsc  -> 200
curl /index.rsc    -> 200`}
      </Term>
      <P>
        There it is. On Vercel, prerendered RSC payloads are materialized as real files with a{" "}
        <Code>.rsc</Code> suffix, and navigation requests are resolved against those paths. My
        rewrite had a guard excluding any path containing a dot — the standard trick to keep
        static files like <Code>cv.pdf</Code> out of the locale mapping. <Code>/work.rsc</Code>{" "}
        contains a dot. The rewrite politely stepped aside, and the platform answered 404.
      </P>

      <H2>why local never saw it</H2>
      <P>
        The site had been smoke-tested locally against a production build: every route, both
        languages, transitions visibly working. None of it caught this, because the{" "}
        <Code>.rsc</Code> suffix does not exist locally. A local Next.js server negotiates RSC
        responses by request header on the same URL; the suffixed-file form is an artifact of
        Vercel&apos;s build output. The bug was born in deployment packaging — a layer below
        anything <Code>npm run start</Code> can reproduce.
      </P>
      <Note>
        Local parity is a spectrum, not a boolean. Your dev server emulates the framework; it
        does not emulate what your hosting platform compiles the framework into.
      </Note>

      <H2>convicting without a staging environment</H2>
      <P>
        The fix was one dedicated rewrite: map unprefixed <Code>.rsc</Code> requests to their{" "}
        <Code>/en/</Code> equivalents, excluding real Spanish payloads and internals. But proving
        it before shipping had a complication: this project&apos;s preview deployments sit behind
        Vercel&apos;s authentication, so there was no public staging URL to curl.
      </P>
      <P>
        The workaround is to interrogate the artifact instead of the environment. Next compiles
        every rewrite into a regex inside <Code>.next/routes-manifest.json</Code> — the exact
        regex the edge will execute. Load it in Node, run the ten paths that matter through it:
      </P>
      <Term title="node · routes-manifest simulation">
{`/work.rsc                 -> MATCH  dest=/en/work.rsc
/blog/forensic-method.rsc -> MATCH  dest=/en/blog/...
/es.rsc                   -> no match   (real file wins)
/es/work.rsc              -> no match   (real file wins)
/api/cv.rsc               -> no match
/cv.pdf                   -> no match`}
      </Term>
      <P>
        Same inputs, same regex engine, same outcome the platform will produce. Shipped it;
        production confirmed: seven previously-404 payload endpoints at 200, nine regression
        routes untouched, and the morphing titles finally performing for an audience.
      </P>

      <H2>epilogue: the ghost</H2>
      <P>
        Hours after the fix, the 404s reappeared — only on <Code>/</Code>, only when browsing in
        English, and only from one geographic region. Two more findings closed the case. First:
        Vercel&apos;s CDN excludes the <Code>_rsc</Code> cache-buster from its cache key and
        caches per region, so one edge kept serving pre-fix 404s that another edge had already
        evicted. Second: the root is special — Vercel normalizes its payload path back to{" "}
        <Code>/</Code> <em>before</em> user rewrites run, so the suffix rule never saw it, and
        RSC requests for the homepage received polite, well-formed, completely wrong HTML. The
        final rule routes the root by the <Code>RSC</Code> request header itself, straight to
        the flight file. Verified by content-type, not by status code — this bug burned that
        lesson in twice.
      </P>

      <H2>lessons</H2>
      <UL>
        <LI>
          <strong>&quot;It works&quot; is not a health check.</strong> Graceful degradation is a
          gift to users and a trap for operators: the better your fallbacks, the quieter your
          failures. The only witness to this bug was the network tab.
        </LI>
        <LI>
          Smoke tests that assert status codes on documents miss entire request classes. If your
          framework navigates via payload fetches, test the payload fetch:{" "}
          <Code>curl -H &quot;RSC: 1&quot; /route?_rsc=x</Code> is now part of this site&apos;s
          post-deploy checklist.
        </LI>
        <LI>
          When staging is unavailable, the build artifact is admissible evidence. The compiled
          routes manifest is what production executes — simulating it is verification, not
          guesswork.
        </LI>
        <LI>
          CDNs preserve your mistakes: the 404s came back with an <Code>Age</Code> of thirteen
          hours. Caches don&apos;t forgive; they archive. A redeploy is also a purge.
        </LI>
      </UL>
      <P>
        This is the third investigation on this site that started with someone saying
        &quot;everything looks fine&quot; — after{" "}
        <Link
          href="/blog/phantom-build-failure"
          className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor"
        >
          the capital letter that killed a build
        </Link>{" "}
        and{" "}
        <Link
          href="/blog/forensic-method"
          className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor"
        >
          the method that catches these things
        </Link>
        . The pattern holds: the dangerous bugs aren&apos;t the ones that crash. They&apos;re the
        ones that work.
      </P>
    </>
  );
}
