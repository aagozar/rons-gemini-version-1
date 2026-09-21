import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ============================================================
   RICEZIONE DEL FORM CONTATTI
   ------------------------------------------------------------
   Le richieste dal form arrivano qui e vengono inoltrate via
   email a DESTINATARIO con Resend (npm i resend, già installato).

   PER ATTIVARE DAVVERO L'INVIO:
   1. Crea un account gratuito su https://resend.com
   2. Genera una API key (Dashboard → API Keys)
   3. Mettila in .env.local come RESEND_API_KEY=... (vedi .env.example)
   Senza dominio verificato su Resend puoi usare subito il mittente
   di default "onboarding@resend.dev": funziona senza configurare
   nient'altro. Se in futuro verifichi un dominio tuo, imposta
   RESEND_FROM con un indirizzo su quel dominio.
   ============================================================ */

/* RESEND_TO: override temporaneo per test. Finché il dominio del
   sito non è verificato su Resend (resend.com/domains), l'account
   può inviare SOLO al proprio indirizzo di iscrizione — qualunque
   altro destinatario viene rifiutato con errore 403. Impostando
   RESEND_TO in .env.local si può testare l'invio end-to-end verso
   quell'indirizzo. Una volta verificato il dominio vero, basta
   togliere RESEND_TO (o non impostarlo in produzione): si torna
   in automatico a salavariaronnie@gmail.com. */
const DESTINATARIO = process.env.RESEND_TO ?? "salavariaronnie@gmail.com";
const MITTENTE = process.env.RESEND_FROM ?? "Rons Gemini <onboarding@resend.dev>";

const EMAIL_VALIDA = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const dati = await request.json();
  const { nome, email, telefono, motivo, messaggio } = dati ?? {};

  if (
    typeof nome !== "string" ||
    typeof email !== "string" ||
    typeof messaggio !== "string" ||
    !nome.trim() ||
    !email.trim() ||
    !messaggio.trim()
  ) {
    return NextResponse.json(
      { errore: "Nome, email e messaggio sono obbligatori." },
      { status: 400 },
    );
  }

  if (!EMAIL_VALIDA.test(email)) {
    return NextResponse.json(
      { errore: "L'indirizzo email non è valido." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY mancante: aggiungila a .env.local per inviare davvero le email. Richiesta ricevuta ma NON inoltrata:",
      { nome, email, motivo },
    );
    return NextResponse.json(
      { errore: "Invio email non configurato sul server." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: MITTENTE,
      to: DESTINATARIO,
      replyTo: email,
      subject: `Nuova richiesta dal sito (${motivo || "altro"}) — ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\nTelefono: ${telefono || "—"}\nMotivo: ${motivo || "—"}\n\n${messaggio}`,
    });

    if (error) {
      console.error("Errore Resend:", error);
      return NextResponse.json({ errore: "Invio non riuscito." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Errore invio email:", err);
    return NextResponse.json({ errore: "Invio non riuscito." }, { status: 500 });
  }
}
