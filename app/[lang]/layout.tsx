import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/site";
import { LANGS, isLang, langAlternates, t, type Lang } from "@/lib/i18n";
import "../globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const descriptions: Record<Lang, string> = {
  en: SITE.description,
  es: "Ingeniero full-stack senior (8+ años). Tomo sistemas legacy que nadie entiende y los modernizo sin regresiones — .NET, React, SQL — y construyo servidores MCP y agentes de IA que hacen trabajo real de producción.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: SITE.title,
      template: `%s — ${SITE.name}`,
    },
    description: descriptions[lang],
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    alternates: langAlternates(lang, "/"),
    openGraph: {
      type: "website",
      url: SITE.url,
      siteName: SITE.name,
      title: SITE.title,
      description: descriptions[lang],
      locale: lang === "en" ? "en_US" : "es_MX",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.title,
      description: descriptions[lang],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0d0b",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Senior Software Engineer",
  knowsAbout: [...SITE.keywords],
  sameAs: [SITE.linkedin, SITE.github],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={`${plexMono.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="crt flex min-h-full flex-col overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:bg-phosphor focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
        >
          {t(lang).a11y.skip}
        </a>
        <Header lang={lang} />
        <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
          <ViewTransition enter="page-enter" exit="page-exit">
            {children}
          </ViewTransition>
        </main>
        <Footer lang={lang} />
        {/* the insights endpoint only exists on Vercel deployments */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
