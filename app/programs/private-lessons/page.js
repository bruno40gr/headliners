import PrivateLessonsRoute from '../../../src/next/PrivateLessonsRoute';

export const metadata = {
  title: 'Private and Semi-Private Music Lessons',
  description:
    'Private and semi-private music lessons in Rocklin, CA for kids, teens, and adults. In-person and Zoom lesson options, monthly recitals, and no registration fee.',
  alternates: {
    canonical: '/programs/private-lessons',
  },
  openGraph: {
    title: 'Private and Semi-Private Music Lessons | Headliner Music Academy',
    description:
      'Private and semi-private music lessons in Rocklin, CA for kids, teens, and adults. In-person and Zoom lesson options, monthly recitals, and no registration fee.',
    url: 'https://www.headlinermusicacademy.com/programs/private-lessons',
  },
};

export default function PrivateLessonsPage() {
  return <PrivateLessonsRoute />;
}