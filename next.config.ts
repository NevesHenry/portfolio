import type { NextConfig } from "next";
import { legacyHosts, siteUrl } from "./src/lib/site";

const nextConfig: NextConfig = {
  // The older generated *.vercel.app alias serves this same deployment. Without
  // a redirect every page exists at two addresses, and search engines split
  // ranking between the copies. Preview deployments use other hosts, so they
  // are untouched.
  async redirects() {
    return legacyHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${siteUrl}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
