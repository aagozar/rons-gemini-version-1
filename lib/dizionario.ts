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
  { codice: "it", label: "IT" },
  { codice: "en", label: "EN" },
];

type TestiAnima = {
  titolo: string;
  occhiello: string;
  testo: string;
  dettagli: string[];
  ctaLabel: string;
  didascalia: string;
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
      },
      liuteria: {
        titolo: "Liuteria",
        occhiello: "In bottega",
        testo:
          "Chitarre costruite a mano, una alla volta. Legni scelti di persona, manico modellato sulla tua mano, finiture a tampone.",
        dettagli: ["Legni scelti a mano", "Manico su misura", "Finitura a tampone"],
        ctaLabel: "Richiedi una chitarra",
        didascalia: "In lavorazione, bottega di Milano",
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
          titolo: "Una jazzbox in acero fiammato per Nicola R.",
          luogo: "Atelier Corso Garibaldi, Milano",
        },
        "ep-controluce": {
          titolo: "Registrazione dell'EP «Controluce»",
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
      },
      liuteria: {
        titolo: "Lutherie",
        occhiello: "In the workshop",
        testo:
          "Guitars built by hand, one at a time. Wood chosen in person, a neck shaped to your hand, French-polished finishes.",
        dettagli: ["Hand-picked woods", "Neck made to measure", "French-polish finish"],
        ctaLabel: "Commission a guitar",
        didascalia: "In progress, Milan workshop",
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
          titolo: "A flamed-maple jazzbox for Nicola R.",
          luogo: "Atelier Corso Garibaldi, Milan",
        },
        "ep-controluce": {
          titolo: "Recording the EP «Controluce»",
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
