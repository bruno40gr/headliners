import styles from './program-components.module.css';

export default function ProgramLearningCard({ orientation = 'vertical', photoBg, photo, alt, title, body, children }) {
  return (
    <article className={`${styles.learningCard} ${orientation === 'horizontal' ? styles.horizontal : styles.vertical}`} data-orientation={orientation} style={{ '--panel-pastel': photoBg }}>
      <div className={styles.learningPhoto}><img src={photo} alt={alt} loading="lazy" /></div>
      <div className={styles.learningCopy}>
        <h4>{title}</h4>
        <p>{body}</p>
        {children}
      </div>
    </article>
  );
}