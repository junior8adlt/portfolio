import Link from "next/link";
import { P, H2, Code, Term, Note, UL, LI } from "@/components/prose";
import { ZombieSim } from "@/components/zombie-sim";

export const meta = {
  slug: "zombie-on-port-3000",
  title: "El zombi del puerto 3000: un reinicio que nunca ocurrió",
  summary:
    "Un build verde, un server recién 'reiniciado' y todas las rutas respondiendo 404. Nadie había roto nada — estábamos interrogando a un cadáver. Un forense corto sobre procesos huérfanos, y por qué 'ya lo reinicié' es una afirmación que necesita evidencia.",
  date: "2026-06-11",
  readingMin: 4,
  tags: ["forense", "node.js", "local-dev", "debugging"],
};

export default function Post() {
  return (
    <>
      <H2>síntoma</H2>
      <P>
        Server de producción local, minutos después de un build limpio: todas las rutas —
        páginas que existían, páginas que no, hasta las rutas de imágenes — respondían 404. El
        log del server repetía una sola línea, sin ayudar en nada:
      </P>
      <Term title="next start (log)">
{`✓ Ready in 154ms
Error: Internal: NoFallbackError
Error: Internal: NoFallbackError
Error: Internal: NoFallbackError`}
      </Term>
      <P>
        El mismo commit estaba sirviendo producción sin un solo error en ese preciso momento.
        Así que el código era inocente, el build era inocente, y aún así localhost era una pared
        de 404s. Cuando el mismo artefacto se comporta distinto en dos lugares, deja de leer el
        artefacto y empieza a leer los <em>procesos</em>.
      </P>

      <H2>evidencia</H2>
      <UL>
        <LI>
          El server se había &quot;reiniciado&quot; momentos antes — su supervisor incluso había
          reportado muerto al anterior.
        </LI>
        <LI>
          Entre el arranque viejo y la falla, el directorio <Code>.next</Code> se había borrado y
          reconstruido dos veces — mientras algo seguía agarrándolo.
        </LI>
        <LI>
          La pistola humeante llegó cuando por fin se leyó completo el log del server
          &quot;nuevo&quot;:
        </LI>
      </UL>
      <Term title="el log del server 'reiniciado'">
{`Error: listen EADDRINUSE: address already in use :::3000
  code: 'EADDRINUSE',
  syscall: 'listen',
  port: 3000`}
      </Term>

      <H2>causa raíz</H2>
      <P>
        El reinicio nunca ocurrió. El proceso viejo de Node sobrevivió a su supervisor — el
        wrapper de la tarea murió, el proceso no — y se quedó ocupando el puerto 3000. Cada
        server &quot;nuevo&quot; desde entonces nacía, encontraba el puerto tomado, imprimía{" "}
        <Code>EADDRINUSE</Code> en un log que nadie leyó, y moría. Mientras tanto, al ocupante le
        habían reconstruido el <Code>.next</Code> por debajo dos veces: sus manifests de rutas en
        memoria apuntaban a archivos que ya no existían, lo que Next reporta como{" "}
        <Code>NoFallbackError</Code> y un 404 para absolutamente todo.
      </P>
      <P>
        Un zombi: muerto para su supervisor, vivo para el sistema operativo, y contestando
        peticiones con la tabla de rutas de un build que se había borrado media hora antes.
      </P>

      <H2>la escena del crimen, recreada</H2>
      <P>
        Las palabras llegan hasta donde llegan. Abajo está el incidente mismo, no-muerto e
        interactivo: intenta reiniciar el server y mira la mentira ocurrir en tiempo real. El
        zombi solo cae de una manera.
      </P>
      <ZombieSim lang="es" />

      <H2>intervención</H2>
      <P>
        Pregúntale al OS — el único testigo que no miente sobre procesos — quién es realmente el
        dueño del puerto, mata ese PID, y arranca limpio:
      </P>
      <Term title="powershell">
{`Get-NetTCPConnection -LocalPort 3000 -State Listen
  | Select -Expand OwningProcess | Stop-Process -Force
npm run start   # enlaza, sirve 200s`}
      </Term>

      <H2>lecciones</H2>
      <UL>
        <LI>
          <strong>«Reiniciado» es una afirmación, no un hecho.</strong> La prueba es que el PID
          dueño del puerto haya cambiado — no el reporte del supervisor, ni la ausencia de un
          error que no bajaste a leer.
        </LI>
        <LI>
          Nunca reconstruyas artefactos debajo de un proceso vivo. Un server leyendo{" "}
          <Code>.next</Code> mientras lo reemplazas entra a un estado que nadie probó: ni el
          build viejo, ni el nuevo, sino una quimera de ambos.
        </LI>
        <LI>
          Los supervisores y task managers rastrean a sus hijos, no la verdad. Los procesos se
          quedan huérfanos; la tabla de puertos del OS es el registro oficial.
        </LI>
        <LI>
          Este es el primo callado de{" "}
          <Link
            href="/es/blog/navigation-that-secretly-reloaded"
            className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor"
          >
            el bug que funcionaba
          </Link>
          : el zombi no tronó, no gritó, no se murió. Solo siguió contestando 404 educadamente —
          y el error que lo explicaba todo estaba sin leer en el log de un proceso que vivió dos
          segundos.
        </LI>
      </UL>
      <Note>
        La línea más peligrosa de un log es la que crees que imprimió el proceso que está
        corriendo — pero la escribió uno que ya había fallado al arrancar.
      </Note>
    </>
  );
}
