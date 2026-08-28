"use client";

import TinyKeysPage from '../TinyKeys';
import { useNextNavigate } from './useNextNavigate';

export default function TinyKeysRoute() {
  const navigate = useNextNavigate();

  return <TinyKeysPage navigate={navigate} setPath={navigate} />;
}