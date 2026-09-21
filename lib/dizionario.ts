/* ============================================================
   DIZIONARIO — TESTI IT / EN
   ------------------------------------------------------------
   Ogni stringa che l'utente legge sul sito, nelle due lingue.
   I componenti non scrivono più testo in chiaro: leggono da qui
   tramite useLingua() (vedi lib/useLingua.tsx).

   COME AGGIUNGERE UN TESTO NUOVO:
   1. Aggiungilo alla struttura "it" qui sotto.
   2. Aggiungi la stessa chiave, tradotta, alla struttura "en".
   TypeScript segnala un errore se una chiave manca in una delle
   due lingue: non puoi dimenticare la traduzione.

   COME COLLEGARE UNA TAPPA AGENDA O UNA FOTO ALLA TRADUZIONE:
   lib/content.ts assegna un "id" stabile a ogni tappa e foto.
   Qui sotto, in agenda.tappe e galleria.foto, usa lo stesso id
   come chiave. Se aggiungi una tappa/foto in content.ts, aggiungi
   la voce corrispondente in ENTRAMBE le lingue qui.
   ============================================================ */

export type Lingua = "it" | "en";

export const LINGUE: { codice: Lingua; label: string }[] = [
  { codice: "en", label: "EN" },
  { codice: "it", label: "IT" },
];

type TestiAnima = {
  titolo: string;
  occhiello: string;
  testo: string;
  dettagli: string[];
  ctaLabel: string;
  didascalia: string;
  /* Racconto esteso per la pagina dedicata (PaginaMestiere): un
     paragrafo per voce, più una citazione facoltativa a metà
     pezzo. Se assenti, la pagina usa "testo" come paragrafo unico
     — è quello che succede oggi per Liuteria. */
  paragrafi?: string[];
  pullQuote?: string;
  /* Didascalie delle foto d'articolo (anima.immaginiArticolo in
     lib/content.ts), nello stesso ordine. */
  didascalieArticolo?: string[];
  /* Frase-ponte verso l'altro mestiere, integrata nel racconto
     (es. "costruisce anche le chitarre che suona →"). L'indirizzo
     è deciso dal componente, qui c'è solo il testo. Facoltativa:
     serve solo dove il racconto lo prevede (oggi, Musica). */
  collegamentoAltro?: string;
};

type TestiTappa = {
  titolo: string;
  luogo: string;
};

type TestiFoto = {
  alt: string;
  didascalia: string;
};

export type Dizionario = {
  nav: {
    musica: string;
    liuteria: string;
    agenda: string;
    contatti: string;
    menu: string;
    chiudi: string;
  };
  hero: {
    presenta: string;
    vaiAlContenuto: string;
  };
  stati: {
    tour: string;
    bottega: string;
    studio: string;
  };
  anime: {
    musica: TestiAnima;
    liuteria: TestiAnima;
  };
  placeholderFoto: {
    titolo: (nome: string) => string;
    corpo: string;
  };
  agenda: {
    kicker: string;
    ctaTesto: string;
    ctaLabel: string;
    tappe: Record<string, TestiTappa>;
  };
  galleria: {
    aria: string;
    foto: Record<string, TestiFoto>;
  };
  contatti: {
    kicker: string;
    titolo: string;
    sottotitolo: string;
    nomeLabel: string;
    nomePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    telefonoLabel: string;
    telefonoFacoltativo: string;
    telefonoPlaceholder: string;
    motivoLabel: string;
    motivoOpzioni: {
      booking: string;
      chitarra: string;
      quadro: string;
      altro: string;
    };
    messaggioLabel: string;
    messaggioPlaceholder: string;
    invioInCorso: string;
    invia: string;
    esitoOk: string;
    esitoErrorePrefisso: string;
  };
  paginaMestiere: {
    home: string;
    altro: { musica: string; liuteria: string };
  };
};

