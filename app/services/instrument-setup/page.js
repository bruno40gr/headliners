import ServicesInstrumentSetupRoute from '../../../src/next/ServicesInstrumentSetupRoute';

export const metadata = {
  title: 'Instrument Setup in Rocklin, CA',
  description:
    'Instrument setup support in Rocklin, CA for instrument electronics, pedalboards, synth rigs, and home studio gear.',
  alternates: {
    canonical: '/services/instrument-setup',
  },
  openGraph: {
    title: 'Instrument Setup in Rocklin, CA | Headliner Music Academy',
    description:
      'Instrument setup support in Rocklin, CA for instrument electronics, pedalboards, synth rigs, and home studio gear.',
    url: 'https://headlinermusicacademy.com/services/instrument-setup',
  },
};

export default function Page() {
  return <ServicesInstrumentSetupRoute />;
}