import type { Metadata } from "next";
import Link from "next/link";
import { SectionRule } from "@/components/section-rule";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — field notes",
  description:
    "Forensic write-ups from production: debugging methodology, legacy modernization, AI tooling.",
};

export default function BlogPage() {
  return (
    <div className="pt-12 pb-8 sm:pt-16">
      <p className="font-mono text-xs text-paper-dim">
        <span className="text-phosphor-dim">❯</span> tail -f /var/log/field_notes.log
      </p>
      <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        Field notes
      </h1>
      <p className="mt-4 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
        Investigations written the way they happened: symptom, evidence, refuted hypotheses, root
        cause. No tutorials, no listicles — autopsies.
      </p>

      <div className="mt-12">
        <SectionRule label={`${posts.length} ${posts.length === 1 ? "entry" : "entries"} on file`} />
        <div className="mt-4">
          {posts.map((post) => (
            <Link
              key={post.meta.slug}
              href={`/blog/${post.meta.slug}`}
              className="group block border-b border-ink-line px-2 py-6 transition-colors duration-200 hover:bg-ink-raise focus-visible:bg-ink-raise"
            >
              <p className="font-mono text-xs text-paper-dim">
                <time dateTime={post.meta.date}>{post.meta.date}</time> · {post.meta.readingMin}{" "}
                min · {post.meta.tags.join(" · ")}
              </p>
              <h2 className="mt-2 max-w-[40ch] font-mono text-xl font-semibold leading-snug tracking-tight text-paper transition-colors duration-150 group-hover:text-phosphor">
                {post.meta.title}
              </h2>
              <p className="mt-2 max-w-[60ch] font-serif text-base leading-relaxed text-paper-dim">
                {post.meta.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
