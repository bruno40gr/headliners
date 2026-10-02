import InstrumentLandingPage from '../../src/landing/InstrumentLandingPage';
import { Asap_Condensed } from 'next/font/google';

const asapCondensed = Asap_Condensed({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'], style: ['normal', 'italic'], display: 'swap', variable: '--font-asap-condensed' });
const heroImage = 'https://res.cloudinary.com/diy08lj9x/image/upload/f_auto,q_auto,w_1400/v1781716216/PXL_20260524_013313165.PORTRAIT.ORIGINAL_bpckwf.jpg';

export const metadata = {
  title: 'Voice Lessons in Rocklin, CA',
  description: 'Personalized voice lessons for kids, teens, and adults at Headliner Music Academy in Rocklin, California.',
  alternates: { canonical: '/voice' },
  robots: { index: false, follow: false },
  openGraph: { title: 'Voice Lessons in Rocklin | Headliner Music Academy', description: 'Build healthy technique, expression, and confidence through personalized voice instruction.', url: 'https://www.headlinermusicacademy.com/voice', images: [{ url: heroImage }] },
};

const voicePage = {
  instrument: 'voice',
  instrumentLabel: 'voice',
  headline: 'Voice lessons that help every singer sound like themselves.',
  description: 'Personalized voice instruction for kids, teens, and adults, with healthy technique, expressive songs, and support that builds confidence.',
  heroImage,
  heroImageAlt: 'A young singer performing with a guitarist at a Headliner Music Academy event',
  heroImagePosition: 'center 24%',
  heroNote: 'Your voice, with confidence.',
  curriculumHeading: 'A foundation for healthy, expressive singing.',
  proofItems: [
    { title: 'Private lessons', body: 'Focused one-to-one instruction' },
    { title: 'Healthy technique', body: 'Breath, tone, range, and control' },
    { title: 'Sing real songs', body: 'Music that fits your voice and goals' },
    { title: 'All levels', body: 'Beginner through advanced' },
  ],
  lessonPillars: [
    { number: '01', title: 'Technique', body: 'Breathing, posture, resonance, range, and vocal control are developed without strain.' },
    { number: '02', title: 'Musicianship', body: 'Students strengthen pitch, rhythm, listening, phrasing, and harmony through song.' },
    { number: '03', title: 'Repertoire', body: 'Lessons include songs that suit the student’s voice and music that helps it grow.' },
    { number: '04', title: 'Confidence', body: 'Encouraging feedback helps singers trust their voice in lessons and performance.' },
  ],
};

export default function VoicePage() {
  return <div className={asapCondensed.variable}><InstrumentLandingPage config={voicePage} /></div>;
}
