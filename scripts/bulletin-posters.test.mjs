import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { bulletinPosters, bulletinEvents } from '../src/next/bulletin-posters.js';

test('bulletin board uses the three supplied flyers with accessible descriptions', () => {
  assert.equal(bulletinPosters.length, 3);
  for (const poster of bulletinPosters) {
    assert.ok(poster.flyerImage.startsWith('https://res.cloudinary.com/'));
    assert.ok(poster.flyerAlt);
    assert.ok(poster.description);
  }
  assert.ok(bulletinPosters[0].flyerImage.endsWith('32d5df78-d533-4af8-b163-2ccb5bab2bf2.png'));
  assert.ok(bulletinPosters[1].flyerImage.endsWith('277c9121-7340-4931-a6a2-89bf04cc637c.png'));
  assert.ok(bulletinPosters[2].flyerImage.endsWith('787f8caf-f20d-4e83-adb2-8dd59786cf4e.png'));
});

test('only the dated showcase appears in the calendar', () => {
  assert.equal(bulletinEvents.length, 1);
  assert.equal(bulletinEvents[0].title, 'Halloween Sidewalk Showcase');
  assert.equal(bulletinEvents[0].startsAt, '2026-10-31T18:00:00-07:00');
  assert.equal(bulletinEvents[0].endsAt, '2026-10-31T20:00:00-07:00');
  assert.ok(bulletinPosters.slice(1).every(poster => !poster.startsAt && !poster.endsAt));
});

test('flyer details support full-size artwork and optional event facts', () => {
  const details = readFileSync(new URL('../src/next/PreviewEvents.jsx', import.meta.url), 'utf8');
  assert.ok(details.includes('Open full-size flyer:'));
  assert.ok(details.includes('event.startsAt && event.endsAt && <dl'));
  assert.ok(!details.includes('Fictional event for this preview'));
  assert.ok(details.includes('onCancel={(e) =>'));
  assert.ok(!details.includes('onClose={onClose}'));
  const home = readFileSync(new URL('../src/next/HomePreview.jsx', import.meta.url), 'utf8');
  assert.ok(home.includes('events={bulletinEvents}'));
  assert.ok(!home.includes("title: 'Open mic night'"));
});

test('flyer hover and focus gently rotate with a reduced-motion alternative', () => {
  const css = readFileSync(new URL('../src/next/home-preview.module.css', import.meta.url), 'utf8');
  assert.ok(css.includes('.poster.uploadedPoster:focus-visible'));
  assert.ok(css.includes('rotate(-.6deg)'));
  assert.ok(css.includes('rotate(.6deg)'));
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
  assert.ok(css.includes('.poster.uploadedPoster { transition: none; }'));
});