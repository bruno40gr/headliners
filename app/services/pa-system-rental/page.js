import ServicesPaRentalRoute from '../../../src/next/ServicesPaRentalRoute';

export const metadata = {
  title: 'PA System Rental in Rocklin, CA',
  description:
    'PA system rental in Rocklin, CA for parties, showcases, school functions, and community events. Ask about event sound support and availability.',
  alternates: {
    canonical: '/services/pa-system-rental',
  },
  openGraph: {
    title: 'PA System Rental in Rocklin, CA | Headliner Music Academy',
    description:
      'PA system rental in Rocklin, CA for parties, showcases, school functions, and community events. Ask about event sound support and availability.',
    url: 'https://headlinermusicacademy.com/services/pa-system-rental',
  },
};

export default function Page() {
  return <ServicesPaRentalRoute />;
}