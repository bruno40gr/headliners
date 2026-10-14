import ProgramPreviewFrame from '../../../src/next/ProgramPreviewFrame';

export const metadata = {
  title: 'Little Rockers · Design preview',
  description: 'A preview of the Little Rockers program page.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/little-rockers' },
};

export default function LittleRockersPreviewPage() {
  return <ProgramPreviewFrame program="little-rockers" />;
}