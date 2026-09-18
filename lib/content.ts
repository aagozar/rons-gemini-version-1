/* ============================================================
   CONTENUTI E MEDIA DEL SITO — RONS GEMINI
   ------------------------------------------------------------
   Questo è l'unico file che devi toccare per cambiare testi,
   foto, video e date. I componenti leggono da qui.
   I file stanno in /public: il percorso si scrive SENZA "public".
   /public/img/hero-live.jpg  →  "/img/hero-live.jpg"

   NOTA SUL COLORE: la direzione editoriale è solo bianco e nero,
   come vogue.com — nessun accento colorato da nessuna parte. Le
   distinzioni (etichetta vs titolo, tappa in corso vs le altre,
   capolettera) passano da peso, dimensione o opacità, mai dal
   colore. Se aggiungi un mestiere, non serve inventare una tinta.
   ============================================================ */

export type Anima = {
  id: "musica" | "liuteria";
  titolo: string;
  occhiello: string;
  testo: string;
  media: string;
  poster?: string;
  tipo: "video" | "immagine";
  ratio: string;
  didascalia: string;
  /* "numeri strumento": una piccola lista di specifiche, numerata.
     Lascia vuoto [] se il mestiere non ne ha bisogno. */
  dettagli: string[];
  /* true = il file è ancora un segnaposto, non una foto tua.
     Il pannello mostra un avviso invece di un'immagine rotta. */
  daFare?: boolean;
  cta: { label: string; href: string };
};

export const SITE = {
  nome: "RONS GEMINI",
  sottotitolo:
    "Le chitarre le suono e le costruisco. Stesso legno, stesse mani, due modi di farlo parlare.",

  /* ---------- APERTURA ----------
     "immagine" usa la tua foto live con un lentissimo zoom.
     "video" usa il video qui sotto. Vedi la nota in fondo al file
     sul perché adesso è impostato su "immagine". */
  heroTipo: "immagine" as "immagine" | "video",

  /* La foto con la luce verde di palco: è il tuo scatto più forte */
  heroImmagine: "/img/hero-live.jpg",

  /* QUANDO AVRAI IL VIDEO GIUSTO, METTILO QUI E CAMBIA heroTipo.
     Serve: palco buio, luci colorate, primi piani, 1920×1080,
     8-10 secondi, girato in orizzontale. */
  heroVideoMp4: "/video/hero-loop.mp4",
  heroVideoWebm: "/video/hero-loop.webm",
  heroPoster: "/img/hero-live.jpg",

  /* Riga in alto a destra sulla copertina, stile "proudly
     presents" da locandina. Cambiala pure se vuoi un'altra frase. */
  presenta: "Proudly presents",

  social: {
    /* SOSTITUISCI CON I TUOI PROFILI VERI */
    instagram: "https://instagram.com/ronsgemini",
    facebook: "https://facebook.com/ronsgemini",
  },
  email: "booking@ronsgemini.it",
  citta: "Milano, IT",

  /* CREDITI FOTOGRAFICI — vanno messi, anche solo nel footer.
     La foto al microfono ha la firma di Rhomie Valenzuela
     stampata sopra: serve il suo ok per usarla sul sito. */
  creditiFoto: "Foto live: Rhomie Valenzuela Photography",
};

export const ANIME: Anima[] = [
  {
    id: "musica",
    titolo: "Musica",
    occhiello: "Dal vivo",
    testo:
      "Voce e chitarra davanti a un pubblico. Locali, feste private e serate acustiche, in solo o con la band.",
    tipo: "video",
    /* Il tuo video, già tagliato a 8 secondi, senza audio,
       scurito e con più contrasto per stare sul fondo chiaro.
       Da 18 MB a 1,2 MB. */
    media: "/video/live-loop.mp4",
    poster: "/img/live-poster.jpg",
    ratio: "aspect-[4/5]",
    didascalia: "Live, Milano — voce e chitarra",
    dettagli: [],
    cta: { label: "Guarda le date", href: "#agenda" },
  },
  {
    id: "liuteria",
    titolo: "Liuteria",
    occhiello: "In bottega",
    testo:
      "Chitarre costruite a mano, una alla volta. Legni scelti di persona, manico modellato sulla tua mano, finiture a tampone.",
    tipo: "immagine",
    /* La tua semiacustica in lavorazione. Ho ritagliato stretto sul
       blocco di coda con il tassello di ottone: si legge la
       venatura, il filetto e la giunzione, cioè il lavoro. Il
       resto (balcone, sedia, cielo) è sparito nel ritaglio. */
    media: "/img/liuteria-chitarra.jpg",
    ratio: "aspect-[4/5]",
    didascalia: "In lavorazione, bottega di Milano",
    /* PER CAMBIARE LA LISTA: tre voci al massimo, corte, così
       restano leggibili accanto al numero. */
    dettagli: ["Legni scelti a mano", "Manico su misura", "Finitura a tampone"],
    cta: { label: "Richiedi una chitarra", href: "#contatti" },
  },
];


