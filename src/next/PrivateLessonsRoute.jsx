"use client";

import PrivateLessonsPage from '../PrivateLessonsPage';
import { useNextNavigate } from './useNextNavigate';

export default function PrivateLessonsRoute() {
  const navigate = useNextNavigate();

  return <PrivateLessonsPage navigate={navigate} onRequestLessons={() => navigate('/programs/private-lessons')} />;
}