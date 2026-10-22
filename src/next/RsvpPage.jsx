'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, MapPin, Users, X } from 'lucide-react';
import { Button, Input } from '../HeadlinerDesignSystem';
import { GRAND_OPENING, validateRsvp } from '../lib/rsvp';
import styles from './rsvp.module.css';

const schedule = [
  { time: '3 PM', title: 'Ribbon cutting' },
  { time: '4 PM', title: 'Cocktails & finger food' },
  { time: '5–8 PM', title: 'Live music' },
];

export default function RsvpPage() {
  const [form, setForm] = useState({ name: '', email: '', partySize: '1' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const submission = useRef(null);
  const submitting = useRef(false);
  const confirmation = useRef(null);
  const dialog = useRef(null);
  const rsvpButton = useRef(null);
  const previousOverflow = useRef('');
  const detailsPanel = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 600px) and (prefers-reduced-motion: no-preference)');
    const panel = detailsPanel.current;
    const poster = panel.parentElement;
    const hero = poster.firstElementChild;
    const header = hero.querySelector('header');
    const heading = header.querySelector('h1');
    let frame = 0;
    function updateReveal() {
      frame = 0;
      if (!media.matches) {
        poster.style.removeProperty('--details-reveal');
        poster.style.removeProperty('--headline-offset');
        return;
      }
      const distance = window.innerHeight - panel.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, distance / 180));
      poster.style.setProperty('--details-reveal', progress.toFixed(3));
      const scroll = Math.max(0, -hero.getBoundingClientRect().top);
      const centeredOffset = hero.offsetHeight / 2 - header.offsetTop - heading.offsetTop - heading.offsetHeight / 2;
      const maxOffset = Math.max(0, hero.offsetHeight - header.offsetHeight - header.offsetTop);
      const offset = Math.min(maxOffset, Math.max(scroll, centeredOffset - scroll * .5));
      poster.style.setProperty('--headline-offset', `${Math.max(0, offset)}px`);
    }
    function scheduleReveal() {
      if (!frame) frame = requestAnimationFrame(updateReveal);
    }
    updateReveal();
    let active = true;
    document.fonts.ready.then(() => { if (active) scheduleReveal(); });
    window.addEventListener('scroll', scheduleReveal, { passive: true });
    window.addEventListener('resize', scheduleReveal);
    media.addEventListener('change', updateReveal);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleReveal);
      window.removeEventListener('resize', scheduleReveal);
      media.removeEventListener('change', updateReveal);
      poster.style.removeProperty('--details-reveal');
      poster.style.removeProperty('--headline-offset');
    };
  }, []);

  function openRsvp() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeRsvp() {
    dialog.current.close();
  }

  function restorePage() {
    document.body.style.overflow = previousOverflow.current;
    rsvpButton.current?.focus();
  }

  function change(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const result = validateRsvp(form);
    if (result.error) { setError(result.error); return; }
    const serialized = JSON.stringify(result.data);
    if (submission.current?.serialized !== serialized) {
      submission.current = { serialized, key: crypto.randomUUID() };
    }
    submitting.current = true;
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submission.current.key },
        body: serialized,
      });
      const body = await response.json();
      if (!response.ok || body.ok !== true) throw new Error(body.error || 'We couldn’t save your RSVP. Please try again.');
      setStatus('success');
      requestAnimationFrame(() => confirmation.current?.focus());
    } catch (failure) {
      setError(failure.message === 'Failed to fetch' ? 'Connection interrupted. Please try again—your details are still here.' : failure.message);
      setStatus('idle');
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#rsvp">Skip to RSVP</a>
      <main className={styles.poster} aria-labelledby="event-title">
        <div className={styles.photoPanel}>
          <img className={styles.eventPhoto} src="/images/grand-opening-background.png" alt="Headliner Music Academy’s illuminated sign and Rocklin storefront at night" width="808" height="1442" fetchPriority="high" />
          <header className={styles.header}>
          <p className={styles.invite}>Friends &amp; family, you’re invited</p>
          <h1 id="event-title">Grand<span>Opening</span></h1>
          </header>
          <svg className={styles.photoCurve} viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 Q500 48 1000 10 L1000 40 L0 40 Z" fill="white" /><path d="M0 10 Q500 48 1000 10" fill="none" stroke="#ff0046" strokeWidth="14" /></svg>
        </div>
        <div className={styles.detailsPanel} ref={detailsPanel}>
          <section className={styles.eventInfo} aria-label="Event details">
            <h2 className={styles.eventDate}>Friday, November 6th</h2>
            <p className={styles.subtitle}>Ribbon cutting celebration</p>
            <div className={styles.schedule}>
              {schedule.map(({ time, title }) => <div className={styles.scheduleItem} key={title}><h3 className={styles.time}>{time}</h3><p className={styles.scheduleLabel}>{title}</p></div>)}
            </div>
            <h2 className={styles.bands}>Sunkast · Traktion · Samme · Faith</h2>
          </section>
          <div className={styles.rsvpAction}>
            <button id="rsvp" ref={rsvpButton} className={styles.rsvpButton} type="button" onClick={openRsvp} aria-haspopup="dialog">RSVP</button>
            <p>Please RSVP by November 2</p>
          </div>
          <footer className={styles.chamber}>
            <p>Ribbon cutting with</p>
            <a href="https://www.rocklinchamber.com/" target="_blank" rel="noopener noreferrer" aria-label="Rocklin Area Chamber of Commerce (opens in a new tab)"><img src="/images/rocklin-chamber-logo.png" width="228" height="57" alt="Rocklin Area Chamber of Commerce" /></a>
            <a className={styles.address} href="https://www.google.com/maps/search/?api=1&query=Headliner+Music+Academy+2311+Sunset+Blvd+Rocklin+CA" target="_blank" rel="noopener noreferrer"><MapPin size={20} aria-hidden="true" /><span>{GRAND_OPENING.address}</span></a>
          </footer>
        </div>
      </main>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="rsvp-title" onClose={restorePage} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeRsvp(); } }}>
          <section className={styles.formCard}>
            <button className={styles.closeButton} type="button" onClick={closeRsvp} aria-label="Close RSVP"><X size={18} /></button>
            {status === 'success' ? (
              <div className={styles.success} role="status" tabIndex={-1} ref={confirmation}>
                <span className={styles.successIcon}><Check size={32} aria-hidden="true" /></span>
                <h2 id="rsvp-title">RSVP received</h2>
                <p>{form.name.trim()} · <strong>{Number(form.partySize)} {Number(form.partySize) === 1 ? 'person' : 'people'}</strong></p>
                <div className={styles.confirmationDetails}><strong>{GRAND_OPENING.dateLabel} · From 3 PM</strong><span>{GRAND_OPENING.address}</span></div>
              </div>
            ) : (
              <div className={styles.formBody}>
                <div className={styles.formHeading}><div><p className={styles.formEyebrow}>Friends &amp; family</p><h2 id="rsvp-title">RSVP</h2></div><p className={styles.deadline}>Please RSVP by <strong>November 2</strong></p></div>
                <form onSubmit={handleSubmit} aria-busy={status === 'sending'}>
                  <fieldset disabled={status === 'sending'} className={styles.fields}>
                    <div className={styles.field}><label htmlFor="rsvp-name">Your name <span aria-hidden="true">*</span></label><Input id="rsvp-name" name="name" autoComplete="name" placeholder="First and last name" maxLength={120} required value={form.name} onChange={change} /></div>
                    <div className={styles.field}><label htmlFor="rsvp-email">Email address <span aria-hidden="true">*</span></label><Input id="rsvp-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required value={form.email} onChange={change} /></div>
                    <div className={styles.field}><label htmlFor="rsvp-party">Party size <span aria-hidden="true">*</span></label><div className={styles.partyInput}><Users size={18} aria-hidden="true" /><Input id="rsvp-party" name="partySize" type="number" inputMode="numeric" min="1" max="99" step="1" required aria-describedby="party-hint" value={form.partySize} onChange={change} style={{ paddingLeft: 44 }} /></div><p id="party-hint" className={styles.hint}>Including yourself.</p></div>
                    {error && <p className={styles.error} role="alert">{error}</p>}
                    <Button accent="#ff0046" type="submit" disabled={status === 'sending'} size="lg" style={{ width: '100%', borderRadius: 999, letterSpacing: 0, fontFamily: 'var(--body)', fontSize: 16, marginTop: 4 }}>{status === 'sending' ? 'Submitting…' : 'Confirm RSVP'}</Button>
                  </fieldset>
                </form>
                <p className={styles.privacy}><a href="/privacy-policy">Privacy policy</a></p>
              </div>
            )}
          </section>
      </dialog>
    </div>
  );
}