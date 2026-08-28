import ServicesRehearsalSpaceRoute from '../../../src/next/ServicesRehearsalSpaceRoute';

export const metadata = {
  title: 'Rehearsal Space in Rocklin, CA',
  description:
    'Rehearsal space in Rocklin, CA for bands, groups, and performance prep. Ask about room availability and scheduling.',
  alternates: {
    canonical: '/services/rehearsal-space',
  },
  openGraph: {
    title: 'Rehearsal Space in Rocklin, CA | Headliner Music Academy',
    description:
      'Rehearsal space in Rocklin, CA for bands, groups, and performance prep. Ask about room availability and scheduling.',
    url: 'https://headlinermusicacademy.com/services/rehearsal-space',
  },
};

export default function Page() {
  return <ServicesRehearsalSpaceRoute />;
}