import Link from "next/link";
import { P, H2, Code, Term, Note, UL, LI } from "@/components/prose";

export const meta = {
  slug: "navigation-that-secretly-reloaded",
  title: "La navegación que recargaba en secreto: forense de RSC en Vercel",
  summary:
    "Todas las páginas funcionaban, todos los links navegaban, y cada navegación client-side estaba fallando en silencio con un 404. Un forense sobre la brecha entre 'funciona' y 'hace lo que construiste' — y sobre los bugs que solo existen en el cuerpo de producción, nunca en tu máquina.",
  date: "2026-06-11",
  readingMin: 7,
  tags: ["forense", "next.js", "vercel", "rsc"],
};

export default function Post() {
  return (
    <>
      <H2>síntoma</H2>
      <P>
        Este sitio acababa de estrenar view transitions: navegas entre páginas y los títulos
        hacen morph, el contenido se desvanece suave, cero flash. Se veía increíble en local. Se
        veía increíble en producción también — hasta que la pestaña de Network contó otra
        historia:
      </P>
      <Term title="devtools · network">
{`GET /about?_rsc=6uX5vha9H4xuNaaV     404
GET /work?_rsc=6uX5vha9H4xuNaaV      404
GET /blog/forensic-method?_rsc=...   404
GET /?_rsc=6uX5vha9H4xuNaaV          404`}
      </Term>
      <P>
        Esas peticiones <Code>?_rsc=</Code> son payloads de React Server Components: lo que el
        router de Next.js descarga para navegar client-side en lugar de recargar el documento.
        Todas daban 404. Y sin embargo el sitio navegaba bien. Esa contradicción es el verdadero
        síntoma: cuando una petición que falla no produce una experiencia que falla, algo está
        absorbiendo la falla en silencio.
      </P>
      <P>
        El absorbedor es el fallback del router: cuando el fetch RSC falla, Next.js renuncia a la
        navegación suave y hace una carga completa del documento. Cada click en el sitio era una
        recarga disfrazada. Las páginas renderizaban, los links funcionaban — y las view
        transitions que acababa de publicar jamás corrieron para un solo visitante, porque solo
        existen en navegaciones suaves.
      </P>

      <H2>evidencia</H2>
      <P>
        Un detalle antes de los experimentos: este sitio sirve el inglés sin prefijo y el español
        bajo <Code>/es</Code>, implementado con un rewrite que mapea <Code>/work</Code> al{" "}
        <Code>/en/work</Code> prerenderizado. Tenlo presente. Ahora, a aislar variables:
      </P>
      <Term title="reproducción">
{`curl /about                          -> 200   documento, bien
curl -H "RSC: 1" /about?_rsc=test    -> 404   payload, muerto
curl -H "RSC: 1" /es/about?_rsc=test -> 200   payload, bien (!)
curl -H "RSC: 1" /?_rsc=test         -> 200   payload, bien (!)`}
      </Term>
      <P>
        El patrón es la confesión: las rutas en español (paths reales, sin rewrite de por medio)
        sirven sus payloads. Las rutas en inglés sin prefijo (que solo existen vía el rewrite)
        no. El bug vive en la interacción entre las peticiones RSC y el rewrite de idioma. Un
        experimento más para encontrar el mecanismo:
      </P>
      <Term title="mecanismo">
{`curl /work.rsc     -> 404
curl /es/work.rsc  -> 200
curl /index.rsc    -> 200`}
      </Term>
      <P>
        Ahí está. En Vercel, los payloads RSC prerenderizados se materializan como archivos
        reales con sufijo <Code>.rsc</Code>, y las navegaciones se resuelven contra esos paths.
        Mi rewrite tenía una guarda que excluía cualquier path con punto — el truco estándar para
        que archivos estáticos como <Code>cv.pdf</Code> no entren al mapeo de idioma.{" "}
        <Code>/work.rsc</Code> tiene un punto. El rewrite se hizo a un lado educadamente, y la
        plataforma respondió 404.
      </P>

      <H2>por qué local nunca lo vio</H2>
      <P>
        El sitio se había probado en local contra un build de producción: todas las rutas, ambos
        idiomas, transiciones funcionando a la vista. Nada de eso lo atrapó, porque el sufijo{" "}
        <Code>.rsc</Code> no existe en local. Un servidor de Next.js local negocia las respuestas
        RSC por header sobre la misma URL; la forma de archivo con sufijo es un artefacto del
        build output de Vercel. El bug nació en el empaquetado del deployment — una capa por
        debajo de cualquier cosa que <Code>npm run start</Code> pueda reproducir.
      </P>
      <Note>
        La paridad con local es un espectro, no un booleano. Tu dev server emula al framework; no
        emula aquello en lo que tu plataforma de hosting compila al framework.
      </Note>

      <H2>condenar sin ambiente de staging</H2>
      <P>
        El fix fue un rewrite dedicado: mapear las peticiones <Code>.rsc</Code> sin prefijo a sus
        equivalentes <Code>/en/</Code>, excluyendo los payloads reales en español y los
        internos. Pero probarlo antes de publicar tenía una complicación: los deployments de
        preview de este proyecto están detrás de la autenticación de Vercel, así que no había URL
        pública de staging para hacer curl.
      </P>
      <P>
        La salida es interrogar al artefacto en lugar del ambiente. Next compila cada rewrite a
        un regex dentro de <Code>.next/routes-manifest.json</Code> — el regex exacto que el edge
        va a ejecutar. Lo cargas en Node y pasas por él los diez paths que importan:
      </P>
      <Term title="node · simulación del routes-manifest">
{`/work.rsc                 -> MATCH  dest=/en/work.rsc
/blog/forensic-method.rsc -> MATCH  dest=/en/blog/...
/es.rsc                   -> no match   (el archivo real gana)
/es/work.rsc              -> no match   (el archivo real gana)
/api/cv.rsc               -> no match
/cv.pdf                   -> no match`}
      </Term>
      <P>
        Mismos inputs, mismo motor de regex, mismo resultado que producirá la plataforma. Se
        publicó; producción confirmó: siete endpoints de payload que antes daban 404 ahora en
        200, nueve rutas de regresión intactas, y los títulos con morph por fin actuando frente a
        público.
      </P>

      <H2>epílogo: el fantasma volvió dos veces</H2>
      <P>
        Horas después del fix, los 404 reaparecieron — solo en <Code>/</Code>, solo navegando en
        inglés. Dos hallazgos explicaron el primer regreso. El CDN de Vercel excluye el
        cache-buster <Code>_rsc</Code> de su cache key y varía por headers RSC, así que entradas
        envenenadas pre-fix se seguían sirviendo para combinaciones de headers que mis sondas no
        habían tocado. Y la raíz es especial: Vercel normaliza su path de payload de vuelta a{" "}
        <Code>/</Code> <em>antes</em> de que corran los rewrites del usuario, así que la regla
        del sufijo nunca lo vio, y las peticiones RSC del home recibían un HTML educado, bien
        formado y completamente equivocado. Una segunda regla ruteó la raíz por el propio header{" "}
        <Code>RSC</Code>, directo al archivo de flight data.
      </P>
      <P>
        Y entonces volvió otra vez — en el navegador. Todos los curls que pude componer decían
        200; la consola seguía diciendo 404. El problema era el instrumento: Next.js 16 también
        prefetchea <em>segmentos</em> individuales, marcados con un header{" "}
        <Code>Next-Router-Segment-Prefetch</Code> que solo un navegador real envía, y Vercel los
        resuelve como archivos <Code>/index.segments/*</Code> para la raíz — un tercer lugar
        donde la raíz es especial. La captura que lo destrabó fue un Chromium headless
        programado para registrar los request headers completos de todo lo que fallara; una
        corrida sacó a la luz lo que veinte curls no pudieron. Una tercera regla mapeó los
        archivos de segmentos, y la consola por fin se quedó en silencio.
      </P>

      <H2>lecciones</H2>
      <UL>
        <LI>
          <strong>curl no es un navegador.</strong> Los frameworks hablan consigo mismos con
          headers que tus peticiones hechas a mano no saben que existen. Cuando curl dice 200 y
          la consola dice 404, deja de refinar el curl — programa un navegador real y lee los
          headers de la petición que falla.
        </LI>
      </UL>
      <UL>
        <LI>
          <strong>«Funciona» no es un health check.</strong> La degradación elegante es un regalo
          para los usuarios y una trampa para los operadores: entre mejores tus fallbacks, más
          silenciosas tus fallas. El único testigo de este bug fue la pestaña de Network.
        </LI>
        <LI>
          Los smoke tests que verifican status codes de documentos se pierden clases enteras de
          peticiones. Si tu framework navega vía fetches de payload, prueba el fetch de payload:{" "}
          <Code>curl -H &quot;RSC: 1&quot; /ruta?_rsc=x</Code> ya es parte del checklist
          post-deploy de este sitio.
        </LI>
        <LI>
          Cuando no hay staging, el artefacto de build es evidencia admisible. El manifest de
          rutas compilado es lo que producción ejecuta — simularlo es verificación, no
          adivinanza.
        </LI>
        <LI>
          Los CDNs preservan tus errores: los 404 regresaban con un <Code>Age</Code> de trece
          horas. Los cachés no perdonan; archivan. Un redeploy también es una purga.
        </LI>
      </UL>
      <P>
        Esta es la tercera investigación en este sitio que empezó con alguien diciendo «todo se
        ve bien» — después de{" "}
        <Link
          href="/es/blog/phantom-build-failure"
          className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor"
        >
          la letra mayúscula que mató un build
        </Link>{" "}
        y{" "}
        <Link
          href="/es/blog/forensic-method"
          className="text-phosphor underline decoration-phosphor-dim underline-offset-4 hover:decoration-phosphor"
        >
          el método que atrapa estas cosas
        </Link>
        . El patrón se sostiene: los bugs peligrosos no son los que truenan. Son los que
        funcionan.
      </P>
    </>
  );
}
