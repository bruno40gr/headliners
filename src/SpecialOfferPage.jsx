/* global process */

import { useMemo, useState } from 'react';
import { Check, MapPin, PawPrint, X } from 'lucide-react';
import { submitLead } from './lib/formDelivery';
import { lessonIdentity } from './lib/lessonIdentity';
import { fonts } from './tokens';

const SITE_URL = 'https://www.headlinermusicacademy.com';
const LOGO_URL = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png';
const EVENT_ARTWORK_URL = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1791594003/c21a5d7e-db1a-45e7-a163-3df6587c7f3d.png';
const SPECIAL_EVENT = { name: 'Wag & Walk', source: 'wag_and_walk', offerCode: 'wag_and_walk_40_percent_first_month' };
const CRM_TENANT_ID = process.env.NEXT_PUBLIC_CRM_TENANT_ID || '00000000-0000-0000-0000-000000000001';
const EMAILJS_SERVICE_ID = 'service_734y6qg';
const EMAILJS_TEMPLATE_ID = 'template_czlclec';
const EMAILJS_PUBLIC_KEY = 'FdW-lGbAyQuJZFy-y';
const initialForm = { studentName: '', parentName: '', phone: '', email: '', instrument: '' };
const instrumentOptions = ['Piano', 'Guitar', 'Bass', 'Voice', 'Drums', 'Ukulele', 'Violin', 'Cello', 'Brass', 'Woodwind', 'Music production', 'Songwriting'];
const programOptions = ['Private and Semi-private Lessons', 'Band Program', 'Tiny Keys', 'Little Rockers'];

