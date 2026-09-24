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

   COME COLLEGARE UNA TAPPA AGENDA ALLA TRADUZIONE:
   lib/content.ts assegna un "id" stabile a ogni tappa. Qui sotto,
   in agenda.tappe, usa lo stesso id come chiave. Se aggiungi una
   tappa in content.ts, aggiungi la voce corrispondente in ENTRAMBE
   le lingue qui.
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
  /* Racconto breve per lo spread in homepage (TreAnime.tsx): un
     paragrafo per voce. Se assente, si usa "testo" come paragrafo
     unico. Per il racconto lungo delle pagine dedicate, vedi
     "paragrafiEstesi" qui sotto. */
  paragrafi?: string[];
  pullQuote?: string;
  /* Frase-ponte verso l'altro mestiere, integrata nel racconto
     (es. "costruisce anche le chitarre che suona →"). L'indirizzo
     è deciso dal componente, qui c'è solo il testo. Facoltativa:
     serve solo dove il racconto lo prevede (oggi, Musica). */
  collegamentoAltro?: string;
  /* Testo del link verso la pagina dedicata a questo mestiere,
     nello spread in homepage (vedi TreAnime.tsx). */
  paginaLabel: string;
  /* Racconto lungo, in stile editoriale (Vogue), usato dalle pagine
     dedicate (components/PaginaMestiereEsteso.tsx) — non tocca lo
     spread breve in home, che resta su "paragrafi". Il pullQuote
     qui sopra viene inserito a metà, come nel racconto breve. */
  paragrafiEstesi?: string[];
  /* Invito ai contatti in fondo al racconto lungo (vedi
     PaginaMestiereEsteso.tsx): una domanda diretta più l'azione,
     linkate insieme verso /#contatti in home. */
  contattoDomanda?: string;
  contattoAzione?: string;
};

