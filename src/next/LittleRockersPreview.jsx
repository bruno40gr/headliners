"use client";

// Preview-only copy: preserve the original program copy, imagery, and interactions.
import React, { useState } from "react";
import { C, fonts } from "../tokens";
import {
  Button,
  FAQList,
  globalStyles,
} from "../ui";
import ProgramsNav from "../ProgramsNav";
import BookingInterstitial from "../BookingInterstitial";
import ProgramLearningCard from './ProgramLearningCard';
import ProgramReview from './ProgramReview';

const faqs = [
  {
    q: "What ages is Little Rockers for?",
    a: "Little Rockers is designed for ages 3 to 5. No experience needed, it's an introduction to instruments, rhythm, and making music together.",
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

export default function LittleRockersPage({ navigate, onRequestLessons, approvedTestimonial = null }) {
  const [interstitialOpen, setInterstitialOpen] = useState(false);
  const [interstitialMode, setInterstitialMode] = useState("booking");

  const openModal = (mode = "booking") => {
    if (onRequestLessons) {
      onRequestLessons("Little Rockers");
    } else {
      setInterstitialMode(mode);
      setInterstitialOpen(true);
    }
  };

  return (
    <div className="lr-refinement" style={{ fontFamily: fonts.body, background: C.cream, color: C.text }}>
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
        <div className="lr-content-container" style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          <div className="lr-split" style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.15fr",
            gap: 56,
            alignItems: "center",
          }}>

            {/* Left: copy */}
            <div>
              {/* Program title */}
              <h1 style={{
                fontFamily: fonts.display, fontWeight: 800,
                fontSize: "clamp(48px, 7vw, 72px)",
                margin: "0 0 24px", lineHeight: 1, letterSpacing: "-0.03em",
              }}>
                <span style={{ color: C.espresso, display: "block" }}>Little</span>
                <span style={{ color: C.crimson, display: "block" }}>Rockers</span>
              </h1>

              <p className="lr-hero-description" style={{
                fontFamily: fonts.body,
                fontSize: 17, lineHeight: 1.75, color: C.muted,
                margin: "0 0 32px", maxWidth: 400,
              }}>
A joyful, play-based music class where preschoolers sing, move, explore, and grow through music together.             </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <Button className="lr-primary-action" onClick={() => openModal("booking")}>Reserve a spot</Button>
                <Button className="lr-secondary-action" variant="secondary" accent={C.teal} onClick={() => openModal("tour")}>Book a tour</Button>

              </div>

              {/* Quick stats */}
              <div className="lr-stats" style={{
                display: "flex", gap: 28, marginTop: 36,
                paddingTop: 28, borderTop: `1.5px solid ${C.offWhite}`,
              }}>
                {[
                  { value: "3 to 5",  label: "Ages"        },
                  { value: "Group",    label: "Up to 6 kids" },
                  { value: "45 min",   label: "Per class"   },
                  { value: "$25 per lesson", label: "Billed monthly" },
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
              <div className="lr-hero-photo-frame" style={{
                borderRadius: 24, overflow: "hidden",
                border: `3px solid ${C.crimson}60`,
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}>
                <img
                  className="lr-hero-img"
                  src="https://res.cloudinary.com/diy08lj9x/image/upload/v1789665708/efdeee15-a266-45b6-af4a-9b1178971a9b.png"
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

      </section>

      {/* ── INSTRUMENTS ──────────────────────────────────────────────────── */}
      <section className="lr-overview"
  style={{
    background: C.offWhite,
    padding: "72px 24px",
    position: "relative",
    overflow: "hidden",
  }}
>
        <div className="lr-content-container" style={{
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 32px",
}}>

          <div className="program-skill-heading" style={{ textAlign: "center", marginBottom: 48 }}>
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
            ].map(({ icon, name, soft }, index) => (
  <React.Fragment key={name}>

    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      width: 280,
    }}>
      <div className="lr-skill-icon" style={{
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
<div className="lr-feature-photo" style={{
  marginTop: 44,
  textAlign: "center",
}}>
  <img
    src="https://res.cloudinary.com/gozdpo8j/image/upload/v1783107188/Screenshot_2026-07-03_at_12.26.17_PM_xy5ozv.png"
    alt="Real musical instruments used in Little Rockers classes"
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
        <div className="lr-content-container">
          <div className="program-skill-heading"
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

          <div className="lr-class-grid" style={{
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
                photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1789665580/adc77596-5c61-421d-bb7e-3ba12c4e868d.png",
                alt: "Preschoolers singing with a teacher and having fun",
                title: "Sing & Express",
                body: "Songs, echo games, and playful repetition help children build confidence, communication, and listening skills.",
              },
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1789665302/fce30081-8609-4aba-bfe7-e4dee61cd40b.png",
                alt: "Variey of musical instruments for kids to explore",
                title: "Explore & Discover",
                body: "Children explore real instruments, exciting sounds, and musical textures through hands-on experiences that spark curiosity.",
              },
              {
                accent: C.teal,
                photoBg: C.tealPastel,
                photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1789665461/3ab8149c-c789-430c-87f9-3dd9f5c2dcf1.png",
                alt: "Preschoolers marching to music and playing percussion instrument",
                title: "Rhythm & Movement",
                body: "Through clapping, tapping, dancing, and rhythm games, children develop coordination, focus, balance, and a steady musical beat.",
              },
              {
                accent: C.yellow,
                photoBg: C.yellowPastel,
                photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1789665119/0845b607-75cb-4181-8a13-c9b026ec6f9a.png",
                alt: "Teacher telling stories through music and handgestures to preschoolers",
                title: "Stories & Imagination",
                body: "Music and storytelling come together to teach emotions, social skills, and early preschool concepts while inspiring creativity and imaginative play.",
              },
            ].map(({ photoBg, photo, alt, title, body }) => (
              <ProgramLearningCard key={title} orientation="vertical" photoBg={photoBg} photo={photo} alt={alt} title={title} body={body} />
            ))}
          </div>
        </div>
      </section>

      <ProgramReview testimonial={approvedTestimonial} />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="program-section lr-faq" style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: "clamp(26px, 3.4vw, 38px)", color: C.espresso,
            margin: "0 0 36px", textAlign: "center", lineHeight: 1.1,
          }}>
            Frequently asked questions
          </h2>
          <FAQList items={faqs} />
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="lr-closing">
        <div className="lr-content-container">
          <h2>Want to give it a try?</h2>
          <p className="lr-closing-body">Reach out and we will find a spot for your little one.</p>
          <div className="lr-closing-actions">
        <Button className="lr-primary-action" onClick={() => openModal("booking")}>Reserve a spot</Button>
        <Button className="lr-secondary-action" variant="secondary" accent={C.teal} onClick={() => openModal("tour")}>Book a tour</Button>
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
          </div>
        </div>
      </section>

      {/* Booking interstitial */}
      {interstitialOpen && !onRequestLessons && (
        <BookingInterstitial
          programName="Little Rockers"
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
