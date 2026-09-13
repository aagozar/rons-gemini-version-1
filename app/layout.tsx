import type { Metadata, Viewport } from "next";
import { Syne, Inter_Tight } from "next/font/google";
import { SITE } from "@/lib/content";
import "./globals.css";

/* I due caratteri del sito. Syne 700/800 è il display largo e
   spigoloso; Inter Tight regge il corpo del testo.
   VUOI CAMBIARE FONT? Sostituisci l'import e il nome qui sotto:
   il resto del sito legge le variabili CSS, non il font. */
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

/* L'indirizzo pubblico del sito. Serve a Next per costruire il link
   assoluto dell'immagine di anteprima quando condividi la pagina.
   Su Vercel: Settings → Environment Variables → NEXT_PUBLIC_SITE_URL
   con il tuo dominio. Senza, resta il valore qui sotto. */
const URL_SITO =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ronsgemini.vercel.app";

/* themeColor va nell'export viewport, non in metadata: è il colore
   della barra del browser su Android e su iOS. */
export const viewport: Viewport = {
  themeColor: "#050A06",
};

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITO),
  title: `${SITE.nome} — chitarre suonate e costruite a mano`,
  description: SITE.sottotitolo,
  openGraph: {
    title: SITE.nome,
    description: SITE.sottotitolo,
    /* Per ora uso la foto live. QUANDO AVRAI UN'ANTEPRIMA
       DEDICATA (1200×630 px, con il tuo nome sopra) mettila qui:
       è l'immagine che si vede quando condividi il link su
       WhatsApp o Facebook. */
    images: [SITE.heroImmagine],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${syne.variable} ${interTight.variable}`}>
      <body className="grana bg-palco antialiased">{children}</body>
    </html>
  );
}
