"use client";

import Link from 'next/link';
import TinyKeysPreview from './TinyKeysPreview';
import LittleRockersPreview from './LittleRockersPreview';
import { C } from '../tokens';
import { useNextNavigate } from './useNextNavigate';
import styles from './program-preview.module.css';

const littleRockersTestimonial = {
  quote: 'We’ve had such a great experience with Headliner Music Academy! The teachers are wonderful, patient, and really know how to connect with the kids. My child looks forward to every lesson and has become so much more confident and excited about music.',
  name: 'Britanie Grandinette',
  source: 'Google',
};

const tinyKeysTestimonial = {
  quote: 'All of the staff here is wonderful and welcoming and excellent as instructors and people. My kids have discovered their passion for piano with the guidance of the teachers here.',
  name: 'Sara Ferguson',
};

export default function ProgramPreview({ program }) {
  const navigate = useNextNavigate();
  const Page = program === 'tiny-keys' ? TinyKeysPreview : LittleRockersPreview;
  function navigatePreview(path) {
    navigate(path === '/' ? '/home-preview' : ['/little-rockers', '/tiny-keys'].includes(path) ? `/home-preview${path}` : path);
  }

  return <div className={`${styles.page} ${program === 'little-rockers' ? styles.littleRockers : styles.tinyKeys}`} style={{ '--espresso-surface': C.espressoLt, '--program-cream': C.cream, '--program-espresso': C.espresso, '--program-red': C.crimson, '--program-border': C.border, '--program-muted': C.muted, '--program-white': C.white, '--program-blue': C.tealPastel, '--program-yellow': C.yellowPastel }}>
    <a className={styles.skipLink} href="#program-main">Skip to content</a>
    <main id="program-main"><Page navigate={navigatePreview} setPath={navigatePreview} approvedTestimonial={program === 'little-rockers' ? littleRockersTestimonial : tinyKeysTestimonial} /></main>
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Link href="/home-preview"><img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png" alt="Headliner Music Academy" width="180" /></Link>
        <nav aria-label="Footer">
          <Link href="/home-preview/little-rockers">Little Rockers</Link>
          <Link href="/home-preview/tiny-keys">Tiny Keys</Link>
          <Link href="/about/funding-support">Funding support</Link>
          <a href="https://headlinerma.opus1.io/login" target="_blank" rel="noreferrer">Parent Portal</a>
        </nav>
        <address>2311 Sunset Blvd, Rocklin, CA<br /><a href="tel:+19164351300">(916) 435-1300</a></address>
        <div className={styles.legal}><Link href="/privacy-policy">Privacy policy</Link><span>© {new Date().getFullYear()} Headliner Music Academy</span></div>
      </div>
    </footer>
  </div>;
}