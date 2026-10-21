import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { formatRehearsalMessage, rehearsalDocumentEmail } from '../src/lib/rehearsalInquiry.js';

test('untouched production section adds no empty headings or inferred No answers', () => {
  assert.equal(formatRehearsalMessage(' Sunday rehearsal '), 'Sunday rehearsal');
  assert.equal(formatRehearsalMessage(''), '');
});

test('production notes preserve the inquiry, distinguish blank answers and include setup', () => {
  const message = formatRehearsalMessage('Sunday rehearsal', { engineer: 'Yes', recording: '', setup: ' Drums and bass; three monitor feeds ' });
  for (const text of ['Sunday rehearsal', 'Production engineer: Yes', 'Session recording: Not specified', 'Drums and bass; three monitor feeds']) assert.ok(message.includes(text));
  assert.ok(formatRehearsalMessage('', { engineer: 'No', recording: 'No' }).includes('Session recording: No'));
  for (const recording of ['Yes', 'No']) assert.ok(formatRehearsalMessage('', { recording }).includes(`Session recording: ${recording}`));
});

test('document email encodes contact details without treating documents as uploaded', () => {
  const url = new URL(rehearsalDocumentEmail('A & B', 'test+band@example.invalid'));
  assert.equal(url.pathname, 'admin@headlinermusicacademy.com');
  assert.ok(url.searchParams.get('body').includes('A & B'));
  assert.ok(url.searchParams.get('body').includes('test+band@example.invalid'));
  assert.equal(url.searchParams.get('subject'), 'Rehearsal inquiry: input list and stage plot');
});

test('production fields use shared styling, Yes/No radios and an unconditional setup field', () => {
  const fields = readFileSync(new URL('../src/RehearsalProductionFields.jsx', import.meta.url), 'utf8');
  for (const text of ['<FormField label={question}>', 'role="radiogroup"', 'type="radio"', "['Yes', 'No']", '<FormField label="Have a stage plot? Enter your band lineup and monitor mixes">']) assert.ok(fields.includes(text));
  for (const removed of ['Select', 'type="checkbox"', 'showSetup', 'Add details now', 'After you send your inquiry', 'We can help prepare']) assert.ok(!fields.includes(removed));
  const form = readFileSync(new URL('../src/ServicesPage.jsx', import.meta.url), 'utf8');
  assert.ok(form.includes('rehearsalProduction ? "Submit" : "Reach out"'));
});

test('both delivery payloads use the same summary and only rehearsal preview enables additions', () => {
  const form = readFileSync(new URL('../src/ServicesPage.jsx', import.meta.url), 'utf8');
  const preview = readFileSync(new URL('../src/next/ServicePreviewLayout.jsx', import.meta.url), 'utf8');
  assert.ok(form.includes('message: message || null'));
  assert.ok(form.includes('message: message || "No additional details"'));
  assert.ok(form.includes('rehearsalProduction = false'));
  assert.ok(preview.includes("rehearsalProduction={mainId === 'rehearsal-main'}"));
});