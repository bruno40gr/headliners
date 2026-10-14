import { Baloo_2, DM_Sans } from 'next/font/google';
import ProgramPreview from './ProgramPreview';
import { expressiveTypography } from '../tokens';

const playful = Baloo_2({ subsets: ['latin'], weight: ['600', '700', '800'], display: 'swap', variable: '--font-baloo' });
const body = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' });

export default function ProgramPreviewFrame({ program }) {
  return <div className={`${playful.variable} ${body.variable}`} style={{ '--baloo-tracking': expressiveTypography.letterSpacing, '--baloo-kerning': expressiveTypography.fontKerning, '--baloo-hero-leading': expressiveTypography.heroLineHeight }}><ProgramPreview program={program} /></div>;
}