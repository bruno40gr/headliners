"use client";

import { useRouter } from 'next/navigation';

export function useNextNavigate() {
  const router = useRouter();

  return (path) => {
    router.push(path);
  };
}