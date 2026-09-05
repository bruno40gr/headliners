import React, { useState } from "react";
import { C, fonts } from "./tokens";
import {
  Button,
  Bubble,
  Chip,
  WaveDivider,
  CTASection,
  FAQList,
  Card,
  globalStyles,
} from "./ui";
import ProgramsNav from "./ProgramsNav";
import BookingInterstitial from "./BookingInterstitial";

const faqs = [
  {
    q: "What ages is Wonder Notes for?",
    a: "Wonder Notes is designed for ages 3 to 5. No experience needed, it's an introduction to instruments, rhythm, and making music together.",
  },
  {
    q: "What happens in a class?",
    a: "Each class mixes instrument play, rhythm and movement games, and music-based storytelling. Kids explore real instruments, build coordination and listening skills, and make music with other kids their age.",
  },
  {
    q: "Is financial support or charter funding available?",
    a: <>Yes. We work with charter schools and Self-Determination funding programs. See what that covers and how it works on our <a href="/about/funding-support" style={{ color: C.crimson, fontWeight: 600, textDecoration: "underline" }}>Funding Support page</a>.</>,
  },
];

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
export default function WonderNotesPage({ navigate, setPath, onRequestLessons }) {
  const [interstitialOpen, setInterstitialOpen] = useState(false);
  const [interstitialMode, setInterstitialMode] = useState("booking");

  const openModal = (mode = "booking") => {
    if (onRequestLessons) {
      onRequestLessons("Wonder Notes");
    } else {
      setInterstitialMode(mode);
      setInterstitialOpen(true);
    }
  };

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
        paddingBottom: 72,
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
                textTransform: "none",
                padding: "7px 16px",
                borderRadius: 50,
                marginBottom: 20,
              }}>Ages 3 to 5 · GROW THROUGH MUSIC</div>

              {/* Program title */}
              <h1 style={{
                fontFamily: fonts.display, fontWeight: 800,
                fontSize: "clamp(48px, 7vw, 72px)",
                margin: "0 0 24px", lineHeight: 1, letterSpacing: "-0.03em",
              }}>
                <span style={{ color: C.espresso, display: "block" }}>Wonder</span>
                <span style={{ color: C.crimson, display: "block" }}>Notes</span>
              </h1>

              <p style={{
                fontFamily: fonts.body,
                fontSize: 17, lineHeight: 1.75, color: C.muted,
                margin: "0 0 32px", maxWidth: 400,
              }}>
A joyful, play-based music class where preschoolers sing, move, explore, and grow through music together.             </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <Button onClick={() => openModal("booking")}>Reserve a spot</Button>
                <Button variant="secondary" accent={C.teal} onClick={() => openModal("tour")}>Book a tour</Button>
                
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
                  { value: "Play-Based",        label: "Every Lesson" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800,
                      fontSize: 22, color: C.espresso,
                    }}>{value}</div>
                    <div style={{
                      fontFamily: fonts.body, fontSize: 11, color: C.muted,
                      textTransform: "none", letterSpacing: "0.09em",
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
                fontWeight: 800, fontSize: 13, transform: "rotate(5deg)",
                border: `2px solid ${C.espresso}18`,
              }}>LEARNING THROUGH MUSIC</div>

              {/* Sticker: crimson */}
              <div className="lr-sticker-left" style={{
                position: "absolute", bottom: 30, left: -10, zIndex: 2,
                background: C.teal, color: "#fff", borderRadius: 50,
                padding: "9px 18px", fontFamily: fonts.display,
                fontWeight: 800, fontSize: 13, transform: "none",
              }}>EXPLORE. PLAY. LEARN</div>

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
                  style={{ width: "100%", height: 430, objectFit: "cover", objectPosition: "center 25%", display: "block" }}
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
      <section
  style={{
    background: C.offWhite,
    padding: "72px 24px",
    position: "relative",
    overflow: "hidden",
  }}
