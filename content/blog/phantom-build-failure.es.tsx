import { P, H2, Code, Term, Note, UL, LI } from "@/components/prose";

export const meta = {
  slug: "phantom-build-failure",
  title: "El build fantasma: cuando una mayúscula tira tu build de Next.js",
  summary:
    "Todas las páginas de un sitio completamente estático fallaron al prerenderizar con un invariante que culpaba al propio Next.js. El framework era inocente. Un recorrido forense refutando a los sospechosos obvios hasta que un solo carácter confesó.",
  date: "2026-06-11",
  readingMin: 6,
  tags: ["forense", "next.js", "windows", "debugging"],
};

export default function Post() {
  return (
    <>
      <H2>síntoma</H2>
      <P>
        Un sitio recién creado en Next.js 16 — completamente estático, sin base de datos,
        dieciséis rutas — compiló limpio, pasó el type-check limpio, y murió durante el
        prerender. No una página intermitente: todas y cada una, incluyendo{" "}
        <Code>/_not-found</Code> y <Code>/_global-error</Code>, páginas que yo nunca escribí.
      </P>
      <Term title="next build">
{`Error occurred prerendering page "/_not-found".
Error [InvariantError]: Invariant: Expected workStore
to be initialized. This is a bug in Next.js.`}
      </Term>
      <P>
        Nota la última frase. El propio mensaje de error testifica que la culpa es del framework.
        Guarda ese pensamiento, porque la primera regla del forense de incidentes es que las
        confesiones ofrecidas tan temprano casi siempre son distracción.
      </P>

      <H2>evidencia</H2>
      <UL>
        <LI>
          El dev server renderizaba las dieciséis rutas perfectamente. Solo el build de
          producción moría.
        </LI>
        <LI>
          La falla era total, no parcial: las páginas generadas por el framework fallaban junto a
          las mías, lo que significa que el detonante estaba por debajo de mi código de
          aplicación.
        </LI>
        <LI>
          El chunk que fallaba tenía el mismo hash de contenido en cada experimento que siguió —
          un detalle que parecía irrelevante hasta que dejó de serlo.
        </LI>
      </UL>

      <H2>refutaciones</H2>
      <P>
        Data-first, refutación obligatoria: cada hipótesis se gana un experimento controlado, y
        el trabajo del experimento es matar la hipótesis, no halagarla.
      </P>
      <UL>
        <LI>
          <strong>«Mi código lo rompió.»</strong> Hice stash de todo y compilé el scaffold
          prístino de <Code>create-next-app</Code>. Falló idéntico. Mi código quedó absuelto.
        </LI>
        <LI>
          <strong>«La versión de Next.js tiene un bug.»</strong> Bajé un patch release. Falla
          idéntica, hash de chunk idéntico.
        </LI>
        <LI>
          <strong>«El runtime de Node es el problema.»</strong> El invariante huele a{" "}
          <Code>AsyncLocalStorage</Code> perdiendo contexto, que es territorio del runtime. Cambié
          de Node 20 a Node 24. Falla idéntica.
        </LI>
      </UL>
      <P>
        Tres sospechosos interrogados, tres coartadas confirmadas. Cuando toda explicación
        razonable queda refutada, la causa es algo que todavía no se te ocurre variar.
      </P>

      <H2>la pista</H2>
      <P>
        Next 16 todavía trae una salida de emergencia con webpack. El mismo build por un bundler
        distinto — no porque webpack fuera a arreglar nada, sino porque un segundo testigo
        describe el mismo crimen de otra manera. El testimonio de webpack:
      </P>
      <Term title="next build --webpack">
{`There are multiple modules with names that only
differ in casing.
 * C:\\...\\Desktop\\Dev\\portfolio\\node_modules\\next\\...
 * C:\\...\\Desktop\\dev\\portfolio\\node_modules\\next\\...`}
      </Term>
      <P>
        Ahí está. <Code>Dev</Code> y <Code>dev</Code>. La carpeta en disco lleva mayúscula; la
        sesión de la terminal había estado navegando con la ruta en minúsculas. El filesystem de
        Windows es case-insensitive, así que ambas grafías resuelven a los mismos bytes — pero el
        registro de módulos de Node indexa por el <em>string</em> de la ruta, y los strings sí
        distinguen mayúsculas.
      </P>

      <H2>causa raíz</H2>
      <P>
        Cada módulo importado por la ruta en minúsculas y el mismo módulo importado por la ruta
        con mayúscula se volvieron dos instancias separadas. Eso incluye el módulo que contiene
        el <Code>workAsyncStorage</Code> de Next.js — el AsyncLocalStorage que transporta el
        contexto de render. El build escribió el store en una copia y lo leyó de la otra. La
        lectura regresó vacía, y Next reportó, con total sinceridad, un bug en sí mismo.
      </P>
      <Note>
        El invariante no mentía; tenía mal el alcance. Era un bug en el proceso de Next.js —
        inyectado por un solo carácter de mi working directory.
      </Note>

      <H2>intervención</H2>
      <P>
        Una línea: <Code>Set-Location C:\...\Desktop\Dev\portfolio</Code> con la grafía exacta
        del disco antes de compilar. Dieciséis de dieciséis páginas prerenderizadas. Costo total
        del defecto: una letra mayúscula. Costo total de encontrarlo sin un método: ilimitado.
      </P>

      <H2>lecciones</H2>
      <UL>
        <LI>
          Los mensajes de error asignan culpas adivinando. Trata «esto es un bug en X» como una
          afirmación por verificar, no como un veredicto que aceptar.
        </LI>
        <LI>
          Reproduce sobre una línea base prístina antes de tocar tu propio código. Es el
          experimento más barato con el mayor rendimiento de información.
        </LI>
        <LI>
          Cuando una herramienta es opaca, corre la misma operación por una herramienta hermana.
          Dos renderizados distintos de la misma falla triangulan la causa.
        </LI>
        <LI>
          Filesystems case-insensitive con runtimes case-sensitive son un peligro permanente en
          Windows y macOS. Si aparece rareza de identidad de módulos — singletons duplicados,
          contexto perdido, React doble — audita primero la grafía de tus rutas.
        </LI>
      </UL>
    </>
  );
}
