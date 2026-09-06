import ServicesInstrumentSetupRoute from '../../../src/next/ServicesInstrumentSetupRoute';

const pageUrl = 'https://www.headlinermusicacademy.com/services/instrument-setup';
const description =
  'Instrument and gear services in Rocklin, CA for guitar and bass setup, light electronics, shielding, pedalboard routing, MIDI routing, signal flow, and drum kit hardware.';

const instrumentSetupJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Instrument and Gear Services in Rocklin, CA',
  alternateName: [
    'Guitar Setup',
    'Bass Setup',
    'Truss Rod Adjustment',
    'Action and Intonation',
    'Light Electronics',
    'Shielding',
    'Pedalboard Setup',
    'MIDI Routing',
    'Signal Flow Troubleshooting',
    'Drum Hardware Setup',
  ],
  description,
  serviceType: 'Instrument setup, guitar setup, bass setup, light electronics, pedalboard setup, MIDI routing, signal flow troubleshooting, drum hardware adjustment',
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
  title: 'Instrument and Gear Services in Rocklin, CA',
  description,
  alternates: {
    canonical: '/services/instrument-setup',
  },
  openGraph: {
    title: 'Instrument and Gear Services in Rocklin, CA | Headliner Music Academy',
    description,
    url: pageUrl,
  },
};

export default function Page() {
  return (
    <>
      <ServicesInstrumentSetupRoute />
      <script
        id="headliner-instrument-setup-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(instrumentSetupJsonLd) }}
      />
    </>
  );
}