import { useState } from "react";
import { C, fonts } from "./tokens";
import {
  Button,
  Bubble,
  Chip,
  WaveDivider,
  CTASection,
  Card,
  globalStyles,
} from "./ui";
import ProgramsNav from "./ProgramsNav";
import BookingInterstitial from "./BookingInterstitial";

/* ─── Playful piano SVG ──────────────────────────────────────────────────── */
const PianoKeys = () => {
  const whites = 14;
  const blackPattern = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
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
        fontFamily="serif" textAnchor="middle" opacity={0.75}>♫</text>
    </svg>
  );
};

/* ─── Level badge ────────────────────────────────────────────────────────── */
const LevelBadge = ({ number, color, bg }) => (
  <div style={{
    width: 36, height: 36, borderRadius: "50%",
    background: bg, border: `2px solid ${color}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: fonts.display, fontWeight: 800, fontSize: 16,
    color: color, flexShrink: 0,
  }}>{number}</div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function TinyKeysPage({ navigate, setPath, onRequestLessons }) {
  const [interstitialOpen, setInterstitialOpen] = useState(false);

  const openModal = () => {
    setInterstitialOpen(true);
  };

  return (
    <div style={{ fontFamily: fonts.body, background: C.cream, color: C.text }}>
      <style>{globalStyles}</style>
      <style>{`
        @media (max-width: 768px) {
          .tk-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .tk-hero-img { height: 260px !important; }
          .tk-stats { flex-wrap: wrap !important; gap: 18px 24px !important; }
          .tk-sticker-left { left: 0 !important; }
          .tk-sticker-right { right: 0 !important; }
          .tk-level-card { padding: 18px 20px !important; gap: 14px !important; }
          .tk-graduation { padding: 18px 20px !important; gap: 12px !important; }
          .tk-hero-logo { max-width: 200px !important; }
          .tk-hero-section { padding-top: 100px !important; }
        }
      `}</style>

      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Reserve a Spot"
        onCtaClick={openModal}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="tk-hero-section" style={{
        background: C.cream,
        paddingTop: 120,
        paddingBottom: 48,
        paddingLeft: 24,
        paddingRight: 24,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <Bubble top={-60} right={-80} size={320} color={`${C.yellow}38`} />
        <Bubble top={120} left={-80} size={240} color={C.tealPastel} />
        <Bubble bottom={80} right="30%" size={100} color={C.blush} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <div className="tk-split" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}>

            {/* Left: logo + copy */}
            <div>
              {/* Program title */}
              <h1 style={{
                fontFamily: fonts.display, fontWeight: 800,
                fontSize: "clamp(48px, 7vw, 72px)", color: C.crimson,
                margin: "0 0 24px", lineHeight: 1, letterSpacing: "-0.03em",
              }}>Tiny Keys</h1>

              <p style={{
                fontFamily: fonts.body,
                fontSize: 17, lineHeight: 1.75, color: C.muted,
                margin: "0 0 32px", maxWidth: 400,
              }}>
                Group piano classes for kids ages 3 to 7. A structured,
                three-level curriculum that builds real skills through
                songs, games, and time at the keys every single class.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <Button onClick={openModal}>Reserve a spot</Button>
                <p style={{ fontFamily: fonts.body, fontSize: 13, color: C.muted, margin: "6px 0 0", textAlign: "center" }}>
                  Takes about 2 minutes.
                </p>
                <button
                  onClick={() => document.getElementById("tk-curriculum")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: fonts.body, fontSize: 15,
                    color: C.tealDark, fontWeight: 600, padding: 0,
                    textDecoration: "underline",
                    textDecorationColor: `${C.teal}80`,
                    textUnderlineOffset: 3,
                  }}>
                  See what we teach
                </button>
              </div>

              {/* Quick stats */}
              <div className="tk-stats" style={{
                display: "flex", gap: 28, marginTop: 36,
                paddingTop: 28, borderTop: `1.5px solid ${C.offWhite}`,
              }}>
                {[
                  { value: "3 – 7",    label: "Ages"      },
                  { value: "Group",    label: "Format"    },
                  { value: "45 min",   label: "Per class" },
                  { value: "3",        label: "Levels"    },
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
              <div className="tk-sticker-right" style={{
                position: "absolute", top: -8, right: 8, zIndex: 2,
                background: C.yellow, color: C.espresso, borderRadius: 50,
                padding: "9px 18px", fontFamily: fonts.display,
                fontWeight: 800, fontSize: 13, transform: "rotate(5deg)",
                border: `2px solid ${C.espresso}18`,
              }}>Small groups!</div>

              {/* Sticker: teal */}
              <div className="tk-sticker-left" style={{
                position: "absolute", bottom: 30, left: -10, zIndex: 2,
                background: C.teal, color: "#fff", borderRadius: 50,
                padding: "9px 18px", fontFamily: fonts.display,
                fontWeight: 800, fontSize: 13, transform: "rotate(-4deg)",
              }}>Ages 3 – 7</div>

              {/* Photo card */}
              <div style={{
                borderRadius: 24, overflow: "hidden",
                border: `3px solid ${C.yellow}80`,
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}>
                <img
                  className="tk-hero-img"
                  src="https://res.cloudinary.com/diy08lj9x/image/upload/v1782868727/ChatGPT_Image_Jun_30_2026_06_18_16_PM_2_n5zur8.png"
                  alt="Young children at a piano with a teacher"
                  style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
                  onError={e => {
                    e.target.src = "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <WaveDivider from={C.cream} to={C.offWhite} direction="down" />
      </section>

      {/* ── WHAT WE TEACH ────────────────────────────────────────────────── */}
      <section id="tk-curriculum" style={{ background: C.offWhite, padding: "64px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)", color: C.espresso,
              margin: "0 0 10px", letterSpacing: "-0.02em",
            }}>What we teach</h2>
            <p style={{
              fontFamily: fonts.body, fontSize: 16, color: C.muted,
              maxWidth: 460, margin: "0 auto", lineHeight: 1.65,
            }}>
              Every class is built around five core skills. Students work through
              them progressively across three levels, at their own pace.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}>
            {[
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781715525/PXL_20260615_232703074.PORTRAIT_mqdiam.jpg",
                alt: "Hands on piano keyboard",
                title: "Piano technique",
                body: "Finger positioning, hand coordination, and basic chords. Students learn new songs every class so they can practice these skills in context, not in isolation.",
              },
              {
                accent: C.teal,
                photoBg: C.tealPastel,
                photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1782869153/6800e606-9e7f-4f01-a303-052dd700b141.png",
                alt: "Child playing piano",
                title: "Playing by ear",
                body: "We use Suzuki-influenced methods to help kids listen actively and play intuitively. Playing by ear is one of the most valuable skills a young musician can build.",
              },
              {
                accent: C.crimson,
                photoBg: C.blush,
                photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1782869275/c18113ba-2a91-41f3-bb6e-1cd8fbddf197.png",
                alt: "Kids reading music",
                title: "Sight-reading",
                body: "We introduce musical notation in a kid-friendly, step-by-step way. Most kids are ready for this around age 6 or 7, and we meet them there when the time is right.",
              },
              {
                accent: C.teal,
                photoBg: C.tealPastel,
                photo: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
                alt: "Kids listening to music together",
                title: "Creative listening",
                body: "Every class includes a listening exercise. We introduce kids to a wide range of styles, from classical to pop to rock, to help them develop their ear and find music they love.",
              },
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1782869642/20353365-2533-4c7d-a938-808c7ddd5388.png",
                alt: "Children performing music together",
                title: "Group performance",
                body: "Playing with other kids is part of the curriculum, not an afterthought. Students learn to listen to each other and perform together, which builds confidence from the start.",
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

      {/* ── THREE LEVELS ─────────────────────────────────────────────────── */}
      <WaveDivider from={C.offWhite} to={C.yellowPastel} direction="up" />
      <section style={{ background: C.yellowPastel, padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: "clamp(26px, 4vw, 36px)", color: C.espresso,
            margin: "0 0 8px", textAlign: "center", letterSpacing: "-0.02em",
          }}>Kids move through three levels as they're ready</h2>
          <p style={{
            fontFamily: fonts.body, textAlign: "center", color: C.muted,
            fontSize: 16, maxWidth: 440, margin: "0 auto 44px", lineHeight: 1.65,
          }}>
            Tiny Keys is a structured program. Your teacher tracks their progress and moves them forward when the time is right.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                level: 1,
                color: C.yellow,
                bg: C.yellowPastel,
                title: "Getting started",
                body: "Students learn how to sit at the keyboard, basic finger placement, and their first simple songs. The focus is on comfort, curiosity, and building a positive relationship with the instrument.",
                skills: ["Posture and positioning", "Basic finger numbers", "First songs", "Listening exercises"],
              },
              {
                level: 2,
                color: C.teal,
                bg: C.tealPastel,
                title: "Building foundations",
                body: "Students begin reading simple notation, develop hand coordination, and start learning chords. Songs get more interesting, and group performance becomes a regular part of class.",
                skills: ["Simple notation", "Hand coordination", "Basic chords", "Group performance"],
              },
              {
                level: 3,
                color: C.crimson,
                bg: C.blush,
                title: "Growing as a musician",
                body: "Students work on both hands together, expand their repertoire, and develop their musical ear more formally. By the end of Level 3, kids have a real foundation to carry into private lessons.",
                skills: ["Two-hand playing", "Sight-reading", "Playing by ear", "Expanded repertoire"],
              },
            ].map(({ level, color, bg, title, body, skills }) => (
              <div key={level} className="tk-level-card" style={{
                background: "#fff", borderRadius: 16,
                border: `2px solid ${color}40`,
                padding: "24px 28px",
                display: "flex", gap: 20, alignItems: "flex-start",
              }}>
                <LevelBadge number={level} color={color} bg={bg} />
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: fonts.display, fontWeight: 800,
                    fontSize: 19, color: C.espresso, margin: "0 0 8px",
                  }}>
                    <span style={{ color: color, marginRight: 8 }}>Level {level}.</span>
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: fonts.body, fontSize: 14,
                    lineHeight: 1.7, color: C.muted, margin: "0 0 14px",
                  }}>{body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {skills.map(s => <Chip key={s} label={s} accent={color} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Graduation callout */}
          <div className="tk-graduation" style={{
            marginTop: 28, background: "#fff",
            borderRadius: 16, padding: "24px 28px",
            border: `2px solid ${C.teal}30`,
            display: "flex", gap: 16, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 26, flexShrink: 0, lineHeight: 1 }}>🎹</span>
            <div>
              <h4 style={{
                fontFamily: fonts.display, fontWeight: 800,
                fontSize: 16, color: C.espresso, margin: "0 0 6px",
              }}>What comes after Level 3?</h4>
              <p style={{
                fontFamily: fonts.body, fontSize: 14,
                lineHeight: 1.75, color: C.muted, margin: 0,
              }}>
                Students who complete Level 3 have built a solid technical and musical foundation.
                At that point, many are ready to move into private piano lessons, where they can
                go deeper on repertoire, theory, and their own musical interests. We'll talk
                through that transition with you when your child gets there.
              </p>
            </div>
          </div>
        </div>
      </section>
      <WaveDivider from={C.yellowPastel} to={C.cream} direction="down" />

      {/* ── PIANO ILLUSTRATION STRIP ─────────────────────────────────────── */}
      <section style={{ background: C.cream, padding: "40px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 13,
            color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em",
            margin: "0 0 16px",
          }}>Every class includes keyboard time</p>
          <PianoKeys />
          <p style={{
            fontFamily: fonts.body, fontSize: 14, color: C.muted,
            marginTop: 14, lineHeight: 1.5,
          }}>Each child gets time at the keys, every session.</p>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <CTASection
        eyebrow="Ready to give it a try?"
        title="Spots fill up."
        body="Reach out when your child is ready and we'll find the right class together."
      >
        <Button onClick={openModal}>Reserve a spot</Button>
        <p style={{ fontFamily: fonts.body, fontSize: 13, color: C.muted, margin: "6px 0 0", textAlign: "center" }}>
          Takes about 2 minutes.
        </p>
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

      {/* Booking interstitial */}
      {interstitialOpen && (
        <BookingInterstitial
          programName="Tiny Keys"
          programColor={C.yellow}
          opusL1="https://headlinerma.opus1.io/w/tinykeys"
          opusL2="https://headlinerma.opus1.io/w/tinykeys"
          opusL3="https://headlinerma.opus1.io/w/tinykeys"
          onClose={() => setInterstitialOpen(false)}
          emailjsServiceId="service_734y6qg"
          emailjsTemplateId="template_526w74g"
          emailjsPublicKey="FdW-lGbAyQuJZFy-y"
        />
      )}
    </div>
  );
}
