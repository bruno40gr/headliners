import ServicesDjEventsRoute from '../../../src/next/ServicesDjEventsRoute';

const pageUrl = 'https://www.headlinermusicacademy.com/services/dj-and-events';
const description =
  'DJ services in Rocklin, CA for private parties, school events, community events, music, announcements, microphones, and event sound.';

const djEventsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'DJ Services for Parties, Schools, and Events in Rocklin, CA',
  alternateName: [
    'DJ Services',
    'Event DJ',
    'School Event DJ',
    'Private Party DJ',
    'Event Sound Support',
    'Announcements and Microphones',
  ],
  description,
  serviceType: 'DJ services, event music, announcements, microphones, and event sound support',
  url: pageUrl,
  provider: {
    '@type': ['MusicSchool', 'LocalBusiness'],
    name: 'Headliner Music Academy',
    url: 'https://www.headlinermusicacademy.com',
    telephone: '(916) 435-1300',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2311 Sunset Blvd',
      addressLocality: 'Rocklin',
      addressRegion: 'CA',
      postalCode: '95765',
      addressCountry: 'US',
    },
  },
  areaServed: ['Rocklin, CA', 'Roseville, CA', 'Lincoln, CA', 'Loomis, CA', 'Granite Bay, CA', 'Placer County, CA'],
};

export const metadata = {
  title: 'DJ Services for Parties, Schools & Events in Rocklin, CA',
  description,
  alternates: {
    canonical: '/services/dj-and-events',
  },
  openGraph: {
    title: 'DJ Services for Parties, Schools & Events in Rocklin, CA | Headliner Music Academy',
    description,
    url: pageUrl,
  },
};

export default function Page() {
  return (
    <>
      <ServicesDjEventsRoute />
      <script
        id="headliner-dj-events-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(djEventsJsonLd) }}
      />
    </>
  );
}