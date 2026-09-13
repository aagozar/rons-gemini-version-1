"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERIA, SITE } from "@/lib/content";
import { DUR, EASE_OUT, VIEWPORT } from "@/lib/motion";

/* ============================================================
   STRISCIA LIVE
   ------------------------------------------------------------
   Due foto affiancate, formato verticale: sono ritratti di palco
   e il verticale li valorizza. PER AGGIUNGERNE ALTRE, o per
   sostituirle con foto di bottega: lib/content.ts → GALLERIA.
   ============================================================ */
export default function Galleria() {
  return (
    <section
      className="border-t border-fumo bg-palco px-6 py-20 sm:px-10 lg:px-16"
      aria-label="Immagini dal vivo"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6">
        {GALLERIA.map((foto, i) => (
          <motion.figure
            key={foto.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: i * 0.1 }}
            /* aspect-[3/4]: le due foto hanno proporzioni diverse
               (670×1024 e 739×1450) ma il contenitore le uniforma,
               così la griglia resta allineata. Chi guarda non se ne
               accorge, il layout sì. */
            className="relative aspect-[3/4] overflow-hidden bg-bruciato"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(max-width: 640px) 50vw, 40vw"
              className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
            />
          </motion.figure>
        ))}
      </div>

      {/* I crediti al fotografo stanno sotto le foto, dove servono */}
      <p className="mx-auto mt-5 max-w-5xl text-xs text-cenere">
        {SITE.creditiFoto}
      </p>
    </section>
  );
}
