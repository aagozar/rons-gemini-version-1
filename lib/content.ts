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

/* Una "diapositiva" della galleria in copertina: foto o video,
   sempre in bianco e nero (il grayscale lo applica il componente,
   qui basta il file a colori). */
export type HeroSlide =
  | { tipo: "immagine"; media: string }
  | { tipo: "video"; media: string; poster?: string };

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
  /* Foto per la slideshow della "pagina destra" nello spread in
     homepage (vedi TreAnime.tsx) — il lato immagine dell'articolo
     a doppia pagina. Lascia [] per restare sul singolo media/ratio
     qui sopra, come oggi fa Liuteria. */
  slideshowStoria: string[];
};

/* Una tessera della griglia masonry (vedi PaginaMestiereEsteso.tsx): foto
   o video, con le dimensioni reali del file per evitare che
   l'immagine venga deformata quando la colonna la ridimensiona.
   Le dimensioni dei video non sono note (niente ffprobe a
   disposizione): per quelli il componente usa un riquadro 16:9
   fisso con object-cover, quindi non serve indicarle qui. */
export type TesseraMasonry =
  | { tipo: "immagine"; media: string; larghezza: number; altezza: number }
  | { tipo: "video"; media: string; poster?: string };

export const SITE = {
  nome: "RONS GEMINI",
  sottotitolo:
    "Le chitarre le suono e le costruisco. Stesso legno, stesse mani, due modi di farlo parlare.",

  /* La foto con la luce verde di palco: è il tuo scatto più forte.
     Resta anche l'immagine usata per l'anteprima social (vedi
     app/layout.tsx). Lo sfondo della copertina vero e proprio è la
     galleria qui sotto, HERO_GALLERIA. */
  heroImmagine: "/img/hero-live.jpg",

  /* Riga in alto a destra sulla copertina, stile "proudly
     presents" da locandina. Cambiala pure se vuoi un'altra frase. */
  presenta: "Proudly presents",

  social: {
    /* SOSTITUISCI CON I TUOI PROFILI VERI */
    instagram: "https://instagram.com/ronsgemini",
    facebook: "https://facebook.com/ronsgemini",
  },
  email: "salavariaronnie@gmail.com",
  citta: "Milano, IT",

  /* CREDITI FOTOGRAFICI — vanno messi, anche solo nel footer.
     La foto al microfono ha la firma di Rhomie Valenzuela
     stampata sopra: serve il suo ok per usarla sul sito. */
  creditiFoto: "Foto live: Rhomie Valenzuela Photography",
};

/* ---------- GALLERIA IN COPERTINA ----------
   Lo sfondo della hero non è più una foto/video sola: è una
   sequenza che si dissolve dall'una nell'altra (vedi
   components/HeroSection.tsx). Restano tutte in bianco e nero.
   PER AGGIUNGERNE UNA: aggiungi una voce qui, stesso formato. */
export const HERO_GALLERIA: HeroSlide[] = [
  { tipo: "immagine", media: SITE.heroImmagine },
  { tipo: "immagine", media: "/img/rons2.jpg" },
  { tipo: "video", media: "/video/live2.mp4" },
];

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
    slideshowStoria: [
      "/img/hero-live.jpg",
      "/img/rons2.jpg",
      "/img/live-microfono.jpg",
      "/img/live-palco.jpg",
    ],
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
    slideshowStoria: [
      "/img/liuteria-chitarra.jpg",
      "/img/guitars1.jpg",
      "/img/guitars2.jpg",
      "/img/tessuti-borsa.jpg",
    ],
  },
];


/* ---------- PITTURA E TESSUTI — MESSA DA PARTE ----------
   Tolta su tua richiesta. Il file della borsa (tessuti-borsa.jpg)
   ora è riusato nella slideshow di Liuteria qui sopra — il
   racconto lì parla anche di oggetti in pelle e tessuto, quindi
   la foto torna utile. Se lo togli da lì, resta comunque in
   public/img, non l'ho cancellato.
   PER RIMETTERE QUESTA SEZIONE: togli i commenti qui sotto, incolla
   la voce dentro ANIME, e riaggiungi "pittura" all'unione di tipi
   in cima al file e la voce nel menu in components/NavBar.tsx.

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

/* ---------- GRIGLIE MASONRY DELLE PAGINE DEDICATE ----------
   Foto (e per Musica anche video) raccolti per il mosaico delle
   pagine /musica e /liuteria (vedi
   components/PaginaMestiereEsteso.tsx) — un formato diverso dal
   solito spread testo/foto usato altrove. PER AGGIUNGERE UN MEDIA:
   nuova voce qui, con le dimensioni reali per le foto (evita
   distorsioni quando la colonna ridimensiona). */
