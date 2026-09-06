import { useState, useEffect, useRef } from "react";
import { ArrowRight, Music, X } from "lucide-react";
import ProgramsNav from "./ProgramsNav";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  espresso: "#1a130f",
  crimson:  "#FF0044",
  yellow:   "#FFDA00",
  teal:     "#00A8C8",
  white:    "#FFFFFF",
  cream:    "#F6F3EE",
  offwhite: "#FAF9F7",
  muted:    "#7A6A5A",
  border:   "#E8E2DA",
};

// ── Teacher data ──────────────────────────────────────────────────────────────
const TEACHERS = [
  {
    id: "1",
    name: "Alyssa",
    instruments: "Clarinet, Guitar, Piano, Saxophone, Ukulele",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563497/alyssa_dtv0xb.jpg",
    bio: "Alyssa started playing Piano and Guitar in elementary school and picked up Saxophone in middle school — and she never really stopped adding instruments. She holds a BM in both Classical Performance and Jazz Studies, and is currently working toward her Master's in Jazz Studies at Sac State. She performs regularly around the greater Sacramento area with groups like the Roland Tonies and the Swingmasters. She loves every genre and is always down to jam.",
    highlights: ["BM in Classical Performance & Jazz Studies", "Masters candidate, Sac State", "Performing across Sacramento"],
  },
  {
    id: "2",
    name: "Jessica",
    instruments: "Piano, Guitar, Ukulele",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563497/jessica_xdzc2o.jpg",
    bio: "Jessica's love for music took root at Natomas Charter Performing and Fine Arts Academy and grew from there. She holds a BA in Music from Cal State and plays over nine instruments — most of which she taught herself, becoming a true one-woman band. With nine years of teaching Piano and Ukulele under her belt, she brings equal parts expertise and enthusiasm to every lesson. Her current listening rotation: Japanese City Pop, Bossa Nova, and R&B.",
    highlights: ["BA in Music, Cal State", "9+ Instruments", "9 Years Teaching Piano & Ukulele"],
  },
  {
    id: "3",
    name: "Drew",
    instruments: "Bass, Brass, Guitar, Piano, Bands",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563497/drew_mgkx8d.jpg",
    bio: "Drew has been playing Brass for around six years and has never backed down from a musical challenge. He practices constantly — and even better, practices with his friends. His taste runs everywhere from Metal to Jazz to Classical, and what ties it all together is a genuine desire to learn every genre from the inside out. He brings that same curiosity and drive into everything he teaches.",
    highlights: ["Brass, Guitar & Piano", "Metal · Jazz · Classical", "Band Program"],
  },
  {
    id: "4",
    name: "Bridget",
    instruments: "Piano, Voice, Kids-N-Keys, Rock City",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563497/bridget_kok94i.jpg",
    bio: "Bridget has been a singer since the moment she could talk. She started Piano at 5 and Voice at 12, and spent her middle and high school years immersed in Choir and Musical Theatre, earning several certificates of merit along the way. She went on to earn her Bachelor's in Music Education with a Choral Emphasis from San Jose State, where she focused on Baroque and Classical repertoire. Her current favorites: Beabadoobee and Bruno Mars.",
    highlights: ["BA Music Education, San Jose State", "Choral & Classical Training", "Piano · Voice · Early Childhood"],
  },
  {
    id: "5",
    name: "Scott",
    instruments: "Guitar, Bass, Drums, Ukulele, Bands",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563499/scott_ynydho.jpg",
    bio: "Scott has been teaching guitar privately for over 15 years, covering everything from classic rock to classical technique. Years of playing and recording in bands across California have sharpened his ability to perform and communicate music across styles and skill levels. He teaches students of all ages, always aiming to make the process feel fun and rewarding. He also volunteers with Guitars for Vets, providing music therapy for those who need it most.",
    highlights: ["15+ Years Teaching Guitar", "Bands across California", "Guitars for Vets Volunteer"],
  },
  {
    id: "6",
    name: "Marshall",
    instruments: "Drums, Bass, Bands",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563500/marshall_qjlobv.jpg",
    bio: "Marshall has been part of the Headliner family for over a decade, bringing serious percussion credentials and a love for all kinds of music. They were a founding member of the West Park High School marching band and served as percussion captain for three of their four years there, marching center snare. Outside of music, Marshall is into drawing, painting, and baking — and brings that same creative energy to every lesson.",
    highlights: ["10 Years at Headliner", "Percussion Captain, West Park HS", "Drums & Bass Guitar"],
  },
  {
    id: "7",
    name: "Collin",
    instruments: "Drums, Beat Making",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563497/collin_ilzutz.jpg",
    bio: "Collin has been drumming for 10 years and producing music for 6, releasing originals under the name Crescendo. He's taken home multiple first-place medals in professional percussion competitions — both as a soloist and as part of an ensemble. He's spent three years teaching high school percussion, specializing in drumline technique and musicality. His tastes run from Rock to EDM to Classical, and he's actively working toward a future in tech or composition.",
    highlights: ["Releases Music as Crescendo", "1st Place Percussion Competitions", "Drumline Specialist"],
  },
  {
    id: "8",
    name: "Briana",
    instruments: "Clarinet, Voice, Early Childhood",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563500/briana_rsizeh.jpg",
    bio: "Briana has been singing since she was young, building experience across church choirs, school ensembles, and musical theatre. Classically trained in voice, she also has experience in multiple languages and styles. She's been playing Clarinet for eight years and held leadership roles in both choir and marching band in high school — co-president of choir and drum major of the band. She's currently involved with Sierra College Vocal Jazz and Chamber Singers. Her music taste is, in her own words, 'kinda everywhere.'",
    highlights: ["Classical Voice & Clarinet", "Drum Major & Choir Co-President", "Sierra College Vocal Jazz"],
  },
  {
    id: "9",
    name: "Josh",
    instruments: "Bass, Brass, Drums, Guitar, Piano, Voice, Bands",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563903/josh_b8y6ii.jpg",
    bio: "Josh studied music at the University of the Pacific in Stockton and has been giving lessons since high school. He teaches a wide range of instruments — Bass, Brass, Drums, Guitar, Piano, and Voice — and brings a depth of musicianship that comes from years of serious study and real-world experience.",
    highlights: ["Music, University of the Pacific", "Bass · Brass · Drums · Guitar · Piano · Voice", "Lessons since High School"],
  },
  {
    id: "10",
    name: "Julia",
    instruments: "Piano, Flute, Voice, Early Childhood",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563499/julia_l7dbvb.jpg",
    bio: "Julia has been playing flute since 4th grade, when she joined her school's concert band, and has been part of concert and marching bands ever since. In high school and college she added two choirs, then a third — an a cappella group — in college. She earned her BA in Music Education from Chapman University. Her listening tastes shift constantly, and she's always hunting for something new to learn and jam to.",
    highlights: ["BA Music Education, Chapman University", "Flute · Piano · Voice · Early Childhood", "Concert & Marching Band"],
  },
  {
    id: "11",
    name: "Jake",
    instruments: "Drums",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563498/jake_agjuva.jpg",
    bio: "Jake got his first toy kit at 5 and his first real kit at 12 — drumming has been his thing ever since. He tried guitar and bass, but neither stuck the way drums did. His biggest inspirations are TOOL, Avenged Sevenfold, Rush, Red Hot Chili Peppers, and Dream Theater, and his tastes run deep into rock, nu-metal, and prog. Currently a sophomore at Sierra College, Jake brings the same focus and passion he has for music into every lesson.",
    highlights: ["Rock · Nu-Metal · Prog", "Inspired by TOOL & Dream Theater", "Sierra College"],
  },
  {
    id: "12",
    name: "Vitto",
    instruments: "Guitar, Piano",
    photo: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781563498/vitto_smf9f9.jpg",
    bio: "Vitto picked up guitar in 2022 and hasn't put it down. He loves all kinds of music but has a particular soft spot for pop-punk, and Paramore is his all-time favorite band. When he's not playing, he's out at shows and concerts or exploring new places on foot. He brings genuine enthusiasm and a student's curiosity to his teaching — because he remembers exactly what it's like to be just starting out.",
    highlights: ["Guitar & Piano", "Pop-Punk Specialist", "Active Concertgoer"],
  },
];

