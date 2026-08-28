"use client";

import CareersPage from '../CareersPage';
import { useNextNavigate } from './useNextNavigate';

export default function CareersRoute() {
  const navigate = useNextNavigate();

  return <CareersPage setPath={navigate} onRequestLessons={() => navigate('/programs/private-lessons')} />;
}