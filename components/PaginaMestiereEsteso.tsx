"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Anima, TesseraMasonry } from "@/lib/content";
import { DUR, EASE_OUT, VIEWPORT, riseUp, stagger } from "@/lib/motion";
import NavBar from "@/components/NavBar";
import Folio from "@/components/Folio";
import { useLingua } from "@/lib/useLingua";

/* Un blocco del corpo del racconto: paragrafo o citazione in
   evidenza, inserita a metà per spezzare il ritmo. */
type Blocco = { tipo: "testo"; contenuto: string } | { tipo: "citazione"; contenuto: string };

function costruisciBlocchi(paragrafi: string[], pullQuote?: string): Blocco[] {
  const blocchi: Blocco[] = paragrafi.map((contenuto) => ({ tipo: "testo", contenuto }));
  if (pullQuote) {
    blocchi.splice(Math.ceil(blocchi.length / 2), 0, { tipo: "citazione", contenuto: pullQuote });
  }
  return blocchi;
}

/* Una tessera della griglia a mosaico: foto con le sue proporzioni
   reali (niente deformazioni quando la colonna la ridimensiona) o
   video in un riquadro 16:9, di cui non conosciamo le proporzioni
   native. object-cover evita comunque distorsioni in entrambi i
   casi. */
function TesseraGalleria({ tessera, alt }: { tessera: TesseraMasonry; alt: string }) {
  return (
    <div className="mb-4 break-inside-avoid lg:mb-6">
      {tessera.tipo === "video" ? (
        <div className="relative aspect-video w-full overflow-hidden bg-inchiostro/10">
          <video
            controls
            playsInline
            preload="metadata"
            poster={tessera.poster}
            className="absolute inset-0 h-full w-full object-cover grayscale"
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
          className="h-auto w-full object-cover grayscale"
        />
      )}
    </div>
  );
}

/* ============================================================
   PAGINA MESTIERE (versione estesa) — non lo spread solito
   ------------------------------------------------------------
   Usata da /musica e /liuteria al posto del vecchio PaginaMestiere
   (rimosso: nessuna pagina lo usava più). Le foto (e i video, dove
   ce ne sono) non sono agganciati uno per paragrafo: sono raccolti
   in un unico mosaico a colonne, come un photo-essay in mezzo a un
   articolo di rivista patinata. Il testo, di riflesso, è molto più
   lungo — un ritratto, non solo una scheda — con la citazione a
   spezzare il racconto, il mosaico a metà pezzo e l'invito ai
   contatti in fondo, prima del rimando all'altro mestiere. */
