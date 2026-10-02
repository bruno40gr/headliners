import { Asap_Condensed } from 'next/font/google';
import InstrumentLandingPage from '../../src/landing/InstrumentLandingPage';

const asapCondensed = Asap_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-asap-condensed',
});

const heroImage = 'https://res.cloudinary.com/diy08lj9x/image/upload/f_auto,q_auto,w_1400/v1781716216/PXL_20260524_011455107_slssdi.jpg';

export const metadata = {
  title: 'Guitar Lessons in Rocklin, CA',
  description: 'Personalized acoustic and electric guitar lessons at Headliner Music Academy in Rocklin, California.',
  alternates: { canonical: '/guitar' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Guitar Lessons in Rocklin | Headliner Music Academy',
    description: 'Build technique, timing, and confidence while learning songs you love.',
    url: 'https://www.headlinermusicacademy.com/guitar',
    images: [{ url: heroImage }],
  },
};

const guitarPage = {
  instrument: 'guitar',
  instrumentLabel: 'guitar',
  headline: 'Pick up your guitar. Play songs you love.',
  description: 'Personalized acoustic and electric guitar lessons built around solid fundamentals, great songs, and your goals.',
  heroImage,
  heroImageAlt: 'A student singing while playing electric guitar at a Headliner Music Academy performance',
  heroImagePosition: 'center 42%',
  heroNote: 'Find your sound.',
  curriculumHeading: 'Build the skills to play with confidence.',
  requestHeading: 'Ready to start playing?',
  closingHeading: 'Your first guitar lesson starts here.',
  proofItems: [
    { title: 'Private lessons', body: 'Focused one-to-one instruction' },
    { title: 'Acoustic or electric', body: 'Learn on the guitar you enjoy' },
    { title: 'Play real songs', body: 'Music you are excited to learn' },
    { title: 'All levels', body: 'Beginner through advanced' },
  ],
  lessonPillars: [
    { number: '01', title: 'Technique', body: 'Fretting, picking, posture, tone, and smooth chord changes are built one step at a time.' },
    { number: '02', title: 'Rhythm', body: 'Students develop steady timing, stronger groove, and the confidence to play with other musicians.' },
    { number: '03', title: 'Songs', body: 'Lessons pair favorite songs with music that introduces useful new skills.' },
    { number: '04', title: 'Confidence', body: 'Clear goals and patient feedback help every player hear their progress and trust their sound.' },
  ],
};

export default function GuitarPage() {
  return <div className={asapCondensed.variable}><InstrumentLandingPage config={guitarPage} /></div>;
}
