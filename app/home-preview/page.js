import { Asap_Condensed, DM_Sans } from 'next/font/google';
import HomePreview from '../../src/next/HomePreview';

const asapCondensed = Asap_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-asap-condensed',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata = {
  title: 'Homepage preview',
  description: 'A tentative homepage for Headliner Music Academy.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/home-preview' },
};

export default function HomePreviewPage() {
  return <div className={`${asapCondensed.variable} ${dmSans.variable}`}><HomePreview /></div>;
}