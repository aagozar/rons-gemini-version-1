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

/* La tappa in corso adesso, se ce n'è una. */
export function tappaInCorso(oggi: Date = new Date()): Tappa | undefined {
  return AGENDA.find((t) => inCorso(t, oggi));
}

/* L'agenda in ordine cronologico: si può scrivere AGENDA in
   lib/content.ts in qualunque ordine, qui si sistema da sé. */
export function agendaOrdinata(): Tappa[] {
  return [...AGENDA].sort((a, b) => inizio(a).getTime() - inizio(b).getTime());
}

/* La tappa da mostrare come "prossimo evento": quella in corso,
   altrimenti la prima non ancora iniziata, altrimenti — se sono
   tutte passate — l'ultima in agenda. */
export function prossimaTappa(oggi: Date = new Date()): Tappa {
  const corso = tappaInCorso(oggi);
  if (corso) return corso;

  const ordinata = agendaOrdinata();
  const futura = ordinata.find((t) => inizio(t) > oggi);
  return futura ?? ordinata[ordinata.length - 1] ?? AGENDA[0];
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

/* Il giorno esatto di inizio, non un intervallo: "1 settembre
   2026". Serve alla data ben visibile e in grassetto, a destra
   nella lista concerti, alla stessa altezza del nome dell'evento. */
export function dataEsatta(t: Tappa, locale: "it-IT" | "en-US" = "it-IT"): string {
  const dataInizio = inizio(t);
  const giorno = dataInizio.getDate();
  const mese = dataInizio
    .toLocaleDateString(locale, { month: "long" })
    .replace(/^./, (c) => c.toUpperCase());
  const anno = dataInizio.getFullYear();

  return `${giorno} ${mese} ${anno}`;
}
