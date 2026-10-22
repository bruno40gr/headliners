export const GRAND_OPENING = {
  id: 'headliner-grand-opening',
  name: 'Headliner Grand Opening',
  dateLabel: 'November 6',
  address: '2311 Sunset Blvd, Rocklin, CA',
};

export function validateRsvp(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { error: 'Please enter your RSVP details.' };
  }
  const name = typeof value.name === 'string' ? value.name.trim() : '';
  const email = typeof value.email === 'string' ? value.email.trim().toLowerCase() : '';
  const partySize = typeof value.partySize === 'number' || typeof value.partySize === 'string'
    ? Number(value.partySize) : NaN;

  if (!name || name.length > 120) return { error: 'Please enter your name (up to 120 characters).' };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 99) {
    return { error: 'Please enter a party size from 1 to 99, including yourself.' };
  }
  return { data: { name, email, partySize } };
}

export function buildRsvpIntake(data, tenantId) {
  return {
    tenant_id: tenantId,
    intake_type: 'event_rsvp',
    source: 'event',
    source_system: 'headliner-website',
    source_form: 'grand_opening_rsvp',
    source_page: '/rsvp',
    full_name: data.name,
    email: data.email,
    payload: {
      event_id: GRAND_OPENING.id,
      event_name: GRAND_OPENING.name,
      event_date_label: GRAND_OPENING.dateLabel,
      party_size: data.partySize,
      message: `Grand opening RSVP: ${data.partySize} ${data.partySize === 1 ? 'guest' : 'guests'} (including the person submitting).`,
    },
  };
}