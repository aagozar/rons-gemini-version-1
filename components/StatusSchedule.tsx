"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { dataEsatta, inCorso, tappeFuture } from "@/lib/agenda";
import { riseUp, stagger } from "@/lib/motion";
import Folio from "@/components/Folio";
import Lightbox from "@/components/Lightbox";
import LuogoTappa from "@/components/LuogoTappa";
import { useLingua } from "@/lib/useLingua";
import { useOggi } from "@/lib/useOggi";

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
  /* Le tappe già finite non compaiono più. La prima ancora in
     corso o futura è il "prossimo evento", le altre le "date
     future". Tutto ricalcolato sulla data del browser (useOggi). */
  const oggi = useOggi();
  const [attuale, ...dateFuture] = tappeFuture(oggi);
  const testiAttuale = attuale && t.agenda.tappe[attuale.id];
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
        /* amount basso di proposito: questo blocco contiene tutta
           l'agenda ed è alto migliaia di px. Con VIEWPORT (30%) su
           una finestra più bassa del 30% del blocco la soglia non
           si raggiunge mai e le righe restano invisibili. */
        viewport={{ once: true, amount: 0.05 }}
        className="mx-auto max-w-4xl 2xl:max-w-5xl"
      >
        {/* ---------- PROSSIMO EVENTO ----------
            Lo stato (es. "In tour") resta come occhiello sopra il
            titolo della prima parte. */}
        {attuale && (
          <motion.p variants={riseUp} className="kicker text-center text-inchiostro/50 sm:text-left">
            {t.stati[attuale.tipo]}
          </motion.p>
        )}

        <motion.h2
          variants={riseUp}
          className="display-section mt-4 text-center text-[clamp(2rem,5.5vw,4rem)] sm:text-left"
        >
          {t.agenda.prossimoEvento}
        </motion.h2>

        {!attuale ? (
          <motion.p
            variants={riseUp}
            className="mx-auto mt-4 max-w-[50ch] text-center text-base text-inchiostro/70 sm:mx-0 sm:text-left"
          >
            {t.agenda.nessunaData}
          </motion.p>
        ) : attuale.locandina ? (
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
          /* Senza locandina: lo stesso blocco di testo della versione
             con locandina (nome, data, luogo, descrizione), senza
             l'immagine a fianco. */
          <motion.div variants={riseUp} className="mt-8 text-center sm:text-left">
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
          </motion.div>
        )}

        {/* ---------- LISTA DELLE DATE ----------
            Ogni tappa ha la sua riga, tranne quella attuale: è già
            raccontata qui sopra come evento principale, quindi non si
            ripete qui sotto. Se una tappa ha una locandina
            (lib/content.ts → locandina) la riga si presenta come la
            locandina di un film, in piccolo (la versione grande è
            riservata all'evento principale): immagine a sinistra, a destra nome,
            data, luogo e descrizione (lib/dizionario.ts → tappe →
            descrizione). Senza locandina resta la riga compatta:
            stato in alto, poi nome dell'evento e data esatta fratelli
            nello stesso flex — così restano alla stessa altezza — la
            data in grassetto a destra. Il luogo chiude la riga.
            SU MOBILE la lista diventa compatta, come l'elenco video di
            YouTube: una riga per tappa, miniatura piccola a sinistra e
            testo allineato a sinistra accanto; la descrizione si
            nasconde. Le tappe senza locandina hanno al posto della
            miniatura un riquadro con giorno e mese, così i testi
            restano tutti in colonna. */}
        {dateFuture.length > 0 && (
          <motion.h2
            variants={riseUp}
            className="display-section mt-16 border-t pt-12 text-center text-[clamp(2rem,5.5vw,4rem)] hairline sm:text-left"
          >
            {t.agenda.dateFuture}
          </motion.h2>
        )}
        <div className="mt-10">
          {dateFuture.map((tappa, i) => {
            const corrente = inCorso(tappa, oggi);
            const testiTappa = t.agenda.tappe[tappa.id];

            if (tappa.locandina) {
              return (
                <motion.div
                  key={`${tappa.id}-${i}`}
                  variants={riseUp}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 border-b py-4 hairline first:pt-0 last:border-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8 sm:py-8 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10"
                >
                  <button
                    type="button"
                    onClick={() => setLocandinaAperta({ src: tappa.locandina!, alt: testiTappa.titolo })}
                    aria-label={testiTappa.titolo}
                    className="block w-full cursor-zoom-in"
                  >
                    <Image
                      src={tappa.locandina}
                      alt={testiTappa.titolo}
                      width={1131}
                      height={1600}
                      sizes="(max-width: 640px) 72px, (max-width: 1024px) 112px, 128px"
                      className="h-auto w-full shadow-[0_8px_20px_-10px_rgba(17,17,17,0.45)] sm:shadow-[0_12px_28px_-14px_rgba(17,17,17,0.45)]"
                    />
                  </button>

                  <div className="min-w-0 text-left">
                    <h3 className="display-section text-xl sm:text-[clamp(1.5rem,4vw,2.5rem)]">
                      {testiTappa.titolo}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-inchiostro/70 sm:mt-3 sm:text-lg">
                      {tappa.dataDaDefinire ? t.agenda.dataDaDefinire : dataEsatta(tappa, locale)}
                    </p>
                    {testiTappa.luogo && (
                      <p className="mt-0.5 truncate text-xs text-inchiostro/60 sm:mt-2 sm:text-sm">
                        <LuogoTappa luogo={testiTappa.luogo} link={tappa.link} />
                      </p>
                    )}
                    {testiTappa.descrizione && (
                      <p className="mt-6 hidden max-w-[52ch] text-base leading-relaxed text-inchiostro/70 sm:block">
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
                className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 border-b py-4 hairline first:pt-0 last:border-0 sm:block sm:py-8"
              >
                {/* Solo su mobile: riquadro al posto della miniatura. */}
                <div
                  aria-hidden
                  className="flex aspect-[1131/1600] w-full flex-col items-center justify-center border hairline text-inchiostro/60 sm:hidden"
                >
                  {tappa.dataDaDefinire ? (
                    <span className="text-xs font-bold">—</span>
                  ) : (
                    <>
                      <span className="text-xl font-bold leading-none">
                        {new Date(`${tappa.dataInizio}T00:00:00`).getDate()}
                      </span>
                      <span className="mt-1 text-[0.65rem] uppercase tracking-[0.1em]">
                        {new Date(`${tappa.dataInizio}T00:00:00`).toLocaleDateString(locale, {
                          month: "short",
                        })}
                      </span>
                    </>
                  )}
                </div>

                <div className="min-w-0 text-left">
                  <p
                    className={`kicker hidden sm:block ${
                      corrente ? "text-inchiostro/60" : "text-inchiostro/40"
                    }`}
                  >
                    {t.stati[tappa.tipo]}
                  </p>

                  <div className="flex flex-col gap-1 sm:mt-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <p
                      className={`display-section text-xl sm:text-[clamp(1.5rem,4vw,2.5rem)] ${
                        corrente ? "text-inchiostro" : "text-inchiostro/70"
                      }`}
                    >
                      {testiTappa.titolo}
                    </p>

                    <p
                      className={`shrink-0 font-bold text-sm sm:text-right sm:text-lg ${
                        corrente ? "text-inchiostro" : "text-inchiostro/60"
                      }`}
                    >
                      {tappa.dataDaDefinire ? t.agenda.dataDaDefinire : dataEsatta(tappa, locale)}
                    </p>
                  </div>

                  {testiTappa.luogo && (
                    <p className="mt-0.5 truncate text-xs text-inchiostro/60 sm:mt-5 sm:text-sm">
                      <LuogoTappa luogo={testiTappa.luogo} link={tappa.link} />
                    </p>
                  )}
                </div>
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
