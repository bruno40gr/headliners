import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { C, fonts } from "./tokens";
import {
  Button,
  Bubble,
  WaveDivider,
  CTASection,
  FAQList,
  StatsGrid,
  Card,
  Eyebrow,
  globalStyles,
} from "./ui";
import ProgramsNav from "./ProgramsNav";
import BookingInterstitial from "./BookingInterstitial";

const instruments = [
  "Piano lessons",
  "Guitar lessons",
  "Voice lessons",
  "Drum lessons",
  "Bass lessons",
  "Ukulele lessons",
  "Violin lessons",
  "Cello lessons",
  "Brass lessons",
  "Woodwind lessons",
  "Music production lessons",
  "Songwriting lessons",
];

const lessonHeroSlides = [
  {
    src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1788825159/56fae6e6-bffd-4840-895f-d7f7b0660dbc.png",
    alt: "Student learning music during a private lesson at Headliner",
    caption: "Personalized music lessons that help students build a love for music",
  },
  {
    src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781715525/PXL_20260616_002552898.PORTRAIT_anjebq.jpg",
    alt: "Students working together during a semi-private lesson at Headliner",
    caption: "Private and semi-private lessons for kids, teens, and adults",
  },
  {
    src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1788654979/7fe87b12-7a1a-42be-8e09-55495b414fa0.png",
    alt: "Students performing together at Headliner",
    caption: "Performance opportunities",
  },
  {
    src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1788816126/f8314d17-4f1b-43bb-9369-7e3df42a1a7e.png",
    alt: "Headliner graduation ceremony",
    caption: "Graduation ceremonies",
  },
  {
    src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787862816/3c66ba38-627b-4fa6-8882-0413814d7b9f.png",
    alt: "Student performance opportunity at Headliner",
    caption: "Performance opportunities",
  },
];

const formatCards = [
  {
    title: "Private lessons",
    accent: C.teal,
    body: "Private lessons pair one student with one teacher. We can focus fully on that student's playing, pace, and goals.",
    points: ["One student with one teacher", "Room for close feedback", "Fits beginners through advanced players"],
  },
  {
    title: "Semi-private lessons",
    accent: C.yellow,
    body: "Semi-private lessons place two students with one teacher. They work best for siblings or friends who are close in age, level, or pace and want to learn together.",
    points: ["Two students in one lesson", "Good fit for siblings or friends", "Best when both students are close in level"],
  },
];

const pillars = [
  {
    title: "Technique",
    body: "Lessons cover the physical side of playing: posture, hand position, timing, tone, finger strength, sticking, breathing, and control at the instrument.",
    accent: C.teal,
  },
  {
    title: "Musicianship",
    body: "Students work on rhythm, listening, ear training, reading, and theory. We teach these skills at the student's level and keep them tied to the music they are learning.",
    accent: C.yellow,
  },
  {
    title: "Repertoire",
    body: "Students work on songs they enjoy and songs that push their playing forward.",
    accent: C.crimson,
  },
];

const faqs = [
  {
    q: "Who are lessons for?",
    a: "Kids, teens, and adults. We teach beginners, returning players, and students who already play and want better instruction.",
  },
  
  {
    q: "Do you offer online lessons?",
    a: "Yes. We offer Zoom lessons.",
  },
  {
    q: "Do I have to sign up monthly?",
    a: "No. We offer monthly enrollment and a la carte lessons.",
  },
  {
    q: "Is there a registration fee?",
    a: "No. There is no registration fee for lessons.",
  },
  {
    q: "Do students get chances to perform?",
    a: "Yes. We host monthly recitals. We also offer live performance opportunities for students who want them.",
  },
  {
    q: "Is financial support or charter funding available?",
    a: <>Yes. We work with charter schools and Self-Determination funding programs, and lessons can be paid through approved funding. See what that covers and how it works on our <a href="/about/funding-support" style={{ color: C.crimson, fontWeight: 600, textDecoration: "underline" }}>Funding Support page</a>.</>,
  },
];

