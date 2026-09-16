/* global process */

import { useMemo, useState } from 'react';
import { Check, ChevronDown, Music, Phone, Sparkles, Users } from 'lucide-react';
import ProgramsNav from './ProgramsNav';
import { submitLead } from './lib/formDelivery';
import { C, fonts } from './tokens';
import { Button } from './ui';

const SPECIAL_EVENT = {
  name: 'Hot Chili Cool Cars',
  source: 'hot_chili_cool_cars',
  offerCode: '40_percent_first_month',
  discount: '40% off',
  logo: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787857019/cbc0a656-bb2a-4244-bae6-04a2d6abec11.png',
};

const CRM_TENANT_ID = process.env.NEXT_PUBLIC_CRM_TENANT_ID || '00000000-0000-0000-0000-000000000001';
const EMAILJS_SERVICE_ID = 'service_734y6qg';
const EMAILJS_TEMPLATE_ID = 'template_czlclec';
const EMAILJS_PUBLIC_KEY = 'FdW-lGbAyQuJZFy-y';

const programs = [
  {
    name: 'Private Music Lessons',
    ages: 'Kids, teens, and adults',
    description: 'One-on-one instruction for piano, guitar, voice, drums, strings, brass, and more.',
    icon: Music,
    accent: C.teal,
    background: C.teal06,
  },
  {
    name: 'Early Childhood Music',
    ages: 'Ages 3–7',
    description: 'Little Rockers and Tiny Keys build confidence through songs, rhythm, movement, and play.',
    icon: Sparkles,
    accent: C.crimson,
    background: C.crimson06,
  },
  {
    name: 'Band Program',
    ages: 'Young musicians ready to play together',
    description: 'Guided rehearsals, real stage experience, and monthly performances with a band.',
    icon: Users,
    accent: C.yellowDark,
    background: C.yellow05,
  },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  studentAge: '',
  program: '',
  notes: '',
};

const inputStyle = {
  width: '100%',
  background: C.inputBg,
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  boxSizing: 'border-box',
  color: C.espresso,
  fontFamily: fonts.body,
  fontSize: 15,
  outline: 'none',
  padding: '13px 14px',
};

