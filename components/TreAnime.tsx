"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ANIME, type Anima } from "@/lib/content";
import { EASE_OUT, VIEWPORT, riseUp, stagger } from "@/lib/motion";
import Folio from "@/components/Folio";
import { useLingua } from "@/lib/useLingua";

/* ============================================================
   DUE ARTICOLI A DOPPIA PAGINA: MUSICA E LIUTERIA
   ------------------------------------------------------------
   Ogni sezione è una rivista aperta: racconto in prosa da un
   lato, slideshow di foto dall'altro, separati da un filo
   verticale. Le due sezioni sono specchiate (Musica: testo a
   sinistra, foto a destra — Liuteria: il contrario) così non si
   ripetono una nell'altra. Stesso fondo bianco per entrambe.
   ============================================================ */
export default function TreAnime() {
  const [musica, liuteria] = ANIME;

  return (
    <>
      {musica && <ArticoloDoppiaPagina anima={musica} numero="01" pagina="12" />}
      {liuteria && (
        <ArticoloDoppiaPagina
          anima={liuteria}
          numero="02"
          pagina="28"
          invertito
        />
      )}
    </>
  );
}

/* Ogni tanto una foto sola: qui invece scorrono in dissolvenza,
   una dopo l'altra, senza controlli — è la "pagina destra" della
   doppia pagina qui sotto. Ferma sulla prima foto se l'utente ha
   chiesto di ridurre il movimento. */
function SlideshowRons({
  immagini,
  didascalia,
}: {
  immagini: string[];
  didascalia: string;
}) {
  const riduciMovimento = useReducedMotion();
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (riduciMovimento || immagini.length <= 1) return;
    const id = setInterval(() => {
      setIndice((i) => (i + 1) % immagini.length);
    }, 4500);
    return () => clearInterval(id);
  }, [riduciMovimento, immagini.length]);

  if (immagini.length === 0) return null;

  return (
    <div className="relative aspect-4/5 w-full overflow-hidden bg-inchiostro/5">
      <AnimatePresence>
        <motion.div
          key={indice}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="absolute inset-0"
        >
          <Image
            src={immagini[indice]}
            alt={didascalia}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
            priority={indice === 0}
          />
        </motion.div>
      </AnimatePresence>

      <p className="caption absolute bottom-4 left-4 bg-inchiostro px-2.5 py-1 text-carta">
        {didascalia}
      </p>
    </div>
  );
}

/* ============================================================
   ARTICOLO A DOPPIA PAGINA — usato sia per Musica che Liuteria
   ------------------------------------------------------------
   Ogni sezione è una rivista aperta: racconto in prosa da un
   lato (capolettera sul primo paragrafo), slideshow di foto
   dall'altro, separati da un filo verticale (l'unico separatore
   del sito, .hairline, qui in piedi invece che in orizzontale).
   "invertito" scambia i due lati: Musica ha il testo a sinistra,
   Liuteria il contrario — le due sezioni restano specchiate,
   come voleva il brief originale, senza ripetersi.
   Il ponte verso l'altro mestiere (link dentro al racconto) è
   facoltativo: compare solo se testi.collegamentoAltro è
   valorizzato in lib/dizionario.ts. */
function ArticoloDoppiaPagina({
  anima,
  numero,
  pagina,
  invertito = false,
}: {
  anima: Anima;
  numero: string;
  pagina: string;
  invertito?: boolean;
}) {
  const { t } = useLingua();
  const testi = t.anime[anima.id];
  const paragrafi = testi.paragrafi ?? [testi.testo];
  const altroId = anima.id === "musica" ? "liuteria" : "musica";

  const colonnaTesto = (
    <motion.div
      key="testo"
      variants={riseUp}
      className={invertito ? "lg:pl-14 2xl:pl-16" : "lg:pr-14 2xl:pr-16"}
    >
      <div className="flex items-baseline gap-4">
        <span className="folio text-inchiostro/50">{numero}</span>
        <p className="kicker text-inchiostro/50">{testi.occhiello}</p>
      </div>

      <h2 className="display-section mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">
        {testi.titolo}
      </h2>

      <div className="mt-8 max-w-[52ch] space-y-6">
        {paragrafi.map((paragrafo, i) => (
          <p
            key={i}
            className={`text-[15px] leading-[1.75] text-inchiostro/80 ${
              i === 0 ? "dropcap" : ""
            }`}
          >
            {paragrafo}
          </p>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a
          href={anima.cta.href}
          className="inline-block border-b hairline pb-1 text-xs font-medium uppercase tracking-[0.2em] text-inchiostro transition-colors duration-200 hover:border-inchiostro"
        >
          {testi.ctaLabel}
        </a>

        {/* Il ponte verso l'altro mestiere, dentro il racconto stesso */}
        {testi.collegamentoAltro && (
          <a
            href={`#${altroId}`}
            className="inline-block border-b hairline pb-1 text-xs font-medium uppercase tracking-[0.2em] text-inchiostro/60 transition-colors duration-200 hover:border-inchiostro hover:text-inchiostro"
          >
            {testi.collegamentoAltro}
          </a>
        )}
      </div>
    </motion.div>
  );

  const colonnaGalleria = (
    <motion.div
      key="galleria"
      variants={riseUp}
      className={`hairline ${
        invertito
          ? "lg:border-r lg:pr-14 2xl:pr-16"
          : "lg:border-l lg:pl-14 2xl:pl-16"
      }`}
    >
      <SlideshowRons
        immagini={anima.slideshowStoria}
        didascalia={testi.didascalia}
      />
    </motion.div>
  );

  return (
    <motion.section
      id={anima.id}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger(0, 0.1)}
      className="relative border-t px-6 py-24 hairline bg-carta sm:px-10 lg:px-16 lg:py-32"
      aria-label={`${testi.titolo} — ${testi.occhiello}`}
    >
      <Folio numero={pagina} />

      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-x-0 2xl:max-w-7xl">
        {invertito ? (
          <>
            {colonnaGalleria}
            {colonnaTesto}
          </>
        ) : (
          <>
            {colonnaTesto}
            {colonnaGalleria}
          </>
        )}
      </div>
    </motion.section>
  );
}
