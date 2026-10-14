import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import ProgramsNav from "../ProgramsNav";
import styles from './band-preview.module.css';

const LOGO_WHITE = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png";

function HeroVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      const video = videoRef.current;
      if (!video) return;
      if (preference.matches) video.pause();
      else video.play().catch(() => setPlaying(false));
    };
    syncMotion();
    preference.addEventListener('change', syncMotion);
    return () => preference.removeEventListener('change', syncMotion);
  }, []);

  return (
    <>
      <div className={styles.heroMedia} aria-hidden="true">
        <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1789150969/ec4d0779-3583-4781-9112-daa386493e4e.png" alt="" />
        {!failed && <video
          ref={videoRef}
          muted loop playsInline preload="metadata" tabIndex={-1}
          poster="https://res.cloudinary.com/diy08lj9x/image/upload/v1789150969/ec4d0779-3583-4781-9112-daa386493e4e.png"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
        >
          <source src="https://res.cloudinary.com/diy08lj9x/video/upload/v1791905841/PXL_20261001_021023325.NS-02.MAIN_wwcna5.mp4" type="video/mp4" onError={() => { setFailed(true); setPlaying(false); }} />
        </video>}
        <div className={styles.heroOverlay} />
      </div>
      {!failed && <button className={styles.videoControl} type="button" onClick={() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) video.play().catch(() => setPlaying(false));
        else video.pause();
      }}>{playing ? 'Pause background video' : 'Play background video'}</button>}
    </>
  );
}

