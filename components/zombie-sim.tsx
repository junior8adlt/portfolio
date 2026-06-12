"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

type Phase = "zombie" | "killed" | "clean";

const ZOMBIE_ART = String.raw`      .-""""-.
     /  x  x  \
    |    ..    |     node.exe · PID 4242
     \  ____  /      state: UNDEAD
      '-....-'       port: 3000 (squatting)`;

const TOMB_ART = String.raw`       _______
      /       \
     |   RIP   |
     | PID 4242|     port 3000: free
    _|_________|_`;

const CLEAN_ART = String.raw`      ▲ Next.js
     ✓ Ready in 154ms

     node.exe · PID 7331
     state: alive · port: 3000`;

const texts = {
  en: {
    intro: "// you arrive at the scene. every request is 404ing. try something:",
    restart: "npm run start",
    kill: "Stop-Process -Id 4242 -Force",
    reset: "replay incident",
    tryKill: "// the restart lied. ask the OS who owns the port. then:",
    blocked: [
      "> npm run start",
      "Error: listen EADDRINUSE: address already in use :::3000",
      "// ...the 'new' server just died. the zombie is still answering.",
      "GET /work -> 404",
    ],
    killed: ["> Stop-Process -Id 4242 -Force", "// the OS never misses. port 3000 released."],
    clean: [
      "> npm run start",
      "✓ Ready in 154ms",
      "GET / -> 200",
      "GET /work -> 200",
      "// case closed. verify the PID, not the promise.",
    ],
    zombieLog: ["GET / -> 404", "GET /work -> 404", "GET /blog -> 404", "Error: Internal: NoFallbackError"],
    caption: "Interactive reenactment. The zombie only dies if you kill the PID; restarting just feeds it.",
  },
  es: {
    intro: "// llegas a la escena. todas las peticiones dan 404. intenta algo:",
    restart: "npm run start",
    kill: "Stop-Process -Id 4242 -Force",
    reset: "repetir incidente",
    tryKill: "// el reinicio mintió. pregúntale al OS quién tiene el puerto. luego:",
    blocked: [
      "> npm run start",
      "Error: listen EADDRINUSE: address already in use :::3000",
      "// ...el server 'nuevo' acaba de morir. el zombi sigue contestando.",
      "GET /work -> 404",
    ],
    killed: ["> Stop-Process -Id 4242 -Force", "// el OS nunca falla. puerto 3000 liberado."],
    clean: [
      "> npm run start",
      "✓ Ready in 154ms",
      "GET / -> 200",
      "GET /work -> 200",
      "// caso cerrado. verifica el PID, no la promesa.",
    ],
    zombieLog: ["GET / -> 404", "GET /work -> 404", "GET /blog -> 404", "Error: Internal: NoFallbackError"],
    caption: "Recreación interactiva. El zombi solo muere si matas el PID; reiniciar nomás lo alimenta.",
  },
};

export function ZombieSim({ lang }: { lang: Lang }) {
  const t = texts[lang];
  const [phase, setPhase] = useState<Phase>("zombie");
  const [log, setLog] = useState<string[]>([t.intro]);
  const [restartTried, setRestartTried] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  // the zombie keeps mumbling 404s while undead
  useEffect(() => {
    if (phase !== "zombie") return;
    let i = 0;
    const id = setInterval(() => {
      setLog((l) => [...l.slice(-14), t.zombieLog[i % t.zombieLog.length]]);
      i++;
    }, 1800);
    return () => clearInterval(id);
  }, [phase, t]);

  const tryRestart = () => {
    if (phase === "zombie") {
      setLog((l) => [...l, ...t.blocked, t.tryKill]);
      setRestartTried(true);
    } else if (phase === "killed") {
      setPhase("clean");
      setLog((l) => [...l, ...t.clean]);
    }
  };

  const kill = () => {
    setPhase("killed");
    setLog((l) => [...l, ...t.killed]);
  };

  const reset = () => {
    setPhase("zombie");
    setRestartTried(false);
    setLog([t.intro]);
  };

  const art = phase === "zombie" ? ZOMBIE_ART : phase === "killed" ? TOMB_ART : CLEAN_ART;
  const artColor =
    phase === "zombie" ? "text-alarm" : phase === "killed" ? "text-paper-dim" : "text-phosphor";

  return (
    <figure className="mt-6 max-w-[72ch]">
      <div className="border border-ink-line bg-ink-raise">
        <div className="flex items-center gap-2 border-b border-ink-line px-3 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-ink-line bg-alarm/60" />
            <span className="h-2.5 w-2.5 rounded-full border border-ink-line bg-amber/60" />
            <span className="h-2.5 w-2.5 rounded-full border border-ink-line bg-phosphor-dim/60" />
          </span>
          <span className="font-mono text-[11px] text-paper-dim">
            localhost:3000 — {phase === "clean" ? "200 OK" : phase === "killed" ? "···" : "404 Not Found"}
          </span>
        </div>

        <pre
          className={`overflow-x-auto px-4 py-4 font-mono text-[13px] leading-snug transition-colors duration-300 ${artColor} ${phase === "zombie" ? "animate-pulse" : ""}`}
          aria-hidden="true"
        >
          {art}
        </pre>

        <div
          ref={logRef}
          className="h-40 overflow-y-auto border-t border-ink-line px-4 py-3 font-mono text-[12px] leading-relaxed text-paper-dim"
          role="log"
          aria-live="polite"
        >
          {log.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith("//")
                  ? "text-amber"
                  : line.includes("404") || line.includes("EADDRINUSE") || line.includes("NoFallback")
                    ? "text-alarm"
                    : line.includes("200") || line.startsWith("✓")
                      ? "text-phosphor"
                      : ""
              }
            >
              {line}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-ink-line px-3 py-3">
          {phase !== "clean" && (
            <button
              type="button"
              onClick={tryRestart}
              className="cursor-pointer border border-ink-line px-3 py-2 font-mono text-xs text-paper transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
            >
              ❯ {t.restart}
            </button>
          )}
          {phase === "zombie" && restartTried && (
            <button
              type="button"
              onClick={kill}
              className="cursor-pointer border border-alarm px-3 py-2 font-mono text-xs text-alarm transition-colors duration-150 hover:bg-alarm hover:text-ink"
            >
              ❯ {t.kill}
            </button>
          )}
          {phase === "clean" && (
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer border border-ink-line px-3 py-2 font-mono text-xs text-paper-dim transition-colors duration-150 hover:border-phosphor-dim hover:text-phosphor"
            >
              ↻ {t.reset}
            </button>
          )}
        </div>
      </div>
      <figcaption className="mt-2.5 max-w-[60ch] font-serif text-[15px] leading-relaxed text-paper-dim">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor">
          exhibit Z
        </span>
        {t.caption}
      </figcaption>
    </figure>
  );
}