const TRUST_POINTS = [
  {
    title: "Credited working musicians",
    body: "Our teachers perform, record, write, arrange, and stay active in music outside the lesson room.",
    accent: C.crimson,
  },
  {
    title: "Multi-instrumental staff",
    body: "Many of our instructors teach across several instruments, which helps students connect rhythm, theory, ear training, and song work.",
    accent: C.teal,
  },
  {
    title: "Trained in our approach",
    body: "Teachers use Headliner's curriculum and levels so students have a clear next step from lesson to lesson.",
    accent: C.yellow,
  },
  {
    title: "Safe and supportive",
    body: "Staff members are background checked and chosen for how they work with kids, teens, and adults.",
    accent: C.espresso,
  },
];

const TEACHER_FAQS = [
  {
    q: "How do you choose teachers?",
    a: "We look for strong musicianship, teaching ability, patience, and the ability to work well with students at different ages and levels.",
  },
  {
    q: "Are teachers trained in the same curriculum?",
    a: "Yes. Teachers use Headliner's lesson approach, curriculum, and student levels, while still adapting the lesson to the student in front of them.",
  },
  {
    q: "Do your teachers work with young beginners?",
    a: "Yes. Our teachers work with kids, teens, and adults. For younger beginners, lessons stay clear, patient, and age-appropriate.",
  },
];

