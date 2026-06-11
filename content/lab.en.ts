import type { LabEntry } from "./types";

export const labEn: LabEntry[] = [
  {
    slug: "runeforge",
    index: "L01",
    name: "RuneForge",
    tagline: "AI-powered League of Legends companion — runes, items and augment recommendations in real time",
    stamps: ["BETA", "PERSONAL"],
    stack: ["React", "FastAPI", "Python", "Electron", "Claude API", "SQLite"],
    detail:
      "Connects to the League client over the LCU WebSocket, profiles all ten champions in a draft (role, playstyle, damage profile, CC), and auto-imports optimized rune pages during champion select. A three-tier pipeline: rule-based recommendations, data-driven predictions on Diamond+ matches, and Claude-generated explanations of why a choice wins this specific matchup.",
    highlight:
      "An ARAM interaction engine with 71+ tagged mechanic chains that detects 'broken' combos mechanically (infinite-scaling scenarios statistics miss) — verified by a golden no-regression test suite of 120+ tests.",
  },
  {
    slug: "lolcoaching-ai",
    index: "L02",
    name: "LolCoachingAI",
    tagline: "Real-time in-game coaching overlay with voice — a Challenger-level coach powered by Claude",
    stamps: ["BETA", "PERSONAL"],
    stack: ["Electron", "React", "FastAPI", "Claude API", "WebSocket", "TTS"],
    detail:
      "A transparent Electron overlay rendered on top of a running DirectX game, toggled with a global hotkey. A Python service monitors live game state (gold diff, objectives, KDA) and streams coaching tips over WebSocket; post-game it produces a graded review with timestamped mistakes. Voice coaching via TTS, with Spanish localization.",
    highlight:
      "Solving overlay-on-game rendering plus real-time Claude prompting with structured Pydantic schemas for matchup analysis, jungle prediction heatmaps, and S–D graded post-game reports.",
  },
  {
    slug: "claude-memory-mcp",
    index: "L03",
    name: "claude-memory-mcp",
    tagline: "Multi-device persistent memory for Claude as an MCP server",
    stamps: ["MVP", "OSS"],
    stack: ["MCP", "TypeScript", "Turso", "SQLite FTS5"],
    detail:
      "An MCP server that gives Claude durable, searchable memory shared across devices: facts stored in Turso (distributed SQLite) with FTS5 full-text search, exposed as tools any MCP-capable client can call.",
    highlight:
      "Memory recall as ranked full-text search over a synced edge database — the same pattern this portfolio uses to stay readable by agents.",
  },
  {
    slug: "itsm-mcp-servers",
    index: "L04",
    name: "ITSM MCP Servers",
    tagline: "MCP servers that do release paperwork — ServiceNow extraction and Azure DevOps change requests",
    stamps: ["PRODUCTION", "CLIENT"],
    stack: ["MCP", "Python", "Playwright", "Azure DevOps"],
    detail:
      "Custom MCP servers used in real release cycles: one drives ServiceNow through Playwright to extract ticket data; another generates Change Request artifacts and CAB material from Azure DevOps work items. Plus OpenClaw, a game-automation agent driven by natural-language commands, built to stress-test the same agent patterns.",
    highlight:
      "Not demos: these run during actual quarterly releases and save hours of change-management paperwork per cycle.",
  },
];
