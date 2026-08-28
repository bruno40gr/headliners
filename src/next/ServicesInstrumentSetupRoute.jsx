"use client";

import ServicesInstrumentSetupPage from '../ServicesInstrumentSetupPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesInstrumentSetupRoute() {
  const navigate = useNextNavigate();

  return <ServicesInstrumentSetupPage navigate={navigate} onRequestLessons={() => navigate('/services/instrument-setup')} />;
}