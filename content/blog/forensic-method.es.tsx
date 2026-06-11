import Link from "next/link";
import { P, H2, Note, UL, LI } from "@/components/prose";

export const meta = {
  slug: "forensic-method",
  title: "El método forense: seis fases para incidentes de producción",
  summary:
    "El debugging de producción fracasa cuando corre sobre intuición: gana la hipótesis más ruidosa y la evidencia se evapora. Este es el método de seis fases que uso en su lugar — datos antes que teorías, y ninguna hipótesis sobrevive sin sobrevivir un intento de matarla.",
  date: "2026-06-11",
  readingMin: 8,
  tags: ["forense", "incident-response", "metodología", "debugging"],
};

function Phase({
  n,
  name,
  question,
  children,
  exit,
}: {
  n: number;
  name: string;
  question: string;
  children: React.ReactNode;
  exit: string;
}) {
  return (
    <section className="mt-10 max-w-[68ch] border border-ink-line">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-ink-line bg-ink-raise px-5 py-3">
        <span className="font-mono text-xs text-phosphor-dim">fase {String(n).padStart(2, "0")}</span>
        <h3 className="font-mono text-base font-semibold text-paper">{name}</h3>
        <span className="font-serif text-[15px] italic text-paper-dim">{question}</span>
      </header>
      <div className="px-5 pb-5 [&>p]:max-w-none [&>ul]:max-w-none">{children}</div>
      <footer className="border-t border-ink-line px-5 py-3 font-mono text-xs text-amber">
        criterio de salida: {exit}
      </footer>
    </section>
  );
}

