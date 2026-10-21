import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = file => readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8');

test('shared and legacy lead forms render the same FormLabel component', () => {
  for (const file of ['ui.jsx', 'App.jsx', 'BookingInterstitial.jsx', 'CareersPage.jsx', 'SpecialOfferPage.jsx', 'next/SmsConsentPage.jsx']) {
    assert.ok(read(file).includes('<FormLabel'), file);
  }
  const label = read('FormLabel.jsx');
  assert.ok(label.includes('fontSize: 16'));
  assert.ok(label.includes('fontWeight: 600'));
  assert.ok(!read('BookingModal.jsx').includes('label={<span style='));
});