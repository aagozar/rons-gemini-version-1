"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Anima } from "@/lib/content";
import type { Dizionario } from "@/lib/dizionario";
import { DUR, EASE_OUT, VIEWPORT, riseUp, stagger } from "@/lib/motion";
import NavBar from "@/components/NavBar";
import Folio from "@/components/Folio";
import { useLingua } from "@/lib/useLingua";

/* Un "blocco" del corpo dell'articolo: paragrafo, citazione in
   evidenza o foto. Costruito una volta sola da paragrafi/pullQuote/
   immaginiArticolo, così il JSX sotto si limita a leggerlo. */
type Blocco =
  | { tipo: "testo"; contenuto: string }
  | { tipo: "citazione"; contenuto: string }
  | { tipo: "immagine"; src: string; didascalia?: string };

/* Il primo paragrafo resta nella colonna con capolettera accanto
   ai numeri strumento (vedi sotto): qui si costruisce solo il
   "resto" del racconto — gli altri paragrafi, ciascuno seguito
   dalla propria foto quando c'è, con la citazione inserita a
   metà per spezzare il ritmo. Se un mestiere non ha ancora un
   racconto esteso (solo "testo", niente "paragrafi"), il risultato
   è semplicemente vuoto e la pagina resta come prima. */
function costruisciResto(anima: Anima, testi: Dizionario["anime"]["musica"]): Blocco[] {
  const restoParagrafi = (testi.paragrafi ?? []).slice(1);
  const blocchi: Blocco[] = [];

  restoParagrafi.forEach((paragrafo, i) => {
    blocchi.push({ tipo: "testo", contenuto: paragrafo });
    const src = anima.immaginiArticolo[i];
    if (src) {
      blocchi.push({ tipo: "immagine", src, didascalia: testi.didascalieArticolo?.[i] });
    }
  });

  if (testi.pullQuote) {
    blocchi.splice(Math.ceil(blocchi.length / 2), 0, {
      tipo: "citazione",
      contenuto: testi.pullQuote,
    });
  }

  return blocchi;
}

/* ============================================================
   PAGINA DEDICATA (Musica / Liuteria)
   ------------------------------------------------------------
   Stesso linguaggio editoriale dello spread sulla home (vedi
   TreAnime.tsx): copertina propria in cima, poi il racconto vero
   e proprio, come un articolo di rivista — non solo una scheda.
   Il primo paragrafo apre con capolettera accanto ai numeri
   strumento e alla call to action; il resto del racconto scorre
   sotto, foto e citazione a spezzare il testo. Ogni mestiere ha
   una pagina intera, utile per condividere il link diretto a
   "Musica" o "Liuteria" da sole.
   ============================================================ */
