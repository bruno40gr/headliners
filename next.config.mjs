/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/privacy-policy.html',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-and-conditions.html',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/sms-consent.html',
        destination: '/sms-consent',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
};

export default nextConfig;