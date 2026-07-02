import { useState } from "react";
import { C, fonts } from "./tokens";
import {
  Button,
  Modal,
  Bubble,
  Chip,
  WaveDivider,
  CTASection,
  Card,
  globalStyles,
} from "./ui";
import ProgramsNav from "./ProgramsNav";

/* ─── Instrument illustration SVG ────────────────────────────────────────── */
const InstrumentIllustration = () => (
  <svg viewBox="0 0 520 140" width="100%"
    style={{ display: "block", maxWidth: 520 }} aria-hidden="true">
    {/* Guitar */}
    <g transform="translate(20,20)">
      <rect x="8" y="0" width="10" height="40" rx="3" fill="#C9A26B" />
      <ellipse cx="13" cy="70" rx="26" ry="34" fill="#C9A26B" />
      <circle cx="13" cy="78" r="9" fill="#1A130F" />
      <rect x="6" y="0" width="14" height="6" rx="2" fill={C.espresso} />
      <line x1="13" y1="6" x2="13" y2="60" stroke={C.espresso} strokeWidth="1.2" />
      <line x1="10" y1="6" x2="10" y2="60" stroke={C.espresso} strokeWidth="0.8" />
      <line x1="16" y1="6" x2="16" y2="60" stroke={C.espresso} strokeWidth="0.8" />
      <circle cx="13" cy="30" r="3" fill={C.crimson} />
    </g>

    {/* Drum kit */}
    <g transform="translate(120,30)">
      <ellipse cx="40" cy="80" rx="38" ry="12" fill={C.espresso} opacity="0.15" />
      <rect x="20" y="30" width="40" height="50" rx="6" fill={C.crimson} />
      <ellipse cx="40" cy="30" rx="20" ry="6" fill="#fff" stroke={C.espresso} strokeWidth="1" />
      <ellipse cx="40" cy="80" rx="20" ry="6" fill={C.crimson} />
      <circle cx="40" cy="55" r="6" fill={C.yellow} />
      <rect x="62" y="10" width="14" height="34" rx="4" fill={C.teal} transform="rotate(15 69 27)" />
      <rect x="4" y="10" width="14" height="34" rx="4" fill={C.teal} transform="rotate(-15 11 27)" />
      <line x1="40" y1="80" x2="30" y2="110" stroke={C.espresso} strokeWidth="2" />
      <line x1="40" y1="80" x2="50" y2="110" stroke={C.espresso} strokeWidth="2" />
    </g>

    {/* Bass guitar */}
    <g transform="translate(230,20)">
      <rect x="8" y="0" width="10" height="48" rx="3" fill={C.espresso} />
      <ellipse cx="13" cy="78" rx="22" ry="30" fill={C.espresso} />
      <circle cx="13" cy="86" r="7" fill={C.teal} />
      <rect x="6" y="0" width="14" height="6" rx="2" fill={C.espresso} />
      <line x1="13" y1="6" x2="13" y2="68" stroke={C.yellow} strokeWidth="1.2" />
      <circle cx="13" cy="34" r="3" fill={C.crimson} />
    </g>

    {/* Keyboard */}
    <g transform="translate(330,40)">
      <rect x="0" y="0" width="170" height="60" rx="6" fill={C.espresso} />
      <rect x="6" y="8" width="158" height="44" rx="3" fill="#fff" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={6 + i * 11.3} y="8" width="10.5" height="44" fill="#fff"
          stroke="#DDD4CC" strokeWidth="0.8" />
      ))}
      {[0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map((offset, i) => (
        <rect key={i} x={6 + offset * 11.3 + 7} y="8" width="6" height="28"
          fill={[C.teal, C.crimson, C.yellow, C.teal, C.crimson, C.yellow, C.teal, C.crimson, C.yellow, C.teal][i]} />
      ))}
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function LittleRockersPage({ navigate, setPath, onRequestLessons }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (onRequestLessons) {
      onRequestLessons("Little Rockers");
    } else {
      setModalOpen(true);
    }
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div style={{ fontFamily: fonts.body, background: C.cream, color: C.text }}>
      <style>{globalStyles}</style>
      <style>{`
        @media (max-width: 768px) {
          .lr-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .lr-hero-img { height: 260px !important; }
          .lr-stats { flex-wrap: wrap !important; gap: 18px 24px !important; }
          .lr-sticker-left { left: 0 !important; }
          .lr-sticker-right { right: 0 !important; }
          .lr-hero-section { padding-top: 100px !important; }
          .lr-badges { flex-wrap: wrap !important; }
        }
      `}</style>

      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Reserve a Spot"
        onCtaClick={openModal}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="lr-hero-section" style={{
        background: C.cream,
        paddingTop: 120,
        paddingBottom: 48,
        paddingLeft: 24,
        paddingRight: 24,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <Bubble top={-60} right={-80} size={320} color={`${C.crimson}18`} />
        <Bubble top={120} left={-80} size={240} color={C.blush} />
        <Bubble bottom={80} right="30%" size={100} color={C.yellowPastel} />

        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          <div className="lr-split" style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.15fr",
            gap: 56,
            alignItems: "center",
          }}>

            {/* Left: copy */}
            <div>
              {/* Eyebrow pill */}
              <div style={{
                display: "inline-block",
                background: C.tealPastel,
                color: C.tealDark,
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "7px 16px",
                borderRadius: 50,
                marginBottom: 20,
              }}>Ages 3 to 5 · MUSIC & DEVELOPMENT</div>

              {/* Program title */}
              <h1 style={{
                fontFamily: fonts.display, fontWeight: 800,
                fontSize: "clamp(48px, 7vw, 72px)",
                margin: "0 0 24px", lineHeight: 1, letterSpacing: "-0.03em",
              }}>
                <span style={{ color: C.espresso, display: "block" }}>Little</span>
                <span style={{ color: C.crimson, display: "block" }}>Rockers</span>
              </h1>

              <p style={{
                fontFamily: fonts.body,
                fontSize: 17, lineHeight: 1.75, color: C.muted,
                margin: "0 0 32px", maxWidth: 400,
              }}>
An engaging, play-based music program that helps preschoolers build confidence, coordination, communication, and a lifelong love of music.             </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <Button onClick={openModal}>Reserve a spot</Button>
                <button
                  onClick={() => document.getElementById("lr-what")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: fonts.body, fontSize: 15,
                    color: C.tealDark, fontWeight: 600, padding: 0,
                    textDecoration: "underline",
                    textDecorationColor: `${C.teal}80`,
                    textUnderlineOffset: 3,
                  }}>
                  See what we do
                </button>
              </div>

              {/* Quick stats */}
              <div className="lr-stats" style={{
                display: "flex", gap: 28, marginTop: 36,
                paddingTop: 28, borderTop: `1.5px solid ${C.offWhite}`,
              }}>
                {[
                  { value: "3 to 5",  label: "Ages"        },
                  { value: "Group",    label: "Format"      },
                  { value: "45 min",   label: "Per class"   },
                  { value: "Interactive",        label: "Every Lesson" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800,
                      fontSize: 22, color: C.espresso,
                    }}>{value}</div>
                    <div style={{
                      fontFamily: fonts.body, fontSize: 11, color: C.muted,
                      textTransform: "uppercase", letterSpacing: "0.09em",
                      fontWeight: 700, marginTop: 2,
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: real photo hero */}
            <div style={{ position: "relative", paddingBottom: 20 }}>
              {/* Sticker: yellow */}
              <div className="lr-sticker-right" style={{
                position: "absolute", top: -8, right: 8, zIndex: 2,
                background: C.yellow, color: C.espresso, borderRadius: 50,
                padding: "9px 18px", fontFamily: fonts.display,
                fontWeight: 800, fontSize: 13, transform: "none",
                border: `2px solid ${C.espresso}18`,
              }}>Learning Through Music</div>

              {/* Sticker: crimson */}
              <div className="lr-sticker-left" style={{
                position: "absolute", bottom: 30, left: -10, zIndex: 2,
                background: C.teal, color: "#fff", borderRadius: 50,
                padding: "9px 18px", fontFamily: fonts.display,
                fontWeight: 800, fontSize: 13, transform: "none",
              }}>AGES 3–5 • PRESCHOOL MUSIC</div>

              {/* Photo card */}
              <div style={{
                borderRadius: 24, overflow: "hidden",
                border: `3px solid ${C.crimson}60`,
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}>
                <img
                  className="lr-hero-img"
                  src="https://res.cloudinary.com/gozdpo8j/image/upload/v1782939927/ChatGPT_Image_Jul_1_2026_02_04_46_PM_fuwgb6.png
                "
                  alt="Young kids playing instruments"
                  style={{ width: "100%", height: 430, objectFit: "cover", display: "block" }}
                  onError={e => {
                    e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <WaveDivider from={C.cream} to={C.offWhite} direction="down" />
      </section>

      {/* ── INSTRUMENTS ──────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding: "64px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)", color: C.espresso,
              margin: "0 0 10px", letterSpacing: "-0.02em",
            }}>Four instruments, one class</h2>
            <p style={{
              fontFamily: fonts.body, fontSize: 16, color: C.muted,
              maxWidth: 460, margin: "0 auto", lineHeight: 1.65,
            }}>
              We introduce kids to all four core instruments. No pressure to pick
              one. At this age, the goal is curiosity.
            </p>
          </div>

          {/* Instrument badges */}
          <div className="lr-badges" style={{
            display: "flex", gap: 16, justifyContent: "center",
            marginBottom: 40, flexWrap: "nowrap",
          }}>
            {[
              { icon: "🎸", name: "Guitar", bg: C.yellow, soft: C.yellowPastel },
              { icon: "🥁", name: "Drums",  bg: C.crimson, soft: C.blush },
              { icon: "🎹", name: "Keys",   bg: C.teal,    soft: C.tealPastel },
              { icon: "🎸", name: "Bass",   bg: C.yellow,  soft: C.yellowPastel },
            ].map(({ icon, name, bg, soft }) => (
              <div key={name} style={{
                background: "#fff", borderRadius: 16,
                border: `2px solid ${bg}40`,
                padding: "20px 24px",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 10,
                minWidth: 130,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: soft, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 26,
                }}>{icon}</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 800,
                  fontSize: 15, color: C.espresso,
                }}>{name}</div>
              </div>
            ))}
          </div>

          {/* Illustration card */}
          <div style={{
            background: "#fff", borderRadius: 20,
            padding: "32px 28px",
            border: `2px solid ${C.border}`,
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 13,
              color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em",
              margin: "0 0 20px",
            }}>Every class, hands on a real instrument</p>
            <InstrumentIllustration />
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────────────── */}
      <WaveDivider from={C.offWhite} to={C.blush} direction="up" />
      <section id="lr-what" style={{ background: C.blush, padding: "64px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)", color: C.espresso,
              margin: "0 0 10px", letterSpacing: "-0.02em",
            }}>What we do in class</h2>
            <p style={{
              fontFamily: fonts.body, fontSize: 16, color: C.muted,
              maxWidth: 460, margin: "0 auto", lineHeight: 1.65,
            }}>
              Every session is hands-on, active, and built for short attention spans.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}>
            {[
              {
                accent: C.crimson,
                photoBg: C.blush,
                photo: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&q=80",
                alt: "Young child with a guitar",
                title: "Meet the instruments",
                body: "Kids get hands-on time with guitar, drums, keys, and bass every class. No sitting and watching. Everyone plays.",
              },
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
                alt: "Kids moving to music",
                title: "Rhythm and movement",
                body: "We use rhythm games, clapping, and movement to help kids feel the music before they play it. It works really well at this age.",
              },
              {
                accent: C.teal,
                photoBg: C.tealPastel,
                photo: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
                alt: "Kids listening and playing together",
                title: "Playing together",
                body: "Classes are small and social. Kids play alongside each other, take turns, and start to understand what it feels like to make music with someone else in the room.",
              },
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
                alt: "Young child exploring music",
                title: "Just having fun",
                body: "There are no wrong answers in Little Rockers. We keep it loose, playful, and low-pressure. Kids leave happy. That is the goal.",
              },
            ].map(({ accent, photoBg, photo, alt, title, body }) => (
              <Card
                key={title}
                image={photo}
                imageAlt={alt}
                imageHeight={140}
                imageBg={photoBg}
                accent={accent}
              >
                <h4 style={{
                  fontFamily: fonts.display, fontWeight: 800,
                  fontSize: 17, color: C.espresso, margin: "0 0 7px",
                }}>{title}</h4>
                <p style={{
                  fontFamily: fonts.body, fontSize: 14,
                  lineHeight: 1.7, color: C.muted, margin: 0,
                }}>{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider from={C.blush} to={C.cream} direction="down" />

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <CTASection
        eyebrow="Want to give it a try?"
        title="Classes fill up fast."
        body="Reach out and we will find a spot for your little one."
      >
        <Button onClick={openModal}>Reserve a spot</Button>
        <Button variant="secondary" accent={C.teal} onClick={() => navigate("/programs")}>
          See all programs
        </Button>
        <p style={{
          fontFamily: fonts.body, fontSize: 14, color: C.muted,
          width: "100%", marginTop: 8,
        }}>
          Questions first?{" "}
          <a href="tel:9164351300" style={{ color: C.crimson, fontWeight: 700, textDecoration: "none" }}>
            (916) 435-1300
          </a>
          {" "}or{" "}
          <a href="mailto:admin@headlinermusicacademy.com" style={{ color: C.crimson, fontWeight: 700, textDecoration: "none" }}>
            admin@headlinermusicacademy.com
          </a>
        </p>
      </CTASection>

      {/* Fallback modal */}
      {modalOpen && !onRequestLessons && (
        <Modal onClose={closeModal} maxWidth={440}>
          <div style={{ textAlign: "center", marginBottom: 22 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🥁</div>
            <h2 style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: 22, color: C.espresso, margin: "0 0 8px",
            }}>Ready to join?</h2>
            <p style={{
              fontFamily: fonts.body, fontSize: 14,
              color: C.muted, lineHeight: 1.65, margin: 0,
            }}>
              We use Opus to manage enrollment. Clicking below takes you to our
              scheduling page where you can find a class and reserve a spot.
            </p>
          </div>

          <div style={{
            background: C.blush, borderRadius: 10, padding: "13px 16px",
            marginBottom: 22, borderLeft: `4px solid ${C.crimson}`,
          }}>
            <p style={{
              fontFamily: fonts.body, fontSize: 13,
              color: C.blushDark, margin: 0, lineHeight: 1.6,
            }}>
              Questions first? Call us at{" "}
              <a href="tel:9164351300" style={{ color: C.blushDark, fontWeight: 700 }}>
                (916) 435-1300
              </a>. We're happy to chat before you book.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Button
              onClick={() => window.open("https://headlinermusicacademy.com", "_blank")}
              style={{ textAlign: "center" }}
            >
              Reserve a spot in Opus
            </Button>
            <button onClick={closeModal} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: fonts.body, fontSize: 13,
              color: C.muted, padding: "8px", textAlign: "center",
            }}>Maybe later</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
