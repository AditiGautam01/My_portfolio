// app.jsx — Lunelle Skincare promo: 2 IG square directions on a design canvas
const { useState } = React;

// Access globals from other scripts explicitly
const { 
  useTweaks, TweaksPanel, TweakSection, TweakText, TweakRadio, TweakSlider, TweakToggle,
  DesignCanvas, DCSection, DCArtboard 
} = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "Quiet skin,\nloud glow.",
  "eyebrow": "NEW — Ceramide Edit",
  "cta": "Shop the drop",
  "palette": "brand",
  "showGrain": true,
  "stripeDensity": 7,
  "wordmarkSize": 1.0
}/*EDITMODE-END*/;

const PALETTES = {
  brand:   { lilac: "#A47BD0", sage: "#C9D49A", orange: "#E2935A", cream: "#F4EFE6", ink: "#1B1530" },
  dusk:    { lilac: "#8C6BC2", sage: "#B6C788", orange: "#D88452", cream: "#EFE7DA", ink: "#171028" },
  airy:    { lilac: "#BFA0E0", sage: "#DCE6B5", orange: "#EBA776", cream: "#FAF6EE", ink: "#2A2240" }
};

// ---------- Direction A: Editorial whitespace ----------
function DirectionA({ t, P }) {
  const lines = t.headline.split("\n");
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      background: P.cream, color: P.ink, overflow: "hidden",
      fontFamily: "'Manrope', system-ui, sans-serif"
    }}>
      {/* top eyebrow row */}
      <div style={{
        position: "absolute", top: 56, left: 64, right: 64,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 16, letterSpacing: "0.22em", textTransform: "uppercase",
        fontWeight: 500
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: P.orange }}></span>
          {t.eyebrow}
        </span>
        <span style={{ opacity: 0.55 }}>lunelle / 01</span>
      </div>

      {/* hairline */}
      <div style={{
        position: "absolute", top: 100, left: 64, right: 64, height: 1,
        background: P.ink, opacity: 0.18
      }}></div>

      {/* large editorial wordmark on left */}
      <div style={{
        position: "absolute", left: 64, top: 168, right: 64,
        fontFamily: "'Playfair Display', 'Times New Roman', serif",
        fontWeight: 500, fontSize: 168 * t.wordmarkSize, lineHeight: 0.92,
        letterSpacing: "-0.04em", color: P.ink
      }}>
        {lines.map((ln, i) => (
          <div key={i} style={{
            fontStyle: i === 1 ? "italic" : "normal",
            color: i === 1 ? P.lilac : P.ink
          }}>{ln}</div>
        ))}
      </div>

      {/* product tube image, framed */}
      <div style={{
        position: "absolute", right: 64, bottom: 64, width: 340, height: 440,
        borderRadius: 6, overflow: "hidden",
        boxShadow: "0 30px 60px -30px rgba(40,20,60,0.35)"
      }}>
        <img src="assets/tube.jpeg" alt="Lunelle Ceramide Moisturiser"
             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* sage swatch bar */}
      <div style={{
        position: "absolute", left: 64, bottom: 64, width: 120, height: 120,
        background: P.sage, borderRadius: 6
      }}></div>

      {/* meta column */}
      <div style={{
        position: "absolute", left: 208, bottom: 64, width: 320,
        display: "flex", flexDirection: "column", gap: 12,
        fontSize: 18, lineHeight: 1.4
      }}>
        <div style={{
          fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase",
          color: P.orange, fontWeight: 600
        }}>The product</div>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontSize: 26, lineHeight: 1.15,
          letterSpacing: "-0.01em"
        }}>Ceramide Moisturiser<br/><em style={{ color: P.lilac, fontWeight: 400 }}>for sensitive skin.</em></div>
        <div style={{ fontSize: 14, opacity: 0.65, marginTop: 4 }}>
          Oil-balancing. Acne-prone. <br/>One bottle, less drama.
        </div>
      </div>

      {/* cta pill */}
      <div style={{
        position: "absolute", right: 64, top: 168,
        display: "inline-flex", alignItems: "center", gap: 12,
        background: P.ink, color: P.cream,
        padding: "14px 22px", borderRadius: 999,
        fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase",
        fontWeight: 600
      }}>
        {t.cta}
        <span style={{
          display: "inline-block", width: 22, height: 22, borderRadius: 99,
          background: P.orange
        }}></span>
      </div>

      {t.showGrain && <Grain />}
    </div>
  );
}

