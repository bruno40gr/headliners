import ServicesRehearsalSpaceRoute from '../../../src/next/ServicesRehearsalSpaceRoute';

const pageUrl = 'https://www.headlinermusicacademy.com/services/rehearsal-space';
const description =
  'Band rehearsal space and practice room rental in Rocklin, CA for groups, set run-throughs, performance prep, and recurring band rehearsal time when available.';

const rehearsalSpaceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Band Rehearsal Space Rental in Rocklin, CA',
  alternateName: ['Rehearsal Space', 'Band Practice Room', 'Practice Room Rental', 'Rehearsal Studio'],
  description,
  serviceType: 'Band rehearsal space rental',
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
  title: 'Band Rehearsal Space & Practice Room in Rocklin, CA',
  description,
  alternates: {
    canonical: '/services/rehearsal-space',
  },
  openGraph: {
    title: 'Band Rehearsal Space & Practice Room in Rocklin, CA | Headliner Music Academy',
    description,
    url: pageUrl,
  },
};

export default function Page() {
  return (
    <>
      <ServicesRehearsalSpaceRoute />
      <script
        id="headliner-rehearsal-space-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rehearsalSpaceJsonLd) }}
      />
    </>
  );
}