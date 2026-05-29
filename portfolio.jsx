// portfolio.jsx — Aditi, editorial graphic design portfolio
const { useState, useEffect, useRef } = React;

// Access globals from tweaks-panel.jsx explicitly
const { 
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton 
} = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#D04E7B",
  "displayFont": "Instrument Serif",
  "theme": "light",
  "showCursor": true
}/*EDITMODE-END*/;

const ACCENTS = ['#D04E7B', '#B23A6D', '#E76A88', '#7A5AE0', '#1F3A5F', '#4F6D3A'];
const DISPLAYS = ['Instrument Serif', 'Playfair Display', 'DM Serif Display'];

const PROJECTS = [
  {
    n: "01",
    name: "Lunelle Skincare",
    italic: "Lunelle",
    year: "2026",
    role: "Identity · Packaging · Catalog",
    bg: "#A47BD0",
    isCatalog: true,
    items: [
      { name: "Niacinamide Lotion", role: "Barrier repair", img: "assets/niacinamide-lotion.png" },
      { name: "Ceramide Edit Box", role: "Outer carton", img: "assets/lunelle-box-v6.png" },
      { name: "Ceramide Moisturiser", role: "Sensitive skin", img: "assets/lunelle.png" }
    ]
  },
  {
    n: "02",
    name: "Sirena",
    italic: "Sirena",
    year: "2024",
    role: "Identity · Packaging",
    blurb: "A coastal seafood restaurant in Lisbon.",
    bg: "#EBD0CD",
    img: "assets/box.jpeg",
    caseData: {
      title: "Sirena, ",
      italicTitle: "a coastal table.",
      blurb: "A neighbourhood seafood restaurant in Alfama. The identity reads as half-menu, half-letter from the sea — a typographic system that flexes between handwritten warmth and printed authority.",
      client: "Sirena Lisboa",
      year: "2024",
      role: "Identity, Packaging, Art Direction",
      collaborators: "S. Patel (photo), L. Ortega (copy)",
      recognition: "Brand New, June 2024",
      body: [
        "Sirena opened in a former chandlery near the river. The owners wanted something that felt like the building itself: a little weathered, a little ceremonial, generous without being precious.",
        "We drew a custom display cut from old market signage — wide, slightly humanist — and paired it with a workhorse mono for menus, receipts, and the inevitable handwritten specials board. The palette pulls from oxidised brass and bleached linen.",
        "A single rule shaped every decision: the system should be photocopy-proof. Faxed, smudged, stamped on butcher paper — it still has to sing."
      ],
      gallery: [
        "assets/tube.jpeg",
        "assets/lunelle-rectangle.png"
      ]
    }
  },
  {
    n: "03",
    name: "Folio Quarterly",
    italic: "Folio",
    year: "2024",
    role: "Editorial · Print",
    blurb: "Independent design quarterly, four issues a year.",
    bg: "#E5BFC4",
    img: "assets/tube.jpeg"
  },
  {
    n: "04",
    name: "Lumen Type",
    italic: "Lumen",
    year: "2025",
    role: "Type Design",
    blurb: "A modular variable typeface for screens.",
    bg: "#D8AAB1",
    img: "assets/lunelle-box.png"
  },
  {
    n: "05",
    name: "Strategy Deck",
    italic: "Deck",
    year: "2026",
    role: "Presentation Design · Systems",
    blurb: "Redesigned a 32-slide internal strategy deck to improve stakeholder readability.",
    bg: "#E8E6E1",
    img: "assets/deck-placeholder.png",
    caseData: {
      title: "Strategy Deck, ",
      italicTitle: "redesigned.",
      blurb: "Redesigned a 32-slide internal strategy deck to improve stakeholder readability — reduced average slide text by 60%, introduced a custom icon set, and unified the visual system across sections.",
      client: "Internal Strategy Team",
      year: "2026",
      role: "Solo Designer",
      collaborators: "Strategy Consultants",
      recognition: "Internal Excellence Award",
      body: [
        "The problem: A typical data-heavy corporate deck with dense text, default charts, and no visual hierarchy.",
        "The solution focused on improving stakeholder readability by establishing a clear hierarchy, utilizing custom icons, and simplifying complex charts. The typography-forward approach ensured the content remained the hero without feeling overly corporate.",
        "A unified visual system was applied across all 32 slides, ensuring consistency in spacing, color usage, and data presentation. The result was a significantly more engaging and legible document for executive review."
      ],
      gallery: [
        "assets/lunelle-box-v6.png",
        "assets/lunelle-box-new.png"
      ]
    }
  },
  {
    n: "06",
    name: "Life Sciences Visual",
    italic: "Visual",
    year: "2026",
    role: "Information Design · Data Viz",
    blurb: "Visualised a 6-stage clinical trial process for a non-technical audience.",
    bg: "#D9DFE3",
    img: "assets/infographic-placeholder.png",
    caseData: {
      title: "Clinical Trial, ",
      italicTitle: "visualised.",
      blurb: "Visualised a 6-stage clinical trial process for a non-technical audience — distilling 12 pages of documentation into a single navigable visual.",
      client: "Pharmaceutical Client",
      year: "2026",
      role: "Solo Designer",
      collaborators: "Medical Writers",
      recognition: "Client Commendation",
      body: [
        "The problem: Complex clinical trial documentation that was difficult for non-technical stakeholders to digest.",
        "I distilled 12 pages of dense medical documentation into a single, cohesive single-page infographic. The visual story navigates the viewer through the 6-stage process using a clean, editorial aesthetic, avoiding the visual clutter typical of standard corporate infographics.",
        "By focusing on clarity and flow, the infographic transformed a technical bottleneck into a communication asset that could be used across multiple departments and stakeholder meetings."
      ],
      gallery: [
        "assets/lunelle-box.png",
        "assets/niacinamide-lotion.png"
      ]
    }
  },
  {
    n: "07",
    name: "Industry Summit",
    italic: "Summit",
    year: "2026",
    role: "Identity · Collateral · Print",
    blurb: "Designed end-to-end event collateral for a 200-person industry summit.",
    bg: "#E3D5CA",
    img: "assets/event-placeholder.png",
    caseData: {
      title: "Industry Summit, ",
      italicTitle: "identity.",
      blurb: "Designed end-to-end event collateral for a 200-person industry summit — identity, print materials, and digital assets.",
      client: "Global Tech Summit",
      year: "2026",
      role: "Solo Designer",
      collaborators: "Event Management Team",
      recognition: "Best Event Branding 2026",
      body: [
        "The problem: Creating a cohesive identity and collateral set for a major 200-person industry summit that didn't feel like a standard corporate event.",
        "I designed a complete collateral set including a save-the-date, banner, name badge, and a one-pager. The identity maintained the studio's typography-forward, quiet aesthetic while fulfilling all business communication requirements.",
        "The project demonstrated breadth across physical and digital touchpoints, ensuring a unified attendee experience from the initial invitation to the on-site environment."
      ],
      gallery: [
        "assets/lunelle-box-v6.png",
        "assets/box.jpeg"
      ]
    }
  }
];