export default function PaginaMestiere({
  anima,
  numero,
  altro,
}: {
  anima: Anima;
  numero: string;
  altro: { id: "musica" | "liuteria"; href: string };
}) {
  const riduciMovimento = useReducedMotion();
  const { t } = useLingua();
  const testi = t.anime[anima.id];
  const primoParagrafo = testi.paragrafi?.[0] ?? testi.testo;
  const resto = costruisciResto(anima, testi);

  return (
    <>
      <NavBar />

      <main className="relative bg-carta">
        {/* ---------- COPERTINA DELLA PAGINA ---------- */}
        <section
          className="relative h-[70svh] min-h-[460px] w-full overflow-hidden bg-inchiostro"
          aria-label={testi.titolo}
        >
          <div className="absolute inset-0">
            {anima.daFare ? (
              <div className="h-full w-full bg-inchiostro" />
            ) : anima.tipo === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={anima.poster}
                className="h-full w-full object-cover grayscale"
              >
                <source src={anima.media} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={anima.media}
                alt={`${testi.titolo} — ${testi.occhiello}`}
                fill
                priority
                sizes="100vw"
                className="object-cover grayscale"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-inchiostro/60" aria-hidden />

          <motion.div
            initial={riduciMovimento ? undefined : { opacity: 0, y: 24 }}
            animate={riduciMovimento ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE_OUT }}
            className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 pt-28 sm:px-10 sm:pb-16 sm:pt-32 lg:px-16"
          >
            <Link
              href="/"
              className="kicker w-fit text-carta/60 transition-colors duration-200 hover:text-carta"
            >
              {t.paginaMestiere.home}
            </Link>
            <p className="kicker mt-6 text-carta/70">{testi.occhiello}</p>
            <h1 className="display-cover mt-3 text-carta text-[clamp(2.75rem,10vw,7.5rem)]">
              {testi.titolo}
            </h1>
          </motion.div>
        </section>

        {/* ---------- CONTENUTO ---------- */}
        <motion.section
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative border-t px-6 py-24 hairline bg-carta sm:px-10 lg:px-16 lg:py-32"
        >
          <Folio numero={numero} />

          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-x-16 2xl:max-w-7xl">
            <motion.p
              variants={riseUp}
              className="dropcap max-w-[60ch] text-[15px] leading-[1.75] text-inchiostro/80 lg:col-span-7"
            >
              {primoParagrafo}
            </motion.p>

            <motion.div variants={riseUp} className="lg:col-span-5">
              {testi.dettagli.length > 0 && (
                <ol className="space-y-3 border-t hairline pt-6">
                  {testi.dettagli.map((voce, i) => (
                    <li key={voce} className="flex items-baseline gap-4">
                      <span className="folio text-inchiostro/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-inchiostro/80">{voce}</span>
                    </li>
                  ))}
                </ol>
              )}

              <a
                href={anima.cta.href}
                className="mt-8 inline-block border-b hairline pb-1 text-xs font-medium uppercase tracking-[0.2em] text-inchiostro transition-colors duration-200 hover:border-inchiostro"
              >
                {testi.ctaLabel}
              </a>
            </motion.div>
          </div>

          {/* ---------- SEGUITO DEL RACCONTO ----------
              Paragrafi in colonna stretta (misura di lettura), le
              foto invece a piena larghezza del contenitore — il
              contrasto tipico di uno spread di rivista. Vuoto (e
              quindi invisibile) per i mestieri senza "paragrafi". */}
          {resto.length > 0 && (
            <motion.div
              variants={riseUp}
              className="mx-auto mt-16 max-w-6xl space-y-10 2xl:max-w-7xl"
            >
              {resto.map((blocco, i) => {
                if (blocco.tipo === "testo") {
                  return (
                    <p
                      key={i}
                      className="max-w-[62ch] text-[15px] leading-[1.75] text-inchiostro/80"
                    >
                      {blocco.contenuto}
                    </p>
                  );
                }

                if (blocco.tipo === "citazione") {
                  return (
                    <blockquote key={i} className="max-w-[46ch] border-t hairline pt-8">
                      <p className="pull-quote text-[clamp(1.5rem,3.5vw,2.25rem)] text-inchiostro/85">
                        {blocco.contenuto}
                      </p>
                    </blockquote>
                  );
                }

                return (
                  <figure
                    key={i}
                    className="relative aspect-video w-full overflow-hidden bg-inchiostro/5"
                  >
                    <Image
                      src={blocco.src}
                      alt={blocco.didascalia ?? testi.titolo}
                      fill
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      className="object-cover grayscale"
                    />
                    {blocco.didascalia && (
                      <figcaption className="caption absolute bottom-4 left-4 bg-inchiostro px-2.5 py-1 text-carta">
                        {blocco.didascalia}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </motion.div>
          )}

          {/* ---------- RIMANDO ALL'ALTRO MESTIERE ---------- */}
          <motion.div
            variants={riseUp}
            className="mx-auto mt-24 max-w-6xl border-t hairline pt-8 2xl:max-w-7xl"
          >
            <Link
              href={altro.href}
              className="kicker text-inchiostro/50 transition-colors duration-200 hover:text-inchiostro"
            >
              {t.paginaMestiere.altro[altro.id]} →
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
