"use client";

import TeachersPage from '../TeachersPage';
import { useNextNavigate } from './useNextNavigate';

export default function TeachersRoute() {
  const navigate = useNextNavigate();

  return <TeachersPage setPath={navigate} onRequestLessons={() => navigate('/programs/private-lessons')} />;
}