// ---------- Direction B: Stripe study (pulls from box artwork) ----------
function DirectionB({ t, P }) {
  const stripes = [];
  for (let i = 0; i < t.stripeDensity; i++) {
    const left = `${(100 / (t.stripeDensity + 1)) * (i + 1)}%`;
    stripes.push(
      <div key={i} style={{
        position: "absolute", top: 0, bottom: "22%", left, width: 2,
        background: P.orange, opacity: 0.85
      }}></div>
    );
  }

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      background: P.lilac, color: P.cream, overflow: "hidden",
      fontFamily: "'Manrope', system-ui, sans-serif"
    }}>
      {/* vertical orange pinstripes */}
      {stripes}

      {/* vertical lunelle wordmark, left edge */}
      <div style={{
        position: "absolute", left: 56, top: 96, bottom: 260,
        display: "flex", alignItems: "center"
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 500,
          fontSize: 110 * t.wordmarkSize, lineHeight: 0.9, color: P.cream,
          letterSpacing: "-0.04em",
          writingMode: "vertical-rl", transform: "rotate(180deg)"
        }}>lunelle</div>
        <div style={{
          fontFamily: "'Caveat', cursive", fontSize: 36, color: P.ink,
          marginLeft: -6, marginTop: 70, transform: "rotate(-90deg)",
          transformOrigin: "left top"
        }}>skincare</div>
      </div>

      {/* product duo: outer carton + tube, side by side, center stage */}
      <div style={{
        position: "absolute", left: "52%", top: "44%",
        transform: "translate(-50%, -50%)",
        display: "flex", alignItems: "flex-end", gap: 22
      }}>
        <div style={{
          width: 300, height: 460, borderRadius: 6, overflow: "hidden",
          boxShadow: "0 40px 80px -28px rgba(15,8,40,0.55), 0 6px 16px -8px rgba(15,8,40,0.4)"
        }}>
          <img src="assets/box.jpeg" alt="Lunelle Ceramide Lotion carton"
               style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "62% 50%", transform: "scale(1.05)" }} />
        </div>
        <div style={{
          width: 240, height: 420, borderRadius: 6, overflow: "hidden",
          boxShadow: "0 30px 60px -22px rgba(15,8,40,0.5), 0 4px 12px -6px rgba(15,8,40,0.4)"
        }}>
          <img src="assets/tube.jpeg" alt="Lunelle Ceramide Moisturiser tube"
               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      {/* eyebrow tag, top right */}
      <div style={{
        position: "absolute", top: 56, right: 56,
        display: "flex", alignItems: "center", gap: 10,
        background: P.cream, color: P.ink,
        padding: "10px 16px", borderRadius: 999,
        fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase",
        fontWeight: 700
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 99, background: P.orange }}></span>
        {t.eyebrow}
      </div>

      {/* meta footer in cream band */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "22%",
        background: P.cream, color: P.ink,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", gap: 32
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase",
            color: P.orange, fontWeight: 700
          }}>The Ceramide Edit · 02 pieces</div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 56 * t.wordmarkSize, lineHeight: 0.98, color: P.ink,
            letterSpacing: "-0.02em"
          }}>
            {t.headline.split("\n").map((ln, i) => (
              <span key={i} style={{
                fontStyle: i === 1 ? "italic" : "normal",
                color: i === 1 ? P.lilac : P.ink,
                marginRight: 12
              }}>{ln}</span>
            ))}
          </div>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12, flexShrink: 0,
          background: P.ink, color: P.cream,
          padding: "16px 24px", borderRadius: 999,
          fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase",
          fontWeight: 700
        }}>
          {t.cta}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M1 6h15m0 0L11 1m5 5l-5 5" stroke={P.orange} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {t.showGrain && <Grain />}
    </div>
  );
}

// subtle film grain overlay
function Grain() {
  return (
    <svg style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", opacity: 0.08, mixBlendMode: "multiply"
    }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)"/>
    </svg>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const P = PALETTES[t.palette] || PALETTES.brand;

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <DesignCanvas>
        <DCSection
          id="lunelle-promo"
          title="Lunelle — Ceramide launch"
          subtitle="Instagram 1:1 · Editorial · Gen-Z · 2 directions"
        >
          <DCArtboard id="a" label="A · Editorial whitespace" width={1080} height={1080}>
            <DirectionA t={t} P={P} />
          </DCArtboard>
          <DCArtboard id="b" label="B · Stripe study" width={1080} height={1080}>
            <DirectionB t={t} P={P} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Copy" />
        <TweakText   label="Headline" value={t.headline} multiline rows={2}
                     onChange={(v) => setTweak('headline', v)} />
        <TweakText   label="Eyebrow"  value={t.eyebrow}
                     onChange={(v) => setTweak('eyebrow', v)} />
        <TweakText   label="CTA"      value={t.cta}
                     onChange={(v) => setTweak('cta', v)} />

        <TweakSection label="Look" />
        <TweakRadio  label="Palette"  value={t.palette}
                     options={['brand', 'dusk', 'airy']}
                     onChange={(v) => setTweak('palette', v)} />
        <TweakSlider label="Headline scale" value={t.wordmarkSize}
                     min={0.75} max={1.25} step={0.05}
                     onChange={(v) => setTweak('wordmarkSize', v)} />
        <TweakSlider label="Stripes (B)" value={t.stripeDensity}
                     min={3} max={14} step={1}
                     onChange={(v) => setTweak('stripeDensity', v)} />
        <TweakToggle label="Film grain" value={t.showGrain}
                     onChange={(v) => setTweak('showGrain', v)} />
      </TweaksPanel>
    </div>
  );
}

// expose for print/export usage
Object.assign(window, { DirectionA, DirectionB, PALETTES, App });
if (!window.__SKIP_AUTO_MOUNT) {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
