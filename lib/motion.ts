import type { Variants } from "framer-motion";

/* ============================================================
   CENTRALE DEI TIMING — MODIFICA QUI PER TARARE TUTTO IL SITO
   ------------------------------------------------------------
   Tutte le animazioni del sito leggono da qui. Se il sito ti
   sembra "lento", abbassa DUR.base e DUR.slow di 0.2s.
   Se ti sembra nervoso, alzali. Non toccare i singoli componenti.
   ============================================================ */

export const DUR = {
  micro: 0.25, // hover, focus, bottoni
  fast: 0.45, // comparse piccole (etichette, icone)
  base: 0.8, // comparse standard (titoli, immagini)
  slow: 1.5, // apertura hero, rivelazioni cinematografiche
} as const;

/* Ritardo tra un elemento e il successivo in una sequenza.
   0.08 = raffica veloce · 0.12 = ritmo naturale · 0.25 = molto teatrale */
export const STAGGER = 0.12;

/* Curve di easing (cubic-bezier).
   EASE_OUT: parte veloce e frena morbido → sensazione "premium".
   EASE_IN:  accelera in uscita → usalo solo per le sparizioni. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN: [number, number, number, number] = [0.7, 0, 0.84, 0];

/* Quando far partire le animazioni allo scroll.
   amount: 0.3 = il blocco parte quando il 30% è visibile.
   once: true = l'animazione avviene una sola volta (consigliato:
   ri-animare a ogni passaggio stanca l'occhio). */
export const VIEWPORT = { once: true, amount: 0.3 } as const;

/* ---------- VARIANTI RIUTILIZZABILI ---------- */

/* Contenitore che orchestra i figli in sequenza */
export const stagger = (delay = 0, step = STAGGER): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren: delay, staggerChildren: step },
  },
});

/* Salita morbida: il default per testi e blocchi */
export const riseUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

/* Rivelazione "a sipario": il testo emerge da sotto una maschera.
   Richiede un wrapper con overflow-hidden attorno all'elemento. */
export const curtain: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

/* Filetto/linea che si disegna da sinistra */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

/* Immagine che entra con un leggero zoom-out: dà profondità
   senza spostare il layout (lo scale non causa reflow). */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.12 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};
