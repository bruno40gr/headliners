export default function sitemap() {
  const baseUrl = 'https://headlinermusicacademy.com';
  const now = new Date();

  return [
    '/',
    '/privacy-policy',
    '/terms-and-conditions',
    '/sms-consent',
    '/teachers',
    '/careers',
    '/about/funding-support',
    '/tiny-keys',
    '/wonder-notes',
    '/programs/private-lessons',
    '/programs/band',
    '/services/recording-music-production',
    '/services/pa-system-rental',
    '/services/dj-and-events',
    '/services/instrument-setup',
    '/services/rehearsal-space',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}