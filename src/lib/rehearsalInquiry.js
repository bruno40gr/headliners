export function formatRehearsalMessage(details, { engineer = '', recording = '', setup = '' } = {}) {
  const message = details.trim();
  if (!engineer && !recording && !setup.trim()) return message;
  return [
    message,
    'REHEARSAL PRODUCTION DETAILS',
    `Production engineer: ${engineer || 'Not specified'}`,
    `Session recording: ${recording || 'Not specified'}`,
    setup.trim() ? `Band lineup and monitor mixes:\n${setup.trim()}` : '',
  ].filter(Boolean).join('\n\n');
}

export function rehearsalDocumentEmail(name, email) {
  const subject = 'Rehearsal inquiry: input list and stage plot';
  const body = `Name: ${name.trim()}\nInquiry email: ${email.trim()}\n\nPlease find my input list and stage plot attached.\n\n`;
  return `mailto:admin@headlinermusicacademy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}