export default function Post() {
  return (
    <>
      <P>
        La mayoría del debugging de producción se conduce como una sesión espiritista. Alguien
        senior nombra a un sospechoso en los primeros cinco minutos, todos empiezan a buscar
        evidencia que lo confirme, y los artefactos que pudieron probar lo contrario los destruye
        el primer reinicio bienintencionado. Cuando el incidente se cierra, nadie escribe nada,
        así que la misma sesión espiritista se reúne otra vez tres meses después.
      </P>
      <P>
        Después de suficientes de esas, formalicé lo que realmente hago cuando funciona. Seis
        fases, dos principios no negociables. Lo he usado en incidentes de producción enterprise,
        en proyectos personales, y en{" "}
        <Link
          href="/es/blog/phantom-build-failure"
          className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor"
        >
          una falla de build causada por una sola letra mayúscula
        </Link>
        . El método es el mismo a cualquier escala; solo cambian las apuestas.
      </P>

      <H2>los dos principios</H2>
      <UL>
        <LI>
          <strong>Datos primero.</strong> Nada de teorías hasta que la evidencia esté
          recolectada. El orden importa porque las teorías contaminan la recolección: en cuanto
          crees que es el caché, solo miras el caché.
        </LI>
        <LI>
          <strong>Refutación obligatoria.</strong> No juntas apoyo para una hipótesis; diseñas el
          experimento que la mataría. Una hipótesis solo tiene permiso de sobrevivir
          sobreviviendo. La confirmación se siente más rápida y es como los equipos queman un día
          entero en el sospechoso equivocado.
        </LI>
      </UL>

      <H2>las seis fases</H2>

      <Phase
        n={1}
        name="preservar la escena"
        question="¿qué dejará de ser cierto en una hora?"
        exit="evidencia volátil capturada; nada destructivo ha corrido"
      >
        <P>
          Antes que nada, captura lo que se pudre: texto exacto del error, timestamps, ventanas
          de logs, estado de procesos, versiones desplegadas, cambios recientes, quién está
          afectado y desde cuándo. Reiniciar un servicio es destruir la escena del crimen; a
          veces hay que hacerlo (la mitigación supera al diagnóstico cuando los usuarios están
          sangrando), pero hazlo a sabiendas y toma la foto primero. El instinto que esta fase
          combate: el reinicio reflejo que lo «arregla» y garantiza la repetición la próxima
          semana.
        </P>
      </Phase>

      <Phase
        n={2}
        name="definir el síntoma"
        question="¿qué está fallando exactamente, para quién, desde cuándo?"
        exit="un enunciado de síntoma de una frase, falsable"
      >
        <P>
          Convierte «está roto» en un enunciado lo bastante preciso para poder estar equivocado:{" "}
          <em>esperaba X, observo Y, alcance Z, visto por primera vez en T</em>. La mitad de los
          incidentes cambian de forma en esta fase — el reporte dice «la API está caída» y el
          síntoma resulta ser «un endpoint expira para cuentas con más de 10k filas». Si no
          puedes decir cuándo funcionó por última vez, averiguarlo se vuelve la primera tarea.
        </P>
      </Phase>

      <Phase
        n={3}
        name="recolectar antes de teorizar"
        question="¿qué dice el sistema que pasó?"
        exit="un timeline de hechos, cada uno con su fuente"
      >
        <P>
          Ahora los datos: logs, query plans, traces, diffs de todo lo que cambió cerca del
          T-cero (deploys, configuración, datos, dependencias, infraestructura). Construye un
          timeline donde cada entrada cite su fuente. Solo hechos — «el tiempo de respuesta se
          triplicó a las 14:02» califica; «el release nuevo lo rompió» no, porque eso es una
          teoría vestida de hecho.
        </P>
      </Phase>

      <Phase
        n={4}
        name="el registro de hipótesis"
        question="¿qué podría explicar esto, y qué mataría a cada candidata?"
        exit="toda hipótesis abierta sobrevivió una refutación diseñada"
      >
        <P>
          Enumera todas las explicaciones consistentes con el timeline, incluidas las que no te
          favorecen. Para cada una, diseña el experimento más barato que la{" "}
          <em>refutaría</em>, y córrelos del más barato al más caro. La prueba de línea base
          prístina vive aquí: reproduce en un ambiente limpio antes de sospechar de tu propio
          código. Registra las bajas en el ledger — una hipótesis refutada es conocimiento ya
          pagado, y el ledger es lo que evita que el equipo la re-investigue a las 2am.
        </P>
      </Phase>

      <Phase
        n={5}
        name="condenar a la causa"
        question="¿puedes encender y apagar la falla?"
        exit="causa demostrada en ambas direcciones, o degradada explícitamente a «mejor sustentada»"
      >
        <P>
          La hipótesis sobreviviente todavía tiene que ganarse la condena: reintroduce la causa y
          la falla debe volver; quítala y la falla debe desaparecer. Donde puedas, consigue un
          segundo testigo — una herramienta distinta observando la misma falla te dice qué partes
          de la historia son reales. En el incidente de la letra mayúscula, webpack fue el
          segundo testigo que hizo confesar al invariante vago de Turbopack. Si la prueba
          bidireccional es imposible (pasa: data races irreproducibles, cajas negras de
          terceros), dilo en el reporte en lugar de ascender la sospecha a hecho.
        </P>
      </Phase>

      <Phase
        n={6}
        name="intervenir y escribir la autopsia"
        question="¿qué impide la repetición?"
        exit="fix mínimo desplegado, guardia de regresión activa, reporte escrito"
      >
        <P>
          El fix debe ser tan pequeño como la condena lo permita — los arreglos grandes de «ya
          que andamos aquí» contrabandean sospechosos nuevos al siguiente incidente. Agrega la
          guardia que hace ruidosa la regresión (test, alerta, invariante, regla de lint), y
          escribe la autopsia: síntoma, timeline, ledger con sus bajas, evidencia de la condena,
          fix, guardia. Veinte minutos de escritura convierten el incidente de memoria tribal en
          infraestructura. También es, no por casualidad, de donde este blog saca su material.
        </P>
      </Phase>

      <H2>por qué el orden es el método</H2>
      <P>
        Nada en las seis fases es exótico; todo ingeniero senior hace cada pieza a veces. La
        disciplina es la secuencia. Evidencia antes que teorías (1–3) mantiene honesta la
        recolección. Refutación antes que condena (4–5) evita que la voz más fuerte del cuarto
        decida el resultado. Escribir antes de cerrar (6) evita que la organización pague dos
        veces por la misma lección.
      </P>
      <Note>
        Bajo presión no subes a la altura de tu ingenio; caes al nivel de tu procedimiento. Haz
        que el procedimiento sea uno que no pueda engañarse a sí mismo.
      </Note>
    </>
  );
}
