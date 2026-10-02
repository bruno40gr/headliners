'use client';

import { useEffect, useState } from 'react';
import styles from './instrument-landing.module.css';

export default function MobileStickyCta() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.mobileCta} ${isHeroVisible ? styles.mobileCtaHidden : styles.mobileCtaVisible}`} aria-hidden={isHeroVisible}>
      <a href="#claim-first-lesson" tabIndex={isHeroVisible ? -1 : undefined}>Get started</a>
    </div>
  );
}
