import BandProgramRoute from '../../../src/next/BandProgramRoute';

export const metadata = {
  title: 'Band Performance Program',
  description:
    'Live stage experience for young musicians in Rocklin, CA. Join a band and perform on a real stage.',
  alternates: {
    canonical: '/programs/band',
  },
  openGraph: {
    title: 'Band Performance Program | Headliner Music Academy',
    description:
      'Live stage experience for young musicians in Rocklin, CA. Join a band and perform on a real stage.',
    url: 'https://www.headlinermusicacademy.com/programs/band',
  },
};

export default function BandProgramPage() {
  return <BandProgramRoute />;
}