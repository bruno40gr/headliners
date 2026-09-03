import { useState } from "react";
import { ArrowRight, Music, Clock, Mic2, TrendingUp, Check } from "lucide-react";
import ProgramsNav from "./ProgramsNav";
import { submitLead } from "./lib/formDelivery";

// ── Design tokens (kept local per-page, matching the rest of the site) ────────
const C = {
  espresso:     "#1a130f",
  crimson:      "#FF0044",
  crimsonHover: "#CC0036",
  cream:        "#F6F3EE",
  lightCream:   "#faf6eb",
  white:        "#FFFFFF",
  teal:         "#00A8C8",
  yellow:       "#FFDA00",
  muted:        "#7A6A5A",
  border:       "#E8E2DA",
  inputBg:      "#fafaf8",
  placeholder:  "#bbb",
  subtext:      "#aaa",
  errorText:    "#dc2626",
  errorBg:      "#fef2f2",
  errorBorder:  "#fecaca",
  white07: "rgba(255,255,255,0.07)",
  white08: "rgba(255,255,255,0.08)",
  white10: "rgba(255,255,255,0.1)",
  white15: "rgba(255,255,255,0.15)",
  white60: "rgba(255,255,255,0.6)",
  white70: "rgba(255,255,255,0.7)",
  white80: "rgba(255,255,255,0.8)",
  teal08:    "rgba(0,168,200,0.08)",
  teal15:    "rgba(0,168,200,0.16)",
};

const CRM_TENANT_ID = process.env.NEXT_PUBLIC_CRM_TENANT_ID || "00000000-0000-0000-0000-000000000001";

// ── Editable content ──────────────────────────────────────────────────────────
const POSITIONS = [
  "Guitar",
  "Piano",
  "Drums",
  "Bass",
  "Vocals",
  "Brass",
  "Strings",
  "Early Childhood",
  "Something else",
];
const EXPERIENCE   = ["0–1 yrs", "2–4 yrs", "5–9 yrs", "10+ yrs"];
const SIGHTREAD    = ["Yes", "Somewhat", "No"];
const AVAILABILITY = ["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends"];

const PERKS = [
  { Icon: Music,      title: "Teach what you love",        desc: "Everyone who teaches here is an active musician. You'll teach the instruments and styles you care about, using music your students already know and love." },
  { Icon: Clock,      title: "We handle the business side", desc: "We take care of marketing, scheduling, booking, and billing, so your time goes to teaching." },
  { Icon: Mic2,       title: "Real stages and a studio",   desc: "Between the band program, live performances, and our in house recording studio, your students get real chances to play, record, and write their own music." },
  { Icon: TrendingUp, title: "Room to grow",               desc: "You get half off your own lessons, at any level, so you can keep learning and growing as a musician. There's also room to take on a band or ensemble over time." },
];

const RESPONSIBILITIES = [
  "Teach private and small group lessons using our curriculum.",
  "Keep each lesson encouraging, fun, and focused.",
  "Help students get ready to join a band or ensemble when the time is right.",
  "Lend a hand at school events.",
  "Help with the occasional equipment fix when you're able.",
];

const REQUIREMENTS = [
  "A strong grasp of music, and a knack for explaining it so it clicks.",
  "Solid theory and technique on your main instrument.",
  "The organization to keep a lesson on track.",
  "Comfort working in a busy room with all kinds of personalities.",
  "Real performing experience, on your own or with a group.",
  "Some experience with young or beginning musicians.",
  "Ease with both kids and adults.",
  "Able to pass a background check.",
];