// ── Eyebrow label (matches BandProgramPage) ───────────────────────────────────
const Eyebrow = ({ children, color = C.teal }) => (
  <p style={{
    fontSize: 14, fontWeight: 600, letterSpacing: "0.02em",
    color, marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
    fontFamily: "'DM Sans', sans-serif",
  }}>
    <span style={{ display: "block", width: 28, height: 3, background: color, borderRadius: 2, flexShrink: 0 }} />
    {children}
  </p>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
function TeacherModal({ teacher, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!teacher) return null;

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(26,19,15,0.65)",
      backdropFilter: "blur(10px)",
      zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
      animation: "backdropIn 0.25s ease both",
    }}>
      <div
        ref={modalRef}
        style={{
          background: C.white,
          borderRadius: 24,
          width: "100%",
          maxWidth: 820,
          maxHeight: "88vh",
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
          animation: "modalIn 0.35s cubic-bezier(0.16,1,0.3,1) both",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20, zIndex: 10,
            background: C.white, border: "none", borderRadius: "50%",
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.2s, background 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.cream; e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.transform = "scale(1)"; }}
        >
          <X size={18} color={C.espresso} />
        </button>

        <div className="tm-layout" style={{ display: "flex", width: "100%", minHeight: 0 }}>
          {/* Photo */}
          <div className="tm-photo" style={{ flex: "0 0 40%", position: "relative" }}>
            <img
              src={teacher.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&size=600&background=1a130f&color=ffffff&bold=true&font-size=0.4`}
              alt={teacher.name}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
              }}
            />
            {/* Bottom gradient */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
              background: "linear-gradient(to top, rgba(26,19,15,0.55), transparent)",
            }} />
            {/* Instrument tag on photo */}
            <div style={{
              position: "absolute", bottom: 24, left: 24,
              display: "flex", alignItems: "center", gap: 7,
            }}>
              <Music size={13} color={C.yellow} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "none", color: C.yellow,
              }}>
                {teacher.instruments}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="tm-content" style={{
            flex: 1, padding: "48px 44px",
            overflowY: "auto", display: "flex", flexDirection: "column",
          }}>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: C.espresso, margin: "0 0 24px", lineHeight: 1,
              letterSpacing: -1,
            }}>
              {teacher.name}
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 16,
              lineHeight: 1.85, color: C.muted, margin: "0 0 36px",
            }}>
              {teacher.bio}
            </p>

            {/* Highlights */}
            <div style={{ marginTop: "auto" }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                fontWeight: 800, letterSpacing: "0.2em", textTransform: "none",
                color: C.espresso, margin: "0 0 14px",
                paddingBottom: 10, borderBottom: `1px solid ${C.border}`,
              }}>
                Specialties
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {teacher.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      display: "block", width: 8, height: 8, borderRadius: "50%",
                      background: C.teal, flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                      fontWeight: 500, color: C.espresso,
                    }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 640px) {
          .tm-layout { flex-direction: column !important; }
          .tm-photo  { flex: 0 0 280px !important; }
          .tm-content { padding: 28px 24px !important; }
        }
      `}</style>
    </div>
  );
}

