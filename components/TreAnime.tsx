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

/* ============================================================
   GRIGLIA ASIMMETRICA
   ------------------------------------------------------------
   Tre pannelli di larghezza e altezza diverse, sfalsati in
   verticale: è quello che distingue questa sezione dalle solite
   tre schede identiche in fila.

   Le classi sono su griglia a 12 colonne e valgono da lg in su.
   Sotto lg i pannelli tornano uno sotto l'altro, sempre.
   PER CAMBIARE LA COMPOSIZIONE modifica solo questo array.
   ============================================================ */
const IMPAGINAZIONE = [
  "lg:col-span-7 lg:col-start-1",
  "lg:col-span-5 lg:col-start-8 lg:mt-40", // scende: crea lo sfalsamento
  "lg:col-span-6 lg:col-start-2 lg:-mt-24", // risale e rientra a sinistra
];

export default function TreAnime() {
  return (
    <section
      id="anime"
      className="relative border-t border-fumo bg-palco px-6 py-28 sm:px-10 lg:px-16 lg:py-40"
      aria-label="Le tre anime"
    >
      {/* ---------- INTESTAZIONE DELLA SEZIONE ---------- */}
      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mb-20 max-w-3xl lg:mb-28"
      >
        <motion.h2
          variants={riseUp}
          className="display text-[clamp(2.5rem,7vw,6rem)]"
        >
          Due mestieri
        </motion.h2>
        <motion.p
          variants={riseUp}
          className="mt-6 max-w-[52ch] text-base leading-relaxed text-cenere sm:text-lg"
        >
          La stessa chitarra, dalle due parti del banco. Scegli da dove
          vuoi entrare.
        </motion.p>
      </motion.div>

      {/* ---------- I TRE PANNELLI ---------- */}
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        {ANIME.map((anima, i) => (
          <Pannello
            key={anima.id}
            anima={anima}
            classi={IMPAGINAZIONE[i] ?? "lg:col-span-6"}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SINGOLO PANNELLO
   ============================================================ */
function Pannello({ anima, classi }: { anima: Anima; classi: string }) {
  const ref = useRef<HTMLElement>(null);
  const riduciMovimento = useReducedMotion();

  /* Parallasse interna al riquadro: il media si muove dentro la
     sua cornice mentre il pannello attraversa lo schermo.
     offset ["start end", "end start"] copre tutto il transito:
     0 = il pannello entra dal basso · 1 = esce dall'alto. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Il media è scalato al 115% (vedi scale-[1.15] sotto) proprio
     per avere margine di movimento senza scoprire i bordi.
     SE AUMENTI questo spostamento oltre ±8%, alza anche lo scale,
     altrimenti vedrai delle strisce vuote ai lati. */
  const yMedia = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.article
      ref={ref}
      id={anima.id}
      className={`group ${classi}`}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger(0, 0.1)}
    >
      {/* ---------- CORNICE DEL MEDIA ----------
          IMPORTANTE: è questo contenitore a decidere il formato.
          "relative" + la classe aspect-[...] fissano lo spazio,
          il media dentro è in absolute e riempie con object-cover.
          Risultato: qualunque foto tu carichi, il layout non si
          sposta di un pixel. Il ritaglio si cambia da content.ts. */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: DUR.base, ease: EASE_OUT },
          },
        }}
        className={`relative w-full overflow-hidden bg-bruciato ${anima.ratio}`}
      >
        <motion.div
          style={riduciMovimento ? undefined : { y: yMedia }}
          className="absolute inset-0 scale-[1.15]"
        >
          {anima.daFare ? (
            /* SEGNAPOSTO: resta finché non metti la foto vera.
               Appena togli daFare: true da lib/content.ts e carichi
               il file, sparisce da solo. Meglio un riquadro onesto
               che un'immagine rotta o una foto presa altrove. */
            <div className="flex h-full w-full items-center justify-center border border-dashed border-fumo bg-bruciato p-8">
              <p className="max-w-[24ch] text-center text-sm leading-relaxed text-cenere">
                Foto di {anima.titolo.toLowerCase()} da scattare.
                <br />
                Il riquadro è già pronto: carica il file e compare.
              </p>
            </div>
          ) : anima.tipo === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              /* INSERISCI QUI IL FRAME DI ANTEPRIMA DEL VIDEO */
              poster={anima.poster}
              className="h-full w-full object-cover"
            >
              {/* INSERISCI QUI IL VIDEO DEL LIVE (.mp4) —
                  il percorso si imposta in lib/content.ts */}
              <source src={anima.media} type="video/mp4" />
            </video>
          ) : (
            <Image
              /* QUI ANDRA' LA FOTO (quadro, legno, dettaglio):
                 il percorso si imposta in lib/content.ts */
              src={anima.media}
              alt={`${anima.titolo} — ${anima.occhiello}`}
              fill
              /* sizes dice al browser quanto sarà larga l'immagine
                 nel layout, così scarica il file della misura
                 giusta. Se cambi le colonne della griglia,
                 aggiorna anche questi valori. */
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              /* La prima immagine può avere priority per caricarsi
                 subito; le altre no, così non rubano banda. */
              priority={anima.id === "musica"}
            />
          )}
        </motion.div>

        {/* Velo scuro dal basso: tiene leggibile il titolo anche
            su foto chiare. Si alleggerisce al passaggio del mouse. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-palco/85 via-palco/10 to-transparent transition-opacity duration-500 group-hover:opacity-60"
        />

        {/* Bagliore neon del mestiere sul bordo inferiore */}
        <motion.div
          aria-hidden
          variants={{
            hidden: { scaleX: 0 },
            show: {
              scaleX: 1,
              transition: { duration: DUR.slow, ease: EASE_OUT, delay: 0.2 },
            },
          }}
          style={{
            backgroundColor: anima.accentoHex,
            boxShadow: `0 0 24px ${anima.accentoHex}`,
          }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left"
        />
      </motion.div>

      {/* ---------- TESTO ---------- */}
      <motion.div variants={riseUp} className="mt-7">
        <p
          className="text-sm font-medium tracking-wide"
          style={{ color: anima.accentoHex }}
        >
          {anima.occhiello}
        </p>

        <h3 className="display mt-2 text-[clamp(2rem,4.5vw,3.5rem)]">
          {anima.titolo}
        </h3>

        <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-cenere">
          {anima.testo}
        </p>

        <a
          href={anima.cta.href}
          className="mt-6 inline-block border-b border-fumo pb-1 text-sm font-semibold text-calce transition-colors duration-200 hover:border-calce"
        >
          {anima.cta.label}
        </a>
      </motion.div>
    </motion.article>
  );
}
