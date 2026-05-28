// portfolio.jsx — Aditi, editorial graphic design portfolio
const { useState, useEffect, useRef } = React;

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
    bg: "#EBD0CD"
  },
  {
    n: "03",
    name: "Folio Quarterly",
    italic: "Folio",
    year: "2024",
    role: "Editorial · Print",
    blurb: "Independent design quarterly, four issues a year.",
    bg: "#E5BFC4"
  },
  {
    n: "04",
    name: "Lumen Type",
    italic: "Lumen",
    year: "2025",
    role: "Type Design",
    blurb: "A modular variable typeface for screens.",
    bg: "#D8AAB1"
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
      <div className="nav-mark">Aditi M. — Designer</div>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#case">Case</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-end">
        <span>© 2026 / Lagos ⟶ Berlin</span>
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
        Aditi<em>—</em>
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

function Work() {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <section id="work" className="section container">
      <div className="section-head" data-reveal>
        <h2 className="section-title">Selected <em>work.</em></h2>
        <div className="section-meta">04 · Projects</div>
      </div>

      <div className="work-list">
        {PROJECTS.map((p, i) => {
          const isExpanded = expandedRow === p.n;
          const Tag = p.isCatalog ? "div" : "a";
          
          return (
            <div key={p.n} data-reveal data-reveal-delay={i}>
              <Tag
                href={!p.isCatalog ? "#case" : undefined}
                className={`work-row ${p.isCatalog ? "is-catalog" : ""} ${isExpanded ? "is-active" : ""}`}
                onClick={p.isCatalog ? () => setExpandedRow(isExpanded ? null : p.n) : undefined}
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

function CaseStudy() {
  return (
    <section id="case" className="section container case">
      <div className="case-head" data-reveal>
        <div>
          <div className="case-eyebrow"><span className="mono-eyebrow"><span className="dot"></span>Case · 01</span></div>
          <h2 className="case-title">Sirena, <em>a coastal table.</em></h2>
        </div>
        <p className="case-blurb">
          A neighbourhood seafood restaurant in Alfama. The identity reads as half-menu, half-letter from the sea — a typographic system that flexes between handwritten warmth and printed authority.
        </p>
      </div>

      <div className="case-hero" data-reveal>
        <div className="placeholder">
          <div className="ph-top">
            <span>Hero image</span>
            <span>16:9 · 2400 × 1350</span>
          </div>
          <div className="ph-bottom">Sirena — identity reveal</div>
        </div>
      </div>

      <div className="case-grid" data-reveal>
        <dl>
          <div><dt>Client</dt><dd>Sirena Lisboa</dd></div>
          <div><dt>Year</dt><dd>2024</dd></div>
          <div><dt>Role</dt><dd>Identity, Packaging, Art Direction</dd></div>
          <div><dt>Collaborators</dt><dd>S. Patel (photo), L. Ortega (copy)</dd></div>
          <div><dt>Recognition</dt><dd>Brand New, June 2024</dd></div>
        </dl>
        <div className="body">
          <p>Sirena opened in a former chandlery near the river. The owners wanted something that felt like the building itself: a little weathered, a little ceremonial, generous without being precious.</p>
          <p>We drew a custom display cut from old market signage — wide, slightly humanist — and paired it with a workhorse mono for menus, receipts, and the inevitable handwritten specials board. The palette pulls from oxidised brass and bleached linen.</p>
          <p>A single rule shaped every decision: the system should be photocopy-proof. Faxed, smudged, stamped on butcher paper — it still has to sing.</p>
        </div>
      </div>

      <div className="case-gallery" data-reveal>
        <div>
          <div className="placeholder">
            <div className="ph-top"><span>Detail</span><span>3:2</span></div>
            <div className="ph-bottom">Menu · interior spreads</div>
          </div>
        </div>
        <div>
          <div className="placeholder">
            <div className="ph-top"><span>Detail</span><span>3:2</span></div>
            <div className="ph-bottom">Wine label series</div>
          </div>
        </div>
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
          <div className="placeholder">
            <div className="ph-top"><span>Portrait</span><span>4:5</span></div>
            <div className="ph-bottom">Studio · 2026</div>
          </div>
        </div>

        <div className="about-body" data-reveal data-reveal-delay="1">
          <p>I'm <em>Aditi</em> — a graphic designer based between Lagos and Berlin, working with restaurants, magazines, and small cultural institutions.</p>
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
      <div>© 2026 Aditi M.</div>
      <div className="center">Berlin · {time} · GMT+1</div>
      <div>Built quietly</div>
    </footer>
  );
}

// ---------- App ----------
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

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

  return (
    <>
      <Curtain />
      <CustomCursor enabled={t.showCursor} />
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <CaseStudy />
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
