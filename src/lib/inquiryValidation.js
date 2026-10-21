export function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function canSubmitTour(form, status) {
  return Boolean(form.name.trim() && form.studentName.trim() &&
    (form.email.trim() ? validEmail(form.email) : form.phone.trim()) &&
    form.date && form.timeWindow && (status === 'idle' || status === 'error'));
}