// ---------- Custom Cursor ----------
function CustomCursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if (!enabled) {
      document.body.style.cursor = "auto";
      return;
    }
    document.body.style.cursor = "none";
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;
    function move(e) { mx = e.clientX; my = e.clientY; }
    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    function over(e) {
      if (e.target.closest && e.target.closest("a, button, .work-row, .email-link, .theme-btn")) {
        document.body.classList.add("is-hover");
      }
    }
    function out(e) {
      if (e.target.closest && e.target.closest("a, button, .work-row, .email-link, .theme-btn")) {
        document.body.classList.remove("is-hover");
      }
    }
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.body.classList.remove("is-hover");
      document.body.style.cursor = "auto";
    };
  }, [enabled]);
  if (!enabled) return null;
  return (<>
    <div className="cursor-ring" ref={ringRef}></div>
    <div className="cursor-dot" ref={dotRef}></div>
  </>);
}

// ---------- Curtain transition ----------
function Curtain() {
  const [up, setUp] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setUp(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`curtain ${up ? "is-up" : ""}`}>
      <div className="curtain-mark">A<em>·</em>D</div>
    </div>
  );
}

// ---------- Reveal observer ----------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ---------- Section components ----------
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-mark">Aditi Gautam — Designer</div>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#case">Case</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-end">
        <span>© 2026 / Delhi ⟶ India</span>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero container">
      <div className="hero-top">
        <div className="col" data-reveal>
          <span className="mono-eyebrow"><span className="dot"></span>Available · Q2 2026</span>
        </div>
        <div className="col" data-reveal data-reveal-delay="1">
          <span className="label">Index</span>
          A graphic designer working between print and screen — building identities, editorial systems, and quiet typography for brave clients.
        </div>
      </div>

      <h1 className="hero-title" data-reveal data-reveal-delay="2">
        Aditi Gautam<em>—</em>
      </h1>

      <div className="hero-bottom">
        <div data-reveal data-reveal-delay="3" style={{ maxWidth: 360 }}>
          <div className="mono-eyebrow" style={{ marginBottom: 12 }}>Selected · 2022 — 2026</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
            Visual designer, art director, and occasional type drawer.
          </div>
        </div>
        <a href="#work" className="scroll-hint">
          Scroll
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <path d="M7 1v20M1 15l6 6 6-6" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </a>
      </div>
    </header>
  );
}

