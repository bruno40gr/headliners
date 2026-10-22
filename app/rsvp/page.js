import RsvpPage from '../../src/next/RsvpPage';
import { Lilita_One, DM_Sans } from 'next/font/google';

const heading = Lilita_One({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-rsvp-display' });
const body = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap', variable: '--font-rsvp-body' });

export const metadata = {
  title: 'Grand Opening RSVP',
  description: 'A friends & family grand opening celebration with the Rocklin Area Chamber of Commerce. November 6, 3–8 PM. RSVP by November 2.',
  alternates: { canonical: '/rsvp' },
  openGraph: {
    title: 'Grand Opening | Headliner Music Academy',
    description: 'November 6: 3 PM ribbon cutting, 4 PM cocktails & finger food, 5–8 PM live music with Sunkast, Traktion, Samme, and Faith. Friends & family. RSVP by November 2.',
    url: '/rsvp',
  },
};

export default function Page() {
  return <div className={`${heading.variable} ${body.variable}`}><RsvpPage /></div>;
}