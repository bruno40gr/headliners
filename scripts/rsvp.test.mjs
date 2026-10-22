import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRsvpIntake, validateRsvp } from '../src/lib/rsvp.js';

test('normalizes RSVP details without losing party size', () => {
  assert.deepEqual(validateRsvp({ name: '  Guest Name  ', email: ' GUEST@EXAMPLE.COM ', partySize: '4' }), {
    data: { name: 'Guest Name', email: 'guest@example.com', partySize: 4 },
  });
});

test('rejects missing, malformed, and oversized RSVP details', () => {
  const valid = { name: 'Guest', email: 'guest@example.com', partySize: 1 };
  for (const value of [null, [], {}, { ...valid, name: ' ' }, { ...valid, name: 'a'.repeat(121) },
    { ...valid, email: 'invalid' }, { ...valid, email: 'a'.repeat(255) + '@example.com' },
    ...['', '0', '-1', '1.5', '100', 'many', null, true, [], {}].map(partySize => ({ ...valid, partySize }))]) {
    assert.ok(validateRsvp(value).error, JSON.stringify(value));
  }
});

test('accepts party-size bounds and creates a separate event RSVP intake', () => {
  for (const partySize of [1, 99]) assert.ok(validateRsvp({ name: 'Guest', email: 'guest@example.com', partySize }).data);
  const payload = buildRsvpIntake({ name: 'Guest', email: 'guest@example.com', partySize: 3 }, 'school-id');
  assert.equal(payload.tenant_id, 'school-id');
  assert.equal(payload.intake_type, 'event_rsvp');
  assert.equal(payload.source_form, 'grand_opening_rsvp');
  assert.equal(payload.payload.party_size, 3);
  assert.equal(payload.payload.event_id, 'headliner-grand-opening');
  assert.equal(payload.source_page, '/rsvp');
});