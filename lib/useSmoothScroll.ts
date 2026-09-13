"use client";

import { useEffect } from "react";

/* ============================================================
   SCROLL MORBIDO — FACOLTATIVO
   ------------------------------------------------------------
   Per attivarlo: npm i lenis
   Se il pacchetto non c'è, l'hook esce in silenzio e il sito usa
   lo scroll nativo. Nessun errore, nessun blocco del build.

   ATTENZIONE: lo scroll morbido è la differenza più grande tra
   un sito "normale" e uno che sembra un video. Ma su alcuni
   trackpad può dare fastidio: se il ritorno dagli utenti è
   negativo, basta commentare la chiamata in page.tsx.
   ============================================================ */
export function useSmoothScroll() {
  useEffect(() => {
    /* Rispetta le preferenze di sistema */
    const riduci = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (riduci) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let annullato = false;

    import("lenis")
      .then(({ default: Lenis }) => {
        if (annullato) return;
        lenis = new Lenis({
          /* durata dell'inerzia in secondi:
             0.8 = asciutto · 1.2 = cinematografico · 2 = pigro */
          duration: 1.2,
          smoothWheel: true,
        });
        const loop = (t: number) => {
          lenis?.raf(t);
          frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
      })
      .catch(() => {
        /* Lenis non installato: si continua con lo scroll nativo */
      });

    return () => {
      annullato = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
}
