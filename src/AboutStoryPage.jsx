import ProgramsNav from "./ProgramsNav";
import { C, fonts } from "./tokens";
import { globalStyles } from "./ui";

export default function AboutStoryPage({ navigate }) {
  return (
    <div style={{ fontFamily: fonts.body, background: C.cream, color: C.text }}>
      <style>{globalStyles}</style>
      <style>{`
        @media (max-width: 920px) {
          .about-story-content {
            padding-top: 120px !important;
            padding-bottom: 88px !important;
          }

          .about-story-image img {
            height: 360px !important;
          }

          .about-story-title {
            margin-bottom: 24px !important;
          }

          .about-story-lede {
            font-size: 22px !important;
            line-height: 1.45 !important;
          }

          .about-story-body {
            font-size: 17px !important;
            line-height: 1.85 !important;
          }

          .about-story-signature {
            font-size: 30px !important;
          }
        }

        @media (max-width: 560px) {
          .about-story-content {
            padding-top: 108px !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
            padding-bottom: 72px !important;
          }

          .about-story-image {
            margin-bottom: 28px !important;
          }

          .about-story-image img {
            height: 280px !important;
          }

          .about-story-title {
            font-size: 34px !important;
          }

          .about-story-copy {
            gap: 18px !important;
          }

          .about-story-lede {
            font-size: 20px !important;
          }

          .about-story-body {
            font-size: 16px !important;
            line-height: 1.75 !important;
          }

          .about-story-signature {
            font-size: 26px !important;
          }
        }
      `}</style>

      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Request Lessons"
      />

      <section className="about-story-content" style={{ background: C.white, padding: "164px 24px 112px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h1 className="about-story-title" style={{ fontFamily: fonts.displaySerious, fontWeight: 800, fontSize: "clamp(38px, 5vw, 60px)", lineHeight: 0.98, letterSpacing: "-0.03em", color: C.espresso, margin: "0 0 32px" }}>
            About Us
          </h1>

          <div className="about-story-image" style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: `0 16px 40px ${C.espresso06}`, background: C.white, marginBottom: 38 }}>
            <img
              src="https://res.cloudinary.com/diy08lj9x/image/upload/v1788312254/9fd46acb-1557-437d-8776-5c969e96687f.png"
              alt="Bruno and Lorena at Headliner Music Academy"
              style={{ width: "100%", height: 520, objectFit: "cover", objectPosition: "center center", display: "block" }}
            />
          </div>

          <div className="about-story-copy" style={{ display: "grid", gap: 22 }}>
            <p className="about-story-lede" style={{ fontSize: 24, lineHeight: 1.5, color: C.espresso, margin: 0, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Our vision is to make music a meaningful and accessible part of people’s lives.
            </p>
            <p className="about-story-body" style={{ fontSize: 18, lineHeight: 1.95, color: C.text, margin: 0 }}>
              Headliner has been part of the community for over 10 years, originally operating under a franchise. Now, Bruno and Lorena are proud to carry that legacy forward, bringing their experience in music and operations while building on the strong foundation created by David and Mel.
            </p>
            <p className="about-story-body" style={{ fontSize: 18, lineHeight: 1.95, color: C.text, margin: 0 }}>
              We continue to specialize in private and semi-private lessons, while also expanding our band program, professional recording and production offerings, and birthday parties and event experiences.
            </p>
            <p className="about-story-body" style={{ fontSize: 18, lineHeight: 1.95, color: C.text, margin: 0 }}>
              Our vision is to make music a lasting and accessible part of people’s lives by providing thoughtful instruction, meaningful experiences both on and off the stage, and a supportive community. Through a range of programs, we work to support each student’s individual needs with care, passion, and personal attention.
            </p>
            <p className="about-story-body" style={{ fontSize: 18, lineHeight: 1.95, color: C.text, margin: 0 }}>
              We’re excited about what’s ahead for Headliner, and we’d love to welcome you into our community.
            </p>
            <p className="about-story-signature" style={{ fontSize: 34, lineHeight: 1.2, color: C.espresso, margin: "10px 0 0", fontFamily: '"Snell Roundhand", "Segoe Script", "Apple Chancery", "Brush Script MT", cursive' }}>
              Bruno, Lorena and Noah
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}