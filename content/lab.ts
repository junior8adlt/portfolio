import type { Lang } from "@/lib/i18n";
import type { LabEntry } from "./types";
import { labEn } from "./lab.en";
import { labEs } from "./lab.es";

const byLang: Record<Lang, LabEntry[]> = { en: labEn, es: labEs };

/** English dataset — canonical for the machine-readable layer. */
export const lab = labEn;

export function getLab(lang: Lang): LabEntry[] {
  return byLang[lang];
}
