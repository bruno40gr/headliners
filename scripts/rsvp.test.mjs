import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateRsvp } from '../src/lib/rsvp.js';

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

test('accepts party-size bounds', () => {
  for (const partySize of [1, 99]) assert.ok(validateRsvp({ name: 'Guest', email: 'guest@example.com', partySize }).data);
});
