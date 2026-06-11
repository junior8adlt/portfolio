import type { ExperienceEntry } from "./types";

export const experienceEs: ExperienceEntry[] = [
  {
    role: "Ingeniero de Software Senior",
    company: "Nexaminds",
    period: "Sep 2024 — presente",
    summary:
      "Modernización de CRM enterprise para un gran cliente logístico de EE.UU.: WinForms + stored procedures → .NET Web API + React.",
    bullets: [
      "Ownership de punta a punta a lo largo de 6+ releases trimestrales: diseño SQL, API, UI en React, soporte de producción.",
      "Pantallas críticas de timeouts visibles al usuario a sub-segundo; lideré la migración de stored procedures a LINQ y la consolidación de APIs.",
      "Construí servidores MCP (Python + Playwright) que automatizan extracción de tickets ITSM y artefactos de change management.",
      "Líder de soporte de release: cola de incidentes de producción, cherry-picks de hotfixes, coordinación de aprobación de cambios.",
    ],
  },
  {
    role: "Ingeniero de Software Senior",
    company: "Pentalog",
    period: "Jul 2021 — Ago 2024",
    summary:
      "Plataforma enterprise para gestionar programas, coaches y estudiantes en múltiples universidades de EE.UU.",
    bullets: [
      "Interfaces React + GraphQL con feedback en tiempo real y manejo automático de sesiones; +15% de eficiencia de procesos vía automatización.",
      "Diseñé arquitectura de componentes reutilizables y patrones de manejo de estado.",
      "Presenté demos directamente a clientes; lideré el filtro técnico de candidatos frontend.",
    ],
  },
  {
    role: "Ingeniero de Software",
    company: "Edgebound",
    period: "Ene 2021 — Jul 2021",
    summary: "Funcionalidades de plataformas ecommerce sobre VTEX y HCL Commerce.",
    bullets: [
      "Flujos de checkout, carritos, envíos e integraciones de pago.",
      "Dashboards de analítica de ventas y uso.",
    ],
  },
  {
    role: "Ingeniero de Software",
    company: "Rokode",
    period: "Jun 2019 — Dic 2020",
    summary: "Soluciones frontend para clientes enterprise, incluyendo grandes automotrices.",
    bullets: [
      "Tracking de transporte de empleados, plataformas de eventos, mapas interactivos de planta — React y React Native.",
      "Lideré un equipo de 4 desarrolladores frontend.",
    ],
  },
  {
    role: "Ingeniero de Software",
    company: "Ferax",
    period: "Jul 2018 — May 2019",
    summary: "Aplicaciones web y móviles de logística y gestión de residuos.",
    bullets: [
      "Programación de rutas y tracking vehicular en tiempo real (AngularJS, Node.js, React Native + Google Maps).",
      "Integraciones de pago y módulos de verificación de identidad.",
    ],
  },
];
