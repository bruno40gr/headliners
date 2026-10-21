import test from 'node:test';
import assert from 'node:assert/strict';
import { submitToCrmIntake, submitLead } from '../src/lib/formDelivery.js';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

test('Pulse, CRM, EmailJS and shadow modes send the expected payloads', async () => {
  const originalFetch = globalThis.fetch;
  const originalMode = process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE;
  const calls = [];
  const leadPayload = { full_name: 'Synthetic Contact', payload: { message: 'Production engineer: Yes' } };
  const emailPayload = { name: 'Synthetic Contact', message: leadPayload.payload.message };
  globalThis.fetch = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return Response.json({ queued: true }, { status: 202 });
  };
  try {
    for (const mode of ['pulse', 'crm', 'emailjs', 'shadow']) {
      calls.length = 0;
      process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE = mode;
      await submitLead({ leadPayload, emailPayload, emailConfig: { serviceId: 'synthetic', templateId: 'synthetic', publicKey: 'synthetic' } });
      assert.equal(calls.length, mode === 'emailjs' ? 1 : 2);
      const crm = calls.find(call => call.url === '/api/intake');
      const email = calls.find(call => call.url.includes('emailjs.com'));
      if (mode !== 'emailjs') assert.equal(crm.body.payload.message, emailPayload.message);
      assert.equal(email.body.template_params.message, leadPayload.payload.message);
    }
  } finally {
    globalThis.fetch = originalFetch;
    if (originalMode === undefined) delete process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE;
    else process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE = originalMode;
  }
});

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

test('Pulse acceptance survives EmailJS failure; failed intake never sends email', async () => {
  const originalFetch = globalThis.fetch;
  const originalMode = process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE;
  const originalError = console.error;
  const calls = [];
  const warnings = [];
  let intakeStatus = 202;
  process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE = 'pulse';
  console.error = (...args) => warnings.push(args);
  globalThis.fetch = async url => {
    calls.push(url);
    return new Response('{}', { status: url === '/api/intake' ? intakeStatus : 503 });
  };
  const submission = { leadPayload: { full_name: 'Synthetic' }, emailPayload: { name: 'Synthetic' }, emailConfig: { serviceId: 'test', templateId: 'test', publicKey: 'test' } };
  try {
    assert.equal((await submitLead(submission)).status, 202);
    assert.deepEqual(calls, ['/api/intake', 'https://api.emailjs.com/api/v1.0/email/send']);
    assert.equal(warnings.length, 1);
    calls.length = 0;
    intakeStatus = 503;
    await assert.rejects(submitLead(submission));
    assert.deepEqual(calls, ['/api/intake']);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    if (originalMode === undefined) delete process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE;
    else process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE = originalMode;
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