// ── Reusable bits (mirrors App.jsx) ───────────────────────────────────────────
function Button({ children, variant = "primary", href, disabled, style, onClick, ...rest }) {
  const [hover, setHover] = useState(false);
  let bg, color, border, hoverBg, hoverColor;
  if (variant === "primary") {
    bg = disabled ? C.border : C.crimson;
    color = disabled ? C.muted : C.white;
    border = "none";
    hoverBg = disabled ? C.border : C.crimsonHover;
    hoverColor = disabled ? C.muted : C.white;
  } else if (variant === "ghost") {
    bg = C.white07; color = C.white80; border = `1px solid ${C.white15}`;
    hoverBg = C.white10; hoverColor = C.white;
  }
  const Element = href ? "a" : "button";
  return (
    <Element
      href={href} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "none",
        padding: "13px 32px", borderRadius: 999, border,
        cursor: disabled ? "not-allowed" : "pointer", textDecoration: "none",
        transition: "all 0.2s", background: hover ? hoverBg : bg, color: hover ? hoverColor : color,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Element>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "none", color: C.muted,
      }}>{label}</label>
      {children}
    </div>
  );
}

function PillToggle({ label, active, onClick }) {
  return (
    <button onClick={onClick} type="button" style={{
      padding: "7px 14px", borderRadius: 999,
      border: active ? `1.5px solid ${C.crimson}` : `1px solid ${C.border}`,
      background: active ? "rgba(255,0,68,0.06)" : C.inputBg,
      color: active ? C.crimson : C.muted,
      fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: active ? 700 : 400,
      cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

function ListBlock({ title, items }) {
  return (
    <div>
      <h2 style={{
        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.1rem)",
        letterSpacing: -0.5, color: C.white, margin: "0 0 8px", lineHeight: 1.1,
      }}>{title}</h2>
      <div style={{ width: 40, height: 3, background: C.teal, borderRadius: 2, marginBottom: 26 }} />
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((t, i) => (
          <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{
              width: 24, height: 24, borderRadius: 7, background: C.teal15, flexShrink: 0, marginTop: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Check size={14} color={C.teal} strokeWidth={2.5} />
            </span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: C.white70, lineHeight: 1.6 }}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CareersPage({ setPath, onRequestLessons }) {
  const navigate = (path) => {
    if (setPath) {
      setPath(path);
      return;
    }

    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };

  const [form, setForm] = useState({
    name: "", email: "", phone: "", position: [],
    experience: "", sightRead: "", availability: [], resume: "", message: "",
  });
  const [status, setStatus] = useState("idle");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (k, v) => setForm(f => ({
    ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v],
  }));

  const valid =
    form.name.trim() && form.email.trim() && form.position.length && form.message.trim() && status === "idle";

  const handleSubmit = async () => {
    if (!valid) return;
    setStatus("sending");

    const leadPayload = {
      tenant_id: CRM_TENANT_ID,
      intake_type: "job_application",
      source_form: "careers_form",
      source_page: window.location.pathname,
      full_name: form.name,
      email: form.email,
      phone: form.phone || null,
      referrer: window.location.href,
      payload: {
        positions: form.position,
        experience: form.experience || null,
        sight_reading: form.sightRead || null,
        availability: form.availability,
        resume_link: form.resume || null,
        message: form.message || null,
      },
    };

    const emailPayload = {
      name: form.name,
      email: form.email,
      phone: form.phone || "Not provided",
      position: form.position.join(", ") || "Not specified",
      experience: form.experience || "Not specified",
      sight_read: form.sightRead || "Not specified",
      availability: form.availability.join(", ") || "Not specified",
      resume: form.resume || "Not provided",
      message: form.message || "None",
    };

    try {
      await submitLead({
        leadPayload,
        emailPayload,
        emailConfig: {
          serviceId: "service_734y6qg",
          templateId: "template_526w74g",
          publicKey: "FdW-lGbAyQuJZFy-y",
        },
      });
      setStatus("success");
    } catch (error) {
      console.error("Lead submit failed:", error);
      setStatus("error");
    }
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif", background: C.cream,
      minHeight: "100vh", overflowX: "hidden", paddingTop: 68, color: C.espresso,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px);} to { opacity:1; transform:translateY(0);} }
        .cf-fade { animation: fadeUp 0.6s ease both; }
        .cf-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:${C.border}; border:1px solid ${C.border}; border-radius:20px; overflow:hidden; }
        @media (max-width:760px){ .cf-grid { grid-template-columns:1fr; } }
        .cf-cols { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:56px; }
        .cf-form-card { background:${C.white}; border:1px solid ${C.border}; border-radius:24px; padding:40px 36px; }
        @media (max-width:560px){ .cf-form-card { padding:28px 20px; } }
        .cf-input, .cf-input:focus { outline:none; }
        .cf-input {
          background:${C.inputBg}; border:1px solid ${C.border}; border-radius:10px;
          color:${C.espresso}; font-family:'DM Sans',sans-serif; font-size:14px;
          padding:10px 14px; width:100%; transition:border-color .2s, background .2s;
        }
        .cf-input:focus { border-color:${C.crimson}; background:${C.white}; }
        .cf-input::placeholder { color:${C.placeholder}; }
        textarea.cf-input { resize:vertical; }
      `}</style>

      <ProgramsNav
        variant="dark"
        navigate={navigate}
        ctaLabel="Request Lessons"
        onCtaClick={() => onRequestLessons && onRequestLessons("")}
      />

      {/* ── Hero ── */}
      <section style={{ background: C.espresso, padding: "88px 40px 96px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="cf-fade" style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "none",
            color: C.teal, marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ display: "block", width: 28, height: 3, background: C.teal, borderRadius: 2 }} />
            Careers
          </p>
          <h1 style={{
            fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, letterSpacing: -1,
            fontSize: "clamp(2.6rem,6vw,4.4rem)", color: C.white, lineHeight: 1, margin: "0 0 20px",
          }}>
            Teach the music you love.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: C.white60, maxWidth: 600, margin: 0 }}>
            We're a family run music school in Rocklin, looking for musicians to teach students of all ages.
            It's a part-time role with a flexible schedule. If you love music and love helping people learn it,
            we'd be glad to hear from you. Tell us a little about yourself below, and we'll read what you send.
          </p>
        </div>
      </section>

      {/* ── What it's like to teach here ── */}
      <section style={{ padding: "72px 40px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, letterSpacing: -1,
          fontSize: "clamp(1.9rem,4vw,2.8rem)", color: C.espresso, lineHeight: 1.05, margin: "0 0 40px",
        }}>
          What it's like to teach here
        </h2>
        <div className="cf-grid">
          {PERKS.map(({ Icon, title, desc }) => (
            <div key={title} style={{ background: C.white, padding: "32px 28px" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: C.teal08,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
              }}>
                <Icon size={22} color={C.teal} />
              </div>
              <h3 style={{
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 18,
                color: C.espresso, margin: "0 0 8px",
              }}>{title}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.7, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What you'll do / What we look for ── */}
      <section style={{ background: C.espresso, padding: "84px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="cf-cols">
            <ListBlock title="What you'll do" items={RESPONSIBILITIES} />
            <ListBlock title="What we look for" items={REQUIREMENTS} />
          </div>
          <div style={{
            marginTop: 48, padding: "22px 26px", maxWidth: 840,
            background: C.white07, border: `1px solid ${C.white10}`, borderLeft: `3px solid ${C.teal}`,
            borderRadius: 16,
          }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: C.white70, lineHeight: 1.7, margin: 0 }}>
              This is a part-time role with a flexible schedule. Your hourly rate is based on your experience,
              what you teach, and your availability, and eligible employees can join our 401(k) with an employer match.
            </p>
          </div>
        </div>
      </section>

      {/* ── Application form ── */}
      <section style={{ padding: "56px 40px 100px", maxWidth: 720, margin: "0 auto" }}>
        <div className="cf-form-card">
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🎶</div>
              <h2 style={{
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 32,
                color: C.espresso, letterSpacing: -1, margin: "0 0 12px", lineHeight: 1.1,
              }}>
                Thanks, we got your application
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: C.muted, fontSize: 15, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 28px" }}>
                Thanks for reaching out about teaching at Headliner. If it looks like a fit, we'll be in
                touch to set up a time to talk. Keep an eye on your inbox.
              </p>
              <Button onClick={() => navigate("/")}>Back to site</Button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{
                  fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 28,
                  letterSpacing: -1, color: C.espresso, margin: "0 0 6px", lineHeight: 1.1,
                }}>
                  Tell us about yourself
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.6 }}>
                  Don't see your program listed? Reach out anyway, and we'll keep you in mind as we grow.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <Field label="Full name">
                  <input className="cf-input" type="text" placeholder="e.g. Alex Rivera"
                    value={form.name} onChange={e => set("name", e.target.value)} />
                </Field>

                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 220px" }}>
                    <Field label="Email">
                      <input className="cf-input" type="email" placeholder="you@email.com"
                        value={form.email} onChange={e => set("email", e.target.value)} />
                    </Field>
                  </div>
                  <div style={{ flex: "1 1 180px" }}>
                    <Field label="Phone">
                      <input className="cf-input" type="tel" placeholder="(916) 555-0123"
                        value={form.phone} onChange={e => set("phone", e.target.value)} />
                    </Field>
                  </div>
                </div>

                <Field label="What program can you teach? (pick any that apply)">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {POSITIONS.map(p => (
                      <PillToggle key={p} label={p} active={form.position.includes(p)} onClick={() => toggleArr("position", p)} />
                    ))}
                  </div>
                </Field>

                <Field label="Teaching or performing experience">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {EXPERIENCE.map(x => (
                      <PillToggle key={x} label={x} active={form.experience === x} onClick={() => set("experience", x)} />
                    ))}
                  </div>
                </Field>

                <Field label="Can you sight read?">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SIGHTREAD.map(x => (
                      <PillToggle key={x} label={x} active={form.sightRead === x} onClick={() => set("sightRead", x)} />
                    ))}
                  </div>
                </Field>

                <Field label="Availability">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {AVAILABILITY.map(a => (
                      <PillToggle key={a} label={a} active={form.availability.includes(a)} onClick={() => toggleArr("availability", a)} />
                    ))}
                  </div>
                </Field>

                <Field label="Resume or portfolio link (optional)">
                  <input className="cf-input" type="url" placeholder="LinkedIn, your website, or a link to your resume"
                    value={form.resume} onChange={e => set("resume", e.target.value)} />
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.subtext, margin: "4px 0 0" }}>
                    A link works best (Google Drive, Dropbox, LinkedIn, your site). We'll ask for a file later if we need one.
                  </p>
                </Field>

                <Field label="A little about you">
                  <textarea className="cf-input" rows={4}
                    placeholder="What you play, where you've taught or performed, and why you'd like to teach here."
                    value={form.message} onChange={e => set("message", e.target.value)} />
                </Field>

                {status === "error" && (
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.errorText,
                    background: C.errorBg, border: `1px solid ${C.errorBorder}`,
                    borderRadius: 10, padding: "10px 14px", margin: 0,
                  }}>
                    Something went wrong sending that. Please try again, or email us at admin@headlinermusicacademy.com.
                  </p>
                )}

                <Button onClick={handleSubmit} disabled={!valid} style={{ width: "100%", marginTop: 4, fontSize: 15 }}>
                  {status === "sending" ? "Sending…" : "Send application"}
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section style={{
        background: C.espresso, padding: "72px 40px", textAlign: "center",
        borderTop: `4px solid ${C.crimson}`,
      }}>
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 800,
          letterSpacing: "0.2em", textTransform: "none", color: C.teal, margin: "0 0 16px",
        }}>
          Questions first?
        </p>
        <h2 style={{
          fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem,4vw,2.8rem)",
          color: C.white, margin: "0 0 32px", lineHeight: 1.05, letterSpacing: -1,
        }}>
          Reach out anytime.
        </h2>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Button href="mailto:admin@headlinermusicacademy.com">Email us</Button>
          <Button variant="ghost" href="/teachers"
            onClick={e => { e.preventDefault(); navigate("/teachers"); }}>
            Meet the team <ArrowRight size={15} />
          </Button>
        </div>
      </section>
    </div>
  );
}