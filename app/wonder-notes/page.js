import WonderNotesRoute from '../../src/next/WonderNotesRoute';

export const metadata = {
  title: 'Wonder Notes — Music for Ages 3–5',
  description:
    'A joyful, play-based music class for preschoolers ages 3 to 5 in Rocklin, CA. Sing, move, explore, and grow through music together.',
  alternates: {
    canonical: '/wonder-notes',
  },
  openGraph: {
    title: 'Wonder Notes — Music for Ages 3–5 | Headliner Music Academy',
    description:
      'A joyful, play-based music class for preschoolers ages 3 to 5 in Rocklin, CA. Sing, move, explore, and grow through music together.',
    url: 'https://www.headlinermusicacademy.com/wonder-notes',
  },
};

export default function WonderNotesPage() {
  return <WonderNotesRoute />;
}