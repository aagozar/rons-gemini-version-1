import type { Metadata } from "next";
import PaginaMestiere from "@/components/PaginaMestiere";
import { ANIME, SITE } from "@/lib/content";

const liuteria = ANIME.find((a) => a.id === "liuteria")!;

export const metadata: Metadata = {
  title: `Liuteria — ${SITE.nome}`,
  description: liuteria.testo,
};

export default function LiuteriaPage() {
  return (
    <PaginaMestiere
      anima={liuteria}
      numero="28"
      altro={{ id: "musica", href: "/musica" }}
    />
  );
}
