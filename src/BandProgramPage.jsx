import { ArrowRight } from "lucide-react";
import ProgramsNav from "./ProgramsNav";

const PORTAL_URL = "https://headlinerma.opus1.io/login";
const LOGO_WHITE = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png";

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
      fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
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

const Eyebrow = ({ children, color = C.teal }) => (
  <p style={{
    fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase",
    color, marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
  }}>
    <span style={{ display: "block", width: 28, height: 3, background: color, borderRadius: 2, flexShrink: 0 }} />
    {children}
  </p>
);

const bands = [
  {
    name:  "Sunkast",
    logo:  "https://res.cloudinary.com/diy08lj9x/image/upload/v1781535114/sunkast_vy8zyv.png",
    quote: "Been together about a year. Getting tighter every month.",
    genre: "Rock / Indie",
  },
  {
    name:  "The Myphs",
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
  { name: "Crossroads Pizza", location: "Rocklin, CA" },
  { name: "Placer County Fair", location: "Roseville, CA" },
];


const faqs = [
  {
    q: "What's included in the program?",
    a: "A dedicated director who guides your band through every stage of development. Access to backline and our on-site recording studio. We handle the logistics and production for your shows so you can focus on performing. We also connect you with real gig opportunities across Placer County. We'll talk through each one together and find what fits. Everything you need to go from rehearsing to actually playing live.",
  },
  {
    q: "What do you expect from a band?",
    a: "Show up consistently and communicate openly with your bandmates and director. Be someone people enjoy making music with. Respect the space, the instruments, and each other. Beyond that, we're here to support the band you're building, every step of the way.",
  },
  {
    q: "I don't have a band. Can I still join?",
    a: "Absolutely. Reach out and let us know. Every musician deserves a stage, and you shouldn't have to wait until you have a full band to get started. We'll connect you with other musicians who share your passion and help put something together. It happens more often than you'd think.",
  },
  {
    q: "When will my band be ready to perform?",
    a: "It depends on the band, and that's a good thing. Every group moves at its own pace. Some are ready for their first gig within a few months. Others take a little longer to find their footing. Your director will give you an honest read on where you stand and help you get there.",
  },
  {
    q: "What happens if my band or a bandmate can't make it to a session?",
    a: "Rehearsal continues with whoever is there. Learning to work around an absent member is actually a valuable part of being in a real band. That said, consistency makes a huge difference. The more you show up, the faster you grow together.",
  },
  {
    q: "Are performances mandatory?",
    a: "Not at all. When a gig opportunity comes up, we'll bring it to you and let you decide if it's the right fit. Playing live is one of the most rewarding parts of this program, and we'll help you get there when you're ready to perform.",
  },
  {
    q: "Does Headliner manage the band?",
    a: "Your director is there to coach, advise, and support, every step of the way. We'll talk through the creative and logistical decisions together. Our job is to help you grow into a band that can stand on its own, not to run it for you.",
  },
  {
    q: "Are recording sessions free?",
    a: "Recording is included in the program. There's no separate fee. When your band is ready to document what you've built, the studio is there for you.",
  },
  {
    q: "Can we use charter or Self-Determination funding?",
    a: <>We work with charter schools and Self-Determination funding programs, and funding can support instruction here — including paths that grow into bands and live performance. Coverage depends on your funding source, so see our <a href="/about/funding-support" style={{ color: C.crimson, fontWeight: 600, textDecoration: "underline" }}>Funding Support page</a> or ask us and we'll help you sort it out.</>,
  },
];

export default function BandProgramPage({ onRequestLessons, setPath }) {
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
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.offwhite, color: C.espresso, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overflow-x: hidden !important; max-width: 100vw !important; margin: 0; padding: 0; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fu { animation: fadeUp 0.65s ease both; }
        .d1 { animation-delay: 0.06s; }
        .d2 { animation-delay: 0.18s; }
        .d3 { animation-delay: 0.30s; }
        .d4 { animation-delay: 0.42s; }

        .bp-nav-link {
          font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
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
          section, header { padding-left: 20px !important; padding-right: 20px !important; }
          nav { padding: 0 16px !important; }
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
      <header style={{ background: C.espresso, paddingTop: 68, position: "relative", overflow: "hidden", minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="https://res.cloudinary.com/diy08lj9x/image/upload/v1781500022/Gemini_Generated_Image_i895u1i895u1i895_elyhqa.png"
            alt="Empty stage ready to perform"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
          />
          <div style={{ position: "absolute", inset: 0, background: `rgba(26,19,15,0.55)` }} />
        </div>

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 40px", position: "relative", zIndex: 1, width: "100%" }}>
          <Eyebrow color={C.teal}>Band Program</Eyebrow>

          <h1 className="fu d1" style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 0.95,
            letterSpacing: -2, color: "#fff", margin: "0 0 20px", maxWidth: 700,
          }}>
            This is where bands<br/>become <span style={{ color: C.crimson }}>Headliners.</span>
          </h1>

          <p className="fu d2" style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: "rgba(255,255,255,0.6)",
            margin: "0 0 32px",
          }}>
            Wherever your band is right now, we're here to help you find the stage.
          </p>

          <p className="fu d3" style={{
            fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.85,
            maxWidth: 500, marginBottom: 44, fontWeight: 300,
          }}>
            Headliner works with you at every point, whether you're just forming, already rehearsing, or ready to perform. Weekly sessions, a dedicated director, and real gigs.
          </p>

          <div className="fu d4" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <BtnRed onClick={() => onRequestLessons("Band Performance")} large>Join the Program <ArrowRight size={16}/></BtnRed>
          </div>


        </div>
      </header>

      {/* THE IDEA */}
      <section style={{ background: C.white, padding: "80px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div className="bp-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>
          <div>
            <Eyebrow color={C.crimson}>The approach</Eyebrow>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: C.espresso, margin: "0 0 28px", lineHeight: 0.93 }}>
              There is nothing<br/>like being in a <span style={{ color: C.crimson }}>band.</span>
            </h2>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.9, marginBottom: 24 }}>
              As you rehearse and start playing live, your director works alongside you on setlist choices, stage presence, and finding your sound. We'll talk through the big decisions together, every step of the way.
            </p>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.9 }}>
              Every band starts somewhere different and moves at its own pace. Some come in with two songs and a name. Some come in with six months of rehearsals and no idea what to do next. The program meets you where you are, and your director stays with you through all of it.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <div className="bp-img-wrap" style={{ borderRadius: 16, height: 440 }}>
              <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1787862861/9198476e-d047-4ef5-9584-51ec4ff1b010.png" alt="Band in rehearsal" />
            </div>
            <div
              onClick={() => {
                const now = Date.now();
                if (!window._hltClicks) window._hltClicks = [];
                window._hltClicks.push(now);
                // Only keep clicks within the last 2 seconds
                window._hltClicks = window._hltClicks.filter(t => now - t < 2000);
                if (window._hltClicks.length >= 3) {
                  window._hltClicks = [];
                  navigate("/internal/band-program");
                }
              }}
              style={{
                position: "absolute", bottom: -20, right: -20,
                background: C.crimson, borderRadius: 12, padding: "20px 24px",
                boxShadow: "0 16px 40px rgba(255,0,68,0.3)",
                cursor: "default", userSelect: "none",
              }}
            >
              <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", margin: "0 0 4px", lineHeight: 1 }}>Live.</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: 0 }}>Performance from day one</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE JOURNEY */}
      <section style={{ background: C.offwhite, padding: "80px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div className="bp-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>
          <div className="bp-img-wrap" style={{ borderRadius: 16, height: 460 }}>
            <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80" alt="Band developing" />
          </div>
          <div>
            <Eyebrow color={C.teal}>How it goes</Eyebrow>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: C.espresso, margin: "0 0 28px", lineHeight: 0.93 }}>
              We're with you,<br/><span style={{ color: C.crimson }}>all the way to the stage.</span>
            </h2>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.9 }}>
              You get access to backline at the academy so gear is not a barrier to entry. Recording sessions are there when you are ready to document what you have built. We run the logistics and production side of your shows so you can actually enjoy performing instead of stressing about the details.
            </p>
          </div>
        </div>
      </section>

      {/* VENUES */}
      <section style={{ background: C.espresso, padding: "80px 40px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="bp-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}>
          <div>
            <Eyebrow color={C.yellow}>Community reach</Eyebrow>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: "#fff", margin: "0 0 28px", lineHeight: 0.93 }}>
              Some of the real stages<br/>we've <span style={{ color: C.crimson }}>performed at.</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 28 }}>
              We have relationships with venue owners across Placer County who know the bands we work with and trust us to bring them in.
            </p>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>
              For family showcases and smaller performances, the academy has its own performance room on site. A real stage, full production, and an audience that's as intimate or crowded as you want. This is your home room.
            </p>
          </div>
          <div style={{ paddingTop: 8 }}>
            {venues.map(({ name, location }) => (
              <div key={name} className="bp-venue-row" style={{ borderBottomColor: "rgba(255,255,255,0.07)" }}>
                <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", margin: 0 }}>{name}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: 0 }}>{location}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* BANDS */}
      <section style={{ background: C.white, padding: "80px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <Eyebrow color={C.teal}>In the program</Eyebrow>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: C.espresso, margin: "0 0 16px", lineHeight: 0.93 }}>
              Our home <span style={{ color: C.crimson }}>bands.</span>
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
                  <img
                    src={logo}
                    alt={name}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center top",
                      display: "block",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
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

      
      {/* FAQ */}
      <section style={{ background: C.white, padding: "80px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <Eyebrow color={C.teal}>FAQ</Eyebrow>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: -1.5, color: C.espresso, margin: "0 0 16px", lineHeight: 0.93 }}>
              Questions we get <span style={{ color: C.crimson }}>asked.</span>
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