export default function PrivateLessonsPage({ navigate, onRequestLessons }) {
  const [tourOpen, setTourOpen] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const showPreviousHeroSlide = () => {
    setActiveHeroSlide((current) => (current - 1 + lessonHeroSlides.length) % lessonHeroSlides.length);
  };
  const showNextHeroSlide = () => {
    setActiveHeroSlide((current) => (current + 1) % lessonHeroSlides.length);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveHeroSlide((current) => (current + 1) % lessonHeroSlides.length);
    }, 4600);

    return () => window.clearTimeout(timeout);
  }, [activeHeroSlide]);

  return (
    <div style={{ fontFamily: fonts.display, background: C.cream, color: C.text }}>
      <style>{globalStyles}</style>
      <style>{`
        @media (max-width: 900px) {
          .pl-hero-grid { grid-template-columns: 1fr !important; gap: 34px !important; }
          .pl-two-col { grid-template-columns: 1fr !important; }
          .pl-pillar-grid { grid-template-columns: 1fr !important; }
          .pl-stats { grid-template-columns: 1fr 1fr !important; }
          .pl-format-grid { grid-template-columns: 1fr !important; }
          .pl-instrument-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pl-photo-strip { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .pl-stats { grid-template-columns: 1fr !important; }
          .pl-instrument-grid { grid-template-columns: 1fr !important; }
          .pl-hero-section { padding-top: 100px !important; }
        }
      `}</style>

      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Request Lessons"
        onCtaClick={() => onRequestLessons && onRequestLessons("Private Lessons")}
      />

      <section
        className="pl-hero-section"
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: 120,
          paddingBottom: 76,
          paddingLeft: 24,
          paddingRight: 24,
          background: C.cream,
        }}
      >
        <Bubble top={-80} right={-60} size={280} color={C.tealPastel} opacity={0.75} />
        <Bubble bottom={50} left={-50} size={220} color={C.yellowPastel} opacity={0.8} />

        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          <div
            className="pl-hero-grid"
            style={{ display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: 56, alignItems: "center" }}
          >
            <div>
              <Eyebrow accent={C.teal}>Programs</Eyebrow>
              <h1 style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: "clamp(40px, 6vw, 68px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
                color: C.espresso,
                margin: "0 0 18px",
              }}>
                Private and semi-private music lessons
              </h1>
              <p style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: C.muted,
                maxWidth: 650,
                margin: "0 0 26px",
              }}>
                We teach kids, teens, and adults in one-on-one and semi-private lessons. Students work through Levels 1, 2, and 3 while building technique, rhythm, ear training, reading, theory, and song work.
              </p>
              

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 34 }}>
                <Button size="lg" onClick={() => onRequestLessons && onRequestLessons("Private Lessons")}>
                  Request lessons <ArrowRight size={16} />
                </Button>
                <Button variant="secondary" accent={C.teal} onClick={() => setTourOpen(true)}>
                  Book a tour
                </Button>
              </div>

              <div className="pl-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {[
                  { label: "Formats", value: "Private + semi-private", color: C.espresso },
                  { label: "Ages", value: "Kids to adults", color: C.tealDark },
                  { label: "Enrollment", value: "Monthly or a la carte", color: C.yellowDark },
                  { label: "Performances", value: "Monthly recitals", color: C.crimson },
                ].map((item) => (
                  <div key={item.label} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, padding: "18px 18px 16px" }}>
                    <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "none", color: C.muted }}>
                      {item.label}
                    </p>
                    <p style={{ margin: 0, fontFamily: fonts.display, fontWeight: 800, fontSize: 20, lineHeight: 1.2, color: item.color }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                top: -12,
                right: 12,
                zIndex: 2,
                background: C.yellow,
                color: C.espresso,
                borderRadius: 999,
                padding: "10px 18px",
                fontFamily: fonts.display,
                fontSize: 13,
                fontWeight: 800,
                transform: "rotate(4deg)",
              }}>
                No registration fee
              </div>
              <div style={{
                borderRadius: 28,
                overflow: "hidden",
                border: `2px solid ${C.teal30}`,
                boxShadow: "0 18px 50px rgba(26,19,15,0.10)",
                background: C.white,
                position: "relative",
              }}>
                {lessonHeroSlides.map((slide, index) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={index === activeHeroSlide ? slide.alt : ""}
                    aria-hidden={index !== activeHeroSlide}
                    style={{ position: index === 0 ? "relative" : "absolute", inset: 0, width: "100%", height: 560, objectFit: "cover", display: "block", opacity: index === activeHeroSlide ? 1 : 0, transition: "opacity 0.9s ease" }}
                  />
                ))}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,19,15,0.66) 0%, transparent 45%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "50%", left: 16, right: 16, display: "flex", justifyContent: "space-between", transform: "translateY(-50%)" }}>
                  <button type="button" onClick={showPreviousHeroSlide} aria-label="Show previous lesson photo" style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.55)", background: "rgba(26,19,15,0.5)", color: C.white, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)" }}>
                    <ArrowLeft size={20} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={showNextHeroSlide} aria-label="Show next lesson photo" style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.55)", background: "rgba(26,19,15,0.5)", color: C.white, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)" }}>
                    <ArrowRight size={20} aria-hidden="true" />
                  </button>
                </div>
                <div style={{ position: "absolute", left: 22, right: 22, bottom: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                  <p key={activeHeroSlide} style={{ margin: 0, color: C.white, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, lineHeight: 1.45, maxWidth: 280, animation: "fadeUp 0.45s ease both" }}>
                    {lessonHeroSlides[activeHeroSlide].caption}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    {lessonHeroSlides.map((slide, index) => (
                      <button key={slide.src} type="button" onClick={() => setActiveHeroSlide(index)} aria-label={`Show lesson photo ${index + 1}`} style={{ width: index === activeHeroSlide ? 20 : 7, height: 7, padding: 0, border: "none", borderRadius: 999, cursor: "pointer", background: index === activeHeroSlide ? C.yellow : "rgba(255,255,255,0.55)", transition: "width 0.25s ease, background 0.25s ease" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <WaveDivider from={C.cream} to={C.offWhite} direction="down" />
      </section>

      <section style={{ background: C.offWhite, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: 34 }}>
            <Eyebrow accent={C.teal}>Our lesson formats</Eyebrow>
              <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.03em", color: C.espresso, margin: "0 0 14px" }}>
              Lessons at your own pace
            </h2>
            
          </div>

          <div className="pl-format-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {formatCards.map((card) => (
              <Card key={card.title} accent={card.accent} style={{ borderRadius: 24 }}>
                <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 28, color: C.espresso, margin: "0 0 14px", lineHeight: 1 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, margin: "0 0 18px" }}>
                  {card.body}
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, color: C.muted, lineHeight: 1.85, fontSize: 15 }}>
                  {card.points.map((point) => (
                    <li key={point} style={{ marginBottom: 8 }}>{point}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.white, padding: "82px 24px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
<div className="pl-two-col" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 42, alignItems: "start" }}>
<div>
<Eyebrow accent={C.teal}>What happens in lessons</Eyebrow>
<h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.03em", color: C.espresso, margin: "0 0 16px" }}>
                What we teach
</h2>
<p style={{ fontSize: 17, lineHeight: 1.85, color: C.muted, margin: "0 0 20px" }}>
                Every student learns from our own curriculum, developed exclusively for our school by our qualified staff and overseen by our Academic Director.
</p>
<p style={{ fontSize: 17, lineHeight: 1.85, color: C.muted, margin: 0 }}>
                We also stay flexible around what students actually need. A younger beginner may work on rhythm, posture, and hand placement. A teen may focus on stronger timing and full songs. An adult may want to rebuild fundamentals or get back into playing after time away.
</p>
</div>

<div className="pl-pillar-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
{pillars.map((pillar) => (
<div key={pillar.title} style={{ background: C.cream, border: `1.5px solid ${pillar.accent}50`, borderRadius: 20, padding: "24px 24px 22px" }}>
<h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 24, color: C.espresso, margin: "0 0 10px", lineHeight: 1.05 }}>
{pillar.title}
</h3>
<p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: C.muted }}>
{pillar.body}
</p>
</div>
              ))}
