import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Archivo } from "next/font/google";
import { SITE } from "@/lib/content";
import { LinguaProvider } from "@/lib/useLingua";
import "./globals.css";

/* I due caratteri del sito, stile editoriale (Vogue / The
   Gentlewoman). Bodoni Moda è una didone variabile: teniamo
   anche l'asse "opsz" (corpo ottico) perché ai pesi grandi da
   copertina, opsz basso ispessisce le aste sottili — è il fix di
   leggibilità richiesto dal brief. Archivo è il neogrotesco per
   corpo testo e micro-tipografia (kicker, didascalie).
   VUOI CAMBIARE FONT? Sostituisci l'import e il nome qui sotto:
   il resto del sito legge le variabili CSS, non il font. */
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
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
  themeColor: "#111111",
};

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITO),
  title: SITE.nome,
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
    <html lang="en" className={`${bodoniModa.variable} ${archivo.variable}`}>
      <body className="grana bg-carta antialiased">
        <LinguaProvider>{children}</LinguaProvider>
      </body>
    </html>
  );
}
