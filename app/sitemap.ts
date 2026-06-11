import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { work } from "@/content/work";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/work`, changeFrequency: "monthly", priority: 0.9 },
    ...work.map((w) => ({
      url: `${SITE.url}/work/${w.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE.url}/lab`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.meta.slug}`,
      lastModified: p.meta.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