/* ---------- PITTURA E TESSUTI — MESSA DA PARTE ----------
   Tolta su tua richiesta. Il file della borsa è ancora in
   public/img/tessuti-borsa.jpg, non l'ho cancellato.
   PER RIMETTERLA: togli i commenti qui sotto, incolla la voce
   dentro ANIME, e riaggiungi "pittura" all'unione di tipi in cima
   al file e la voce nel menu in components/NavBar.tsx.

  {
    id: "pittura",
    titolo: "Pittura",
    occhiello: "Su tela e su tessuto",
    testo:
      "Immagini dipinte e stampate. Alcune restano su tela, altre finiscono cucite addosso a un oggetto.",
    tipo: "immagine",
    media: "/img/tessuti-borsa.jpg",
    ratio: "aspect-square",
    didascalia: "Tela e tessuto, studio",
    dettagli: [],
    cta: { label: "Vedi le opere", href: "#contatti" },
  },
   -------------------------------------------------------- */

/* ---------- ALTRE FOTO LIVE GIÀ PRONTE ----------
   Le uso nella striscia sotto l'agenda. Aggiungine altre qui. */
export const GALLERIA = [
  {
    id: "microfono",
    src: "/img/live-microfono.jpg",
    alt: "Rons Gemini al microfono",
    didascalia: "Al microfono",
  },
  {
    id: "palco",
    src: "/img/live-palco.jpg",
    alt: "Rons Gemini sul palco",
    didascalia: "Sul palco",
  },
];

/* ---------- STATO E AGENDA ----------
   Ogni tappa ha una data di inizio e (se dura più di un giorno)
   una data di fine, in formato "AAAA-MM-GG". NON c'è più un
   flag "attuale" da spostare a mano: lib/agenda.ts calcola da
   solo, in base alla data di oggi sul dispositivo di chi guarda
   il sito, qual è la tappa in corso e qual è la prossima. Anche
   l'ordine in cui compaiono in agenda si sistema da sé: puoi
   scrivere le voci qui sotto in qualsiasi ordine. */

export type Tipologia = "tour" | "bottega" | "studio";

export type Tappa = {
  /* Identificatore stabile, usato da lib/dizionario.ts per associare
     la traduzione inglese a questa tappa. Non cambiarlo una volta
     pubblicato: se lo rinomini, aggiorna anche il dizionario. */
  id: string;
  tipo: Tipologia;
  titolo: string;
  luogo: string;
  dataInizio: string; // "AAAA-MM-GG"
  dataFine?: string; // "AAAA-MM-GG" — lasciala vuota per un evento di un solo giorno/mese
};

/* Le etichette di stato ("In tour", "Chiuso in bottega" ecc.), in
   entrambe le lingue, sono in lib/dizionario.ts → stati. Qui resta
   solo la lista Tipologia (sopra), che i componenti usano come
   chiave per leggere l'etichetta giusta dal dizionario. */

export const AGENDA: Tappa[] = [
  {
    id: "mfw-2026",
    tipo: "tour",
    titolo: "MFW 2026 — Live Session",
    luogo: "Spazio Ventura, Milano",
    dataInizio: "2026-09-01",
    dataFine: "2026-09-30",
  },
  {
    id: "jazzbox-nicola",
    tipo: "bottega",
    titolo: "Una jazzbox in acero fiammato per Nicola R.",
    luogo: "Atelier Corso Garibaldi, Milano",
    dataInizio: "2026-10-01",
    dataFine: "2026-11-30",
  },
  {
    id: "ep-controluce",
    tipo: "studio",
    titolo: "Registrazione dell'EP «Controluce»",
    luogo: "Studio Meridiana, Navigli",
    dataInizio: "2026-12-01",
    dataFine: "2026-12-31",
  },
];

/* ============================================================
   NOTE SUI TUOI MEDIA (stato al 13 settembre 2026)
   ------------------------------------------------------------
   COSA C'È ADESSO
   · Musica    foto live in apertura + video tagliato nel pannello
   · Liuteria  la semiacustica in lavorazione, ritagliata stretta
   · Galleria  due scatti dal vivo

   COSA GUADAGNEREBBE IL SITO
   Altre due foto di bottega: il banco con gli attrezzi e le tue
   mani mentre lavori. Con una sola immagine la liuteria sembra un
   episodio; con tre sembra un mestiere.

   FILE DA RIFARE QUANDO PUOI
   · La borsa è fotografata da uno schermo (si vedeva la cornice
     del monitor): serve lo scatto originale.
   · Le foto live sono a bassa risoluzione: chiedi gli originali
     al fotografo, il salto di qualità è gratis.
   · Il video di apertura: palco buio, orizzontale, 1920×1080,
     8-10 secondi. Poi basta mettere heroTipo: "video".
   ============================================================ */
