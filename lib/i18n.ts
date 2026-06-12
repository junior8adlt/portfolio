import { SITE } from "./site";

export type Lang = "en" | "es";
export const LANGS: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string): value is Lang {
  return LANGS.includes(value as Lang);
}

/** Public href for a path in a given language. English lives unprefixed. */
export function href(lang: Lang, path: string): string {
  return lang === "en" ? path || "/" : `/es${path === "/" ? "" : path}` || "/es";
}

/** Absolute URL for a path in a given language. */
export function absUrl(lang: Lang, path: string): string {
  return `${SITE.url}${href(lang, path)}`;
}

/** Metadata alternates (canonical + hreflang) for a localized page. */
export function langAlternates(lang: Lang, path: string) {
  return {
    canonical: absUrl(lang, path),
    languages: {
      en: absUrl("en", path),
      es: absUrl("es", path),
      "x-default": absUrl("en", path),
    },
  };
}

interface Dict {
  nav: { work: string; lab: string; blog: string; about: string };
  a11y: { skip: string; main: string; openPalette: string };
  palette: {
    placeholder: string;
    notFound: string;
    home: string;
    work: string;
    lab: string;
    blog: string;
    about: string;
    email: string;
    linkedin: string;
    github: string;
    cvJson: string;
    cvPdf: string;
    switchLang: string;
  };
  footer: { session: string };
  home: {
    boot1a: string;
    boot2a: string;
    boot2b: string;
    boot3a: string;
    boot3b: string;
    h1a: string;
    h1Accent: string;
    sub: string;
    ctaWork: string;
    ctaContact: string;
    evidenceLabel: string;
    labLabel: string;
    labLink: string;
    stackLabel: string;
    agentsLabel: string;
    agentsText1: string;
    agentsText2: string;
    agentsText3: string;
    skillGroups: { backend: string; frontend: string; ai: string; practices: string };
  };
  work: {
    cmd: string;
    title: string;
    intro: string;
    filesLabel: (n: number) => string;
    situation: string;
    evidence: string;
    diagnosis: string;
    intervention: string;
    outcome: string;
    examinerNote: string;
    nextFile: string;
    stack: string;
    visit: string;
    visualEvidence: string;
    redacted: string;
    metaTitle: string;
    metaDescription: string;
  };
  lab: {
    cmd: string;
    title: string;
    intro: string;
    process: string;
    highlight: string;
    stack: string;
    metaTitle: string;
    metaDescription: string;
  };
  about: {
    cmd: string;
    role: string;
    paragraphs: string[];
    timelineLabel: string;
    contactLabel: string;
    contactText: string;
    cvPdf: string;
    metaTitle: string;
    metaDescription: string;
  };
  blog: {
    cmd: string;
    title: string;
    intro: string;
    entriesLabel: (n: number) => string;
    minRead: string;
    back: string;
    metaTitle: string;
    metaDescription: string;
  };
  notFound: { title: string; text: string; cta: string };
}

