import { ArrowRight } from "lucide-react";
import { C, fonts } from "./tokens";
import ProgramsNav from "./ProgramsNav";
import {
  Button,
  Bubble,
  CTASection,
  Card,
  Eyebrow,
  FAQList,
  TextBlock,
  globalStyles,
} from "./ui";

const heroImage = {
  image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854919/e8dfe1ae-2f43-41c7-9528-5b459eafdadd.png",
  alt: "Headliner performance stage with live sound setup",
};

const goodForList = [
  "Parties and private events",
  "School functions and assemblies",
  "Student showcases and performances",
  "Community events and fundraisers",
  "Presentations and ceremonies",
  "Live music and bands",
];

const howItWorks = [
  "Send us the date, location, event type and approximate audience size. Include any live music or performers.",
  "We put together a setup based on the venue and what needs to happen during the event.",
  "Choose the level of support you want, equipment rental on its own or full setup with sound support during the event.",
];

const setupOptions = [
  {
    name: "Small speech or small event",
    audience: "Up to about 50 guests",
    body:
      "A compact setup for announcements, ceremonies, classrooms and smaller gatherings, typically built around a powered speaker, a wired microphone, a stand and the cables needed to make it work.",
  },
  {
    name: "Standard party or event",
    audience: "About 50 to 150 guests",
    body:
      "A fuller setup for school functions, parties and community events with mixed music and speech, using the right speaker combination for the room along with microphones, stands, mixer support and cabling.",
  },
  {
    name: "Live band or showcase",
    audience: "150 to 300 plus guests or outdoor use",
    body:
      "A larger-format setup for performances and bigger events with mains, mixing, performer monitoring and the option for wireless microphones and live sound support when the event calls for it.",
  },
];

const addOns = [
  "DMX lighting",
  "Extra microphones",
  "Setup and teardown",
  "Live sound support",
];

const faqs = [
  { q: "How much does it cost to rent a PA system?", a: "Pricing depends on the size of the event, the venue and the equipment involved. Send us the date, location, event type and audience size and we'll put a quote together." },
  { q: "Do I need to know what equipment I need?", a: "No. Tell us what you're planning and we'll figure out the right setup." },
  { q: "Can you run sound during the event?", a: "Yes, ask about live sound support and we'll talk through what your event needs." },
];

