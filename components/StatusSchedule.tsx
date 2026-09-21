"use client";

import { motion } from "framer-motion";
import { agendaOrdinata, inCorso, periodo, prossimaTappa } from "@/lib/agenda";
import { VIEWPORT, riseUp, stagger } from "@/lib/motion";
import Folio from "@/components/Folio";
import { useLingua } from "@/lib/useLingua";

/* ============================================================
   STATO E AGENDA
   ------------------------------------------------------------
   Lista di date in stile vogue.com/shows: non più una tabella,
   ma righe impilate separate da un filo — ogni riga mostra data,
   nome dell'evento e luogo, in quest'ordine. Bianco e nero
   soltanto: la tappa in corso si distingue per opacità piena
   (nero) contro il 40-45% delle altre, non per colore. Dati e
   date si aggiornano in lib/content.ts → AGENDA; qual è la tappa
   "in corso" lo decide lib/agenda.ts confrontando le date con
   quella di oggi. I testi visibili (titoli, luoghi, etichette di
   stato) arrivano dal dizionario, associati tramite l'id di ogni
   tappa.
   ============================================================ */
export default function StatusSchedule() {
  const { lingua, t } = useLingua();
  const attuale = prossimaTappa();
  const agenda = agendaOrdinata();
  const testiAttuale = t.agenda.tappe[attuale.id];
  const locale = lingua === "en" ? "en-US" : "it-IT";

  return (
    <section
      id="agenda"
      className="relative border-t px-6 py-24 hairline bg-carta sm:px-10 lg:px-16 lg:py-32"
      aria-label={t.agenda.kicker}
    >
      <Folio numero="44" />

      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto max-w-4xl 2xl:max-w-5xl"
      >
        {/* ---------- STATO ATTUALE ---------- */}
        <motion.p variants={riseUp} className="kicker text-inchiostro/50">
          {t.agenda.kicker}
        </motion.p>

        <motion.h2
          variants={riseUp}
          className="display-section mt-4 text-[clamp(2rem,5.5vw,4rem)]"
        >
          {t.stati[attuale.tipo]}
        </motion.h2>

        <motion.p
          variants={riseUp}
          className="mt-4 max-w-[50ch] text-base text-inchiostro/70"
        >
          {testiAttuale.titolo} · {testiAttuale.luogo}
        </motion.p>

        {/* ---------- LISTA DELLE DATE ----------
            Una riga per tappa: data, nome, luogo, separate da un
            filo — come le liste di sfilate di vogue.com. */}
        <div className="mt-16">
          {agenda.map((tappa, i) => {
            const corrente = inCorso(tappa);
            const testiTappa = t.agenda.tappe[tappa.id];
            return (
              <motion.div
                key={`${tappa.id}-${i}`}
                variants={riseUp}
                className="border-b hairline py-8 first:pt-0 last:border-0"
              >
                <p className="kicker text-inchiostro/45">
                  {periodo(tappa, locale)}
                </p>

                <p
                  className={`display-section mt-3 text-[clamp(1.5rem,4vw,2.5rem)] ${
                    corrente ? "text-inchiostro" : "text-inchiostro/70"
                  }`}
                >
                  {testiTappa.titolo}
                </p>

                <p
                  className={`kicker mt-2 ${
                    corrente ? "text-inchiostro/60" : "text-inchiostro/40"
                  }`}
                >
                  {t.stati[tappa.tipo]}
                </p>

                <p className="mt-5 text-sm text-inchiostro/60">
                  {testiTappa.luogo}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ---------- CTA: PROPORRE UNA DATA ---------- */}
        <motion.div variants={riseUp} className="mt-14 border-t hairline pt-10">
          <p className="pull-quote max-w-[32ch] text-[clamp(1.25rem,2.5vw,1.75rem)] text-inchiostro/80">
            {t.agenda.ctaTesto}
          </p>
          <a
            href="#contatti"
            className="mt-5 inline-block border-b hairline pb-1 text-xs font-medium uppercase tracking-[0.2em] text-inchiostro transition-colors duration-200 hover:border-inchiostro"
          >
            {t.agenda.ctaLabel}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
