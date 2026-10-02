import { Asap_Condensed } from 'next/font/google';
import InstrumentLandingPage from '../../src/landing/InstrumentLandingPage';

const asapCondensed = Asap_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-asap-condensed',
});

const heroImage = 'https://res.cloudinary.com/diy08lj9x/image/upload/f_auto,q_auto,w_1400/v1781715554/20250628_153338_srnhk2.jpg';

export const metadata = {
  title: 'Bass Lessons in Rocklin, CA',
  description: 'Personalized bass lessons at Headliner Music Academy in Rocklin, California.',
  alternates: { canonical: '/bass' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Bass Lessons in Rocklin | Headliner Music Academy',
    description: 'Build timing, feel, and confidence through personalized bass instruction.',
    url: 'https://www.headlinermusicacademy.com/bass',
    images: [{ url: heroImage }],
  },
};

const bassPage = {
  instrument: 'bass',
  instrumentLabel: 'bass',
  headline: 'Lock in the groove. Make every song feel better.',
  description: 'Personalized bass lessons that build strong timing, clean technique, and the confidence to play with a band.',
  heroImage,
  heroImageAlt: 'A bass player performing with a student band at a Headliner Music Academy event',
  heroImagePosition: '72% center',
  heroNote: 'Hold down the groove.',
  curriculumHeading: 'Build the feel every band needs.',
  requestHeading: 'Ready to find your groove?',
  closingHeading: 'Your first bass lesson starts here.',
  proofItems: [
    { title: 'Private lessons', body: 'Focused one-to-one instruction' },
    { title: 'Timing and feel', body: 'Build a groove that supports the song' },
    { title: 'Play real songs', body: 'Learn bass lines you want to play' },
    { title: 'All levels', body: 'Beginner through advanced' },
  ],
  lessonPillars: [
    { number: '01', title: 'Technique', body: 'Fretting, plucking, muting, posture, and tone are developed with clear, practical guidance.' },
    { number: '02', title: 'Time and groove', body: 'Students learn to sit with the drums, hold steady time, and give each song the right feel.' },
    { number: '03', title: 'Bass lines', body: 'Lessons use favorite songs to explore patterns, movement, and the role of bass in a band.' },
    { number: '04', title: 'Confidence', body: 'Patient feedback helps students play with more control, listen closely, and trust their choices.' },
  ],
};

export default function BassPage() {
  return <div className={asapCondensed.variable}><InstrumentLandingPage config={bassPage} /></div>;
}
