/* ============================================================
   NUMERO DI PAGINA FINTO
   ------------------------------------------------------------
   Il piccolo "p. 12" in alto a destra di ogni sezione grande,
   come nei margini di una rivista stampata. Puramente
   scenografico: usalo solo sulle sezioni principali, non sulla
   striscia della Galleria (è un inserto, non un capitolo).
   ============================================================ */
export default function Folio({
  numero,
  chiaro = false,
}: {
  numero: string;
  chiaro?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`folio absolute right-6 top-8 sm:right-10 sm:top-10 lg:right-16 ${
        chiaro ? "text-carta/50" : "text-inchiostro/45"
      }`}
    >
      p. {numero}
    </span>
  );
}
