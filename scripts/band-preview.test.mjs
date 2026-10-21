import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const original = read('../src/BandProgramPage.jsx');
const preview = read('../src/next/BandProgramPreview.jsx');

test('Band preview preserves roster, venues, and FAQ coverage while refreshing section photos', () => {
  const replacedPhotos = ['fcc499b9-9497-4728-8a7f-ac9d25fc9422.png', '7ab10410-51d6-45d5-bba4-25d55070e9d1.png'];
  for (const url of original.match(/https:\/\/res\.cloudinary\.com\/[^"\s<>]+/g)) {
    if (replacedPhotos.some(photo => url.endsWith(photo))) continue;
    assert.ok(preview.includes(url), `Missing ${url}`);
  }
  assert.ok(read('../src/next/BandPreviewRoute.jsx').includes('https://headlinerma.opus1.io/login'));
  for (const match of original.matchAll(/(?:name|location):\s*"([^"]+)"/g)) assert.ok(preview.includes(match[1]), `Missing ${match[1]}`);
  assert.equal((preview.match(/    q:/g) || []).length, (original.match(/    q:/g) || []).length);
  assert.ok(preview.includes("Whether you're looking for musicians to play with or bringing an existing band"));
  assert.ok(preview.includes('Recording is included, with no separate fee.'));
  assert.ok(preview.includes('funding can support instruction here'));
  assert.ok(preview.includes('Frequently asked questions.'));
  assert.ok(!preview.includes('Performance from day one'));
});

test('Band hero uses the supplied video with motion controls and refreshed photographs', () => {
  for (const asset of ['PXL_20261001_021023325.NS-02.MAIN_wwcna5.mp4', '86d8ff20-bfb7-4089-9734-f5b12097289e.png', 'f2aa92fc-daca-46be-b2af-2e12189091a5.png', '9acd9715-1d3c-4853-9094-807c2fc0c2d0.png', '9198476e-d047-4ef5-9584-51ec4ff1b010.png']) assert.ok(preview.includes(asset));
  assert.ok(preview.includes('muted loop playsInline'));
  assert.ok(preview.includes('prefers-reduced-motion: reduce'));
  assert.ok(!preview.includes('Pause background video'));
  assert.ok(preview.includes("'Pause video'"));
  assert.ok(preview.includes('poster='));
  assert.ok(preview.includes('onError='));
});

test('Band preview remains noindex and the public route uses the approved design', () => {
  const route = read('../app/home-preview/band/page.js');
  assert.ok(route.includes('<ExpressivePreviewFrame>'));
  assert.ok(!route.includes('Asap_Condensed'));
  assert.ok(read('../src/next/previewFonts.js').includes('DM_Sans'));
  assert.ok(route.includes('index: false, follow: false'));
  assert.ok(route.includes("canonical: '/programs/band'"));
  assert.ok(read('../app/programs/band/page.js').includes('<BandPreviewRoute />'));
  assert.ok(!preview.includes('html, body'));
  assert.ok(!preview.includes('@import'));
});

test('Band preview removes eyebrows and includes the approved curriculum and perks', () => {
  assert.ok(!preview.includes('Eyebrow'));
  assert.ok(!preview.includes('—'));
  for (const text of ['Our structured curriculum', 'Weekly independent rehearsals included at no extra cost.', 'Stage-ready instruments and amplifiers', 'onstage monitoring', 'DMX lighting', 'every instrument mic’d', 'acoustically treated room', 'Record your original songs.', 'monthly private session', 'multi-instrumentalist teacher', 'Monthly performances', 'Sacramento area']) assert.ok(preview.includes(text), `Missing ${text}`);
  assert.ok(!preview.includes('The option to'));
  assert.ok(!preview.includes('We handle show logistics and production so you can focus on preparing your music and enjoying the performance.'));
  const css = read('../src/next/band-preview.module.css');
  assert.ok(css.includes('letter-spacing: normal !important'));
  assert.ok(!css.includes('--font-asap-condensed'));
});

test('Band content spreads concise perks and photographs across three sections', () => {
  const section = preview.split('{/* THE JOURNEY */}')[1].split('{/* VENUES */}')[0];
  assert.equal((section.match(/<figure/g) || []).length, 3);
  assert.equal((section.match(/<li>/g) || []).length, 6);
  assert.ok(!section.includes('<strong>'));
  assert.ok(!section.includes('<li><p>'));
  assert.ok(section.includes('styles.recordLayout'));
  assert.equal((section.match(/<section/g) || []).length, 2);
  assert.ok(section.includes('From rehearsal'));
  const css = read('../src/next/band-preview.module.css');
  assert.ok(!css.includes('rotate('));
  assert.ok(!css.includes('.photoCollage'));
  assert.ok(css.includes('.recordMedia'));
  assert.ok(css.includes('padding: 88px 0 !important'));
  assert.ok(css.includes('padding: 64px 0 !important'));
  assert.ok(preview.includes('Meet the <span'));
  assert.ok(!preview.includes('Every band starts somewhere'));
});

test('upcoming shows has an accessible heading without fictional listings', () => {
  const section = preview.split('{/* UPCOMING SHOWS */}')[1].split('{/* FAQ */}')[0];
  assert.ok(section.includes('aria-labelledby="upcoming-shows-title"'));
  assert.ok(section.includes('Watch this space for announced dates.'));
  assert.ok(!section.includes('Ask about the next performance'));
  assert.ok(!section.includes('2026-10'));
});

test('Band preview keeps booking selection and accessible page navigation', () => {
  const wrapper = read('../src/next/BandPreviewRoute.jsx');
  assert.ok(wrapper.includes('setBookingFor(instrument)'));
  assert.ok(wrapper.includes('<BookingModal instrument={bookingFor}'));
  assert.ok(wrapper.includes('setBookingFor(null)'));
  assert.ok(wrapper.includes('href="#band-main"'));
  assert.equal(preview.match(/onRequestLessons\("Band Performance"\)/g).length, 3);
});
