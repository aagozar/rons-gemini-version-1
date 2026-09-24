"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HERO_GALLERIA, SITE } from "@/lib/content";
import { periodo, prossimaTappa } from "@/lib/agenda";
import { DUR, EASE_OUT } from "@/lib/motion";
import { useLingua } from "@/lib/useLingua";
import LuogoTappa from "@/components/LuogoTappa";

/* Quanto resta in scena ogni diapositiva prima di dissolversi
   nella successiva. Stesso tempo per foto e video: è la
   dissolvenza incrociata a fare il lavoro, non la durata del
   singolo file. */
const DURATA_SLIDE = 6000;

/* ============================================================
   COPERTINA — LOCANDINA/POSTER, come una cover di Vogue
   ------------------------------------------------------------
   Quattro angoli + centro, senza etichette: sono i testi stessi,
   grandi, a fare da didascalia — come su un vero poster.
     alto-sinistra   nome del prossimo evento
     alto-destra     "Proudly presents"
     centro          il masthead, "RONS GEMINI"
     basso-sinistra  la data (calcolata da lib/agenda.ts in base
                      alla data del dispositivo di chi guarda)
     basso-destra    il luogo
   La sezione occupa tutto lo schermo (100svh). L'header è fixed
   e sta SOPRA questa sezione: il blocco superiore ha un
   padding-top che lo tiene libero (pt-28/32), altrimenti il logo
   e i link della nav finirebbero incollati — o sopra — al nome
   dell'evento e a "Proudly presents".

   PER RALLENTARE L'APERTURA: alza delayChildren.
   PER CAMBIARE IL RITMO: cambia staggerChildren.
   ============================================================ */
const sequenza: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.35, staggerChildren: 0.14 },
  },
};

const riga: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

const dissolvenza: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
};

/* Il testo dell'angolo, senza etichetta sopra: deve leggersi da
   solo, come su una vera locandina. Niente serif qui: l'Archivo
   in maiuscolo, a dimensione contenuta, resta un'informazione di
   contorno (data, luogo, evento) e lascia tutto il peso visivo al
   masthead al centro — è quello il nome che deve dominare. */
function Angolo({
  valore,
  allineaDestra = false,
}: {
  valore: ReactNode;
  allineaDestra?: boolean;
}) {
  return (
    <motion.p
      variants={dissolvenza}
      className={`max-w-[18ch] text-[clamp(0.8rem,1.6vw,1.05rem)] font-semibold uppercase leading-snug tracking-[0.06em] text-carta sm:max-w-[22ch] sm:tracking-[0.08em] ${
        allineaDestra ? "ml-auto text-right" : ""
      }`}
    >
      {valore}
    </motion.p>
  );
}

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

  const yFoto = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scalaFoto = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yTesto = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacitaTesto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const { lingua, t } = useLingua();
  const prossimoEvento = prossimaTappa();
  const testiEvento = t.agenda.tappe[prossimoEvento.id];

  /* Avanza da una diapositiva alla successiva ogni DURATA_SLIDE ms.
     Con "riduci movimento" attivo la galleria resta ferma sulla
     prima immagine, niente dissolvenze né zoom. */
  const [indiceSlide, setIndiceSlide] = useState(0);
  useEffect(() => {
    if (riduciMovimento || HERO_GALLERIA.length <= 1) return;
    const id = setInterval(() => {
      setIndiceSlide((i) => (i + 1) % HERO_GALLERIA.length);
    }, DURATA_SLIDE);
    return () => clearInterval(id);
  }, [riduciMovimento]);

  const slide = HERO_GALLERIA[indiceSlide];

  return (
    <section
      ref={sezioneRef}
      id="hero"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-inchiostro"
      aria-label="Copertina"
    >
      {/* ---------- LIVELLO 1: SFONDO — GALLERIA A DISSOLVENZA ----------
          Foto e video si alternano ogni DURATA_SLIDE ms, sempre in
          bianco e nero (grayscale su ogni singolo layer). L'uscita
          e l'entrata sono sovrapposte (AnimatePresence in modalità
          "sync", il default): è quello che crea la dissolvenza
          incrociata invece di uno stacco secco. */}
      <motion.div
        style={riduciMovimento ? undefined : { y: yFoto, scale: scalaFoto }}
        className="absolute inset-0 h-full w-full"
      >
        <AnimatePresence>
          <motion.div
            key={indiceSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            {slide.tipo === "immagine" ? (
              /* Zoom lentissimo (effetto Ken Burns), tarato sulla
                 durata della diapositiva stessa. */
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={riduciMovimento ? undefined : { scale: 1.08 }}
                transition={{ duration: DURATA_SLIDE / 1000 + 1, ease: "linear" }}
              >
                <Image
                  src={slide.media}
                  alt="Rons Gemini dal vivo"
                  fill
                  priority={indiceSlide === 0}
                  sizes="100vw"
                  className="object-cover object-center grayscale"
                />
              </motion.div>
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={slide.poster}
                className="h-full w-full object-cover object-center grayscale"
              >
                <source src={slide.media} type="video/mp4" />
              </video>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ---------- LIVELLO 2: UN SOLO VELO SCURO ----------
          Nessun gradiente decorativo: solo l'opacità che serve a
          tenere leggibile il testo in copertina. */}
      <div className="absolute inset-0 bg-inchiostro/60" aria-hidden />

      {/* ---------- LIVELLO 3: LOCANDINA ----------
          pt-28/32: lo spazio libero sotto l'header fixed.
          pb-10/14: margine dal bordo inferiore (safe-area inclusa
          via il padding globale su :root, vedi globals.css). */}
      <motion.div
        style={riduciMovimento ? undefined : { y: yTesto, opacity: opacitaTesto }}
        className="relative z-10 flex h-full flex-col justify-between px-6 pb-10 pt-28 sm:px-10 sm:pb-14 sm:pt-32 lg:px-16"
      >
        <motion.div variants={sequenza} initial="hidden" animate="show" className="contents">
          {/* ---------- ALTO: evento · "proudly presents" ---------- */}
          <div className="flex items-start justify-between gap-6">
            <Angolo valore={testiEvento.titolo} />
            <Angolo valore={t.hero.presenta} allineaDestra />
          </div>

          {/* ---------- BASSO: data · luogo ---------- */}
          <div className="flex items-end justify-between gap-6">
            <Angolo valore={periodo(prossimoEvento, lingua === "en" ? "en-US" : "it-IT")} />
            <Angolo
              valore={<LuogoTappa luogo={testiEvento.luogo} link={prossimoEvento.link} />}
              allineaDestra
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- LIVELLO 4: MASTHEAD, al centro esatto ----------
          Un layer assoluto separato: resta centrato sullo schermo
          a prescindere da quante righe occupano gli angoli. */}
      <motion.div
        style={riduciMovimento ? undefined : { y: yTesto, opacity: opacitaTesto }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
      >
        <motion.h1
          variants={sequenza}
          initial="hidden"
          animate="show"
          className="display-cover text-center text-carta text-[clamp(3rem,13vw,15rem)]"
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={riga} className="block">
              {SITE.nome}
            </motion.span>
          </span>
        </motion.h1>
      </motion.div>
    </section>
  );
}
