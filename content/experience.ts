import type { Lang } from "@/lib/i18n";
import type { ExperienceEntry } from "./types";
import { experienceEn, skills } from "./experience.en";
import { experienceEs } from "./experience.es";

const byLang: Record<Lang, ExperienceEntry[]> = { en: experienceEn, es: experienceEs };

/** English dataset — canonical for the machine-readable layer. */
export const experience = experienceEn;

/** Tech skill lists are language-neutral. */
export { skills };

export function getExperience(lang: Lang): ExperienceEntry[] {
  return byLang[lang];
}
