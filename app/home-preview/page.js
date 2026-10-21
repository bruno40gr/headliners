import ExpressivePreviewFrame from '../../src/next/ExpressivePreviewFrame';
import HomePreview from '../../src/next/HomePreview';

export const metadata = {
  title: 'Homepage preview',
  description: 'A tentative homepage for Headliner Music Academy.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
};

export default function HomePreviewPage() {
  return <ExpressivePreviewFrame><HomePreview /></ExpressivePreviewFrame>;
}