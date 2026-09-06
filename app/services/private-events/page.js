import ServicesPrivateEventsRoute from '../../../src/next/ServicesPrivateEventsRoute';

const pageUrl = 'https://www.headlinermusicacademy.com/services/private-events';
const description =
  'Private music events in Rocklin, CA for corporate events, team-building, karaoke parties, adult birthdays, family celebrations, DJ music, recording, and group activities.';

const privateEventsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Private Music Events and Corporate Parties in Rocklin, CA',
  alternateName: [
    'Private Events',
    'Corporate Events',
    'Corporate Parties',
    'Team Building Events',
    'Private Karaoke Parties',
    'Adult Birthday Parties',
    'Music Parties',
    'Recording Parties',
    'DJ Parties',
    'Event Venue',
  ],
  description,
  serviceType: 'Private music events, corporate events, team-building events, karaoke parties, DJ parties, and recording parties',
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
  title: 'Private Music Events & Corporate Parties in Rocklin, CA',
  description,
  alternates: {
    canonical: '/services/private-events',
  },
  openGraph: {
    title: 'Private Music Events & Corporate Parties in Rocklin, CA | Headliner Music Academy',
    description,
    url: pageUrl,
  },
};

export default function Page() {
  return (
    <>
      <ServicesPrivateEventsRoute />
      <script
        id="headliner-private-events-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privateEventsJsonLd) }}
      />
    </>
  );
}