import type { Metadata } from "next";
import PaginaMestiereEsteso from "@/components/PaginaMestiereEsteso";
import { ANIME, MUSICA_MASONRY, SITE } from "@/lib/content";

const musica = ANIME.find((a) => a.id === "musica")!;

export const metadata: Metadata = {
  title: `Musica — ${SITE.nome}`,
  description: musica.testo,
};

export default function MusicaPage() {
  return (
    <PaginaMestiereEsteso
      anima={musica}
      numero="12"
      altro={{ id: "liuteria", href: "/liuteria" }}
      masonry={MUSICA_MASONRY}
    />
  );
}
