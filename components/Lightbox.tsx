"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { DUR, EASE_OUT } from "@/lib/motion";

/* ============================================================
   LIGHTBOX — foto a schermo intero su sfondo scuro trasparente
   ------------------------------------------------------------
   Usato dalla griglia masonry (GrigliaMasonry.tsx) e dalle
   locandine in agenda (StatusSchedule.tsx): un solo componente,
   chi lo usa tiene lo stato (quale immagine è aperta, se lo è) e
   passa src/width/height della foto cliccata. width/height sono
   le stesse dimensioni reali già note a chi chiama (servono a
   next/image per non deformare l'immagine). Si chiude cliccando
   fuori, sulla ×, o con Esc.
   ============================================================ */
export default function Lightbox({
  src,
  alt,
  width,
  height,
  onClose,
}: {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;

    const suEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", suEsc);

    const overflowOriginale = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", suEsc);
      document.body.style.overflow = overflowOriginale;
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.micro, ease: EASE_OUT }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-inchiostro/90 p-6 sm:p-12"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute right-5 top-5 text-3xl leading-none text-carta transition-opacity duration-200 hover:opacity-60 sm:right-8 sm:top-8"
          >
            ×
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: DUR.fast, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="100vw"
              className="h-auto max-h-[85vh] w-auto max-w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
