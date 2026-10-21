import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('recording preview reuses production content and the service inquiry form', () => {
  const preview = read('../src/next/ServicePreviewLayout.jsx');
  assert.ok(read('../src/next/RecordingProductionPreview.jsx').includes('<ServicesRecordingProductionPage PageComponent={ServicePreviewLayout}'));
  for (const content of ['serviceList.map', 'galleryItems.map', 'items={faqs}', '{intro}', '{listIntro}', '{ctaBody}']) assert.ok(preview.includes(content));
  assert.ok(preview.includes('<ServiceInquiryModal serviceName={pageName}'));
  assert.ok(!preview.includes('BookingModal'));
  assert.ok(preview.includes('href={`#${mainId}`}'));
  assert.ok(preview.includes("mainId = 'recording-main'"));
  assert.ok(preview.includes('setInquiryOpen(false)'));
});

test('recording design shares Band styling and is promoted on the public route', () => {
  const preview = read('../src/next/ServicePreviewLayout.jsx');
  const route = read('../app/home-preview/recording-music-production/page.js');
  const css = read('../src/next/recording-preview.module.css');
  assert.ok(preview.includes("'./band-preview.module.css'"));
  assert.ok(!preview.includes('Eyebrow'));
  assert.ok(!preview.includes('—'));
  assert.ok(css.includes('border-radius: 16px'));
  assert.ok(route.includes('<ExpressivePreviewFrame>'));
  assert.ok(read('../src/next/previewFonts.js').includes('DM_Sans({'));
  assert.ok(route.includes('index: false, follow: false'));
  assert.ok(route.includes("canonical: '/services/recording-music-production'"));
  assert.ok(read('../app/services/recording-music-production/page.js').includes('<RecordingProductionPreview />'));
});

test('Recording Studio preview uses the supplied full-service and two live room introduction', () => {
  const preview = read('../src/next/RecordingProductionPreview.jsx');
  for (const text of ["title: 'Recording Studio'", 'Full-service recording spaces in the heart of Rocklin.', 'two distinct live room studio spaces', 'recording, mixing, mastering, and multimedia production']) assert.ok(preview.includes(text));
  assert.ok(read('../src/ServicesRecordingProductionPage.jsx').includes('{...contentOverrides}'));
});

test('rehearsal preview includes approved services, starting rate and multimedia production', () => {
  const preview = read('../src/next/RehearsalSpacePreview.jsx');
  for (const text of ['Band Rehearsal Space in Rocklin', 'workshop new material', 'What we offer', 'Rates start at $50/hr', 'full digital PA', 'house drum kit', 'keys, mics, and stage lighting', 'After-hours and Sunday bookings are available by consultation.', 'Production professionals to support your rehearsal', 'Band Rehearsal', 'filming a live performance video', 'Full-Service Multimedia Production', '4K cinematic videos', 'mixing, mastering, and video editing']) assert.ok(preview.includes(text), text);
  assert.ok(!preview.includes('Rehearsal space is $50 per hour'));
  assert.ok(preview.includes('mainId="rehearsal-main"'));
  assert.ok(preview.includes('ctaLabel="Book rehearsal space"'));
  assert.ok(preview.includes('No. Storage is not available.'));
  const route = read('../app/home-preview/rehearsal-space/page.js');
  assert.ok(route.includes('index: false, follow: false'));
  assert.ok(route.includes("canonical: '/services/rehearsal-space'"));
  assert.ok(read('../app/services/rehearsal-space/page.js').includes('<RehearsalSpacePreview />'));
});

test('Band hero is 50 percent taller and content images have rounded corners', () => {
  const css = read('../src/next/band-preview.module.css');
  assert.ok(css.includes('min-height: 990px'));
  assert.ok(css.includes('min-height: 885px'));
  assert.ok(css.includes('.page :global(.bp-img-wrap) { border-radius: 16px'));
  assert.ok(css.includes('.rehearsalMedia figure, .recordMedia figure { margin: 0; border-radius: 16px'));
});
