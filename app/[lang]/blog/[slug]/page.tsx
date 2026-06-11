import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPost } from "@/content/blog";
import { SITE } from "@/lib/site";
import { absUrl, href, isLang, langAlternates, LANGS, t, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => getPosts(lang).map((p) => ({ lang, slug: p.meta.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const post = getPost(lang, slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.summary,
    alternates: langAlternates(lang, `/blog/${slug}`),
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.summary,
      publishedTime: post.meta.date,
      url: absUrl(lang, `/blog/${post.meta.slug}`),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = raw as Lang;
  if (!isLang(lang)) notFound();
  const ui = t(lang);
  const post = getPost(lang, slug);
  if (!post) notFound();

  const { meta, Component } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    inLanguage: lang === "en" ? "en-US" : "es-MX",
    url: absUrl(lang, `/blog/${meta.slug}`),
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
          <time dateTime={meta.date}>{meta.date}</time> · {meta.readingMin} {ui.blog.minRead} ·{" "}
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

      <nav className="mt-20 border-t border-ink-line pt-6" aria-label={ui.blog.back}>
        <Link
          href={href(lang, "/blog")}
          className="py-2 font-mono text-sm text-paper-dim transition-colors duration-150 hover:text-phosphor"
        >
          {ui.blog.back}
        </Link>
      </nav>
    </article>
  );
}