export default function PaginaMestiereEsteso({
  anima,
  numero,
  altro,
  masonry,
}: {
  anima: Anima;
  numero: string;
  altro: { id: "musica" | "liuteria"; href: string };
  masonry: TesseraMasonry[];
}) {
  const riduciMovimento = useReducedMotion();
  const { t } = useLingua();
  const testi = t.anime[anima.id];
  const paragrafi = testi.paragrafiEstesi ?? testi.paragrafi ?? [testi.testo];
  const [primoParagrafo, ...restoParagrafi] = paragrafi;
  const blocchi = costruisciBlocchi(restoParagrafi, testi.pullQuote);
  const numeroGalleria = String(Number(numero) + 1);

  return (
    <>
      <NavBar />

      <main className="relative bg-carta">
        {/* ---------- COPERTINA DELLA PAGINA ---------- */}
        <section
          className="relative h-[70svh] min-h-[460px] w-full overflow-hidden bg-inchiostro"
          aria-label={testi.titolo}
        >
          <div className="absolute inset-0">
            {anima.tipo === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={anima.poster}
                className="h-full w-full object-cover grayscale"
              >
                <source src={anima.media} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={anima.media}
                alt={`${testi.titolo} — ${testi.occhiello}`}
                fill
                priority
                sizes="100vw"
                className="object-cover grayscale"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-inchiostro/60" aria-hidden />

          <motion.div
            initial={riduciMovimento ? undefined : { opacity: 0, y: 24 }}
            animate={riduciMovimento ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE_OUT }}
            className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 pt-28 sm:px-10 sm:pb-16 sm:pt-32 lg:px-16"
          >
            <Link
              href="/"
              className="kicker w-fit text-carta/60 transition-colors duration-200 hover:text-carta"
            >
              {t.paginaMestiere.home}
            </Link>
            <p className="kicker mt-6 text-carta/70">{testi.occhiello}</p>
            <h1 className="display-cover mt-3 text-carta text-[clamp(2.75rem,10vw,7.5rem)]">
              {testi.titolo}
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-carta/75">{testi.testo}</p>
          </motion.div>
        </section>

        {/* ---------- APERTURA DEL RACCONTO ---------- */}
        <motion.section
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative border-t px-6 pb-16 pt-24 hairline bg-carta sm:px-10 lg:px-16 lg:pt-32"
        >
          <Folio numero={numero} />

          <div className="mx-auto max-w-3xl">
            <motion.p
              variants={riseUp}
              className="dropcap text-[15px] leading-[1.8] text-inchiostro/80"
            >
              {primoParagrafo}
            </motion.p>

            <motion.a
              variants={riseUp}
              href={anima.cta.href}
              className="mt-8 inline-block border-b hairline pb-1 text-xs font-medium uppercase tracking-[0.2em] text-inchiostro transition-colors duration-200 hover:border-inchiostro"
            >
              {testi.ctaLabel}
            </motion.a>
          </div>
        </motion.section>

        {/* ---------- MOSAICO — foto e video "live" raccolti insieme,
            non uno per paragrafo come nel solito spread ---------- */}
        <motion.section
          variants={riseUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative border-t px-6 py-16 hairline bg-carta sm:px-10 lg:px-16"
        >
          <Folio numero={numeroGalleria} />
          <p className="kicker text-inchiostro/50">{testi.didascalia}</p>

          <div className="mx-auto mt-8 max-w-6xl columns-2 gap-4 sm:columns-3 lg:gap-6 2xl:max-w-7xl">
            {masonry.map((tessera, i) => (
              <TesseraGalleria key={i} tessera={tessera} alt={testi.didascalia} />
            ))}
          </div>
        </motion.section>

        {/* ---------- SEGUITO DEL RACCONTO ---------- */}
        <motion.section
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative border-t px-6 py-24 hairline bg-carta sm:px-10 lg:px-16 lg:py-32"
        >
          <div className="mx-auto max-w-3xl space-y-8">
            {blocchi.map((blocco, i) =>
              blocco.tipo === "citazione" ? (
                <motion.blockquote
                  key={i}
                  variants={riseUp}
                  className="border-t hairline pt-8"
                >
                  <p className="pull-quote text-[clamp(1.5rem,3.5vw,2.25rem)] text-inchiostro/85">
                    {blocco.contenuto}
                  </p>
                </motion.blockquote>
              ) : (
                <motion.p
                  key={i}
                  variants={riseUp}
                  className="text-[15px] leading-[1.8] text-inchiostro/80"
                >
                  {blocco.contenuto}
                </motion.p>
              )
            )}
          </div>

          {/* ---------- INVITO AI CONTATTI, IN FONDO AL RACCONTO ---------- */}
          {testi.contattoDomanda && testi.contattoAzione && (
            <motion.div
              variants={riseUp}
              className="mx-auto mt-20 max-w-3xl border-t hairline pt-10 text-center"
            >
              <Link href="/#contatti" className="group inline-flex flex-col items-center gap-6">
                <span className="pull-quote text-[clamp(1.35rem,3vw,1.85rem)] text-inchiostro/85">
                  {testi.contattoDomanda}
                </span>
                <span className="border border-inchiostro px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-inchiostro transition-colors duration-300 group-hover:bg-inchiostro group-hover:text-carta">
                  {testi.contattoAzione}
                </span>
              </Link>
            </motion.div>
          )}

          {/* ---------- RIMANDO ALL'ALTRO MESTIERE ---------- */}
          <motion.div
            variants={riseUp}
            className="mx-auto mt-24 max-w-3xl border-t hairline pt-8"
          >
            <Link
              href={altro.href}
              className="kicker text-inchiostro/50 transition-colors duration-200 hover:text-inchiostro"
            >
              {t.paginaMestiere.altro[altro.id]} →
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