function Marquee() {
  const phrases = ["Identity", "Editorial", "Packaging", "Type design", "Art direction", "Print", "Web", "Brand systems"];
  const row = (
    <span>
      {phrases.map((p, i) => (
        <React.Fragment key={i}>
          {i % 2 ? <em>{p}</em> : <span>{p}</span>}
          <span className="star">✦</span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row}{row}
      </div>
    </div>
  );
}

function Work({ onSelectProject, selectedId }) {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <section id="work" className="section container">
      <div className="section-head" data-reveal>
        <h2 className="section-title">Selected <em>work.</em></h2>
        <div className="section-meta">07 · Projects</div>
      </div>

      <div className="work-list">
        {PROJECTS.map((p, i) => {
          const isExpanded = expandedRow === p.n;
          const isSelected = selectedId === p.n;
          const Tag = p.isCatalog ? "div" : "a";
          
          return (
            <div key={p.n} data-reveal data-reveal-delay={i}>
              <Tag
                href={!p.isCatalog ? "#case" : undefined}
                className={`work-row ${p.isCatalog ? "is-catalog" : ""} ${isExpanded || isSelected ? "is-active" : ""}`}
                onClick={p.isCatalog 
                  ? () => setExpandedRow(isExpanded ? null : p.n) 
                  : () => onSelectProject(p.n)
                }
              >
                <div className="num">{p.n}</div>
                <div className="name">{p.name}</div>
                <div className="meta">
                  <span>{p.role}</span>
                  <span>{p.year}</span>
                </div>
              </Tag>

              {p.isCatalog && isExpanded && (
                <div className="catalog-grid">
                  {p.items.map((item, idx) => (
                    <div key={idx} className="catalog-item">
                      <div className="catalog-img">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="catalog-meta">
                        <div className="catalog-name">{item.name}</div>
                        <div className="catalog-role">{item.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CaseStudy({ project }) {
  if (!project || !project.caseData) return null;
  const d = project.caseData;

  return (
    <section id="case" className="section container case">
      <div className="case-head" data-reveal>
        <div>
          <div className="case-eyebrow"><span className="mono-eyebrow"><span className="dot"></span>Case · {project.n}</span></div>
          <h2 className="case-title">{d.title}<em>{d.italicTitle}</em></h2>
        </div>
        <p className="case-blurb">
          {d.blurb}
        </p>
      </div>

      <div className="case-hero" data-reveal>
        <div className="case-img-main" style={{ background: project.bg }}>
          {project.img && !project.img.includes("placeholder") ? (
            <img src={project.img} alt={project.name} />
          ) : (
            <div className="placeholder">
              <div className="ph-top"><span>Project {project.n}</span><span>{project.year}</span></div>
              <div className="ph-bottom">{project.name} — Image Pending</div>
            </div>
          )}
        </div>
      </div>

      <div className="case-grid" data-reveal>
        <dl>
          <div><dt>Client</dt><dd>{d.client}</dd></div>
          <div><dt>Year</dt><dd>{d.year || project.year}</dd></div>
          <div><dt>Role</dt><dd>{d.role}</dd></div>
          <div><dt>Collaborators</dt><dd>{d.collaborators}</dd></div>
          <div><dt>Recognition</dt><dd>{d.recognition}</dd></div>
        </dl>
        <div className="body">
          {d.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>

      <div className="case-gallery" data-reveal>
        {d.gallery.map((img, i) => (
          <div key={i}>
            <div className="case-img-detail" style={{ background: project.bg, opacity: 0.8 }}>
              {img && !img.includes("placeholder") ? (
                <img src={img} alt={`${project.name} detail ${i+1}`} />
              ) : (
                <div className="placeholder">
                  <div className="ph-top"><span>Detail {i+1}</span></div>
                  <div className="ph-bottom">Coming soon</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section container">
      <div className="section-head" data-reveal>
        <h2 className="section-title">About <em>.</em></h2>
        <div className="section-meta">Bio · 2026</div>
      </div>

      <div className="about-grid">
        <div className="about-portrait" data-reveal>
          <div className="about-img">
            <img src="assets/lunelle.png" alt="Aditi Gautam Studio" />
          </div>
        </div>

        <div className="about-body" data-reveal data-reveal-delay="1">
          <p>I'm <em>Aditi Gautam</em> — a graphic designer based in Delhi, India, working with restaurants, magazines, and small cultural institutions.</p>
          <p>My practice sits at the seam between editorial design and identity: rigorous grids, drawn type, and a slight allergy to anything that looks like a template.</p>
          <p>I take on three to four projects a year, prefer long collaborations, and answer email between coffees.</p>

          <div className="about-lists">
            <div>
              <h4>Services</h4>
              <ul>
                <li><span>Identity systems</span><span>01</span></li>
                <li><span>Editorial design</span><span>02</span></li>
                <li><span>Art direction</span><span>03</span></li>
                <li><span>Type design</span><span>04</span></li>
                <li><span>Print supervision</span><span>05</span></li>
              </ul>
            </div>
            <div>
              <h4>Selected clients</h4>
              <ul>
                <li><span>Sirena Lisboa</span><span>'24</span></li>
                <li><span>Folio Quarterly</span><span>'24</span></li>
                <li><span>Tate Modern</span><span>'23</span></li>
                <li><span>MUBI</span><span>'23</span></li>
                <li><span>Stripe Press</span><span>'22</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section container contact">
      <div className="contact-eyebrow"><span className="mono-eyebrow"><span className="dot"></span>Contact · Open</span></div>
      <h2 className="contact-line">Let's <em>make</em></h2>
      <h2 className="contact-line">something <em>quiet.</em></h2>
      <a className="email-link" href="mailto:hello@aditi.studio">hello@aditi.studio</a>

      <div className="contact-socials">
        <a href="#"><span>Instagram</span> · @aditi.designs</a>
        <a href="#"><span>Are.na</span> · /aditi-m</a>
        <a href="#"><span>Read.cv</span> · /aditi</a>
        <a href="#"><span>LinkedIn</span> · /in/aditi</a>
      </div>
    </section>
  );
}

function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="footer">
      <div>© 2026 Aditi Gautam</div>
      <div className="center">Delhi · {time} · GMT+5:30</div>
      <div>Built quietly</div>
    </footer>
  );
}

// ---------- App ----------
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [selectedProjectId, setSelectedProjectId] = useState("02"); // Default to Sirena

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--font-display", `'${t.displayFont}', 'Times New Roman', serif`);
    document.documentElement.setAttribute("data-theme", t.theme);
  }, [t.accent, t.displayFont, t.theme]);

  // smooth-scroll for in-page anchors
  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useReveal();

  const selectedProject = PROJECTS.find(p => p.n === selectedProjectId);

  return (
    <>
      <Curtain />
      <CustomCursor enabled={t.showCursor} />
      <Nav />
      <Hero />
      <Marquee />
      <Work onSelectProject={setSelectedProjectId} selectedId={selectedProjectId} />
      <CaseStudy project={selectedProject} />
      <About />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio  label="Mode"      value={t.theme}
                     options={['light', 'dark']}
                     onChange={(v) => setTweak('theme', v)} />
        <TweakColor  label="Accent"    value={t.accent}
                     options={ACCENTS}
                     onChange={(v) => setTweak('accent', v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Display font" value={t.displayFont}
                     options={DISPLAYS}
                     onChange={(v) => setTweak('displayFont', v)} />

        <TweakSection label="Interaction" />
        <TweakToggle label="Custom cursor" value={t.showCursor}
                     onChange={(v) => setTweak('showCursor', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
