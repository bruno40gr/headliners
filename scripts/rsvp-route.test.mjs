import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { validateRsvp } from '../src/lib/rsvp.js';

function setup(reply = { status: 201, body: { ok: true } }) {
  const calls = [];
  const source = readFileSync(new URL('../app/api/rsvp/route.js', import.meta.url), 'utf8')
    .replace(/^import .*;\n/gm, '').replace('export async function POST', 'async function POST');
  const context = vm.createContext({
    validateRsvp, Headers, AbortSignal,
    NextResponse: { json: (body, options) => Response.json(body, options) },
    fetch: async (url, options) => { calls.push({ url, options }); return Response.json(reply.body, { status: reply.status }); },
  });
  vm.runInContext(source + '\nthis.handler = POST;', context);
  return { handler: context.handler, calls };
}
const request = (body, key = 'synthetic-key') => new Request('http://synthetic.invalid/api/rsvp', {
  method: 'POST', headers: key ? { 'Content-Type': 'application/json', 'Idempotency-Key': key } : {}, body: JSON.stringify(body),
});
const guest = { name: ' Guest ', email: ' GUEST@EXAMPLE.COM ', partySize: '3' };

test('website sends only normalized RSVP details to dedicated Pulse storage, never intake', async () => {
  const { handler, calls } = setup();
  assert.equal((await handler(request(guest))).status, 201);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://app.headlinerma.com/api/event-rsvps/public');
  assert.deepEqual(JSON.parse(calls[0].options.body), { name: 'Guest', email: 'guest@example.com', partySize: 3 });
  assert.equal(calls[0].options.headers.get('Idempotency-Key'), 'synthetic-key');
});

test('invalid requests make no upstream call', async () => {
  const { handler, calls } = setup();
  assert.equal((await handler(request({}))).status, 400);
  assert.equal((await handler(request(guest, null))).status, 400);
  assert.equal(calls.length, 0);
});

test('backend failure or unrecognized response fails closed, without intake fallback', async () => {
  for (const reply of [{ status: 503, body: { error: 'Unavailable' } }, { status: 200, body: {} }]) {
    const { handler, calls } = setup(reply);
    assert.equal((await handler(request(guest))).status, 503);
    assert.equal(calls.length, 1);
    assert.ok(!calls[0].url.endsWith('/intake'));
  }
});