import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Turbopack schreibt seit Next 16.3 beim Build einen Dateisystem-Cache
    // (.next/cache/turbopack) und legt darin auch die WERTE gelesener
    // Umgebungsvariablen ab — dort landete z. B. RESEND_API_KEY, obwohl er
    // nur zur Laufzeit serverseitig gelesen wird (lib/actions/contact.ts) und
    // nie in Client- oder Server-Bundles steckt. Netlifys Secret-Scanner
    // meldete den Wert deshalb im Cache. Ohne Build-Cache entsteht dieser
    // Fundort gar nicht; die Builds werden lediglich etwas langsamer.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
