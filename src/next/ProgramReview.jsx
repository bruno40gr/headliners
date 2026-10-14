import styles from './program-components.module.css';

export default function ProgramReview({ testimonial }) {
  if (!testimonial?.quote || !testimonial?.name) return null;
  return (
    <section className={styles.review} aria-label="Parent review">
      <figure>
        <div className={styles.stars} role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>{testimonial.quote}</blockquote>
        <figcaption>
          <strong>{testimonial.name}</strong>
          {testimonial.source && <span>· {testimonial.source}</span>}
        </figcaption>
      </figure>
    </section>
  );
}