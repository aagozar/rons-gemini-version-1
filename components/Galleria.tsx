"use client";

import { motion } from "framer-motion";
import { GALLERIA_COMPLETA, SITE } from "@/lib/content";
import { VIEWPORT, riseUp } from "@/lib/motion";
import GrigliaMasonry from "@/components/GrigliaMasonry";
import { useLingua } from "@/lib/useLingua";

/* ============================================================
   STRISCIA "TUTTI I MEDIA"
   ------------------------------------------------------------
   Un inserto tra due capitoli, non uno spread a sé: per questo
   non porta un numero di pagina finto. Stesso mosaico a colonne
   delle pagine dedicate (vedi GrigliaMasonry.tsx), ma qui è
   l'unico punto del sito dove le foto e i video di Musica e
   Liuteria compaiono insieme — niente didascalie per singola
   tessera, solo il kicker sopra e i crediti sotto.
   PER AGGIUNGERE UN MEDIA: lib/content.ts → MUSICA_MASONRY o
   LIUTERIA_MASONRY (GALLERIA_COMPLETA li unisce da sola). */
export default function Galleria() {
  const { t } = useLingua();

  return (
    <section
      className="border-t px-6 py-20 hairline bg-carta sm:px-10 lg:px-16"
      aria-label={t.galleria.aria}
    >
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={riseUp}
        className="kicker mx-auto max-w-6xl text-inchiostro/50 2xl:max-w-7xl"
      >
        {t.galleria.kicker}
      </motion.p>

      <div className="mx-auto mt-8 max-w-6xl 2xl:max-w-7xl">
        <GrigliaMasonry tessere={GALLERIA_COMPLETA} alt={t.galleria.aria} />
      </div>

      {/* I crediti al fotografo stanno sotto le foto, dove servono */}
      <p className="mx-auto mt-8 max-w-6xl text-xs text-inchiostro/45 2xl:max-w-7xl">
        {SITE.creditiFoto}
      </p>
    </section>
  );
}
