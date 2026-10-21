"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import ProgramsNav from '../ProgramsNav';
import BookingModal from '../BookingModal';
import BookingInterstitial from '../BookingInterstitial';
import { C } from '../tokens';
import { useNextNavigate } from './useNextNavigate';
import { useSitePath } from './useSitePath';
import styles from './home-preview.module.css';
import PreviewEvents, { EventDetails } from './PreviewEvents';
import { previewPublications, publicationMetadata } from './preview-publications';
import PreviewReviews from './PreviewReviews';
import PreviewCommunityEmbeds from './PreviewCommunityEmbeds';
import { bulletinPosters as posters, bulletinEvents } from './bulletin-posters';
import PublicationBody from './PublicationBody';

const cloud = 'https://res.cloudinary.com/diy08lj9x/image/upload';
const photos = {
  band: `${cloud}/f_auto,q_auto,w_1600/v1789150969/ec4d0779-3583-4781-9112-daa386493e4e.png`,
  piano: `${cloud}/f_auto,q_auto,w_900/v1781715525/PXL_20260615_232703074.PORTRAIT_mqdiam.jpg`,
  studio: `${cloud}/f_auto,q_auto,w_900/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png`,
  rehearsal: `${cloud}/f_auto,q_auto,w_1000/v1789612567/fcc499b9-9497-4728-8a7f-ac9d25fc9422.png`,
  room: `${cloud}/f_auto,q_auto,w_1000/v1787854919/e8dfe1ae-2f43-41c7-9528-5b459eafdadd.png`,
  performance: `${cloud}/f_auto,q_auto,w_1000/v1781715554/20250628_153338_srnhk2.jpg`,
};
const portal = 'https://headlinerma.opus1.io/login';
const instagram = 'https://instagram.com/headlinerma/';
const tiktok = 'https://tiktok.com/headlinerma';
const logo = `${cloud}/v1780714085/logo_white_2x_ypk002.png`;

const communityLogos = [
  { src: `${cloud}/v1787856767/62f9c4d9-f1d9-45d6-9184-8272ac7c509b.png`, alt: 'Placer SPCA' },
  { src: `${cloud}/v1787856320/34ae2934-47cf-49f4-8feb-5c0fa24d5634.png`, alt: 'Railroad Museum' },
  { src: `${cloud}/v1787856614/9c93611d-37b8-40c0-85ee-c9ff9b7086d9.png`, alt: 'Placer County Fair' },
  { src: `${cloud}/v1787857019/cbc0a656-bb2a-4244-bae6-04a2d6abec11.png`, alt: 'Hot Chili Cool Cars' },
  { src: `${cloud}/v1787857303/2e7dd706-0ab8-4c3d-b661-36a9658321f3.png`, alt: 'Maker Faire Rocklin' },
];

const offerings = [
  { title: 'Music lessons', body: 'Piano, guitar, drums, voice, and more. Private and semi-private lessons for kids, teens, and adults.', image: photos.piano, alt: 'A piano student learning with a teacher', href: '/programs/private-lessons' },
  { title: 'Band program', body: 'Play with other musicians, rehearse with a coach, and perform live.', image: photos.performance, alt: 'Musicians performing together', href: '/programs/band' },
  { title: 'Recording & production', body: 'Studio recording and production support for students and local artists.', image: photos.studio, alt: 'The Headliner recording studio', href: '/services/recording-music-production' },
  { title: 'Rehearsal space', body: 'Room for your band to practice and get ready for a show.', image: photos.room, alt: 'Rehearsal and performance space at Headliner', href: '/services/rehearsal-space' },
];


// Shared optional metadata for stories and community media; no inferred dates.
function renderMetadata(item, label, story = false) {
  const metadata = publicationMetadata(item, label);
  const { date, credit } = metadata;
  label = metadata.label;
  if (!label && !date && !credit) return null;
  return <div className={styles.publicationMeta}>
    {(label || date) && <div className={styles.metadataLine}>
      {label && <span className={story ? styles.storyCategory : undefined}>{label}</span>}
      {label && date && <span aria-hidden="true">·</span>}
      {date && <time dateTime={item.publishedAt}>{date}</time>}
    </div>}
    {credit && <span className={styles.metadataCredit}>{credit}</span>}
  </div>;
}