export default function SpecialOfferPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const valid = useMemo(() => Object.values(form).every((value) => value.trim()) && status !== 'sending', [form, status]);
  const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!valid) return;
    setStatus('sending');

    const identity = lessonIdentity(form.parentName, form.studentName);
    const leadPayload = {
      tenant_id: CRM_TENANT_ID,
      intake_type: 'lesson_inquiry',
      source: 'event',
      source_system: 'headliner-website',
      source_form: `${SPECIAL_EVENT.source}_offer_form`,
      source_page: window.location.pathname,
      full_name: identity.contactName,
      email: form.email.trim(),
      phone: form.phone.trim(),
      program_label: form.instrument.trim(),
      utm_source: SPECIAL_EVENT.source,
      utm_medium: 'event_offer',
      utm_campaign: SPECIAL_EVENT.offerCode,
      referrer: window.location.href,
      payload: {
        special_event_source: SPECIAL_EVENT.source,
        special_event_name: SPECIAL_EVENT.name,
        offer_code: SPECIAL_EVENT.offerCode,
        offer_description: '40% off the first month',
        ...identity.payload,
        instrument: form.instrument.trim(),
        requested_instrument: form.instrument.trim(),
        message: `${SPECIAL_EVENT.name}: 40% off the first month`,
      },
    };
    const emailPayload = {
      form_type: `${SPECIAL_EVENT.name} Offer Lead`,
      ...identity.email, age: 'Not provided', email: form.email.trim(), phone: form.phone.trim(),
      instrument: form.instrument.trim(), experience_level: 'N/A', days: 'N/A', time_of_day: 'N/A', preferred_date: 'N/A', time_window: 'N/A',
      message: `Event: ${SPECIAL_EVENT.name} (${SPECIAL_EVENT.source}) | Offer: 40% off first month (${SPECIAL_EVENT.offerCode}) | Student: ${form.studentName.trim()} | Parent: ${form.parentName.trim()} | Instrument: ${form.instrument.trim()}`,
    };

    try {
      await submitLead({ leadPayload, emailPayload, emailConfig: { serviceId: EMAILJS_SERVICE_ID, templateId: EMAILJS_TEMPLATE_ID, publicKey: EMAILJS_PUBLIC_KEY } });
      if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion();
      setStatus('idle');
      setConfirmationOpen(true);
      setForm(initialForm);
    } catch (error) {
      console.error('Special offer lead submit failed:', error);
      setStatus('error');
    }
  };

  return (
    <main className="special-offer-page">
      <style>{`
        .special-offer-page { --navy: #10213e; --orange: #ff7815; --cyan: #00b0ef; --cream: #fff4e9; background: var(--cream); color: var(--navy); font-family: ${fonts.body}; min-height: 100vh; }
        .special-offer-page *, .special-offer-page *::before, .special-offer-page *::after { box-sizing: border-box; }
        .offer-white-top { align-items: center; background: white; border-bottom: 1px solid #f0dfd0; display: flex; height: 72px; justify-content: center; padding: 0 20px; }
        .offer-logo-link { display: block; max-width: 198px; width: 100%; }
        .offer-logo { display: block; height: auto; width: 100%; }
        .offer-event { background-image: radial-gradient(ellipse at 0 15%, #ff78150d, transparent 50%), radial-gradient(ellipse at 100% 65%, #00b0ef0d, transparent 45%); padding: 22px 20px 0; }
        .offer-shell { margin: 0 auto; max-width: 650px; }
        .offer-event-strip { background: var(--cyan); padding: 12px 20px; }
        .offer-event-artwork { margin: 0 auto; max-width: 420px; width: 100%; }
        .offer-event-artwork img { display: block; height: auto; width: 100%; }
        .offer-copy { padding-top: 22px; text-align: center; }
        .offer-title { color: var(--navy); font-family: ${fonts.display}; font-size: clamp(34px, 9vw, 54px); font-weight: 800; letter-spacing: -.045em; line-height: 1.06; margin: 0; }
        .offer-title-emphasis { display: block; font-family: ${fonts.body}; font-size: clamp(17px, 4.5vw, 23px); font-weight: 700; letter-spacing: -.02em; line-height: 1.3; margin-bottom: 12px; }
        .offer-title strong { color: #c64f00; display: block; font-size: 1.45em; letter-spacing: -.055em; line-height: 1; margin-bottom: 5px; }
        .offer-description { color: #485366; font-size: 16px; line-height: 1.6; margin: 17px auto 24px; max-width: 490px; }
        .offer-form-frame { position: relative; }
        .offer-form-card { background: white; border: 1px solid #ead8c7; border-top: 5px solid var(--cyan); border-radius: 18px; box-shadow: 0 12px 35px #10213e0a; padding: 24px 20px 20px; }
        .offer-form { display: grid; gap: 16px; }
        .offer-field { display: grid; gap: 8px; min-width: 0; }
        .offer-field label { color: var(--navy); font-size: 15px; font-weight: 800; }
        .offer-field input, .offer-field select { background: #fffdfa; border: 1.5px solid #c4cad2; border-radius: 9px; color: var(--navy); font: inherit; font-size: 16px; min-height: 50px; padding: 11px 13px; width: 100%; }
        .offer-field input:focus, .offer-field select:focus { border-color: #007eab; outline: 3px solid #00b0ef33; outline-offset: 1px; }
        .offer-field input::placeholder { color: #6d7786; }
        .offer-error { background: #fff0ed; border: 1px solid #f5b3a8; border-radius: 9px; color: #9d2720; font-size: 13px; line-height: 1.4; margin: 0; padding: 10px 12px; }
        .offer-submit { background: var(--orange); border: 0; border-bottom: 4px solid #c25100; border-radius: 10px; color: var(--navy); cursor: pointer; font-family: ${fonts.display}; font-size: 22px; font-weight: 800; min-height: 57px; padding: 10px 18px; transition: background .15s ease; width: 100%; }
        .offer-submit:hover:not(:disabled) { background: #ff8d32; }
        .offer-submit:disabled { cursor: not-allowed; opacity: .55; }
        .offer-consent { border-top: 1px solid #ede5dd; color: #606b7a; font-size: 11px; line-height: 1.5; margin: 16px 0 0; padding-top: 14px; text-align: center; }
        .offer-billing-disclaimer { color: #606b7a; font-size: 12px; line-height: 1.5; margin: 23px auto 0; max-width: 490px; text-align: center; }
        .offer-contact { align-items: center; border-top: 1px solid #ead8c7; display: grid; justify-items: center; margin-top: 28px; padding: 25px 0 29px; text-align: center; }
        .offer-phone-heading { font-family: ${fonts.display}; font-size: clamp(29px, 8vw, 39px); font-weight: 800; letter-spacing: -.04em; line-height: 1; margin: 0; }
        .offer-phone-heading a { color: inherit; text-decoration: none; }
        .offer-phone-heading a:hover { text-decoration: underline; }
        .offer-address { align-items: center; color: #485366; display: flex; font-size: 13px; font-weight: 700; gap: 7px; margin: 16px 0 0; }
        .offer-address svg { flex-shrink: 0; }
        .offer-footer-logo-link { display: block; margin-top: 22px; max-width: 170px; }
        .offer-footer-logo { display: block; height: auto; width: 100%; }
        .offer-footer-trail { align-items: center; background: var(--cyan); color: var(--navy); display: flex; gap: 36px; height: 52px; justify-content: center; }
        .offer-footer-trail svg:nth-child(2) { transform: rotate(20deg); }
        .offer-modal-backdrop { align-items: center; background: #10213ebd; display: flex; inset: 0; justify-content: center; padding: 20px; position: fixed; z-index: 20; }
        .offer-modal { background: var(--cream); border: 3px solid white; border-radius: 20px; box-shadow: 0 20px 60px #0003; max-width: 420px; padding: 34px 26px 28px; position: relative; text-align: center; width: 100%; }
        .offer-modal-close { align-items: center; background: transparent; border: 0; color: var(--navy); cursor: pointer; display: inline-flex; padding: 6px; position: absolute; right: 10px; top: 10px; }
        .offer-modal-check { align-items: center; background: var(--cyan); border-radius: 50%; color: var(--navy); display: inline-flex; height: 66px; justify-content: center; width: 66px; }
        .offer-modal h2 { font-family: ${fonts.display}; font-size: 35px; font-weight: 800; letter-spacing: -.05em; line-height: 1.1; margin: 16px 0 10px; }
        .offer-modal p { color: #485366; font-size: 15px; line-height: 1.5; margin: 0; }
        .offer-modal button:last-child { background: var(--orange); border: 0; border-bottom: 3px solid #c25100; border-radius: 9px; color: var(--navy); cursor: pointer; font-family: ${fonts.display}; font-size: 18px; font-weight: 800; margin-top: 23px; padding: 12px 25px; }
        @media (min-width: 640px) { .offer-white-top { height: 80px; } .offer-logo-link { max-width: 220px; } .offer-event { padding-top: 28px; } .offer-form { grid-template-columns: 1fr 1fr; } .offer-field--full, .offer-form-action, .offer-error { grid-column: 1 / -1; } .offer-form-card { padding: 29px; } }
        @media (min-width: 960px) { .offer-shell { max-width: 1100px; } .offer-layout { align-items: center; display: grid; gap: 48px; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); margin-top: 32px; } .offer-copy { padding-top: 0; text-align: right; } .offer-description { margin: 20px 0 0 auto; } .offer-title { font-size: 48px; } }
      `}</style>

      <header className="offer-white-top">
        <a aria-label="Headliner Music Academy home" className="offer-logo-link" href={SITE_URL}><img alt="Headliner Music Academy" className="offer-logo" src={LOGO_URL} /></a>
      </header>
      <div className="offer-event-strip">
        <div className="offer-event-artwork"><img alt="Wag & Walk 2026" src={EVENT_ARTWORK_URL} fetchPriority="high" /></div>
      </div>
      <section className="offer-event" aria-labelledby="offer-title">
        <div className="offer-shell">
          <div className="offer-layout">
          <div className="offer-copy">
            <h1 className="offer-title" id="offer-title"><span className="offer-title-emphasis">A little treat from Headliner</span><strong>40% OFF</strong>your first month.</h1>
            <p className="offer-description">Thanks for stopping by our Wag & Walk booth! Fill out the form to claim 40% off your first month of music lessons, early childhood music, or our Band Program.</p>
          </div>

          <div className="offer-form-frame">
          <section className="offer-form-card" aria-label="Special offer form">
            <form className="offer-form" onSubmit={handleSubmit}>
              <div className="offer-field"><label htmlFor="student-name">Student name</label><input autoComplete="name" id="student-name" onChange={(event) => setField('studentName', event.target.value)} placeholder="Student's full name" required value={form.studentName} /></div>
              <div className="offer-field"><label htmlFor="parent-name">Parent name</label><input autoComplete="name" id="parent-name" onChange={(event) => setField('parentName', event.target.value)} placeholder="Parent's full name" required value={form.parentName} /></div>
              <div className="offer-field"><label htmlFor="phone">Phone number</label><input autoComplete="tel" id="phone" inputMode="tel" onChange={(event) => setField('phone', event.target.value)} placeholder="(916) 555-0123" required type="tel" value={form.phone} /></div>
              <div className="offer-field"><label htmlFor="email">Email</label><input autoComplete="email" id="email" onChange={(event) => setField('email', event.target.value)} placeholder="you@email.com" required type="email" value={form.email} /></div>
              <div className="offer-field offer-field--full">
                <label htmlFor="instrument">Instrument or Program</label>
                <select id="instrument" name="instrument" onChange={(event) => setField('instrument', event.target.value)} required value={form.instrument}>
                  <option disabled value="">Select an instrument or program</option>
                  <optgroup label="Instruments">
                    {instrumentOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </optgroup>
                  <optgroup label="Programs">
                    {programOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </optgroup>
                </select>
              </div>
              {status === 'error' && <p className="offer-error" role="alert">Something went wrong. Please try again or call us at (916) 435-1300.</p>}
              <div className="offer-form-action"><button className="offer-submit" disabled={!valid} type="submit">{status === 'sending' ? 'Sending your offer…' : 'Claim 40% Off'}</button><p className="offer-consent">By submitting, you agree to be contacted by Headliner Music Academy about this offer.</p></div>
            </form>
          </section>
          </div>
          </div>

          <p className="offer-billing-disclaimer">Lessons are scheduled weekly and billed monthly. Your monthly tuition is based on the number of weekly lessons scheduled in that month, so the monthly amount may vary.</p>

          <footer className="offer-contact">
            <h2 className="offer-phone-heading"><a href="tel:9164351300">(916) 435-1300</a></h2>
            <p className="offer-address"><MapPin size={16} />2311 Sunset Blvd, Rocklin, CA 95765</p>
            <a aria-label="Visit Headliner Music Academy" className="offer-footer-logo-link" href={SITE_URL}><img alt="Headliner Music Academy" className="offer-footer-logo" src={LOGO_URL} /></a>
          </footer>
        </div>
      </section>
      <div aria-hidden="true" className="offer-footer-trail"><PawPrint size={24} /><PawPrint size={24} /><PawPrint size={24} /></div>

      {confirmationOpen && (
        <div aria-modal="true" className="offer-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmationOpen(false); }} role="dialog">
          <section aria-labelledby="confirmation-heading" className="offer-modal">
            <button aria-label="Close confirmation" className="offer-modal-close" onClick={() => setConfirmationOpen(false)} type="button"><X size={21} /></button>
            <span className="offer-modal-check"><Check size={33} strokeWidth={3} /></span>
            <h2 id="confirmation-heading">You&apos;re on the list!</h2>
            <p>Thanks for claiming your Wag & Walk offer. Our team will reach out soon to help you get started with 40% off your first month.</p>
            <button onClick={() => setConfirmationOpen(false)} type="button">Awesome, thanks!</button>
          </section>
        </div>
      )}
    </main>
  );
}