"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/content";
import { VIEWPORT, riseUp, stagger } from "@/lib/motion";

type Esito = "fermo" | "invio" | "ok" | "errore";

const campo =
  "w-full border-b border-fumo bg-transparent py-4 text-base text-calce placeholder:text-cenere/60 outline-none transition-colors duration-200 focus:border-calce";

export default function Contatti() {
  const [esito, setEsito] = useState<Esito>("fermo");

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
      className="relative border-t border-fumo bg-palco px-6 py-28 sm:px-10 lg:px-16 lg:py-36"
      aria-label="Contatti"
    >
      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-2 lg:gap-16"
      >
        {/* ---------- COLONNA SINISTRA: SOCIAL ---------- */}
        <div>
          <motion.h2
            variants={riseUp}
            className="display text-[clamp(2.5rem,7vw,5.5rem)]"
          >
            Parliamone
          </motion.h2>
          <motion.p
            variants={riseUp}
            className="mt-6 max-w-[44ch] text-base leading-relaxed text-cenere"
          >
            Una data da fissare, una chitarra da costruire, un quadro da
            portare a casa. Rispondo di persona, di solito entro due giorni.
          </motion.p>

          <motion.div variants={riseUp} className="mt-10 flex gap-4">
            <IconaSocial
              href={SITE.social.instagram}
              nome="Instagram"
              colore="#E6453A"
            >
              <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 10.56a4.16 4.16 0 1 1 0-8.32 4.16 4.16 0 0 1 0 8.32Zm6.65-10.81a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </IconaSocial>

            <IconaSocial
              href={SITE.social.facebook}
              nome="Facebook"
              colore="#2CE86A"
            >
              <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
            </IconaSocial>
          </motion.div>

          <motion.div variants={riseUp} className="mt-12 text-sm text-cenere">
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
            <label htmlFor="nome" className="text-xs text-cenere">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              required
              autoComplete="name"
              placeholder="Come ti chiami"
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="email" className="text-xs text-cenere">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="dove ti rispondo"
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="motivo" className="text-xs text-cenere">
              Di cosa si tratta
            </label>
            <select id="motivo" name="motivo" className={`${campo} pr-6`}>
              <option value="booking">Una data da fissare</option>
              <option value="chitarra">Una chitarra su misura</option>
              <option value="quadro">Un'opera o una commissione</option>
              <option value="altro">Altro</option>
            </select>
          </div>

          <div>
            <label htmlFor="messaggio" className="text-xs text-cenere">
              Messaggio
            </label>
            <textarea
              id="messaggio"
              name="messaggio"
              rows={4}
              required
              placeholder="Date, budget, tempi: più sei preciso, più la risposta è utile"
              className={`${campo} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={esito === "invio"}
            className="mt-2 self-start bg-calce px-8 py-4 text-sm font-semibold text-palco transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50"
          >
            {esito === "invio" ? "Invio in corso" : "Invia il messaggio"}
          </button>

          {/* Messaggi di esito: dicono cosa è successo e cosa fare,
              senza scusarsi e senza frasi vaghe. */}
          {esito === "ok" && (
            <p role="status" className="text-sm text-ambra">
              Messaggio inviato. Ti rispondo entro due giorni.
            </p>
          )}
          {esito === "errore" && (
            <p role="alert" className="text-sm text-cadmio">
              L&apos;invio non è riuscito. Riprova o scrivi direttamente a{" "}
              {SITE.email}.
            </p>
          )}
        </motion.form>
      </motion.div>

      <div className="mx-auto mt-24 max-w-6xl border-t border-fumo pt-8 text-xs text-cenere">
        © {new Date().getFullYear()} {SITE.nome} · {SITE.creditiFoto}
      </div>
    </section>
  );
}

/* Icona social grande: il riquadro si colora al passaggio del
   mouse e al focus da tastiera. Nessuna libreria di icone. */
function IconaSocial({
  href,
  nome,
  colore,
  children,
}: {
  href: string;
  nome: string;
  colore: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={nome}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      /* Molla invece di durata: la reazione al mouse sembra
         fisica. stiffness più alto = più scattante. */
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className="group relative flex h-20 w-20 items-center justify-center border border-fumo transition-colors duration-300 hover:border-transparent sm:h-24 sm:w-24"
      style={{ ["--c" as string]: colore }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="relative z-10 h-8 w-8 text-calce transition-colors duration-300 sm:h-9 sm:w-9"
      >
        {children}
      </svg>
      <span
        aria-hidden
        className="pointer-events-none absolute h-20 w-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:h-24 sm:w-24"
        style={{ boxShadow: `0 0 32px ${colore}55`, border: `1px solid ${colore}` }}
      />
    </motion.a>
  );
}
