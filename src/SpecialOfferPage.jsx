/* global process */

import { useMemo, useState } from 'react';
import { Check, MapPin, Phone, X } from 'lucide-react';
import { submitLead } from './lib/formDelivery';
import { fonts } from './tokens';

const SITE_URL = 'https://www.headlinermusicacademy.com';
const LOGO_URL = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png';
const FOOTER_LOGO_URL = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1782845758/vertical_white_ma_xcvtvr.png';
const SPECIAL_EVENT = { name: 'Hot Chili Cool Cars', source: 'hot_chili_cool_cars', offerCode: '40_percent_first_month' };
const CRM_TENANT_ID = process.env.NEXT_PUBLIC_CRM_TENANT_ID || '00000000-0000-0000-0000-000000000001';
const EMAILJS_SERVICE_ID = 'service_734y6qg';
const EMAILJS_TEMPLATE_ID = 'template_czlclec';
const EMAILJS_PUBLIC_KEY = 'FdW-lGbAyQuJZFy-y';
const initialForm = { studentName: '', parentName: '', phone: '', email: '', instrument: '' };

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

    const leadPayload = {
      tenant_id: CRM_TENANT_ID,
      intake_type: 'lesson_inquiry',
      source_form: 'hot_chili_cool_cars_offer_form',
      source_page: window.location.pathname,
      full_name: form.parentName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      program_label: form.instrument.trim(),
      utm_source: SPECIAL_EVENT.source,
      utm_medium: 'event_offer',
      utm_campaign: `${SPECIAL_EVENT.source}_${SPECIAL_EVENT.offerCode}`,
      referrer: window.location.href,
      payload: {
        special_event_source: SPECIAL_EVENT.source,
        special_event_name: SPECIAL_EVENT.name,
        offer_code: SPECIAL_EVENT.offerCode,
        offer_description: '40% off the first month',
        student_name: form.studentName.trim(),
        parent_name: form.parentName.trim(),
        instrument: form.instrument.trim(),
        requested_instrument: form.instrument.trim(),
        message: `${SPECIAL_EVENT.name}: 40% off the first month`,
      },
    };
    const emailPayload = {
      form_type: 'Hot Chili Cool Cars Offer Lead',
      name: form.parentName.trim(), age: 'Not provided', email: form.email.trim(), phone: form.phone.trim(),
      instrument: form.instrument.trim(), experience_level: 'N/A', days: 'N/A', time_of_day: 'N/A', preferred_date: 'N/A', time_window: 'N/A',
      message: `Event: ${SPECIAL_EVENT.name} (${SPECIAL_EVENT.source}) | Offer: 40% off first month | Student: ${form.studentName.trim()} | Parent: ${form.parentName.trim()} | Instrument: ${form.instrument.trim()}`,
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
        .special-offer-page { --teal: #069da0; --teal-dark: #047d80; --red: #b5181b; --cream: #fffaf0; background: var(--teal); color: var(--cream); font-family: ${fonts.body}; min-height: 100vh; overflow: hidden; }
        .offer-white-top { align-items: center; background: #fff; display: flex; height: 72px; justify-content: center; overflow: hidden; padding: 0 20px; }.offer-logo-link { display: block; flex: 0 0 auto; max-width: 198px; width: 100%; }.offer-logo { display: block; height: auto; width: 100%; }.offer-wave { display: block; height: 30px; margin: 0; position: relative; vertical-align: bottom; width: 100%; z-index: 1; }
        .offer-teal { background-image: radial-gradient(circle at 10% 7%, rgba(255,255,255,.13) 0 2px, transparent 3px), radial-gradient(circle at 88% 22%, rgba(255,255,255,.1) 0 2px, transparent 3px), linear-gradient(125deg, rgba(3,99,101,.2), transparent 50%); background-size: 43px 43px, 61px 61px, auto; padding: 22px 20px 0; }.offer-shell { margin: 0 auto; max-width: 540px; }.offer-copy { text-align: center; }.offer-title { color: var(--cream); font-family: ${fonts.display}; font-size: clamp(44px, 12vw, 63px); font-weight: 800; letter-spacing: -.06em; line-height: .86; margin: 0; text-shadow: 3px 4px 0 rgba(4,84,84,.22); }.offer-title-emphasis { background: #111; color: #fffdf5; display: inline-block; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(21px, 5.6vw, 32px); font-style: italic; font-weight: 700; letter-spacing: -.05em; line-height: 1; margin-bottom: 6px; padding: 6px 11px 7px; }.offer-title strong { color: #ffd756; display: block; font-size: 1.17em; }.offer-description { color: #e7ffff; font-size: 16px; line-height: 1.55; margin: 19px auto 27px; max-width: 465px; }
        .offer-form-frame { padding: 12px; position: relative; }.offer-form-frame::before { background-color: rgba(255,255,255,.1); background-image: conic-gradient(rgba(255,255,255,.22) 25%, transparent 0 50%, rgba(255,255,255,.22) 0 75%, transparent 0); background-size: 54px 54px; border-radius: 22px; content: ''; inset: 0; opacity: .55; position: absolute; transform: rotate(-2deg); }.offer-form-card { background: var(--cream); border: 4px solid white; border-radius: 18px; box-shadow: 10px 11px 0 rgba(4,85,83,.28); color: #1f3131; padding: 24px 18px 18px; position: relative; }.offer-form { display: grid; gap: 16px; }.offer-field { display: grid; gap: 8px; }.offer-field label { color: #254240; font-size: 15px; font-weight: 800; letter-spacing: .01em; }.offer-field input { background: #fff; border: 1.5px solid #b9d2cd; border-radius: 9px; color: #173b39; font: inherit; font-size: 16px; min-height: 50px; outline: none; padding: 11px 13px; width: 100%; }.offer-field input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(6,157,160,.18); }.offer-field input::placeholder { color: #8aa09c; }.offer-error { background: #fff0ed; border: 1px solid #f5b3a8; border-radius: 9px; color: #9d2720; font-size: 13px; line-height: 1.4; margin: 0; padding: 10px 12px; }.offer-submit { background: var(--red); border: 0; border-bottom: 4px solid #7e0d15; border-radius: 10px; color: white; cursor: pointer; font-family: ${fonts.display}; font-size: 22px; font-weight: 800; letter-spacing: -.02em; min-height: 57px; padding: 10px 18px; transition: transform .15s ease, background .15s ease; width: 100%; }.offer-submit:hover:not(:disabled) { background: #ca2023; transform: translateY(-2px); }.offer-submit:disabled { cursor: not-allowed; opacity: .55; }.offer-consent { border-top: 1px solid #d8e6e1; color: #627875; font-size: 11px; line-height: 1.5; margin: 16px 0 0; padding-top: 14px; text-align: center; }
        .offer-billing-disclaimer { color: #e4ffff; font-size: 12px; line-height: 1.5; margin: 23px auto 0; max-width: 490px; text-align: center; }.offer-contact { align-items: center; border-top: 1px solid rgba(255,255,255,.31); display: grid; gap: 0; justify-items: center; margin-top: 30px; padding: 25px 0 29px; text-align: center; }.offer-phone-heading { color: white; font-family: ${fonts.display}; font-size: clamp(29px, 8vw, 39px); font-weight: 800; letter-spacing: -.04em; line-height: 1; margin: 0; }.offer-phone-heading a { color: inherit; text-decoration: none; }.offer-phone-heading a:hover { text-decoration: underline; }.offer-address { align-items: center; color: #ddffff; display: flex; font-size: 13px; font-weight: 700; gap: 7px; margin: 16px 0 0; }.offer-footer-logo-link { display: block; margin-top: 22px; }.offer-footer-logo { display: block; height: auto; max-width: 126px; width: 100%; }.offer-footer-checkers { background-color: var(--cream); background-image: conic-gradient(var(--red) 25%, transparent 0 50%, var(--red) 0 75%, transparent 0); background-size: 42px 42px; height: 42px; width: 100%; }
        .offer-modal-backdrop { align-items: center; background: rgba(9,38,39,.72); display: flex; inset: 0; justify-content: center; padding: 20px; position: fixed; z-index: 20; }.offer-modal { background: var(--cream); border: 5px solid white; border-radius: 20px; box-shadow: 12px 14px 0 rgba(0,0,0,.2); color: #243e3d; max-width: 420px; padding: 34px 26px 28px; position: relative; text-align: center; width: 100%; }.offer-modal-close { align-items: center; background: transparent; border: 0; color: #4f6462; cursor: pointer; display: inline-flex; padding: 6px; position: absolute; right: 10px; top: 10px; }.offer-modal-check { align-items: center; background: var(--teal); border: 4px solid #9de2dc; border-radius: 50%; color: white; display: inline-flex; height: 66px; justify-content: center; width: 66px; }.offer-modal h2 { color: #173b3b; font-family: ${fonts.display}; font-size: 35px; font-weight: 800; letter-spacing: -.05em; line-height: .95; margin: 16px 0 10px; }.offer-modal p { color: #5d706e; font-size: 15px; line-height: 1.5; margin: 0; }.offer-modal button:last-child { background: var(--red); border: 0; border-bottom: 3px solid #7e0d15; border-radius: 9px; color: white; cursor: pointer; font-family: ${fonts.display}; font-size: 18px; font-weight: 800; margin-top: 23px; padding: 12px 25px; }
        @media (min-width: 640px) { .offer-white-top { height: 80px; }.offer-logo-link { max-width: 220px; }.offer-wave { height: 34px; }.offer-teal { padding-top: 24px; }.offer-shell { max-width: 650px; }.offer-form { grid-template-columns: 1fr 1fr; }.offer-field--full, .offer-form-action { grid-column: 1 / -1; }.offer-form-card { padding: 29px; } }
      `}</style>

      <header className="offer-white-top">
        <a aria-label="Headliner Music Academy home" className="offer-logo-link" href={SITE_URL}><img alt="Headliner Music Academy" className="offer-logo" src={LOGO_URL} /></a>
      </header>
      <svg aria-hidden="true" className="offer-wave" preserveAspectRatio="none" viewBox="0 0 1440 60"><path d="M0 0h1440v20C1072 60 374 60 0 20V0Z" fill="#fff" /></svg>

      <section className="offer-teal" aria-labelledby="offer-title">
        <div className="offer-shell">
          <div className="offer-copy">
            <h1 className="offer-title" id="offer-title"><span className="offer-title-emphasis">Cool cars. Hot deal.</span><strong>40% OFF</strong>your first month.</h1>
            <p className="offer-description">Thank you for stopping by our booth. Fill out the form below to qualify for this limited-time offer.</p>
          </div>

          <div className="offer-form-frame">
          <section className="offer-form-card" aria-label="Special offer form">
            <form className="offer-form" onSubmit={handleSubmit}>
              <div className="offer-field"><label htmlFor="student-name">Student name</label><input autoComplete="name" id="student-name" onChange={(event) => setField('studentName', event.target.value)} placeholder="Student's full name" required value={form.studentName} /></div>
              <div className="offer-field"><label htmlFor="parent-name">Parent name</label><input autoComplete="name" id="parent-name" onChange={(event) => setField('parentName', event.target.value)} placeholder="Parent's full name" required value={form.parentName} /></div>
              <div className="offer-field"><label htmlFor="phone">Phone number</label><input autoComplete="tel" id="phone" inputMode="tel" onChange={(event) => setField('phone', event.target.value)} placeholder="(916) 555-0123" required type="tel" value={form.phone} /></div>
              <div className="offer-field"><label htmlFor="email">Email</label><input autoComplete="email" id="email" onChange={(event) => setField('email', event.target.value)} placeholder="you@email.com" required type="email" value={form.email} /></div>
              <div className="offer-field offer-field--full"><label htmlFor="instrument">Instrument</label><input id="instrument" onChange={(event) => setField('instrument', event.target.value)} placeholder="e.g. Piano, guitar, drums" required value={form.instrument} /></div>
              {status === 'error' && <p className="offer-error" role="alert">Something went wrong. Please try again or call us at (916) 435-1300.</p>}
              <div className="offer-form-action"><button className="offer-submit" disabled={!valid} type="submit">{status === 'sending' ? 'Sending your offer…' : 'Claim 40% Off'}</button><p className="offer-consent">By submitting, you agree to be contacted by Headliner Music Academy about this offer.</p></div>
            </form>
          </section>
          </div>

          <p className="offer-billing-disclaimer">Lessons are scheduled weekly and billed monthly. Your monthly tuition is based on the number of weekly lessons scheduled in that month, so the monthly amount may vary.</p>

          <footer className="offer-contact">
            <h2 className="offer-phone-heading"><a href="tel:9164351300">(916) 435-1300</a></h2>
            <p className="offer-address"><MapPin size={16} />2311 Sunset Blvd, Rocklin, CA 95765</p>
            <a aria-label="Visit Headliner Music Academy" className="offer-footer-logo-link" href={SITE_URL}><img alt="Headliner Music Academy" className="offer-footer-logo" src={FOOTER_LOGO_URL} /></a>
          </footer>
        </div>
      </section>
      <div aria-hidden="true" className="offer-footer-checkers" />

      {confirmationOpen && (
        <div aria-modal="true" className="offer-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmationOpen(false); }} role="dialog">
          <section aria-labelledby="confirmation-heading" className="offer-modal">
            <button aria-label="Close confirmation" className="offer-modal-close" onClick={() => setConfirmationOpen(false)} type="button"><X size={21} /></button>
            <span className="offer-modal-check"><Check size={33} strokeWidth={3} /></span>
            <h2 id="confirmation-heading">You&apos;re on the list!</h2>
            <p>Thanks for claiming your Hot Chili Cool Cars offer. Our team will reach out soon to confirm your 40% off first month.</p>
            <button onClick={() => setConfirmationOpen(false)} type="button">Awesome, thanks!</button>
          </section>
        </div>
      )}
    </main>
  );
}