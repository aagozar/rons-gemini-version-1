"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { SITE, STATI } from "@/lib/content";
import { prossimaTappa } from "@/lib/agenda";
import { DUR, EASE_OUT } from "@/lib/motion";

const VOCI = [
  { label: "Musica", href: "#musica" },
  { label: "Liuteria", href: "#liuteria" },
  { label: "Agenda", href: "#agenda" },
  { label: "Contatti", href: "#contatti" },
];

/* ============================================================
   MASTHEAD
   ------------------------------------------------------------
   Niente fondo, niente sfocatura: il testo è sempre bianco puro
   e la barra intera lavora in mix-blend-mode: difference, così
   resta leggibile sia sulla copertina scura sia sulla carta
   chiara sotto, senza bisogno di due stili diversi.
   Sotto gli 80px di scroll compare solo una linea sottile, non un
   fondo: è l'unico segnale che la pagina si è mossa.
   ============================================================ */
export default function NavBar() {
  const [compatta, setCompatta] = useState(false);
  const [menuAperto, setMenuAperto] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setCompatta(v > 80));

  const attuale = prossimaTappa();

  return (
    <header className="blend-nav fixed inset-x-0 top-0 z-40 text-white">
      <nav
        className={`flex items-center justify-between border-b px-6 py-5 transition-colors duration-300 sm:px-10 lg:px-16 ${
          compatta ? "border-white/25" : "border-transparent"
        }`}
      >
        <a
          href="#hero"
          className="display-section text-lg tracking-tight sm:text-xl"
        >
          {SITE.nome}
        </a>

        {/* Voci su desktop */}
        <ul className="hidden items-center gap-9 md:flex">
          {VOCI.map((v) => (
            <li key={v.href}>
              <a href={v.href} className="kicker">
                {v.label}
              </a>
            </li>
          ))}
          {/* Pillola di stato: dice subito cosa sta facendo */}
          <li className="flex items-center gap-2 border border-white/30 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
            <span className="kicker">{STATI[attuale.tipo].label}</span>
          </li>
        </ul>

        {/* Apertura menu su mobile */}
        <button
          onClick={() => setMenuAperto((v) => !v)}
          aria-expanded={menuAperto}
          aria-controls="menu-mobile"
          className="kicker md:hidden"
        >
          {menuAperto ? "Chiudi" : "Menu"}
        </button>
      </nav>

      {/* Pannello mobile: animazione in risposta a un'azione
          dell'utente, quindi va bene che sia evidente. Qui usciamo
          dal blend mode (fondo pieno) perché deve coprire il
          contenuto sotto, non fondersi con esso. */}
      <AnimatePresence>
        {menuAperto && (
          <motion.ul
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DUR.fast, ease: EASE_OUT }}
            style={{ mixBlendMode: "normal" }}
            className="overflow-hidden border-t border-inchiostro/20 bg-carta px-6 text-inchiostro md:hidden"
          >
            {VOCI.map((v) => (
              <li key={v.href} className="border-b border-inchiostro/15 last:border-0">
                <a
                  href={v.href}
                  onClick={() => setMenuAperto(false)}
                  className="display-section block py-4 text-2xl"
                >
                  {v.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
