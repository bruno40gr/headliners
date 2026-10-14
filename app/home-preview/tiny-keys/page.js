import ProgramPreviewFrame from '../../../src/next/ProgramPreviewFrame';

export const metadata = {
  title: 'Tiny Keys · Design preview',
  description: 'A preview of the Tiny Keys program page.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/tiny-keys' },
};

export default function TinyKeysPreviewPage() {
  return <ProgramPreviewFrame program="tiny-keys" />;
}