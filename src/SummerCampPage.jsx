import React from "react";
import { ArrowRight } from "lucide-react";

const CAMP_URL   = "https://headlinerma.opus1.io/w/summercamp2026";
const PORTAL_URL = "https://headlinerma.opus1.io/login";
const LOGO_URL   = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png";

const C = {
  espresso: "#1a130f",
  crimson:  "#FF0044",
  cream:    "#F6F3EE",
  white:    "#FFFFFF",
  teal:     "#00A8C8",
  yellow:   "#FFDA00",
  muted:    "#7A6A5A",
  border:   "#E8E2DA",
};

const faqs = [
  {
    q: "My child has never touched an instrument. Is that okay?",
    a: "Absolutely. This camp is built for kids who have never picked up an instrument. Our instructors meet every child where they are and go from there. First-timers are the norm, not the exception."
  },
  {
    q: "How are instruments assigned?",
    a: "When kids arrive, we take a few minutes to talk about what interests them and let them explore the different instruments before we make assignments. We then put together a balanced band, making sure every role is covered. Kids often surprise themselves with what they end up loving."
  },
  {
    q: "Is it co-ed?",
    a: "Yes. Bands are mixed. Boys and girls rehearse and perform together, just like real bands do."
  },
  {
    q: "What happens on the last day?",
    a: "On Friday the band performs the song they have spent the week rehearsing, and we record it. Every family gets that recording to keep. The performance is the milestone, but what builds up to it is the real thing: kids gaining confidence, learning that they can actually do this, making friends along the way, and having a genuinely good week."
  },
  {
    q: "Is lunch provided?",
    a: "Lunch is not included. Camp runs from 9:00 AM to 12:30 PM, so kids are home well before lunch. We recommend packing a light snack for the mid-morning break."
  },
  {
    q: "How small are the groups?",
    a: "Each band has a maximum of 7 kids. Small on purpose. Every child gets real attention from the instructors, and every child has a real role in the band. When a group is full, it closes."
  },
];

