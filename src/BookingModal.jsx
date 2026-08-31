import { useEffect, useMemo, useState } from "react";
import { submitLead } from "./lib/formDelivery";
import { C, fonts } from "./tokens";
import { Button, FormField, Input, Modal, PillToggle, Select, Textarea } from "./ui";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["Morning", "Afternoon", "Evening"];
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

const fieldTextStyle = {
  fontSize: 16,
  padding: "13px 16px",
};

function normalizeInstrument(instrument) {
  return instrument || "";
}

export default function BookingModal({ instrument, onClose }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    instrument: normalizeInstrument(instrument),
    level: "",
    days: [],
    times: [],
    notes: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setForm((current) => ({
      ...current,
      instrument: normalizeInstrument(instrument) || current.instrument || "",
    }));
  }, [instrument]);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const toggleArrayField = (key, value) =>
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));

  const valid = useMemo(
    () => form.name.trim() && form.email.trim() && form.instrument.trim() && form.level && status === "idle",
    [form, status],
  );

  const handleSubmit = async () => {
    if (!valid) return;
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

  return (
    <Modal onClose={onClose} maxWidth={980} style={{ padding: "46px 42px 38px" }}>
      <style>{`
        @media (max-width: 768px) {
          .booking-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }

          .booking-modal-divider {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
      `}</style>

      {status === "success" ? (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🎶</div>
          <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 30, color: C.crimson, margin: "0 0 6px", lineHeight: 1.1 }}>
            We'll be in touch soon!
          </h2>
          <p style={{ fontFamily: fonts.body, color: C.muted, fontSize: 16, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 24px" }}>
            We'll get back to you within the next 24 hours. Expect a call from us to get everything set up.
          </p>
          <Button onClick={onClose}>Back to site</Button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 22, paddingRight: 28 }}>
            <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 34, color: C.crimson, margin: "0 0 8px", lineHeight: 1.05 }}>
              Let's find your sound.
            </h2>
            <p style={{ fontFamily: fonts.body, fontSize: 17, color: C.muted, margin: 0, lineHeight: 1.65, maxWidth: 620 }}>
              Tell us a little about your musician and we'll call you to set things up.
            </p>
          </div>

          <div className="booking-modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 26, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 140px", gap: 14, alignItems: "end" }}>
                <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Student name *</span>}>
                  <Input type="text" placeholder="e.g. Jordan Smith" value={form.name} onChange={(event) => setField("name", event.target.value)} style={fieldTextStyle} />
                </FormField>

                <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Age</span>}>
                  <Input type="number" placeholder="e.g. 14" min={4} max={99} value={form.age} onChange={(event) => setField("age", event.target.value)} style={{ ...fieldTextStyle, maxWidth: "100%" }} />
                </FormField>
              </div>

              <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Phone</span>}>
                <Input type="tel" placeholder="e.g. (916) 555-0123" value={form.phone} onChange={(event) => setField("phone", event.target.value)} style={fieldTextStyle} />
              </FormField>

              <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Your email *</span>} hint={<span style={{ fontSize: 13, color: C.muted }}>We'll only use this to confirm your inquiry. No spam, ever.</span>}>
                <Input type="email" placeholder="e.g. parent@email.com" value={form.email} onChange={(event) => setField("email", event.target.value)} style={fieldTextStyle} />
              </FormField>

              <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Instrument or program *</span>}>
                <Select value={form.instrument} onChange={(event) => setField("instrument", event.target.value)} style={{ width: "100%" }} selectStyle={fieldTextStyle}>
                  <option value="">Select one…</option>
                  {offerings.map((offering) => (
                    <option key={offering.name} value={offering.name}>
                      {offering.icon} {offering.name}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Experience level *</span>}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <PillToggle key={level} label={level} active={form.level === level} onClick={() => setField("level", level)} />
                  ))}
                </div>
              </FormField>
            </div>

            <div className="booking-modal-divider" style={{ display: "flex", flexDirection: "column", gap: 16, borderLeft: `1px solid ${C.border}`, paddingLeft: 22 }}>
              <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Days that work best</span>}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {DAYS.map((day) => (
                    <PillToggle key={day} label={day} active={form.days.includes(day)} onClick={() => toggleArrayField("days", day)} />
                  ))}
                </div>
              </FormField>

              <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Preferred time of day</span>}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TIMES.map((time) => (
                    <PillToggle key={time} label={time} active={form.times.includes(time)} onClick={() => toggleArrayField("times", time)} />
                  ))}
                </div>
              </FormField>

              <FormField label={<span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: "none", color: C.espresso }}>Anything else?</span>}>
                <Textarea rows={10} placeholder="Goals, questions, previous experience, scheduling notes..." value={form.notes} onChange={(event) => setField("notes", event.target.value)} style={{ ...fieldTextStyle, minHeight: 246 }} />
              </FormField>
            </div>
          </div>

          {status === "error" && (
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 13,
                color: C.errorText,
                background: C.errorBg,
                border: `1px solid ${C.errorBorder}`,
                borderRadius: 10,
                padding: "10px 14px",
                margin: "18px 0 0",
              }}
            >
              Something went wrong. Please try again or reach us at (916) 435-1300.
            </p>
          )}

          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 12 }}>
            <Button onClick={handleSubmit} disabled={!valid} style={{ width: "100%", fontSize: 16, padding: "16px 32px" }}>
              {status === "sending" ? "Sending…" : "Let's make music"}
            </Button>
            <p style={{ textAlign: "center", fontFamily: fonts.body, fontSize: 12, color: C.muted, margin: 0 }}>
              Or call us at{" "}
              <a href="tel:916-435-1300" style={{ color: C.crimson, fontWeight: 700, textDecoration: "none" }}>
                (916) 435-1300
              </a>
            </p>
          </div>
        </>
      )}
    </Modal>
  );
}