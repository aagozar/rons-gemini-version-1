"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERIA, SITE } from "@/lib/content";
import { DUR, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { useLingua } from "@/lib/useLingua";

/* ============================================================
   STRISCIA LIVE
   ------------------------------------------------------------
   Un inserto tra due capitoli, non uno spread a sé: per questo
   non porta un numero di pagina finto. Didascalie in corsivo
   minuto sotto ogni foto, stile Kinfolk/Gentlewoman.
   PER AGGIUNGERNE ALTRE, o per sostituirle con foto di bottega:
   lib/content.ts → GALLERIA.
   ============================================================ */
export default function Galleria() {
  const { t } = useLingua();

  return (
    <section
      className="border-t px-6 py-20 hairline bg-carta sm:px-10 lg:px-16"
      aria-label={t.galleria.aria}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:gap-10">
        {GALLERIA.map((foto, i) => {
          const testiFoto = t.galleria.foto[foto.id];
          return (
            <motion.figure
              key={foto.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.base, ease: EASE_OUT, delay: i * 0.1 }}
              className="text-left"
            >
              {/* aspect-[3/4]: le due foto hanno proporzioni diverse
                  ma il contenitore le uniforma, così la griglia resta
                  allineata. */}
              <div className="relative aspect-[3/4] overflow-hidden bg-inchiostro/5">
                <Image
                  src={foto.src}
                  alt={testiFoto.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="caption mt-3">{testiFoto.didascalia}</figcaption>
            </motion.figure>
          );
        })}
      </div>

      {/* I crediti al fotografo stanno sotto le foto, dove servono */}
      <p className="mx-auto mt-8 max-w-5xl text-xs text-inchiostro/45">
        {SITE.creditiFoto}
      </p>
    </section>
  );
}
