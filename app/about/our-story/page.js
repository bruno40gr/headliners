import OurStoryRoute from '../../../src/next/OurStoryRoute';

export const metadata = {
  title: 'Our Story',
  description:
    'Learn about Headliner Music Academy in Rocklin, CA — our history, vision, and the team continuing the legacy forward.',
  alternates: {
    canonical: '/about/our-story',
  },
  openGraph: {
    title: 'Our Story | Headliner Music Academy',
    description:
      'Learn about Headliner Music Academy in Rocklin, CA — our history, vision, and the team continuing the legacy forward.',
    url: 'https://headlinermusicacademy.com/about/our-story',
  },
};

export default function OurStoryPage() {
  return <OurStoryRoute />;
}