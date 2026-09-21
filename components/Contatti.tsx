"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/content";
import { VIEWPORT, riseUp, stagger } from "@/lib/motion";
import Folio from "@/components/Folio";
import { useLingua } from "@/lib/useLingua";

type Esito = "fermo" | "invio" | "ok" | "errore";

const campo =
  "w-full border-b border-carta/25 bg-transparent py-4 text-base text-carta placeholder:text-carta/35 outline-none transition-colors duration-200 focus:border-carta";

/* ============================================================
   BOOKING
   ------------------------------------------------------------
   L'unico fondo pieno del sito, come richiesto dal brief: carta
   su inchiostro invece di inchiostro su carta.
   ============================================================ */
export default function Contatti() {
  const [esito, setEsito] = useState<Esito>("fermo");
  const { t } = useLingua();
  const c = t.contatti;

  async function invia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEsito("invio");
    const dati = Object.fromEntries(new FormData(e.currentTarget));

    try {
      /* COLLEGA QUI IL TUO SERVIZIO DI INVIO.
         Tre strade, dalla più semplice alla più flessibile:
         1. Formspree / Getform: sostituisci l'URL con il tuo
            endpoint e cancella la rotta /api.
         2. Resend + una route handler in app/api/contatti/route.ts
         3. Il CRM che già usi per il booking. */
      const risposta = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dati),
      });
      if (!risposta.ok) throw new Error();
      setEsito("ok");
    } catch {
      setEsito("errore");
    }
  }

  return (
    <section
      id="contatti"
      className="relative bg-inchiostro px-6 py-24 text-carta sm:px-10 lg:px-16 lg:py-32"
      aria-label={c.kicker}
    >
      <Folio numero="96" chiaro />

      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-20 2xl:max-w-7xl"
      >
        {/* ---------- COLONNA SINISTRA: SOCIAL ---------- */}
        <div>
          <motion.p variants={riseUp} className="kicker text-carta/55">
            {c.kicker}
          </motion.p>

          <motion.h2
            variants={riseUp}
            className="display-section mt-4 text-[clamp(2.5rem,7vw,5.5rem)]"
          >
            {c.titolo}
          </motion.h2>
          <motion.p
            variants={riseUp}
            className="mt-6 max-w-[44ch] text-base leading-relaxed text-carta/65"
          >
            {c.sottotitolo}
          </motion.p>

          <motion.div variants={riseUp} className="mt-10 flex gap-4">
            <IconaSocial href={SITE.social.instagram} nome="Instagram">
              <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 10.56a4.16 4.16 0 1 1 0-8.32 4.16 4.16 0 0 1 0 8.32Zm6.65-10.81a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </IconaSocial>

            <IconaSocial href={SITE.social.facebook} nome="Facebook">
              <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
            </IconaSocial>
          </motion.div>

          <motion.div variants={riseUp} className="mt-12 text-sm text-carta/55">
            <p>{SITE.email}</p>
            <p className="mt-1">{SITE.citta}</p>
          </motion.div>
        </div>

        {/* ---------- COLONNA DESTRA: FORM ---------- */}
        <motion.form
          variants={riseUp}
          onSubmit={invia}
          className="flex flex-col gap-7"
        >
          <div>
            <label htmlFor="nome" className="kicker text-carta/50">
              {c.nomeLabel}
            </label>
            <input
              id="nome"
              name="nome"
              required
              autoComplete="name"
              placeholder={c.nomePlaceholder}
              className={`${campo} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="email" className="kicker text-carta/50">
              {c.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={c.emailPlaceholder}
              className={`${campo} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="telefono" className="kicker text-carta/50">
              {c.telefonoLabel} <span className="normal-case">{c.telefonoFacoltativo}</span>
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              placeholder={c.telefonoPlaceholder}
              className={`${campo} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="motivo" className="kicker text-carta/50">
              {c.motivoLabel}
            </label>
            <select
              id="motivo"
              name="motivo"
              className={`${campo} mt-2 scheme-dark pr-6`}
            >
              <option value="booking">{c.motivoOpzioni.booking}</option>
              <option value="chitarra">{c.motivoOpzioni.chitarra}</option>
              <option value="quadro">{c.motivoOpzioni.quadro}</option>
              <option value="altro">{c.motivoOpzioni.altro}</option>
            </select>
          </div>

          <div>
            <label htmlFor="messaggio" className="kicker text-carta/50">
              {c.messaggioLabel}
            </label>
            <textarea
              id="messaggio"
              name="messaggio"
              rows={4}
              required
              placeholder={c.messaggioPlaceholder}
              className={`${campo} mt-2 resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={esito === "invio"}
            className="mt-2 self-start border border-carta px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-carta transition-colors duration-300 hover:bg-carta hover:text-inchiostro disabled:opacity-40"
          >
            {esito === "invio" ? c.invioInCorso : c.invia}
          </button>

          {/* Messaggi di esito: dicono cosa è successo e cosa fare,
              senza scusarsi e senza frasi vaghe. */}
          {esito === "ok" && (
            <p role="status" className="text-sm text-carta">
              {c.esitoOk}
            </p>
          )}
          {esito === "errore" && (
            <p role="alert" className="text-sm text-carta underline decoration-carta/40 underline-offset-4">
              {c.esitoErrorePrefisso}
              {SITE.email}.
            </p>
          )}
        </motion.form>
      </motion.div>

      <div className="mx-auto mt-24 max-w-6xl border-t border-carta/15 pt-8 text-xs text-carta/45 2xl:max-w-7xl">
        © {new Date().getFullYear()} {SITE.nome} · {SITE.creditiFoto}
      </div>
    </section>
  );
}

/* Icona social: minimale, si accende in inchiostro-su-carta al
   passaggio del mouse. Nessuna libreria di icone, nessun bagliore. */
function IconaSocial({
  href,
  nome,
  children,
}: {
  href: string;
  nome: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={nome}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className="group flex h-16 w-16 items-center justify-center border border-carta/30 transition-colors duration-300 hover:border-carta hover:bg-carta sm:h-20 sm:w-20"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="h-7 w-7 text-carta transition-colors duration-300 group-hover:text-inchiostro sm:h-8 sm:w-8"
      >
        {children}
      </svg>
    </motion.a>
  );
}
