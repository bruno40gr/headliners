import CareersRoute from '../../src/next/CareersRoute';

export const metadata = {
  title: 'Careers',
  description:
    'Join the team at Headliner Music Academy in Rocklin, CA. Explore career opportunities in music education.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers | Headliner Music Academy',
    description:
      'Join the team at Headliner Music Academy in Rocklin, CA. Explore career opportunities in music education.',
    url: 'https://headlinermusicacademy.com/careers',
  },
};

export default function CareersPage() {
  return <CareersRoute />;
}