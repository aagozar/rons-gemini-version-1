"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { SITE } from "@/lib/content";
import { prossimaTappa } from "@/lib/agenda";
import { DUR, EASE_OUT } from "@/lib/motion";
import { useLingua } from "@/lib/useLingua";
import { LINGUE } from "@/lib/dizionario";

/* ============================================================
   MASTHEAD
   ------------------------------------------------------------
   In cima alla copertina niente fondo: il testo è bianco puro e
   la barra lavora in mix-blend-mode: difference, così resta
   leggibile sulla foto scura senza bisogno di un fondo. Superati
   gli 80px di scroll il blend si spegne e la barra diventa un
   fondo pieno (carta su inchiostro): da lì in poi il contenuto
   scorre sotto, quindi serve un fondo solido per restare
   leggibile, non più solo una linea sottile.
   ============================================================ */
export default function NavBar() {
  const [compatta, setCompatta] = useState(false);
  const [menuAperto, setMenuAperto] = useState(false);
  const { scrollY } = useScroll();
  const { lingua, impostaLingua, t } = useLingua();

  useMotionValueEvent(scrollY, "change", (v) => setCompatta(v > 80));

  const attuale = prossimaTappa();

  const VOCI = [
    { label: t.nav.musica, href: "/musica" },
    { label: t.nav.liuteria, href: "/liuteria" },
    { label: t.nav.agenda, href: "/#agenda" },
    { label: t.nav.contatti, href: "/#contatti" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        compatta ? "bg-carta text-inchiostro" : "blend-nav text-white"
      }`}
    >
      <nav
        className={`flex items-center justify-between border-b px-6 py-5 transition-colors duration-300 sm:px-10 lg:px-16 ${
          compatta ? "border-inchiostro/12" : "border-transparent"
        }`}
      >
        <Link
          href="/"
          className="display-section text-lg tracking-tight sm:text-xl"
        >
          {SITE.nome}
        </Link>

        {/* Voci su desktop */}
        <ul className="hidden items-center gap-9 md:flex">
          {VOCI.map((v) => (
            <li key={v.href}>
              <Link href={v.href} className="kicker">
                {v.label}
              </Link>
            </li>
          ))}
          {/* Pillola di stato: dice subito cosa sta facendo */}
          <li
            className={`flex items-center gap-2 border px-3 py-1.5 transition-colors duration-300 ${
              compatta ? "border-inchiostro/30" : "border-white/30"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                compatta ? "bg-inchiostro" : "bg-white"
              }`}
              aria-hidden
            />
            <span className="kicker">{t.stati[attuale.tipo]}</span>
          </li>

          {/* Selettore lingua: IT / EN, la lingua attiva è piena,
              l'altra è affievolita — nessuna bandiera, nessuna
              icona, coerente col resto del sito. */}
          <li
            className={`flex items-center gap-1.5 ${
              compatta ? "text-inchiostro" : "text-white"
            }`}
          >
            {LINGUE.map((l, i) => (
              <span key={l.codice} className="flex items-center gap-1.5">
                {i > 0 && <span className="kicker opacity-30">/</span>}
                <button
                  type="button"
                  onClick={() => impostaLingua(l.codice)}
                  aria-pressed={lingua === l.codice}
                  className={`kicker transition-opacity duration-200 ${
                    lingua === l.codice ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  {l.label}
                </button>
              </span>
            ))}
          </li>
        </ul>

        {/* Apertura menu su mobile */}
        <button
          onClick={() => setMenuAperto((v) => !v)}
          aria-expanded={menuAperto}
          aria-controls="menu-mobile"
          className="kicker md:hidden"
        >
          {menuAperto ? t.nav.chiudi : t.nav.menu}
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
                <Link
                  href={v.href}
                  onClick={() => setMenuAperto(false)}
                  className="display-section block py-4 text-2xl"
                >
                  {v.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 py-4">
              {LINGUE.map((l) => (
                <button
                  key={l.codice}
                  type="button"
                  onClick={() => impostaLingua(l.codice)}
                  aria-pressed={lingua === l.codice}
                  className={`kicker transition-opacity duration-200 ${
                    lingua === l.codice ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
