/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useState, useEffect, useRef, useMemo } = React;

const LACED_URL = "https://lacedlabs.pt";

/* =================== Scattered "+" star background =================== */

const STAR_POSITIONS = [
  // outer canvas — corners (around glow areas)
  { x: "5%",  y: "10%", s: "lg" },
  { x: "12%", y: "26%", s: "sm" },
  { x: "3%",  y: "55%", s: "" },
  { x: "8%",  y: "82%", s: "sm" },
  { x: "15%", y: "92%", s: "lg" },
  { x: "85%", y: "8%",  s: "sm" },
  { x: "92%", y: "30%", s: "lg" },
  { x: "96%", y: "60%", s: "sm" },
  { x: "88%", y: "78%", s: "" },
  { x: "94%", y: "92%", s: "sm" },
  { x: "50%", y: "5%",  s: "sm" },
];

function OuterStars() {
  return (
    <div className="stars" aria-hidden="true">
      {STAR_POSITIONS.map((p, i) => (
        <i key={i} className={`plus ${p.s}`} style={{ left: p.x, top: p.y }} />
      ))}
    </div>
  );
}

const CARD_STARS = [
  { x: "8%",  y: "12%", s: "sm" },
  { x: "18%", y: "8%",  s: "" },
  { x: "30%", y: "20%", s: "sm" },
  { x: "62%", y: "10%", s: "sm" },
  { x: "88%", y: "16%", s: "" },
  { x: "94%", y: "32%", s: "sm" },
  { x: "5%",  y: "45%", s: "" },
  { x: "12%", y: "62%", s: "sm" },
  { x: "92%", y: "55%", s: "" },
  { x: "78%", y: "72%", s: "sm" },
  { x: "20%", y: "82%", s: "" },
  { x: "8%",  y: "94%", s: "sm" },
  { x: "55%", y: "92%", s: "sm" },
  { x: "94%", y: "88%", s: "" },
  { x: "70%", y: "44%", s: "sm" },
  { x: "40%", y: "55%", s: "sm" },
];
function CardStars() {
  return (
    <div className="card-stars" aria-hidden="true">
      {CARD_STARS.map((p, i) => (
        <i key={i} className={`plus ${p.s}`} style={{ left: p.x, top: p.y }} />
      ))}
    </div>
  );
}

/* =================== Diamond mark =================== */

function DiamondMark({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 1 L20 12 L12 23 L4 12 Z" fill={color} />
    </svg>
  );
}

/* =================== NAV =================== */

function Nav() {
  const { S } = useI18n();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className={"nav" + (open ? " open" : "")}>
      <a href="#top" className="brand" onClick={close}>
        <img className="brand-logo" src="assets/mission-control-badge.png" alt="Mission Control" width="36" height="36" />
        <span>mission/control</span>
      </a>

      <button
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      <div className="nav-collapse">
        <ul className="nav-menu">
          <li><a href="#about" onClick={close}>{S.nav.premise}</a></li>
          <li><a href="#features" onClick={close}><span className="plus-i" /> {S.nav.features}</a></li>
          <li><a href="#missions" onClick={close}>{S.nav.missions}</a></li>
          <li><a href="#team" onClick={close}><span className="plus-i" /> {S.nav.team}</a></li>
          <li><a href="#labs" onClick={close}>{S.nav.labs}</a></li>
          <li><a href="#partners" onClick={close}><span className="plus-i" /> {S.nav.partners}</a></li>
        </ul>
        <div className="nav-right">
          <LangToggle />
          <a className="btn-pill" href={LACED_URL} target="_blank" rel="noreferrer" onClick={close}>
            <span className="plus-i" /> {S.nav.visit}
          </a>
        </div>
      </div>
    </nav>
  );
}

/* =================== Tilted orbit diagram =================== */

function Orbit() {
  // Drawn as a tilted ellipse system using SVG transforms
  // 3 elliptical rings with 4 module nodes positioned around the outermost
  // Slight tilt via rotation
  const { S } = useI18n();
  const ringStyle = { fill: "none", stroke: "var(--cream)", strokeWidth: 1, opacity: 0.55 };
  return (
    <div className="hero-orbit-wrap">
      <svg className="orbit-svg" viewBox="-300 -300 600 600">
        <defs>
          <radialGradient id="centerGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#1E40FF" stopOpacity="0.5" />
            <stop offset="1" stopColor="#1E40FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Tilted, rotated group */}
        <g transform="rotate(-22)">
          {/* outermost ring */}
          <ellipse cx="0" cy="0" rx="280" ry="120" style={ringStyle} />
          {/* mid ring */}
          <ellipse cx="0" cy="0" rx="210" ry="90" style={ringStyle} />
          {/* inner ring */}
          <ellipse cx="0" cy="0" rx="140" ry="60" style={ringStyle} />

          {/* Node dots (on outer/mid rings) */}
          {/* Outer right */}
          <circle cx="280" cy="0" r="4" fill="var(--cream)" />
          {/* Outer bottom-right */}
          <circle cx="200" cy="78" r="4" fill="var(--cream)" />
          {/* Outer bottom-left */}
          <circle cx="-180" cy="80" r="4" fill="var(--cream)" />
          {/* Outer top-left */}
          <circle cx="-260" cy="-40" r="4" fill="var(--cream)" />
        </g>

        {/* Center glow + diamond (NOT rotated so they stay upright) */}
        <circle cx="0" cy="0" r="60" fill="url(#centerGlow)" />
        <g>
          <path d="M0 -22 L18 0 L0 22 L-18 0 Z" fill="var(--cream)" />
        </g>

        {/* Labels (placed near rotated nodes, computed manually for clarity) */}
        {/* Outer right -> Life Support */}
        <g transform="translate(265, -100)">
          <text className="node-label" textAnchor="start">{S.orbit.lifeSupport}</text>
          <text className="node-sub" y="14" textAnchor="start">M1 · M3</text>
        </g>
        {/* Outer bottom -> Comms */}
        <g transform="translate(195, 95)">
          <text className="node-label" textAnchor="start">{S.orbit.comms}</text>
          <text className="node-sub" y="14" textAnchor="start">M2</text>
        </g>
        {/* Outer bottom-left -> Navigation */}
        <g transform="translate(-175, 115)">
          <text className="node-label" textAnchor="start">{S.orbit.navigation}</text>
          <text className="node-sub" y="14" textAnchor="start">M4</text>
        </g>
        {/* Outer top-left -> Power Core */}
        <g transform="translate(-270, -60)">
          <text className="node-label" textAnchor="end">{S.orbit.powerCore}</text>
          <text className="node-sub" y="14" textAnchor="end">M3 · M5</text>
        </g>
      </svg>
    </div>
  );
}

