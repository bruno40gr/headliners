"use client";

import ServicesRehearsalSpacePage from '../ServicesRehearsalSpacePage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesRehearsalSpaceRoute() {
  const navigate = useNextNavigate();

  return <ServicesRehearsalSpacePage navigate={navigate} onRequestLessons={() => navigate('/services/rehearsal-space')} />;
}