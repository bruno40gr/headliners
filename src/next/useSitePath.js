"use client";

import { usePathname } from 'next/navigation';
import { sitePath } from './sitePaths';

export function useSitePath() {
  const pathname = usePathname();
  return path => sitePath(path, pathname === '/home-preview' || pathname.startsWith('/home-preview/'));
}