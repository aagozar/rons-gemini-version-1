import { NextResponse } from "next/server";

/* ============================================================
   RICEZIONE DEL FORM CONTATTI
   ------------------------------------------------------------
   Così com'è, questa rotta valida i dati e li stampa nei log:
   il sito funziona ma tu non ricevi nulla.
   PER RICEVERE DAVVERO LE EMAIL scegli un servizio e togli il
   commento al blocco corrispondente qui sotto.
   ============================================================ */

export async function POST(request: Request) {
  const dati = await request.json();
  const { nome, email, motivo, messaggio } = dati ?? {};

  if (!nome || !email || !messaggio) {
    return NextResponse.json(
      { errore: "Nome, email e messaggio sono obbligatori." },
      { status: 400 },
    );
  }

  /* --- OPZIONE A: RESEND (npm i resend) ---
     Metti RESEND_API_KEY in .env.local e verifica il dominio.

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Sito <sito@TUODOMINIO.it>",
    to: "INSERISCI QUI LA TUA EMAIL",
    replyTo: email,
    subject: `Nuova richiesta (${motivo}) da ${nome}`,
    text: messaggio,
  });
  */

  /* --- OPZIONE B: FORMSPREE ---
     Non serve questa rotta: in Contatti.tsx cambia l'URL della
     fetch con il tuo endpoint https://formspree.io/f/XXXX */

  console.log("Nuova richiesta dal sito:", { nome, email, motivo });

  return NextResponse.json({ ok: true });
}
