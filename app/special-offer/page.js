import SpecialOfferRoute from '../../src/next/SpecialOfferRoute';

export const metadata = {
  title: 'Hot Chili Cool Cars Special Offer',
  description:
    'Claim 40% off your first month of music lessons, early childhood music, or the Band Program at Headliner Music Academy in Rocklin, CA.',
  alternates: {
    canonical: '/special-offer',
  },
  openGraph: {
    title: '40% Off Your First Month | Headliner Music Academy',
    description:
      'A Hot Chili Cool Cars special offer for music lessons, early childhood music, and the Band Program in Rocklin, CA.',
    url: 'https://www.headlinermusicacademy.com/special-offer',
  },
};

export default function SpecialOfferPage() {
  return <SpecialOfferRoute />;
}