"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DIZIONARIO, type Dizionario, type Lingua } from "@/lib/dizionario";

/* ============================================================
   STATO DELLA LINGUA
   ------------------------------------------------------------
   Un context React molto semplice: tiene in memoria quale lingua
   è scelta, la salva in localStorage (così resta impostata anche
   dopo un refresh) e la espone a ogni componente tramite
   useLingua(). Il sito parte sempre in inglese al primo
   caricamento (anche per chi ha già scelto IT in passato, finché
   il client non idrata) per evitare un lampo di contenuto che
   cambia lingua sotto gli occhi.
   ============================================================ */

const CHIAVE_STORAGE = "rg-lingua";

type ContestoLingua = {
  lingua: Lingua;
  impostaLingua: (l: Lingua) => void;
  t: Dizionario;
};

const LinguaContext = createContext<ContestoLingua | null>(null);

export function LinguaProvider({ children }: { children: ReactNode }) {
  const [lingua, setLingua] = useState<Lingua>("en");

  /* Legge la lingua salvata SOLO all'avvio, senza mai riscriverla:
     se lo facesse in un effetto separato che reagisce a "lingua",
     quell'effetto scriverebbe anche il valore di default "en" del
     primissimo render, sovrascrivendo "it" appena letto (corsa fra
     i due effetti). La scrittura in localStorage avviene quindi
     solo dentro impostaLingua, cioè solo quando l'utente sceglie
     davvero una lingua. */
  useEffect(() => {
    try {
      const salvata = window.localStorage.getItem(CHIAVE_STORAGE);
      if (salvata === "it" || salvata === "en") setLingua(salvata);
    } catch {
      /* localStorage non disponibile (privacy mode ecc.): si resta in inglese */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lingua;
  }, [lingua]);

  function impostaLingua(l: Lingua) {
    setLingua(l);
    try {
      window.localStorage.setItem(CHIAVE_STORAGE, l);
    } catch {
      /* niente di grave: la scelta semplicemente non persiste */
    }
  }

  return (
    <LinguaContext.Provider value={{ lingua, impostaLingua, t: DIZIONARIO[lingua] }}>
      {children}
    </LinguaContext.Provider>
  );
}

export function useLingua() {
  const contesto = useContext(LinguaContext);
  if (!contesto) {
    throw new Error("useLingua() va chiamato dentro <LinguaProvider>");
  }
  return contesto;
}
