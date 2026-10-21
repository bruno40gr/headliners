"use client";

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './home-preview.module.css';

// Existing homepage reviews, unchanged. Lead with the parent camp review.
const reviews = [
  { name: 'Brenda Velasquez', source: 'Google', quote: 'My 11-year-old daughter attended their summer camp and had an unforgettable experience. She sharpened her singing skills, learned piano and drums, and loved performing several songs as the lead singer of a band. The instructors are incredibly supportive and create such an inspiring environment for young musicians.' },
  { name: 'Gav 04', source: 'Google', quote: 'Incredible place, great teachers, awesome owners. If you or anyone you know wants to learn anything musical, definitely give them a call.' },
  { name: 'Alberto Cantor', source: 'Google', quote: 'This is an exceptionally great music school. I wanted to become a better guitar player and came to Headliner; the instructors are very talented, patient, and excellent at teaching.' },
  { name: 'Robert Aguilar', source: 'Yelp', quote: 'The best music teaching studios around. Great teachers, nice facility, awesome staff, and incredible new owners. If you want to learn an instrument, vocals, or anything to do with music, make sure you check them out. They are top-notch.' },
  { name: 'Socorro Baez G.', source: 'Yelp', quote: 'Love this place! It’s unique, amicable, and well organized. Amazing, diverse, and inclusive for kids, young people, and adults.' },
];

export default function PreviewReviews() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  return <section className={`${styles.section} ${styles.reviews}`} aria-labelledby="reviews-title">
    <h2 id="reviews-title" className={styles.homeSectionTitle}>What families say</h2>
    <div id="family-review-stage" className={styles.reviewStage}>
      {reviews.map((item, itemIndex) => <figure key={item.name} className={styles.reviewQuote} style={{ visibility: itemIndex === index ? 'visible' : 'hidden' }} aria-hidden={itemIndex !== index}>
        <blockquote>{`“${item.quote}”`}</blockquote>
        <figcaption><strong>{item.name}</strong><span>Review on {item.source}</span></figcaption>
      </figure>)}
    </div>
    <div className={styles.reviewControls}>
      <button type="button" aria-label="Show previous review" aria-controls="family-review-stage" onClick={() => setIndex(current => (current - 1 + reviews.length) % reviews.length)}><ArrowLeft size={18} aria-hidden="true" /></button>
      <span aria-live="polite" aria-atomic="true" className={styles.reviewStatus}>{index + 1} / {reviews.length}<span className={styles.srOnly}>{`: ${review.name}. ${review.quote}`}</span></span>
      <button type="button" aria-label="Show next review" aria-controls="family-review-stage" onClick={() => setIndex(current => (current + 1) % reviews.length)}><ArrowRight size={18} aria-hidden="true" /></button>
    </div>
  </section>;
}