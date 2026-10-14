"use client";

import { useState } from 'react';
import Link from 'next/link';
import BookingModal from '../BookingModal';
import BandProgramPreview from './BandProgramPreview';
import { useNextNavigate } from './useNextNavigate';
import styles from './band-preview.module.css';

export default function BandPreviewRoute() {
  const navigate = useNextNavigate();
  const [bookingFor, setBookingFor] = useState(null);
  function navigatePreview(path) {
    navigate(path === '/' ? '/home-preview' : ['/little-rockers', '/tiny-keys'].includes(path) ? `/home-preview${path}` : path);
  }

  return <>
    <a className={styles.skipLink} href="#band-main">Skip to content</a>
    <main id="band-main"><BandProgramPreview setPath={navigatePreview} onRequestLessons={(instrument = '') => setBookingFor(instrument)} /></main>
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Link href="/home-preview"><img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png" width="180" alt="Headliner Music Academy" /></Link>
        <nav aria-label="Footer"><Link href="/home-preview/little-rockers">Little Rockers</Link><Link href="/home-preview/tiny-keys">Tiny Keys</Link><Link href="/about/funding-support">Funding support</Link><a href="https://headlinerma.opus1.io/login" target="_blank" rel="noreferrer">Parent Portal</a></nav>
        <address>2311 Sunset Blvd, Rocklin, CA<br /><a href="tel:+19164351300">(916) 435-1300</a></address>
        <div className={styles.legal}><Link href="/privacy-policy">Privacy policy</Link><span>© {new Date().getFullYear()} Headliner Music Academy</span></div>
      </div>
    </footer>
    {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
  </>;
}