export default function HomePreview({ publicationSlug = null }) {
  const navigateTo = useNextNavigate();
  const sitePath = useSitePath();
  const navigate = path => navigateTo(sitePath(path));
  const [bookingFor, setBookingFor] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const posterGrid = useRef(null);
  const [boardEdges, setBoardEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const grid = posterGrid.current;
    if (!grid) return;
    const observer = new ResizeObserver(() => {
      setBoardEdges({ start: grid.scrollLeft <= 1, end: grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2 });
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, [publicationSlug]);
  function updateBoardEdges() {
    const grid = posterGrid.current;
    if (grid) setBoardEdges({ start: grid.scrollLeft <= 1, end: grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2 });
  }
  function browsePosters(direction) {
    const grid = posterGrid.current;
    if (!grid) return;
    const step = grid.firstElementChild.offsetWidth + parseFloat(getComputedStyle(grid).gap);
    grid.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  const publication = previewPublications.find(item => item.slug === publicationSlug);
  const nextPublication = publication ? previewPublications[(previewPublications.indexOf(publication) + 1) % previewPublications.length] : null;

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#preview-main">Skip to content</a>
      {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      <ProgramsNav variant="light" navigate={navigate} ctaLabel="Request a lesson" onCtaClick={() => setBookingFor('')} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
      {tourOpen && <BookingInterstitial programName="Headliner Music Academy" programColor={C.teal} opusL1="https://headlinermusicacademy.com" opusL2="https://headlinermusicacademy.com" opusL3="https://headlinermusicacademy.com" initialScreen={2} onClose={() => setTourOpen(false)} emailjsServiceId="service_734y6qg" emailjsTemplateId="template_czlclec" emailjsPublicKey="FdW-lGbAyQuJZFy-y" />}

      <main id="preview-main">
        {sitePath('/') === '/home-preview' && <div className={styles.previewNote}>Homepage preview. Articles, bulletin board flyers, and social posts use content supplied by Headliner. Inquiry forms are live.</div>}
        {publication ? <article className={styles.publication}>
          <Link className={styles.textLink} href={sitePath('/#around-title')}><ArrowLeft size={16} aria-hidden="true" />Back to Around Headliner</Link>
          <h1>{publication.title}</h1>
          {renderMetadata(publication, publication.category)}
          <img className={styles.publicationImage} src={publication.image} alt={publication.alt} fetchPriority="high" />
          <PublicationBody publication={publication} />
          <nav className={styles.publicationNavigation} aria-label="Publications">
            <Link className={styles.textLink} href={sitePath('/#around-title')}><ArrowLeft size={16} aria-hidden="true" />Back to Around Headliner</Link>
            <Link className={styles.textLink} href={sitePath(`/publications/${nextPublication.slug}`)}>Next publication<ArrowRight size={16} aria-hidden="true" /></Link>
          </nav>
        </article> : <>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <h1 id="hero-title"><img className={styles.heroLogo} src={logo} alt="Headliner Music Academy" /></h1>
            <p>A Rocklin music academy for kids, teens, and adults to learn instruments, join bands, record, perform, and grow with supportive teachers.</p>
            <div className={styles.actions}>
              <button className={styles.primaryButton} onClick={() => setBookingFor('')}>Request a lesson <ArrowRight className={styles.heroButtonArrow} size={17} aria-hidden="true" /></button>
              <button className={styles.secondaryButton} onClick={() => setTourOpen(true)}>Request a Tour</button>
            </div>
            <a className={styles.heroPhone} href="tel:916-435-1300"><Phone size={14} aria-hidden="true" />Or call us <strong>(916) 435-1300</strong></a>
          </div>
          <div className={styles.heroMedia}>
            <img src="https://res.cloudinary.com/diy08lj9x/video/upload/so_0,f_jpg,q_auto,w_960/v1788821113/headliner_reel_k84siv.jpg" alt="" className={styles.heroPoster} fetchPriority="high" />
            <video className={styles.heroVideo} autoPlay muted loop playsInline preload="metadata" poster="https://res.cloudinary.com/diy08lj9x/video/upload/so_0,f_jpg,q_auto,w_960/v1788821113/headliner_reel_k84siv.jpg" aria-hidden="true">
              <source src="https://res.cloudinary.com/diy08lj9x/video/upload/f_auto,q_auto,vc_auto,w_960/v1788821113/headliner_reel_k84siv.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <div className={`${styles.shell} ${styles.homeSections}`}>
          <section className={`${styles.section} ${styles.offerSection}`} aria-labelledby="offer-title">
            <div className={styles.sectionHeading}><h2 id="offer-title" className={styles.homeSectionTitle}>What we offer</h2></div>
            <div className={styles.offerGrid}>{offerings.map(offer => <a href={sitePath(offer.href)} className={styles.offer} key={offer.title}><img src={offer.image} alt={offer.alt} loading="lazy" /><h3>{offer.title}</h3><p>{offer.body}</p><span className={styles.inlineLink}>Learn more <ArrowRight size={16} aria-hidden="true" /></span></a>)}</div>
          </section>

          <section className={styles.section} aria-labelledby="around-title">
            <div className={`${styles.sectionHeading} ${styles.editorialHeading}`}><h2 id="around-title" className={styles.homeSectionTitle}>Around Headliner</h2></div>
            <div className={styles.storyGrid}>
              <Link href={sitePath(`/publications/${previewPublications[0].slug}`)} className={styles.leadStory}>
                <img src={previewPublications[0].image} alt={previewPublications[0].alt} loading="lazy" />
                <div className={styles.leadStoryCopy}>{renderMetadata(previewPublications[0], previewPublications[0].category, true)}<h3>{previewPublications[0].title}</h3>
                <p>{previewPublications[0].excerpt}</p></div>
              </Link>
              <div className={styles.sideStories}>
                {previewPublications.slice(1).map(story => <Link key={story.slug} href={sitePath(`/publications/${story.slug}`)} className={styles.smallStory}><img src={story.image} alt={story.alt} loading="lazy" /><div>{renderMetadata(story, story.category, true)}<h3>{story.title}</h3><p>{story.excerpt}</p></div></Link>)}
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="board-title">
            <div className={`${styles.sectionHeading} ${styles.boardHeading}`}><h2 id="board-title" className={styles.homeSectionTitle}>The bulletin board</h2><div className={styles.boardControls}>
              <button type="button" aria-label="Browse previous posters" aria-controls="bulletin-posters" disabled={boardEdges.start} onClick={() => browsePosters(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
              <button type="button" aria-label="Browse next posters" aria-controls="bulletin-posters" disabled={boardEdges.end} onClick={() => browsePosters(1)}><ArrowRight size={20} aria-hidden="true" /></button>
            </div></div>
            <div id="bulletin-posters" ref={posterGrid} onScroll={updateBoardEdges} className={styles.posterGrid} role="region" aria-label="Bulletin board posters" tabIndex={0}>
              {posters.map((poster) => <button key={poster.title} type="button" onClick={() => setSelectedEvent(poster)} aria-label={`View details: ${poster.title}`} className={`${styles.poster} ${styles.uploadedPoster}`}>
                {poster.flyerImage ? <img src={poster.flyerImage} alt={poster.flyerAlt || poster.title} loading="lazy" /> : <>
                {poster.image && <img src={poster.image} alt="" loading="lazy" />}
                <div className={styles.posterContent}><h3>{poster.title}</h3><p>{poster.detail}</p><span className={styles.posterBrand}><img src={logo} alt="Headliner Music Academy" loading="lazy" /></span></div>
                </>}
              </button>)}
            </div>
          </section>

          <section id="events" className={`${styles.section} ${styles.events}`} aria-labelledby="events-title">
            <div className={styles.eventsIntro}><h2 id="events-title" className={styles.homeSectionTitle}>Upcoming events</h2></div>
            <PreviewEvents events={bulletinEvents} onSelect={setSelectedEvent} />
          </section>

          <section className={styles.section} aria-labelledby="community-title">
            <div className={`${styles.sectionHeading} ${styles.editorialHeading}`}><h2 id="community-title" className={styles.homeSectionTitle}>Social media</h2><nav className={styles.socialFollow} aria-label="Follow Headliner">
              <a href={instagram} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>Instagram</a>
              <a href={tiktok} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-3.4v13.6a2.8 2.8 0 1 1-2.4-2.8V9.4a6.2 6.2 0 1 0 5.8 6.2V8.8a8.2 8.2 0 0 0 4.8 1.5V6.9A4.8 4.8 0 0 1 16.6 2Z" /></svg>TikTok</a>
            </nav></div>
            <PreviewCommunityEmbeds />
          </section>

          <PreviewReviews />

          <section className={`${styles.section} ${styles.communityPartners}`} aria-labelledby="partners-title">
            <h2 id="partners-title" className={styles.homeSectionTitle}>Rooted in the community</h2>
            <p>Headliner shows up across the community through performances, partnerships, and local events.</p>
            <ul className={styles.partnerLogos}>
              {communityLogos.map(partner => <li key={partner.alt}><img src={partner.src} alt={partner.alt} loading="lazy" /></li>)}
            </ul>
          </section>
        </div>

        </>}
      </main>

      <footer className={styles.footer}><div className={styles.shell}>
        <div className={styles.footerTop}><a href="/" aria-label="Headliner Music Academy home"><img src={logo} alt="Headliner Music Academy" /></a><nav aria-label="Footer"><a href="/programs/private-lessons">Lessons</a><a href="/programs/band">Bands</a><a href="/about/our-story">About us</a><a href="/teachers">Teachers</a><a href={portal} target="_blank" rel="noreferrer">Parent Portal</a></nav><a href={instagram} target="_blank" rel="noreferrer">Instagram</a></div>
        <div className={styles.footerBottom}><address>2311 Sunset Blvd, Rocklin, CA<br /><a href="tel:+19164351300">(916) 435-1300</a></address><div><a href="/privacy-policy">Privacy policy</a><span>© {new Date().getFullYear()} Headliner Music Academy</span></div></div>
      </div></footer>
    </div>
  );
}