</div>
</div>

</div>
</section>

      <section style={{ background: C.cream, padding: "82px 24px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ maxWidth: 780, marginBottom: 28 }}>
            <Eyebrow accent={C.teal}>Instruments we teach</Eyebrow>
            <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.03em", color: C.espresso, margin: "0 0 16px" }}>
              Dedicated teachers for these instruments
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: C.muted, margin: 0 }}>
              Lessons are organized by Levels 1, 2, and 3, so students have a clear path whether they are starting fresh, building fundamentals, or ready for more advanced work.
            </p>
          </div>

          <div className="pl-instrument-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 30 }}>
            {instruments.map((item, index) => (
              <div
                key={item}
                style={{
                  background: C.white,
                  border: `1.5px solid ${index % 3 === 0 ? C.teal30 : index % 3 === 1 ? C.yellow50 : C.crimson15}`,
                  borderRadius: 18,
                  padding: "18px 16px",
                  minHeight: 72,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "0 12px 30px rgba(26,19,15,0.06)",
                }}
              >
                <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 21, lineHeight: 1.05, color: C.espresso, margin: 0 }}>
                  {item}
                </h3>
              </div>
            ))}
          </div>

          <StatsGrid
            columns={3}
            items={[
              { label: "Lesson path", value: "Levels 1, 2, and 3", color: C.tealDark },
              { label: "Lesson formats", value: "Private and semi-private", color: C.yellowDark },
              { label: "Performance options", value: "Monthly recitals and live opportunities", color: C.crimson },
            ]}
          />
        </div>
      </section>

      <section style={{ background: C.white, padding: "82px 24px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div className="pl-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, alignItems: "start" }}>
            <div>
              <Eyebrow accent={C.teal}>Performance opportunities</Eyebrow>
              <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.03em", color: C.espresso, margin: "0 0 16px" }}>
                Monthly recitals and live performance opportunities
              </h2>
             
              <p style={{ fontSize: 17, lineHeight: 1.85, color: C.muted, margin: 0 }}>
                We also offer live performance opportunities for students who want more stage time. Lessons can support recital prep, band prep, and live set prep.
              </p>
            </div>

            <div style={{
              borderRadius: 24,
              overflow: "hidden",
              border: `1.5px solid ${C.border}`,
              boxShadow: "0 18px 50px rgba(26,19,15,0.10)",
              background: C.white,
            }}>
              <img
                src="https://res.cloudinary.com/diy08lj9x/image/upload/v1787854782/f797c6b9-6819-4759-9e0e-7ca1bb43a4d0.png"
                alt="Student performing on stage"
                style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.offWhite, padding: "80px 24px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <Eyebrow accent={C.teal}>Questions families actually ask</Eyebrow>
          <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1, letterSpacing: "-0.03em", color: C.espresso, margin: "0 0 24px" }}>
            Questions about lessons
          </h2>
          <FAQList items={faqs} />
        </div>
      </section>

      <CTASection
        eyebrow="Ready when you are"
        title="Request lessons"
        body="Tell us the student's age, instrument, and whether you want private or semi-private lessons."
        accent={C.teal}
      >
        <Button onClick={() => onRequestLessons && onRequestLessons("Private Lessons")}>Request lessons</Button>
        <Button variant="secondary" accent={C.teal} onClick={() => setTourOpen(true)}>Book a tour</Button>
      </CTASection>

      {tourOpen && (
        <BookingInterstitial
          programName="Private Lessons"
          programColor={C.teal}
          opusL1="https://headlinermusicacademy.com"
          opusL2="https://headlinermusicacademy.com"
          opusL3="https://headlinermusicacademy.com"
          initialScreen={2}
          onClose={() => setTourOpen(false)}
          emailjsServiceId="service_734y6qg"
          emailjsTemplateId="template_czlclec"
          emailjsPublicKey="FdW-lGbAyQuJZFy-y"
        />
      )}
    </div>
  );
}