type TestiTappa = {
  titolo: string;
  luogo?: string; // assente per gli eventi privati
  /* Breve testo di presentazione (facoltativo): compare accanto
     alla locandina, nel blocco del prossimo evento. */
  descrizione?: string;
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
    kicker: string;
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
        collegamentoAltro: "Le chitarre le costruisce anche a mano →",
        paginaLabel: "Leggi della sua musica",
        paragrafiEstesi: [
          "Prima ancora che diventasse un mestiere, per Rons Gemini la musica è stata un modo di stare al mondo. Nato nelle Filippine, cresciuto in mezzo a strumenti presi in prestito e canzoni imparate a orecchio, ha portato voce e chitarra in giro per continenti quando molti coetanei stavano ancora decidendo cosa fare da grandi. Il percorso comincia lontano da qui, e non è mai stato lineare: ogni tappa portava con sé una lingua nuova da capire, un pubblico nuovo da leggere, e spesso uno strumento mai suonato prima, imparato per necessità o per curiosità, il tempo di una stagione.",
          "Non è una posa da polistrumentista da copertina: è il risultato di anni passati a salire su un palco senza sapere in anticipo cosa il repertorio della serata avrebbe richiesto. Voce e chitarra restano il centro, la base a cui tutto torna, ma intorno si è costruito un vocabolario più ampio — percussivo, melodico, capace di riempire i vuoti quando in formazione manca un elemento, o di restare essenziale quando basta lui solo, una sedia e un microfono.",
          "Per un periodo si stabilisce alle Maldive, frontman di uno dei gruppi più richiesti dell'arcipelago. Il palco cambia ogni sera ma la scena resta la stessa: un resort a cinque stelle, la stessa aria salata, la stessa luce che si spegne sull'oceano proprio mentre le luci di scena si accendono. Il pubblico però è un altro ogni volta — turisti di ogni continente, in vacanza da una vita diversa dalla sua, che per un'ora o due condividono lo stesso spazio e la stessa musica prima di ripartire, l'indomani, verso un'altra latitudine.",
          "È lì che impara la disciplina che oggi si sente nel modo in cui suona: la capacità di leggere una stanza nei primi trenta secondi, di capire quando un pubblico vuole essere accompagnato piano e quando invece aspetta solo il momento per alzarsi. Suonare per sconosciuti ogni sera, con la stessa energia, senza che la ripetizione smussi l'intensità, è un mestiere che si impara sul campo, non sui libri — e che resta addosso anche quando il palco cambia scenario.",
          "Poi arriva l'Italia, dove porta lo stesso bagaglio in eventi pubblici e privati: locali, feste, matrimoni, serate acustiche pensate su misura, in solo o con la band, a seconda di cosa la serata chiede. È lo stesso musicista delle Maldive, ma con una libertà in più — quella di scegliere, quando può, i progetti in cui mettere davvero tutto se stesso.",
          "Sul palco la sua cifra è la naturalezza: voce calda, chitarra che accompagna senza mai sovrastare, un repertorio che passa da un pezzo intimo a uno che fa alzare la sala senza soluzione di continuità. Non è intrattenimento di sottofondo — è un musicista che ha imparato a occupare uno spazio, piccolo o grande che sia, e a farlo sembrare esattamente della misura giusta.",
          "E le chitarre che suona, quando può, le costruisce anche lui, a mano, una alla volta — non per hobby, ma perché conoscere uno strumento dal legno in su cambia il modo in cui lo si suona. È lo stesso istinto, applicato due volte: prima in bottega, poi sul palco.",
        ],
        contattoDomanda: "Vuoi ascoltarlo dal vivo?",
        contattoAzione: "Contattami",
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
        collegamentoAltro: "Le stesse mani suonano anche dal vivo →",
        paginaLabel: "Leggi della sua liuteria",
        paragrafiEstesi: [
          "In una bottega di Milano, tra trucioli e odore di vernice, ogni chitarra nasce da zero, una alla volta — mai in serie, mai due identiche. È un lavoro che si misura in settimane, non in pezzi prodotti: il legno si sceglie di persona, tavola per tavola, ascoltando quello che la venatura racconta prima ancora di tagliarla.",
          "Il manico è il punto dove il lavoro diventa intimo: non uno stampo uguale per tutti, ma una forma modellata sulla mano di chi suonerà quello strumento — lo spessore, la curva, il modo in cui il pollice trova appoggio. È un dettaglio che chi compra una chitarra in negozio non ha mai la possibilità di chiedere.",
          "La finitura è l'ultimo passo e il più lento: passata a tampone, mano dopo mano, senza fretta, finché il colore del legno non viene fuori da solo, senza bisogno di nasconderlo sotto uno strato spesso di vernice. È una tecnica che chiede pazienza più che attrezzatura, e si vede nel risultato — una superficie che sembra respirare, non sigillata.",
          "In bottega non si costruisce soltanto: si ripara quello che altri darebbero per perso — incollature aperte, manici da raddrizzare, elettroniche da rimettere in vita. È lo stesso occhio che serve per costruire, applicato al contrario: capire cosa non va prima di rimediarlo.",
          "Le stesse mani che intagliano un manico cuciono anche oggetti in pelle e tessuto — borse comprese — con la stessa cura riservata al legno. Non è un secondo mestiere separato: è la stessa attenzione ai materiali, spostata da uno strumento a un oggetto che si porta addosso.",
          "Per chi vuole qualcosa di più di uno strumento comprato, in bottega si può anche imparare: percorsi guidati, passo per passo, per costruire con le proprie mani la chitarra che poi si suonerà per anni. Non un corso teorico, ma settimane fianco a fianco, con gli attrezzi in mano fin dal primo giorno.",
          "E chi costruisce queste chitarre è anche chi le suona sul palco, prima da polistrumentista in giro per il mondo e oggi dal vivo in Italia. Conoscere uno strumento dal legno in su cambia il modo in cui lo si suona — ed è lo stesso istinto applicato due volte: prima in bottega, poi sul palco.",
        ],
        contattoDomanda: "Vuoi una chitarra costruita per te?",
        contattoAzione: "Contattami",
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
        "mfw-2026": {
          titolo: "Milano Fashion Week 2026",
          luogo: "Officine Del Volo, Milano",
          descrizione:
            "Due giorni di sfilate, un pop-up store e una mostra d'arte alle Officine Del Volo, nel cuore della Milano Fashion Week. Rons Gemini sale sul palco per il momento live dell'evento: voce e chitarra, lo stesso suono acustico e intimo che porta nei locali più piccoli, qui davanti a un pubblico internazionale di addetti ai lavori e appassionati di moda.",
        },
        "matrimonio-ottobre-2026": { titolo: "Matrimonio", luogo: "Location privata, Milano" },
        "privato-dicembre-2026": { titolo: "Evento privato", luogo: "Location privata, Milano" },
      },
    },
    galleria: {
      aria: "Foto e video di Musica e Liuteria",
      kicker: "Bottega e palco, insieme",
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
        collegamentoAltro: "He also builds the guitars he plays →",
        paginaLabel: "Read about his music",
        paragrafiEstesi: [
          "Long before it became a job, music was Rons Gemini's way of being in the world. Born in the Philippines and raised among borrowed instruments and songs learned by ear, he carried voice and guitar across continents while many of his peers were still deciding what to do with their lives. The journey starts far from here, and it was never a straight line: every stop brought a new language to make sense of, a new audience to read, and often an instrument he'd never played before, picked up out of necessity or curiosity, for the length of a season.",
          "It isn't a cover-story multi-instrumentalist pose — it's what years of walking on stage without knowing in advance what the night's set would demand will do to a musician. Voice and guitar remain the centre, the place everything returns to, but around them he's built a wider vocabulary: percussive, melodic, able to fill the gaps when a lineup is short a player, or to stay essential when it's just him, a chair and a microphone.",
          "For a while he settled in the Maldives, fronting one of the archipelago's most in-demand bands. The stage changes every night but the setting stays the same — a five-star resort, the same salt air, the same light dying over the ocean just as the stage lights come up. The audience, though, is different every time: travellers from every continent, on holiday from a life unlike his, sharing the same room and the same songs for an hour or two before moving on, the next day, to another latitude.",
          "That's where he learns the discipline you can still hear in the way he plays today: reading a room in the first thirty seconds, knowing when an audience wants to be led gently and when it's just waiting for permission to get up. Playing for strangers every night, at the same intensity, without letting repetition dull the edge, is a trade learned on the job, not from a book — and it stays with a performer long after the scenery changes.",
          "Then Italy, where he brings the same toolkit to public and private events: venues, parties, weddings, acoustic evenings built to measure, solo or with the band depending on what the night calls for. He's the same musician who played the Maldives, with one more freedom — the freedom, when he can take it, to choose the projects he gives everything to.",
          "On stage, his signature is ease: a warm voice, guitar that accompanies without ever crowding it out, a set that moves from something intimate to something that gets a room on its feet without a seam showing. It isn't background entertainment — it's a musician who's learned how to fill a space, however big or small, and make it feel exactly the right size.",
          "And the guitars he plays, when he can, he also builds — by hand, one at a time, not as a hobby but because knowing an instrument from the wood up changes the way you play it. It's the same instinct, applied twice: first in the workshop, then on stage.",
        ],
        contattoDomanda: "Want to hear him live?",
        contattoAzione: "Get in touch",
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
        collegamentoAltro: "The same hands play live too →",
        paginaLabel: "Read about his guitars",
        paragrafiEstesi: [
          "In a workshop in Milan, among wood shavings and the smell of varnish, every guitar is built from scratch, one at a time — never in series, never two alike. It's work measured in weeks, not units produced: the wood is chosen in person, board by board, listening to what the grain says before it's even cut.",
          "The neck is where the work turns intimate: not a single mould for everyone, but a shape modelled on the hand of whoever will play that instrument — the thickness, the curve, where the thumb finds its rest. It's a detail no one buying a guitar off a shop wall ever gets to ask for.",
          "The finish is the last step and the slowest: applied with a cloth, coat after coat, without rushing, until the wood's own colour comes through on its own, with no need to hide it under a thick layer of varnish. It's a technique that asks for patience more than equipment, and it shows in the result — a surface that seems to breathe, not seal.",
          "The workshop isn't only for building: it repairs what others would give up on — open joints, necks to straighten, electronics to bring back to life. It's the same eye needed to build, applied in reverse: understanding what's wrong before you can fix it.",
          "The same hands that carve a neck also stitch leather and fabric — bags included — with the same care given to wood. It isn't a second, separate trade: it's the same attention to materials, moved from an instrument to something you carry with you.",
          "For anyone who wants more than a guitar bought off the shelf, the workshop also teaches: guided, step-by-step courses to build with your own hands the guitar you'll play for years. Not a theory class — weeks spent side by side, tools in hand from day one.",
          "And whoever builds these guitars is also the one who plays them on stage — a multi-instrumentalist who once toured the world, now performing live across Italy. Knowing an instrument from the wood up changes the way you play it — the same instinct, applied twice: first in the workshop, then on stage.",
        ],
        contattoDomanda: "Want a guitar built for you?",
        contattoAzione: "Get in touch",
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
        "mfw-2026": {
          titolo: "Milan Fashion Week 2026",
          luogo: "Officine Del Volo, Milan",
          descrizione:
            "Two days of runway shows, a pop-up store and an art exhibition at Officine Del Volo, at the heart of Milan Fashion Week. Rons Gemini takes the stage for the event's live moment: voice and guitar, the same intimate acoustic sound he brings to smaller venues, here in front of an international crowd of industry insiders and fashion lovers.",
        },
        "matrimonio-ottobre-2026": { titolo: "Wedding", luogo: "Private location, Milan" },
        "privato-dicembre-2026": { titolo: "Private event", luogo: "Private location, Milan" },
      },
    },
    galleria: {
      aria: "Photos and videos of Music and Lutherie",
      kicker: "The workshop and the stage, together",
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