>
   {/* Pink circle */}
  <div
    style={{
      position: "absolute",
      width: 280,
      height: 280,
      borderRadius: "50%",
      background: "#FFD4CC",
      opacity: 0.9,
      top: -110,
      left: -110,
      zIndex: 0,
    }}
  />

  {/* Yellow circle */}
  <div
    style={{
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: "50%",
      background: "#FFECA8",
      opacity: 0.9,
      top: 240,
      right: -45,
      zIndex: 0,
    }}
  />

  {/* Blue circle */}
  <div
    style={{
      position: "absolute",
      width: 180,
      height: 180,
      borderRadius: "50%",
      background: "#CDEEFF",
      opacity: 0.9,
      bottom: 70,
      left: -90,
      zIndex: 0,
    }}
  />
        <div style={{
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 32px",
}}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)", color: C.espresso,
              margin: "0 0 10px", letterSpacing: "-0.02em",
            }}>Every Class Is a New Musical Adventure</h2>
            <p style={{
  fontFamily: fonts.body,
  fontSize: 17,
  color: C.muted,
  maxWidth: 720,
  margin: "0 auto 56px",
  lineHeight: 1.7,
}}>
              Every lesson combines music, movement, storytelling, and hands-on exploration to keep preschoolers engaged while introducing new musical concepts in a fun and meaningful way.
            </p>
          </div>

          {/* Instrument badges */}
          <div className="lr-badges" style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 18,
  marginBottom: 64,
  flexWrap: "nowrap",
}}>
            {[
              { icon: "🎤", name: "Sing & Express", bg: C.yellow, soft: C.yellowPastel },
              { icon: "🪇", name: "Explore & Discover",  bg: C.crimson, soft: C.blush },
              { icon: "🥁", name: "Rhythm & Movement",   bg: C.teal,    soft: C.tealPastel },
              { icon: "📖", name: "Stories & Imagination",   bg: C.yellow,  soft: C.yellowPastel },
            ].map(({ icon, name, bg, soft }, index) => (
  <React.Fragment key={name}>

    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      width: 280,
    }}>
      <div style={{
        width: 84,
        height: 84,
        borderRadius: "50%",
        background: soft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 38,
        boxShadow: "0 8px 20px rgba(42,18,8,0.06)",
      }}>
        {icon}
      </div>

      <div style={{
        fontFamily: fonts.display,
        fontWeight: 800,
        fontSize: 18,
        color: C.espresso,
        textAlign: "center",
        lineHeight: 1.3,
      }}>
        {name}
      </div>
    </div>

    {index < 3 && (
      <svg
        width="70"
        height="12"
        viewBox="0 0 70 12"
        style={{ marginTop: -28 }}
      >
        <line
          x1="0"
          y1="6"
          x2="58"
          y2="6"
          stroke="rgba(255,0,68,.22)"
          strokeWidth="2"
          strokeDasharray="4 5"
          strokeLinecap="round"
        />
        <path
          d="M58 2 L66 6 L58 10"
          fill="none"
          stroke="rgba(255,0,68,.22)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}

  </React.Fragment>
))}
          </div>

          {/* Instrument photo feature */}
<div style={{
  marginTop: 44,
  textAlign: "center",
}}>
  <img
    src="https://res.cloudinary.com/gozdpo8j/image/upload/v1783107188/Screenshot_2026-07-03_at_12.26.17_PM_xy5ozv.png"
    alt="Real musical instruments used in Wonder Notes classes"
    style={{
      width: "100%",
      maxWidth: 980,
      height: "auto",
      display: "block",
      margin: "0 auto",
      borderRadius: 24,
      boxShadow: "0 18px 50px rgba(42,18,8,0.10)",
    }}
  />

  <p style={{
    fontFamily: fonts.body,
    fontSize: 16,
    color: C.muted,
    lineHeight: 1.6,
    maxWidth: 520,
    margin: "22px auto 0",
  }}>
    Every class introduces children to real instruments they can touch, hear, and explore.
  </p>
</div>

  </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────────────── */}
      <section
  id="lr-what"
  style={{
    position: "relative",
    maxWidth: 1220,
    margin: "0 auto",
    padding: "0 32px 90px",
    overflow: "visible",
  }}>
    {/* Background circles */}

<div
  style={{
    position: "absolute",
    top: 160,
left: -240,
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "#FFD6CF",
    opacity: 0.8,
    zIndex: 0,
  }}
/>

<div
  style={{
    position: "absolute",
    top: 40,
    right: 40,
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "#FFF0A8",
    opacity: 0.85,
    zIndex: 0,
  }}
/>

<div
  style={{
    position: "absolute",
    bottom: -10,
    right: -170,
    width: 170,
    height: 170,
    borderRadius: "50%",
    background: "#CFEFFF",
    opacity: 0.8,
    zIndex: 0,
  }}
