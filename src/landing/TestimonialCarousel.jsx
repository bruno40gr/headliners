'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './instrument-landing.module.css';

const AUTO_ADVANCE_MS = 6000;

export default function TestimonialCarousel({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, reduceMotion, testimonials.length]);

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
  };

  const testimonial = testimonials[activeIndex];

  return (
    <div
      className={styles.testimonialCarousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <button className={styles.testimonialCaret} type="button" onClick={showPrevious} aria-label="Show previous testimonial">
        <ChevronLeft aria-hidden="true" />
      </button>

      <figure className={styles.testimonial} key={testimonial.name}>
        <div className={styles.stars} aria-label="Five out of five stars">
          {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={18} fill="currentColor" aria-hidden="true" />)}
        </div>
        <blockquote>“{testimonial.quote}”</blockquote>
        <figcaption><strong>{testimonial.name}</strong><span aria-hidden="true"> · </span>{testimonial.source}</figcaption>
      </figure>

      <button className={styles.testimonialCaret} type="button" onClick={showNext} aria-label="Show next testimonial">
        <ChevronRight aria-hidden="true" />
      </button>

      <p className={styles.testimonialPosition} aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}>
        {activeIndex + 1} / {testimonials.length}
      </p>
    </div>
  );
}