export const MUSICA_MASONRY: TesseraMasonry[] = [
  { tipo: "immagine", media: "/img/live-palco.jpg", larghezza: 739, altezza: 1450 },
  { tipo: "video", media: "/video/live-loop.mp4", poster: "/img/live-poster.jpg" },
  { tipo: "immagine", media: "/img/live-microfono.jpg", larghezza: 670, altezza: 1024 },
  { tipo: "immagine", media: "/img/live5.jpeg", larghezza: 876, altezza: 1600 },
  { tipo: "video", media: "/video/live2.mp4" },
  { tipo: "immagine", media: "/img/live7.jpeg", larghezza: 1024, altezza: 768 },
  { tipo: "immagine", media: "/img/hero-live.jpg", larghezza: 1565, altezza: 1267 },
  { tipo: "immagine", media: "/img/live6.jpeg", larghezza: 739, altezza: 1600 },
  { tipo: "video", media: "/video/live3.mp4" },
  { tipo: "immagine", media: "/img/live8.jpeg", larghezza: 1066, altezza: 1600 },
];

export const LIUTERIA_MASONRY: TesseraMasonry[] = [
  { tipo: "immagine", media: "/img/guitars1.jpg", larghezza: 1536, altezza: 2048 },
  { tipo: "immagine", media: "/img/liuteria-chitarra.jpg", larghezza: 690, altezza: 862 },
  { tipo: "immagine", media: "/img/tessuti-borsa.jpg", larghezza: 860, altezza: 860 },
  { tipo: "immagine", media: "/img/guitars2.jpg", larghezza: 785, altezza: 1600 },
];

/* La striscia sotto l'agenda in homepage (components/Galleria.tsx)
   usa lo stesso mosaico delle pagine dedicate, ma con tutti i
   media di entrambi i mestieri insieme — l'unico posto del sito
   dove Musica e Liuteria si vedono fianco a fianco. */
export const GALLERIA_COMPLETA: TesseraMasonry[] = [...MUSICA_MASONRY, ...LIUTERIA_MASONRY];

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
  luogo?: string; // lascialo vuoto per un evento privato
  dataInizio: string; // "AAAA-MM-GG"
  dataFine?: string; // "AAAA-MM-GG" — lasciala vuota per un evento di un solo giorno/mese
  /* Sito del locale o dell'evento (facoltativo). Se c'è, il nome
     del luogo — la parte prima della virgola — diventa un link. */
  link?: string;
  /* Locandina o immagine dell'evento (facoltativa), un file in
     /public — es. "/img/locandina-mfw-2026.jpg". Se c'è, la tappa
     "prossimo evento" in agenda la mostra come la locandina di un
     film, col nome dell'evento sotto. Formato verticale. */
  locandina?: string;
};

/* Le etichette di stato ("In tour", "Chiuso in bottega" ecc.), in
   entrambe le lingue, sono in lib/dizionario.ts → stati. Qui resta
   solo la lista Tipologia (sopra), che i componenti usano come
   chiave per leggere l'etichetta giusta dal dizionario. */

export const AGENDA: Tappa[] = [
  {
    id: "mfw-2026",
    tipo: "tour",
    titolo: "Milano Fashion Week 2026",
    luogo: "Officine Del Volo, Milano",
    dataInizio: "2026-09-25",
    dataFine: "2026-09-26",
    link: "https://www.officinedelvolo.it/",
    locandina: "/img/locandina-mfw-2026.jpg",
  },
  /* Eventi privati: solo la tipologia e la città, niente nomi. */
  {
    id: "matrimonio-ottobre-2026",
    tipo: "tour",
    titolo: "Matrimonio",
    luogo: "Location privata, Milano",
    dataInizio: "2026-10-01",
  },
  {
    id: "privato-dicembre-2026",
    tipo: "tour",
    titolo: "Evento privato",
    luogo: "Location privata, Milano",
    dataInizio: "2026-12-01",
  },
];

/* ============================================================
   NOTE SUI TUOI MEDIA (stato al 13 settembre 2026)
   ------------------------------------------------------------
   COSA C'È ADESSO
   · Copertina galleria di 3 diapositive (HERO_GALLERIA) a dissolvenza
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
   · rons2.jpg, guitars1.jpg, guitars2.jpg e live2.mp4 sono
     provvisori: quando hai i file definitivi, sostituiscili in
     /public con lo stesso nome (restano .jpg, non .jfif — Vercel
     rifiuta quell'estensione nell'ottimizzazione immagini con
     l'errore INVALID_IMAGE_OPTIMIZE_REQUEST anche se il file è di
     fatto un JPEG).
   ============================================================ */