function BandArtwork({ src, name }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className={styles.artworkFallback}>{name}</div> : <img src={src} alt={name} onError={() => setFailed(true)} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

const C = {
  espresso: "#1a130f",
  crimson:  "#FF0044",
  yellow:   "#FFDA00",
  teal:     "#00A8C8",
  white:    "#FFFFFF",
  cream:    "#F6F3EE",
  offwhite: "#FAF9F7",
  muted:    "#7A6A5A",
  border:   "#E8E2DA",
};

const BtnRed = ({ children, onClick, large }) => (
  <button
    onClick={onClick}
    style={{
      background: C.crimson, color: "#fff", border: "none",
      borderRadius: 999, cursor: "pointer",
      padding: large ? "16px 40px" : "13px 28px",
      fontSize: large ? 15 : 13,
      fontWeight: 700, letterSpacing: "0.1em", textTransform: "none",
      display: "inline-flex", alignItems: "center", gap: 8,
      boxShadow: "0 4px 20px rgba(255,0,68,0.25)",
      transition: "background 0.2s, transform 0.15s",
      fontFamily: "'DM Sans', sans-serif",
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "#CC0036"; e.currentTarget.style.transform = "translateY(-1px)"; }}
    onMouseLeave={e => { e.currentTarget.style.background = C.crimson; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    {children}
  </button>
);

const bands = [
  {
    name:  "Sunkast",
    logo:  "https://res.cloudinary.com/diy08lj9x/image/upload/v1781535114/sunkast_vy8zyv.png",
    quote: "Been together about a year. Getting tighter every month.",
    genre: "Rock / Indie",
  },
  {
    name:  "The M.I.P.H.S",
    logo:  "https://res.cloudinary.com/diy08lj9x/image/upload/v1781535130/Miphs_dfyjjd.png",
    quote: "Joined with two songs. Currently arguing about a third.",
    genre: "Alternative",
  },
  {
    name:  "La Paz",
    logo:  "https://res.cloudinary.com/diy08lj9x/image/upload/v1781535121/Lapaz_ipqtzy.png",
    quote: "First show was three months ago. Already booking the next one.",
    genre: "Latin Rock",
  },
];

const venues = [
  { name: "Denio's Market", location: "Roseville, CA" },
  { name: "High Hand Brewery", location: "Loomis, CA" },
  { name: "Pistol Pete's", location: "Auburn, CA" },
  { name: "Cross Roads Pizza", location: "Rocklin, CA" },
  { name: "Placer County Fair", location: "Roseville, CA" },
];


const faqs = [
  {
    q: "What's included in the program?",
    a: "A dedicated manager to guide your development, rehearsal time, stage-ready equipment, and access to our recording studio. You also get a monthly private session and performance opportunities. We handle show logistics and production so you can focus on the music.",
  },
  {
    q: "What do you expect from us?",
    a: "Show up consistently, communicate openly with each other and your manager, and respect the space and equipment. Be someone people enjoy making music with. We're here to support you along the way.",
  },
  {
    q: "I don't have a band. Can I still join?",
    a: "Absolutely. We'll help connect you with other musicians who share your passion. You don't need a complete lineup to get started.",
  },
  {
    q: "When will we be ready to perform?",
    a: "Every group moves at its own pace. Some are ready within a few months; others need more time. Your manager will give you an honest read on where you stand and help you prepare.",
  },
  {
    q: "What if someone can't make a session?",
    a: "Rehearsal continues with whoever is there. Learning to adapt is part of playing together. With proper advance notice, we can also reschedule make-up sessions.",
  },
  {
    q: "Are performances mandatory?",
    a: "Not at all. When a gig opportunity comes up, we'll bring it to you and let you decide if it's the right fit. Playing live is one of the most rewarding parts of this program, and we'll help you get there when you're ready to perform.",
  },
  {
    q: "Does Headliner manage the band?",
    a: "Your manager coaches, advises, and supports you. We work through creative and logistical decisions together, helping you become independent rather than making every decision for you.",
  },
  {
    q: "Are recording sessions free?",
    a: "Recording is included, with no separate fee. When you're ready to capture what you've created, the studio is there for you.",
  },
  {
    q: "Can we use charter or Self-Determination funding?",
    a: <>We work with charter schools and Self-Determination funding programs, and funding can support instruction here, including paths that grow into bands and live performance. Coverage depends on your funding source, so see our <a href="/about/funding-support" style={{ color: C.crimson, fontWeight: 600, textDecoration: "underline" }}>Funding Support page</a> or ask us and we'll help you sort it out.</>,
  },
];

export default function BandProgramPreview({ onRequestLessons, setPath }) {
  const navigate = (path) => {
    if (setPath) {
      setPath(path);
      return;
    }

    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };

  return (
    <div className={styles.page}>
      <style>{`

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fu { animation: fadeUp 0.65s ease both; }
        .d1 { animation-delay: 0.06s; }
        .d2 { animation-delay: 0.18s; }
        .d3 { animation-delay: 0.30s; }
        .d4 { animation-delay: 0.42s; }

        .bp-nav-link {
          font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: none;
          color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s;
        }
        .bp-nav-link:hover { color: #fff; }

        .bp-img-wrap { overflow: hidden; }
        .bp-img-wrap img { transition: transform 0.6s ease; width: 100%; height: 100%; object-fit: cover; }
        .bp-img-wrap:hover img { transform: scale(1.03); }

        .bp-venue-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 0; border-bottom: 1px solid ${C.border};
          transition: background 0.15s;
        }
        .bp-venue-row:last-child { border-bottom: none; }

        .bp-band-card {
          background: ${C.white}; border: 1px solid ${C.border};
          border-radius: 16px; padding: 32px 28px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .bp-band-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(26,19,15,0.08); }

        @media (max-width: 768px) {
          .bp-split { grid-template-columns: 1fr !important; gap: 40px !important; }
          .bp-3col  { grid-template-columns: 1fr !important; gap: 16px !important; }
          .bp-2col  { grid-template-columns: 1fr !important; }
          .bp-img-wrap { height: 260px !important; }
          .bp-hero-stats { gap: 24px !important; flex-wrap: wrap; }
        }

      `}</style>

      {/* NAV */}
      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Join the Program"
        onCtaClick={() => onRequestLessons("Band Performance")}
      />

      {/* HERO */}
      <header className={styles.hero}>
        <HeroVideo />

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 40px", position: "relative", zIndex: 1, width: "100%" }}>

          <h1 className="fu d1" style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 0.95,
            letterSpacing: -2, color: "#fff", margin: "0 0 20px", maxWidth: 700,
          }}>
            This is where bands<br/>become <span style={{ color: C.crimson }}>Headliners.</span>
          </h1>


          <p className="fu d3" style={{
            fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.85,
            maxWidth: 500, marginBottom: 44, fontWeight: 300,
          }}>
            Whether you're looking for musicians to play with or bringing an existing band, we'll help you develop your sound through coaching, rehearsals, recording, and live performances.
          </p>

          <div className="fu d4" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <BtnRed onClick={() => onRequestLessons("Band Performance")} large>Join the Program <ArrowRight size={16}/></BtnRed>
          </div>


        </div>
      </header>

      {/* THE IDEA */}
      <section className={styles.lightSection} style={{ background: C.white, padding: "80px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div className="bp-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: C.espresso, margin: "0 0 28px", lineHeight: 0.93 }}>
              Learn what it means<br/>to <span style={{ color: C.crimson }}>play together.</span>
            </h2>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.9, marginBottom: 24 }}>
              Playing with other musicians brings a new dimension to learning your instrument. You learn to listen to each other, work through songs together, and develop a sound that everyone contributes to.
            </p>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.9 }}>
              Whether you're joining for the first time or already have a lineup, your manager helps you build on where you are, from choosing a setlist to getting comfortable onstage.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <div className="bp-img-wrap" style={{ borderRadius: 16, height: 440 }}>
              <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1791905739/86d8ff20-bfb7-4089-9734-f5b12097289e.png" alt="Musicians playing together at Headliner" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* THE JOURNEY */}
      <section className={styles.lightSection} style={{ background: C.offwhite, padding: "80px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div className={styles.progressLayout}>
          <div className={styles.progressCopy}>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: C.espresso, margin: "0 0 28px", lineHeight: 0.93 }}>
              Everything your band needs<br/>to <span style={{ color: C.crimson }}>move forward.</span>
            </h2>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.9 }}>
              Our structured curriculum combines focused rehearsals and individual instruction, helping you grow together while leaving room for your own musical ideas.
            </p>
            <ul className={styles.perks}>
              <li>Weekly independent rehearsals included at no extra cost.</li>
              <li>Stage-ready instruments and amplifiers, live sound with onstage monitoring, and DMX lighting.</li>
              <li>A monthly private session with a multi-instrumentalist teacher.</li>
            </ul>
          </div>
          <div className={styles.rehearsalMedia}>
            <figure className={styles.rehearsalPhoto}>
              <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1791905631/f2aa92fc-daca-46be-b2af-2e12189091a5.png" alt="Musicians at Headliner" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      {/* RECORD AND PERFORM */}
      <section className={styles.lightSection} style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className={styles.recordLayout}>
          <div className={styles.recordMedia}>
            <figure>
              <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1789612671/9acd9715-1d3c-4853-9094-807c2fc0c2d0.png" alt="Music-making at Headliner" loading="lazy" />
            </figure>
            <figure>
              <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1787862861/9198476e-d047-4ef5-9584-51ec4ff1b010.png" alt="Musicians performing together at Headliner" loading="lazy" />
            </figure>
          </div>
          <div className={styles.progressCopy}>
            <h2>From rehearsal<br/>to the <span style={{ color: C.crimson }}>stage.</span></h2>
            <p>Recording and performing help you hear your progress and refine your sound while building practical experience in the studio, onstage, and behind the scenes.</p>
            <ul className={styles.perks}>
              <li>Rehearsal recordings with every instrument mic’d in an acoustically treated room.</li>
              <li>Record your original songs.</li>
              <li>Monthly performances across the Sacramento area.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VENUES */}
      <section className={styles.venuesSection} style={{ background: C.espresso, padding: "80px 40px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="bp-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: "#fff", margin: "0 0 28px", lineHeight: 0.93 }}>
              Some of the real stages<br/>we've <span style={{ color: C.crimson }}>performed at.</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 28 }}>
              Through our relationships with venues across Placer County, you'll have opportunities to take what you've been working on out of the rehearsal room and share it with a live audience.
            </p>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>
              Our own stage is also part of that experience, hosting family showcases and smaller performances with the sound and lighting to help you get comfortable with a full live setup.
            </p>
          </div>
          <div style={{ paddingTop: 8 }}>
            {venues.map(({ name, location }) => (
              <div key={name} className="bp-venue-row" style={{ borderBottomColor: "rgba(255,255,255,0.07)" }}>
                <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", margin: 0 }}>{name}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "none", color: "rgba(255,255,255,0.28)", margin: 0 }}>{location}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* BANDS */}
      <section className={styles.lightSection} style={{ background: C.white, padding: "80px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: C.espresso, margin: "0 0 16px", lineHeight: 0.93 }}>
              Meet the <span style={{ color: C.crimson }}>lineup.</span>
            </h2>
          </div>

          <div className="bp-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {bands.map(({ name, logo }) => (
              <div key={name} className="bp-band-card" style={{ padding: 0, overflow: "hidden" }}>
                {/* Photo */}
                <div style={{
                  position: "relative",
                  height: 220,
                  overflow: "hidden",
                  borderRadius: "16px 16px 0 0",
                }}>
                  <BandArtwork src={logo} name={name} />
                </div>
                {/* Text */}
                <div style={{ padding: "16px 24px 20px" }}>
                  <p style={{
                    fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                    fontSize: 18, color: C.espresso, margin: 0, lineHeight: 1.1,
                  }}>
                    {name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* UPCOMING SHOWS */}
      <section className={styles.lightSection} aria-labelledby="upcoming-shows-title" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className={styles.showsLayout}>
          <h2 id="upcoming-shows-title">Upcoming<br/><span style={{ color: C.crimson }}>shows.</span></h2>
          <div className={styles.showNotice}>
            <p>Watch this space for announced dates.</p>
            <a href="mailto:admin@headlinermusicacademy.com">Ask about the next performance <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.lightSection} style={{ background: C.white, padding: "80px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: C.espresso, margin: "0 0 16px", lineHeight: 0.93 }}>
              Frequently asked questions.
            </h2>
          </div>

          <div style={{ maxWidth: 800 }}>
            {faqs.map(({ q, a }, i) => (
              <div key={i} style={{
                paddingBottom: 32, borderBottom: i < faqs.length - 1 ? `1px solid ${C.border}` : "none", marginBottom: 32,
              }}>
                <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 18, color: C.espresso, margin: "0 0 12px", lineHeight: 1.2 }}>
                  {q}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.muted, lineHeight: 1.85, margin: 0 }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.espresso, padding: "80px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(at 0% 0%, rgba(255,0,68,0.08) 0px, transparent 50%)` }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <img src={LOGO_WHITE} alt="Headliner Music Academy" style={{ height: "auto", maxHeight: 52, width: "auto", maxWidth: 240, objectFit: "contain", display: "block", margin: "0 auto 48px" }} />
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: -1.5, color: "#fff", margin: "0 0 24px", lineHeight: 0.93 }}>
            Every musician deserves<br/>a <span style={{ color: C.crimson }}>stage.</span>
          </h2>
<div style={{ marginBottom: 44 }} />
          <BtnRed onClick={() => onRequestLessons("Band Performance")} large>Join the Program <ArrowRight size={16}/></BtnRed>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 28 }}>
            Questions? <a href="mailto:admin@headlinermusicacademy.com" style={{ color: C.crimson, textDecoration: "none", fontWeight: 700 }}>admin@headlinermusicacademy.com</a>
          </p>
        </div>
      </section>

    </div>
  );
}
