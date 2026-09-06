import ServicesBirthdayPartiesRoute from '../../../src/next/ServicesBirthdayPartiesRoute';

const pageUrl = 'https://www.headlinermusicacademy.com/services/birthday-parties';
const description =
  'Music birthday parties for kids in Rocklin, CA with karaoke, instruments, games, DJ music, recording, and age-appropriate party activities.';

const birthdayPartiesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Music Birthday Parties for Kids in Rocklin, CA',
  alternateName: [
    'Kids Birthday Parties',
    'Music Birthday Parties',
    'Karaoke Birthday Party',
    'Rock Band Birthday Party',
    'DJ Birthday Party',
    'Recording Birthday Party',
    'Birthday Party Venue',
  ],
  description,
  serviceType: 'Kids birthday parties, music birthday parties, karaoke parties, rock band parties, DJ parties, recording parties',
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
  title: 'Music Birthday Parties for Kids in Rocklin, CA',
  description,
  alternates: {
    canonical: '/services/birthday-parties',
  },
  openGraph: {
    title: 'Music Birthday Parties for Kids in Rocklin, CA | Headliner Music Academy',
    description,
    url: pageUrl,
  },
};

export default function Page() {
  return (
    <>
      <ServicesBirthdayPartiesRoute />
      <script
        id="headliner-birthday-parties-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(birthdayPartiesJsonLd) }}
      />
    </>
  );
}