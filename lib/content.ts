/* ============================================================
   CONTENUTI E MEDIA DEL SITO — RONS GEMINI
   ------------------------------------------------------------
   Questo è l'unico file che devi toccare per cambiare testi,
   foto, video e date. I componenti leggono da qui.
   I file stanno in /public: il percorso si scrive SENZA "public".
   /public/img/hero-live.jpg  →  "/img/hero-live.jpg"
   ============================================================ */

export type Anima = {
  id: "musica" | "liuteria";
  titolo: string;
  occhiello: string;
  testo: string;
  accentoHex: string;
  media: string;
  poster?: string;
  tipo: "video" | "immagine";
  ratio: string;
  /* true = il file è ancora un segnaposto, non una foto tua.
     Il pannello mostra un avviso invece di un'immagine rotta. */
  daFare?: boolean;
  cta: { label: string; href: string };
};

export const SITE = {
  nome: "Rons Gemini",
  tagline: ["Suono.", "Costruisco."],
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
    accentoHex: "#2CE86A", // il verde delle tue luci di palco
    tipo: "video",
    /* Il tuo video, già tagliato a 8 secondi, senza audio,
       scurito e con più contrasto per stare sul fondo nero.
       Da 18 MB a 1,2 MB. */
    media: "/video/live-loop.mp4",
    poster: "/img/live-poster.jpg",
    ratio: "aspect-[16/9]",
    cta: { label: "Guarda le date", href: "#agenda" },
  },
  {
    id: "liuteria",
    titolo: "Liuteria",
    occhiello: "In bottega",
    testo:
      "Chitarre costruite a mano, una alla volta. Legni scelti di persona, manico modellato sulla tua mano, finiture a tampone.",
    accentoHex: "#FF9B21", // l'ambra del sunburst della tua Ibanez
    tipo: "immagine",
    /* La tua semiacustica in lavorazione. Ho ritagliato stretto sul
       blocco di coda con il tassello di ottone: si legge la
       venatura, il filetto e la giunzione, cioè il lavoro. Il
       resto (balcone, sedia, cielo) è sparito nel ritaglio. */
    media: "/img/liuteria-chitarra.jpg",
    ratio: "aspect-[4/5]",
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
    accentoHex: "#E6453A",
    tipo: "immagine",
    media: "/img/tessuti-borsa.jpg",
    ratio: "aspect-square",
    cta: { label: "Vedi le opere", href: "#contatti" },
  },
   -------------------------------------------------------- */

/* ---------- ALTRE FOTO LIVE GIÀ PRONTE ----------
   Le uso nella striscia sotto l'agenda. Aggiungine altre qui. */
export const GALLERIA = [
  { src: "/img/live-microfono.jpg", alt: "Rons Gemini al microfono" },
  { src: "/img/live-palco.jpg", alt: "Rons Gemini sul palco" },
];

/* ---------- STATO E AGENDA ---------- */

export type Stato = "tour" | "bottega" | "studio";

export type Tappa = {
  stato: Stato;
  titolo: string;
  luogo: string;
  periodo: string;
  attuale?: boolean;
};

export const STATI: Record<Stato, { label: string; hex: string }> = {
  tour: { label: "In tour", hex: "#2CE86A" },
  bottega: { label: "Chiuso in bottega", hex: "#FF9B21" },
  studio: { label: "In studio di registrazione", hex: "#E6453A" }, // il rosso della spia REC
};

/* AGGIORNA QUI L'AGENDA. Ordine cronologico dall'alto.
   Metti attuale: true su una sola voce. */
export const AGENDA: Tappa[] = [
  {
    stato: "tour",
    titolo: "Date in giro per la Lombardia",
    luogo: "Milano e provincia",
    periodo: "Settembre 2026",
    attuale: true,
  },
  {
    stato: "bottega",
    titolo: "Due commissioni in lavorazione",
    luogo: "Bottega, Milano",
    periodo: "Ottobre — Novembre 2026",
  },
  {
    stato: "studio",
    titolo: "Registrazione dei nuovi pezzi",
    luogo: "Milano",
    periodo: "Dicembre 2026",
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
