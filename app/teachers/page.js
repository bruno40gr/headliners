import TeachersRoute from '../../src/next/TeachersRoute';

export const metadata = {
  title: 'Our Teachers',
  description:
    'Meet the passionate instructors at Headliner Music Academy in Rocklin, CA.',
  alternates: {
    canonical: '/teachers',
  },
  openGraph: {
    title: 'Our Teachers | Headliner Music Academy',
    description:
      'Meet the passionate instructors at Headliner Music Academy in Rocklin, CA.',
    url: 'https://headlinermusicacademy.com/teachers',
  },
};

export default function TeachersPage() {
  return <TeachersRoute />;
}