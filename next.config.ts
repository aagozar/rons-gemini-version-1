import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Le immagini stanno tutte in /public, quindi non serve
     configurare domini esterni. SE UN GIORNO CARICHI LE FOTO SU UN
     SERVIZIO ESTERNO, i domini vanno dichiarati qui dentro
     images.remotePatterns, altrimenti next/image le rifiuta. */
};

export default nextConfig;