/* =================== HERO =================== */

function Hero() {
  const { S } = useI18n();
  return (
    <section id="top" className="hero" data-screen-label="00 Hero">
      <div className="hero-grid">
        <div>
          <h1 className="headline">
            {fmt(S.hero.title)}
          </h1>
          <p className="subhead">
            {fmt(S.hero.subhead)}
          </p>
          <p className="hero-body">
            {S.hero.body}
          </p>
          <div className="hero-cta">
            <a className="btn-pill lg" href="#about">
              <span className="down" /> {S.hero.ctaDiscover}
            </a>
            <a className="btn-ghost" href={LACED_URL} target="_blank" rel="noreferrer">
              {S.hero.ctaVisit}
            </a>
          </div>
        </div>
        <Orbit />
      </div>

      <div className="hero-chips" aria-hidden="true">
        <div className="chip" style={{top:"4%", right:"38%"}}>
          <span className="icon"><Icons.Globe/></span>
          <span>{S.hero.chipYear}</span>
        </div>
        <div className="chip" style={{top:"22%", right:"2%"}}>
          <span className="dot"/>
          <span>O₂</span><b>96.4%</b>
        </div>
        <div className="chip" style={{bottom:"14%", right:"30%"}}>
          <span className="icon"><Icons.Bolt/></span>
          <span>CORE</span><b>62%</b>
        </div>
        <div className="chip" style={{bottom:"32%", right:"4%"}}>
          <span className="icon"><Icons.Wave/></span>
          <span>VHF</span><b>LIVE</b>
        </div>
      </div>
    </section>
  );
}

/* =================== ABOUT =================== */

