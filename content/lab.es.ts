import type { LabEntry } from "./types";

export const labEs: LabEntry[] = [
  {
    slug: "runeforge",
    index: "L01",
    name: "RuneForge",
    tagline: "Companion de League of Legends con IA — recomendaciones de runas, items y augments en tiempo real",
    stamps: ["BETA", "PERSONAL"],
    stack: ["React", "FastAPI", "Python", "Electron", "Claude API", "SQLite"],
    detail:
      "Se conecta al cliente de League por el WebSocket del LCU, perfila a los diez campeones de un draft (rol, estilo de juego, perfil de daño, CC) y auto-importa páginas de runas optimizadas durante la selección de campeón. Pipeline de tres niveles: recomendaciones por reglas, predicciones data-driven sobre partidas Diamante+, y explicaciones generadas con Claude de por qué una elección gana este matchup específico.",
    highlight:
      "Un motor de interacciones de ARAM con 71+ cadenas de mecánicas etiquetadas que detecta combos 'rotos' mecánicamente (escenarios de escalado infinito que las estadísticas no ven) — verificado por una suite golden de no-regresión con 120+ tests.",
  },
  {
    slug: "lolcoaching-ai",
    index: "L02",
    name: "LolCoachingAI",
    tagline: "Overlay de coaching in-game en tiempo real con voz — un coach nivel Challenger impulsado por Claude",
    stamps: ["BETA", "PERSONAL"],
    stack: ["Electron", "React", "FastAPI", "Claude API", "WebSocket", "TTS"],
    detail:
      "Un overlay transparente de Electron renderizado sobre un juego DirectX corriendo, activado con un hotkey global. Un servicio en Python monitorea el estado de la partida en vivo (diferencia de oro, objetivos, KDA) y transmite consejos por WebSocket; al terminar produce una evaluación con calificación y errores con timestamp. Coaching por voz vía TTS, con localización al español.",
    highlight:
      "Resolver el render de overlay-sobre-juego más prompting de Claude en tiempo real con esquemas Pydantic estructurados para análisis de matchups, heatmaps de predicción de jungla y reportes post-partida calificados de S a D.",
  },
  {
    slug: "claude-memory-mcp",
    index: "L03",
    name: "claude-memory-mcp",
    tagline: "Memoria persistente multi-dispositivo para Claude como servidor MCP",
    stamps: ["MVP", "OSS"],
    stack: ["MCP", "TypeScript", "Turso", "SQLite FTS5"],
    detail:
      "Un servidor MCP que le da a Claude memoria durable y buscable compartida entre dispositivos: hechos almacenados en Turso (SQLite distribuido) con búsqueda full-text FTS5, expuestos como tools que cualquier cliente MCP puede llamar.",
    highlight:
      "Recuperación de memoria como búsqueda full-text rankeada sobre una base de datos edge sincronizada — el mismo patrón que usa este portfolio para ser legible por agentes.",
  },
  {
    slug: "itsm-mcp-servers",
    index: "L04",
    name: "Servidores MCP de ITSM",
    tagline: "Servidores MCP que hacen el papeleo de releases — extracción de ServiceNow y change requests de Azure DevOps",
    stamps: ["PRODUCTION", "CLIENT"],
    stack: ["MCP", "Python", "Playwright", "Azure DevOps"],
    detail:
      "Servidores MCP a la medida usados en ciclos reales de release: uno maneja ServiceNow vía Playwright para extraer datos de tickets; otro genera artefactos de Change Request y material de CAB desde work items de Azure DevOps. Más OpenClaw, un agente de automatización de juegos manejado por comandos en lenguaje natural, construido para estresar los mismos patrones de agentes.",
    highlight:
      "No son demos: corren durante releases trimestrales reales y ahorran horas de papeleo de change management por ciclo.",
  },
];