/>
<div
  style={{
    position: "relative",
    zIndex: 1,
  }}
>

</div>

          <div
  style={{
    textAlign: "center",
    marginTop: 60,
    marginBottom: 56,
  }}>
            <h2 style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)", color: C.espresso,
              margin: "0 0 10px", letterSpacing: "-0.02em",
            }}>Inside Every Class</h2>
            <p style={{
              fontFamily: fonts.body, fontSize: 16, color: C.muted,
              maxWidth: 720, margin: "0 auto", lineHeight: 1.65,
            }}>
              Every class is filled with music, movement, stories, and discovery. Preschoolers sing, explore, imagine, and make music together in a warm, playful environment where confidence grows, friendships begin, and every lesson feels like an adventure.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
gap: 36,
maxWidth: 1180,
margin: "0 auto",
alignItems: "stretch",
          }}>
            {[
              {
                accent: C.crimson,
                photoBg: C.blush,
                photo: "https://res.cloudinary.com/gozdpo8j/image/upload/v1783101990/ChatGPT_Image_Jul_3_2026_11_05_57_AM_ky6xao.png",
                alt: "Preschoolers singing with a teacher and having fun",
                title: "Sing & Express",
                body: "Songs, echo games, and playful repetition help children build confidence, communication, and listening skills.",
              },
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://res.cloudinary.com/gozdpo8j/image/upload/v1783101948/ChatGPT_Image_Jul_3_2026_10_53_58_AM_clxc43.png",
                alt: "Variey of musical instruments for kids to explore",
                title: "Explore & Discover",
                body: "Children explore real instruments, exciting sounds, and musical textures through hands-on experiences that spark curiosity.",
              },
              {
                accent: C.teal,
                photoBg: C.tealPastel,
                photo: "https://res.cloudinary.com/gozdpo8j/image/upload/v1783101948/ChatGPT_Image_Jul_3_2026_10_59_35_AM_firmhg.png",
                alt: "Preschoolers marching to music and playing percussion instrument",
                title: "Rhythm & Movement",
                body: "Through clapping, tapping, dancing, and rhythm games, children develop coordination, focus, balance, and a steady musical beat.",
              },
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://res.cloudinary.com/gozdpo8j/image/upload/v1783101990/ChatGPT_Image_Jul_3_2026_11_06_11_AM_v17owy.png",
                alt: "Teacher telling stories through music and handgestures to preschoolers",
                title: "Stories & Imagination",
                body: "Music and storytelling come together to teach emotions, social skills, and early preschool concepts while inspiring creativity and imaginative play.",
              },
            ].map(({ accent, photoBg, photo, alt, title, body }) => (
              <Card
                key={title}
                image={photo}
                imageAlt={alt}
                imageHeight={250}
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
        <WaveDivider from={C.blush} to={C.cream} direction="down" />
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 13,
            color: C.muted, textTransform: "none", letterSpacing: "0.1em",
            margin: "0 0 16px", textAlign: "center",
          }}>Common questions</p>
          <h2 style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: "clamp(26px, 3.4vw, 38px)", color: C.espresso,
            margin: "0 0 36px", textAlign: "center", lineHeight: 1.1,
          }}>
            Questions parents ask
          </h2>
          <FAQList items={faqs} />
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <CTASection
        eyebrow="Want to give it a try?"
        title="Classes fill up fast."
        body="Reach out and we will find a spot for your little one."
      >
        <Button onClick={() => openModal("booking")}>Reserve a spot</Button>
        <Button variant="secondary" accent={C.teal} onClick={() => openModal("tour")}>Book a tour</Button>
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
      {interstitialOpen && !onRequestLessons && (
        <BookingInterstitial
          programName="Wonder Notes"
          programColor={C.crimson}
          opusL1="https://headlinermusicacademy.com"
          opusL2="https://headlinermusicacademy.com"
          opusL3="https://headlinermusicacademy.com"
          initialScreen={interstitialMode === "tour" ? 2 : 1}
          submitLabel={interstitialMode === "booking" ? "Reserve a spot" : "Continue to booking"}
          onClose={() => setInterstitialOpen(false)}
          emailjsServiceId="service_734y6qg"
          emailjsTemplateId="template_czlclec"
          emailjsPublicKey="FdW-lGbAyQuJZFy-y"
        />
      )}
    </div>
  );
}
