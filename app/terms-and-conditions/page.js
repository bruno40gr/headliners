import LegalPage from '../../src/next/LegalPage';

export const metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and conditions for enrollment at Headliner Music Academy in Rocklin, CA.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions | Headliner Music Academy',
    description:
      'Terms and conditions for enrollment at Headliner Music Academy in Rocklin, CA.',
    url: 'https://www.headlinermusicacademy.com/terms-and-conditions',
  },
};

const sections = [
  {
    title: 'Enrollment and billing',
    body: 'Enrollment is on a monthly subscription basis. Billing occurs automatically each month on your billing date. You are responsible for keeping payment information current.',
  },
  {
    title: 'Cancellations and holds',
    body: 'You may cancel or place your account on hold by contacting us at (916) 435-1300 or admin@headlinermusicacademy.com. Cancellations require notice before your next billing date to avoid being charged for the following month.',
  },
  {
    title: '24-Hour Absence Notice',
    body: "If, for any reason, your student is unable to attend a lesson, we ask for at least 24 hours' notice out of respect for our teachers' schedules and how they are compensated. If you call, email, or leave a voicemail at least 24 hours before the reserved lesson, even if Headliner is closed at the time you contact us, we will reschedule it within 30 days.",
  },
  {
    title: 'Communications',
    body: 'By enrolling, you agree to receive operational and promotional communications from Headliner Music Academy via SMS and email. You may opt out at any time by replying STOP to any SMS or contacting us directly.',
  },
  {
    title: 'SMS Communications',
    body: 'We collect SMS opt-in consent through two separate, optional checkboxes: one for transactional or informational messages such as scheduling, billing, reminders, and account updates, and one for promotional or marketing messages about programs and events. Opt-in to each is independent and optional. Message frequency varies. Message and data rates may apply. You may opt out of either type at any time by replying STOP. For assistance, reply HELP or contact us at (916) 435-1300 or admin@headlinermusicacademy.com.',
  },
  {
    title: 'Code of conduct',
    body: 'We are committed to maintaining a respectful and safe environment for all students, families, and staff. Headliner Music Academy reserves the right to terminate enrollment for conduct that disrupts the learning environment.',
  },
  {
    title: 'Limitation of liability',
    body: 'Headliner Music Academy is not responsible for lost, stolen, or damaged personal property on academy premises.',
  },
  {
    title: 'Changes to these terms',
    body: 'We may update these terms from time to time. Continued enrollment constitutes acceptance of any updated terms.',
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="Last updated: August 11, 2026"
      intro="These terms govern your enrollment and participation at Headliner Music Academy (a DBA of Marchena & Papadhima LLC), located at 2311 Sunset Blvd, Rocklin, CA 95765."
      sections={sections}
      links={[
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/sms-consent', label: 'SMS Consent' },
        { href: '/', label: 'Home' },
      ]}
    />
  );
}