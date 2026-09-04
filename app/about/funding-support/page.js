import FundingSupportRoute from '../../../src/next/FundingSupportRoute';

export const metadata = {
  title: 'Funding Support',
  description:
    "Funding support for music lessons in Rocklin, CA. Headliner is an approved vendor for Alta California Regional Center, South Sutter, ACE FMS, Mains'l, and Aveanna.",
  alternates: {
    canonical: '/about/funding-support',
  },
  openGraph: {
    title: 'Funding Support | Headliner Music Academy',
    description:
      "Funding support for music lessons in Rocklin, CA. Headliner is an approved vendor for Alta California Regional Center, South Sutter, ACE FMS, Mains'l, and Aveanna.",
    url: 'https://www.headlinermusicacademy.com/about/funding-support',
  },
};

export default function FundingSupportPage() {
  return <FundingSupportRoute />;
}