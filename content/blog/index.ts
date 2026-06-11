import type { ComponentType } from "react";
import type { Lang } from "@/lib/i18n";
import ForensicMethodEn, { meta as forensicEn } from "./forensic-method.en";
import ForensicMethodEs, { meta as forensicEs } from "./forensic-method.es";
import PhantomEn, { meta as phantomEn } from "./phantom-build-failure.en";
import PhantomEs, { meta as phantomEs } from "./phantom-build-failure.es";

export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO yyyy-mm-dd
  readingMin: number;
  tags: string[];
}

export interface Post {
  meta: PostMeta;
  Component: ComponentType;
}

/** newest first; slugs are shared across languages so hreflang alternates line up */
const byLang: Record<Lang, Post[]> = {
  en: [
    { meta: forensicEn, Component: ForensicMethodEn },
    { meta: phantomEn, Component: PhantomEn },
  ],
  es: [
    { meta: forensicEs, Component: ForensicMethodEs },
    { meta: phantomEs, Component: PhantomEs },
  ],
};

/** English dataset — canonical for the machine-readable layer. */
export const posts = byLang.en;

export function getPosts(lang: Lang): Post[] {
  return byLang[lang];
}

export function getPost(lang: Lang, slug: string): Post | undefined {
  return byLang[lang].find((p) => p.meta.slug === slug);
}
