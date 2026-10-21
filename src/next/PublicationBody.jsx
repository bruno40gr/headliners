import styles from './home-preview.module.css';

export default function PublicationBody({ publication }) {
  return <div className={styles.publicationContent}>
    {publication.body.map(block => {
      switch (block.type) {
        case 'paragraph':
          return <p key={block.id}>{block.text}</p>;
        case 'image':
          return <figure className={styles.publicationFigure} key={block.id}>
            <img src={block.src} alt={block.alt} loading="lazy" />
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>;
        default:
          return null;
      }
    })}
    {publication.source && <p><a className={styles.publicationSource} href={publication.source.url} target="_blank" rel="noreferrer">{publication.source.label}</a></p>}
  </div>;
}