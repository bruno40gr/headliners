import { NextResponse } from 'next/server';

const PULSE_INTAKE_URL = 'https://app.headlinerma.com/api/intake';

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid lead payload.' }, { status: 400 });
  }

  const submissionKey = request.headers.get('idempotency-key');
  if (submissionKey !== null && !/^[A-Za-z0-9_-]{1,160}$/.test(submissionKey)) {
    return NextResponse.json({ error: 'Invalid submission key.' }, { status: 400 });
  }

  try {
    const response = await fetch(PULSE_INTAKE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        ...(submissionKey === null ? {} : { 'Idempotency-Key': submissionKey }) },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
    const body = await response.json().catch(() => ({ error: 'Pulse returned an invalid response.' }));

    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error('Pulse intake proxy failed:', error);
    return NextResponse.json({ error: 'Unable to submit your request right now.' }, { status: 502 });
  }
}