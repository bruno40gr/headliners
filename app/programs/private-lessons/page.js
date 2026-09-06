import PrivateLessonsRoute from '../../../src/next/PrivateLessonsRoute';

export const metadata = {
  title: 'Private and Semi-Private Music Lessons',
  description:
    'Private and semi-private music lessons in Rocklin, CA for kids, teens, and adults. Piano, guitar, voice, drums, bass, ukulele, violin, cello, brass, woodwinds, music production, songwriting, Levels 1-3, Zoom lessons, and monthly recitals.',
  alternates: {
    canonical: '/programs/private-lessons',
  },
  openGraph: {
    title: 'Private and Semi-Private Music Lessons | Headliner Music Academy',
    description:
      'Private and semi-private music lessons in Rocklin, CA for kids, teens, and adults. Piano, guitar, voice, drums, bass, ukulele, violin, cello, brass, woodwinds, music production, songwriting, Levels 1-3, Zoom lessons, and monthly recitals.',
    url: 'https://www.headlinermusicacademy.com/programs/private-lessons',
  },
};

export default function PrivateLessonsPage() {
  return <PrivateLessonsRoute />;
}