export default function SummerCampPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.white, color: C.espresso, minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw", paddingTop: 68 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,700;0,800;0,900;1,700;1,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overflow-x: hidden !important; max-width: 100vw !important; margin: 0; padding: 0; }
        ::selection { background: rgba(255,0,68,0.15); color: #1a130f; }
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        
        .sc-fu  { animation: fadeUp 0.65s ease both; }
        .sc-d1  { animation-delay: 0.06s; }
        .sc-d2  { animation-delay: 0.16s; }
        .sc-d3  { animation-delay: 0.26s; }
        .sc-d4  { animation-delay: 0.36s; }
        
        .sc-marquee { animation: marquee 22s linear infinite; display: flex; width: max-content; }
        .sc-dot { animation: pulse 2s ease-in-out infinite; }
        
        .btn-red {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: #FF0044; color: #fff;
          font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 14px 32px; border-radius: 999px; border: none; cursor: pointer;
          text-decoration: none; transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-red:hover { background: #CC0036; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,0,68,0.4); }
        .btn-teal:hover { background: #0096B4 !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,168,200,0.4) !important; }

        .sc-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 999px;
          font-size: 14px; font-weight: 600; color: #1a130f; background: #fff;
          border: 1px solid #E8E2DA;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .sc-pill:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(26,19,15,0.06); border-color: #00A8C8; }
        
        .sc-nav-link {
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: #7A6A5A; text-decoration: none; position: relative; padding-bottom: 2px; transition: color 0.2s;
        }
        .sc-nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: #FF0044;
          transform: scaleX(0); transform-origin: left; transition: transform 0.2s;
        }
        .sc-nav-link:hover { color: #1a130f; }
        .sc-nav-link:hover::after { transform: scaleX(1); }

        .sc-faq-item { border-bottom: 1px solid #E8E2DA; padding: 28px 0; }
        .sc-faq-item:first-child { border-top: 1px solid #E8E2DA; }

        .hero-img-wrapper {
          position: absolute; right: 0; top: 0;
          width: 55%; height: 100%; z-index: 0;
          pointer-events: none; overflow: hidden;
        }
        .hero-img-wrapper::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, #1a130f 0%, rgba(26,19,15,0.7) 35%, transparent 65%),
                      linear-gradient(to top, #1a130f 0%, transparent 35%);
        }
        .hero-img {
          width: 100%; height: 100%; object-fit: cover; object-position: center 20%;
          opacity: 0.55;
        }

        .story-img-wrapper {
          position: absolute; left: 0; top: 0;
          width: 100%; height: 100%; z-index: 0;
          pointer-events: none; overflow: hidden;
        }
        .story-img-wrapper::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, transparent 0%, #1a130f 60%),
                      linear-gradient(to bottom, #1a130f 0%, transparent 20%);
        }
        .story-img {
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          opacity: 0.25;
        }

        @media (max-width: 900px) {
          .hero-img-wrapper { width: 80%; }
        }
        @media (max-width: 768px) {
          .sc-split { grid-template-columns: 1fr !important; gap: 48px !important; }
          .sc-desktop-nav { display: none !important; }
          .sc-mobile-nav { display: flex !important; }
          section, header { padding-left: 20px !important; padding-right: 20px !important; }
          header { padding-top: 100px !important; padding-bottom: 48px !important; }
          .hero-img-wrapper {
            width: 100%; height: 65%; top: 0; right: 0;
          }
          .hero-img-wrapper::after {
            background: linear-gradient(to top, #1a130f 0%, transparent 80%),
                        linear-gradient(to right, #1a130f 0%, transparent 80%);
          }
          .story-img-wrapper::after {
            background: linear-gradient(to bottom, transparent 0%, #1a130f 60%);
          }
          .hero-content { margin-top: 20px; }
          .btn-red { width: 100%; }
        }
        @media (min-width: 769px) {
          .sc-mobile-nav { display: none !important; }
          .sc-desktop-nav { display: flex !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position:"fixed",top:0,width:"100%",zIndex:100,
        background:`rgba(255,255,255,0.95)`,
        backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${C.border}`,
        height:68,display:"flex",alignItems:"center",
        padding:"0 40px",justifyContent:"space-between",
        boxSizing:"border-box",overflow:"hidden",
      }}>
        <a href="/" style={{display:"flex",alignItems:"center",textDecoration:"none"}}>
          <img src={LOGO_URL} alt="Headliner Music Academy" style={{height:"auto",maxHeight:44,width:"auto",maxWidth:180,objectFit:"contain",flexShrink:0}}/>
        </a>
        <div className="sc-desktop-nav" style={{ alignItems: "center", gap: 24, flexShrink: 0 }}>
          <a href={PORTAL_URL} target="_blank" rel="noreferrer" className="sc-nav-link">Parent Portal</a>
          <a href={CAMP_URL} target="_blank" rel="noreferrer" className="btn-red" style={{ padding: "10px 20px", fontSize: 11 }}>
            Enroll Now <ArrowRight size={14} />
          </a>
        </div>
        <div className="sc-mobile-nav" style={{ alignItems: "center", flexShrink: 0 }}>
          <a href={CAMP_URL} target="_blank" rel="noreferrer" className="btn-red" style={{ padding: "8px 16px", fontSize: 11 }}>
            Enroll Now
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header style={{
        background: C.espresso, padding: "96px 24px 80px",
        position: "relative", overflow: "hidden",
        borderBottom: `3px solid ${C.crimson}`,
        width: "100%"
      }}>
        <div className="sc-fu sc-d3 hero-img-wrapper">
          <img
            src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780748774/pexels-mikhail-nilov-7887204_lpdwdn.jpg"
            alt="Kids playing instruments"
            className="hero-img"
          />
        </div>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: `radial-gradient(at 0% 0%, rgba(255,0,68,0.06) 0px, transparent 50%),
                            radial-gradient(at 100% 100%, rgba(0,168,200,0.05) 0px, transparent 50%)`
        }} />
        <div style={{
          position: "absolute", left: "-2vw", top: "50%", transform: "translateY(-50%)",
          fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: "40vw",
          lineHeight: 1, color: C.crimson, opacity: 0.02, pointerEvents: "none", zIndex: 1
        }}>H</div>

        <div className="hero-content" style={{
          maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%"
        }}>
          <h1 className="sc-fu sc-d1" style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 900,
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)", lineHeight: 0.93,
            letterSpacing: -2, color: "#fff", margin: "0 0 20px"
          }}>
            Summer<br />Band <em style={{ fontStyle: "italic", color: C.crimson }}>Camp.</em>
          </h1>
          <p className="sc-fu sc-d2" style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: C.yellow, margin: "0 0 48px",
            maxWidth: 500, lineHeight: 1.3
          }}>
            Your kid will be in a real band by Friday.
          </p>
          <div className="sc-fu sc-d3" style={{ display: "flex", gap: "24px 40px", flexWrap: "wrap", marginBottom: 56 }}>
            {[
              { label: "Dates",    value: "June 22–26, 2026" },
              { label: "Schedule", value: "9 AM – 12:30 PM" },
              { label: "Ages",     value: "8–12 years old" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.16em" }}>{label}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{value}</span>
              </div>
            ))}
          </div>
          <div className="sc-fu sc-d4" style={{ width: "100%", maxWidth: 320 }}>
            <a href={CAMP_URL} target="_blank" rel="noreferrer" className="btn-red" style={{ padding: "18px 36px", fontSize: 14 }}>
              Enroll Now <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div style={{ background: C.espresso, padding: "14px 0", overflow: "hidden", width: "100%", borderTop: `1px solid rgba(255,255,255,0.08)`, borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <div className="sc-marquee">
          {[...Array(2)].fill(["Electric Guitar","•","Bass Guitar","•","Drums","•","Keyboard","•","Vocals","•","No Experience Needed","•","Max 7 Kids Per Band","•","June 22–26","•"]).flat().map((item, i) => (
            <span key={i} style={{
              fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: item === "•" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)",
              padding: item === "•" ? "0 8px" : "0 24px",
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* THE CAMP */}
      <section style={{ background: C.white, padding: "96px 24px", borderBottom: `1px solid ${C.border}`, width: "100%" }}>
        <div className="sc-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.teal, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "block", width: 28, height: 3, background: C.teal, borderRadius: 2 }} />
              The Camp
            </p>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif", fontWeight: 900,
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", letterSpacing: -1,
              color: C.espresso, margin: "0 0 32px", lineHeight: 0.95,
            }}>
              Show up curious.<br />Leave as a <em style={{ fontStyle: "italic", color: C.crimson }}>band.</em>
            </h2>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>
              Your child walks in on Monday and walks out on Friday as a member of a real band — one that has rehearsed together all week and will perform an actual song at the end of it.
            </p>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>
              Each small group of up to 7 kids is assigned instruments, learns the basics from our instructors, and spends the week rehearsing together.
            </p>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.8 }}>
              On the final day, we record the band performing their song and share that recording with every family.
            </p>
            <div style={{ marginTop: 56 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.crimson, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ display: "block", width: 28, height: 3, background: C.crimson, borderRadius: 2 }} />
                Instruments Available
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {["🎸 Electric Guitar", "🎸 Bass", "🥁 Drums", "🎹 Keyboard", "🎤 Vocals"].map(item => (
                  <span key={item} className="sc-pill">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Camp Details — styled like the registration table */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, marginBottom: 20 }}>
              Camp Details
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
              {[
                { label: "Dates",       value: "June 22–26, 2026",                      highlight: null },
                { label: "Daily Hours", value: "9:00 AM – 12:30 PM",                    highlight: null },
                { label: "Ages",        value: "8–12 years old",                        highlight: null },
                { label: "Experience",  value: "None required at all",                  highlight: "teal" },
                { label: "Band Size",   value: "Max 7 kids — co-ed",                   highlight: null },
                { label: "Lunch",       value: "Not included — bring a snack",          highlight: null },
                { label: "Final Day",   value: "Performance recorded for every family", highlight: "crimson" },
              ].map(({ label, value, highlight }, i, arr) => (
                <div key={label} style={{
                  background: C.white,
                  padding: "28px 32px",
                  borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, margin: "0 0 8px" }}>{label}</p>
                  <p style={{
                    fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 22,
                    color: highlight === "teal" ? C.teal : highlight === "crimson" ? C.crimson : C.espresso,
                    margin: 0,
                  }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ background: C.espresso, padding: "96px 24px", position: "relative", overflow: "hidden", width: "100%" }}>
        <div className="story-img-wrapper">
          <img
            src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780748810/pexels-cottonbro-9643913_iz63y5.jpg"
            alt="Kids rocking out"
            className="story-img"
          />
        </div>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: `radial-gradient(at 0% 100%, rgba(0,168,200,0.0) 0px, transparent 55%), radial-gradient(at 100% 0%, rgba(255,218,0,0.05) 0px, transparent 55%)`,
        }} />
        <div className="sc-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center", position: "relative", zIndex: 2 }}>
          <div>
            <img
              src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png"
              alt="Headliner Music Academy"
              style={{ height: "auto", maxHeight: 72, width: "auto", maxWidth: 360, objectFit: "contain", display: "block", marginBottom: 40 }}
            />
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.9, fontWeight: 400, maxWidth: 480 }}>
              We have been teaching music in Rocklin for over a decade, and what we have learned is simple: kids thrive when they perform. Headliner is built around that idea. Same dedicated staff, same community, but now with more focus on bands, creativity, and getting your child on a real stage. Summer Band Camp is where that journey starts, and we are building more programs around the same belief that every musician deserves an audience.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden" }}>
            {[
              { value: "10",   label: "Years Running",     color: C.crimson },
              { value: "100%", label: "Same Teachers",     color: C.teal },
              { value: "7",    label: "Kids Max Per Band", color: "#fff" },
              { value: "0",    label: "Experience Needed", color: "#fff" },
            ].map(({ value, label, color }) => (
              <div key={label} style={{ background: C.espresso, padding: "48px 24px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color, lineHeight: 1, margin: "0 0 12px" }}>{value}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: C.white, padding: "96px 24px", borderBottom: `1px solid ${C.border}`, width: "100%" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.crimson, marginBottom: 20, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ display: "block", width: 28, height: 3, background: C.crimson, borderRadius: 2 }} />
            FAQ
            <span style={{ display: "block", width: 28, height: 3, background: C.crimson, borderRadius: 2 }} />
          </p>
          <h2 style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.4rem, 4vw, 3.5rem)", letterSpacing: -1,
            color: C.espresso, margin: "0 0 64px", textAlign: "center", lineHeight: 0.95,
          }}>
            Good questions.<br /><em style={{ fontStyle: "italic", color: C.crimson }}>Real answers.</em>
          </h2>
          <div>
            {faqs.map(({ q, a }) => (
              <div key={q} className="sc-faq-item">
                <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 20, color: C.espresso, margin: "0 0 16px", lineHeight: 1.3 }}>{q}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.muted, lineHeight: 1.8, margin: 0, maxWidth: 700 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section style={{ background: C.white, padding: "96px 24px", width: "100%" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.crimson, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "block", width: 28, height: 3, background: C.crimson, borderRadius: 2 }} />
            Registration
          </p>
          <h2 style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", letterSpacing: -1,
            color: C.espresso, margin: "0 0 24px", lineHeight: 0.95,
          }}>
            Reserve your <em style={{ fontStyle: "italic", color: C.crimson }}>spot.</em>
          </h2>
          <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.8, marginBottom: 16 }}>
            Payment holds the spot. Each band is limited to 7 kids — when a band is full, it closes. Spots go quickly.
          </p>
          <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.8, marginBottom: 48 }}>
            A confirmation email will be sent within a few minutes of completing your registration.
          </p>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <a href={CAMP_URL} target="_blank" rel="noreferrer" className="btn-red btn-teal" style={{ background: C.teal, padding: "18px 40px", fontSize: 15, boxShadow: `0 4px 20px rgba(0,168,200,0.25)`, width: "100%" }}>
              Enroll Now <ArrowRight size={18} />
            </a>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, marginTop: 32 }}>
            Questions?{" "}
            <a href="mailto:admin@headlinermusicacademy.com" style={{ color: C.crimson, textDecoration: "none", fontWeight: 700 }}>
              admin@headlinermusicacademy.com
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}