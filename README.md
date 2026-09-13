# Rons Gemini — sito ufficiale

Chitarre suonate e costruite a mano.
Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion.

## Avvio in locale

Il progetto è completo: non serve `create-next-app`, basta installare.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Caricarlo su Vercel

1. Metti la cartella su GitHub (repository privata va benissimo):
   ```bash
   git init && git add . && git commit -m "primo sito"
   git remote add origin https://github.com/TUO_UTENTE/ronsgemini.git
   git push -u origin main
   ```
2. Su vercel.com: **Add New → Project**, scegli la repository, **Deploy**.
   Next.js viene riconosciuto da solo: non toccare build command o
   output directory.
3. A deploy finito, in **Settings → Environment Variables** aggiungi
   `NEXT_PUBLIC_SITE_URL` con l'indirizzo vero (es.
   `https://ronsgemini.it`). Serve solo a far funzionare l'anteprima
   quando condividi il link su WhatsApp o Facebook.
4. **Settings → Domains** per collegare il dominio, se ne hai uno.

Ogni `git push` rifà il deploy da solo.

La build è già stata provata: compila pulita, nessun avviso.
I font arrivano da Google Fonts in fase di build — su Vercel funziona,
se un giorno compili offline scarica i font e usa `next/font/local`.

## Struttura dei file

```
.
├── app/
│   ├── layout.tsx            Font, metadata, <body>
│   ├── page.tsx              Composizione delle sezioni + scroll
│   ├── globals.css           Token di colore, grana, accessibilità
│   └── api/contatti/route.ts Ricezione del form
│
├── components/
│   ├── NavBar.tsx            Barra fissa + pillola di stato + menu mobile
│   ├── HeroSection.tsx       Apertura a tutto schermo (foto o video)
│   ├── TreAnime.tsx          Musica e liuteria, layout asimmetrico
│   ├── StatusSchedule.tsx    Stato attuale + linea del tempo
│   ├── Galleria.tsx          Due scatti dal vivo
│   └── Contatti.tsx          Social grandi + form
│
├── lib/
│   ├── content.ts            ⬅ TESTI, FOTO, VIDEO, DATE: tocchi solo questo
│   ├── motion.ts             ⬅ TIMING DELLE ANIMAZIONI: tocchi solo questo
│   └── useSmoothScroll.ts    Scroll morbido (Lenis)
│
└── public/img · public/video
```

## Palette, presa dalle tue foto

| Token | Hex | Da dove viene |
|---|---|---|
| `palco` | `#050A06` | il nero delle tue foto, che tende al verde |
| `bruciato` | `#0C1109` | superfici e sezioni alternate |
| `fumo` | `#232B20` | bordi e filetti |
| `calce` | `#F2EDE4` | testo |
| `verde` | `#2CE86A` | la luce di palco della foto con la Ibanez — suonare |
| `ambra` | `#FF9B21` | il sunburst della cassa armonica — costruire |
| `cadmio` | `#E6453A` | la spia rossa del REC — stato "in studio" |

## Media

| File | Dove si vede |
|---|---|
| `img/hero-live.jpg` | apertura a tutto schermo |
| `video/live-loop.mp4` `.webm` | pannello Musica (8 s, muto, da 18 MB a 1,2 MB) |
| `img/liuteria-chitarra.jpg` | pannello Liuteria |
| `img/live-microfono.jpg`, `img/live-palco.jpg` | striscia sotto l'agenda |
| `img/tessuti-borsa.jpg` | non usato: resta lì per quando riapriamo la pittura |

**Cosa gioverebbe al sito adesso:** altre due foto di bottega, il banco
con gli attrezzi e le tue mani mentre lavori. Con una sola immagine la
liuteria sembra un episodio, con tre sembra un mestiere.

## Prima di pubblicare

- Instagram, Facebook ed email veri in `lib/content.ts`.
- Le date in `AGENDA`, con `attuale: true` su una sola voce.
- Il form: `app/api/contatti/route.ts` ha le istruzioni per Resend o Formspree. Finché non lo colleghi, i messaggi finiscono nei log di Vercel e tu non li vedi.
- La foto al microfono ha la firma di Rhomie Valenzuela: chiedigli l'ok e i file originali.

## Rimettere la pittura

La voce è già scritta e commentata in fondo a `lib/content.ts`: si
scommenta, si incolla dentro `ANIME`, si riaggiunge `"pittura"`
all'unione di tipi in cima al file e la voce nel menu di `NavBar.tsx`.
Il layout a tre pannelli è ancora lì e torna da solo.
