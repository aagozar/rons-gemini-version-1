"use client";

import { motion } from "framer-motion";
import { AGENDA, STATI } from "@/lib/content";
import { DUR, EASE_OUT, VIEWPORT, riseUp, stagger } from "@/lib/motion";

/* ============================================================
   STATO E AGENDA
   ------------------------------------------------------------
   La linea verticale con i pallini richiama i segnatasti del
   manico di una chitarra. Il punto "attuale" pulsa: è l'unica
   animazione continua della pagina, quindi si nota.
   Dati e date si aggiornano in lib/content.ts → AGENDA.
   ============================================================ */
export default function StatusSchedule() {
  const attuale = AGENDA.find((t) => t.attuale) ?? AGENDA[0];
  const colore = STATI[attuale.stato].hex;

  return (
    <section
      id="agenda"
      className="relative border-t border-fumo bg-bruciato px-6 py-28 sm:px-10 lg:px-16 lg:py-36"
      aria-label="Stato e agenda"
    >
      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto max-w-5xl"
      >
        {/* ---------- STATO ATTUALE ---------- */}
        <motion.p variants={riseUp} className="text-sm text-cenere">
          In questo momento
        </motion.p>

        <motion.h2
          variants={riseUp}
          className="display mt-3 text-[clamp(2.25rem,6.5vw,5rem)]"
          style={{ ["--glow" as string]: colore }}
        >
          <span className="neon" style={{ color: colore }}>
            {STATI[attuale.stato].label}
          </span>
        </motion.h2>

        <motion.p
          variants={riseUp}
          className="mt-4 max-w-[50ch] text-base text-cenere"
        >
          {attuale.titolo} · {attuale.luogo}
        </motion.p>

        {/* ---------- LINEA DEL TEMPO ---------- */}
        <ol className="relative mt-20 border-l border-fumo pl-8 sm:pl-12">
          {AGENDA.map((tappa, i) => {
            const c = STATI[tappa.stato].hex;
            return (
              <motion.li
                key={`${tappa.titolo}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                /* Il ritardo crescente fa "scendere" la sequenza
                   lungo la linea. 0.12 per voce: alzalo a 0.2 per
                   un effetto più lento e solenne. */
                transition={{
                  duration: DUR.base,
                  ease: EASE_OUT,
                  delay: i * 0.12,
                }}
                className="relative pb-14 last:pb-0"
              >
                {/* Segnatasto */}
                <span
                  aria-hidden
                  className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full sm:-left-[3.4rem]"
                  style={{
                    backgroundColor: tappa.attuale ? c : "#2A231D",
                    boxShadow: tappa.attuale ? `0 0 18px ${c}` : "none",
                  }}
                />
                {/* Alone pulsante solo sulla tappa in corso */}
                {tappa.attuale && (
                  <motion.span
                    aria-hidden
                    className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full sm:-left-[3.4rem]"
                    style={{ backgroundColor: c }}
                    animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                    /* 2.2s è un battito lento, da "insegna al neon".
                       Sotto 1.5s diventa fastidioso. */
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                <p className="text-xs font-medium" style={{ color: c }}>
                  {STATI[tappa.stato].label}
                </p>
                <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                  {tappa.titolo}
                </h3>
                <p className="mt-1 text-sm text-cenere">
                  {tappa.luogo} — {tappa.periodo}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </section>
  );
}
