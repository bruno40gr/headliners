"use client";

import BandProgramPage from '../BandProgramPage';
import { useNextNavigate } from './useNextNavigate';

export default function BandProgramRoute() {
  const navigate = useNextNavigate();

  return <BandProgramPage setPath={navigate} onRequestLessons={() => navigate('/programs/band')} />;
}