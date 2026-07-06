import React from "react";
import { C, fonts } from "./tokens";
import { Eyebrow, Chip, globalStyles as gs } from "./ui";
import LightingVisualization from "./LightingVisualization";

/* ═══════════════════════════════════════════════════════════════════════════
   INTERNAL BAND PROGRAM — Staff Reference
   Not linked from any public nav. Accessible only by knowing the URL.
   Single long-scrolling page with sticky left sidebar navigation.
   ═══════════════════════════════════════════════════════════════════════════ */

const SIDEBAR_WIDTH = 260;

const navItems = [
  { id: "vision", label: "Headliner's Vision" },
  { id: "included", label: "What's Included" },
  { id: "join", label: "How Bands Join" },
  { id: "band-manager", label: "Band Manager Role" },
  { id: "event-manager", label: "Event & Production Manager" },
  { id: "social", label: "Social Media" },
  { id: "performance", label: "Performance Readiness" },
  { id: "lighting", label: "Lighting System" },
  { id: "levels-overview", label: "Levels Overview" },
  { id: "level-1", label: "Level 1: Foundation" },
  { id: "level-2", label: "Level 2: Growth" },
  { id: "level-3", label: "Level 3: Ready for Stage" },
  { id: "graduation", label: "Graduation Ceremony" },
];

/* ─── Helpers ──────────────────────────────────────────────────────────── */
const Section = ({ id, children, style }) => (
  <section id={id} style={{ padding: "64px 0 72px", borderBottom: `1px solid ${C.border}`, ...style }}>
    {children}
  </section>
);

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontFamily: fonts.display, fontWeight: 800,
    fontSize: "clamp(24px, 3.5vw, 36px)", color: C.espresso,
    margin: "0 0 28px", lineHeight: 1.05, letterSpacing: "-0.02em",
  }}>
    {children}
  </h2>
);

const Body = ({ children, style }) => (
  <p style={{
    fontFamily: fonts.body, fontSize: 16, lineHeight: 1.85, color: C.muted,
    margin: "0 0 20px", ...style,
  }}>
    {children}
  </p>
);

const SubTitle = ({ children, style }) => (
  <h3 style={{
    fontFamily: fonts.display, fontWeight: 700,
    fontSize: 20, color: C.espresso,
    margin: "32px 0 12px", lineHeight: 1.2, ...style,
  }}>
    {children}
  </h3>
);

const CardGrid = ({ cols = 2, children }) => (
  <div className="ibp-cardgrid" style={{
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: 24, marginTop: 24,
  }}>
    {children}
  </div>
);

const InfoCard = ({ accent = C.crimson, title, children }) => (
  <div style={{
    background: C.white, borderRadius: 16,
    border: `1.5px solid ${accent}40`,
    padding: "28px",
    boxShadow: "0 8px 24px rgba(42,18,8,0.06)",
  }}>
    {title && (
      <h4 style={{
        fontFamily: fonts.display, fontWeight: 800,
        fontSize: 18, color: C.espresso, margin: "0 0 12px",
      }}>
        {title}
      </h4>
    )}
    {children}
  </div>
);

const BulletList = ({ items }) => (
  <ul style={{
    fontFamily: fonts.body, fontSize: 15, lineHeight: 1.9, color: C.muted,
    margin: "8px 0 20px", padding: "0 0 0 0",
    listStyle: "disc outside",
  }}>
    {items.map((item, i) => (
      <li key={i} style={{ marginBottom: 6, paddingLeft: 4, marginLeft: 18 }}>{item}</li>
    ))}
  </ul>
);

const HighlightBox = ({ accent = C.yellow, children }) => (
  <div style={{
    background: `${accent}12`, border: `1.5px solid ${accent}50`,
    borderRadius: 12, padding: "18px 24px", margin: "20px 0",
  }}>
    <p style={{
      fontFamily: fonts.body, fontSize: 15, lineHeight: 1.75, color: C.text,
      margin: 0,
    }}>
      {children}
    </p>
  </div>
);

