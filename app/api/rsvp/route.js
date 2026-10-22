/* global process */
import { NextResponse } from 'next/server';
import { POST as submitIntake } from '../intake/route';
import { buildRsvpIntake, validateRsvp } from '../../../src/lib/rsvp';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please enter valid RSVP details.' }, { status: 400 });
  }
  const result = validateRsvp(body);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });

  const tenantId = process.env.NEXT_PUBLIC_CRM_TENANT_ID || '00000000-0000-0000-0000-000000000001';
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const key = request.headers.get('idempotency-key');
  if (key !== null) headers.set('Idempotency-Key', key);

  // Reuse the site's intake transport and its idempotency validation. Guests
  // cannot choose the event, source, or account receiving their RSVP.
  const response = await submitIntake(new Request(request.url, {
    method: 'POST', headers, body: JSON.stringify(buildRsvpIntake(result.data, tenantId)),
  }));
  if (!response.ok) {
    return NextResponse.json({ error: 'We couldn’t save your RSVP. Please try again, or call (916) 435-1300.' }, { status: response.status });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}