import LittleRockersRoute from '../../src/next/LittleRockersRoute';

export const metadata = {
  title: 'Little Rockers — Music for Ages 3–5',
  description:
    'A joyful, play-based music class for preschoolers ages 3 to 5 in Rocklin, CA. Sing, move, explore, and grow through music together.',
  alternates: {
    canonical: '/little-rockers',
  },
  openGraph: {
    title: 'Little Rockers — Music for Ages 3–5 | Headliner Music Academy',
    description:
      'A joyful, play-based music class for preschoolers ages 3 to 5 in Rocklin, CA. Sing, move, explore, and grow through music together.',
    url: 'https://www.headlinermusicacademy.com/little-rockers',
  },
};

export default function LittleRockersPage() {
  return <LittleRockersRoute />;
}