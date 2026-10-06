import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { lessonIdentity } from '../src/lib/lessonIdentity.js';
import { submitToEmailJS } from '../src/lib/formDelivery.js';

test('shared EmailJS template preserves service contact and separates lesson identities', async () => {
  const originalFetch = globalThis.fetch;
  const sent = [];
  globalThis.fetch = async (_url, options) => {
    sent.push(JSON.parse(options.body).template_params);
    return new Response('OK');
  };
  try {
    const config = { serviceId: 'synthetic', templateId: 'synthetic', publicKey: 'synthetic' };
    await submitToEmailJS({ name: 'Service Example', form_type: 'Service Inquiry' }, config);
    await submitToEmailJS(lessonIdentity('Parent Example', 'Student Example').email, config);
    assert.equal(sent[0].contact_name, 'Service Example');
    assert.equal(sent[0].student_name, 'Not applicable / not provided');
    assert.equal(sent[0].parent_name, 'Not applicable / not provided');
    assert.equal(sent[1].contact_name, 'Parent Example');
    assert.equal(sent[1].student_name, 'Student Example');
    assert.equal(sent[1].parent_name, 'Parent Example');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('parent and student remain separate in contact, payload and email variables', () => {
  const identity = lessonIdentity(' Parent Example ', ' Student Example ');
  assert.equal(identity.contactName, 'Parent Example');
  assert.deepEqual(identity.payload, { parent_name: 'Parent Example', student_name: 'Student Example' });
  assert.deepEqual(identity.email, { name: 'Student Example', parent_name: 'Parent Example', student_name: 'Student Example' });
});

test('adult student can explicitly supply the same name in both fields', () => {
  const identity = lessonIdentity('Adult Example', 'Adult Example');
  assert.equal(identity.contactName, identity.payload.student_name);
});

for (const [file, parent, student] of [
  ['App.jsx', 'parentName', 'name'],
  ['BookingModal.jsx', 'parentName', 'name'],
  ['BookingInterstitial.jsx', 'name', 'studentName'],
  ['SpecialOfferPage.jsx', 'parentName', 'studentName'],
]) {
  test(`${file} constructs matching Odeon and EmailJS identities`, () => {
    const source = readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8');
    const start = source.indexOf('const identity = lessonIdentity(');
    const end = source.indexOf('\n    try {', start);
    assert.ok(start >= 0 && end > start);
    const form = { [parent]: 'Parent Example', [student]: 'Student Example', age: '3',
      email: 'synthetic@example.invalid', phone: '', instrument: 'Piano', program: 'Little Rockers',
      level: 'Beginner', days: ['Monday'], times: ['Evening'], notes: '', date: '2026-10-13', timeWindow: 'Evening' };
    const result = vm.runInNewContext(`${source.slice(start, end)}\n({ leadPayload, emailPayload })`, {
      form, lessonIdentity, CRM_TENANT_ID: 'synthetic', programName: 'Little Rockers',
      SPECIAL_EVENT: { source: 'event', offerCode: 'synthetic', name: 'Synthetic event' },
      window: { location: { pathname: '/synthetic', href: 'https://example.invalid/synthetic' } },
    });
    assert.equal(result.leadPayload.full_name, 'Parent Example');
    assert.equal(result.leadPayload.payload.parent_name, 'Parent Example');
    assert.equal(result.leadPayload.payload.student_name, 'Student Example');
    assert.equal(result.emailPayload.parent_name, 'Parent Example');
    assert.equal(result.emailPayload.student_name, 'Student Example');
    assert.equal(result.emailPayload.name, 'Student Example');
  });
}