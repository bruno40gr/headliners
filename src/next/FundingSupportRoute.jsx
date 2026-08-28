"use client";

import FundingSupportPage from '../FundingSupportPage';
import { useNextNavigate } from './useNextNavigate';

export default function FundingSupportRoute() {
  const navigate = useNextNavigate();

  return <FundingSupportPage navigate={navigate} onRequestLessons={() => navigate('/programs/private-lessons')} />;
}