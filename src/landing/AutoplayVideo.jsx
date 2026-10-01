'use client';

import { useEffect, useRef } from 'react';

export default function AutoplayVideo({ poster, src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const startPlayback = () => {
      if (document.visibilityState === 'visible') {
        video.play().catch(() => {
          // Browsers may still block autoplay based on a user's local settings.
        });
      }
    };

    startPlayback();
    video.addEventListener('canplay', startPlayback);
    document.addEventListener('visibilitychange', startPlayback);

    return () => {
      video.removeEventListener('canplay', startPlayback);
      document.removeEventListener('visibilitychange', startPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      controls
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-label="Inside Headliner Music Academy"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}