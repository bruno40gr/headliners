import TeachersRoute from '../../src/next/TeachersRoute';

export const metadata = {
  title: 'Our Teachers',
  description:
    'Meet Headliner Music Academy’s trained music teachers in Rocklin, CA. Our faculty includes active musicians and multi-instrumental instructors for kids, teens, and adults.',
  alternates: {
    canonical: '/teachers',
  },
  openGraph: {
    title: 'Our Teachers | Headliner Music Academy',
    description:
      'Meet Headliner Music Academy’s trained music teachers in Rocklin, CA. Our faculty includes active musicians and multi-instrumental instructors for kids, teens, and adults.',
    url: 'https://www.headlinermusicacademy.com/teachers',
  },
};

export default function TeachersPage() {
  return <TeachersRoute />;
}