import Image from "next/image";
import type { TesseraMasonry } from "@/lib/content";

/* ============================================================
   GRIGLIA A MOSAICO — condivisa tra le pagine dedicate
   (PaginaMestiereEsteso.tsx) e la striscia "tutti i media" in
   homepage (Galleria.tsx). Colonne CSS invece di una griglia a
   righe fisse: si adattano da sole all'altezza reale di ogni
   foto/video, senza bisogno di calcolarla a mano.
   ============================================================ */
export default function GrigliaMasonry({
  tessere,
  alt,
  classNameContenitore = "columns-2 gap-4 sm:columns-3 lg:gap-6",
}: {
  tessere: TesseraMasonry[];
  alt: string;
  classNameContenitore?: string;
}) {
  return (
    <div className={classNameContenitore}>
      {tessere.map((tessera, i) => (
        <TesseraGalleria key={i} tessera={tessera} alt={alt} />
      ))}
    </div>
  );
}

/* Una tessera della griglia: foto con le sue proporzioni reali
   (niente deformazioni quando la colonna la ridimensiona) o video
   in un riquadro 16:9, di cui non conosciamo le proporzioni
   native. object-cover evita comunque distorsioni in entrambi i
   casi. In bianco e nero come il resto del sito, ma al passaggio
   del mouse torna a colori — un piccolo premio per chi esplora. */
function TesseraGalleria({ tessera, alt }: { tessera: TesseraMasonry; alt: string }) {
  const coloreAlHover = "grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0";

  return (
    <div className="group mb-4 break-inside-avoid lg:mb-6">
      {tessera.tipo === "video" ? (
        <div className="relative aspect-video w-full overflow-hidden bg-inchiostro/10">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={tessera.poster}
            className={`absolute inset-0 h-full w-full object-cover ${coloreAlHover}`}
          >
            <source src={tessera.media} type="video/mp4" />
          </video>
        </div>
      ) : (
        <Image
          src={tessera.media}
          alt={alt}
          width={tessera.larghezza}
          height={tessera.altezza}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`h-auto w-full object-cover ${coloreAlHover}`}
        />
      )}
    </div>
  );
}
