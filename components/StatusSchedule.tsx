"use client";

import { motion } from "framer-motion";
import { STATI } from "@/lib/content";
import { agendaOrdinata, inCorso, periodo, prossimaTappa } from "@/lib/agenda";
import { VIEWPORT, riseUp, stagger } from "@/lib/motion";
import Folio from "@/components/Folio";

/* ============================================================
   STATO E AGENDA
   ------------------------------------------------------------
   Una tabella, non più una linea del tempo con segnatasti: tre
   colonne — evento, luogo, data — come un vero calendario di
   date. Bianco e nero soltanto: la tappa in corso si distingue
   per opacità piena (nero) contro il 40-45% delle altre, non per
   colore. Dati e date si aggiornano in lib/content.ts → AGENDA;
   qual è la tappa "in corso" lo decide lib/agenda.ts confrontando
   le date con quella di oggi.
   ============================================================ */
export default function StatusSchedule() {
  const attuale = prossimaTappa();
  const agenda = agendaOrdinata();

  return (
    <section
      id="agenda"
      className="relative border-t px-6 py-24 hairline bg-carta sm:px-10 lg:px-16 lg:py-32"
      aria-label="Stato e agenda"
    >
      <Folio numero="44" />

      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto max-w-4xl"
      >
        {/* ---------- STATO ATTUALE ---------- */}
        <motion.p variants={riseUp} className="kicker text-inchiostro/50">
          In questo momento
        </motion.p>

        <motion.h2
          variants={riseUp}
          className="display-section mt-4 text-[clamp(2rem,5.5vw,4rem)]"
        >
          {STATI[attuale.tipo].label}
        </motion.h2>

        <motion.p
          variants={riseUp}
          className="mt-4 max-w-[50ch] text-base text-inchiostro/70"
        >
          {attuale.titolo} · {attuale.luogo}
        </motion.p>

        {/* ---------- TABELLA DELLE DATE ----------
            overflow-x-auto + min-width: su mobile scorre in
            orizzontale invece di schiacciare le colonne — lo
            stesso trucco di un vero calendario di sfilate. */}
        <motion.div variants={riseUp} className="mt-16 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b hairline">
                <th className="kicker pb-4 pr-6 font-medium text-inchiostro/45">
                  Evento
                </th>
                <th className="kicker pb-4 pr-6 font-medium text-inchiostro/45">
                  Luogo
                </th>
                <th className="kicker pb-4 font-medium text-inchiostro/45">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {agenda.map((tappa, i) => {
                const corrente = inCorso(tappa);
                return (
                  <tr
                    key={`${tappa.titolo}-${i}`}
                    className="border-b hairline last:border-0"
                  >
                    <td className="py-6 pr-6 align-top">
                      <p
                        className={`kicker ${
                          corrente ? "text-inchiostro" : "text-inchiostro/40"
                        }`}
                      >
                        {STATI[tappa.tipo].label}
                      </p>
                      <p
                        className={`display-section mt-2 text-lg sm:text-xl ${
                          corrente ? "text-inchiostro" : "text-inchiostro/70"
                        }`}
                      >
                        {tappa.titolo}
                      </p>
                    </td>
                    <td className="py-6 pr-6 align-top text-sm text-inchiostro/60">
                      {tappa.luogo}
                    </td>
                    <td className="py-6 align-top text-sm text-inchiostro/60">
                      {periodo(tappa)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* ---------- CTA: PROPORRE UNA DATA ---------- */}
        <motion.div variants={riseUp} className="mt-14 border-t hairline pt-10">
          <p className="pull-quote max-w-[32ch] text-[clamp(1.25rem,2.5vw,1.75rem)] text-inchiostro/80">
            Una nuova tappa da proporre?
          </p>
          <a
            href="#contatti"
            className="mt-5 inline-block border-b hairline pb-1 text-xs font-medium uppercase tracking-[0.2em] text-inchiostro transition-colors duration-200 hover:border-inchiostro"
          >
            Contattami
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
