import ServicesPaRentalRoute from '../../../src/next/ServicesPaRentalRoute';

const pageUrl = 'https://www.headlinermusicacademy.com/services/pa-system-rental';
const description =
  'PA system rental, speaker rental, microphone rental, mixer support, setup, teardown, and live sound support in Rocklin, CA for parties and events.';

const paRentalJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'PA System Rental and Live Sound Support in Rocklin, CA',
  alternateName: ['PA Rental', 'Sound System Rental', 'Speaker Rental', 'Microphone Rental', 'Event Audio Production', 'Live Sound'],
  description,
  serviceType: 'PA system rental and live sound support',
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
  title: 'PA System, Speaker Rental & Live Sound in Rocklin, CA',
  description,
  alternates: {
    canonical: '/services/pa-system-rental',
  },
  openGraph: {
    title: 'PA System, Speaker Rental & Live Sound in Rocklin, CA | Headliner Music Academy',
    description,
    url: pageUrl,
  },
};

export default function Page() {
  return (
    <>
      <ServicesPaRentalRoute />
      <script
        id="headliner-pa-rental-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paRentalJsonLd) }}
      />
    </>
  );
}