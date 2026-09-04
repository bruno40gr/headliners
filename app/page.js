import HomePage from '../src/next/HomePage';

export const metadata = {
  title: 'Headliner Music Academy | Rocklin, CA',
  description:
    'Private, semi-private, and group music lessons in Rocklin, CA. Inspiring the next generation of musicians through premium, personalized education.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Headliner Music Academy | Rocklin, CA',
    description:
      'Private, semi-private, and group music lessons in Rocklin, CA. Inspiring the next generation of musicians through premium, personalized education.',
    url: 'https://www.headlinermusicacademy.com',
  },
};

export default function Page() {
  return <HomePage />;
}