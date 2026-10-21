import ExpressivePreviewFrame from '../../../src/next/ExpressivePreviewFrame';
import BandPreviewRoute from '../../../src/next/BandPreviewRoute';

export const metadata = {
  title: 'Band Program · Design preview',
  description: 'A preview of the Headliner Band Program page.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/programs/band' },
};

export default function BandPreviewPage() {
  return <ExpressivePreviewFrame><BandPreviewRoute /></ExpressivePreviewFrame>;
}