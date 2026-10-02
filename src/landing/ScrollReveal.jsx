'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './instrument-landing.module.css';

export default function ScrollReveal({ as: Tag = 'section', className = '', children, ...props }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    if (!('IntersectionObserver' in window)) {
      element.classList.add(styles.scrollRevealVisible);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.06, rootMargin: '0px 0px -3% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={elementRef}
      className={`${className} ${styles.scrollReveal} ${isVisible ? styles.scrollRevealVisible : ''}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
