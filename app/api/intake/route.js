import { NextResponse } from 'next/server';

const PULSE_INTAKE_URL = 'https://pulse-pu6d6196p-bruno40grs-projects.vercel.app/api/intake';

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid lead payload.' }, { status: 400 });
  }

  try {
    const response = await fetch(PULSE_INTAKE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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