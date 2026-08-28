import TinyKeysRoute from '../../src/next/TinyKeysRoute';

export const metadata = {
  title: 'Tiny Keys — Piano for Ages 5–7',
  description:
    'Group piano classes for kids ages 5 to 7 in Rocklin, CA. A structured, three-level curriculum that builds real skills through songs, games, and time at the keys.',
  alternates: {
    canonical: '/tiny-keys',
  },
  openGraph: {
    title: 'Tiny Keys — Piano for Ages 5–7 | Headliner Music Academy',
    description:
      'Group piano classes for kids ages 5 to 7 in Rocklin, CA. A structured, three-level curriculum that builds real skills through songs, games, and time at the keys.',
    url: 'https://headlinermusicacademy.com/tiny-keys',
  },
};

export default function TinyKeysPage() {
  return <TinyKeysRoute />;
}