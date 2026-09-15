"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import TreAnime from "@/components/TreAnime";
import StatusSchedule from "@/components/StatusSchedule";
import Galleria from "@/components/Galleria";
import Contatti from "@/components/Contatti";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

export default function Home() {
  /* Riferimento all'intera pagina: serve alla barra di avanzamento
     e, se vuoi, a qualsiasi effetto legato allo scroll globale. */
  const pageRef = useRef<HTMLElement>(null);
  const riduciMovimento = useReducedMotion();

  /* SCROLL MORBIDO (opzionale).
     Attivo solo se hai installato Lenis: npm i lenis
     Se non lo installi, l'hook non fa nulla e il sito usa lo
     scroll nativo del browser, che è comunque perfetto. */
  useSmoothScroll();

  /* Avanzamento della pagina, da 0 a 1 */
  const { scrollYProgress } = useScroll();

  /* useSpring toglie lo scatto alla barra e la fa "inseguire".
     stiffness più alto = più reattiva · damping più alto = più
     morbida. 120/30 è un buon compromesso da rockstar. */
  const avanzamento = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Barra di avanzamento: unico elemento sempre visibile che
          racconta quanto manca alla fine. Un solo filo nero, come
          tutto il resto del sito. */}
      {!riduciMovimento && (
        <motion.div
          aria-hidden
          style={{ scaleX: avanzamento }}
          className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-inchiostro"
        />
      )}

      <NavBar />

      {/* Salto rapido per chi naviga da tastiera o screen reader */}
      <a
        href="#musica"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-inchiostro focus:px-4 focus:py-2 focus:text-carta"
      >
        Vai al contenuto
      </a>

      <main ref={pageRef} className="relative bg-carta">
        {/* 1 — Copertina a tutto schermo (foto o video) */}
        <HeroSection />

        {/* 2 — Musica e Strumenti (Liuteria) */}
        <TreAnime />

        {/* 3 — Dove si trova adesso e cosa sta facendo */}
        <StatusSchedule />

        {/* 4 — Due scatti dal vivo */}
        <Galleria />

        {/* 5 — Social e richieste */}
        <Contatti />
      </main>
    </>
  );
}
