/*
  FONT SETUP — add this to your index.html <head> if not already present:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
*/
import { useState } from "react";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const C = {
  espresso:   "#1A130F",
  cream:      "#FAF6F0",
  offWhite:   "#F2EDE6",
  crimson:    "#FF0044",
  teal:       "#00A8C8",
  tealDark:   "#006E84",
  tealPastel: "#C8F0F8",
  yellow:     "#FFDA00",
  yellowDark: "#7A5F00",
  yellowPastel:"#FFF7CC",
  blush:      "#FFD6CC",
  blushDark:  "#8B2D1A",
  muted:      "#7A6860",
  text:       "#2C1F18",
};

/* ─── ProgramsNav ────────────────────────────────────────────────────────── */
const ProgramsNav = ({ setPath }) => (
  <nav style={{ background: C.espresso, borderBottom: "1px solid #ffffff18" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", gap: 4, flexWrap: "wrap" }}>
      {[
        { label: "Private Lessons", path: "/programs"    },
        { label: "Band Program",    path: "/band"        },
        { label: "Summer Camp",     path: "/summer-camp" },
        { label: "Mini Tunes",      path: "/mini-tunes"  },
        { label: "Teachers",        path: "/teachers"    },
      ].map(({ label, path }) => (
        <button key={path} onClick={() => setPath(path)} style={{
          background: "none", border: "none", cursor: "pointer",
          padding: "14px 12px", fontSize: 13,
          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          letterSpacing: "0.03em",
          color: path === "/mini-tunes" ? C.yellow : "#ffffffbb",
          borderBottom: path === "/mini-tunes" ? `2px solid ${C.yellow}` : "2px solid transparent",
        }}>{label}</button>
      ))}
    </div>
  </nav>
);

/* ─── CTA button ─────────────────────────────────────────────────────────── */
const Btn = ({ children, onClick, variant = "primary", style: sx = {} }) => {
  const variants = {
    primary:   { background: C.crimson,  color: "#fff", border: "none" },
    secondary: { background: "transparent", color: C.tealDark, border: `2.5px solid ${C.teal}` },
    ghost:     { background: "transparent", color: C.muted, border: `2px solid ${C.offWhite}` },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      style={{
        display: "inline-block", cursor: "pointer", borderRadius: 50,
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
        letterSpacing: "0.04em", fontSize: 15, padding: "14px 34px",
        transition: "transform 0.15s",
        ...variants[variant], ...sx,
      }}>
      {children}
    </button>
  );
};

/* ─── Wave dividers ──────────────────────────────────────────────────────── */
const WaveDown = ({ from, to }) => (
  <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
    style={{ display: "block", width: "100%", height: 48, background: from, marginBottom: -1 }}
    aria-hidden="true">
    <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" fill={to} />
  </svg>
);
const WaveUp = ({ from, to }) => (
  <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
    style={{ display: "block", width: "100%", height: 48, background: from, marginTop: -1 }}
    aria-hidden="true">
    <path d="M0,56 C480,0 960,0 1440,56 L1440,0 L0,0 Z" fill={to} />
  </svg>
);

/* ─── Playful piano SVG ──────────────────────────────────────────────────── */
const PianoKeys = () => {
  const whites = 14;
  const blackPattern = [0,1,3,4,5,7,8,10,11,12]; // offset from white key index
  const blackColors = [C.teal, C.crimson, C.yellow, C.teal, C.crimson, C.yellow, C.teal, C.crimson, C.yellow, C.teal];
  const kw = 36;
  return (
    <svg viewBox={`0 0 ${whites * kw + 2} 110`} width="100%"
      style={{ display: "block", maxWidth: 520 }} aria-hidden="true">
      {Array.from({ length: whites }).map((_, i) => (
        <rect key={i} x={i * kw + 1} y={0} width={kw - 2} height={106}
          rx={5} fill="#fff" stroke="#DDD4CC" strokeWidth={1.5} />
      ))}
      {blackPattern.map((offset, i) => (
        <rect key={i} x={offset * kw + 22} y={0} width={24} height={66}
          rx={4} fill={blackColors[i]} />
      ))}
      <text x={whites * kw - 10} y={48} fontSize={24} fill={C.yellow}
        fontFamily="serif" textAnchor="middle">♪</text>
      <text x={whites * kw - 6} y={88} fontSize={18} fill={C.teal}
        fontFamily="serif" textAnchor="middle" opacity="0.75">♫</text>
    </svg>
  );
};

/* ─── Skill chip ─────────────────────────────────────────────────────────── */
const Chip = ({ label, color }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "#fff", border: `1.5px solid ${color}55`,
    borderRadius: 20, padding: "6px 13px",
    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    color: C.text, fontWeight: 500,
  }}>
    <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
    {label}
  </span>
);

