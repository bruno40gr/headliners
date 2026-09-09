import DesignSystemPage from '../../src/next/DesignSystemPage';

export const metadata = {
  title: 'Design System',
  description: 'Internal visual system reference for Headliner Music Academy.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <DesignSystemPage />;
}