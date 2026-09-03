import { ArrowRight } from "lucide-react";
import ProgramsNav from "./ProgramsNav";
import { C, fonts } from "./tokens";
import { Button, Bubble, CTASection, Eyebrow, globalStyles } from "./ui";

const providers = [
  "Alta California Regional Center",
  "South Sutter",
  "ACE FMS",
  "Mains'l",
  "Aveanna",
];

export default function FundingSupportPage({ navigate, onRequestLessons }) {
  return (
    <div style={{ fontFamily: fonts.body, background: C.cream, color: C.text }}>
      <style>{globalStyles}</style>
      <style>{`
        @media (max-width: 920px) {
          .fsp-hero-grid,
          .fsp-body-grid,
          .fsp-provider-grid {
            grid-template-columns: 1fr !important;
          }

          .fsp-body-grid.reverse > :first-child { order: 2; }
          .fsp-body-grid.reverse > :last-child { order: 1; }
        }
      `}</style>

      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Request Lessons"
        onCtaClick={() => onRequestLessons && onRequestLessons("")}
      />

      <section style={{ background: C.espresso, color: C.white, padding: "118px 24px 110px", position: "relative", overflow: "hidden" }}>
        <Bubble top={-90} right={-70} size={280} color={C.white07} />
        <Bubble bottom={-120} left={-90} size={260} color={C.white07} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="fsp-hero-grid" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 48, alignItems: "center" }}>
            <div>
              <Eyebrow accent={C.teal}>Funding support</Eyebrow>
              <h1 style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: "clamp(42px, 6vw, 70px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
                margin: "0 0 20px",
              }}>
                Music though approved funding
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.72, color: C.white70, maxWidth: 640, margin: 0 }}>
                Music instruction and experiences built around each student’s interests, comfort, and goals. We work with charter school and self-determination funding programs.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
                <Button onClick={() => onRequestLessons && onRequestLessons("")} size="lg">
                  Request lessons <ArrowRight size={16} />
                </Button>
                <Button href="tel:916-435-1300" variant="ghost" size="lg">Call the academy</Button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                width: "100%",
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${C.white15}`,
                boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
                background: C.white,
              }}>
                <img
                  src="https://res.cloudinary.com/diy08lj9x/image/upload/v1781715525/PXL_20260616_002552898.PORTRAIT_anjebq.jpg"
                  alt="Headliner students making music together"
                  style={{ width: "100%", height: 460, objectFit: "cover", objectPosition: "center 30%", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.white, padding: "100px 24px" }}>
        <div className="fsp-body-grid" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 48, alignItems: "center" }}>
          <div>
            <Eyebrow accent={C.teal}>Self-determination funding</Eyebrow>
            <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.03em", color: C.espresso, margin: "0 0 14px" }}>
              Experiences that lead somewhere
            </h2>

            <div style={{ display: "grid", gap: 14, maxWidth: 760 }}>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: C.muted }}>
                Headliner can support students using Self-Determination funding under Community Integration, Service Code 331.
              </p>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: C.muted }}>
                Music can support goals around communication, socialization, independence, self-advocacy, and participation in the community while giving students a comfortable place to learn and engage at their own pace.
              </p>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: C.muted }}>
                Students can learn one-on-one or in small groups, join monthly recitals, and grow into bands and live performance over time.
              </p>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: C.muted }}>
                Our teachers are background checked, and lessons are built around each student's comfort, interests, and goals.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: "100%",
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${C.border}`,
              boxShadow: "0 16px 40px rgba(42,18,8,0.08)",
              background: C.white,
            }}>
              <img
                src="https://res.cloudinary.com/diy08lj9x/image/upload/v1787862816/3c66ba38-627b-4fa6-8882-0413814d7b9f.png"
                alt="Student performing on stage"
                style={{ width: "100%", height: 420, objectFit: "cover", objectPosition: "center 35%", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.cream, padding: "100px 24px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 32px" }}>
            <Eyebrow accent={C.teal} style={{ justifyContent: "center" }}>Approved programs</Eyebrow>
            <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.03em", color: C.espresso, margin: 0 }}>
              Already approved with several programs
            </h2>
          </div>

          <div className="fsp-provider-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 920, margin: "0 auto" }}>
            {providers.map((provider) => (
              <div key={provider} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 18px 16px" }}>
                <p style={{ margin: 0, fontFamily: fonts.display, fontWeight: 800, fontSize: 20, lineHeight: 1.2, color: C.espresso }}>
                  {provider}
                </p>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onRequestLessons && onRequestLessons("")}
              style={{
                background: C.white07,
                border: `1px dashed ${C.border}`,
                borderRadius: 14,
                padding: "18px 18px 16px",
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <p style={{ margin: 0, fontFamily: fonts.display, fontWeight: 800, fontSize: 20, lineHeight: 1.2, color: C.espresso }}>
                Don&apos;t see your program?
              </p>
              <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.7, color: C.muted }}>
                Contact us.
              </p>
            </button>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Getting started"
        title="Interested in using funding at Headliner?"
        body="Tell us which program or funding source you’re working with and we’ll help you get started."
        accent={C.teal}
      >
        <Button onClick={() => onRequestLessons && onRequestLessons("")}>Request services</Button>
        <Button variant="secondary" accent={C.teal} href="tel:916-435-1300">Call (916) 435-1300</Button>
      </CTASection>
    </div>
  );
}