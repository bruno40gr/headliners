"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProgramsNav from '../ProgramsNav';
import { ServiceInquiryModal } from '../ServicesPage';
import { FAQList } from '../ui';
import { useNextNavigate } from './useNextNavigate';
import { useSitePath } from './useSitePath';
import styles from './band-preview.module.css';
import recording from './recording-preview.module.css';

export default function ServicePreviewLayout({ pageName, title, subtitle, intro, sectionTitle, listIntro, serviceList, gallery, galleryTitle = 'Make room for your music.', galleryItems = gallery, faqs, ctaTitle, ctaBody, ctaLabel = 'Book studio time', mainId = 'recording-main' }) {
  const navigate = useNextNavigate();
  const sitePath = useSitePath();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const openInquiry = () => setInquiryOpen(true);

  function navigatePreview(path) {
    navigate(sitePath(path));
  }

  return <>
    <a className={styles.skipLink} href={`#${mainId}`}>Skip to content</a>
    <div className={`${styles.page} ${recording.page}`}>
      <ProgramsNav variant="dark" navigate={navigatePreview} ctaLabel={ctaLabel} onCtaClick={openInquiry} />
      <main id={mainId}>
        <header className={`${styles.hero} ${recording.hero}`}>
          <div className={styles.heroMedia} aria-hidden="true">
            <img src={gallery[0].image} alt="" />
            <div className={styles.heroOverlay} />
          </div>
          <div className={recording.heroCopy}>
            <h1>{title}</h1>
            {subtitle && <p className={recording.subtitle}>{subtitle}</p>}
            <p>{intro}</p>
            <button className={recording.button} onClick={openInquiry}>{ctaLabel} <ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </header>

        <section className={styles.lightSection} aria-labelledby="recording-services-title">
          <div className={recording.split}>
            <div><h2 id="recording-services-title">{sectionTitle}</h2><p>{listIntro}</p></div>
            <ul className={styles.perks}>{serviceList.map(service => <li key={service}>{service}</li>)}</ul>
          </div>
        </section>

        <section className={styles.lightSection} aria-labelledby="recording-studio-title">
          <div>
            <h2 id="recording-studio-title">{galleryTitle}</h2>
            <div className={recording.gallery}>{galleryItems.map(item => <article key={item.title}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <h3>{item.title}</h3><p>{item.caption}</p>
            </article>)}</div>
          </div>
        </section>

        <section className={styles.lightSection} aria-labelledby="recording-faq-title">
          <div className={recording.split}>
            <h2 id="recording-faq-title">Frequently asked questions.</h2>
            <FAQList items={faqs} questionFontFamily="var(--preview-heading-font, var(--font-asap)), sans-serif" />
          </div>
        </section>

        <section className={recording.cta} aria-labelledby="recording-cta-title">
          <div><h2 id="recording-cta-title">{ctaTitle}</h2><p>{ctaBody}</p>
            <div className={recording.actions}>
              <button className={recording.button} onClick={openInquiry}>{ctaLabel} <ArrowRight size={16} aria-hidden="true" /></button>
              <a href="mailto:admin@headlinermusicacademy.com">Email us</a>
            </div>
          </div>
        </section>
      </main>
    </div>
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Link href={sitePath('/')}><img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png" width="180" alt="Headliner Music Academy" /></Link>
        <nav aria-label="Footer"><Link href={sitePath('/programs/band')}>Band Program</Link><Link href={sitePath('/services/rehearsal-space')}>Rehearsal Space</Link><Link href={sitePath('/services/recording-music-production')}>Recording Studio</Link><a href="https://headlinerma.opus1.io/login" target="_blank" rel="noreferrer">Parent Portal</a></nav>
        <address>2311 Sunset Blvd, Rocklin, CA<br /><a href="tel:+19164351300">(916) 435-1300</a></address>
        <div className={styles.legal}><Link href="/privacy-policy">Privacy policy</Link><span>© {new Date().getFullYear()} Headliner Music Academy</span></div>
      </div>
    </footer>
    {inquiryOpen && <ServiceInquiryModal serviceName={pageName} rehearsalProduction={mainId === 'rehearsal-main'} onClose={() => setInquiryOpen(false)} />}
  </>;
}
