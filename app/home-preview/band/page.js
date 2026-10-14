import { Asap, DM_Sans } from 'next/font/google';
import BandPreviewRoute from '../../../src/next/BandPreviewRoute';

const display = Asap({ subsets: ['latin'], weight: ['700', '800'], display: 'swap', variable: '--font-asap' });
const body = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' });

export const metadata = {
  title: 'Band Program · Design preview',
  description: 'A preview of the Headliner Band Program page.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/programs/band' },
};

export default function BandPreviewPage() {
  return <div className={`${display.variable} ${body.variable}`}><BandPreviewRoute /></div>;
}