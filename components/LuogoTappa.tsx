/* Il luogo di una tappa. Se la tappa ha un link (lib/content.ts →
   AGENDA), il nome del locale — la parte prima della virgola —
   diventa cliccabile e apre il suo sito in una nuova scheda; la
   città dopo la virgola resta testo normale. Il colore lo eredita
   da chi lo usa, così funziona sia sul bianco dell'agenda sia
   sulla copertina scura. */
export default function LuogoTappa({ luogo, link }: { luogo?: string; link?: string }) {
  if (!luogo) return null;
  if (!link) return <>{luogo}</>;

  const virgola = luogo.indexOf(",");
  const nome = virgola === -1 ? luogo : luogo.slice(0, virgola);
  const resto = virgola === -1 ? "" : luogo.slice(virgola);

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-current/40 underline-offset-4 transition-colors duration-200 hover:decoration-current"
      >
        {nome}
      </a>
      {resto}
    </>
  );
}