const en: Dict = {
  nav: { work: "work", lab: "lab", blog: "blog", about: "about" },
  a11y: { skip: "Skip to content", main: "Main", openPalette: "Open command palette" },
  palette: {
    placeholder: "type a command…",
    notFound: "command not found:",
    home: "go: home",
    work: "go: work — case files",
    lab: "go: lab — experiments",
    blog: "go: blog — field notes",
    about: "go: about — profile + timeline",
    email: "contact: email",
    linkedin: "open: linkedin",
    github: "open: github",
    cvJson: "read: cv.json — machine-readable",
    cvPdf: "download: cv.pdf",
    switchLang: "switch: español",
  },
  footer: { session: "session active" },
  home: {
    boot1a: "opening case_file:",
    boot2a: "clearance:",
    boot2b: "senior_software_engineer · 8+ yrs",
    boot3a: "specialty:",
    boot3b: "legacy_modernization + ai_tooling",
    h1a: "I take legacy systems nobody understands and modernize them ",
    h1Accent: "without regressions",
    sub: "Full-stack engineer across .NET, React and SQL for US enterprise clients. I also build MCP servers and AI agents that do real production work: release paperwork, incident forensics, ticket automation. Evidence below.",
    ctaWork: "open case files →",
    ctaContact: "contact",
    evidenceLabel: "case files · evidence",
    labLabel: "lab · running experiments",
    labLink: "inspect lab →",
    stackLabel: "toolchain",
    agentsLabel: "for ai agents",
    agentsText1: "This site is readable by your agent, not just by you. Structured CV at ",
    agentsText2: ", agent instructions at ",
    agentsText3:
      ". I build MCP servers for a living; the least my portfolio can do is speak the protocol's language — plug it straight into your agent:",
    skillGroups: { backend: "backend", frontend: "frontend", ai: "ai / agents", practices: "practices" },
  },
  work: {
    cmd: "ls /work --format=case_file",
    title: "Case files",
    intro:
      "Each entry follows the same forensic structure: situation, evidence, diagnosis, intervention, outcome. Claims come with numbers; the adjectives stay home.",
    filesLabel: (n) => `${n} files on record`,
    situation: "situation",
    evidence: "evidence",
    diagnosis: "diagnosis",
    intervention: "intervention",
    outcome: "outcome · verified",
    examinerNote: "Examiner's note",
    nextFile: "next file",
    stack: "stack",
    visit: "visit site ↗",
    visualEvidence: "visual evidence",
    redacted: "redacted — nda",
    metaTitle: "Work — case files",
    metaDescription:
      "Forensic case studies: enterprise CRM modernization, a real-money betting platform, clinical software, and D2C ecommerce.",
  },
  lab: {
    cmd: "ps aux | grep experiments",
    title: "Lab",
    intro:
      "Where I stress-test ideas before they earn a place in production: agents, MCP servers, real-time overlays. Some are toys. The toys are the point.",
    process: "process",
    highlight: "highlight",
    stack: "stack",
    metaTitle: "Lab — experiments",
    metaDescription:
      "Running experiments: AI game agents, in-game coaching overlays, MCP servers for memory and release automation.",
  },
  about: {
    cmd: "whoami --verbose",
    role: "senior software engineer",
    paragraphs: [
      "I've spent 8+ years shipping enterprise software across the full stack: SQL design and query optimization, .NET and Node APIs, React frontends. My specialty is the work most engineers avoid: taking undocumented legacy behavior, reverse-engineering it, and delivering a modern replacement that doesn't regress the business.",
      "The second pillar is AI tooling that earns its keep in production: custom MCP servers that automate release paperwork and ticket extraction, a forensic investigation methodology for production incidents, and agent experiments that stress-test what this tech can actually do.",
      "Computer Systems Engineering, Instituto Tecnológico Superior de Chapala. English fluent, Spanish native. I work daily with US teams.",
    ],
    timelineLabel: "timeline · git log --career",
    contactLabel: "open channel",
    contactText: "Open to senior full-stack roles and consulting with US teams.",
    cvPdf: "cv.pdf ↓",
    metaTitle: "About — profile and timeline",
    metaDescription:
      "Senior full-stack engineer, 8+ years: .NET, React, SQL, NestJS — legacy modernization and AI tooling for US clients.",
  },
  blog: {
    cmd: "tail -f /var/log/field_notes.log",
    title: "Field notes",
    intro:
      "Investigations written the way they happened: symptom, evidence, refuted hypotheses, root cause. No tutorials, no listicles — autopsies.",
    entriesLabel: (n) => `${n} ${n === 1 ? "entry" : "entries"} on file`,
    minRead: "min read",
    back: "← all field notes",
    metaTitle: "Blog — field notes",
    metaDescription:
      "Forensic write-ups from production: debugging methodology, legacy modernization, AI tooling.",
  },
  notFound: {
    title: "file not found",
    text: "No case file at this path. Either the evidence was moved, or it never existed. Both happen more often than people admit.",
    cta: "cd ~ →",
  },
};

