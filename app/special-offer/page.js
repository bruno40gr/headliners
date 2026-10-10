import SpecialOfferRoute from '../../src/next/SpecialOfferRoute';

export const metadata = {
  title: 'Wag & Walk Special Offer',
  description:
    'Claim the Wag & Walk offer: 40% off your first month of music lessons, early childhood music, or the Band Program at Headliner Music Academy in Rocklin, CA.',
  alternates: {
    canonical: '/special-offer',
  },
  openGraph: {
    title: 'Wag & Walk: 40% Off Your First Month | Headliner Music Academy',
    description:
      'A Wag & Walk special offer for music lessons, early childhood music, and the Band Program in Rocklin, CA.',
    url: 'https://www.headlinermusicacademy.com/special-offer',
  },
};

export default function SpecialOfferPage() {
  return <SpecialOfferRoute />;
}