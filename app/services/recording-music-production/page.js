import ServicesRecordingProductionRoute from '../../../src/next/ServicesRecordingProductionRoute';

export const metadata = {
  title: 'Recording & Music Production in Rocklin, CA',
  description:
    'Recording and music production support in Rocklin, CA. Reach out about demos, vocal sessions, song development, and production help.',
  alternates: {
    canonical: '/services/recording-music-production',
  },
  openGraph: {
    title: 'Recording & Music Production in Rocklin, CA | Headliner Music Academy',
    description:
      'Recording and music production support in Rocklin, CA. Reach out about demos, vocal sessions, song development, and production help.',
    url: 'https://headlinermusicacademy.com/services/recording-music-production',
  },
};

export default function Page() {
  return <ServicesRecordingProductionRoute />;
}