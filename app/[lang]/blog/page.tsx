import type { Metadata } from "next";
import Link from "next/link";
import { SectionRule } from "@/components/section-rule";
import { getPosts } from "@/content/blog";
import { href, isLang, langAlternates, t, type Lang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const ui = t(lang);
  return {
    title: ui.blog.metaTitle,
    description: ui.blog.metaDescription,
    alternates: langAlternates(lang, "/blog"),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Lang;
  if (!isLang(lang)) return null;
  const ui = t(lang);
  const posts = getPosts(lang);

  return (
    <div className="pt-12 pb-8 sm:pt-16">
      <p className="font-mono text-xs text-paper-dim">
        <span className="text-phosphor-dim">❯</span> {ui.blog.cmd}
      </p>
      <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        {ui.blog.title}
      </h1>
      <p className="mt-4 max-w-[58ch] font-serif text-lg leading-relaxed text-paper-dim">
        {ui.blog.intro}
      </p>

      <div className="mt-12">
        <SectionRule label={ui.blog.entriesLabel(posts.length)} />
        <div className="mt-4">
          {posts.map((post) => (
            <Link
              key={post.meta.slug}
              href={href(lang, `/blog/${post.meta.slug}`)}
              className="group block border-b border-ink-line px-2 py-6 transition-colors duration-200 hover:bg-ink-raise focus-visible:bg-ink-raise"
            >
              <p className="font-mono text-xs text-paper-dim">
                <time dateTime={post.meta.date}>{post.meta.date}</time> · {post.meta.readingMin}{" "}
                {ui.blog.minRead} · {post.meta.tags.join(" · ")}
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
