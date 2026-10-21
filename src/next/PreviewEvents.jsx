"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import styles from './home-preview.module.css';

function eventDate(event) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(event.startsAt));
}

function eventTime(event) {
  const format = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' });
  return `${format.format(new Date(event.startsAt))} to ${format.format(new Date(event.endsAt))} Pacific`;
}

export function EventDetails({ event, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, []);

  // Cleanup also emits a native close event during Strict Mode's effect replay.
  // Handle user dismissal explicitly so that event cannot clear a reopened dialog.
  return <dialog ref={dialog} className={styles.eventDialog} aria-labelledby="event-dialog-title" onCancel={(e) => {
    e.preventDefault();
    onClose();
  }} onClick={(e) => {
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) onClose();
  }}>
    <button className={styles.dialogClose} onClick={onClose} aria-label="Close event details" autoFocus>Close</button>
    {event.flyerImage ? <a href={event.flyerImage} target="_blank" rel="noreferrer" aria-label={`Open full-size flyer: ${event.title}`}><img className={`${styles.dialogImage} ${styles.flyerImage}`} src={event.flyerImage} alt={event.flyerAlt || event.title} /></a> : event.image && <img className={styles.dialogImage} src={event.image} alt="" />}
    <h2 id="event-dialog-title">{event.title}</h2>
    {event.startsAt && event.endsAt && <dl className={styles.eventFacts}>
      <div><dt>Date</dt><dd>{eventDate(event)}</dd></div>
      <div><dt>Time</dt><dd>{eventTime(event)}</dd></div>
      <div><dt>Place</dt><dd>Headliner Music Academy<br />2311 Sunset Blvd, Rocklin, CA</dd></div>
    </dl>}
    <p>{event.description}</p>
    {event.action && <p><a href={event.action.href}>{event.action.label}</a></p>}
  </dialog>;
}

function subscribeToMobile(callback) {
  const query = window.matchMedia('(max-width: 700px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const getMobileSnapshot = () => window.matchMedia('(max-width: 700px)').matches;
const getServerSnapshot = () => false;

export default function PreviewEvents({ events, onSelect }) {
  const [month, setMonth] = useState('2026-10');
  const [chosenView, setView] = useState(null);
  const mobile = useSyncExternalStore(subscribeToMobile, getMobileSnapshot, getServerSnapshot);
  const view = chosenView ?? (mobile ? 'list' : 'calendar');
  const date = new Date(`${month}-01T12:00:00Z`);
  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth();
  const count = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const offset = date.getUTCDay();
  const monthEvents = events.filter(event => event.startsAt.startsWith(month)).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  // This is a fixed-date prototype; the initial agenda starts at its preview date.
  const upcomingEvents = events.filter(event => event.startsAt.slice(0, 10) >= (month === '2026-10' ? '2026-10-11' : `${month}-01`)).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const visibleEvents = view === 'list' ? upcomingEvents : monthEvents;
  const heading = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
  function changeMonth(direction) { setMonth(new Date(Date.UTC(year, monthIndex + direction, 1)).toISOString().slice(0, 7)); }

  return <div className={styles.calendar}>
    <div className={styles.calendarToolbar}>
      <div className={styles.monthControls}><button onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button><h3 aria-live="polite">{heading}</h3><button onClick={() => changeMonth(1)} aria-label="Next month">›</button></div>
      <div className={styles.viewControls} aria-label="Event view"><button aria-pressed={view === 'calendar'} onClick={() => setView('calendar')}>Calendar</button><button aria-pressed={view === 'list'} onClick={() => setView('list')}>List</button></div>
    </div>
    {view === 'calendar' ? <>
      <div className={styles.calendarGrid}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div className={styles.weekday} key={day}>{day}</div>)}
        {Array.from({ length: Math.ceil((offset + count) / 7) * 7 }, (_, index) => {
          const day = index - offset + 1;
          if (day < 1 || day > count) return <div className={styles.calendarBlank} key={index} aria-hidden="true" />;
          const dayEvents = monthEvents.filter(event => Number(event.startsAt.slice(8, 10)) === day);
          return <div className={styles.calendarDay} key={index}><span>{day}</span>{dayEvents.map(event => <button className={`${styles.calendarEvent} ${styles[`event${event.style}`]}`} key={event.title} onClick={() => onSelect(event)} aria-label={`${event.title}, ${eventDate(event)}, ${eventTime(event)}`}><span className={styles.calendarEventTitle}>{event.title}<small>{new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' }).format(new Date(event.startsAt))}</small></span><span className={styles.calendarDot} aria-hidden="true">●</span></button>)}</div>;
        })}
      </div>
    </> : <div className={styles.agenda}>{upcomingEvents.map(event => <button key={event.title} onClick={() => onSelect(event)}><strong>{event.title}</strong><span>{eventDate(event)} · {eventTime(event)}</span></button>)}</div>}
    {!visibleEvents.length && <p className={styles.emptyMonth}>No announced events this month.</p>}
  </div>;
}