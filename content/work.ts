import type { Lang } from "@/lib/i18n";
import type { CaseStudy } from "./types";
import { workEn } from "./work.en";
import { workEs } from "./work.es";

const byLang: Record<Lang, CaseStudy[]> = { en: workEn, es: workEs };

/** English dataset — canonical for the machine-readable layer (/api/cv, /api/work, llms.txt). */
export const work = workEn;

export function getWork(lang: Lang): CaseStudy[] {
  return byLang[lang];
}

export function getCaseStudy(lang: Lang, slug: string): CaseStudy | undefined {
  return byLang[lang].find((w) => w.slug === slug);
}
