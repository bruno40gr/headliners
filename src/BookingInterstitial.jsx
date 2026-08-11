/*
  BookingInterstitial — shared component
  Used by all program pages that have a self-booking flow.

  To add to a new program page:
  1. Import this component
  2. Pass programName, programColor, opusL1/L2/L3, onClose, and EmailJS props
  3. Render it conditionally based on local interstitialOpen state

  When separate Opus URLs exist for L2 and L3, update opusL2 and opusL3 props
  on each page individually without touching this component.
*/

import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { C, fonts } from "./tokens";
import { PROGRAMS } from "./ProgramsNav";

/* ─── Field ──────────────────────────────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontFamily: fonts.body,
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted,
      }}>{label}</label>
      {children}
    </div>
  );
}

/* ─── PillToggle ─────────────────────────────────────────────────────────── */
function PillToggle({ label, active, onClick }) {
  return (
    <button onClick={onClick} type="button" style={{
      padding: "7px 14px", borderRadius: 999,
      border: active ? `1.5px solid ${C.crimson}` : `1px solid ${C.border}`,
      background: active ? C.crimson06 : C.inputBg,
      color: active ? C.crimson : C.muted,
      fontFamily: fonts.body,
      fontSize: 13, fontWeight: active ? 700 : 400,
      cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function BookingInterstitial({
  programName,
  programColor,
  opusL1,
  opusL2,
  opusL3,
  onClose,
  emailjsServiceId,
  emailjsTemplateId,
  emailjsPublicKey,
  initialScreen = 1,
  submitLabel = "Continue to booking",
}) {
  const [screen, setScreen] = useState(initialScreen);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [form, setForm] = useState({
    name: "", studentName: "", age: "", program: programName, email: "", phone: "",
    date: "", timeWindow: "",
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState("idle");
  const [programOpen, setProgramOpen] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleContinueToBooking = () => {
    const url = selectedLevel === 1 ? opusL1
      : selectedLevel === 2 ? opusL2
      : selectedLevel === 3 ? opusL3
      : opusL1;
    window.open(url, "_blank");
    onClose();
  };

  const handleSubmitTour = async () => {
    if (!form.name.trim() || !form.studentName.trim() || !form.date || !form.timeWindow) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_734y6qg",
          template_id: "template_czlclec",
          user_id: "FdW-lGbAyQuJZFy-y",
            template_params: {
              form_type: "Tour Request",
              name: form.name,
              age: form.age || "Not provided",
              email: form.email || "Not provided",
              instrument: form.program || "Not specified",
              experience_level: "N/A",
              time_of_day: "N/A",
              days: "N/A",
              preferred_date: form.date || "Not specified",
              time_window: form.timeWindow || "Not specified",
              message: "N/A",
              sms_consent: smsConsent ? "Yes" : "No",
            },
        }),
      });
      const text = await res.text();
      setStatus(res.ok ? "success" : "error");
      if (!res.ok) console.error("EmailJS:", text);
    } catch {
      setStatus("error");
    }
  };

  const isSaturday = form.date && new Date(form.date + "T00:00:00").getDay() === 6;
  const availableTimes = isSaturday
    ? ["Morning (8am to 12pm)", "Afternoon (12pm to 4pm)", "Evening (4pm to 8pm)"]
    : ["Afternoon (12pm to 4pm)", "Evening (4pm to 8pm)"];

  const tourValid = form.name.trim() && form.studentName.trim() && form.date && form.timeWindow && status === "idle";

  /* ─── Screen 1: Level selector ────────────────────────────────────────── */
  const renderScreen1 = () => {
    const levels = [
      { value: 1, label: "Level 1", desc: "Your child is new to the keys. They're finding their footing, learning finger placement, and playing their first songs." },
      { value: 2, label: "Level 2", desc: "Your child can play simple songs and is starting to read music. Chords and hand coordination are next." },
      { value: 3, label: "Level 3", desc: "Your child feels comfortable at the piano. They're using both hands, sight-reading, and growing their repertoire." },
      { value: "unsure", label: "I'm not sure", desc: "No worries. Our teacher will spend a few minutes with your child at the start and place them in the right level." },
    ];
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {levels.map(({ value, label, desc }) => {
            const isSelected = selectedLevel === value;
            return (
              <div
                key={String(value)}
                onClick={() => setSelectedLevel(value)}
                style={{
                  background: isSelected ? `${programColor}12` : "#fff",
                  border: isSelected
                    ? `2px solid ${programColor}`
                    : `1.5px solid #E0D4CC`,
                  borderRadius: 12, padding: "14px 20px",
                  cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 14,
                  transition: "all 0.15s",
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  border: `2px solid ${isSelected ? programColor : "#E0D4CC"}`,
                  background: isSelected ? programColor : "transparent",
                  flexShrink: 0, marginTop: 2,
                }} />
                <div>
                  <span style={{
                    fontFamily: fonts.display, fontWeight: 700,
                    fontSize: 16, color: C.espresso, display: "block",
                  }}>{label}</span>
                  <p style={{
                    fontFamily: fonts.body, fontSize: 13, color: C.muted,
                    margin: "4px 0 0", lineHeight: 1.5,
                  }}>{desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleContinueToBooking}
          disabled={selectedLevel === null}
          style={{
            width: "100%",
            background: selectedLevel === null ? "#D0C4BC" : C.crimson,
            color: C.white, border: "none", borderRadius: 999,
            padding: "13px 32px", fontFamily: fonts.body, fontSize: 13,
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: selectedLevel === null ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {submitLabel}
        </button>

        <p style={{ fontFamily: fonts.body, fontSize: 13, color: C.muted, marginTop: 12, textAlign: "center" }}>
          Want to visit first?{" "}
          <button
            onClick={() => setScreen(2)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: fonts.body, fontSize: 13,
              color: C.tealDark, fontWeight: 600, padding: 0,
              textDecoration: "underline", textUnderlineOffset: 3,
            }}
          >
            Come say hi.
          </button>
        </p>
      </div>
    );
  };

  /* ─── Screen 2: Tour booking form ─────────────────────────────────────── */
  const renderScreen2 = () => {
    if (status === "success") {
      return (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
          <h2 style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: 28, color: C.crimson, margin: "0 0 6px",
          }}>See you soon!</h2>
          <p style={{
            fontFamily: fonts.body, fontSize: 14, color: C.muted,
            lineHeight: 1.5, maxWidth: 360, margin: "0 auto 24px",
          }}>
            We are looking forward to meeting you. Let us know if anything changes and we will find another time that works.
          </p>
          <button
            onClick={onClose}
            style={{
              background: C.crimson, color: C.white, border: "none",
              borderRadius: 999, padding: "13px 32px",
              fontFamily: fonts.body, fontSize: 13, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.crimsonHover; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.crimson; }}
          >
            Back to site
          </button>
        </div>
      );
    }

    return (
      <div className="bi-tour-form">
        <p style={{
          fontFamily: fonts.body, fontSize: 14, color: C.muted,
          lineHeight: 1.5, margin: "0 0 16px",
        }}>
          Pick a day and time below. Just come by at that time and our friendly team will be ready to show you around.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Field label="Your name *">
            <input
              type="text"
              placeholder="First and last name"
              value={form.name}
              onChange={e => set("name", e.target.value)}
            />
          </Field>
          <Field label="Student name *">
            <input
              type="text"
              placeholder="Your child's first name"
              value={form.studentName}
              onChange={e => set("studentName", e.target.value)}
            />
          </Field>
          <Field label="Student age">
            <input
              type="text"
              placeholder="e.g. 4, or turning 5 in August"
              value={form.age}
              onChange={e => set("age", e.target.value)}
            />
          </Field>
          <Field label="Interested in">
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setProgramOpen(o => !o)}
                style={{
                  background: C.inputBg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  color: form.program ? C.espresso : C.placeholder,
                  fontFamily: fonts.body,
                  fontSize: 14,
                  padding: "10px 14px",
                  width: "100%",
                  boxSizing: "border-box",
                  outline: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <span style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {form.program || "Select a program…"}
                </span>
                <ChevronDown
                  size={14}
                  style={{
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: programOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: C.subtext,
                  }}
                />
              </button>
              {programOpen && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(26,19,15,0.08)",
                  zIndex: 10,
                  maxHeight: 240,
                  overflowY: "auto",
                }}>
                  {PROGRAMS.map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        set("program", p.label);
                        setProgramOpen(false);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        padding: "10px 14px",
                        cursor: "pointer",
                        fontFamily: fonts.body,
                        fontSize: 14,
                        color: C.espresso,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#FAF9F7"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
                    >
                      <span style={{ fontWeight: 600, display: "block" }}>{p.label}</span>
                      <span style={{ fontSize: 11, color: C.muted }}>{p.sub}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Field>
          <Field label="Email">
            <input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={e => set("email", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              placeholder="(916) 000-0000"
              value={form.phone}
              onChange={e => set("phone", e.target.value)}
            />
          </Field>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 2 }}>
            <input
              type="checkbox"
              id="sms-consent"
              checked={smsConsent}
              onChange={e => setSmsConsent(e.target.checked)}
              style={{
                width: 16, height: 16, marginTop: 2, flexShrink: 0,
                accentColor: C.crimson, cursor: "pointer",
              }}
            />
            <label
              htmlFor="sms-consent"
              style={{
                fontFamily: fonts.body, fontSize: 11, color: C.muted,
                lineHeight: 1.5, cursor: "pointer",
              }}
            >
              By checking this box, I agree to receive SMS messages from Headliner Music Academy regarding scheduling, billing, reminders, account updates, and promotional messages about programs and events. Message frequency varies. Reply STOP to opt out at any time.
            </label>
          </div>
          <Field label="Preferred date *">
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={form.date}
              onChange={e => {
                const newDate = e.target.value;
                const newIsSaturday = newDate && new Date(newDate + "T00:00:00").getDay() === 6;
                setForm(f => ({
                  ...f,
                  date: newDate,
                  timeWindow: (!newIsSaturday && f.timeWindow === "Morning (8am to 12pm)") ? "" : f.timeWindow,
                }));
              }}
            />
          </Field>
          <Field label="Preferred time *">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {availableTimes.map(t => (
                <PillToggle
                  key={t}
                  label={t}
                  active={form.timeWindow === t}
                  onClick={() => set("timeWindow", form.timeWindow === t ? "" : t)}
                />
              ))}
            </div>
            {!isSaturday && form.date && (
              <p style={{ fontFamily: fonts.body, fontSize: 11, color: C.subtext, margin: "6px 0 0" }}>
                We open at 12pm on weekdays. Mornings are available on Saturdays only.
              </p>
            )}
          </Field>

          {status === "error" && (
            <p style={{
              fontFamily: fonts.body, fontSize: 13, color: C.crimson,
              margin: 0,
            }}>
              Something went wrong. Please try again or call us at (916) 435-1300.
            </p>
          )}

          <button
            onClick={handleSubmitTour}
            disabled={!tourValid}
            style={{
              width: "100%",
              background: !tourValid ? "#D0C4BC" : C.crimson,
              color: C.white, border: "none", borderRadius: 999,
              padding: "13px 32px", fontFamily: fonts.body, fontSize: 13,
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: !tourValid ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {status === "sending" ? "Sending..." : "Book a tour"}
          </button>

          <div style={{ textAlign: "center", marginTop: 4 }}>
            <button
              onClick={() => setScreen(1)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: fonts.body, fontSize: 13, color: C.muted,
                padding: 0, textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.textDecoration = "underline"; }}
              onMouseLeave={e => { e.currentTarget.style.textDecoration = "none"; }}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ─── Render ──────────────────────────────────────────────────────────── */
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(26,19,15,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16, overflowY: "auto",
      }}
    >
      <div style={{
        background: C.white, borderRadius: 24, width: "100%", maxWidth: 540,
        padding: "40px 36px", position: "relative", boxSizing: "border-box",
        margin: "auto", maxHeight: "90vh", overflowY: "auto",
        boxShadow: `0 24px 64px ${C.black20}`,
        border: `1px solid ${C.border}`,
      }}>
        {status !== "sending" && (
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            background: C.border, border: "none", borderRadius: "50%",
            width: 34, height: 34, display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", color: C.muted,
          }}>
            <X size={16} />
          </button>
        )}

        {screen === 1 && (
          <h2 style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: 20, color: C.espresso, margin: "0 0 20px",
          }}>What level is your child in?</h2>
        )}
        {screen === 2 && status !== "success" && (
          <h2 style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: 28, color: C.crimson, margin: "0 0 6px",
          }}>Come see us</h2>
        )}

        {screen === 1 && renderScreen1()}
        {screen === 2 && renderScreen2()}
      </div>

      <style>{`
        .bi-tour-form select { appearance:none !important; -webkit-appearance:none !important; }
        .bi-tour-form input, .bi-tour-form select, .bi-tour-form textarea {
          background: ${C.inputBg} !important;
          border: 1px solid ${C.border} !important;
          border-radius: 10px !important;
          color: ${C.espresso} !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          padding: 10px 14px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          outline: none !important;
          transition: border-color 0.2s !important;
        }
        .bi-tour-form input:focus, .bi-tour-form select:focus, .bi-tour-form textarea:focus {
          border-color: ${C.crimson} !important;
          background: ${C.white} !important;
        }
        .bi-tour-form input::placeholder, .bi-tour-form textarea::placeholder { color: ${C.placeholder} !important; }
        .bi-tour-form textarea { resize: vertical; }
        .bi-tour-form input[type="number"] { max-width:120px !important; width:120px !important; }
      `}</style>
    </div>
  );
}