import ServicesDjEventsRoute from '../../../src/next/ServicesDjEventsRoute';

export const metadata = {
  title: 'DJ & Event Services in Rocklin, CA',
  description:
    'DJ and event support in Rocklin, CA for private, school, and community events. Reach out about music, announcements, and event flow.',
  alternates: {
    canonical: '/services/dj-and-events',
  },
  openGraph: {
    title: 'DJ & Event Services in Rocklin, CA | Headliner Music Academy',
    description:
      'DJ and event support in Rocklin, CA for private, school, and community events. Reach out about music, announcements, and event flow.',
    url: 'https://www.headlinermusicacademy.com/services/dj-and-events',
  },
};

export default function Page() {
  return <ServicesDjEventsRoute />;
}