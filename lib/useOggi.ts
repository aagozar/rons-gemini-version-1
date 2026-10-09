"use client";

import { useEffect, useState } from "react";

/* ============================================================
   LA DATA DI OGGI, VISTA DAL BROWSER
   ------------------------------------------------------------
   Il sito è statico: l'HTML viene generato una volta sola, al
   momento della pubblicazione. Se l'agenda usasse new Date()
   direttamente, il "prossimo evento" resterebbe fermo al giorno
   del build. Questo hook parte dalla data del build (identica sul
   server e nel primo render del browser, così React non segnala
   differenze) e subito dopo la sostituisce con la data vera del
   dispositivo. Poi si aggiorna da solo a ogni mezzanotte, per chi
   lascia la pagina aperta.
   ============================================================ */
const DATA_BUILD = new Date(process.env.NEXT_PUBLIC_DATA_BUILD ?? Date.now());

export function useOggi(): Date {
  const [oggi, setOggi] = useState(DATA_BUILD);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const aggiorna = () => {
      const adesso = new Date();
      setOggi(adesso);
      const mezzanotte = new Date(adesso);
      mezzanotte.setHours(24, 0, 1, 0);
      timer = setTimeout(aggiorna, mezzanotte.getTime() - adesso.getTime());
    };
    aggiorna();
    return () => clearTimeout(timer);
  }, []);

  return oggi;
}
