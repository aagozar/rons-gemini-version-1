"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { agendaOrdinata, dataEsatta, inCorso, prossimaTappa } from "@/lib/agenda";
import { VIEWPORT, riseUp, stagger } from "@/lib/motion";
import Folio from "@/components/Folio";
import Lightbox from "@/components/Lightbox";
import LuogoTappa from "@/components/LuogoTappa";
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
  /* Locandina aperta a schermo intero (vedi Lightbox.tsx). Tutte le
     locandine dell'agenda usano lo stesso formato verticale
     1131×1600, quindi non serve tracciare le dimensioni per foto. */
  const [locandinaAperta, setLocandinaAperta] = useState<{ src: string; alt: string } | null>(
    null
  );

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
        <motion.p variants={riseUp} className="kicker text-center text-inchiostro/50 sm:text-left">
          {t.agenda.kicker}
        </motion.p>

        <motion.h2
          variants={riseUp}
          className="display-section mt-4 text-center text-[clamp(2rem,5.5vw,4rem)] sm:text-left"
        >
          {t.stati[attuale.tipo]}
        </motion.h2>

        {attuale.locandina ? (
          /* L'evento principale, come una locandina di film: foto a
             sinistra (sopra su mobile, centrata), nome, data, luogo e
             descrizione a destra. */
          <motion.div
            variants={riseUp}
            className="mx-auto mt-8 flex flex-col items-center gap-6 text-center sm:mx-0 sm:flex-row sm:items-center sm:justify-start sm:gap-10 sm:text-left"
          >
            <button
              type="button"
              onClick={() => setLocandinaAperta({ src: attuale.locandina!, alt: testiAttuale.titolo })}
              aria-label={testiAttuale.titolo}
              className="block w-full max-w-72 shrink-0 cursor-zoom-in sm:w-80 sm:max-w-none"
            >
              <Image
                src={attuale.locandina}
                alt={testiAttuale.titolo}
                width={1131}
                height={1600}
                priority
                sizes="(max-width: 640px) 288px, 320px"
                className="h-auto w-full shadow-[0_18px_40px_-18px_rgba(17,17,17,0.45)]"
              />
            </button>
            <div className="min-w-0">
              <p className="display-section text-[clamp(1.5rem,3.5vw,2.5rem)] text-inchiostro">
                {testiAttuale.titolo}
              </p>
              <p className="mt-2 text-sm font-bold text-inchiostro sm:text-base">
                {attuale.dataDaDefinire ? t.agenda.dataDaDefinire : dataEsatta(attuale, locale)}
              </p>
              {testiAttuale.luogo && (
                <p className="mt-2 text-sm text-inchiostro/60">
                  <LuogoTappa luogo={testiAttuale.luogo} link={attuale.link} />
                </p>
              )}
              {testiAttuale.descrizione && (
                <p className="mx-auto mt-5 max-w-[42ch] text-sm leading-relaxed text-inchiostro/70 sm:mx-0">
                  {testiAttuale.descrizione}
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.p
            variants={riseUp}
            className="mx-auto mt-4 max-w-[50ch] text-center text-base text-inchiostro/70 sm:mx-0 sm:text-left"
          >
            {testiAttuale.titolo}
            {testiAttuale.luogo && (
              <>
                {" · "}
                <LuogoTappa luogo={testiAttuale.luogo} link={attuale.link} />
              </>
            )}
          </motion.p>
        )}

        {/* ---------- LISTA DELLE DATE ----------
            Ogni tappa ha la sua riga, tranne quella attuale: è già
            raccontata qui sopra come evento principale, quindi non si
            ripete qui sotto. Se una tappa ha una locandina
            (lib/content.ts → locandina) la riga si presenta come la
            locandina di un film: immagine a sinistra, a destra nome,
            data, luogo e descrizione (lib/dizionario.ts → tappe →
            descrizione). Senza locandina resta la riga compatta:
            stato in alto, poi nome dell'evento e data esatta fratelli
            nello stesso flex — così restano alla stessa altezza — la
            data in grassetto a destra. Il luogo chiude la riga. */}
        <div className="mt-12">
          {agenda.filter((tappa) => tappa.id !== attuale.id).map((tappa, i) => {
            const corrente = inCorso(tappa);
            const testiTappa = t.agenda.tappe[tappa.id];

            if (tappa.locandina) {
              return (
                <motion.div
                  key={`${tappa.id}-${i}`}
                  variants={riseUp}
                  className="grid items-center gap-8 border-b py-10 hairline first:pt-0 last:border-0 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14"
                >
                  <button
                    type="button"
                    onClick={() => setLocandinaAperta({ src: tappa.locandina!, alt: testiTappa.titolo })}
                    aria-label={testiTappa.titolo}
                    className="mx-auto block w-full max-w-72 cursor-zoom-in sm:mx-0 sm:max-w-none"
                  >
                    <Image
                      src={tappa.locandina}
                      alt={testiTappa.titolo}
                      width={1131}
                      height={1600}
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 208px, 256px"
                      className="h-auto w-full shadow-[0_18px_40px_-18px_rgba(17,17,17,0.45)]"
                    />
                  </button>

                  <div className="text-center sm:text-left">
                    <h3 className="display-section text-[clamp(1.75rem,3.5vw,2.75rem)]">
                      {testiTappa.titolo}
                    </h3>
                    <p className="mt-3 text-base font-bold text-inchiostro/70 sm:text-lg">
                      {tappa.dataDaDefinire ? t.agenda.dataDaDefinire : dataEsatta(tappa, locale)}
                    </p>
                    {testiTappa.luogo && (
                      <p className="mt-2 text-sm text-inchiostro/60">
                        <LuogoTappa luogo={testiTappa.luogo} link={tappa.link} />
                      </p>
                    )}
                    {testiTappa.descrizione && (
                      <p className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-inchiostro/70 sm:mx-0">
                        {testiTappa.descrizione}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={`${tappa.id}-${i}`}
                variants={riseUp}
                className="border-b py-8 text-center hairline first:pt-0 last:border-0 sm:text-left"
              >
                <p
                  className={`kicker ${
                    corrente ? "text-inchiostro/60" : "text-inchiostro/40"
                  }`}
                >
                  {t.stati[tappa.tipo]}
                </p>

                <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <p
                    className={`display-section text-[clamp(1.5rem,4vw,2.5rem)] ${
                      corrente ? "text-inchiostro" : "text-inchiostro/70"
                    }`}
                  >
                    {testiTappa.titolo}
                  </p>

                  <p
                    className={`shrink-0 font-bold text-base sm:text-right sm:text-lg ${
                      corrente ? "text-inchiostro" : "text-inchiostro/60"
                    }`}
                  >
                    {tappa.dataDaDefinire ? t.agenda.dataDaDefinire : dataEsatta(tappa, locale)}
                  </p>
                </div>

                {testiTappa.luogo && (
                  <p className="mt-5 text-sm text-inchiostro/60">
                    <LuogoTappa luogo={testiTappa.luogo} link={tappa.link} />
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ---------- CTA: PROPORRE UNA DATA ---------- */}
        <motion.div
          variants={riseUp}
          className="mt-14 border-t pt-10 text-center hairline sm:text-left"
        >
          <p className="pull-quote mx-auto max-w-[32ch] sm:mx-0 text-[clamp(1.25rem,2.5vw,1.75rem)] text-inchiostro/80">
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

      <Lightbox
        src={locandinaAperta?.src}
        alt={locandinaAperta?.alt ?? ""}
        width={1131}
        height={1600}
        onClose={() => setLocandinaAperta(null)}
      />
    </section>
  );
}