const ChipRow = ({ items, accent = C.crimson }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
    {items.map(s => <Chip key={s} label={s} accent={accent} />)}
  </div>
);

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function InternalBandProgram() {
  return (
    <div style={{ fontFamily: fonts.body, background: C.cream, color: C.text, minHeight: "100vh" }}>
      <style>{gs}</style>
      <style>{`
        @media (max-width: 900px) {
          .ibp-layout { flex-direction: column !important; }
          .ibp-sidebar { display: none !important; }
          .ibp-content { margin-left: 0 !important; padding: 60px 20px 80px !important; }
          .ibp-cardgrid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .ibp-content { padding: 80px 36px 100px !important; }
          .ibp-cardgrid[style*="repeat(3,"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        html { scroll-behavior: smooth; }
        .ibp-sidebar a { transition: all 0.15s; }
        .ibp-sidebar a:hover { color: ${C.crimson} !important; }
      `}</style>

      {/* ── Banner ────────────────────────────────────────────────────── */}
      <div style={{
        background: C.espresso, color: C.yellow,
        textAlign: "center", padding: "12px 24px",
        fontFamily: fonts.body, fontSize: 13, fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        ⚠️ Internal Staff Reference — Not publicly linked
      </div>

      <div className="ibp-layout" style={{ display: "flex" }}>

        {/* ── STICKY SIDEBAR ─────────────────────────────────────────── */}
        <nav className="ibp-sidebar" style={{
          position: "sticky", top: 0,
          width: SIDEBAR_WIDTH, minWidth: SIDEBAR_WIDTH,
          height: "100vh", overflowY: "auto",
          background: C.white, borderRight: `1px solid ${C.border}`,
          padding: "40px 24px",
          boxSizing: "border-box",
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: 14, color: C.espresso, marginBottom: 28,
            letterSpacing: "-0.01em",
          }}>
            Band Program<br />
            <span style={{ color: C.crimson, fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Staff Reference
            </span>
          </div>

          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                display: "block", padding: "7px 0",
                fontFamily: fonts.body, fontSize: 13,
                color: C.muted, textDecoration: "none",
                lineHeight: 1.4,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
        <div className="ibp-content" style={{
          flex: 1, marginLeft: 0,
          padding: "80px 64px 100px",
          maxWidth: 900,
        }}>

          {/* ── HERO ─────────────────────────────────────────────────── */}
          <div style={{ marginBottom: 48 }}>
            <Eyebrow accent={C.teal}>Internal Documentation</Eyebrow>
            <h1 style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 0.95,
              letterSpacing: "-0.03em", color: C.espresso,
              margin: "0 0 16px",
            }}>
              Band Program
            </h1>
            <Body style={{ fontSize: 18, maxWidth: 640 }}>
              Everything you need to know about how the band program works — for Band Managers, staff, and anyone involved in delivering the Headliner band experience.
            </Body>
          </div>

          {/* ── VISION ────────────────────────────────────────────────── */}
          <Section id="vision">
            <SectionTitle>Headliner's Vision</SectionTitle>
            <Body>
              The Headliner Band Program exists to help individual musicians become confident performers through collaboration, creativity, and regular live performance. Students learn far more than how to play their instrument. They learn to listen, communicate, solve problems together, and take ownership of a shared musical vision.
            </Body>
            <Body>
              For Headliner, the Band Program is more than another class. It is the academy's flagship experience and a cornerstone of our long-term vision. Strong bands create memorable performances, strengthen our community, build lasting relationships with local venues, and inspire new students to join the academy. By investing in our bands, we create opportunities for our students while building a program that benefits the entire Headliner community.
            </Body>

            <HighlightBox accent={C.teal}>
              <strong>How we work with bands:</strong> Bands join in one of two ways — we assemble them internally (matching level, instrument, and interests), or an already-formed band comes to us directly. From there, we help with creative direction, mentorship, membership, setlists, and sound. Our goal is to help each band find and shape their identity.
            </HighlightBox>

            <CardGrid cols={3}>
              <InfoCard accent={C.yellow} title="Bands Lead the Way">
                <Body style={{ fontSize: 14 }}>Each band decides who joins, what songs to play, and the direction they want to take. Headliner provides guidance, coaching, and support — but the band makes the decisions.</Body>
              </InfoCard>
              <InfoCard accent={C.crimson} title="Performance First">
                <Body style={{ fontSize: 14 }}>Live performance is the reason the program exists. Every rehearsal, song selection, and practice session prepares bands for the stage and a real audience.</Body>
              </InfoCard>
              <InfoCard accent={C.teal} title="Clear Communication">
                <Body style={{ fontSize: 14 }}>Bands and families stay informed every step of the way. Your Band Manager is your single point of contact for everything — updates, progression, and gigs.</Body>
              </InfoCard>
            </CardGrid>
          </Section>

          {/* ── WHAT'S INCLUDED ────────────────────────────────────────── */}
          <Section id="included">
            <SectionTitle>What's Included</SectionTitle>
            <BulletList items={[
              "Weekly Band Manager-led session (60 minutes)",
              "Self-directed rehearsal: 1 hour per month in the performance room, no Band Manager present",
              "Private lesson credit (Levels 2 & 3): 1 session per month per member, dedicated to setlist work. Already a private lesson student? You get 1 additional credit.",
            ]} />
          </Section>

          {/* ── HOW BANDS JOIN ─────────────────────────────────────────── */}
          <Section id="join">
            <SectionTitle>How Bands Join</SectionTitle>

            <SubTitle>Assessment Session</SubTitle>
            <Body>Every new band starts with a <strong>30-minute placement session</strong>: 2-3 songs in front of a faculty member, to find the right level to begin from. Most bands land at Level 2 or above. All bands receive a weekly 60-minute Band Manager-led session.</Body>

            <SubTitle>Two Ways In</SubTitle>

            <CardGrid>
              <InfoCard accent={C.crimson} title="Internally Formed">
                <Body style={{ fontSize: 14 }}>
                  We match existing students by instrument, level, and musical interests. We suggest the lineup and facilitate the first meeting; the band takes over from there. Need a new member later? We help facilitate the audition.
                </Body>
              </InfoCard>
              <InfoCard accent={C.teal} title="Externally Formed">
                <Body style={{ fontSize: 14 }}>
                  Already-formed bands are welcome — we actively recruit them. They bring their own identity; we build the program around it. Same placement session, same levels, same support.
                </Body>
              </InfoCard>
            </CardGrid>
          </Section>

          {/* ── BAND MANAGER ───────────────────────────────────────────── */}
          <Section id="band-manager">
            <SectionTitle>Band Manager Role</SectionTitle>
            <Body>
              Every band has a dedicated Band Manager — the primary point of contact between the band, their families, and the academy. They lead sessions, own all communications, and are responsible for keeping everyone aligned. The role can be filled by a dedicated Band Manager or by an instrument teacher who takes it on; the responsibilities are the same either way.
            </Body>

            <SubTitle>Communications</SubTitle>
            <Body>All contact with students and parents goes through the Band Manager: progress updates, scheduling, questions, logistics. Band Managers escalate to management when needed. Headliner provides a dedicated software platform to log session notes, track progress, and share updates.</Body>

            <SubTitle>Session Leadership</SubTitle>
            <Body>Band Managers lead the weekly 60-minute band session. They set the agenda, track progress against milestones, and keep the band moving forward. They guide creative development: repertoire, arrangement, sound — while keeping final decisions with the band.</Body>

            <SubTitle>Performance Support</SubTitle>
            <Body>Not mandatory, but strongly encouraged: Band Managers should strive to attend gigs. Pre-show prep, setlist feedback, post-show debrief. They coach; the band performs.</Body>

            <SubTitle>Admin & Reporting</SubTitle>
            <Body>Session notes, milestone tracking, and setlist updates are logged in the platform. Admin work is handled during designated admin hours or between sessions.</Body>

            <HighlightBox accent={C.yellow}>
              <strong>Compensation:</strong> Band Managers are paid <strong>+$2/hr above their standard rate</strong>, reflecting the added communication and coordination responsibilities.
            </HighlightBox>
          </Section>

          {/* ── EVENT & PRODUCTION MANAGER ─────────────────────────────── */}
          <Section id="event-manager">
            <SectionTitle>Event Manager & Production Manager</SectionTitle>
            <Body>Headliner maintains two additional roles that support the live performance side of the program.</Body>

            <CardGrid>
              <InfoCard accent={C.teal} title="Event Manager">
                <Body style={{ fontSize: 14 }}>
                  Responsible for building and maintaining relationships with local venues, business owners, and event organizers throughout Placer County. Handles outreach, PR, logistics planning, and coordinates performance opportunities. Compensated at standard rate.
                </Body>
              </InfoCard>
              <InfoCard accent={C.crimson} title="Production Manager">
                <Body style={{ fontSize: 14 }}>
                  On event days, the Event Manager transitions into Production Manager — responsible for equipment, setup, day-of logistics, and execution. Paid <strong>+$2/hr above standard rate</strong> for all hours worked on event days.
                </Body>
              </InfoCard>
            </CardGrid>
          </Section>

          {/* ── SOCIAL MEDIA ────────────────────────────────────────────── */}
          <Section id="social">
            <SectionTitle>Social Media</SectionTitle>
            <BulletList items={[
              "Bands own their presence: each band is responsible for managing its own social media and marketing. Headliner provides guidance and encouragement, but the band's online presence belongs to the band.",
              "Build your identity: your band defines its name, story, image, and personality. We help shape that identity and share ideas — but the creative direction is yours.",
              "Create and share content: rehearsals, gigs, and behind-the-scenes moments provide plenty of opportunities. Each band decides what to capture, post, and promote.",
              "Practical guidance: we share best practices on platforms, content, and audience building. Our goal is to help bands make informed decisions — not manage their marketing.",
              "Amplified by Headliner: bands can choose to be featured on Headliner's social channels through rehearsal clips, performance announcements, and milestone celebrations. Bands opt in.",
            ]} />
          </Section>

          {/* ── PERFORMANCE READINESS ────────────────────────────────────── */}
          <Section id="performance">
            <SectionTitle>Performance Readiness</SectionTitle>
            <Body>Headliner is responsible for creating regular performance opportunities for every band in the program. We actively build and maintain relationships with local venues throughout Placer County with the goal of organizing one public performance opportunity each month for bands that are ready.</Body>

            <CardGrid cols={3}>
              <InfoCard accent={C.yellow} title="Category 1: Headliner Sessions">
                <Body style={{ fontSize: 14 }}>
                  A monthly in-house performance series at the academy. Bands perform for family, friends, and invited guests. Safe, supportive, and consistent. Available to <strong>all bands</strong> in the program.
                </Body>
              </InfoCard>
              <InfoCard accent={C.teal} title="Category 2: Community Stages">
                <Body style={{ fontSize: 14 }}>
                  Public venues throughout Placer County: local breweries, cafes, wineries, restaurants, festivals, and markets. Headliner actively sources and coordinates these opportunities.
                </Body>
              </InfoCard>
              <InfoCard accent={C.crimson} title="Category 3: The Big Stage">
                <Body style={{ fontSize: 14 }}>
                  Whatever comes next: a theater, festival, opening act, original music, recording, touring. We open the door.
                </Body>
              </InfoCard>
            </CardGrid>
          </Section>

          {/* ── LIGHTING SYSTEM ─────────────────────────────────────────── */}
          <Section id="lighting" style={{ paddingTop: 48 }}>
            <SectionTitle>Lighting System</SectionTitle>
            <Body>
              Headliner is investing in a professional DMX-driven lighting system for our performance room — a deliberate investment in the quality of our shows and a direct competitive advantage.
            </Body>

            <CardGrid>
              <InfoCard accent={C.yellow} title="The System">
                <Body style={{ fontSize: 14 }}>
                  The performance room is equipped with SHEHDS professional-grade fixtures across two hanging rows: <strong>Row A</strong> (2× 350W LED Fresnels + 1× 300W COB wash par) serves as the band's key light, aimed upstage. <strong>Row B</strong> (3× 18×18W RGBWA+UV zoom pars) serves as the class wash system for daily use and a color system during performances. Floor uplights complete the stage separation.
                </Body>
              </InfoCard>
              <InfoCard accent={C.teal} title="DMX Control">
                <Body style={{ fontSize: 14 }}>
                  A Pknight 192-channel DMX console provides full live control during shows. A wall panel handles daily class operation with the push of a button. <strong>No technical knowledge required for everyday use</strong> — full production capability when it counts.
                </Body>
              </InfoCard>
              <InfoCard accent={C.crimson} title="Dual-Purpose Design">
                <Body style={{ fontSize: 14 }}>
                  The same room that hosts toddler music classes in the morning runs a fully lit live show in the evening. A self-illuminating branded backdrop anchors the back wall. Every Headliner Sessions event looks and feels like a real show.
                </Body>
              </InfoCard>
              <InfoCard accent={C.yellow} title="Promotion">
                <Body style={{ fontSize: 14 }}>
                  Headliner Sessions will be actively promoted across Placer County through social media, local partnerships, and community outreach. The lighting system is a visible, tangible differentiator — <strong>we lead with it.</strong>
                </Body>
              </InfoCard>
            </CardGrid>

            {/* 3D Visualizer */}
            <div style={{ marginTop: 8 }}>
              <LightingVisualization />
            </div>

            <SubTitle>How we promote it</SubTitle>
            <Body>Headliner Sessions will be actively promoted across Placer County through social media, local partnerships, and community outreach. The lighting system is a visible, tangible differentiator. We lead with it.</Body>
          </Section>

          {/* ── LEVELS OVERVIEW ─────────────────────────────────────────── */}
          <Section id="levels-overview">
            <SectionTitle>Levels Overview — Milestone-Based Progression</SectionTitle>
            <Body>Bands advance by meeting clearly defined milestones. The Band Manager evaluates each band's readiness and determines when it is appropriate to move to the next level, in consultation with the band.</Body>

            <CardGrid cols={3}>
              <InfoCard accent={C.yellow} title="Level 1: Foundation">
                <Body style={{ fontSize: 14 }}>
                  Band identity confirmed. Parts learned individually. First run-through done. Listening and response present.
                </Body>
                <div style={{ marginTop: 16, textAlign: "center", fontFamily: fonts.display, fontWeight: 800, fontSize: 32, color: C.yellow }}>
                  →
                </div>
              </InfoCard>
              <InfoCard accent={C.teal} title="Level 2: Growth">
                <Body style={{ fontSize: 14 }}>
                  3-4 song setlist rehearsed. Clean starts and transitions. Dynamics and communication present. Played live at least once.
                </Body>
                <div style={{ marginTop: 16, textAlign: "center", fontFamily: fonts.display, fontWeight: 800, fontSize: 32, color: C.teal }}>
                  →
                </div>
              </InfoCard>
              <InfoCard accent={C.crimson} title="Level 3: Ready for Stage">
                <Body style={{ fontSize: 14 }}>
                  Set delivered with confidence. Mistakes handled in real time. Stage presence is genuine. Band Manager sign-off given.
                </Body>
              </InfoCard>
            </CardGrid>
          </Section>

          {/* ── LEVEL 1 ─────────────────────────────────────────────────── */}
          <Section id="level-1">
            <SectionTitle>Level 1: Foundation</SectionTitle>
            <Body>The band is new. Members are learning each other and how to play together. Get the basics in place, pick a song, and start making music as a unit.</Body>

            <InfoCard accent={C.yellow}>
              <SubTitle style={{ marginTop: 0 }}>What to Work On</SubTitle>
              <BulletList items={[
                "Establish the band: name, roles, instruments",
                "Select 1-2 covers collaboratively",
                "Learn parts individually, then bring them together",
                "Start and stop together on cue",
                "Listen and respond to each other",
              ]} />
              <SubTitle>Repertoire</SubTitle>
              <BulletList items={[
                "1-2 covers chosen together",
                "Songs picked for fit and student interest",
                "Parts simplified where needed",
                "Backing tracks fill gaps where instruments are missing",
              ]} />
              <SubTitle>Band Manager Focus</SubTitle>
              <BulletList items={[
                "Intro message to band and families via platform",
                "Share song selection with reasoning",
                "Log session notes after every session",
                "Flag skill gaps for instrument teacher follow-up",
              ]} />
              <SubTitle>Live Sound: Level 1</SubTitle>
              <BulletList items={[
                "Tuning by ear and with a tuner",
                "Basic tone: amp settings and signal chain",
                "Stage volume awareness",
              ]} />
            </InfoCard>

            <HighlightBox accent={C.yellow}>
              <strong>Milestones to advance:</strong> ✓ Band identity confirmed &nbsp; ✓ Parts learned individually &nbsp; ✓ First full run-through done &nbsp; ✓ Listening and response present
            </HighlightBox>
          </Section>

          {/* ── LEVEL 2 ─────────────────────────────────────────────────── */}
          <Section id="level-2">
            <SectionTitle>Level 2: Growth</SectionTitle>
            <Body>The foundation is there. Now the band builds on it — tightening the set, playing their first gigs, and starting to develop their own sound. Originals can begin here.</Body>

            <InfoCard accent={C.teal}>
              <SubTitle style={{ marginTop: 0 }}>What to Work On</SubTitle>
              <BulletList items={[
                "Build a 3-4 song setlist",
                "Tighten timing, dynamics, and transitions",
                "Develop stage presence and in-song communication",
                "Play a real gig",
                "Start exploring original ideas",
              ]} />
              <SubTitle>Repertoire</SubTitle>
              <BulletList items={[
                "Add 2-3 songs; students propose, Band Manager helps assess fit",
                "Arrangements shaped, not just learned",
                "Set varied in tempo and feel",
                "Original concepts welcome and encouraged",
              ]} />
              <SubTitle>Band Manager Focus</SubTitle>
              <BulletList items={[
                "Bimonthly progress update to band and families",
                "Setlist tracked and updated in platform",
                "Coordinate with Event Manager on gig opportunities",
                "Flag members who need instrument lesson support",
              ]} />
              <SubTitle>Live Sound: Level 2</SubTitle>
              <BulletList items={[
                "EQ fundamentals: cutting vs. boosting",
                "Clean transitions between songs",
                "Monitor awareness: hearing yourself and others",
                "Soundcheck and line check workflow",
                "Gain staging basics",
                "Performing on unfamiliar stages and gear",
              ]} />
            </InfoCard>

            <SubTitle>Gig Opportunities</SubTitle>
            <Body>Headliner works to secure one venue opportunity per month for performance-ready bands. <strong>Headliner Sessions</strong> — monthly in-house performances — are available to all Level 2 bands. The Band Manager attends when possible for pre-show prep, setlist feedback, and post-show debrief.</Body>

            <HighlightBox accent={C.teal}>
              <strong>Milestones to advance:</strong> ✓ 3-4 song setlist built and rehearsed &nbsp; ✓ Clean starts, endings, and transitions &nbsp; ✓ Dynamics and communication present &nbsp; ✓ Played live at least once
            </HighlightBox>
          </Section>

          {/* ── LEVEL 3 ─────────────────────────────────────────────────── */}
          <Section id="level-3">
            <SectionTitle>Level 3: Ready for Stage</SectionTitle>
            <Body>Level 3 is where Headliner's flagship bands live. The program doesn't end here — it opens up. Bands perform regularly, pursue originals, record, and build a real following. This is what everything before was building toward.</Body>

            <InfoCard accent={C.crimson}>
              <SubTitle style={{ marginTop: 0 }}>What to Work On</SubTitle>
              <BulletList items={[
                "Perform regularly through public gigs and Headliner Sessions",
                "Write and perform original music",
                "Record in the studio",
                "Build an audience and online presence",
                "Keep developing as performers and songwriters",
              ]} />
              <SubTitle>Repertoire</SubTitle>
              <BulletList items={[
                "Setlist locked per performance, built with energy in mind",
                "Originals held to the same standard as covers",
                "Academy supports songwriting and arrangement when wanted",
                "Covers are still valid; originals are the direction",
              ]} />
              <SubTitle>Band Manager Focus</SubTitle>
              <BulletList items={[
                "Keep the gig pipeline active with Event Manager",
                "Pre- and post-show communication with band and families",
                "Support recording sessions and original development",
                "Log milestones and notes in platform",
              ]} />
              <SubTitle>Live Sound: Level 3</SubTitle>
              <BulletList items={[
                "Gain staging and monitor mix at a deeper level",
                "Reading the room: adjusting energy and dynamics to the crowd",
                "Technical recovery: handling failures mid-show without stopping",
              ]} />
            </InfoCard>

            <HighlightBox accent={C.crimson}>
              <strong>Studio Recording — Level 3 Unlock:</strong> Bands at Level 3 can book a paid recording session in Headliner's in-house studio. One song, originals only. However long it takes.
            </HighlightBox>

            <HighlightBox accent={C.crimson}>
              <strong>Performance Clearance:</strong> ✓ Set delivered with confidence &nbsp; ✓ Mistakes handled in real time &nbsp; ✓ Stage presence is genuine &nbsp; ✓ Band Manager sign-off given
            </HighlightBox>
          </Section>

          {/* ── GRADUATION ───────────────────────────────────────────────── */}
          <Section id="graduation" style={{ borderBottom: "none" }}>
            <SectionTitle>Graduation Ceremony</SectionTitle>
            <Body>
              Every level advancement is marked with a short ceremony in the performance room. The band plays, the milestone gets acknowledged, and they move on. It's a moment of recognition — simple, meaningful, and documented.
            </Body>
            <HighlightBox accent={C.yellow}>
              When the milestones are met, the band advances in a short ceremony in the performance room. The Band Manager coordinates the timing and communicates it to the band and families.
            </HighlightBox>
          </Section>

        </div>
      </div>
    </div>
  );
}