// The contact is the parent (or adult student); the student is never inferred
// from a contact name. `name` remains compatible with the legacy email template,
// whose label is "Student name".
export function lessonIdentity(parentName, studentName) {
  const parent = parentName.trim();
  const student = studentName.trim();
  return {
    contactName: parent,
    payload: { parent_name: parent, student_name: student },
    email: { name: student, parent_name: parent, student_name: student },
  };
}