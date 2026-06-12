import type { CaseStudy } from "./types";

export const workEs: CaseStudy[] = [
  {
    slug: "enterprise-crm-modernization",
    index: "001",
    name: "Modernización de CRM Enterprise",
    tagline:
      "WinForms legacy + stored procedures → .NET Web API + React, para una gran empresa logística de EE.UU.",
    stamps: ["PRODUCTION", "NDA", "CLIENT"],
    stack: [".NET", "C#", "React", "SQL Server", "LINQ", "Azure DevOps", "LaunchDarkly"],
    period: "2024 — presente",
    keyMetric: "timeouts → sub-segundo",
    situation:
      "Una empresa logística de EE.UU. opera su gestión de clientes sobre una aplicación WinForms con décadas de antigüedad, respaldada por cientos de stored procedures sin documentar. La lógica de negocio existe solo como comportamiento en producción: no hay especificaciones ni autores originales. El mandato: reconstruirla como una plataforma moderna .NET Web API + React sin regresar un solo flujo del que depende el negocio.",
    evidence: [
      {
        metric: "6+ releases trimestrales",
        caption:
          "cadencia sostenida de entrega con ownership de punta a punta: diseño SQL, API, UI en React, soporte de releases",
      },
      {
        metric: "timeouts visibles al usuario",
        caption:
          "pantallas críticas de clientes expiraban con datasets grandes antes de optimizar queries y endpoints",
      },
      {
        metric: "capa de servicios fragmentada",
        caption:
          "capas de auth redundantes y payloads en base64 acumulados tras años de servicios parchados",
      },
    ],
    visuals: [
      {
        src: "/exhibits/crm-redacted",
        title: "~/crm — pantallas de producción",
        caption:
          "Pantallas del cliente reservadas bajo NDA. El trabajo se ve en los números; los screenshots se quedan en casa.",
        width: 2880,
        height: 1800,
        redacted: true,
      },
    ],
    diagnosis:
      "El riesgo nunca fue el stack nuevo: fue el drift silencioso de comportamiento. Los stored procedures legacy codificaban reglas de negocio que nadie podía enumerar. Cada módulo migrado necesitaba que su comportamiento legacy fuera reverse-engineered, caracterizado y probado como equivalente antes de poder retirar la versión WinForms.",
    intervention: [
      "Ingeniería inversa de stored procedures sin documentar y reconstrucción de módulos de gestión de clientes (workflows de aprobación, clasificación, pantallas de facturación y pagos) como APIs .NET + React, con paridad de funcionalidad.",
      "Lideré la migración de stored procedures a LINQ y consolidé servicios fragmentados en una sola experience API, eliminando capas de auth redundantes y overhead de base64.",
      "Optimicé SQL y endpoints de producción: pantallas críticas pasaron de timeouts visibles al usuario a respuestas sub-segundo; resolví fallas recurrentes de cold-start y paginación en datasets grandes.",
      "Líder de soporte de release en ciclos trimestrales: cola de incidentes de producción, cherry-picks de hotfixes a ramas de release, coordinación de aprobación de cambios.",
      "Construí servidores MCP a la medida (Python + Playwright) que extraen tickets del ITSM y generan artefactos de change management, recortando horas de papeleo por ciclo de release.",
      "Definí una metodología forense de investigación en 6 fases (data-first, refutación obligatoria) que hoy se usa para diagnosticar y documentar incidentes de producción.",
    ],
    outcome: [
      { metric: "< 1s", caption: "tiempo de respuesta en pantallas críticas que antes expiraban" },
      { metric: "0 regresiones", caption: "flujos legacy reemplazados con paridad a lo largo de releases" },
      { metric: "horas/release", caption: "ahorradas con papeleo de change management automatizado vía MCP" },
      { metric: "ratio de defectos estable", caption: "a lo largo de releases con revisión obligatoria por pares + IA" },
    ],
    annotation:
      "Identificadores del cliente e internos reservados bajo NDA. Alcance y resultados tal como aparecen publicados en mi CV.",
  },
  {
    slug: "el-carril",
    index: "002",
    name: "el-carril",
    tagline:
      "Plataforma de apuestas con dinero real para carreras parejeras en México — wallet, ledger, eventos en vivo",
    stamps: ["PRODUCTION", "PERSONAL"],
    stack: ["NestJS", "Prisma", "PostgreSQL", "Redis", "React", "k6"],
    period: "2025 — presente",
    url: "https://elcarrilmx.com",
    keyMetric: "ledger de doble partida, 0 violaciones de invariantes",
    situation:
      "Las apuestas parejeras en México corren sobre efectivo, libretas y confianza. Diseñé y construí una plataforma que mueve dinero real entre personas reales: depósitos, empate de apuestas, liquidación, retiros. En un sistema así, un error de redondeo no es un bug: es el dinero de alguien.",
    evidence: [
      {
        metric: "los floats están prohibidos",
        caption:
          "todo valor monetario es Decimal/NUMERIC de punta a punta; las fronteras de serialización se auditan por pérdida de precisión",
      },
      {
        metric: "una sola ruta de escritura",
        caption:
          "un único LedgerService es dueño de toda mutación de saldo; ningún otro código puede tocar dinero",
      },
      {
        metric: "spike: 200 VUs",
        caption:
          "pruebas de carga con k6 sobre datos con forma de producción encontraron el techo de CPU en el hashing de contraseñas (argon2), no en el ledger",
      },
    ],
    visuals: [
      {
        src: "/exhibits/el-carril-home.webp",
        title: "elcarrilmx.com — cartelera del día, libro abierto",
        caption:
          "La cartelera en vivo: apuestas entre apostadores, sin banca contraria — cada postura publicada viene de otro apostador.",
        width: 2880,
        height: 1800,
      },
      {
        src: "/exhibits/el-carril-mobile.webp",
        title: "elcarrilmx.com — móvil",
        caption: "El mismo libro, a la medida del rancho: la mayoría sigue las carreras desde el teléfono.",
        width: 780,
        height: 1688,
      },
    ],
    diagnosis:
      "La integridad financiera no puede ser una convención de code review; tiene que ser estructural. El diseño hace irrepresentable el manejo incorrecto de dinero: ledger append-only, claves de idempotencia en cada mutación, aislamiento serializable en la liquidación, y snapshots de saldo recomputables desde el ledger en cualquier momento.",
    intervention: [
      "Ledger de doble partida, append-only, sobre PostgreSQL con transacciones serializables para liquidación y claves de idempotencia en cada mutación de dinero.",
      "El admin no puede otorgar saldo por diseño: la única entrada de dinero es un depósito con comprobante verificado — un invariante, no una política.",
      "Audit log acotado a lo que importa (movimientos de dinero, resultados de carreras, cambios de identidad), particionado por mes con archivado en almacenamiento frío, tras costear el enfoque ingenuo de loguearlo todo.",
      "Pruebas de carga con k6 sobre un dataset con forma de producción usando un runbook de backup → preparación → throttle off → prueba → restauración; establecí un techo de capacidad (~100 VUs sostenidos en la infra actual) y la ruta de upgrade para superarlo.",
      "Redis para sesiones y caché de hot paths; rate limiting en endpoints de auth y dinero.",
    ],
    outcome: [
      { metric: "100% reconciliable", caption: "saldos recomputables desde el ledger en cualquier punto del tiempo" },
      { metric: "~100 VUs", caption: "carga sostenida en infra mínima, con techo medido (no adivinado)" },
      { metric: "argon2", caption: "identificado como el verdadero cuello de botella de CPU vía forense de carga, no por suposición" },
    ],
    annotation:
      "La línea de código más valiosa de este proyecto es la que hace imposible que el admin regale saldo.",
  },
  {
    slug: "viridental",
    index: "003",
    name: "Viridental",
    tagline:
      "Sistema de gestión clínica para un consultorio dental — odontograma, periodoncia, expedientes de pacientes",
    stamps: ["LIVE", "CLIENT"],
    stack: ["NestJS", "Prisma", "PostgreSQL", "React", "PWA"],
    period: "2025 — presente",
    keyMetric: "clasificación AAP/EFP 2018, digitalizada",
    situation:
      "Un consultorio dental (Dra. Viridiana Ochoa) llevaba sus registros clínicos en papel: odontogramas dibujados a mano, estadificación periodontal consultada en tablas impresas, historial de pacientes en folders. El objetivo era un sistema que una dentista realmente use junto al sillón, no un software genérico de administración de consultorios.",
    evidence: [
      {
        metric: "AAP/EFP 2018",
        caption:
          "las tablas oficiales de estadios/grados de periodontitis y clasificación de gingivitis, codificadas como el modelo de dominio",
      },
      {
        metric: "junto al sillón = tablet",
        caption: "PWA instalada en la tablet del consultorio; tolerante a offline, interacciones touch-first",
      },
    ],
    diagnosis:
      "El software clínico fracasa cuando digitaliza formularios en lugar de razonamiento clínico. La clasificación periodontal es un procedimiento de decisión (pérdida ósea, pérdida dental, factores de complejidad → estadio; tasa de progresión, factores de riesgo → grado), así que el sistema debe calcularla desde los hallazgos, no pedirle a la dentista que llene un dropdown.",
    intervention: [
      "Odontograma interactivo como superficie principal de navegación: condiciones y tratamientos se registran directamente sobre los dientes.",
      "Módulo periodontal que deriva estadio y grado desde los hallazgos clínicos registrados, siguiendo las tablas oficiales AAP/EFP 2018 que la doctora ya usaba en papel.",
      "Timeline del paciente que unifica tratamientos, pagos y notas clínicas; backend NestJS + Prisma + PostgreSQL con acceso basado en roles.",
      "Construido como PWA para que la tablet del consultorio lo corra como app nativa, sin la fricción de una app store.",
    ],
    outcome: [
      { metric: "papel → 0", caption: "registros clínicos totalmente digitales para pacientes nuevos" },
      { metric: "estadificación calculada", caption: "clasificación periodontal derivada de hallazgos, no transcrita" },
    ],
  },
  {
    slug: "mikeas-movement",
    index: "004",
    name: "MIKEAS Movement",
    tagline: "Ecommerce D2C para una marca mexicana de ropa lifestyle — storefront, checkout, admin",
    stamps: ["PRODUCTION", "CLIENT"],
    stack: ["Next.js 15", "TypeScript", "PostgreSQL", "Playwright", "Vitest"],
    period: "2025 — presente",
    url: "https://www.mikeasmovement.com",
    keyMetric: "E2E en 3 dispositivos antes de cada release",
    situation:
      "Una marca mexicana de ropa que vende directo al consumidor necesitaba storefront y back office construidos desde cero: catálogo, carrito, checkout, gestión de pedidos, analítica. La mayoría de su tráfico es móvil, así que móvil es el objetivo de diseño, no una ocurrencia tardía.",
    evidence: [
      {
        metric: "mobile-first, obligatorio",
        caption: "storefront y admin se diseñan primero a ancho de teléfono, desde el primer mock",
      },
      {
        metric: "cookies/CORS/touch",
        caption:
          "las clases de bugs que los unit tests no pueden atrapar — la razón por la que cada módulo sale con E2E multi-dispositivo",
      },
    ],
    visuals: [
      {
        src: "/exhibits/mikeas-home.webp",
        title: "mikeasmovement.com — storefront",
        caption: "El storefront carga la marca: ropa minimalista, lienzo minimalista.",
        width: 2880,
        height: 1800,
      },
      {
        src: "/exhibits/mikeas-mobile.webp",
        title: "mikeasmovement.com — móvil",
        caption:
          "El viewport que realmente vende: diseñado primero a ancho de teléfono, donde vive la mayoría del tráfico.",
        width: 780,
        height: 1688,
      },
    ],
    diagnosis:
      "La calidad en ecommerce es una propiedad de integración: un checkout que pasa unit tests puede seguir perdiendo carritos por una cookie mal configurada en Safari de iOS. La disciplina que importa es probar el flujo completo en los dispositivos que los clientes realmente usan, antes de que algo llegue a producción.",
    intervention: [
      "Build full-stack en Next.js 15: storefront, flujos de carrito y checkout, y un admin dashboard con shadcn charts para analítica de ventas.",
      "Pirámide de tests por módulo: suites de integración con Vitest más E2E con Playwright cubriendo el golden path y casos límite en viewports de desktop, iPad y iPhone.",
      "Compuerta de release: la suite E2E corre contra la API + base de datos local antes de cualquier push, porque un push deploya a producción.",
      "Admin y storefront comparten design system; el comportamiento responsive se revisa en cada breakpoint como parte de la definición de terminado.",
    ],
    outcome: [
      { metric: "3 dispositivos", caption: "desktop, iPad, iPhone — cada módulo probado E2E antes del release" },
      { metric: "push = prod", caption: "el trunk deploya con seguridad porque la compuerta de release no es negociable" },
    ],
  },
  {
    slug: "be-all",
    index: "005",
    name: "Be All",
    tagline:
      "Plataforma híbrida de aprendizaje + comercio — cursos, webinars, productos físicos y digitales, un solo checkout",
    stamps: ["PRODUCTION", "CLIENT"],
    stack: ["Next.js 14", "MySQL", "Prisma", "Stripe", "Clerk", "Claude API"],
    period: "2024 — presente",
    url: "https://www.beallfam.com",
    keyMetric: "31 modelos · 84 rutas de API",
    situation:
      "Un negocio educativo en español necesitaba vender lo que la mayoría de las plataformas te obligan a repartir en tres herramientas: cursos en video, webinars en vivo, y productos físicos y digitales — además de manejar pagos, reembolsos y envíos para el mercado mexicano. La respuesta típica es un LMS pegado a una tienda pegada a una herramienta de eventos, con tres checkouts y tres paneles de admin. El encargo: una plataforma, un checkout, un back office.",
    evidence: [
      {
        metric: "31 modelos de Prisma",
        caption:
          "cursos con capítulos y progreso, webinars con cupo y precio early-bird, productos con inventario, órdenes unificadas",
      },
      {
        metric: "84 rutas de API",
        caption:
          "cubriendo 16+ dominios: checkout, reembolsos, cupones, analítica, envíos, notificaciones, admin",
      },
      {
        metric: "tres ciclos de compra",
        caption:
          "un curso, un asiento de webinar y una playera se venden, reembolsan y contabilizan distinto — pero el negocio necesita un solo registro de órdenes",
      },
    ],
    visuals: [
      {
        src: "/exhibits/be-all-home.webp",
        title: "beallfam.com — landing",
        caption:
          "Una sola tienda para tres verticales: cursos, webinars y productos detrás de un mismo checkout.",
        width: 2880,
        height: 1800,
      },
      {
        src: "/exhibits/be-all-mobile.webp",
        title: "beallfam.com — móvil",
        caption: "El mismo catálogo en el dispositivo donde la audiencia realmente se inscribe.",
        width: 780,
        height: 1688,
      },
    ],
    diagnosis:
      "El comercio híbrido fracasa cuando cada vertical desarrolla su propio pipeline de compra: los reembolsos y los reportes se fragmentan hasta que nadie puede responder '¿cuánto vendimos este mes?'. La arquitectura tenía que compartir un núcleo de órdenes, reembolsos y cupones entre verticales, dejando que cada una conserve su lógica de dominio — progreso para cursos, cupo para webinars, inventario para productos físicos.",
    intervention: [
      "Sistema de órdenes unificado sobre Stripe Checkout con fulfillment manejado por webhooks: los cursos se desbloquean, los productos digitales se entregan y las órdenes físicas entran a envío — todo desde un solo evento de pago.",
      "Motor de reembolsos con máquina de estados real (pendiente → revisión → aprobado → procesando → completado), servicio de auto-aprobación por políticas configurables, audit log por estado, y liberación de asientos de webinar al reembolsar.",
      "Sistema de cupones con descuentos por porcentaje, monto fijo y envío gratis, límites por usuario, targeting por categoría y rastro de auditoría completo (precio original, precio final, IP).",
      "Núcleo de LMS: cursos en video por capítulos con progreso por usuario; webinars con ventanas early-bird, cupos y notificaciones de reagendado; reseñas de productos con workflow de aprobación.",
      "Consultor de analítica con IA: un dashboard impulsado por Claude que lee métricas de ingresos, reembolsos y categorías a 30 días y responde preguntas sobre ellas, con exportación a Excel y PDF.",
      "Flujos de email transaccional para cada tipo de compra, más dashboards de admin para órdenes, reembolsos y equipo.",
    ],
    outcome: [
      { metric: "1 checkout", caption: "para tres verticales de producto con reglas distintas de fulfillment y reembolso" },
      { metric: "reembolsos auto-resueltos", caption: "el motor de políticas aprueba los casos rutinarios; los humanos solo ven las excepciones" },
      { metric: "en producción", caption: "vivo en beallfam.com sirviendo a un mercado hispanohablante" },
    ],
  },
];
