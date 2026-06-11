export type Stamp =
  | "PRODUCTION"
  | "LIVE"
  | "MVP"
  | "BETA"
  | "NDA"
  | "CLIENT"
  | "PERSONAL"
  | "OSS";

export interface Exhibit {
  /** short metric or artifact, e.g. "timeouts → <1s" */
  metric: string;
  caption: string;
}

export interface CaseStudy {
  slug: string;
  index: string; // "001"
  name: string;
  tagline: string; // one-line pitch shown in ledger
  stamps: Stamp[];
  stack: string[];
  period: string; // "2024 — present"
  url?: string; // live site, omitted when private or in progress
  keyMetric: string; // single strongest number for the ledger row
  /** forensic sections */
  situation: string;
  evidence: Exhibit[];
  diagnosis: string;
  intervention: string[];
  outcome: Exhibit[];
  annotation?: string; // examiner's note, italic amber
}

export interface LabEntry {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  stamps: Stamp[];
  stack: string[];
  detail: string; // 2-3 sentence description
  highlight: string; // the one impressive technical detail
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  summary: string;
  bullets: string[];
}
