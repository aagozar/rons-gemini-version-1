"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { SITE } from "@/lib/content";
import { DUR, EASE_OUT } from "@/lib/motion";

/* Un colore per ogni verbo della tagline: lo stesso codice
   cromatico che ritroverai nei pannelli e nell'agenda.
   Verde = suonare, ambra = costruire. Se aggiungi una terza riga
   alla tagline, aggiungi qui il suo colore. */
const COLORI_TAGLINE = ["#2CE86A", "#FF9B21", "#E6453A"];

/* ============================================================
   SEQUENZA DI APERTURA
   ------------------------------------------------------------
   È l'unico momento coreografato del sito: prima si "accende" il
   video, poi salgono le tre righe, infine il sottotitolo.

   PER RALLENTARE TUTTA L'APERTURA: alza delayChildren.
   PER CAMBIARE IL RITMO TRA LE RIGHE: cambia staggerChildren.
   0.10 → raffica · 0.18 → respiro teatrale · 0.35 → molto lento
   ============================================================ */
const sequenza: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.35, staggerChildren: 0.18 },
  },
};

/* Ogni riga emerge da sotto una maschera (il wrapper ha
   overflow-hidden): è la rivelazione "a sipario". */
const riga: Variants = {
  hidden: { y: "115%", rotate: 2 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

const filetto: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.base, ease: EASE_OUT } },
};

const dissolvenza: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
};

export default function HeroSection() {
  const sezioneRef = useRef<HTMLElement>(null);
  const riduciMovimento = useReducedMotion();

  /* Parallasse legata allo scroll della sola hero.
     offset ["start start", "end start"]:
     0 = hero in cima allo schermo · 1 = hero appena uscita sopra. */
  const { scrollYProgress } = useScroll({
    target: sezioneRef,
    offset: ["start start", "end start"],
  });

  /* Il video scorre più lentamente del testo → profondità.
     ALZA "30%" a "50%" per una parallasse più marcata;
     abbassalo a "15%" se l'effetto ti sembra esagerato. */
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scalaVideo = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  /* Il testo sale più in fretta e sfuma: lascia il palco al
     contenuto successivo senza uno stacco netto. */
  const yTesto = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacitaTesto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sezioneRef}
      id="hero"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden"
      aria-label="Apertura"
    >
      {/* ---------- LIVELLO 1: SFONDO (foto o video) ---------- */}
      <motion.div
        style={
          riduciMovimento ? undefined : { y: yVideo, scale: scalaVideo }
        }
        className="absolute inset-0 h-full w-full"
      >
        {SITE.heroTipo === "immagine" ? (
          /* APERTURA CON FOTO + zoom lentissimo (effetto Ken Burns).
             Con una foto sola il movimento deve essere quasi
             impercettibile: 20 secondi per un 8% di ingrandimento.
             Se lo acceleri si vede il trucco e sembra uno slideshow. */
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={riduciMovimento ? undefined : { scale: 1.08 }}
            transition={{ duration: 20, ease: "linear" }}
          >
            <Image
              /* INSERISCI QUI LA FOTO DI APERTURA (il percorso si
                 imposta in lib/content.ts).
                 object-[42%_center] sposta il punto di ancoraggio:
                 nella tua foto sei leggermente a sinistra, così su
                 schermi stretti resti dentro l'inquadratura invece
                 di finire tagliato. Su un'altra foto ritara questo
                 valore, è l'unica cosa che serve. */
              src={SITE.heroImmagine}
              alt="Rons Gemini dal vivo"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[42%_center]"
            />
          </motion.div>
        ) : (
        <video
          /* autoPlay + muted + playsInline sono i TRE attributi
             obbligatori: senza anche uno solo, iOS e Chrome
             bloccano la riproduzione automatica. */
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          /* INSERISCI QUI IL FRAME DI ANTEPRIMA (.jpg) */
          poster={SITE.heroPoster}
          /* object-cover = il video riempie sempre lo schermo e
             viene ritagliato ai lati. object-center tiene il
             soggetto al centro: se il tuo soggetto è in alto
             (es. volto) usa object-top e non verrà tagliato. */
          className="h-full w-full object-cover object-center"
        >
          {/* INSERISCI QUI IL VIDEO DI SFONDO (.webm) — più leggero,
              il browser lo preferisce se disponibile */}
          {SITE.heroVideoWebm && (
            <source src={SITE.heroVideoWebm} type="video/webm" />
          )}
          {/* INSERISCI QUI IL VIDEO DI SFONDO (.mp4) — fallback
              universale, codifica H.264 */}
          <source src={SITE.heroVideoMp4} type="video/mp4" />
        </video>
        )}
      </motion.div>

      {/* ---------- LIVELLO 2: MASCHERE DI LEGGIBILITÀ ----------
          Senza questi due veli il testo bianco sparisce appena il
          video schiarisce. Se il tuo video è già molto scuro puoi
          abbassare le opacità; se è chiaro, alzale. */}
      <div className="absolute inset-0 bg-palco/55" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-palco via-palco/20 to-palco/70"
        aria-hidden
      />

      {/* ---------- LIVELLO 3: TESTO ---------- */}
      <motion.div
        style={riduciMovimento ? undefined : { y: yTesto, opacity: opacitaTesto }}
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 sm:px-10 lg:px-16 lg:pb-28"
      >
        <motion.div variants={sequenza} initial="hidden" animate="show">
          <h1 className="display text-[clamp(3.25rem,13vw,11rem)]">
            {/* Le tre anime, una per riga. Il filetto neon a
                sinistra codifica il colore del mestiere. */}
            {SITE.tagline.map((parola, i) => (
              <span key={parola} className="flex items-center gap-4 sm:gap-7">
                <motion.span
                  aria-hidden
                  variants={filetto}
                  style={{ backgroundColor: COLORI_TAGLINE[i] }}
                  className="hidden h-[3px] w-[clamp(2rem,7vw,7rem)] origin-left sm:block"
                />
                {/* overflow-hidden: è la maschera che rende
                    possibile l'effetto sipario della riga */}
                <span className="block overflow-hidden pb-[0.08em]">
                  <motion.span variants={riga} className="block">
                    {parola}
                  </motion.span>
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={dissolvenza}
            className="mt-8 max-w-[46ch] text-pretty text-base leading-relaxed text-cenere sm:text-lg"
          >
            {SITE.sottotitolo}
          </motion.p>

          <motion.div
            variants={dissolvenza}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#anime"
              className="group relative overflow-hidden bg-calce px-7 py-4 text-sm font-semibold text-palco transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10">Scopri il lavoro</span>
              {/* Micro-interazione: una lama di colore attraversa
                  il bottone al passaggio del mouse. duration-500 →
                  abbassala a 300 per renderla più scattante. */}
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-verde transition-transform duration-500 ease-out group-hover:translate-x-0"
              />
            </a>
            <a
              href="#contatti"
              className="border border-fumo px-7 py-4 text-sm font-semibold text-calce transition-colors duration-200 hover:border-calce"
            >
              Scrivimi
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---------- INDICATORE DI SCORRIMENTO ---------- */}
      {!riduciMovimento && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: DUR.base }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        >
          <div className="h-14 w-px overflow-hidden bg-fumo">
            <motion.div
              className="h-6 w-px bg-calce"
              animate={{ y: [-24, 56] }}
              /* repeat: Infinity + ease lineare = battito costante.
                 duration più bassa = scorrimento più insistente. */
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
