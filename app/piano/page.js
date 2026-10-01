import InstrumentLandingPage from '../../src/landing/InstrumentLandingPage';
import { Asap_Condensed } from 'next/font/google';

const asapCondensed = Asap_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-asap-condensed',
});

const heroImage = 'https://res.cloudinary.com/diy08lj9x/image/upload/f_auto,q_auto,w_1400/v1781715525/PXL_20260615_232703074.PORTRAIT_mqdiam.jpg';

export const metadata = {
  title: 'Piano Lessons in Rocklin, CA',
  description:
    'Personalized piano lessons for kids, teens, and adults at Headliner Music Academy in Rocklin, California.',
  alternates: {
    canonical: '/piano',
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Piano Lessons in Rocklin | Headliner Music Academy',
    description:
      'Patient, personalized piano instruction for beginners and experienced players in Rocklin, California.',
    url: 'https://www.headlinermusicacademy.com/piano',
    images: [{ url: heroImage }],
  },
};

const pianoPage = {
  instrument: 'piano',
  headline: 'Piano lessons that build confident musicians.',
  description:
    'Personalized piano instruction for kids, teens, and adults, guided by our proprietary curriculum and designed around each student.',
  heroImage,
  heroImageAlt: 'A young piano student learning with a teacher at Headliner Music Academy',
};

export default function PianoPage() {
  return (
    <div className={asapCondensed.variable}>
      <InstrumentLandingPage config={pianoPage} />
    </div>
  );
}