import InstrumentLandingPage from '../../src/landing/InstrumentLandingPage';
import { Asap_Condensed } from 'next/font/google';

const asapCondensed = Asap_Condensed({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'], style: ['normal', 'italic'], display: 'swap', variable: '--font-asap-condensed' });
const heroImage = 'https://res.cloudinary.com/diy08lj9x/image/upload/f_auto,q_auto,w_1400/v1781715525/PXL_20260616_002552898.PORTRAIT_anjebq.jpg';

export const metadata = {
  title: 'Drum Lessons in Rocklin, CA',
  description: 'Personalized drum lessons for kids, teens, and adults at Headliner Music Academy in Rocklin, California.',
  alternates: { canonical: '/drums' },
  robots: { index: false, follow: false },
  openGraph: { title: 'Drum Lessons in Rocklin | Headliner Music Academy', description: 'Build timing, coordination, and confidence through personalized drum instruction.', url: 'https://www.headlinermusicacademy.com/drums', images: [{ url: heroImage }] },
};

const drumsPage = {
  instrument: 'drums',
  instrumentLabel: 'drum',
  headline: 'Drum lessons that build rhythm, control, and confidence.',
  description: 'Personalized drum instruction for kids, teens, and adults, with practical technique, real songs, and a clear path forward.',
  heroImage,
  heroImageAlt: 'Two students practicing drum kits together at Headliner Music Academy',
  heroImagePosition: 'center 37%',
  heroNote: 'Find your groove.',
  curriculumHeading: 'A foundation for steady, expressive playing.',
  proofItems: [
    { title: 'Private lessons', body: 'Focused one-to-one instruction' },
    { title: 'Technique & timing', body: 'Control that supports every song' },
    { title: 'Play real songs', body: 'Learn through music you enjoy' },
    { title: 'All levels', body: 'Beginner through advanced' },
  ],
  lessonPillars: [
    { number: '01', title: 'Technique', body: 'Grip, posture, rebound, sticking, and coordination are taught clearly and patiently.' },
    { number: '02', title: 'Time & groove', body: 'Students learn to hold steady time, listen closely, and make a song feel good.' },
    { number: '03', title: 'Repertoire', body: 'Lessons apply new skills to beats, fills, and complete songs the student enjoys.' },
    { number: '04', title: 'Confidence', body: 'Measurable goals help students recognize progress and play with greater control.' },
  ],
};

export default function DrumsPage() {
  return <div className={asapCondensed.variable}><InstrumentLandingPage config={drumsPage} /></div>;
}
