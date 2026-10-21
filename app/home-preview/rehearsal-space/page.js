import ExpressivePreviewFrame from '../../../src/next/ExpressivePreviewFrame';
import RehearsalSpacePreview from '../../../src/next/RehearsalSpacePreview';

export const metadata = {
  title: 'Band Rehearsal Space · Design preview',
  description: 'Preview of Headliner rehearsal spaces in Rocklin, with rates starting at $50/hr.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/services/rehearsal-space' },
};

export default function RehearsalPreviewPage() {
  return <ExpressivePreviewFrame><RehearsalSpacePreview /></ExpressivePreviewFrame>;
}