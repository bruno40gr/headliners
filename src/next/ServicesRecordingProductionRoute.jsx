"use client";

import ServicesRecordingProductionPage from '../ServicesRecordingProductionPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesRecordingProductionRoute() {
  const navigate = useNextNavigate();

  return <ServicesRecordingProductionPage navigate={navigate} onRequestLessons={() => navigate('/services/recording-music-production')} />;
}