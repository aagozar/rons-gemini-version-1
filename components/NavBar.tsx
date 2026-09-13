"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { SITE, AGENDA, STATI } from "@/lib/content";
import { DUR, EASE_OUT } from "@/lib/motion";

const VOCI = [
  { label: "Musica", href: "#musica" },
  { label: "Liuteria", href: "#liuteria" },
  { label: "Agenda", href: "#agenda" },
  { label: "Contatti", href: "#contatti" },
];

export default function NavBar() {
  const [compatta, setCompatta] = useState(false);
  const [menuAperto, setMenuAperto] = useState(false);
  const { scrollY } = useScroll();

  /* Dopo 80px la barra prende fondo scuro e sfocatura:
     resta leggibile sopra qualsiasi immagine. */
  useMotionValueEvent(scrollY, "change", (v) => setCompatta(v > 80));

  const attuale = AGENDA.find((t) => t.attuale) ?? AGENDA[0];
  const colore = STATI[attuale.stato].hex;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        compatta
          ? "border-b border-fumo bg-palco/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#hero" className="display text-lg tracking-tight sm:text-xl">
          {SITE.nome}
        </a>

        {/* Voci su desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {VOCI.map((v) => (
            <li key={v.href}>
              <a
                href={v.href}
                className="text-sm text-cenere transition-colors duration-200 hover:text-calce"
              >
                {v.label}
              </a>
            </li>
          ))}
          {/* Pillola di stato: dice subito cosa sta facendo */}
          <li className="flex items-center gap-2 border border-fumo px-3 py-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colore, boxShadow: `0 0 10px ${colore}` }}
            />
            <span className="text-xs text-calce">
              {STATI[attuale.stato].label}
            </span>
          </li>
        </ul>

        {/* Apertura menu su mobile */}
        <button
          onClick={() => setMenuAperto((v) => !v)}
          aria-expanded={menuAperto}
          aria-controls="menu-mobile"
          className="text-sm font-semibold md:hidden"
        >
          {menuAperto ? "Chiudi" : "Menu"}
        </button>
      </nav>

      {/* Pannello mobile: animazione in risposta a un'azione
          dell'utente, quindi va bene che sia evidente. */}
      <AnimatePresence>
        {menuAperto && (
          <motion.ul
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DUR.fast, ease: EASE_OUT }}
            className="overflow-hidden border-t border-fumo bg-palco px-6 md:hidden"
          >
            {VOCI.map((v) => (
              <li key={v.href} className="border-b border-fumo/60 last:border-0">
                <a
                  href={v.href}
                  onClick={() => setMenuAperto(false)}
                  className="block py-4 text-lg"
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