// ── Teacher card ──────────────────────────────────────────────────────────────
function TeacherCard({ teacher, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(teacher)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Photo frame */}
      <div style={{
        position: "relative",
        width: "100%",
        paddingBottom: "120%",
        borderRadius: 20,
        overflow: "hidden",
        background: C.border,
        marginBottom: 22,
        boxShadow: hovered
          ? "0 20px 48px rgba(26,19,15,0.16)"
          : "0 4px 16px rgba(26,19,15,0.06)",
        transition: "box-shadow 0.4s ease",
      }}>
        <img
          src={teacher.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&size=600&background=1a130f&color=ffffff&bold=true&font-size=0.4`}
          alt={teacher.name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(26,19,15,0.5) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }} />

        {/* "View Bio" pill */}
        <div style={{
          position: "absolute", bottom: 20, left: "50%",
          transform: `translate(-50%, ${hovered ? 0 : 12}px)`,
          opacity: hovered ? 1 : 0,
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          background: C.white,
          padding: "8px 18px",
          borderRadius: 999,
          display: "flex", alignItems: "center", gap: 6,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          whiteSpace: "nowrap",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11,
            fontWeight: 800, letterSpacing: "0.1em", textTransform: "none",
            color: C.espresso,
          }}>
            View Bio
          </span>
          <ArrowRight size={12} color={C.crimson} />
        </div>
      </div>

      {/* Name + instruments */}
      <h3 style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
        fontSize: 20, color: hovered ? C.crimson : C.espresso,
        margin: "0 0 5px", lineHeight: 1.1,
        transition: "color 0.2s",
      }}>
        {teacher.name}
      </h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13,
        fontWeight: 500, color: C.muted, margin: 0,
      }}>
        {teacher.instruments}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TeachersPage({ setPath, onRequestLessons }) {
  const [selected, setSelected] = useState(null);

  const navigate = (path) => {
    if (setPath) {
      setPath(path);
      return;
    }

    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: C.cream,
      minHeight: "100vh",
      overflowX: "hidden",
      paddingTop: 68,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

        .tp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px 40px;
        }
        @media (max-width: 900px) {
          .tp-grid { grid-template-columns: repeat(2, 1fr); gap: 40px 28px; }
          .tp-trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .tp-faq-grid { grid-template-columns: 1fr !important; }
          .tp-recruit-card { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .tp-grid { grid-template-columns: 1fr; gap: 48px; }
          .tp-trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Request Lessons"
        onCtaClick={() => onRequestLessons && onRequestLessons("")}
      />

      {/* ── Hero ── */}
      <section style={{
        background: C.espresso,
        padding: "88px 40px 96px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dot grid texture */}
        <div className="tp-recruit-card" style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }} />
        {/* Crimson glow */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(ellipse at 80% 50%, rgba(255,0,68,0.08) 0%, transparent 60%)",
        }} />

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Eyebrow color={C.teal}>Our Faculty</Eyebrow>
          <h1 style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
            color: C.white, margin: "0 0 28px", lineHeight: 0.92, letterSpacing: -2,
          }}>
            Meet our teachers<br />
          </h1>
          <p style={{
            fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.6)",
            maxWidth: 560, margin: 0,
          }}>
            Our teachers are active musicians, trained instructors, and multi-instrumentalists who know how to work with kids, teens, and adults.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section style={{ padding: "80px 40px 100px", maxWidth: 1160, margin: "0 auto" }}>
        <div className="tp-grid">
          {TEACHERS.map(t => (
            <TeacherCard key={t.id} teacher={t} onClick={setSelected} />
          ))}
        </div>
      </section>

      {/* ── Trust section ── */}
      <section style={{ background: C.offwhite, padding: "72px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: 32 }}>
            <Eyebrow color={C.teal}>Why families trust our teachers</Eyebrow>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)", color: C.espresso,
              margin: "0 0 16px", lineHeight: 1, letterSpacing: -1,
            }}>
              Skilled musicians who know how to teach
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: C.muted, margin: 0, maxWidth: 680 }}>
              Headliner teachers combine musicianship with structure, patience, and care. Students get clear instruction, steady feedback, and a teacher who understands the instrument they want to learn.
            </p>
          </div>

          <div className="tp-trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {TRUST_POINTS.map((point) => (
              <div key={point.title} style={{
                background: C.white,
                border: `1.5px solid ${point.accent === C.espresso ? C.border : `${point.accent}55`}`,
                borderRadius: 20,
                padding: "24px 22px 22px",
                boxShadow: "0 12px 34px rgba(26,19,15,0.06)",
              }}>
                <h3 style={{
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                  fontSize: 22, lineHeight: 1.05, color: C.espresso,
                  margin: "0 0 10px",
                }}>
                  {point.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: C.muted, margin: 0 }}>
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: C.white, padding: "80px 40px", borderTop: `1px solid ${C.border}` }}>
        <div className="tp-faq-grid" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "0.78fr 1.22fr", gap: 44, alignItems: "start" }}>
          <div>
            <Eyebrow color={C.teal}>Teacher FAQ</Eyebrow>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)", color: C.espresso,
              margin: "0 0 14px", lineHeight: 1, letterSpacing: -1,
            }}>
              A few common questions
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: C.muted, margin: 0 }}>
              Choosing a teacher matters. Here is how we think about fit, training, and student support.
            </p>
          </div>

          <div>
            {TEACHER_FAQS.map((item, index) => (
              <div key={item.q} style={{
                paddingBottom: 28,
                borderBottom: index < TEACHER_FAQS.length - 1 ? `1px solid ${C.border}` : "none",
                marginBottom: 28,
              }}>
                <h3 style={{
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                  fontSize: 21, lineHeight: 1.15, color: C.espresso,
                  margin: "0 0 10px",
                }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: C.muted, margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recruiting ── */}
      <section style={{ background: C.cream, padding: "72px 40px", borderTop: `1px solid ${C.border}` }}>
        <div className="tp-recruit-card" style={{
          maxWidth: 960,
          margin: "0 auto",
          background: C.espresso,
          borderRadius: 28,
          padding: "44px clamp(28px, 5vw, 56px)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 28,
          alignItems: "center",
          boxShadow: "0 18px 48px rgba(26,19,15,0.14)",
        }}>
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "none",
              color: C.teal,
              margin: "0 0 14px",
            }}>
              Want to be part of Headliner?
            </p>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: C.white,
              margin: "0 0 12px",
              lineHeight: 1,
              letterSpacing: -1,
            }}>
              We are always glad to meet strong teachers.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: 620 }}>
              If you are a musician who cares about students, families, and steady teaching, send us an application.
            </p>
          </div>

          <a
            href="/careers"
            onClick={(e) => { e.preventDefault(); navigate("/careers"); }}
            style={{
              background: C.crimson,
              color: C.white,
              borderRadius: 999,
              padding: "16px 30px",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              whiteSpace: "nowrap",
              boxShadow: "0 8px 28px rgba(255,0,68,0.28)",
            }}
          >
            Apply here <ArrowRight size={15} />
          </a>
        </div>
      </section>


      {/* ── CTA strip ── */}
      <section style={{
        background: C.espresso,
        padding: "72px 40px",
        textAlign: "center",
        borderTop: `4px solid ${C.crimson}`,
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          fontWeight: 800, letterSpacing: "0.2em", textTransform: "none",
          color: C.teal, margin: "0 0 16px",
        }}>
          Ready to start?
        </p>
        <h2 style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: C.white, margin: "0 0 32px", lineHeight: 1,
          letterSpacing: -1,
        }}>
          Find your instructor.<br />Book your first lesson.
        </h2>
        <button
          onClick={() => onRequestLessons && onRequestLessons("")}
          style={{
            background: C.crimson, color: "#fff", border: "none",
            borderRadius: 999, cursor: "pointer",
            padding: "16px 40px", fontSize: 14,
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "none",
            display: "inline-flex", alignItems: "center", gap: 10,
            boxShadow: "0 8px 28px rgba(255,0,68,0.28)",
            transition: "background 0.2s, transform 0.15s",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#CC0036"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.crimson; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Request Lessons <ArrowRight size={15} />
        </button>
      </section>

      {/* Modal */}
      {selected && (
        <TeacherModal teacher={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}