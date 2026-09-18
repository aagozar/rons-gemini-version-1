import type { Metadata } from "next";
import PaginaMestiere from "@/components/PaginaMestiere";
import { ANIME, SITE } from "@/lib/content";

const musica = ANIME.find((a) => a.id === "musica")!;

export const metadata: Metadata = {
  title: `Musica — ${SITE.nome}`,
  description: musica.testo,
};

export default function MusicaPage() {
  return (
    <PaginaMestiere
      anima={musica}
      numero="12"
      altro={{ id: "liuteria", href: "/liuteria" }}
    />
  );
}
