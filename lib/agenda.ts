import { AGENDA, type Tappa } from "@/lib/content";

/* ============================================================
   CALCOLO DELL'AGENDA — nessun dato qui dentro, solo logica.
   I testi e le date stanno in lib/content.ts; qui si decide, in
   base alla data del dispositivo di chi guarda il sito, qual è
   la tappa in corso e qual è la prossima. Così non serve più
   aggiornare un flag "attuale" a mano ogni volta.
   ============================================================ */

function inizio(t: Tappa): Date {
  return new Date(`${t.dataInizio}T00:00:00`);
}

function fine(t: Tappa): Date {
  return new Date(`${t.dataFine ?? t.dataInizio}T23:59:59`);
}

/* True se "oggi" cade dentro l'intervallo della tappa. */
export function inCorso(t: Tappa, oggi: Date = new Date()): boolean {
  return oggi >= inizio(t) && oggi <= fine(t);
}

/* L'agenda in ordine cronologico: si può scrivere AGENDA in
   lib/content.ts in qualunque ordine, qui si sistema da sé. */
export function agendaOrdinata(): Tappa[] {
  return [...AGENDA].sort((a, b) => inizio(a).getTime() - inizio(b).getTime());
}

/* Solo le tappe non ancora finite (in corso o future), in ordine
   cronologico: quelle passate spariscono da sole dal sito, il
   giorno dopo la loro data di fine. Le tappe "data da definire"
   restano sempre, in fondo alla lista. */
export function tappeFuture(oggi: Date = new Date()): Tappa[] {
  return agendaOrdinata().filter((t) => fine(t) >= oggi);
}

/* La tappa da mostrare come "prossimo evento": la prima non ancora
   finita (quindi quella in corso, se ce n'è una). Undefined se
   sono tutte passate. */
export function prossimaTappa(oggi: Date = new Date()): Tappa | undefined {
  return tappeFuture(oggi)[0];
}

/* "Settembre 2026" per una tappa di un mese, "Ottobre — Novembre
   2026" per un intervallo, "Dicembre 2026 — Gennaio 2027" se
   l'intervallo scavalca l'anno. Il locale ("it-IT" / "en-US")
   decide solo il nome del mese: la struttura resta identica. */
export function periodo(t: Tappa, locale: "it-IT" | "en-US" = "it-IT"): string {
  const dataInizio = inizio(t);
  const dataFine = t.dataFine ? fine(t) : dataInizio;

  const mese = (d: Date) =>
    d.toLocaleDateString(locale, { month: "long" }).replace(/^./, (c) => c.toUpperCase());

  const annoInizio = dataInizio.getFullYear();
  const annoFine = dataFine.getFullYear();
  const meseInizio = mese(dataInizio);
  const meseFine = mese(dataFine);

  if (meseInizio === meseFine && annoInizio === annoFine) {
    return `${meseInizio} ${annoInizio}`;
  }
  if (annoInizio === annoFine) {
    return `${meseInizio} — ${meseFine} ${annoInizio}`;
  }
  return `${meseInizio} ${annoInizio} — ${meseFine} ${annoFine}`;
}

/* Il giorno esatto di inizio: "1 settembre 2026". Se la tappa
   dura più giorni nello stesso mese, "25–26 Settembre 2026".
   Serve alla data ben visibile e in grassetto, a destra nella
   lista concerti, alla stessa altezza del nome dell'evento. */
export function dataEsatta(t: Tappa, locale: "it-IT" | "en-US" = "it-IT"): string {
  const dataInizio = inizio(t);
  const giorno = dataInizio.getDate();
  const mese = dataInizio
    .toLocaleDateString(locale, { month: "long" })
    .replace(/^./, (c) => c.toUpperCase());
  const anno = dataInizio.getFullYear();

  const dataFine = t.dataFine ? fine(t) : undefined;
  const stessoMese =
    dataFine &&
    dataFine.getMonth() === dataInizio.getMonth() &&
    dataFine.getFullYear() === anno &&
    dataFine.getDate() !== giorno;

  return stessoMese
    ? `${giorno}–${dataFine.getDate()} ${mese} ${anno}`
    : `${giorno} ${mese} ${anno}`;
}