export default function SpecialOfferPage({ navigate }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  const valid = useMemo(
    () => form.name.trim() && form.email.trim() && form.phone.trim() && form.program && status === 'idle',
    [form, status],
  );

  const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const chooseProgram = (program) => {
    setField('program', program);
    document.getElementById('special-offer-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!valid) return;

    setStatus('sending');

    const leadPayload = {
      tenant_id: CRM_TENANT_ID,
      intake_type: 'special_offer_inquiry',
      source_form: 'special_offer_form',
      source_page: window.location.pathname,
      full_name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      program_label: form.program,
      referrer: window.location.href,
      payload: {
        special_event_source: SPECIAL_EVENT.source,
        special_event_name: SPECIAL_EVENT.name,
        offer_code: SPECIAL_EVENT.offerCode,
        offer_description: '40% off the first month',
        student_age: form.studentAge || null,
        interested_program: form.program,
        message: form.notes.trim() || null,
      },
    };

    const emailPayload = {
      form_type: 'Special Event Offer Lead',
      name: form.name.trim(),
      age: form.studentAge || 'Not provided',
      email: form.email.trim(),
      phone: form.phone.trim(),
      instrument: form.program,
      experience_level: 'N/A',
      days: 'N/A',
      time_of_day: 'N/A',
      preferred_date: 'N/A',
      time_window: 'N/A',
      message: `Event: ${SPECIAL_EVENT.name} (${SPECIAL_EVENT.source}) | Offer: 40% off first month | ${form.notes.trim() || 'No additional notes'}`,
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

      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      }

      setStatus('success');
    } catch (error) {
      console.error('Special offer lead submit failed:', error);
      setStatus('error');
    }
  };

  return (
    <main style={{ background: C.cream, color: C.espresso, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        .special-offer-shell { margin: 0 auto; max-width: 1180px; padding: 0 24px; }
        .special-offer-hero { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr); gap: 56px; align-items: center; padding: 72px 0 76px; }
        .special-offer-program-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .special-offer-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .special-offer-card { transition: transform .2s ease, box-shadow .2s ease; }
        .special-offer-card:hover { transform: translateY(-3px); box-shadow: 0 18px 38px rgba(26,19,15,.12); }
        .special-offer-input:focus { border-color: ${C.teal} !important; box-shadow: 0 0 0 3px ${C.teal15}; }
        @media (max-width: 900px) {
          .special-offer-hero { grid-template-columns: 1fr; gap: 32px; padding: 42px 0 56px; }
          .special-offer-program-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .special-offer-shell { padding: 0 18px; }
          .special-offer-form-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <header>
        <ProgramsNav variant="dark" navigate={navigate} ctaLabel="Claim Offer" onCtaClick={() => document.getElementById('special-offer-form')?.scrollIntoView({ behavior: 'smooth' })} />
      </header>

      <section style={{ background: C.espresso }}>
        <div className="special-offer-shell special-offer-hero">
          <div>
            <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 14, margin: '0 0 18px' }}>
              <img src={SPECIAL_EVENT.logo} alt="Hot Chili Cool Cars" style={{ background: C.white, borderRadius: 8, display: 'block', height: 46, objectFit: 'contain', padding: 5, width: 'auto' }} />
              <p style={{ alignItems: 'center', color: C.yellow, display: 'flex', fontFamily: fonts.body, fontSize: 13, fontWeight: 800, gap: 8, letterSpacing: '.08em', margin: 0, textTransform: 'uppercase' }}>
                <Sparkles size={17} /> {SPECIAL_EVENT.name} special offer
              </p>
            </div>
            <h1 style={{ color: C.white, fontFamily: fonts.display, fontSize: 'clamp(46px, 7vw, 76px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: '.96', margin: '0 0 24px', maxWidth: 720 }}>
              Make music your next big thing.
            </h1>
            <p style={{ color: C.white80, fontFamily: fonts.body, fontSize: 'clamp(18px, 2.3vw, 22px)', lineHeight: 1.55, margin: '0 0 30px', maxWidth: 625 }}>
              Claim {SPECIAL_EVENT.discount} your first month of lessons, early childhood music, or the Band Program at Headliner Music Academy.
            </p>
            <Button onClick={() => document.getElementById('special-offer-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} size="lg" style={{ fontSize: 16 }}>
              Claim your offer
            </Button>
            <p style={{ color: C.white55, fontFamily: fonts.body, fontSize: 13, lineHeight: 1.5, margin: '18px 0 0' }}>
              New students only. Offer applies to the first month of an eligible program.
            </p>
          </div>

          <aside style={{ background: C.yellow, borderRadius: 28, boxShadow: '0 20px 48px rgba(0,0,0,.25)', overflow: 'hidden', padding: '34px 30px' }}>
            <p style={{ color: C.yellowDark, fontFamily: fonts.body, fontSize: 13, fontWeight: 800, letterSpacing: '.08em', margin: 0, textTransform: 'uppercase' }}>Event-exclusive savings</p>
            <p style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 'clamp(64px, 10vw, 100px)', fontWeight: 800, letterSpacing: '-.07em', lineHeight: .86, margin: '18px 0 8px' }}>40%</p>
            <p style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 29, fontWeight: 800, lineHeight: 1.05, margin: 0 }}>off your first month</p>
            <div style={{ borderTop: `1px solid ${C.espresso10}`, display: 'grid', gap: 12, marginTop: 28, paddingTop: 24 }}>
              {['Private music lessons', 'Early childhood music', 'Band Program'].map((item) => (
                <p key={item} style={{ alignItems: 'center', color: C.espresso, display: 'flex', fontFamily: fonts.body, fontSize: 15, fontWeight: 700, gap: 10, margin: 0 }}>
                  <Check size={18} strokeWidth={3} /> {item}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="special-offer-shell" style={{ padding: '70px 24px 36px' }}>
        <div style={{ margin: '0 auto 30px', maxWidth: 660, textAlign: 'center' }}>
          <p style={{ color: C.tealDark, fontFamily: fonts.body, fontSize: 13, fontWeight: 800, letterSpacing: '.08em', margin: '0 0 12px', textTransform: 'uppercase' }}>Find the right fit</p>
          <h2 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 'clamp(34px, 5vw, 49px)', fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1, margin: 0 }}>A place to start, play, and grow.</h2>
        </div>
        <div className="special-offer-program-grid">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <article className="special-offer-card" key={program.name} style={{ background: program.background, border: `1px solid ${C.border}`, borderRadius: 18, display: 'flex', flexDirection: 'column', padding: 25 }}>
                <div style={{ alignItems: 'center', background: C.white, borderRadius: 12, color: program.accent, display: 'flex', height: 46, justifyContent: 'center', marginBottom: 22, width: 46 }}><Icon size={23} /></div>
                <p style={{ color: program.accent, fontFamily: fonts.body, fontSize: 12, fontWeight: 800, letterSpacing: '.06em', margin: '0 0 8px', textTransform: 'uppercase' }}>{program.ages}</p>
                <h3 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 27, fontWeight: 800, letterSpacing: '-.025em', lineHeight: 1.05, margin: '0 0 12px' }}>{program.name}</h3>
                <p style={{ color: C.muted, fontFamily: fonts.body, fontSize: 15, lineHeight: 1.6, margin: '0 0 24px' }}>{program.description}</p>
                <button onClick={() => chooseProgram(program.name)} style={{ background: 'transparent', border: 'none', color: C.crimson, cursor: 'pointer', fontFamily: fonts.body, fontSize: 14, fontWeight: 800, marginTop: 'auto', padding: 0, textAlign: 'left' }}>
                  Choose this program →
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section id="special-offer-form" style={{ padding: '42px 0 82px', scrollMarginTop: 24 }}>
        <div className="special-offer-shell" style={{ display: 'grid', gap: 34, gridTemplateColumns: 'minmax(0, .83fr) minmax(340px, 1fr)', alignItems: 'start' }}>
          <div style={{ padding: '24px 0' }}>
            <p style={{ color: C.crimson, fontFamily: fonts.body, fontSize: 13, fontWeight: 800, letterSpacing: '.08em', margin: '0 0 14px', textTransform: 'uppercase' }}>Claim your special offer</p>
            <h2 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 'clamp(38px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: .98, margin: '0 0 19px' }}>Let’s find the right program.</h2>
            <p style={{ color: C.muted, fontFamily: fonts.body, fontSize: 17, lineHeight: 1.65, margin: 0, maxWidth: 470 }}>Tell us who is ready to make music. We’ll follow up to answer questions, confirm program fit, and apply your Hot Chili Cool Cars offer.</p>
            <p style={{ alignItems: 'center', color: C.espresso, display: 'flex', fontFamily: fonts.body, fontSize: 15, fontWeight: 700, gap: 10, marginTop: 28 }}><Phone size={18} color={C.crimson} /> Prefer to talk now? Call (916) 435-1300.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 22, boxShadow: '0 18px 42px rgba(26,19,15,.09)', padding: '28px 25px' }}>
            {status === 'success' ? (
              <div style={{ padding: '25px 8px', textAlign: 'center' }}>
                <div style={{ alignItems: 'center', background: C.tealPastel, borderRadius: '50%', color: C.tealDark, display: 'inline-flex', height: 58, justifyContent: 'center', marginBottom: 18, width: 58 }}><Check size={31} strokeWidth={3} /></div>
                <h3 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 33, fontWeight: 800, lineHeight: 1.05, margin: '0 0 10px' }}>You’re on the list!</h3>
                <p style={{ color: C.muted, fontFamily: fonts.body, fontSize: 16, lineHeight: 1.6, margin: 0 }}>We’ll be in touch soon to help you get started and apply your 40% first-month offer.</p>
              </div>
            ) : (
              <>
                <h3 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 28, fontWeight: 800, lineHeight: 1.05, margin: '0 0 20px' }}>Get your offer</h3>
                <div className="special-offer-form-grid">
                  <label style={{ display: 'grid', gap: 7, gridColumn: '1 / -1' }}><span style={{ color: C.espresso, fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>Parent or student name *</span><input className="special-offer-input" value={form.name} onChange={(event) => setField('name', event.target.value)} placeholder="Your name" style={inputStyle} required /></label>
                  <label style={{ display: 'grid', gap: 7 }}><span style={{ color: C.espresso, fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>Email *</span><input className="special-offer-input" type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} placeholder="you@email.com" style={inputStyle} required /></label>
                  <label style={{ display: 'grid', gap: 7 }}><span style={{ color: C.espresso, fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>Phone *</span><input className="special-offer-input" type="tel" value={form.phone} onChange={(event) => setField('phone', event.target.value)} placeholder="(916) 555-0123" style={inputStyle} required /></label>
                  <label style={{ display: 'grid', gap: 7 }}><span style={{ color: C.espresso, fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>Student age</span><input className="special-offer-input" inputMode="numeric" value={form.studentAge} onChange={(event) => setField('studentAge', event.target.value)} placeholder="e.g. 8" style={inputStyle} /></label>
                  <label style={{ display: 'grid', gap: 7, position: 'relative' }}><span style={{ color: C.espresso, fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>Interested program *</span><select className="special-offer-input" value={form.program} onChange={(event) => setField('program', event.target.value)} style={{ ...inputStyle, appearance: 'none', paddingRight: 38 }} required><option value="">Choose a program</option>{programs.map((program) => <option key={program.name} value={program.name}>{program.name}</option>)}</select><ChevronDown aria-hidden="true" size={17} style={{ color: C.muted, pointerEvents: 'none', position: 'absolute', right: 13, top: 38 }} /></label>
                  <label style={{ display: 'grid', gap: 7, gridColumn: '1 / -1' }}><span style={{ color: C.espresso, fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>Anything else? <span style={{ color: C.muted, fontWeight: 400 }}>(optional)</span></span><textarea className="special-offer-input" value={form.notes} onChange={(event) => setField('notes', event.target.value)} placeholder="Questions, instrument interests, or anything helpful to know" rows={4} style={{ ...inputStyle, resize: 'vertical' }} /></label>
                </div>
                {status === 'error' && <p style={{ background: C.errorBg, border: `1px solid ${C.errorBorder}`, borderRadius: 10, color: C.errorText, fontFamily: fonts.body, fontSize: 13, lineHeight: 1.5, margin: '16px 0 0', padding: '10px 12px' }}>Something went wrong. Please try again or call us at (916) 435-1300.</p>}
                <Button disabled={!valid} style={{ fontSize: 16, marginTop: 20, width: '100%' }} type="submit">{status === 'sending' ? 'Sending…' : 'Claim 40% off'}</Button>
                <p style={{ color: C.muted, fontFamily: fonts.body, fontSize: 11, lineHeight: 1.45, margin: '13px 0 0', textAlign: 'center' }}>By submitting, you agree to be contacted by Headliner Music Academy about this offer.</p>
              </>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}