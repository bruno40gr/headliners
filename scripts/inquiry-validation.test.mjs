import test from 'node:test';
import assert from 'node:assert/strict';
import { validEmail, canSubmitTour } from '../src/lib/inquiryValidation.js';

test('email validation rejects malformed or blank addresses', () => {
  for (const email of ['', '   ', 'not-an-email', 'a@', 'a b@example.com']) assert.equal(validEmail(email), false);
  assert.equal(validEmail(' band@example.invalid '), true);
});

test('tours require contact details and can retry after failure but not while sending', () => {
  const form = { name: 'Parent', studentName: 'Student', email: '', phone: '', date: '2026-11-07', timeWindow: 'Afternoon' };
  assert.equal(canSubmitTour(form, 'idle'), false);
  form.phone = '9165550100';
  assert.equal(canSubmitTour(form, 'idle'), true);
  assert.equal(canSubmitTour(form, 'error'), true);
  assert.equal(canSubmitTour(form, 'sending'), false);
  assert.equal(canSubmitTour(form, 'success'), false);
  form.email = 'broken';
  assert.equal(canSubmitTour(form, 'idle'), false);
  form.email = 'parent@example.invalid';
  assert.equal(canSubmitTour(form, 'idle'), true);
});