import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Le immagini stanno tutte in /public, quindi non serve
     configurare domini esterni. SE UN GIORNO CARICHI LE FOTO SU UN
     SERVIZIO ESTERNO, i domini vanno dichiarati qui dentro
     images.remotePatterns, altrimenti next/image le rifiuta. */

  /* Data del build, letta da lib/useOggi.ts come punto di partenza
     comune a server e browser per calcolare il prossimo evento. */
  env: {
    NEXT_PUBLIC_DATA_BUILD: new Date().toISOString(),
  },
};

export default nextConfig;
