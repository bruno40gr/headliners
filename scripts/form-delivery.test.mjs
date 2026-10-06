import test from 'node:test';
import assert from 'node:assert/strict';
import { submitToCrmIntake } from '../src/lib/formDelivery.js';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

test('transport retry retains key; new or edited submissions do not share keys', async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (_url, options) => {
    requests.push(options);
    return new Response('{}', { status: 202 });
  };
  try {
    const payload = { full_name: 'Synthetic person', email: 'test@example.invalid' };
    await submitToCrmIntake(payload);
    await submitToCrmIntake(payload);
    await submitToCrmIntake({ ...payload });
    payload.full_name = 'Changed synthetic person';
    await submitToCrmIntake(payload);
    const keys = requests.map(request => request.headers['Idempotency-Key']);
    assert.match(keys[0], /^[A-Za-z0-9_-]{1,160}$/);
    assert.equal(keys[0], keys[1]);
    assert.notEqual(keys[0], keys[2]);
    assert.notEqual(keys[0], keys[3]);
    assert.equal(JSON.parse(requests[0].body).full_name, 'Synthetic person');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('failed request is not automatically retried; explicit retry retains key', async () => {
  const originalFetch = globalThis.fetch;
  const keys = [];
  globalThis.fetch = async (_url, options) => {
    keys.push(options.headers['Idempotency-Key']);
    return new Response('{}', { status: keys.length === 1 ? 503 : 202 });
  };
  try {
    const payload = { full_name: 'Synthetic person' };
    await assert.rejects(submitToCrmIntake(payload));
    assert.equal(keys.length, 1);
    await submitToCrmIntake(payload);
    assert.equal(keys[0], keys[1]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('website proxy uses stable endpoint and preserves retry key and queued response', async () => {
  const calls = [];
  const source = readFileSync(new URL('../app/api/intake/route.js', import.meta.url), 'utf8')
    .replace("import { NextResponse } from 'next/server';", '')
    .replace('export async function POST', 'async function POST');
  const context = vm.createContext({
    NextResponse: { json: (body, options) => Response.json(body, options) },
    console,
    fetch: async (url, options) => {
      calls.push({ url, options });
      return Response.json({ success: true, queued: true, receipt_id: 'synthetic' }, { status: 202 });
    },
  });
  vm.runInContext(source, context);
  const request = key => new Request('https://website.example.invalid/api/intake', {
    method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': key },
    body: JSON.stringify({ full_name: 'Synthetic person' }),
  });
  const response = await context.POST(request('synthetic-key'));
  assert.equal(response.status, 202);
  assert.equal((await response.json()).queued, true);
  assert.equal(calls[0].url, 'https://app.headlinerma.com/api/intake');
  assert.equal(calls[0].options.headers['Idempotency-Key'], 'synthetic-key');
  assert.equal((await context.POST(request('invalid,key'))).status, 400);
  assert.equal(calls.length, 1);
});