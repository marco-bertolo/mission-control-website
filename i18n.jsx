/* global React */
/* =========================================================================
   i18n — English (primary) + Português de Portugal (secondary)
   - TR holds both language dictionaries.
   - fmt() parses inline markup inside any string:
       §...§   → <span className="it"> (serif italic accent)
       **...**  → <strong>
   - useI18n() returns { lang, setLang, S } where S is the active dictionary.
   - <LangToggle/> is the EN / PT switch used in the nav.
   ========================================================================= */

const { createContext, useContext, useState, useEffect, useCallback } = React;

/* ---- inline-markup parser (keeps the serif-italic + bold styling) -------- */
function fmt(str) {
  if (str == null) return null;
  if (typeof str !== "string") return str;
  const tokens = str.split(/(§[^§]*§|\*\*[^*]*\*\*)/g);
  return tokens.filter((t) => t !== "").map((tok, i) => {
    if (tok.length >= 2 && tok[0] === "§" && tok[tok.length - 1] === "§")
      return React.createElement("span", { className: "it", key: i }, tok.slice(1, -1));
    if (tok.length >= 4 && tok.startsWith("**") && tok.endsWith("**"))
      return React.createElement("strong", { key: i }, tok.slice(2, -2));
    return tok;
  });
}

/* ========================================================================= */
const TR = {
  /* ============================ ENGLISH ============================ */
  en: {
    label: "EN",
    name: "English",

    nav: {
      premise: "Premise",
      features: "Features",
      missions: "Missions",
      team: "Team",
      labs: "Laced Labs",
      partners: "Partners",
      visit: "Visit Laced Labs",
    },

    audio: {
      label: "Soundtrack",
      track: "Alarme do Vazio",
      play: "Play soundtrack",
      pause: "Pause soundtrack",
    },

    orbit: {
      lifeSupport: "Life Support",
      comms: "Comms",
      navigation: "Navigation",
      powerCore: "Power Core",
    },

    hero: {
      title: "Mission §Control§",
      subhead: "Your shared protocol for §cooperative survival§",
      body:
        "Communication is breaking down. Systems are failing across the Odyssey. " +
        "One player sees the ship. The others hold the manual. We didn’t just build " +
        "a co-op puzzle — we built a synchronized mission engine that aligns Roles, " +
        "Procedures, Energy and Time into a single shared protocol.",
      ctaDiscover: "Discover the mission",
      ctaVisit: "Visit Laced Labs ↗",
      chipYear: "2087 · EUROPA RETURN",
    },

    about: {
      tag: "01 / Premise",
      title: "Communication is §the mechanic.§",
      p1:
        "Mission Control is an **asymmetric cooperative puzzle** for 2–4 players. " +
        "One player wakes up alone aboard the §Odyssey§, a stricken vessel returning " +
        "from Europa. The others sit at the desk with a thick technical manual.",
      p2:
        "The Astronaut sees panels, lights and values — but doesn’t know what any of " +
        "it means. The Mission Controllers know every procedure — but cannot see the " +
        "ship. Only voice connects them.",
      quote:
        "Houston, I’m looking at three flashing diodes — red, red, amber. What do I do?",
      quoteAttr: "— Cmdr. Elena Vasquez · T+ 00:04:21",
      channelOpen: "▸ Channel Open",
      live: "VHF-04 · LIVE",
      astronaut: "The §Astronaut§",
      astronautSub: "Sees the ship",
      control: "Mission §Control§",
      controlSub: "Holds the manual",
      voiceOnly: "Voice only",
      voiceOnlySub: "No text. No ping. Just talk.",
      realtime: "Real-time",
      realtimeSub: "One global mission clock.",
      roleASolo: "Role A · Solo",
      roleAName: "The §Astronaut§",
      roleADesc:
        "First-person, inside the ship. Reads panels aloud, follows instructions, " +
        "throws switches, watches the energy core decay.",
      roleBPlayers: "Role B · 1–3 players",
      roleBName: "Mission §Control§",
      roleBDesc:
        "Off-screen. Holds the manual, interprets symptoms, dispatches procedures, " +
        "and triages failures under time pressure.",
    },

    cast: {
      tag: "The crew",
      title: "Two people. §One lifeline.§",
      lead:
        "Separated by millions of kilometres and joined only by a voice channel — " +
        "meet the two people the whole mission rests on.",
      a: {
        role: "Astronaut",
        name: "Elena Vasquez",
        sub: "Aboard the Odyssey",
        quote: "I’m not asking to be saved. I’m asking for directions.",
        stats: [
          ["Age", "27"],
          ["Nationality", "Spanish"],
          ["Role", "Onboard Systems Specialist"],
          ["Field", "Aerospace Engineering"],
          ["Status", "Sole conscious crew"],
        ],
      },
      b: {
        role: "Mission Control",
        name: "Daniel Ortega",
        sub: "Houston, Earth",
        quote: "I’ve got the manual. You’ve got the eyes in there. Together, we’ve got a solution.",
        stats: [
          ["Age", "28"],
          ["Nationality", "Mexican"],
          ["Role", "Systems & Comms Controller"],
          ["Field", "Systems & Telecom Engineering"],
          ["Location", "Houston, USA"],
        ],
      },
    },

    features: {
      tag: "02 / Core loop",
      title: "Eight systems. §One survival problem.§",
      lead:
        "Mission Control is built on a tight set of mechanics that reward calm, " +
        "vocabulary, and a team that listens.",
      items: [
        { t: "Asymmetric §co-op§",        d: "Two roles. One shared problem. Neither side wins alone." },
        { t: "Voice §communication§",     d: "Tone, vocabulary, calm under pressure. The real interface." },
        { t: "Time §pressure§",           d: "A per-mission countdown and a 60-second danger window." },
        { t: "Energy §management§",       d: "Mistakes drain the core. Triage what to fix first." },
        { t: "Interactive §panels§",      d: "Sliders, dials, sequencers — each panel a tactile puzzle." },
        { t: "Six-mission §campaign§",    d: "From a broken life-support to coordinated reentry." },
        { t: "Four §difficulties§",       d: "Training, Normal, Hard, Nightmare. Reduced timers & manual gaps." },
        { t: "A real §manual§",           d: "Print it. Tab it. Share it across players. Imperfect by design." },
      ],
    },

    how: {
      tag: "03 / The loop · ~04:30 avg",
      title: "From wake-up to §atmospheric reentry.§",
      lead:
        "A round of Mission Control is rarely about smart deduction. It is about " +
        "coordination, a common vocabulary, and the ability to keep talking when " +
        "the alarms start.",
      steps: [
        { label: "Boot",   text: "One player puts on a headset and enters the Odyssey as the Astronaut." },
        { label: "Manual", text: "The Controllers open the technical manual — printed, tablet, or shared." },
        { label: "Report", text: "The Astronaut describes panels, lights and values they see in the ship." },
        { label: "Decode", text: "The Controllers cross-reference the manual and call back instructions." },
        { label: "Repair", text: "The team patches each system before the energy core falls to zero." },
      ],
    },

    manual: {
      tag: "Field document",
      title: "The §Operator’s Manual.§",
      body:
        "This is the manual Mission Control reads from — every procedure, fault code " +
        "and panel diagram the team needs to bring the Odyssey home. Print it, tab it, " +
        "or keep it open on a second screen.",
      meta: "PDF · 7 pages · A4 print-ready",
      download: "Download the manual",
      hint: "Free · no sign-up",
      docName: "OPERATOR’S MANUAL",
      docRef: "DOC · ODY-MAN-01",
    },

    missions: {
      tag: "04 / Campaign · Odyssey",
      title: "Six missions. §One way home.§",
      statusCleared: "Cleared",
      statusActive: "Active",
      statusLocked: "Locked",
      briefing: "Briefing",
      modules: "modules",
      duration: "Duration",
      modulesLabel: "Modules",
      difficulty: "Difficulty",
      errors: "Errors",
      modes: { NORMAL: "NORMAL", HARD: "HARD", NIGHTMARE: "NIGHTMARE" },
      list: [
        { name: "Awakening",       obj: "Restore life support",
          long: "Tutorial mission. Commander Vasquez wakes alone in the medical bay. Oxygen is failing. A single life-support module must be brought online — the team learns to talk, the manual learns to be opened." },
        { name: "First Signals",   obj: "Re-establish communications",
          long: "With life support stable, contact must be restored to Earth. Two comms modules — antenna alignment and signal sequencing — must be repaired simultaneously across the ship." },
        { name: "Solar Storm",     obj: "Restore power, protect critical systems",
          long: "A solar storm hits during repairs. Three electrical subsystems fail at once. The team must triage which system to protect first — life support, comms or thrust — before the storm overwhelms the hull." },
        { name: "Off Course",      obj: "Recalibrate navigation, avoid debris",
          long: "The Odyssey has drifted off-course and is sliding toward a debris field. Three navigation modules require timed adjustments — each with its own per-module timer running in parallel with the global clock." },
        { name: "Cascade Failure", obj: "Manage simultaneous failures",
          long: "Cascading failures. Four modules are interdependent — fixing the wrong one first will break the next. The manual now has gaps. The Controllers must reason from symptoms, not procedures." },
        { name: "Reentry",         obj: "Coordinate all systems for reentry",
          long: "Final mission. Five systems must execute in a precisely-timed sequence to survive reentry. One error and the Odyssey breaks up. There are no second tries. The Controllers cue every step." },
      ],
    },

    ship: {
      tag: "Prologue vessel · Work in progress",
      title: "This is the §Odyssey.§",
      lead:
        "The vessel you wake up on in the prologue — modeled in Blender and still in " +
        "active development. Here is where she stands today.",
      badge: "WORK IN PROGRESS",
      shots: [
        { tag: "MODEL · EXTERIOR", cap: "Hull & thrusters — exterior pass" },
        { tag: "MODEL · BOW",      cap: "Bow and cockpit canopy" },
        { tag: "MODEL · BRIDGE",   cap: "The bridge you’ll wake up on" },
      ],
    },

    level2: {
      tag: "Level 02 · In production",
      title: "Next stop — the §station.§",
      lead:
        "Level 2 takes the crew aboard a derelict orbital station — new layouts, new " +
        "failures, new procedures to talk each other through. Coming soon.",
      badge: "COMING SOON",
      shots: [
        { tag: "MODEL · STATION",  cap: "Modular orbital station — exterior" },
        { tag: "MODEL · CORRIDOR", cap: "Service corridor" },
        { tag: "MODEL · MODULE",   cap: "Observation module" },
      ],
    },

    atmos: {
      tag: "05 / Visual identity",
      title: "Stylized, tactile, §deliberately tense.§",
      lead:
        "Low poly geometry, hand-tuned emissives, and the constant low hum of life " +
        "support. The HUD stays out of your way until the alarms start.",
      list: [
        "Low poly §sci-fi§", "Dark §ship interiors§", "Cyan §dashboards§", "Orange §alerts§",
        "Emergency §lighting§", "Radio §comms§", "Ambient §sound design§", "Minimalist §HUD§",
      ],
      camTag: "CAM · ODY-04 · MED BAY",
      pulseTag: "⚠ EM·PULSE",
      shot1Tag: "CREW DOSSIER · E. VASQUEZ",
      shot1Cap: "Cmdr. Elena Vasquez · Sole conscious crew",
      shot2Tag: "MODULE A · LIFE SUPPORT",
      shot3Tag: "MODULE B · BREAKERS",
      shot4Tag: "KEY ART · ODYSSEY 2087",
      shot4Cap: "“Two roles. One way home.”",
    },

    team: {
      tag: "06 / Crew · Laced Labs",
      title: "Developed by §Laced Labs.§",
      lead:
        "A six-person studio crew working at the intersection of games, " +
        "interactive experiences and software engineering.",
      activeCrew: "Active crew",
      hq: "HQ · Lisboa, PT",
      status: "STATUS · ACTIVE",
      moments: {
        label: "Behind the build",
        shots: [
          { tag: "DEVLOG · 01", cap: "Tuning a panel at the studio desk" },
          { tag: "DEVLOG · 02", cap: "Life-support module, live in Unity 3D" },
        ],
      },
      roles: [
        "Studio Director · PM",
        "Art Director",
        "Programmer",
        "Concept Artist · Illustrator",
        "Programmer",
        "Programmer",
      ],
      skills: [
        [["Plus", "Direction"], ["Missions", "Planning"]],
        [["Eye", "Vision"], ["Camera", "Art"]],
        [["Bolt", "Systems"], ["Panel", "UI"]],
        [["Spark", "Concept"], ["Camera", "Illustr."]],
        [["Decode", "Logic"], ["Grid", "Engine"]],
        [["Repair", "Gameplay"], ["Panel", "Tools"]],
      ],
    },

    labs: {
      tag: "A Laced Labs production",
      title: "Mission Control is one project.\n§Laced Labs§ is the team behind it.",
      body:
        "Laced Labs is a team focused on technology, interactive experiences, " +
        "cybersecurity, web development and full-stack solutions. Mission Control is " +
        "our first game release — built end-to-end in Unity 3D.",
      visit: "Visit Laced Labs",
      whatWeDo: "What we do",
      services: [
        "Game development",
        "Interactive experiences",
        "Cybersecurity",
        "Web & full-stack",
        "Design systems",
      ],
    },

    partners: {
      tag: "08 / Backed by",
      title: "Built with §good company.§",
      lead:
        "Mission Control was developed by **Laced Labs**, with funding support from " +
        "**Fun Punch Games**, as a project at §ISTEC§ — Instituto Superior de " +
        "Tecnologias Avançadas de Lisboa.",
      roles: ["Studio · Developer", "Funding Partner", "Academic Partner"],
    },

    release: {
      tag: "Save the date",
      label: "First public demo",
      title: "The §Odyssey§ goes public.",
      dateLine: "December 7, 2026",
      sub:
        "Our first playable demo drops on this date. Follow Laced Labs for the " +
        "countdown, devlogs and the launch.",
      units: { days: "Days", hours: "Hours", mins: "Min", secs: "Sec" },
      follow: "Follow on Instagram",
      liveSoon: "The demo is live!",
      steam: { wishlist: "Wishlist on Steam", soon: "Wishlist on Steam · June 28" },
    },

    footer: {
      blurb:
        "An asymmetric cooperative puzzle game for 2–4 players. Developed in Unity 3D by Laced Labs.",
      visit: "Visit Laced Labs",
      colGame: "Game",
      colStudio: "Studio",
      colPress: "Press kit",
      game: ["Premise", "Features", "Missions", "Manual", "Atmosphere"],
      studio: ["Team", "Laced Labs ↗", "Contact ↗", "Careers ↗"],
      press: ["Fact sheet ↗", "Screenshots ↗", "Logos ↗", "Trailer ↗"],
      copyright: "© 2026 LACED LABS · ALL SYSTEMS NOMINAL",
    },
  },

  /* ====================== PORTUGUÊS (PORTUGAL) ====================== */
  pt: {
    label: "PT",
    name: "Português",

    nav: {
      premise: "Premissa",
      features: "Funcionalidades",
      missions: "Missões",
      team: "Equipa",
      labs: "Laced Labs",
      partners: "Parceiros",
      visit: "Visitar a Laced Labs",
    },

    audio: {
      label: "Banda sonora",
      track: "Alarme do Vazio",
      play: "Tocar banda sonora",
      pause: "Pausar banda sonora",
    },

    orbit: {
      lifeSupport: "Suporte de Vida",
      comms: "Comunicações",
      navigation: "Navegação",
      powerCore: "Núcleo de Energia",
    },

    hero: {
      title: "Mission §Control§",
      subhead: "O vosso protocolo partilhado para a §sobrevivência cooperativa§",
      body:
        "A comunicação está a falhar. Os sistemas estão a colapsar por toda a Odyssey. " +
        "Um jogador vê a nave. Os outros têm o manual. Não criámos apenas um puzzle " +
        "cooperativo — criámos um motor de missão sincronizado que alinha Funções, " +
        "Procedimentos, Energia e Tempo num único protocolo partilhado.",
      ctaDiscover: "Descobrir a missão",
      ctaVisit: "Visitar a Laced Labs ↗",
      chipYear: "2087 · REGRESSO DE EUROPA",
    },

    about: {
      tag: "01 / Premissa",
      title: "A comunicação é §a mecânica.§",
      p1:
        "Mission Control é um **puzzle cooperativo assimétrico** para 2 a 4 jogadores. " +
        "Um jogador acorda sozinho a bordo da §Odyssey§, uma nave avariada de regresso " +
        "de Europa. Os outros sentam-se à secretária com um denso manual técnico.",
      p2:
        "O Astronauta vê painéis, luzes e valores — mas não sabe o que nada disso " +
        "significa. O Controlo de Missão conhece cada procedimento — mas não consegue " +
        "ver a nave. Só a voz os liga.",
      quote:
        "Houston, estou a ver três díodos a piscar — vermelho, vermelho, âmbar. O que faço?",
      quoteAttr: "— Cmdt. Elena Vasquez · T+ 00:04:21",
      channelOpen: "▸ Canal Aberto",
      live: "VHF-04 · EM DIRETO",
      astronaut: "O §Astronauta§",
      astronautSub: "Vê a nave",
      control: "Controlo de §Missão§",
      controlSub: "Tem o manual",
      voiceOnly: "Só voz",
      voiceOnlySub: "Sem texto. Sem ping. Só falar.",
      realtime: "Tempo real",
      realtimeSub: "Um único relógio de missão global.",
      roleASolo: "Função A · A solo",
      roleAName: "O §Astronauta§",
      roleADesc:
        "Na primeira pessoa, dentro da nave. Lê os painéis em voz alta, segue " +
        "instruções, aciona interruptores e vê o núcleo de energia a esgotar-se.",
      roleBPlayers: "Função B · 1 a 3 jogadores",
      roleBName: "Controlo de §Missão§",
      roleBDesc:
        "Fora do ecrã. Tem o manual, interpreta sintomas, despacha procedimentos e " +
        "prioriza falhas sob pressão de tempo.",
    },

    cast: {
      tag: "A tripulação",
      title: "Duas pessoas. §Uma só linha de vida.§",
      lead:
        "Separados por milhões de quilómetros e ligados apenas por um canal de voz — " +
        "conhece as duas pessoas de quem depende toda a missão.",
      a: {
        role: "Astronauta",
        name: "Elena Vasquez",
        sub: "A bordo da Odyssey",
        quote: "Não estou a pedir para ser salva. Estou a pedir direções.",
        stats: [
          ["Idade", "27"],
          ["Nacionalidade", "Espanhola"],
          ["Função", "Especialista em Sistemas de Bordo"],
          ["Especialidade", "Engenharia Aeroespacial"],
          ["Estado", "Única tripulante consciente"],
        ],
      },
      b: {
        role: "Controlo de Missão",
        name: "Daniel Ortega",
        sub: "Houston, Terra",
        quote: "Tenho o manual. Tu tens os olhos lá dentro. Juntos, temos uma solução.",
        stats: [
          ["Idade", "28"],
          ["Nacionalidade", "Mexicana"],
          ["Função", "Controlador de Sistemas e Comunicações"],
          ["Especialidade", "Engenharia de Sistemas e Telecomunicações"],
          ["Localização", "Houston, EUA"],
        ],
      },
    },

    features: {
      tag: "02 / Ciclo central",
      title: "Oito sistemas. §Um problema de sobrevivência.§",
      lead:
        "Mission Control assenta num conjunto preciso de mecânicas que recompensam a " +
        "calma, o vocabulário e uma equipa que sabe ouvir.",
      items: [
        { t: "Cooperação §assimétrica§",  d: "Duas funções. Um problema partilhado. Nenhum lado vence sozinho." },
        { t: "Comunicação por §voz§",     d: "Tom, vocabulário, calma sob pressão. A verdadeira interface." },
        { t: "Pressão de §tempo§",        d: "Uma contagem decrescente por missão e uma janela de perigo de 60 segundos." },
        { t: "Gestão de §energia§",       d: "Os erros esgotam o núcleo. Decide o que reparar primeiro." },
        { t: "Painéis §interativos§",     d: "Cursores, mostradores, sequenciadores — cada painel é um puzzle tátil." },
        { t: "Campanha de §seis missões§",d: "De um suporte de vida avariado até uma reentrada coordenada." },
        { t: "Quatro §dificuldades§",     d: "Treino, Normal, Difícil, Pesadelo. Tempos reduzidos e lacunas no manual." },
        { t: "Um manual a §sério§",       d: "Imprime-o. Marca-o. Partilha-o entre jogadores. Imperfeito por design." },
      ],
    },

    how: {
      tag: "03 / O ciclo · ~04:30 média",
      title: "Do despertar à §reentrada atmosférica.§",
      lead:
        "Uma ronda de Mission Control raramente se resume a dedução inteligente. É " +
        "sobre coordenação, um vocabulário comum e a capacidade de continuar a falar " +
        "quando os alarmes começam.",
      steps: [
        { label: "Arranque", text: "Um jogador coloca os auscultadores e entra na Odyssey como Astronauta." },
        { label: "Manual",   text: "O Controlo abre o manual técnico — impresso, em tablet ou partilhado." },
        { label: "Relato",   text: "O Astronauta descreve os painéis, luzes e valores que vê na nave." },
        { label: "Descodificar", text: "O Controlo cruza a informação com o manual e devolve as instruções." },
        { label: "Reparar",  text: "A equipa repara cada sistema antes de o núcleo de energia chegar a zero." },
      ],
    },

    manual: {
      tag: "Documento de campo",
      title: "O §Manual do Operador.§",
      body:
        "Este é o manual que o Controlo de Missão consulta — cada procedimento, código " +
        "de falha e diagrama de painel que a equipa precisa para trazer a Odyssey a casa. " +
        "Imprime-o, marca-o ou mantém-no aberto num segundo ecrã.",
      meta: "PDF · 7 páginas · Pronto a imprimir (A4)",
      download: "Descarregar o manual",
      hint: "Grátis · sem registo",
      docName: "MANUAL DO OPERADOR",
      docRef: "DOC · ODY-MAN-01",
    },

    missions: {
      tag: "04 / Campanha · Odyssey",
      title: "Seis missões. §Um caminho para casa.§",
      statusCleared: "Concluída",
      statusActive: "Ativa",
      statusLocked: "Bloqueada",
      briefing: "Resumo",
      modules: "módulos",
      duration: "Duração",
      modulesLabel: "Módulos",
      difficulty: "Dificuldade",
      errors: "Erros",
      modes: { NORMAL: "NORMAL", HARD: "DIFÍCIL", NIGHTMARE: "PESADELO" },
      list: [
        { name: "Despertar",        obj: "Restaurar o suporte de vida",
          long: "Missão de tutorial. A Comandante Vasquez acorda sozinha na enfermaria. O oxigénio está a falhar. É preciso pôr em funcionamento um único módulo de suporte de vida — a equipa aprende a falar, o manual aprende a ser aberto." },
        { name: "Primeiros Sinais", obj: "Restabelecer as comunicações",
          long: "Com o suporte de vida estável, é preciso restabelecer o contacto com a Terra. Dois módulos de comunicações — alinhamento da antena e sequenciação do sinal — têm de ser reparados em simultâneo por toda a nave." },
        { name: "Tempestade Solar", obj: "Restaurar a energia, proteger sistemas críticos",
          long: "Uma tempestade solar atinge a nave durante as reparações. Três subsistemas elétricos falham ao mesmo tempo. A equipa tem de decidir que sistema proteger primeiro — suporte de vida, comunicações ou propulsão — antes de a tempestade dominar o casco." },
        { name: "Curso Desviado",   obj: "Recalibrar a navegação, evitar destroços",
          long: "A Odyssey desviou-se do curso e desliza em direção a um campo de destroços. Três módulos de navegação exigem ajustes cronometrados — cada um com o seu próprio temporizador a correr em paralelo com o relógio global." },
        { name: "Falha em Cascata", obj: "Gerir falhas em simultâneo",
          long: "Falhas em cascata. Quatro módulos são interdependentes — reparar o errado primeiro avaria o seguinte. O manual tem agora lacunas. O Controlo tem de raciocinar a partir dos sintomas, não dos procedimentos." },
        { name: "Reentrada",        obj: "Coordenar todos os sistemas para a reentrada",
          long: "Missão final. Cinco sistemas têm de ser executados numa sequência cronometrada ao pormenor para sobreviver à reentrada. Um erro e a Odyssey desfaz-se. Não há segundas tentativas. O Controlo dá a deixa a cada passo." },
      ],
    },

    ship: {
      tag: "Nave do prólogo · Em desenvolvimento",
      title: "Esta é a §Odyssey.§",
      lead:
        "A nave onde acordas no prólogo — modelada em Blender e ainda em desenvolvimento " +
        "ativo. É assim que está neste momento.",
      badge: "EM CONSTRUÇÃO",
      shots: [
        { tag: "MODELO · EXTERIOR", cap: "Casco e propulsores — passagem exterior" },
        { tag: "MODELO · PROA",     cap: "Proa e cúpula do cockpit" },
        { tag: "MODELO · PONTE",    cap: "A ponte onde vais acordar" },
      ],
    },

    level2: {
      tag: "Nível 02 · Em produção",
      title: "Próxima paragem — a §estação.§",
      lead:
        "O Nível 2 leva a tripulação a bordo de uma estação orbital abandonada — novos " +
        "espaços, novas falhas, novos procedimentos para se guiarem uns aos outros. Em breve.",
      badge: "EM BREVE",
      shots: [
        { tag: "MODELO · ESTAÇÃO",  cap: "Estação orbital modular — exterior" },
        { tag: "MODELO · CORREDOR", cap: "Corredor de serviço" },
        { tag: "MODELO · MÓDULO",   cap: "Módulo de observação" },
      ],
    },

    atmos: {
      tag: "05 / Identidade visual",
      title: "Estilizado, tátil, §deliberadamente tenso.§",
      lead:
        "Geometria low poly, emissivos afinados à mão e o constante zumbido grave do " +
        "suporte de vida. O HUD não atrapalha até os alarmes começarem.",
      list: [
        "Ficção científica §low poly§", "Interiores §escuros§", "Painéis §ciano§", "Alertas §laranja§",
        "Iluminação de §emergência§", "Comunicações por §rádio§", "Som §ambiente§", "HUD §minimalista§",
      ],
      camTag: "CAM · ODY-04 · ENFERMARIA",
      pulseTag: "⚠ EM·PULSO",
      shot1Tag: "FICHA · E. VASQUEZ",
      shot1Cap: "Cmdt. Elena Vasquez · Única tripulante consciente",
      shot2Tag: "MÓDULO A · SUPORTE DE VIDA",
      shot3Tag: "MÓDULO B · DISJUNTORES",
      shot4Tag: "KEY ART · ODYSSEY 2087",
      shot4Cap: "“Duas funções. Um caminho para casa.”",
    },

    team: {
      tag: "06 / Tripulação · Laced Labs",
      title: "Desenvolvido pela §Laced Labs.§",
      lead:
        "Uma equipa de estúdio de seis pessoas a trabalhar no cruzamento entre jogos, " +
        "experiências interativas e engenharia de software.",
      activeCrew: "Tripulação ativa",
      hq: "Sede · Lisboa, PT",
      status: "ESTADO · ATIVO",
      moments: {
        label: "Nos bastidores",
        shots: [
          { tag: "DEVLOG · 01", cap: "A afinar um painel na secretária do estúdio" },
          { tag: "DEVLOG · 02", cap: "Módulo de suporte de vida, ao vivo no Unity 3D" },
        ],
      },
      roles: [
        "Diretor de Estúdio · GP",
        "Diretor de Arte",
        "Programador",
        "Artista de Conceito · Ilustrador",
        "Programador",
        "Programador",
      ],
      skills: [
        [["Plus", "Direção"], ["Missions", "Planeamento"]],
        [["Eye", "Visão"], ["Camera", "Arte"]],
        [["Bolt", "Sistemas"], ["Panel", "UI"]],
        [["Spark", "Conceito"], ["Camera", "Ilustr."]],
        [["Decode", "Lógica"], ["Grid", "Motor"]],
        [["Repair", "Jogabilidade"], ["Panel", "Ferramentas"]],
      ],
    },

    labs: {
      tag: "Uma produção Laced Labs",
      title: "Mission Control é um projeto.\nA §Laced Labs§ é a equipa por detrás dele.",
      body:
        "A Laced Labs é uma equipa focada em tecnologia, experiências interativas, " +
        "cibersegurança, desenvolvimento web e soluções full-stack. Mission Control é " +
        "o nosso primeiro lançamento — criado de ponta a ponta em Unity 3D.",
      visit: "Visitar a Laced Labs",
      whatWeDo: "O que fazemos",
      services: [
        "Desenvolvimento de jogos",
        "Experiências interativas",
        "Cibersegurança",
        "Web & full-stack",
        "Design systems",
      ],
    },

    partners: {
      tag: "08 / Apoiado por",
      title: "Feito com §boa companhia.§",
      lead:
        "Mission Control foi desenvolvido pela **Laced Labs**, com o apoio financeiro " +
        "da **Fun Punch Games**, como projeto no §ISTEC§ — Instituto Superior de " +
        "Tecnologias Avançadas de Lisboa.",
      roles: ["Estúdio · Programação", "Parceiro de Financiamento", "Parceiro Académico"],
    },

    release: {
      tag: "Marca na agenda",
      label: "Primeira amostra pública",
      title: "A §Odyssey§ chega ao público.",
      dateLine: "7 de dezembro de 2026",
      sub:
        "A nossa primeira demo jogável é lançada nesta data. Segue a Laced Labs para a " +
        "contagem decrescente, devlogs e o lançamento.",
      units: { days: "Dias", hours: "Horas", mins: "Min", secs: "Seg" },
      follow: "Seguir no Instagram",
      liveSoon: "A demo está no ar!",
      steam: { wishlist: "Adicionar à wishlist na Steam", soon: "Wishlist na Steam · 28 jun" },
    },

    footer: {
      blurb:
        "Um puzzle cooperativo assimétrico para 2 a 4 jogadores. Desenvolvido em Unity 3D pela Laced Labs.",
      visit: "Visitar a Laced Labs",
      colGame: "Jogo",
      colStudio: "Estúdio",
      colPress: "Kit de imprensa",
      game: ["Premissa", "Funcionalidades", "Missões", "Manual", "Atmosfera"],
      studio: ["Equipa", "Laced Labs ↗", "Contacto ↗", "Carreiras ↗"],
      press: ["Ficha técnica ↗", "Capturas ↗", "Logótipos ↗", "Trailer ↗"],
      copyright: "© 2026 LACED LABS · TODOS OS SISTEMAS NOMINAIS",
    },
  },
};

/* ----------------------------- context ----------------------------------- */
const LangContext = createContext(null);
const LANG_KEY = "mc-lang";

function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "pt") return saved;
    } catch (e) {}
    return "en";
  });

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  }, [lang]);

  const S = TR[lang] || TR.en;
  return React.createElement(LangContext.Provider, { value: { lang, setLang, S } }, children);
}

function useI18n() {
  const ctx = useContext(LangContext);
  return ctx || { lang: "en", setLang: () => {}, S: TR.en };
}

/* --------------------------- language toggle ----------------------------- */
function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-opt ${lang === "en" ? "on" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >EN</button>
      <span className="lang-sep" aria-hidden="true">/</span>
      <button
        type="button"
        className={`lang-opt ${lang === "pt" ? "on" : ""}`}
        aria-pressed={lang === "pt"}
        onClick={() => setLang("pt")}
      >PT</button>
    </div>
  );
}

Object.assign(window, { TR, fmt, LangContext, I18nProvider, useI18n, LangToggle });