function About() {
  const { S } = useI18n();
  return (
    <section id="about" className="section" data-screen-label="01 About">
      <div className="about-grid">
        <div>
          <div className="sec-tag">{S.about.tag}</div>
          <h2 className="sec-title">
            {fmt(S.about.title)}
          </h2>
          <div className="about-text">
            <p>{fmt(S.about.p1)}</p>
            <p>{fmt(S.about.p2)}</p>
          </div>

          <div className="quote-card">
            <span className="q-mark">&ldquo;</span>
            <div className="q-text">
              {S.about.quote}
            </div>
            <div className="q-attr">{S.about.quoteAttr}</div>
          </div>
        </div>

        <div className="role-pair">
          <div className="comms-card">
            <div className="comms-tag">
              <span>{S.about.channelOpen}</span>
              <span className="ping">{S.about.live}</span>
            </div>
            <div className="comms-diagram">
              <div className="comms-node">
                <span className="icon"><Icons.Eye/></span>
                <div className="label">{fmt(S.about.astronaut)}</div>
                <div className="sublabel">{S.about.astronautSub}</div>
              </div>
              <div className="comms-wave">
                <svg viewBox="0 0 50 28">
                  {[0,1,2,3,4,5,6,7].map(i => {
                    const h = [6, 10, 16, 22, 16, 10, 14, 8][i];
                    return <rect key={i} className="bar" x={i*6+2} y={(28-h)/2} width="3" height={h} rx="1"/>
                  })}
                </svg>
              </div>
              <div className="comms-node">
                <span className="icon"><Icons.Manual/></span>
                <div className="label">{fmt(S.about.control)}</div>
                <div className="sublabel">{S.about.controlSub}</div>
              </div>
            </div>
            <div className="comms-grid-bottom">
              <div>
                <span className="icon"><Icons.Speaker/></span>
                <span><b>{S.about.voiceOnly}</b>{S.about.voiceOnlySub}</span>
              </div>
              <div>
                <span className="icon"><Icons.Clock/></span>
                <span><b>{S.about.realtime}</b>{S.about.realtimeSub}</span>
              </div>
            </div>
          </div>

          <div className="role-card">
            <div className="role-tag"><span className="dot"/> {S.about.roleASolo}</div>
            <div className="role-name">{fmt(S.about.roleAName)}</div>
            <div className="role-desc">
              {S.about.roleADesc}
            </div>
          </div>
          <div className="role-card">
            <div className="role-tag"><span className="dot"/> {S.about.roleBPlayers}</div>
            <div className="role-name">{fmt(S.about.roleBName)}</div>
            <div className="role-desc">
              {S.about.roleBDesc}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== CAST / PROTAGONISTS =================== */

function CastCard({ data, portrait, side }) {
  return (
    <article className={`cast-card cast-${side}`}>
      <div className="cast-portrait">
        <img src={portrait} alt={data.name} />
        <span className="cast-role"><i className="dot" />{data.role}</span>
        <span className="cast-scrim" aria-hidden="true" />
        <div className="cast-id">
          <h3>{data.name}</h3>
          <span>{data.sub}</span>
        </div>
      </div>
      <blockquote className="cast-quote">
        <span className="cast-q-mark">&ldquo;</span>{data.quote}
      </blockquote>
      <dl className="cast-stats">
        {data.stats.map(([k, v], i) => (
          <div className="cast-stat" key={i}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function Cast() {
  const { S } = useI18n();
  const C = S.cast;
  return (
    <section id="cast" className="section cast-section" data-screen-label="Cast">
      <div className="sec-tag">{C.tag}</div>
      <h2 className="sec-title">{fmt(C.title)}</h2>
      <p className="sec-lead">{C.lead}</p>
      <div className="cast-grid">
        <CastCard data={C.a} portrait="assets/protag-elena-final.png" side="a" />
        <div className="cast-link" aria-hidden="true">
          <span className="cast-link-bar" />
          <span className="cast-link-chip">VHF-04</span>
          <span className="cast-link-bar" />
        </div>
        <CastCard data={C.b} portrait="assets/protag-daniel.png" side="b" />
      </div>
    </section>
  );
}

/* =================== FEATURES =================== */

const FEATURE_ICONS = ["Asymmetric", "Voice", "Clock", "Bolt", "Panel", "Missions", "Levels", "Manual"];

function Features() {
  const { S } = useI18n();
  return (
    <section id="features" className="section" data-screen-label="02 Features">
      <div className="sec-tag">{S.features.tag}</div>
      <h2 className="sec-title">{fmt(S.features.title)}</h2>
      <p className="sec-lead">
        {S.features.lead}
      </p>
      <div className="features">
        {S.features.items.map((f, i) => {
          const I = Icons[FEATURE_ICONS[i]];
          return (
            <div className="feature" key={i}>
              <div className="feature-head">
                <div className="feature-icon-wrap"><span className="icon"><I/></span></div>
                <div className="feature-num">{String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="feature-title">{fmt(f.t)}</div>
              <div className="feature-desc">{f.d}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =================== HOW =================== */

const STEP_ICONS = ["Headset", "Book", "Speech", "Decode", "Repair"];

function How() {
  const { S } = useI18n();
  return (
    <section id="how" className="section" data-screen-label="03 How">
      <div className="sec-tag">{S.how.tag}</div>
      <h2 className="sec-title">{fmt(S.how.title)}</h2>
      <p className="sec-lead">
        {S.how.lead}
      </p>
      <div className="steps">
        {S.how.steps.map((s, i) => {
          const I = Icons[STEP_ICONS[i]];
          return (
            <div className="step" key={i}>
              <div className="step-head">
                <div className="step-no">0{i+1}</div>
                <div className="step-icon-wrap"><span className="icon"><I/></span></div>
              </div>
              <div className="step-label">{s.label}</div>
              <div className="step-text">{s.text}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =================== MANUAL DOWNLOAD =================== */

const MANUAL_PDF = "assets/MissionControl_Operators_Manual.pdf";

function ManualDownload() {
  const { S } = useI18n();
  return (
    <section id="manual" className="section manual-section" data-screen-label="Manual">
      <div className="manual-band">
        <div className="manual-doc" aria-hidden="true">
          <div className="manual-doc-top">
            <span className="manual-doc-ref">{S.manual.docRef}</span>
            <span className="manual-doc-rev">REV. 1.0</span>
          </div>
          <div className="manual-doc-body">
            <span className="manual-doc-icon"><Icons.Manual/></span>
            <div className="manual-doc-name">{S.manual.docName}</div>
            <div className="manual-doc-sub">ODYSSEY · EUROPA MISSION</div>
            <div className="manual-doc-lines">
              <span/><span/><span/>
            </div>
          </div>
          <div className="manual-doc-foot">
            <span className="dot"/><span className="dot"/><span className="dot"/>
            <span className="manual-doc-pages">PP. 01–07</span>
          </div>
        </div>

        <div className="manual-info">
          <div className="sec-tag">{S.manual.tag}</div>
          <h2 className="sec-title">{fmt(S.manual.title)}</h2>
          <p className="manual-body">{S.manual.body}</p>
          <div className="manual-cta">
            <a className="btn-pill lg" href={MANUAL_PDF} download>
              <span className="down" /> {S.manual.download}
            </a>
            <span className="manual-meta">
              <span className="manual-meta-main">{S.manual.meta}</span>
              <span className="manual-meta-sub">{S.manual.hint}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== MISSIONS =================== */

const MISSION_DATA = [
  { id:"M1", ic:"LifeSupport", modules:1, time:"08:00", mode:"NORMAL",    warn:false },
  { id:"M2", ic:"Antenna",     modules:2, time:"09:30", mode:"NORMAL",    warn:false },
  { id:"M3", ic:"Storm",       modules:3, time:"10:00", mode:"HARD",      warn:true  },
  { id:"M4", ic:"Nav",         modules:3, time:"11:00", mode:"HARD",      warn:false },
  { id:"M5", ic:"Cascade",     modules:4, time:"12:30", mode:"HARD",      warn:true  },
  { id:"M6", ic:"Reentry",     modules:5, time:"14:00", mode:"NIGHTMARE", warn:true  },
];

function Missions() {
  const { S } = useI18n();
  const [active, setActive] = useState(0);
  const d = MISSION_DATA[active];
  const txt = S.missions.list[active];
  return (
    <section id="missions" className="section" data-screen-label="04 Missions">
      <div className="missions-head">
        <div>
          <div className="sec-tag">{S.missions.tag}</div>
          <h2 className="sec-title">{fmt(S.missions.title)}</h2>
        </div>
        <div className="missions-status">
          <span><i className="dot"/>{S.missions.statusCleared}</span>
          <span><i className="dot warn"/>{S.missions.statusActive}</span>
          <span><i className="dot dim"/>{S.missions.statusLocked}</span>
        </div>
      </div>

      <div className="missions">
        {MISSION_DATA.map((mi, i) => {
          const I = Icons[mi.ic];
          const mt = S.missions.list[i];
          return (
            <div
              key={mi.id}
              className={`mission ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <div className="mission-badge"><span className="icon"><I/></span></div>
              <div className="mission-code">{mi.id}</div>
              <div>
                <div className="mission-name">{mt.name}</div>
                <div className="mission-obj">{mt.obj}</div>
              </div>
              <div className="mission-meta-right">
                <b>{mi.time} · {String(mi.modules).padStart(2,"0")} {S.missions.modules}</b>
                <span className={`pill ${mi.warn ? "warn" : ""}`}>{S.missions.modes[mi.mode]}</span>
              </div>
              <div className="mission-arrow">→</div>
            </div>
          );
        })}
      </div>

      <div className="mission-detail">
        <div>
          <div className="detail-h">▸ {S.missions.briefing} · {d.id} · {txt.name}</div>
          <div className="detail-title">{txt.obj}</div>
          <div className="detail-body">{txt.long}</div>
        </div>
        <div className="detail-stats">
          <div className="dstat">
            <div className="dstat-label">{S.missions.duration}</div>
            <div className="dstat-val"><span className="it">{d.time}</span></div>
          </div>
          <div className="dstat">
            <div className="dstat-label">{S.missions.modulesLabel}</div>
            <div className="dstat-val">{String(d.modules).padStart(2,"0")}</div>
          </div>
          <div className="dstat">
            <div className="dstat-label">{S.missions.difficulty}</div>
            <div className="dstat-val"><span className="it">{S.missions.modes[d.mode]}</span></div>
          </div>
          <div className="dstat">
            <div className="dstat-label">{S.missions.errors}</div>
            <div className="dstat-val">≤ 03</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== ODYSSEY SHIP SHOWCASE =================== */

const SHIP_SHOTS = [
  { src: "assets/odyssey-exterior.png", cls: "half" },
  { src: "assets/odyssey-bow.png",      cls: "half" },
  { src: "assets/odyssey-bridge.png",   cls: "wide" },
];

function ShipShowcase() {
  const { S } = useI18n();
  const ref = useGalleryReveal();
  const P = S.ship;
  return (
    <section id="odyssey" className="section ship-section" data-screen-label="Odyssey ship">
      <div className="ship-head">
        <div className="sec-tag">{P.tag}</div>
        <h2 className="sec-title">{fmt(P.title)}</h2>
        <p className="sec-lead">{P.lead}</p>
        <span className="ship-badge"><i className="rec" />{P.badge}</span>
      </div>

      <div className="ship-gallery" ref={ref}>
        {SHIP_SHOTS.map((shot, i) => (
          <figure
            key={i}
            className={`shipframe ${shot.cls}`}
            data-reveal
            style={{ "--d": `${i * 130}ms` }}
          >
            <span className="gframe-tag"><i className="rec" />{P.shots[i].tag}</span>
            <div className="shipframe-inner">
              <img src={shot.src} alt={P.shots[i].cap} />
            </div>
            <span className="gframe-scrim" aria-hidden="true" />
            <figcaption className="gframe-cap">{P.shots[i].cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* =================== ATMOSPHERE =================== */

// Scroll-reveal for the gallery frames: adds .in to [data-reveal] children once
// they enter the viewport. Progressive enhancement — frames only hide once JS
// marks the gallery .reveal-ready, so print / no-JS still shows everything.
function useGalleryReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
      return;
    }
    root.classList.add("reveal-ready");
    const items = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Atmosphere() {
  const { S } = useI18n();
  const galleryRef = useGalleryReveal();
  return (
    <section id="atmosphere" className="section" data-screen-label="05 Atmosphere">
      <div className="atmos-grid">
        <div>
          <div className="sec-tag">{S.atmos.tag}</div>
          <h2 className="sec-title">{fmt(S.atmos.title)}</h2>
          <p className="sec-lead">
            {S.atmos.lead}
          </p>
          <ul className="atmos-list">
            {S.atmos.list.map((a, i) => (
              <li key={i}>{fmt(a)}</li>
            ))}
          </ul>
        </div>
        <div className="cockpit">
          <span className="cockpit-tag">{S.atmos.camTag}</span>
          <span className="cockpit-tag-r">{S.atmos.pulseTag}</span>
          <img className="cockpit-img" src="assets/shot-cockpit.png" alt="Odyssey cockpit interior" />
          <span className="cockpit-scan" aria-hidden="true" />
        </div>
      </div>

      <div className="atmos-gallery" ref={galleryRef}>
        <figure className="gframe tall" data-reveal style={{"--d":"0ms"}}>
          <span className="gframe-tag"><i className="rec" />{S.atmos.shot1Tag}</span>
          <div className="gframe-inner" style={{"--float":"7.5s", "--fd":"0s"}}>
            <img className="gimg gimg-portrait" src="assets/elena-vasquez.png" alt="Elena Vasquez character sheet" />
          </div>
          <span className="gframe-scrim" aria-hidden="true" />
          <figcaption className="gframe-cap">{S.atmos.shot1Cap}</figcaption>
        </figure>

        <figure className="gframe panel" data-reveal style={{"--d":"120ms"}}>
          <span className="gframe-tag"><i className="rec" />{S.atmos.shot2Tag}</span>
          <div className="gframe-inner" style={{"--float":"9s", "--fd":"-2s"}}>
            <img className="gimg" src="assets/shot-life-support.png" alt="Life support module panel" />
          </div>
        </figure>

        <figure className="gframe panel" data-reveal style={{"--d":"240ms"}}>
          <span className="gframe-tag"><i className="rec" />{S.atmos.shot3Tag}</span>
          <div className="gframe-inner" style={{"--float":"8.5s", "--fd":"-4s"}}>
            <img className="gimg" src="assets/shot-electrical.png" alt="Electrical distribution breaker panel" />
          </div>
        </figure>

        <figure className="gframe wide" data-reveal style={{"--d":"360ms"}}>
          <span className="gframe-tag"><i className="rec" />{S.atmos.shot4Tag}</span>
          <div className="gframe-inner" style={{"--float":"10s", "--fd":"-1s"}}>
            <img className="gimg" src="assets/key-art.png" alt="Odyssey 2087 key art" />
          </div>
          <span className="gframe-scrim" aria-hidden="true" />
          <figcaption className="gframe-cap">{S.atmos.shot4Cap}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function CockpitArt() {
  return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" style={{position:"absolute", inset:0, width:"100%", height:"100%"}}>
      <defs>
        <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0c0c0c"/>
          <stop offset="1" stopColor="#000"/>
        </linearGradient>
        <radialGradient id="planetGlow" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#3759ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#1a1a3a" stopOpacity="1" />
        </radialGradient>
      </defs>
      {/* Window */}
      <rect x="80" y="40" width="240" height="120" fill="#020208" stroke="rgba(242,235,221,0.18)"/>
      {/* Stars */}
      {Array.from({length: 30}).map((_, i) => {
        const x = 84 + (i * 7919) % 234;
        const y = 44 + (i * 7327) % 112;
        const r = ((i * 17) % 9) / 10 + 0.3;
        return <circle key={i} cx={x} cy={y} r={r} fill="#F2EBDD" opacity={0.4 + ((i*13) % 10)/16}/>
      })}
      {/* Planet */}
      <circle cx="260" cy="90" r="22" fill="url(#planetGlow)" />
      <ellipse cx="260" cy="90" rx="34" ry="4" fill="none" stroke="rgba(30,64,255,0.4)" strokeWidth="0.6"/>
      {/* Floor */}
      <polygon points="0,210 400,210 460,320 -60,320" fill="url(#floor)"/>
      {/* Console */}
      <polygon points="40,220 360,220 380,270 20,270" fill="#0a0a0a" stroke="rgba(242,235,221,0.18)"/>
      {/* Buttons */}
      {[60,90,120,150,180,210,240,270,300,330].map((x, i) => (
        <rect key={i} x={x} y={234} width="14" height="10" fill={i % 3 === 0 ? "#1E40FF" : (i % 4 === 0 ? "#FF6B35" : "#1a1a1a")} opacity={i % 3 === 0 ? 1 : 0.8}>
          {i % 3 === 0 && <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin={`${i*0.2}s`}/>}
        </rect>
      ))}
      {/* Sliders */}
      <line x1="60" y1="258" x2="160" y2="258" stroke="rgba(242,235,221,0.2)"/>
      <line x1="180" y1="258" x2="280" y2="258" stroke="rgba(242,235,221,0.2)"/>
      <rect x="105" y="254" width="6" height="8" fill="#1E40FF"/>
      <rect x="220" y="254" width="6" height="8" fill="#FF6B35"/>
      {/* Side panels */}
      <rect x="14" y="120" width="32" height="6" fill="#1E40FF" opacity="0.85"/>
      <rect x="14" y="134" width="20" height="6" fill="#FF6B35"/>
      <rect x="14" y="148" width="28" height="6" fill="#1E40FF" opacity="0.5"/>
      <rect x="354" y="120" width="32" height="6" fill="#1E40FF" opacity="0.7"/>
      <rect x="354" y="134" width="32" height="6" fill="#1E40FF" opacity="0.3"/>
      {/* Scan line */}
      <rect x="0" y="0" width="400" height="2" fill="rgba(30,64,255,0.5)">
        <animate attributeName="y" values="0;320;0" dur="6s" repeatCount="indefinite"/>
      </rect>
    </svg>
  );
}

/* =================== TEAM =================== */

const TEAM = [
  { name: "Marco",   surname: "Bértolo",     initials: "MB", tag: "lead", handle: "DIR-01" },
  { name: "Tiago",   surname: "Duarte",      initials: "TD", tag: "art",  handle: "ART-01" },
  { name: "Miguel",  surname: "Candido",     initials: "MC", tag: "dev",  handle: "DEV-01" },
  { name: "Afonso",  surname: "Luis (ULTA)", initials: "AL", tag: "art",  handle: "ART-02" },
  { name: "Eduardo", surname: "Oliveira",    initials: "EO", tag: "dev",  handle: "DEV-02" },
  { name: "João",    surname: "Ribeiro",     initials: "JR", tag: "dev",  handle: "DEV-03" },
];

function Team() {
  const { S } = useI18n();
  return (
    <section id="team" className="section" data-screen-label="06 Team">
      <div className="team-head">
        <div>
          <div className="sec-tag">{S.team.tag}</div>
          <h2 className="sec-title">{fmt(S.team.title)}</h2>
          <p className="sec-lead" style={{marginBottom: 0}}>
            {S.team.lead}
          </p>
        </div>
        <div className="team-meta">
          <b>06</b>
          {S.team.activeCrew}<br/>
          <span style={{opacity:.7}}>{S.team.hq}</span>
        </div>
      </div>

      <div className="team-grid">
        {TEAM.map((m, idx) => (
          <div className={`member ${m.tag}`} key={m.handle}>
            <div className="member-row">
              <div className="member-avatar">{m.initials}</div>
              <div className="member-handle">◉ {m.handle}<br/>LACED · LABS</div>
            </div>
            <div className="member-name">{m.name} <span className="it">{m.surname}</span></div>
            <div className="member-role">{S.team.roles[idx]}</div>
            <div className="member-tags">
              {S.team.skills[idx].map(([ic, label], j) => {
                const I = Icons[ic];
                return (
                  <span className="member-tag" key={j}>
                    <span className="icon"><I/></span>{label}
                  </span>
                );
              })}
            </div>
            <div className="member-bottom">
              <span>{S.team.status}</span>
              <span>★</span>
            </div>
          </div>
        ))}
      </div>

      <TeamMoments />
    </section>
  );
}

function TeamMoments() {
  const { S } = useI18n();
  const ref = useGalleryReveal();
  const M = S.team.moments;
  return (
    <div className="moments" ref={ref}>
      <div className="moments-head">
        <span className="moments-line" aria-hidden="true" />
        <span className="moments-label">{M.label}</span>
      </div>
      <div className="moments-grid">
        <figure className="moment" data-reveal style={{"--d":"0ms"}}>
          <span className="gframe-tag"><i className="rec" />{M.shots[0].tag}</span>
          <div className="moment-inner">
            <img src="assets/moment-dev.png" alt={M.shots[0].cap} />
          </div>
          <span className="gframe-scrim" aria-hidden="true" />
          <figcaption className="moment-cap">{M.shots[0].cap}</figcaption>
        </figure>
        <figure className="moment" data-reveal style={{"--d":"140ms"}}>
          <span className="gframe-tag"><i className="rec" />{M.shots[1].tag}</span>
          <div className="moment-inner">
            <img src="assets/moment-unity.png" alt={M.shots[1].cap} />
          </div>
          <span className="gframe-scrim" aria-hidden="true" />
          <figcaption className="moment-cap">{M.shots[1].cap}</figcaption>
        </figure>
      </div>
    </div>
  );
}

/* =================== Laced Labs CTA =================== */

function LabsCTA() {
  const { S } = useI18n();
  const titleLines = S.labs.title.split("\n");
  const SERVICE_ICONS = ["Missions", "Spark", "Shield", "Globe", "Grid"];
  return (
    <section id="labs" className="section" data-screen-label="07 Laced Labs" style={{paddingBottom: 40}}>
      <div className="labs-block">
        <div className="labs-block-inner">
          <div>
            <div className="labs-tag">{S.labs.tag}</div>
            <div className="labs-title">
              {titleLines.map((line, i) => (
                <React.Fragment key={i}>
                  {fmt(line)}
                  {i < titleLines.length - 1 && <br/>}
                </React.Fragment>
              ))}
            </div>
            <p className="labs-body">
              {S.labs.body}
            </p>
            <a className="btn-pill lg" href={LACED_URL} target="_blank" rel="noreferrer">
              <span className="plus-i" /> {S.labs.visit}
            </a>
          </div>
          <div className="labs-side">
            <h4>{S.labs.whatWeDo}</h4>
            <ul>
              {S.labs.services.map((s, i) => {
                const I = Icons[SERVICE_ICONS[i]];
                return (
                  <li key={i}><span className="icon"><I/></span><span>{s}</span><span className="num">/{String(i+1).padStart(2,"0")}</span></li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== Partners marquee =================== */

const PARTNERS = [
  { src: "assets/logo-lacedlabs.png",   alt: "Laced Labs", role: "Studio · Developer", h: 86, glow: "rgba(255,61,85,0.55)", href: LACED_URL },
  { src: "assets/logo-funpunch.png",    alt: "Fun Punch Games", role: "Funding Partner", h: 58, glow: "rgba(255,61,85,0.55)", href: null },
  { src: "assets/logo-istec-cream.png", alt: "ISTEC Lisboa", role: "Academic Partner", h: 50, glow: "rgba(120,150,255,0.5)", href: null },
];

function PartnerItem({ p, role }) {
  const inner = (
    <>
      <div className="partner-tile" style={{ "--tile-glow": p.glow }}>
        <span className="partner-sheen" aria-hidden="true"></span>
        <img src={p.src} alt={p.alt} style={{ height: p.h }} draggable="false" />
      </div>
      <div className="partner-role">{role}</div>
    </>
  );
  return p.href
    ? <a className="partner" href={p.href} target="_blank" rel="noreferrer">{inner}</a>
    : <div className="partner">{inner}</div>;
}

function MarqueeGroup({ roles }) {
  // One clean set of the three partners. The track renders this group twice
  // and scrolls exactly one group width (-50%) for a seamless loop — so you
  // only ever see a single copy of each logo; the wrap copy hides behind the
  // edge fades.
  return (
    <div className="marquee-group">
      {PARTNERS.map((p, i) => <PartnerItem key={i} p={p} role={roles[i]} />)}
    </div>
  );
}

function Partners() {
  const { S } = useI18n();
  return (
    <section id="partners" className="section partners" data-screen-label="08 Partners">
      <div className="sec-tag">{S.partners.tag}</div>
      <h2 className="sec-title">{fmt(S.partners.title)}</h2>
      <p className="sec-lead">
        {fmt(S.partners.lead)}
      </p>

      <div className="marquee" role="list" aria-label="Project partners">
        <div className="marquee-track">
          <MarqueeGroup roles={S.partners.roles} />
          <MarqueeGroup roles={S.partners.roles} />
        </div>
      </div>
    </section>
  );
}

/* =================== LEVEL 2 TEASER =================== */

const LEVEL2_SHOTS = [
  { src: "assets/level2-station.png",  cls: "wide" },
  { src: "assets/level2-corridor.png", cls: "half" },
  { src: "assets/level2-interior.png", cls: "half" },
];

function Level2Teaser() {
  const { S } = useI18n();
  const ref = useGalleryReveal();
  const P = S.level2;
  return (
    <section id="level-2" className="section ship-section level2" data-screen-label="Level 2">
      <div className="ship-head">
        <div className="sec-tag">{P.tag}</div>
        <h2 className="sec-title">{fmt(P.title)}</h2>
        <p className="sec-lead">{P.lead}</p>
        <span className="ship-badge"><i className="rec" />{P.badge}</span>
      </div>

      <div className="ship-gallery level2-gallery" ref={ref}>
        {LEVEL2_SHOTS.map((shot, i) => (
          <figure
            key={i}
            className={`shipframe ${shot.cls}`}
            data-reveal
            style={{ "--d": `${i * 130}ms` }}
          >
            <span className="gframe-tag"><i className="rec" />{P.shots[i].tag}</span>
            <div className="shipframe-inner">
              <img src={shot.src} alt={P.shots[i].cap} />
            </div>
            <span className="gframe-scrim" aria-hidden="true" />
            <figcaption className="gframe-cap">{P.shots[i].cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* =================== Megamark =================== */

const INSTAGRAM_URL = "https://www.instagram.com/laced_labs/";
// TODO: replace with the real Steam app page once live
const STEAM_URL = "https://store.steampowered.com/";
const RELEASE_DATE = new Date("2026-12-07T00:00:00");
const STEAM_DATE = new Date("2026-06-28T00:00:00");

function SteamIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="steam-svg">
      <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.7"/>
      <circle cx="15.4" cy="9" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.7"/>
      <circle cx="8.4" cy="15" r="2.1" fill="currentColor"/>
      <line x1="10" y1="13.6" x2="14.2" y2="10.4" stroke="currentColor" strokeWidth="1.7"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ig-svg">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.7"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7"/>
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>
    </svg>
  );
}

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
    done: diff === 0,
  };
}

function ReleaseBand() {
  const { S } = useI18n();
  const R = S.release;
  const c = useCountdown(RELEASE_DATE);
  const pad = (n) => String(n).padStart(2, "0");
  const units = [
    [pad(c.days), R.units.days],
    [pad(c.hours), R.units.hours],
    [pad(c.mins), R.units.mins],
    [pad(c.secs), R.units.secs],
  ];
  return (
    <section id="release" className="section release-section" data-screen-label="Release">
      <div className="release-band">
        <span className="release-tag"><i className="rec" />{R.tag}</span>
        <div className="release-label">{R.label}</div>
        <h2 className="release-title">{fmt(R.title)}</h2>
        <div className="release-date">{R.dateLine}</div>

        {c.done ? (
          <div className="release-live">{R.liveSoon}</div>
        ) : (
          <div className="countdown">
            {units.map(([v, l], i) => (
              <div className="cd-unit" key={i}>
                <span className="cd-num">{v}</span>
                <span className="cd-lab">{l}</span>
              </div>
            ))}
          </div>
        )}

        <p className="release-sub">{R.sub}</p>
        <div className="release-cta">
          <a
            className={`release-steam ${Date.now() >= STEAM_DATE.getTime() ? "" : "soon"}`}
            href={STEAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            <SteamIcon />
            {Date.now() >= STEAM_DATE.getTime() ? R.steam.wishlist : R.steam.soon}
          </a>
          <a className="release-follow" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <InstagramIcon /> {R.follow}
          </a>
        </div>
      </div>
    </section>
  );
}

function MegaMark() {
  return (
    <div className="megamark">mission/<span className="it">control</span></div>
  );
}

/* =================== Footer =================== */

function Footer() {
  const { S } = useI18n();
  const gameHrefs = ["#about", "#features", "#missions", "#manual", "#atmosphere"];
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          <h3>mission/<span className="it">control</span></h3>
          <p>
            {S.footer.blurb}
          </p>
          <a className="btn-pill" href={LACED_URL} target="_blank" rel="noreferrer">
            <span className="plus-i" /> {S.footer.visit}
          </a>
        </div>
        <div className="foot-col">
          <h5>{S.footer.colGame}</h5>
          <ul>
            {S.footer.game.map((g, i) => (
              <li key={i}><a href={gameHrefs[i]}>{g}</a></li>
            ))}
          </ul>
        </div>
        <div className="foot-col">
          <h5>{S.footer.colStudio}</h5>
          <ul>
            <li><a href="#team">{S.footer.studio[0]}</a></li>
            {S.footer.studio.slice(1).map((s, i) => (
              <li key={i}><a href={LACED_URL} target="_blank" rel="noreferrer">{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="foot-col">
          <h5>{S.footer.colPress}</h5>
          <ul>
            {S.footer.press.map((p, i) => (
              <li key={i}><a href={LACED_URL} target="_blank" rel="noreferrer">{p}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>{S.footer.copyright}</span>
        <div className="foot-social">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="foot-ig">
            <InstagramIcon /> @laced_labs
          </a>
          <a href={LACED_URL} target="_blank" rel="noreferrer">LACEDLABS.PT ↗</a>
        </div>
      </div>
    </footer>
  );
}

/* =================== Reveal =================== */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".section, .hero, .labs-block");
    els.forEach(e => e.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/* =================== Audio player =================== */

const TRACK_SRC = "assets/Alarme do Vazio.mp3";

function AudioPlayer() {
  const { S } = useI18n();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    try {
      const saved = parseFloat(localStorage.getItem("mc-audio-time"));
      if (!isNaN(saved)) a.currentTime = saved;
    } catch (e) {}
    const onTime = () => {
      try { localStorage.setItem("mc-audio-time", String(a.currentTime)); } catch (e) {}
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  return (
    <div className={`audio-player ${playing ? "playing" : ""}`}>
      <audio ref={audioRef} src={TRACK_SRC} loop preload="metadata" />
      <button
        type="button"
        className="audio-btn"
        onClick={toggle}
        aria-label={playing ? S.audio.pause : S.audio.play}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>
        )}
      </button>
      <div className="audio-eq" aria-hidden="true"><span/><span/><span/><span/></div>
      <div className="audio-meta">
        <span className="audio-label">{S.audio.label}</span>
        <span className="audio-track">{S.audio.track}</span>
      </div>
    </div>
  );
}

/* =================== Tweaks =================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "red",
  "showStars": true
}/*EDITMODE-END*/;

const ACCENTS = {
  blue:    { blue: "#1E40FF", hot: "#2D55FF" },
  violet:  { blue: "#7A4BFF", hot: "#9266FF" },
  red:     { blue: "#FF3D55", hot: "#FF5570" },
  emerald: { blue: "#10B981", hot: "#1AD89B" },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS.blue;
    document.documentElement.style.setProperty("--blue", a.blue);
    document.documentElement.style.setProperty("--blue-hot", a.hot);
    document.documentElement.style.setProperty("--blue-glow", a.blue + "8C"); // ~55% alpha
  }, [t.accent]);

  return (
    <div className="canvas">
      <div className="glow tr"/>
      <div className="glow bl"/>
      <div className="glow mid"/>
      {t.showStars && <OuterStars/>}

      <div className="card">
        {t.showStars && <CardStars/>}
        <div className="card-inner">
          <Nav/>
          <Hero/>
          <About/>
          <Cast/>
          <Features/>
          <How/>
          <ManualDownload/>
          <Missions/>
          <ShipShowcase/>
          <Atmosphere/>
          <Team/>
          <LabsCTA/>
          <Partners/>
          <Level2Teaser/>
          <ReleaseBand/>
          <MegaMark/>
          <Footer/>
        </div>
      </div>

      <AudioPlayer/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio
            label="Accent"
            value={t.accent}
            options={[
              { value: "blue",    label: "Royal" },
              { value: "violet",  label: "Violet" },
              { value: "red",     label: "Red" },
              { value: "emerald", label: "Green" },
            ]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>
        <TweakSection title="Atmosphere">
          <TweakToggle
            label="Star markers"
            value={t.showStars}
            onChange={(v) => setTweak("showStars", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nProvider><App/></I18nProvider>
);