/* ─── Booking modal ──────────────────────────────────────────────────────── */
const BookingModal = ({ onClose }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(26,19,15,0.70)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
    <div
      onClick={e => e.stopPropagation()}
      style={{
        background: C.cream, borderRadius: 20, maxWidth: 440, width: "100%",
        padding: "40px 36px", position: "relative",
      }}>
      <button onClick={onClose} style={{
        position: "absolute", top: 14, right: 18,
        background: "none", border: "none", cursor: "pointer",
        fontSize: 24, color: C.muted, lineHeight: 1,
      }}>×</button>

      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎹</div>
        <h2 style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 22, color: C.espresso, margin: "0 0 8px",
        }}>Ready to get started?</h2>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.65, margin: 0 }}>
          We use Opus to manage enrollment. Clicking below takes you to
          our scheduling page to pick a class and reserve a spot.
        </p>
      </div>

      <div style={{
        background: C.tealPastel, borderRadius: 10, padding: "13px 16px",
        marginBottom: 22, borderLeft: `4px solid ${C.teal}`,
      }}>
        <p style={{ fontSize: 13, color: C.tealDark, margin: 0, lineHeight: 1.6 }}>
          Questions first? Call us at{" "}
          <a href="tel:9164351300" style={{ color: C.tealDark, fontWeight: 700 }}>(916) 435-1300</a>.
          We're happy to chat before you book.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Btn onClick={() => window.open("https://headlinermusicacademy.com", "_blank")} style={{ textAlign: "center" }}>
          Reserve a spot in Opus
        </Btn>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: C.muted, padding: "8px", textAlign: "center",
        }}>Maybe later</button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function MiniTunesPage({ setPath }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.cream, color: C.text }}>
      <ProgramsNav setPath={setPath} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: C.cream, padding: "64px 24px 0", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -60, right: -80, width: 320, height: 320, borderRadius: "50%", background: `${C.yellow}38`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 120, left: -80, width: 240, height: 240, borderRadius: "50%", background: `${C.tealPastel}`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 80, right: "30%", width: 100, height: 100, borderRadius: "50%", background: `${C.blush}`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 48, alignItems: "center",
          }}>
            {/* Left: expressive headline */}
            <div>
              <span style={{
                display: "inline-block", marginBottom: 20,
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: C.tealDark, padding: "5px 14px",
                background: C.tealPastel, border: `1px solid ${C.teal}40`, borderRadius: 20,
              }}>Early childhood · piano</span>

              {/* Mixed-expression headline block */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 400,
                  fontSize: "clamp(22px, 3.5vw, 32px)", color: C.muted,
                  lineHeight: 1.1, letterSpacing: "-0.01em",
                }}>music for</div>
                <div style={{
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                  fontSize: "clamp(56px, 9vw, 88px)", color: C.espresso,
                  lineHeight: 0.9, letterSpacing: "-0.04em",
                }}>little</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                    fontSize: "clamp(56px, 9vw, 88px)", color: C.crimson,
                    lineHeight: 0.9, letterSpacing: "-0.04em",
                  }}>hands</span>
                  <span style={{
                    fontFamily: "'Baloo 2', sans-serif", fontWeight: 400,
                    fontSize: "clamp(22px, 3.5vw, 32px)", color: C.muted,
                    letterSpacing: "-0.01em",
                  }}>and big hearts.</span>
                </div>
              </div>

              <p style={{
                fontSize: 16, lineHeight: 1.75, color: C.muted,
                margin: "0 0 32px", maxWidth: 400,
              }}>
                Group piano classes for kids ages 3 to 7. We make music feel
                like play, and build habits that last.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <Btn onClick={openModal}>Reserve a spot</Btn>
                <button
                  onClick={() => document.getElementById("mt-classes")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                    color: C.tealDark, fontWeight: 600, padding: 0,
                    textDecoration: "underline", textDecorationColor: `${C.teal}80`,
                    textUnderlineOffset: 3,
                  }}>
                  See what we cover
                </button>
              </div>

              {/* Quick stats */}
              <div style={{
                display: "flex", gap: 28, marginTop: 36,
                paddingTop: 28, borderTop: `1.5px solid ${C.offWhite}`,
              }}>
                {[
                  { value: "3 – 7",   label: "Ages" },
                  { value: "Group",   label: "Format" },
                  { value: "45 min",  label: "Per class" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 22, color: C.espresso }}>{value}</div>
                    <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.09em", fontWeight: 700, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: piano card + floating stickers */}
            <div style={{ position: "relative", paddingBottom: 20 }}>
              {/* Sticker: yellow rotated */}
              <div style={{
                position: "absolute", top: -8, right: 8, zIndex: 2,
                background: C.yellow, color: C.espresso, borderRadius: 50,
                padding: "9px 18px", fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800, fontSize: 13, transform: "rotate(5deg)",
                border: `2px solid ${C.espresso}18`,
              }}>Small groups!</div>

              {/* Sticker: teal rotated opposite */}
              <div style={{
                position: "absolute", bottom: 16, left: 0, zIndex: 2,
                background: C.teal, color: "#fff", borderRadius: 50,
                padding: "9px 18px", fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800, fontSize: 13, transform: "rotate(-4deg)",
              }}>Ages 3 – 7</div>

              {/* Card */}
              <div style={{
                background: "#fff", borderRadius: 24, padding: "28px 24px 20px",
                border: `3px solid ${C.yellow}80`,
              }}>
                <p style={{
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 12,
                  color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em",
                  margin: "0 0 16px", textAlign: "center",
                }}>Every class includes keyboard time</p>
                <PianoKeys />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: C.muted, textAlign: "center", marginTop: 14, lineHeight: 1.5,
                }}>Each child gets time at the keys, every session.</p>
              </div>
            </div>
          </div>
        </div>

        <WaveDown from={C.cream} to={C.offWhite} />
      </section>

      {/* ── TWO AGE TIERS ────────────────────────────────────────────────── */}
      <section id="mt-classes" style={{ background: C.offWhite, padding: "64px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)", color: C.espresso,
              margin: "0 0 10px", letterSpacing: "-0.02em",
            }}>Two classes, one program</h2>
            <p style={{ fontSize: 16, color: C.muted, maxWidth: 420, margin: "0 auto", lineHeight: 1.65 }}>
              Each group is sized for its age, so every kid learns alongside
              peers at the same stage.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>

            {/* Ages 3–5 */}
            <div style={{
              background: "#fff", borderRadius: 20,
              border: `3px solid ${C.yellow}`,
              padding: "0 0 32px", overflow: "hidden", position: "relative",
            }}>
              {/* Color band top */}
              <div style={{ height: 10, background: C.yellow }} />
              <div style={{ padding: "28px 28px 0" }}>
                <div style={{
                  display: "inline-block", padding: "6px 18px", borderRadius: 50,
                  background: C.yellow, color: C.espresso,
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 13,
                  marginBottom: 16,
                }}>Ages 3 to 5</div>

                <div style={{
                  height: 160, borderRadius: 12, overflow: "hidden", marginBottom: 20,
                  background: C.yellowPastel,
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80"
                    alt="Young children in a music class"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                </div>

                <h3 style={{
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                  fontSize: 22, color: C.espresso, margin: "0 0 10px",
                }}>Rhythm, sound, and play</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: "0 0 20px" }}>
                  At this age, music lives in the body before it lives on the page.
                  We explore sound through movement, games, and activities designed
                  for little hands and short attention spans.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {["Rhythm and sound", "Hands-on activities", "Group games", "Coordination"].map(s => (
                    <Chip key={s} label={s} color={C.yellow} />
                  ))}
                </div>
                <div style={{ paddingTop: 20, borderTop: `1.5px solid ${C.yellow}44` }}>
                  <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 24, color: C.espresso }}>Starting at $X/mo</div>
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>Group class · 45 min sessions</div>
                </div>
              </div>
            </div>

            {/* Ages 5–7 */}
            <div style={{
              background: "#fff", borderRadius: 20,
              border: `3px solid ${C.teal}`,
              padding: "0 0 32px", overflow: "hidden", position: "relative",
            }}>
              <div style={{ height: 10, background: C.teal }} />
              <div style={{ padding: "28px 28px 0" }}>
                <div style={{
                  display: "inline-block", padding: "6px 18px", borderRadius: 50,
                  background: C.teal, color: "#fff",
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 13,
                  marginBottom: 16,
                }}>Ages 5 to 7</div>

                <div style={{
                  height: 160, borderRadius: 12, overflow: "hidden", marginBottom: 20,
                  background: C.tealPastel,
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80"
                    alt="Child at a piano keyboard"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                </div>

                <h3 style={{
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                  fontSize: 22, color: C.espresso, margin: "0 0 10px",
                }}>Keys, theory, and songs</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: "0 0 20px" }}>
                  Older kids are ready to sit at the keyboard and start making
                  sense of it. We introduce music theory, basic technique, and
                  songs they actually want to play.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {["Music theory intro", "Piano technique", "Group games", "Child-friendly songs"].map(s => (
                    <Chip key={s} label={s} color={C.teal} />
                  ))}
                </div>
                <div style={{ paddingTop: 20, borderTop: `1.5px solid ${C.teal}44` }}>
                  <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 24, color: C.espresso }}>Starting at $X/mo</div>
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>Group class · 45 min sessions</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS IN CLASS ────────────────────────────────────────── */}
      <WaveUp from={C.offWhite} to={C.yellowPastel} />
      <section style={{ background: C.yellowPastel, padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: "clamp(26px, 4vw, 36px)", color: C.espresso,
            margin: "0 0 8px", textAlign: "center", letterSpacing: "-0.02em",
          }}>What happens in class</h2>
          <p style={{
            textAlign: "center", color: C.muted, fontSize: 16,
            maxWidth: 400, margin: "0 auto 44px", lineHeight: 1.65,
          }}>Every session is structured to keep kids engaged and moving forward.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
                alt: "Kids in a music class",
                title: "Small groups",
                body: "Classes stay small so your child gets real attention from the teacher, not just time in a room.",
              },
              {
                accent: C.teal,
                photoBg: C.tealPastel,
                photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
                alt: "Hands on piano keys",
                title: "Learn by doing",
                body: "Every class includes time at the keys. We build skills through songs and games, not drills.",
              },
              {
                accent: C.crimson,
                photoBg: C.blush,
                photo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80",
                alt: "Kids listening to music",
                title: "Listening together",
                body: "We introduce kids to a wide range of musical styles, helping them develop their ear early.",
              },
              {
                accent: C.blush,
                accentDark: C.blushDark,
                photoBg: "#FFE8E0",
                photo: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
                alt: "Children playing together",
                title: "Playing with peers",
                body: "Group moments are part of every class. Kids learn to listen to each other, not just the teacher.",
              },
            ].map(({ accent, accentDark, photoBg, photo, alt, title, body }) => (
              <div key={title} style={{
                background: "#fff", borderRadius: 16,
                border: `2px solid ${accent}50`,
                overflow: "hidden",
              }}>
                <div style={{ height: 4, background: accent }} />
                <div style={{ height: 140, background: photoBg, overflow: "hidden" }}>
                  <img src={photo} alt={alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => { e.target.parentElement.style.background = photoBg; e.target.style.display = "none"; }}
                  />
                </div>
                <div style={{ padding: "18px 20px 22px" }}>
                  <h4 style={{
                    fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                    fontSize: 17, color: C.espresso, margin: "0 0 7px",
                  }}>{title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: C.muted, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Path forward — warm, plain */}
          <div style={{
            marginTop: 40, background: "#fff",
            borderRadius: 16, padding: "26px 30px",
            border: `2px solid ${C.teal}30`,
            display: "flex", gap: 16, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>🎵</span>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.text, margin: 0 }}>
              When kids are ready, Mini Tunes graduates can move into private piano lessons
              with one of our instructors. There's no pressure and no set timeline. We'll
              let you know when it feels like a natural next step.
            </p>
          </div>
        </div>
      </section>
      <WaveDown from={C.yellowPastel} to={C.cream} />

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section style={{ background: C.cream, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 44px)", color: C.espresso,
            margin: "0 0 12px", lineHeight: 1.05, letterSpacing: "-0.02em",
          }}>Ready to give it a try?</h2>
          <p style={{ fontSize: 16, color: C.muted, margin: "0 0 32px", lineHeight: 1.65 }}>
            Spots fill up. Reach out when your child is ready and we'll
            find the right class together.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
            <Btn onClick={openModal}>Reserve a spot</Btn>
            <Btn variant="secondary" onClick={() => setPath("/programs")}>See all programs</Btn>
          </div>
          <p style={{ fontSize: 14, color: C.muted }}>
            Questions first?{" "}
            <a href="tel:9164351300" style={{ color: C.crimson, fontWeight: 700, textDecoration: "none" }}>(916) 435-1300</a>
            {" "}or{" "}
            <a href="mailto:admin@headlinermusicacademy.com" style={{ color: C.crimson, fontWeight: 700, textDecoration: "none" }}>admin@headlinermusicacademy.com</a>
          </p>
        </div>
      </section>

      {modalOpen && <BookingModal onClose={closeModal} />}
    </div>
  );
}