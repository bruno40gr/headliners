import { NextResponse } from 'next/server';
import { validateRsvp } from '../../../src/lib/rsvp';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please enter valid RSVP details.' }, { status: 400 });
  }
  const result = validateRsvp(body);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });

  const headers = new Headers({ 'Content-Type': 'application/json' });
  const key = request.headers.get('idempotency-key');
  if (!key || !/^[A-Za-z0-9_-]{1,160}$/.test(key)) {
    return NextResponse.json({ error: 'A valid submission key is required.' }, { status: 400 });
  }
  headers.set('Idempotency-Key', key);

  // Dedicated RSVP storage. Never route guests through lead/contact intake.
  try {
    const response = await fetch('https://app.headlinerma.com/api/event-rsvps/public', {
      method: 'POST', headers, body: JSON.stringify(result.data), cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    const body = await response.json();
    if (!response.ok || body.ok !== true) throw new Error('RSVP delivery failed');
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'We couldn’t save your RSVP. Please try again, or call (916) 435-1300.' }, { status: 503 });
  }
}