export const DIZIONARIO: Record<Lingua, Dizionario> = {
  it: {
    nav: {
      musica: "Musica",
      liuteria: "Liuteria",
      agenda: "Agenda",
      contatti: "Contatti",
      menu: "Menu",
      chiudi: "Chiudi",
    },
    hero: {
      presenta: "Proudly presents",
      vaiAlContenuto: "Vai al contenuto",
    },
    stati: {
      tour: "In tour",
      bottega: "Chiuso in bottega",
      studio: "In studio di registrazione",
    },
    anime: {
      musica: {
        titolo: "Musica",
        occhiello: "Dal vivo",
        testo:
          "Voce e chitarra davanti a un pubblico. Locali, feste private e serate acustiche, in solo o con la band.",
        dettagli: [],
        ctaLabel: "Guarda le date",
        didascalia: "Live, Milano — voce e chitarra",
        paragrafi: [
          "Polistrumentista nato nelle Filippine, Rons Gemini ha portato la musica in giro per il mondo prima ancora che diventasse un mestiere: voce, chitarra e uno strumento nuovo a ogni tappa, il percorso comincia lontano da qui.",
          "Per un periodo si stabilisce alle Maldive, frontman di un gruppo tra i più richiesti dell'arcipelago, sul palco dei resort più esclusivi — ogni sera un pubblico internazionale diverso, la stessa intensità richiesta comunque.",
          "Poi l'Italia, dove porta lo stesso talento in eventi pubblici e privati, dal vivo, in solo o con la band. E le chitarre, oltre a suonarle, le costruisce anche a mano, una alla volta.",
        ],
        pullQuote: "Il pubblico cambia continente. La musica no.",
        didascalieArticolo: [
          "Sul palco, a metà di un set che cambia ogni volta",
          "Un attimo prima di entrare in una canzone",
        ],
        collegamentoAltro: "Le chitarre le costruisce anche a mano →",
      },
      liuteria: {
        titolo: "Liuteria",
        occhiello: "In bottega",
        testo:
          "Chitarre costruite a mano, una alla volta. Legni scelti di persona, manico modellato sulla tua mano, finiture a tampone.",
        dettagli: ["Legni scelti a mano", "Manico su misura", "Finitura a tampone"],
        ctaLabel: "Richiedi una chitarra",
        didascalia: "In lavorazione, bottega di Milano",
        paragrafi: [
          "Ogni chitarra nasce una alla volta, mai in serie: il legno si sceglie a mano, il manico si modella sulla mano di chi la suonerà, la finitura si stende a tampone, passata dopo passata, finché il colore del legno non viene fuori da solo.",
          "In bottega non si costruisce soltanto: si ripara quello che altri darebbero per perso, e le stesse mani che intagliano un manico cuciono anche oggetti in pelle e tessuto — borse comprese — con la stessa cura per ogni materiale.",
          "Per chi vuole più di uno strumento comprato: percorsi guidati, passo per passo, per costruire con le proprie mani la chitarra che poi si suonerà per anni.",
        ],
        pullQuote: "La chitarra che suoni meglio è quella che hai costruito tu.",
        didascalieArticolo: ["Al banco, tra gli attrezzi", "Un manico ancora da rifinire"],
        collegamentoAltro: "Le stesse mani suonano anche dal vivo →",
      },
    },
    placeholderFoto: {
      titolo: (nome) => `Foto di ${nome} da scattare.`,
      corpo: "Il riquadro è già pronto: carica il file e compare.",
    },
    agenda: {
      kicker: "In questo momento",
      ctaTesto: "Una nuova tappa da proporre?",
      ctaLabel: "Contattami",
      tappe: {
        "mfw-2026": { titolo: "MFW 2026 — Live Session", luogo: "Spazio Ventura, Milano" },
        "jazzbox-nicola": {
          titolo: "Jazzbox — Nicola R.",
          luogo: "Atelier Corso Garibaldi, Milano",
        },
        "ep-controluce": {
          titolo: "EP «Controluce»",
          luogo: "Studio Meridiana, Navigli",
        },
      },
    },
    galleria: {
      aria: "Immagini dal vivo",
      foto: {
        microfono: { alt: "Rons Gemini al microfono", didascalia: "Al microfono" },
        palco: { alt: "Rons Gemini sul palco", didascalia: "Sul palco" },
      },
    },
    contatti: {
      kicker: "Contatti",
      titolo: "Parliamone",
      sottotitolo:
        "Una data da fissare, una chitarra da costruire, un quadro da portare a casa. Rispondo di persona, di solito entro due giorni.",
      nomeLabel: "Nome",
      nomePlaceholder: "Come ti chiami",
      emailLabel: "Email",
      emailPlaceholder: "dove ti rispondo",
      telefonoLabel: "Telefono",
      telefonoFacoltativo: "(facoltativo)",
      telefonoPlaceholder: "se preferisci essere richiamato",
      motivoLabel: "Di cosa si tratta",
      motivoOpzioni: {
        booking: "Una data da fissare",
        chitarra: "Una chitarra su misura",
        quadro: "Un'opera o una commissione",
        altro: "Altro",
      },
      messaggioLabel: "Messaggio",
      messaggioPlaceholder:
        "Date, budget, tempi: più sei preciso, più la risposta è utile",
      invioInCorso: "Invio in corso",
      invia: "Invia il messaggio",
      esitoOk: "Messaggio inviato. Ti rispondo entro due giorni.",
      esitoErrorePrefisso:
        "L'invio non è riuscito. Riprova o scrivi direttamente a ",
    },
    paginaMestiere: {
      home: "← Rons Gemini",
      altro: { musica: "Musica", liuteria: "Liuteria" },
    },
  },

  en: {
    nav: {
      musica: "Music",
      liuteria: "Lutherie",
      agenda: "Schedule",
      contatti: "Contact",
      menu: "Menu",
      chiudi: "Close",
    },
    hero: {
      presenta: "Proudly presents",
      vaiAlContenuto: "Skip to content",
    },
    stati: {
      tour: "On tour",
      bottega: "In the workshop",
      studio: "Recording in studio",
    },
    anime: {
      musica: {
        titolo: "Music",
        occhiello: "Live",
        testo:
          "Voice and guitar in front of an audience — venues, private parties and acoustic evenings, solo or with the band.",
        dettagli: [],
        ctaLabel: "See the dates",
        didascalia: "Live, Milan — voice and guitar",
        paragrafi: [
          "A multi-instrumentalist born in the Philippines, Rons Gemini carried music around the world before it ever became a job: voice, guitar and a new instrument at every stop, the journey starts far from here.",
          "For a while he settled in the Maldives, fronting one of the archipelago's most in-demand bands, on stage at its most exclusive resorts — a different international crowd every night, the same intensity expected regardless.",
          "Then Italy, where he brings the same talent to public and private events, live, solo or with the band. And the guitars — beyond playing them, he builds them by hand too, one at a time.",
        ],
        pullQuote: "The audience changes continent. The music doesn't.",
        didascalieArticolo: [
          "On stage, mid-way through a set that's never the same twice",
          "A beat before stepping into a song",
        ],
        collegamentoAltro: "He also builds the guitars he plays →",
      },
      liuteria: {
        titolo: "Lutherie",
        occhiello: "In the workshop",
        testo:
          "Guitars built by hand, one at a time. Wood chosen in person, a neck shaped to your hand, French-polished finishes.",
        dettagli: ["Hand-picked woods", "Neck made to measure", "French-polish finish"],
        ctaLabel: "Commission a guitar",
        didascalia: "In progress, Milan workshop",
        paragrafi: [
          "Every guitar is built one at a time, never in series: the wood is chosen by hand, the neck shaped to the hands that will play it, the finish laid on with a cloth, coat after coat, until the wood's own colour comes through on its own.",
          "The workshop isn't only for building: it repairs what others would give up on, and the same hands that carve a neck also stitch leather and fabric — bags included — with the same care for every material.",
          "For anyone who wants more than a guitar bought off the shelf: guided, step-by-step courses to build with your own hands the guitar you'll play for years.",
        ],
        pullQuote: "The guitar you play best is the one you built yourself.",
        didascalieArticolo: ["At the bench, among the tools", "A neck still waiting to be finished"],
        collegamentoAltro: "The same hands play live too →",
      },
    },
    placeholderFoto: {
      titolo: (nome) => `Photo of ${nome} still to be taken.`,
      corpo: "The frame is ready: upload the file and it appears.",
    },
    agenda: {
      kicker: "Right now",
      ctaTesto: "Got a date to propose?",
      ctaLabel: "Get in touch",
      tappe: {
        "mfw-2026": { titolo: "MFW 2026 — Live Session", luogo: "Spazio Ventura, Milan" },
        "jazzbox-nicola": {
          titolo: "Jazzbox — Nicola R.",
          luogo: "Atelier Corso Garibaldi, Milan",
        },
        "ep-controluce": {
          titolo: "EP «Controluce»",
          luogo: "Studio Meridiana, Navigli",
        },
      },
    },
    galleria: {
      aria: "Live photos",
      foto: {
        microfono: { alt: "Rons Gemini at the microphone", didascalia: "At the mic" },
        palco: { alt: "Rons Gemini on stage", didascalia: "On stage" },
      },
    },
    contatti: {
      kicker: "Contact",
      titolo: "Let's talk",
      sottotitolo:
        "A date to book, a guitar to build, a piece to take home. I answer personally, usually within two days.",
      nomeLabel: "Name",
      nomePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "where I'll reply",
      telefonoLabel: "Phone",
      telefonoFacoltativo: "(optional)",
      telefonoPlaceholder: "if you'd rather be called back",
      motivoLabel: "What's this about",
      motivoOpzioni: {
        booking: "A date to book",
        chitarra: "A custom guitar",
        quadro: "A piece or a commission",
        altro: "Something else",
      },
      messaggioLabel: "Message",
      messaggioPlaceholder:
        "Dates, budget, timing: the more specific, the more useful my reply",
      invioInCorso: "Sending",
      invia: "Send message",
      esitoOk: "Message sent. I'll reply within two days.",
      esitoErrorePrefisso: "Sending failed. Try again or write directly to ",
    },
    paginaMestiere: {
      home: "← Rons Gemini",
      altro: { musica: "Music", liuteria: "Lutherie" },
    },
  },
};
