import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { C, fonts } from "./tokens";
import { submitLead } from "./lib/formDelivery";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIMES = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–8pm)"];
const CRM_TENANT_ID = process.env.NEXT_PUBLIC_CRM_TENANT_ID || "00000000-0000-0000-0000-000000000001";

const EMAILJS_SERVICE_ID = "service_734y6qg";
const EMAILJS_TEMPLATE_ID = "template_czlclec";
const EMAILJS_PUBLIC_KEY = "FdW-lGbAyQuJZFy-y";

const offerings = [
  { icon: "🎸", name: "Guitar" },
  { icon: "🎹", name: "Piano" },
  { icon: "🥁", name: "Drums" },
  { icon: "🎸", name: "Bass" },
  { icon: "🎤", name: "Vocals" },
  { icon: "🎺", name: "Brass" },
  { icon: "🎻", name: "Strings" },
  { icon: "🤘", name: "Band Performance" },
  { icon: "🎉", name: "Private Parties" },
  { icon: "🎙️", name: "Recording Studio" },
];

function Button({ children, variant = "primary", href, disabled, style, className, onClick, ...rest }) {
  const [isHovered, setIsHovered] = useState(false);

  let bg;
  let color;
  let border;
  let hoverBg;
  let hoverColor;

  if (variant === "primary") {
    bg = disabled ? C.border : C.crimson;
    color = disabled ? C.muted : C.white;
    border = "none";
    hoverBg = disabled ? C.border : C.crimsonHover;
    hoverColor = disabled ? C.muted : C.white;
  } else if (variant === "ghost") {
    bg = C.white07;
    color = C.white80;
    border = `1px solid ${C.white15}`;
    hoverBg = C.white10;
    hoverColor = C.white;
  } else if (variant === "yellow") {
    bg = C.yellow;
    color = C.espresso;
    border = "none";
    hoverBg = C.yellowHover;
    hoverColor = C.espresso;
  } else if (variant === "outlineRed") {
    bg = "transparent";
    color = C.crimson;
    border = `1.5px solid ${C.crimson}`;
    hoverBg = C.crimson;
    hoverColor = C.white;
  }

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "13px 32px",
    borderRadius: 999,
    border,
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    transition: "all 0.2s",
    background: isHovered ? hoverBg : bg,
    color: isHovered ? hoverColor : color,
    ...style,
  };

  const Element = href ? "a" : "button";

  return (
    <Element
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {children}
    </Element>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted }}>
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
      type="button"
      style={{
        padding: "7px 14px",
        borderRadius: 999,
        border: active ? `1.5px solid ${C.crimson}` : `1px solid ${C.border}`,
        background: active ? C.crimson06 : C.inputBg,
        color: active ? C.crimson : C.muted,
        fontFamily: fonts.body,
        fontSize: 13,
        fontWeight: active ? 700 : 400,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

export default function BookingModal({ instrument, onClose }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    instrument: instrument || "",
    level: "",
    days: [],
    times: [],
    notes: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setForm((current) => ({ ...current, instrument: instrument || current.instrument || "" }));
  }, [instrument]);

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggleArr = (key, value) =>
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.instrument.trim() || !form.level || !form.email.trim()) return;
    setStatus("sending");

    const leadPayload = {
      tenant_id: CRM_TENANT_ID,
      intake_type: "lesson_inquiry",
      source_form: "app_booking_modal",
      source_page: window.location.pathname,
      full_name: form.name,
      email: form.email,
      phone: form.phone || null,
      program_label: form.instrument || "General",
      referrer: window.location.href,
      payload: {
        age: form.age || null,
        instrument: form.instrument || "General",
        experience_level: form.level,
        preferred_days: form.days,
        preferred_times: form.times,
        message: form.notes || null,
      },
    };

    const emailPayload = {
      form_type: "Lesson Inquiry",
      name: form.name,
      age: form.age || "Not provided",
      email: form.email,
      phone: form.phone || "Not provided",
      instrument: form.instrument || "General",
      experience_level: form.level,
      days: form.days.join(", ") || "Not specified",
      time_of_day: form.times.join(", ") || "Not specified",
      message: form.notes || "None",
      preferred_date: "N/A",
      time_window: "N/A",
    };

    try {
      await submitLead({
        leadPayload,
        emailPayload,
        emailConfig: {
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID,
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      });
      setStatus("success");
    } catch (error) {
      console.error("Lead submit failed:", error);
      setStatus("error");
    }
  };

  const valid = form.name.trim() && form.email.trim() && form.instrument.trim() && form.level && status === "idle";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: C.espresso75,
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: C.white,
          borderRadius: 24,
          width: "100%",
          maxWidth: 520,
          padding: "40px 36px",
          position: "relative",
          boxSizing: "border-box",
          margin: "auto",
          boxShadow: `0 24px 64px ${C.black20}`,
          border: `1px solid ${C.border}`,
        }}
      >
        {status !== "sending" && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: C.border,
              border: "none",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: C.muted,
            }}
          >
            <X size={16} />
          </button>
        )}

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎶</div>
            <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 28, color: C.crimson, margin: "0 0 6px", lineHeight: 1.1 }}>
              We&apos;ll be in touch soon!
            </h2>
            <p style={{ fontFamily: fonts.body, color: C.muted, fontSize: 14, lineHeight: 1.5, maxWidth: 360, margin: "0 auto 24px" }}>
              We&apos;ll get back to you within the next 24 hours. Expect a call from us to get everything set up.
            </p>
            <Button onClick={onClose}>Back to site</Button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 28, color: C.crimson, margin: "0 0 4px", lineHeight: 1.1 }}>
                Let&apos;s find your sound.
              </h2>
              <p style={{ fontFamily: fonts.body, fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.5 }}>
                Tell us a little about your musician and we&apos;ll call you to set things up.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <Field label="Student name *">
                <input type="text" placeholder="e.g. Jordan Smith" value={form.name} onChange={(event) => set("name", event.target.value)} />
              </Field>
              <Field label="Your email *">
                <input type="email" placeholder="e.g. parent@email.com" value={form.email} onChange={(event) => set("email", event.target.value)} />
                <p style={{ fontFamily: fonts.body, fontSize: 11, color: C.subtext, margin: "4px 0 0" }}>
                  We&apos;ll only use this to confirm your inquiry. No spam, ever.
                </p>
              </Field>
              <Field label="Phone">
                <input type="tel" placeholder="e.g. (916) 555-0123" value={form.phone} onChange={(event) => set("phone", event.target.value)} />
              </Field>
              <Field label="Age (optional)">
                <input type="number" placeholder="e.g. 14" min={4} max={99} value={form.age} onChange={(event) => set("age", event.target.value)} style={{ maxWidth: 120 }} />
              </Field>
              <Field label="Instrument or program *">
                <div style={{ position: "relative" }}>
                  <select value={form.instrument} onChange={(event) => set("instrument", event.target.value)} style={{ paddingRight: 36 }}>
                    <option value="">Select one…</option>
                    {offerings.map((offering) => (
                      <option key={offering.name} value={offering.name}>
                        {offering.icon} {offering.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: C.subtext }} />
                </div>
              </Field>
              <Field label="Experience level *">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Beginner", "Intermediate", "Advanced", "I don't know"].map((level) => (
                    <PillToggle key={level} label={level} active={form.level === level} onClick={() => set("level", level)} />
                  ))}
                </div>
              </Field>
              <Field label="Days that work best">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {DAYS.map((day) => (
                    <PillToggle key={day} label={day} active={form.days.includes(day)} onClick={() => toggleArr("days", day)} />
                  ))}
                </div>
              </Field>
              <Field label="Preferred time of day">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TIMES.map((time) => (
                    <PillToggle key={time} label={time} active={form.times.includes(time)} onClick={() => toggleArr("times", time)} />
                  ))}
                </div>
              </Field>
              <Field label="Anything we should know?">
                <textarea rows={4} placeholder="Goals, favorite artists, prior experience, scheduling notes..." value={form.notes} onChange={(event) => set("notes", event.target.value)} />
              </Field>

              {status === "error" && (
                <p style={{ color: C.crimson, fontSize: 13, margin: "-4px 0 0" }}>
                  Something went wrong. Please try again or call us directly.
                </p>
              )}

              <Button onClick={handleSubmit} disabled={!valid} style={{ width: "100%", marginTop: 4, fontSize: 15 }}>
                {status === "sending" ? "Sending…" : "Request lessons"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}