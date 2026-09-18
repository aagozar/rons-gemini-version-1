"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ANIME, type Anima } from "@/lib/content";
import { DUR, EASE_OUT, VIEWPORT, riseUp, stagger } from "@/lib/motion";
import Folio from "@/components/Folio";
import { useLingua } from "@/lib/useLingua";

/* ============================================================
   DUE SPREAD EDITORIALI: MUSICA E STRUMENTI (LIUTERIA)
   ------------------------------------------------------------
   Non è più una griglia di due card uguali: sono due sezioni a
   sé, ciascuna con la propria pagina finta. Solo la sezione
   Strumenti prende il fondo "carta alternativa" — è l'unica
   variazione di fondo prevista dal brief. L'impaginazione dentro
   ogni spread resta asimmetrica (Brodovitch): foto grande da un
   lato, testo stretto dall'altro, i due spread specchiati tra
   loro per non ripetersi.
   ============================================================ */
export default function TreAnime() {
  const [musica, liuteria] = ANIME;

  return (
    <>
      {musica && (
        <Spread
          anima={musica}
          numero="01"
          pagina="12"
          fondo="carta"
          specchiato={false}
        />
      )}
      {liuteria && (
        <Spread
          anima={liuteria}
          numero="02"
          pagina="28"
          fondo="carta-alt"
          specchiato
        />
      )}
    </>
  );
}

function Spread({
  anima,
  numero,
  pagina,
  fondo,
  specchiato,
}: {
  anima: Anima;
  numero: string;
  pagina: string;
  fondo: "carta" | "carta-alt";
  specchiato: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const riduciMovimento = useReducedMotion();
  const { t } = useLingua();
  const testi = t.anime[anima.id];

  /* Parallasse interna al riquadro media, contenuta e discreta:
     coerente con la calma editoriale, non con un effetto da
     landing page. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yMedia = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.section
      ref={ref}
      id={anima.id}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger(0, 0.1)}
      className={`relative border-t px-6 py-24 sm:px-10 lg:px-16 lg:py-32 hairline ${
        fondo === "carta-alt" ? "bg-carta-alt" : "bg-carta"
      }`}
      aria-label={`${testi.titolo} — ${testi.occhiello}`}
    >
      <Folio numero={pagina} />

      <div
        className={`mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-x-16 ${
          specchiato ? "" : ""
        }`}
      >
        {/* ---------- MEDIA ---------- */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: DUR.base, ease: EASE_OUT },
            },
          }}
          className={`relative w-full overflow-hidden bg-inchiostro/5 ${anima.ratio} lg:col-span-7 ${
            specchiato ? "lg:order-2 lg:col-start-6" : "lg:col-start-1"
          }`}
        >
          <motion.div
            style={riduciMovimento ? undefined : { y: yMedia }}
            className="absolute inset-0 scale-[1.1]"
          >
            {anima.daFare ? (
              <div className="flex h-full w-full items-center justify-center border border-dashed border-inchiostro/25 p-8">
                <p className="max-w-[24ch] text-center text-sm leading-relaxed text-inchiostro/60">
                  {t.placeholderFoto.titolo(testi.titolo.toLowerCase())}
                  <br />
                  {t.placeholderFoto.corpo}
                </p>
              </div>
            ) : anima.tipo === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={anima.poster}
                className="h-full w-full object-cover"
              >
                <source src={anima.media} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={anima.media}
                alt={`${testi.titolo} — ${testi.occhiello}`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority={anima.id === "musica"}
              />
            )}
          </motion.div>

          {/* Didascalia minuta, in corsivo — Kinfolk/Gentlewoman.
              Un piccolo fondo pieno solo dietro il testo, non un
              velo su tutta la foto: basta a leggerla su qualunque
              immagine senza aggiungere un secondo strato decorativo. */}
          <p className="caption absolute bottom-4 left-4 bg-inchiostro px-2.5 py-1 text-carta">
            {testi.didascalia}
          </p>
        </motion.div>

        {/* ---------- TESTO ---------- */}
        <motion.div
          variants={riseUp}
          className={`lg:col-span-5 ${
            specchiato ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"
          }`}
        >
          <div className="flex items-baseline gap-4">
            <span className="folio text-inchiostro/50">{numero}</span>
            <p className="kicker text-inchiostro/50">{testi.occhiello}</p>
          </div>

          <h2 className="display-section mt-4 text-[clamp(2.5rem,6vw,5rem)]">
            {testi.titolo}
          </h2>

          <p
            className={`mt-6 max-w-[42ch] text-[15px] leading-[1.75] text-inchiostro/80 ${
              specchiato ? "" : "dropcap"
            }`}
          >
            {testi.testo}
          </p>

          {testi.dettagli.length > 0 && (
            <ol className="mt-8 space-y-3 border-t hairline pt-6">
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
    </motion.section>
  );
}
