import SmsConsentPage from '../../src/next/SmsConsentPage';

export const metadata = {
  title: 'SMS Consent',
  description:
    'SMS opt-in for Headliner Music Academy. Two separate, optional checkboxes: transactional or informational messages and promotional or marketing messages.',
  alternates: {
    canonical: '/sms-consent',
  },
  openGraph: {
    title: 'SMS Consent | Headliner Music Academy',
    description:
      'SMS opt-in for Headliner Music Academy. Two separate, optional checkboxes: transactional or informational messages and promotional or marketing messages.',
    url: 'https://headlinermusicacademy.com/sms-consent',
  },
};

export default function Page() {
  return <SmsConsentPage />;
}