const es: Dict = {
  nav: { work: "casos", lab: "lab", blog: "blog", about: "perfil" },
  a11y: { skip: "Saltar al contenido", main: "Principal", openPalette: "Abrir paleta de comandos" },
  palette: {
    placeholder: "escribe un comando…",
    notFound: "comando no encontrado:",
    home: "ir: inicio",
    work: "ir: casos — expedientes",
    lab: "ir: lab — experimentos",
    blog: "ir: blog — notas de campo",
    about: "ir: perfil — historia + timeline",
    email: "contacto: email",
    linkedin: "abrir: linkedin",
    github: "abrir: github",
    cvJson: "leer: cv.json — legible por máquinas",
    cvPdf: "descargar: cv.pdf",
    switchLang: "switch: english",
  },
  footer: { session: "sesión activa" },
  home: {
    boot1a: "abriendo expediente:",
    boot2a: "nivel:",
    boot2b: "ingeniero_de_software_senior · 8+ años",
    boot3a: "especialidad:",
    boot3b: "modernización_legacy + ai_tooling",
    h1a: "Tomo sistemas legacy que nadie entiende y los modernizo ",
    h1Accent: "sin regresiones",
    sub: "Ingeniero full-stack en .NET, React y SQL para clientes enterprise de EE.UU. También construyo servidores MCP y agentes de IA que hacen trabajo real de producción: papeleo de releases, forense de incidentes, automatización de tickets. La evidencia, abajo.",
    ctaWork: "abrir expedientes →",
    ctaContact: "contacto",
    evidenceLabel: "expedientes · evidencia",
    labLabel: "lab · experimentos activos",
    labLink: "inspeccionar lab →",
    stackLabel: "herramientas",
    agentsLabel: "para agentes de ia",
    agentsText1: "Este sitio lo puede leer tu agente, no solo tú. CV estructurado en ",
    agentsText2: ", instrucciones para agentes en ",
    agentsText3:
      ". Construyo servidores MCP profesionalmente; lo mínimo que puede hacer mi portfolio es hablar el idioma del protocolo — conéctalo directo a tu agente:",
    skillGroups: { backend: "backend", frontend: "frontend", ai: "ia / agentes", practices: "prácticas" },
  },
  work: {
    cmd: "ls /casos --format=expediente",
    title: "Expedientes",
    intro:
      "Cada entrada sigue la misma estructura forense: situación, evidencia, diagnóstico, intervención, resultado. Las afirmaciones vienen con números; los adjetivos se quedan en casa.",
    filesLabel: (n) => `${n} expedientes en registro`,
    situation: "situación",
    evidence: "evidencia",
    diagnosis: "diagnóstico",
    intervention: "intervención",
    outcome: "resultado · verificado",
    examinerNote: "Nota del perito",
    nextFile: "siguiente expediente",
    stack: "stack",
    visit: "visitar sitio ↗",
    visualEvidence: "evidencia visual",
    redacted: "reservado — nda",
    metaTitle: "Casos — expedientes",
    metaDescription:
      "Case studies forenses: modernización de CRM enterprise, una plataforma de apuestas con dinero real, software clínico y ecommerce D2C.",
  },
  lab: {
    cmd: "ps aux | grep experimentos",
    title: "Lab",
    intro:
      "Donde pongo a prueba ideas antes de que se ganen un lugar en producción: agentes, servidores MCP, overlays en tiempo real. Algunos son juguetes. Los juguetes son el punto.",
    process: "proceso",
    highlight: "destacado",
    stack: "stack",
    metaTitle: "Lab — experimentos",
    metaDescription:
      "Experimentos activos: agentes de IA para juegos, overlays de coaching in-game, servidores MCP de memoria y automatización de releases.",
  },
  about: {
    cmd: "whoami --verbose",
    role: "ingeniero de software senior",
    paragraphs: [
      "Llevo 8+ años entregando software enterprise en todo el stack: diseño SQL y optimización de queries, APIs en .NET y Node, frontends en React. Mi especialidad es el trabajo que la mayoría evita: tomar comportamiento legacy sin documentar, hacerle ingeniería inversa y entregar un reemplazo moderno que no le falle al negocio.",
      "El segundo pilar es tooling de IA que se gana su lugar en producción: servidores MCP que automatizan papeleo de releases y extracción de tickets, una metodología forense para incidentes de producción, y experimentos con agentes que ponen a prueba lo que esta tecnología realmente puede hacer.",
      "Ingeniería en Sistemas Computacionales, Instituto Tecnológico Superior de Chapala. Inglés fluido, español nativo. Trabajo a diario con equipos de EE.UU.",
    ],
    timelineLabel: "timeline · git log --career",
    contactLabel: "canal abierto",
    contactText: "Abierto a roles senior full-stack y consultoría con equipos de EE.UU. y México.",
    cvPdf: "cv.pdf ↓",
    metaTitle: "Perfil — historia y timeline",
    metaDescription:
      "Ingeniero full-stack senior, 8+ años: .NET, React, SQL, NestJS — modernización legacy y tooling de IA para clientes de EE.UU.",
  },
  blog: {
    cmd: "tail -f /var/log/notas_de_campo.log",
    title: "Notas de campo",
    intro:
      "Investigaciones escritas como sucedieron: síntoma, evidencia, hipótesis refutadas, causa raíz. Sin tutoriales, sin listicles — autopsias.",
    entriesLabel: (n) => `${n} ${n === 1 ? "entrada" : "entradas"} en archivo`,
    minRead: "min de lectura",
    back: "← todas las notas de campo",
    metaTitle: "Blog — notas de campo",
    metaDescription:
      "Autopsias técnicas desde producción: metodología de debugging, modernización legacy, tooling de IA.",
  },
  notFound: {
    title: "archivo no encontrado",
    text: "No hay expediente en esta ruta. O la evidencia fue movida, o nunca existió. Ambas cosas pasan más seguido de lo que la gente admite.",
    cta: "cd ~ →",
  },
};

const dicts: Record<Lang, Dict> = { en, es };

export function t(lang: Lang): Dict {
  return dicts[lang];
}
