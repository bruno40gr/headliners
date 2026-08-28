"use client";

import WonderNotesPage from '../WonderNotes';
import { useNextNavigate } from './useNextNavigate';

export default function WonderNotesRoute() {
  const navigate = useNextNavigate();

  return <WonderNotesPage navigate={navigate} setPath={navigate} />;
}