export default function ServicesPaRentalPage({ navigate, onRequestLessons }) {
  return (
    <div style={{ fontFamily: fonts.body, background: C.cream, color: C.text, overflowX: "hidden" }}>
      <style>{globalStyles}</style>
      <style>{`
        @media (max-width: 980px) {
          .par-hero-grid,
          .par-split,
          .par-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Request Lessons"
        onCtaClick={() => onRequestLessons && onRequestLessons("")}
      />

      {/* HERO */}
      <section style={{ background: C.espresso, color: C.white, padding: "118px 24px 84px", position: "relative", overflow: "hidden" }}>
        <Bubble top={-90} right={-70} size={300} color={C.white07} />
        <Bubble bottom={-120} left={-90} size={280} color={C.white07} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 38%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="par-hero-grid" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 44, alignItems: "center" }}>
            <div>
              <Eyebrow accent={C.teal}>Live sound</Eyebrow>
              <TextBlock as="h1" variant="display" accent={C.white} style={{ fontFamily: fonts.displaySerious, fontSize: "clamp(42px, 6vw, 70px)", marginBottom: 20 }}>
                PA System Rental in Rocklin
              </TextBlock>
              <TextBlock style={{ color: C.white70, fontSize: 18, lineHeight: 1.72, maxWidth: 580, marginBottom: 28 }}>
                Sound for parties, performances, school events, community events and more.
              </TextBlock>
              <TextBlock style={{ color: C.white70, fontSize: 16, lineHeight: 1.72, maxWidth: 580, marginBottom: 28 }}>
                Tell us about your event and we'll put together the right setup, speakers, microphones, mixing and support as needed.
              </TextBlock>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button onClick={() => onRequestLessons && onRequestLessons("")} size="lg">Get a quote <ArrowRight size={16} /></Button>
                <Button href="mailto:admin@headlinermusicacademy.com" variant="ghost" size="lg">Email us</Button>
              </div>
            </div>

            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: `1px solid ${C.white15}`, boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}>
              <img
                src={heroImage.image}
                alt={heroImage.alt}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BRING */}
      <section style={{ background: C.white, padding: "72px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Eyebrow accent={C.teal}>What we bring</Eyebrow>
          <TextBlock as="h2" variant="heading" style={{ fontFamily: fonts.displaySerious, marginBottom: 14 }}>
            Sound sized to the room and the crowd
          </TextBlock>
          <TextBlock style={{ marginBottom: 0 }}>
            Full sound systems built around your venue, speakers in a range of wattage, reach and power, wired and wireless microphones, channel mixers, stands, cables and monitors. We handle delivery, setup and live sound support when you want it, or just the rental if you've got it covered.
          </TextBlock>
        </div>
      </section>

      {/* SETUP OPTIONS */}
      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: 28 }}>
            <Eyebrow accent={C.teal}>Setup options</Eyebrow>
            <TextBlock as="h2" variant="heading" style={{ fontFamily: fonts.displaySerious, marginBottom: 14 }}>
              Common setups we build from our in-house gear
            </TextBlock>
            <TextBlock style={{ marginBottom: 0 }}>
              These are a few typical directions based on guest count, venue and what needs to happen during the event. If you are not sure what fits, we will help you choose the right setup.
            </TextBlock>
          </div>
          <div className="par-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {setupOptions.map((option) => (
              <Card key={option.name} accent={C.teal} radius={14} style={{ height: "100%", padding: "26px 24px" }}>
                <TextBlock as="span" variant="caption" style={{ color: C.teal, fontSize: 13, fontWeight: 700, marginBottom: 10, display: "block" }}>
                  {option.audience}
                </TextBlock>
                <TextBlock as="h3" style={{ fontFamily: fonts.displaySerious, fontSize: 28, lineHeight: 1.15, marginBottom: 12 }}>
                  {option.name}
                </TextBlock>
                <TextBlock style={{ marginBottom: 0 }}>{option.body}</TextBlock>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* OPTIONAL ADD-ONS */}
      <section style={{ background: C.white, padding: "72px 24px" }}>
        <div className="par-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 36, alignItems: "start" }}>
          <div>
            <Eyebrow accent={C.teal}>Optional add-ons</Eyebrow>
            <TextBlock as="h2" variant="heading" style={{ fontFamily: fonts.displaySerious, marginBottom: 14 }}>
              Add support when your event needs more
            </TextBlock>
            <TextBlock style={{ marginBottom: 0 }}>
              Keep it simple with a basic rental, or add the extra support that makes setup and event flow easier.
            </TextBlock>
          </div>
          <Card accent={C.teal} radius={14}>
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 12, color: C.text, lineHeight: 1.6, fontWeight: 500, fontSize: 16, fontFamily: fonts.body }}>
              {addOns.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <Eyebrow accent={C.teal}>How it works</Eyebrow>
            <TextBlock as="h2" variant="heading" style={{ fontFamily: fonts.displaySerious, marginBottom: 0 }}>
              From event details to a working setup
            </TextBlock>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 26 }}>
            {howItWorks.map((body, i) => (
              <li key={body} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <TextBlock as="span" style={{ color: C.teal, fontFamily: fonts.displaySerious, fontWeight: 800, fontSize: 20, lineHeight: 1.5, flexShrink: 0, minWidth: 62 }}>
                  Step {i + 1}
                </TextBlock>
                <TextBlock style={{ marginBottom: 0, paddingTop: 4 }}>{body}</TextBlock>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GOOD FOR */}
      <section style={{ background: C.white, padding: "72px 24px" }}>
        <div className="par-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 36, alignItems: "start" }}>
          <div>
            <Eyebrow accent={C.teal}>Good for</Eyebrow>
            <TextBlock as="h2" variant="heading" style={{ fontFamily: fonts.displaySerious, marginBottom: 14 }}>
              Sound for every kind of event
            </TextBlock>
            <TextBlock style={{ marginBottom: 0 }}>
              From private parties to school assemblies and live music, we can put together a setup that fits.
            </TextBlock>
          </div>
          <Card accent={C.teal} radius={14}>
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 12, color: C.text, lineHeight: 1.6, fontWeight: 500, fontSize: 16, fontFamily: fonts.body }}>
              {goodForList.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div className="par-split" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "0.78fr 1.22fr", gap: 40, alignItems: "start" }}>
          <div>
            <Eyebrow accent={C.teal}>FAQ</Eyebrow>
            <TextBlock as="h2" variant="heading" style={{ fontFamily: fonts.displaySerious, marginBottom: 14 }}>
              Frequently asked questions
            </TextBlock>
            <TextBlock>
              If your question is not here, reach out and we can talk through it.
            </TextBlock>
          </div>
          <FAQList items={faqs} questionFontFamily={fonts.displaySerious} />
        </div>
      </section>

      <CTASection title="Get a quote" body="Send us the date, venue, guest count and what you're planning. We'll take it from there." accent={C.teal}>
        <Button onClick={() => onRequestLessons && onRequestLessons("")}>Get a quote</Button>
        <Button href="mailto:admin@headlinermusicacademy.com" variant="ghost">Email us</Button>
      </CTASection>
    </div>
  );
}
