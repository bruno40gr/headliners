# Lesson and tour identity mapping

Lesson inquiries, tours and special-offer forms collect separate student and
parent/contact names. Adult students enter their own name in both fields.
Service inquiries and career applications retain their existing contact/applicant
identity fields; they do not collect fictitious parent/student identities.

## Submission contract

- Odeon `full_name`: parent/contact name.
- Odeon `payload.parent_name`: parent/contact name.
- Odeon `payload.student_name`: student name.
- EmailJS `parent_name`: parent/contact name.
- EmailJS `student_name`: student name.
- EmailJS legacy `name`: student name, matching the existing "Student name" label.

No historical names are rewritten or inferred from email messages.

## Required EmailJS dashboard change before release

The hosted template is not managed by this repository. Keep the existing shared
template ID; render these separately:

```text
Student name: {{student_name}}
Parent / contact name: {{parent_name}}
Contact name: {{contact_name}}
```

Use `{{contact_name}}` in the heading and subject. Email submission supplies
the existing contact/applicant name for services/careers, and the parent/contact
name for lesson/tour requests. Missing parent/student fields render as
"Not applicable / not provided" for services, careers and older callers. No
conditional-template syntax or duplicate template is required.
Do not assume the template has changed merely because extra variables are sent.

## Acceptance

Submit distinct synthetic parent/student names through each of the four form
components. Verify the email rows and Odeon contact/lesson-details agree. Verify
service and careers forms remain unchanged and test narrow/mobile layouts.
Run `node --test scripts/lesson-identity.test.mjs scripts/form-delivery.test.mjs`.