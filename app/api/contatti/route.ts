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
   Il dominio ronsgemini.com è verificato su Resend, quindi il
   mittente di default è contatti@ronsgemini.com. Per usarne un
   altro (sempre su quel dominio) imposta RESEND_FROM. NON usare
   "onboarding@resend.dev": è il mittente di prova, che consegna
   solo all'indirizzo di iscrizione dell'account e per qualunque
   altro destinatario fa rispondere 502 al form.
   ============================================================ */

/* RESEND_TO: override per test. Se impostata, le email vanno a
   quell'indirizzo invece che a salavariaronnie@gmail.com. Non
   impostarla in produzione. */
const DESTINATARIO = process.env.RESEND_TO ?? "salavariaronnie@gmail.com";
const MITTENTE = process.env.RESEND_FROM ?? "Rons Gemini <contatti@ronsgemini.com>";

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
