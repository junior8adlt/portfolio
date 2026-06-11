import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    // English is canonical at the root; /en/* would be duplicate content.
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    // English lives unprefixed (URLs stay stable); Spanish under /es.
    return [
      {
        // Root RSC payload: Vercel normalizes the path back to `/` before user
        // rewrites run, so route by the RSC header straight to the flight file.
        source: "/",
        has: [{ type: "header", key: "rsc" }],
        destination: "/en.rsc",
      },
      { source: "/", destination: "/en" },
      {
        // RSC payloads: on Vercel, client navigations request `<path>.rsc`,
        // which the dot-exclusion below would otherwise skip (-> 404, breaking
        // SPA navigation and view transitions in production).
        source: "/:path((?!es(?:/|\\.rsc)|api/|_next/|_vercel/).*)\\.rsc",
        destination: "/en/:path.rsc",
      },
      {
        source:
          "/:path((?!es$|es/|api/|_next/|_vercel/|opengraph-image|llms\\.txt|.*\\..*).*)",
        destination: "/en/:path",
      },
    ];
  },
};

export default nextConfig;
