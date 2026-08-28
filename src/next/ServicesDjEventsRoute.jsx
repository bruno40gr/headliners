"use client";

import ServicesDjEventsPage from '../ServicesDjEventsPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesDjEventsRoute() {
  const navigate = useNextNavigate();

  return <ServicesDjEventsPage navigate={navigate} onRequestLessons={() => navigate('/services/dj-and-events')} />;
}