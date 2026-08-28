"use client";

import ServicesPaRentalPage from '../ServicesPaRentalPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesPaRentalRoute() {
  const navigate = useNextNavigate();

  return <ServicesPaRentalPage navigate={navigate} onRequestLessons={() => navigate('/services/pa-system-rental')} />;
}