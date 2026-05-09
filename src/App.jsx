import { useState } from "react";
import { ArrowRight, MapPin, Mail, Phone, Menu, X, ChevronDown } from "lucide-react";

const offerings = [
  { icon: "🎸", name: "Guitar", desc: "Acoustic & electric" },
  { icon: "🎹", name: "Piano", desc: "Classical & contemporary" },
  { icon: "🥁", name: "Drums", desc: "Kit & percussion" },
  { icon: "🎤", name: "Vocals", desc: "All styles" },
  { icon: "🎺", name: "Brass", desc: "Trumpet & more" },
  { icon: "🎻", name: "Strings", desc: "Violin & viola" },
  { icon: "🤘", name: "Band Performance", desc: "Live stage experience" },
  { icon: "🧸", name: "Piano for Kids", desc: "Fun early learning" },
  { icon: "🎉", name: "Private Parties", desc: "Birthdays & events" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIMES = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–8pm)"];
const PORTAL_URL = "https://headlinerma.opus1.io/login";

const EMAILJS_SERVICE_ID  = "service_734y6qg";
const EMAILJS_TEMPLATE_ID = "template_kgqsxrd";
const EMAILJS_PUBLIC_KEY  = "FdW-lGbAyQuJZFy-y";

function BookingModal({ instrument, onClose }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    instrument: instrument || "",
    level: "",
    days: [],
    times: [],
    notes: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const toggleArr = (key, val) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((v) => v !== val) : [...f[key], val],
    }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.instrument.trim() || !form.level || !form.email.trim()) return;

    const availability =
      form.days.length && form.times.length
        ? `${form.days.join(", ")} - ${form.times.join(", ")}`
        : form.days.length
        ? form.days.join(", ")
        : form.times.length
        ? form.times.join(", ")
        : "Not specified";

    setStatus("sending");

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            student_name: form.name,
            age:          form.age || "Not provided",
            email:        form.email,
            instrument:   form.instrument,
            level:        form.level,
            availability,
            notes:        form.notes || "None",
          },
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const valid =
    form.name.trim() &&
    form.email.trim() &&
    form.instrument.trim() &&
    form.level &&
    status === "idle";

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(2,6,23,0.72)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
      }}
      onClick={(e) => e.target === e.currentTarget && status !== "sending" && onClose()}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 24,
          width: "100%",
          maxWidth: 520,
          padding: "40px 36px",
          position: "relative",
          boxSizing: "border-box",
          margin: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        }}
      >
        {status !== "sending" && (
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              background: "#f1f5f9", border: "none",
              borderRadius: "50%", width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#64748b",
            }}
          >
            <X size={16} />
          </button>
        )}

        {/* SUCCESS */}
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎶</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 36, color: "#0f172a",
              letterSpacing: 1, margin: "0 0 12px", lineHeight: 1.1,
            }}>
              We'll be in touch <span style={{ color: "#f59e0b" }}>soon!</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#64748b", fontSize: 15,
              lineHeight: 1.7, maxWidth: 360, margin: "0 auto 8px",
            }}>
              We'll get back to you within the next 24 hours or so - expect a call from us to get everything set up.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#94a3b8", fontSize: 13,
              margin: "0 auto 28px",
            }}>
              Keep an eye on your phone. 📞
            </p>
            <button
              onClick={onClose}
              style={{
                background: "#f59e0b", border: "none", borderRadius: 100,
                padding: "13px 32px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: 15,
                cursor: "pointer", color: "#0f172a",
              }}
            >
              Back to site
            </button>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 36, letterSpacing: 1,
                color: "#0f172a", margin: "0 0 6px", lineHeight: 1.1,
              }}>
                Let's find your <span style={{ color: "#f59e0b" }}>sound.</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: "#64748b",
                margin: 0, lineHeight: 1.6,
              }}>
                Tell us a little about your musician and we'll call you to set things up.
              </p>
            </div>

            {/* FIELDS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              <Field label="Student name *">
                <input
                  type="text"
                  placeholder="e.g. Jordan Smith"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>

              <Field label="Your email *">
                <input
                  type="email"
                  placeholder="e.g. parent@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11, color: "#94a3b8",
                  margin: "4px 0 0",
                }}>
                  We'll only use this to confirm your inquiry. No spam, ever.
                </p>
              </Field>

              <Field label="Age (optional)">
                <input
                  type="number"
                  placeholder="e.g. 14"
                  min={4} max={99}
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                  style={{ maxWidth: 120 }}
                />
              </Field>

              <Field label="Instrument or program *">
                <div style={{ position: "relative" }}>
                  <select
                    value={form.instrument}
                    onChange={(e) => set("instrument", e.target.value)}
                    style={{ paddingRight: 36 }}
                  >
                    <option value="">Select one…</option>
                    {offerings.map((o) => (
                      <option key={o.name} value={o.name}>{o.icon} {o.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} style={{
                    position: "absolute", right: 12, top: "50%",
                    transform: "translateY(-50%)", pointerEvents: "none",
                    color: "#94a3b8",
                  }} />
                </div>
              </Field>

              <Field label="Experience level *">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Beginner", "Intermediate", "Advanced", "I don't know"].map((lvl) => (
                    <PillToggle
                      key={lvl} label={lvl}
                      active={form.level === lvl}
                      onClick={() => set("level", lvl)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Days that work best">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {DAYS.map((d) => (
                    <PillToggle
                      key={d} label={d}
                      active={form.days.includes(d)}
                      onClick={() => toggleArr("days", d)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Preferred time of day">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TIMES.map((t) => (
                    <PillToggle
                      key={t} label={t}
                      active={form.times.includes(t)}
                      onClick={() => toggleArr("times", t)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Anything else? (optional)">
                <textarea
                  placeholder="Goals, questions, previous experience…"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                />
              </Field>

              {status === "error" && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, color: "#dc2626",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 10,
                  padding: "10px 14px",
                  margin: 0,
                }}>
                  Something went wrong - please try again or reach us at (916) 435-1300.
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!valid}
                style={{
                  marginTop: 4,
                  background: valid ? "#f59e0b" : "#f1f5f9",
                  border: "none", borderRadius: 100,
                  padding: "15px 28px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: 15,
                  cursor: valid ? "pointer" : "not-allowed",
                  color: valid ? "#0f172a" : "#94a3b8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, transition: "background 0.2s, transform 0.15s", width: "100%",
                }}
                onMouseEnter={(e) => valid && (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {status === "sending" ? "Sending…" : <>Let's make music <ArrowRight size={16} /></>}
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        select { appearance: none !important; -webkit-appearance: none !important; -moz-appearance: none !important; }
        input, select, textarea {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 10px !important;
          color: #0f172a !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          padding: 10px 14px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          outline: none !important;
          transition: border-color 0.2s !important;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #f59e0b !important;
          background: #fff !important;
        }
        input::placeholder, textarea::placeholder { color: #94a3b8 !important; }
        textarea { resize: vertical; }
        input[type="number"] { max-width: 120px !important; width: 120px !important; }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11, fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function PillToggle({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 14px", borderRadius: 100,
        border: active ? "1px solid #f59e0b" : "1px solid #e2e8f0",
        background: active ? "#fffbeb" : "#f8fafc",
        color: active ? "#b45309" : "#64748b",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, fontWeight: active ? 700 : 400,
        cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingFor, setBookingFor] = useState(null);

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-slate-50 text-slate-800 selection:bg-amber-200 selection:text-amber-900"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&display=swap');
        .bebas { font-family: 'Bebas Neue', sans-serif; }
        .dm { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.18s; }
        .delay-3 { animation-delay: 0.28s; }
        .delay-4 { animation-delay: 0.38s; }
        .delay-5 { animation-delay: 0.48s; }
        .offering-card {
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          position: relative;
        }
        .offering-card:hover { background: #fffbeb !important; transform: translateY(-2px); z-index: 1; }
        .offering-card:hover .card-hint { opacity: 1; }
        .card-hint {
          opacity: 0; transition: opacity 0.2s;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #b45309; margin-top: 8px;
          font-family: 'DM Sans', sans-serif;
        }
        .portal-glow:hover { box-shadow: 0 0 28px rgba(245,158,11,0.45); }
        .portal-glow { transition: box-shadow 0.2s, transform 0.15s; }
        .portal-glow:hover { transform: translateY(-1px); }
        .tag-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border: 1px solid rgba(245,158,11,0.35);
          border-radius: 100px; font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #b45309; background: rgba(245,158,11,0.08);
        }
        .tag-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #f59e0b;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }
        @keyframes driftSpot {
          0%   { transform: translate(-50%,-50%) scale(1);    opacity: 0.13; }
          33%  { transform: translate(-48%,-53%) scale(1.06); opacity: 0.17; }
          66%  { transform: translate(-52%,-47%) scale(0.96); opacity: 0.12; }
          100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.13; }
        }
        .amber-spot {
          position: absolute; top: 50%; left: 50%;
          width: 700px; height: 500px; border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(245,158,11,0.55) 0%, transparent 70%);
          animation: driftSpot 9s ease-in-out infinite;
          pointer-events: none; mix-blend-mode: screen; filter: blur(40px);
        }
        .vignette { background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%); }
        .stage-line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #f59e0b 30%, #f59e0b 70%, transparent);
          opacity: 0.8;
        }
      `}</style>

      {bookingFor !== null && (
        <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />
      )}

      {/* NAV */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center h-[68px]">
          <a href="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/diy08lj9x/image/upload/e_make_transparent:10/v1778357646/Screenshot_2026-05-01_at_12.01.01_PM_zk7upq.png"
              alt="Headliner Music Academy" className="h-12 w-auto"
            />
          </a>
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => setBookingFor("")}
              className="text-sm font-bold text-slate-700 hover:text-amber-600 transition-colors dm"
            >
              Request Lessons
            </button>
            <a
              href={PORTAL_URL} target="_blank" rel="noreferrer"
              className="portal-glow inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-900 bg-amber-500 rounded-full"
            >
              Parent Portal <ArrowRight size={14} />
            </a>
          </div>
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 shadow-lg">
            <div className="px-5 py-5 flex flex-col gap-3">
              <button
                onClick={() => { setBookingFor(""); setMobileOpen(false); }}
                className="text-sm font-bold text-slate-700 py-2 border-b border-slate-100 text-left"
              >
                Request Lessons
              </button>
              <a
                href={PORTAL_URL} target="_blank" rel="noreferrer"
                className="portal-glow flex justify-center items-center gap-2 px-6 py-3 font-bold text-slate-900 bg-amber-500 rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                Parent Portal <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden bg-slate-950 pt-[68px]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/65 z-10" />
          <div className="noise-overlay absolute inset-0 z-20 opacity-40 mix-blend-overlay pointer-events-none" />
          <div className="amber-spot z-20" />
          <div className="vignette absolute inset-0 z-25 pointer-events-none" />
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 grayscale">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-band-playing-on-a-stage-in-front-of-a-crowd-32771-large.mp4" type="video/mp4" />
          </video>
          <div className="stage-line z-30" />
        </div>
        <div className="relative z-30 max-w-3xl px-6 py-16">
          <div className="fade-up delay-1 flex justify-center mb-7">
            <span className="tag-pill"><span className="tag-dot" /> Rocklin, CA · Enrolling now</span>
          </div>
          <h1 className="fade-up delay-2 bebas text-white leading-none mb-3"
            style={{ fontSize: "clamp(58px, 10vw, 90px)", letterSpacing: "2px" }}>
            Every musician<br />deserves a <span style={{ color: "#f59e0b" }}>stage.</span>
          </h1>
          <p className="fade-up delay-3 dm text-slate-300 text-lg leading-relaxed max-w-xl mx-auto mb-10 font-light">
            Private, semi-private, and group lessons in music and performance -
            taught by passionate instructors in a welcoming atmosphere.
          </p>
          <div className="fade-up delay-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setBookingFor("")}
              className="portal-glow inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-950 bg-amber-500 rounded-full"
            >
              Request Lessons <ArrowRight size={18} />
            </button>
            <a
              href={PORTAL_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-300 bg-white/5 border border-white/15 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              Parent Portal <ArrowRight size={18} />
            </a>
          </div>
          <div className="fade-up delay-5 mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="tel:916-435-1300" className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors dm">
              <Phone size={13} /> (916) 435-1300
            </a>
            <a href="mailto:admin@headlinermusicacademy.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors dm">
              <Mail size={13} /> admin@headlinermusicacademy.com
            </a>
            <a href="https://maps.google.com/?q=2311+Sunset+Blvd,+Rocklin,+CA+95765" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors dm">
              <MapPin size={13} /> 2311 Sunset Blvd, Rocklin, CA 95765
            </a>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center md:text-left mb-10">
          <h2 className="bebas text-[42px] sm:text-[54px] text-slate-950 tracking-wide mb-2 leading-none">
            What We <span style={{ color: "#f59e0b" }}>Offer</span>
          </h2>
          <p className="dm text-base text-slate-500">
            Click any tile to request lessons for that instrument.
          </p>
        </div>
        <div className="rounded-[24px] overflow-hidden shadow-sm" style={{ border: "1px solid #e2e8f0" }}>
          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "1px", background: "#e2e8f0" }}>
            {offerings.map((item, i) => (
              <div
                key={i}
                className={`offering-card bg-white px-4 py-10 flex flex-col items-center text-center${i === offerings.length - 1 ? " col-span-2 md:col-span-1" : ""}`}
                onClick={() => setBookingFor(item.name)}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setBookingFor(item.name)}
                aria-label={`Request ${item.name} lessons`}
              >
                <span className="text-4xl mb-5" role="img" aria-label={item.name}>{item.icon}</span>
                <h3 className="bebas text-xl text-slate-900 tracking-wide mb-1">{item.name}</h3>
                <p className="dm text-xs text-slate-500 font-medium">{item.desc}</p>
                <span className="card-hint">Request lessons →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <a 
          href="https://m.yelp.com/biz/headliner-music-academy-rocklin" 
          target="_blank" 
          rel="noreferrer"
          className="block bg-white rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-all border border-slate-200 text-center group"
        >
          <div className="flex justify-center mb-5">
            {/* 5 Stars */}
            <div className="flex gap-1 text-[#FF1A1A]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="dm text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-6 italic">
            "Love this place!! It's unique!!! Amicable and well organized. Amazing diverse and integrative for kids, young or adults ."
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="dm text-sm font-bold text-slate-900">- Socorro Baez G.</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-[#FF1A1A] group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor">
                <path d="M42.5 192.1c-19.4 0-38.6 15.6-41.9 34.6-3 17.5 7.1 36.3 23 44.3l85.8 43.2c10.3 5.2 23.3 1.1 28.5-9.1 5.2-10.2 1.3-22.9-8.9-28.1l-86.5-84.9zm294.6 63.8l-83-48.4c-9.9-5.8-22.8-2.6-28.7 7.2-5.9 9.8-2.7 22.5 7.2 28.3l82.8 48.6c16.3 9.6 36.8 5 43.6-11.4 6.7-16.1-3.6-33.8-21.9-24.3zm-131.6-9.5c-4.9-10.4-17.1-15-27.5-10.3L97.7 274.6c-16.1 7.2-22.7 26.6-14.7 41.8 7.8 14.8 26.2 19.8 41.6 11.2l83.6-46.7c10-5.6 14.4-18 9.3-28.5zm165 140.5l-85.1-44.5c-10.1-5.3-22.8-1.5-28.2 8.5-5.4 10-1.6 22.5 8.5 27.8l85.1 44.5c16.1 8.4 36.1 1.2 41.5-14.7 5.2-15.6-5.8-31.2-21.8-21.6zm-177.3 18.2c-5.5-10-18.2-13.9-28.3-8.8L37.1 442.2c-15.8 8-20.9 27.4-11.5 42.1 9.2 14.4 28.4 17.9 43.3 8L163.6 432c10.2-6.7 13.5-19.9 8.2-30.1z" />
              </svg>
              Yelp
            </span>
          </div>
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white px-5 sm:px-8 pt-16 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
            <div>
              <a href="/" className="inline-block mb-5">
                <img
                  src="https://res.cloudinary.com/diy08lj9x/image/upload/e_make_transparent:10/v1778357646/Screenshot_2026-05-01_at_12.01.01_PM_zk7upq.png"
                  alt="Headliner Music Academy" className="h-14 w-auto invert"
                />
              </a>
              <p className="dm text-slate-400 text-sm leading-relaxed max-w-xs mb-7 font-light">
                Inspiring the next generation of musicians through premium, personalized education.
              </p>
              <button
                onClick={() => setBookingFor("")}
                className="portal-glow inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-amber-500 rounded-full"
              >
                Request Lessons <ArrowRight size={14} />
              </button>
            </div>
            <div>
              <h4 className="dm text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-6">
                Contact &amp; Location
              </h4>
              <ul className="space-y-5">
                <li>
                  <a href="tel:916-435-1300" className="flex items-center gap-3 group">
                    <Phone size={18} className="text-amber-500 flex-shrink-0" />
                    <span className="dm text-xl font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight">
                      (916) 435-1300
                    </span>
                  </a>
                </li>
                <li>
                  <a href="mailto:admin@headlinermusicacademy.com" className="flex items-center gap-3 group">
                    <Mail size={18} className="text-amber-500 flex-shrink-0" />
                    <span className="dm text-sm font-semibold text-slate-300 group-hover:text-amber-400 transition-colors break-all">
                      admin@headlinermusicacademy.com
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 pt-1">
                  <MapPin size={17} className="text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="dm text-sm text-slate-500 leading-relaxed">
                    2311 Sunset Blvd<br />Rocklin, CA 95765
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="dm text-xs text-slate-600">
              © {new Date().getFullYear()} Headliner Music Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              {/* <a href="#" className="dm text-xs text-slate-500 hover:text-amber-400 transition-colors">Instagram</a> */}
              {/* <a href="#" className="dm text-xs text-slate-500 hover:text-amber-400 transition-colors">TikTok</a> */}
              <a href="https://m.yelp.com/biz/headliner-music-academy-rocklin" target="_blank" rel="noreferrer" className="dm flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#FF1A1A] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M42.5 192.1c-19.4 0-38.6 15.6-41.9 34.6-3 17.5 7.1 36.3 23 44.3l85.8 43.2c10.3 5.2 23.3 1.1 28.5-9.1 5.2-10.2 1.3-22.9-8.9-28.1l-86.5-84.9zm294.6 63.8l-83-48.4c-9.9-5.8-22.8-2.6-28.7 7.2-5.9 9.8-2.7 22.5 7.2 28.3l82.8 48.6c16.3 9.6 36.8 5 43.6-11.4 6.7-16.1-3.6-33.8-21.9-24.3zm-131.6-9.5c-4.9-10.4-17.1-15-27.5-10.3L97.7 274.6c-16.1 7.2-22.7 26.6-14.7 41.8 7.8 14.8 26.2 19.8 41.6 11.2l83.6-46.7c10-5.6 14.4-18 9.3-28.5zm165 140.5l-85.1-44.5c-10.1-5.3-22.8-1.5-28.2 8.5-5.4 10-1.6 22.5 8.5 27.8l85.1 44.5c16.1 8.4 36.1 1.2 41.5-14.7 5.2-15.6-5.8-31.2-21.8-21.6zm-177.3 18.2c-5.5-10-18.2-13.9-28.3-8.8L37.1 442.2c-15.8 8-20.9 27.4-11.5 42.1 9.2 14.4 28.4 17.9 43.3 8L163.6 432c10.2-6.7 13.5-19.9 8.2-30.1z" />
                </svg>
                Yelp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}