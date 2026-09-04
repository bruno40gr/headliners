import './globals.css';

const siteUrl = 'https://www.headlinermusicacademy.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Headliner Music Academy | Rocklin, CA',
    template: '%s | Headliner Music Academy',
  },
  description:
    'Private, semi-private, and group music lessons in Rocklin, CA. Inspiring the next generation of musicians through premium, personalized education.',
  icons: {
    icon: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1788457911/favicon_ajrnub.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Headliner Music Academy',
    title: 'Headliner Music Academy | Rocklin, CA',
    description:
      'Private, semi-private, and group music lessons in Rocklin, CA. Inspiring the next generation of musicians through premium, personalized education.',
    images: [
      {
        url: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Headliner Music Academy | Rocklin, CA',
    description:
      'Private, semi-private, and group music lessons in Rocklin, CA. Inspiring the next generation of musicians through premium, personalized education.',
    images: ['https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MusicSchool', 'LocalBusiness'],
  name: 'Headliner Music Academy',
  description:
    'Headliner Music Academy is a Rocklin, CA music hub offering music lessons, band programs, rehearsal space, recording and music production, PA system rentals, and event sound support.',
  url: siteUrl,
  image: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png',
  telephone: '(916) 435-1300',
  email: 'admin@headlinermusicacademy.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2311 Sunset Blvd',
    addressLocality: 'Rocklin',
    addressRegion: 'CA',
    postalCode: '95765',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.7907,
    longitude: -121.2356,
  },
  sameAs: ['https://m.yelp.com/biz/headliner-music-academy-rocklin'],
  areaServed: [
    'Rocklin, CA',
    'Roseville, CA',
    'Lincoln, CA',
    'Loomis, CA',
    'Granite Bay, CA',
    'Placer County, CA',
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Music Lessons' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Band Rehearsal Space Rental' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Recording Studio and Music Production' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PA System Rental' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Live Sound and Event Audio Support' } },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '12:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '20:00',
    },
  ],
  priceRange: '$$',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          id="headliner-org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}