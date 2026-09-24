import type { Metadata } from "next";
import PaginaMestiereEsteso from "@/components/PaginaMestiereEsteso";
import { ANIME, LIUTERIA_MASONRY, SITE } from "@/lib/content";

const liuteria = ANIME.find((a) => a.id === "liuteria")!;

export const metadata: Metadata = {
  title: `Liuteria — ${SITE.nome}`,
  description: liuteria.testo,
};

export default function LiuteriaPage() {
  return (
    <PaginaMestiereEsteso
      anima={liuteria}
      numero="28"
      altro={{ id: "musica", href: "/musica" }}
      masonry={LIUTERIA_MASONRY}
    />
  );
}
