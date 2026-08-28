import LegalPage from '../../src/next/LegalPage';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Headliner Music Academy in Rocklin, CA. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Headliner Music Academy',
    description:
      'Privacy policy for Headliner Music Academy in Rocklin, CA. Learn how we collect, use, and protect your personal information.',
    url: 'https://headlinermusicacademy.com/privacy-policy',
  },
};

const sections = [
  {
    title: 'Information we collect',
    body: 'We collect information you provide when enrolling a student or contacting us, including name, phone number, email address, and payment information. We also collect attendance and lesson history as part of our normal operations.',
  },
  {
    title: 'How we use your information',
    body: 'We use your information to manage enrollments, process payments, communicate about lessons and scheduling, and send you updates about Headliner Music Academy programs and events.',
  },
  {
    title: 'SMS and email communications',
    body: 'We collect SMS opt-in consent through two separate, optional checkboxes: one for transactional or informational messages such as scheduling, billing, reminders, and account updates, and one for promotional or marketing messages about programs and events. Opt-in to each is independent and optional. Message frequency varies. Data rates may apply. You may opt out of either type of SMS message at any time by replying STOP. For assistance, reply HELP. You may opt out of email communications by clicking unsubscribe in any email we send.',
  },
  {
    title: 'Information sharing',
    body: 'We do not sell or share your personal information, mobile information, or messaging consent with third parties for marketing or promotional purposes. We may share information with service providers who help us operate our business, such as payment processors and messaging platforms, under strict confidentiality agreements and solely for operational purposes.',
  },
  {
    title: 'Data security',
    body: 'We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="Last updated: August 11, 2026"
      intro="Headliner Music Academy (a DBA of Marchena & Papadhima LLC), located at 2311 Sunset Blvd, Rocklin, CA 95765, is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information."
      sections={sections}
      links={[
        { href: '/terms-and-conditions', label: 'Terms & Conditions' },
        { href: '/sms-consent', label: 'SMS Consent' },
        { href: '/', label: 'Home' },
      ]}
    />
  );
}