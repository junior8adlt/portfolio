import type { MetadataRoute } from "next";
import { work } from "@/content/work";
import { posts } from "@/content/blog";
import { absUrl, LANGS } from "@/lib/i18n";

interface Entry {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified?: string;
}

const entries: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" },
  ...work.map((w) => ({
    path: `/work/${w.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/lab", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  ...posts.map((p) => ({
    path: `/blog/${p.meta.slug}`,
    priority: 0.6,
    changeFrequency: "yearly" as const,
    lastModified: p.meta.date,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.flatMap((lang) =>
    entries.map((e) => ({
      url: absUrl(lang, e.path),
      priority: lang === "en" ? e.priority : Math.max(e.priority - 0.1, 0.1),
      changeFrequency: e.changeFrequency,
      ...(e.lastModified ? { lastModified: e.lastModified } : {}),
      alternates: {
        languages: {
          en: absUrl("en", e.path),
          es: absUrl("es", e.path),
        },
      },
    })),
  );
}
