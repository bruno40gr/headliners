import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { C, fonts, pageArchetypes } from "./tokens";
import ProgramsNav from "./ProgramsNav";
import {
  Button,
  Bubble,
  CTASection,
  Card,
  Eyebrow,
  FAQList,
  FormField,
  Input,
  Modal,
  TextBlock,
  Textarea,
  globalStyles,
} from "./ui";
import { submitLead } from "./lib/formDelivery";

const CRM_TENANT_ID = process.env.NEXT_PUBLIC_CRM_TENANT_ID || "00000000-0000-0000-0000-000000000001";

function ServiceInquiryModal({ serviceName, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", details: "" });
  const [status, setStatus] = useState("idle");

  const valid = form.name.trim() && form.email.trim() && status !== "sending";
  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!valid) return;
    setStatus("sending");

    const leadPayload = {
      tenant_id: CRM_TENANT_ID,
      intake_type: "service_inquiry",
      source_form: "services_modal",
      source_page: window.location.pathname,
      full_name: form.name,
      email: form.email,
      phone: form.phone || null,
      service_label: serviceName,
      referrer: window.location.href,
      payload: {
        message: form.details || null,
      },
    };

    const emailPayload = {
      form_type: "Service Inquiry",
      name: form.name,
      email: form.email,
      phone: form.phone || "Not provided",
      instrument: serviceName,
      experience_level: "N/A",
      days: "N/A",
      time_of_day: "N/A",
      preferred_date: "N/A",
      time_window: "N/A",
      message: form.details || "No additional details",
    };

    try {
      await submitLead({
        leadPayload,
        emailPayload,
        emailConfig: {
          serviceId: "service_734y6qg",
          templateId: "template_czlclec",
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
    <Modal onClose={onClose} maxWidth={560}>
      {status === "success" ? (
        <div style={{ textAlign: "center", padding: "14px 0" }}>
          <TextBlock as="h2" variant="heading" style={{ marginBottom: 10 }}>
            We will be in touch soon.
          </TextBlock>
          <TextBlock style={{ maxWidth: 420, margin: "0 auto 24px" }}>
            Thanks for reaching out about {serviceName.toLowerCase()}. We will follow up by email or phone to talk through what you need.
          </TextBlock>
          <Button onClick={onClose}>Close</Button>
        </div>
      ) : (
        <>
          <TextBlock as="h2" variant="heading" style={{ marginBottom: 12 }}>
            Ask about {serviceName.toLowerCase()}.
          </TextBlock>
          <TextBlock style={{ marginBottom: 24 }}>
            Tell us what you need and we will follow up.
          </TextBlock>
          <div style={{ display: "grid", gap: 16 }}>
            <FormField label="Your name *">
              <Input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Your name" />
            </FormField>
            <FormField label="Email *">
              <Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@email.com" />
            </FormField>
            <FormField label="Phone">
              <Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="(916) 555-1234" />
            </FormField>
            <FormField label="Details">
              <Textarea rows={4} value={form.details} onChange={(e) => setField("details", e.target.value)} placeholder="Project, event, room, gear, or timing." />
            </FormField>
            {status === "error" && (
              <p style={{ fontFamily: fonts.body, fontSize: 13, color: C.errorText, background: C.errorBg, border: `1px solid ${C.errorBorder}`, borderRadius: 10, padding: "10px 14px", margin: 0 }}>
                Something went wrong. Please try again or email us at admin@headlinermusicacademy.com.
              </p>
            )}
            <Button onClick={handleSubmit} disabled={!valid} style={{ width: "100%" }}>
              {status === "sending" ? "Sending..." : "Reach out"}
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

export default function ServicesPage({
  navigate,
  onRequestLessons,
  title,
  sectionTitle,
  intro,
  serviceList,
  listIntro,
  gallery,
  galleryIntro,
  faqs,
  ctaTitle,
  ctaBody,
  pageName,
}) {
  const archetype = pageArchetypes.professionalServices;
  const displayFont = fonts[archetype.displayFont] || fonts.displaySerious;
  const serviceRadius = 14;
  const [modalOpen, setModalOpen] = useState(false);
  const heroImage = gallery[0];
  const remainingGallery = gallery.slice(1);

  return (
    <div style={{ fontFamily: fonts.body, background: C.cream, color: C.text, overflowX: "hidden" }}>
      <style>{globalStyles}</style>
      <style>{`
        @media (max-width: 980px) {
          .svc-hero-grid,
          .svc-body-grid,
          .svc-gallery-grid,
          .svc-faq-grid {
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

      <section style={{ background: C.espresso, color: C.white, padding: "118px 24px 84px", position: "relative", overflow: "hidden" }}>
        <Bubble top={-90} right={-70} size={300} color={C.white07} />
        <Bubble bottom={-120} left={-90} size={280} color={C.white07} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 38%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="svc-hero-grid" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 44, alignItems: "center" }}>
            <div>
              <TextBlock as="h1" variant="display" accent={C.white} style={{ fontFamily: displayFont, fontSize: "clamp(42px, 6vw, 70px)", marginBottom: 20 }}>
                {title}
              </TextBlock>
              <TextBlock style={{ color: C.white70, fontSize: 18, lineHeight: 1.72, maxWidth: 580, marginBottom: 28 }}>
                {intro}
              </TextBlock>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
                <Button onClick={() => setModalOpen(true)} size="lg">Reach out <ArrowRight size={16} /></Button>
                <Button href="mailto:admin@headlinermusicacademy.com" variant="ghost" size="lg">Email us</Button>
              </div>
            </div>

            <div style={{ position: "relative", borderRadius: serviceRadius, overflow: "hidden", border: `1px solid ${C.white15}`, boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}>
              <img
                src={heroImage.image}
                alt={heroImage.alt}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.white, padding: "72px 24px" }}>
        <div className="svc-body-grid" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 36, alignItems: "start" }}>
          <div>
            <Eyebrow accent={C.teal}>What we offer</Eyebrow>
            <TextBlock as="h2" variant="heading" style={{ fontFamily: displayFont, marginBottom: 14 }}>
              {sectionTitle || title}
            </TextBlock>
            <TextBlock style={{ marginBottom: 0 }}>
              {listIntro}
            </TextBlock>
          </div>
          <Card accent={C.teal} radius={serviceRadius}>
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 12, color: C.text, lineHeight: 1.6, fontWeight: 500, fontSize: 16, fontFamily: fonts.body }}>
              {serviceList.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        </div>
      </section>

      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div className="svc-gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {remainingGallery.map((item) => (
              <Card key={item.title} image={item.image} imageAlt={item.alt} imageHeight={220} accent={C.teal} radius={serviceRadius}>
                <TextBlock as="h3" variant="heading" style={{ fontFamily: displayFont, fontSize: 24, marginBottom: 8 }}>
                  
                  {item.title}
                </TextBlock>
                <TextBlock style={{ marginBottom: 0 }}>{item.caption}</TextBlock>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.white, padding: "72px 24px" }}>
        <div className="svc-faq-grid" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "0.78fr 1.22fr", gap: 40, alignItems: "start" }}>
          <div>
            <Eyebrow accent={C.teal}>FAQ</Eyebrow>
            <TextBlock as="h2" variant="heading" style={{ fontFamily: displayFont, marginBottom: 14 }}>
              A few common questions.
            </TextBlock>
            
          </div>
          <FAQList items={faqs} questionFontFamily={displayFont} />
        </div>
      </section>

      <CTASection eyebrow="Get in touch" title={ctaTitle} body={ctaBody} accent={C.teal}>
        <Button onClick={() => setModalOpen(true)}>Reach out</Button>
        <Button href="mailto:admin@headlinermusicacademy.com" variant="ghost">Email us</Button>
      </CTASection>

      {modalOpen && <ServiceInquiryModal serviceName={pageName} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
