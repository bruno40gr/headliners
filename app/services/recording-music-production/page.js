import ServicesRecordingProductionRoute from '../../../src/next/ServicesRecordingProductionRoute';

const pageUrl = 'https://www.headlinermusicacademy.com/services/recording-music-production';
const description =
  'Professional recording studio, music production, mixing, and mastering in Rocklin, CA for artists, vocalists, songwriters, students, and bands.';

const recordingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Recording Studio and Music Production in Rocklin, CA',
  alternateName: ['Recording Studio', 'Vocal Recording', 'Vocal Production', 'Demo Recording', 'Music Production', 'Mixing', 'Mastering', 'Full-Band Recording', 'Room-Only Studio Booking'],
  description,
  serviceType: 'Recording studio, music production, mixing, and mastering',
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
  title: 'Recording Studio, Production, Mixing & Mastering in Rocklin, CA',
  description,
  alternates: {
    canonical: '/services/recording-music-production',
  },
  openGraph: {
    title: 'Recording Studio, Production, Mixing & Mastering in Rocklin, CA | Headliner Music Academy',
    description,
    url: pageUrl,
  },
};

export default function Page() {
  return (
    <>
      <ServicesRecordingProductionRoute />
      <script
        id="headliner-recording-production-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recordingJsonLd) }}
      />
    </>
  );
}