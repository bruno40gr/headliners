import ExpressivePreviewFrame from '../../../src/next/ExpressivePreviewFrame';
import RecordingProductionPreview from '../../../src/next/RecordingProductionPreview';

export const metadata = {
  title: 'Recording & Music Production · Design preview',
  description: 'A preview of Headliner recording and music production services.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/services/recording-music-production' },
};

export default function RecordingPreviewPage() {
  return <ExpressivePreviewFrame><RecordingProductionPreview /></ExpressivePreviewFrame>;
}