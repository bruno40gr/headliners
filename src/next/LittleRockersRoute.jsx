"use client";

import LittleRockersPage from '../LittleRockers';
import { useNextNavigate } from './useNextNavigate';

export default function LittleRockersRoute() {
  const navigate = useNextNavigate();

  return <LittleRockersPage navigate={navigate} setPath={navigate} />;
}