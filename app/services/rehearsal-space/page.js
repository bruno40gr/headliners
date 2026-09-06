import ServicesRehearsalSpaceRoute from '../../../src/next/ServicesRehearsalSpaceRoute';

const pageUrl = 'https://www.headlinermusicacademy.com/services/rehearsal-space';
const description =
  'Band rehearsal space in Rocklin, CA for $50/hr with drum kit, guitar amps, bass amp, PA system, wedges, and performance lights included.';

const rehearsalSpaceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Band Rehearsal Space Rental in Rocklin, CA',
  alternateName: ['Rehearsal Space', 'Band Practice Room', 'Practice Room Rental', 'Rehearsal Studio'],
  description,
  serviceType: 'Band rehearsal space rental',
  url: pageUrl,
  offers: {
    '@type': 'Offer',
    price: '50',
    priceCurrency: 'USD',
    unitText: 'HOUR',
    availability: 'https://schema.org/InStock',
  },
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
  title: 'Band Rehearsal Space in Rocklin, CA | $50/hr',
  description,
  alternates: {
    canonical: '/services/rehearsal-space',
  },
  openGraph: {
    title: 'Band Rehearsal Space in Rocklin, CA | $50/hr | Headliner Music Academy',
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