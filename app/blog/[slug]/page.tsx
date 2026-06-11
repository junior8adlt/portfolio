import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/content/blog";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.summary,
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.summary,
      publishedTime: post.meta.date,
      url: `${SITE.url}/blog/${post.meta.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, Component } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    url: `${SITE.url}/blog/${meta.slug}`,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    keywords: meta.tags.join(", "),
  };

  return (
    <article className="pt-12 pb-8 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header>
        <p className="font-mono text-xs text-paper-dim">
          <span className="text-phosphor-dim">❯</span> cat /blog/{meta.slug}.md
        </p>
        <p className="mt-6 font-mono text-xs text-paper-dim">
          <time dateTime={meta.date}>{meta.date}</time> · {meta.readingMin} min ·{" "}
          {meta.tags.join(" · ")}
        </p>
        <h1 className="mt-3 max-w-[26ch] font-mono text-3xl font-semibold leading-tight tracking-tight text-paper sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-5 max-w-[62ch] font-serif text-xl italic leading-relaxed text-paper-dim">
          {meta.summary}
        </p>
      </header>

      <div className="mt-6">
        <Component />
      </div>

      <nav className="mt-20 border-t border-ink-line pt-6" aria-label="Back to blog">
        <Link
          href="/blog"
          className="py-2 font-mono text-sm text-paper-dim transition-colors duration-150 hover:text-phosphor"
        >
          ← all field notes
        </Link>
      </nav>
    </article>
  );
}
