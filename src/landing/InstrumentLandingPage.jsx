import Image from 'next/image';
import { Check, Globe, House, Mail, Music2 } from 'lucide-react';
import AutoplayVideo from './AutoplayVideo';
import TestimonialCarousel from './TestimonialCarousel';
import styles from './instrument-landing.module.css';

const LOGO_URL = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png';
const VIDEO_URL = 'https://res.cloudinary.com/diy08lj9x/video/upload/f_auto,q_auto,vc_auto,w_960/v1788821113/headliner_reel_k84siv.mp4';
const VIDEO_POSTER = 'https://res.cloudinary.com/diy08lj9x/video/upload/so_0,f_jpg,q_auto,w_960/v1788821113/headliner_reel_k84siv.jpg';
const REQUEST_IMAGE = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787862816/3c66ba38-627b-4fa6-8882-0413814d7b9f.png';
const PHONE_DISPLAY = '(916) 435-1300';
const PHONE_LINK = 'tel:+19164351300';
const WEBSITE_DISPLAY = 'headlinermusic.academy';
const WEBSITE_URL = 'https://headlinermusic.academy';
const EMAIL = 'admin@headlinermusicacademy.com';
const ADDRESS = '2311 Sunset Blvd. Rocklin, CA';
const INSTAGRAM_URL = 'https://instagram.com/headlinerma/';

const communityLogos = [
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1790800280/e36a3f57-eb29-4946-899a-9ed43e3a83f1.png', alt: 'Rocklin Area Chamber of Commerce' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856767/62f9c4d9-f1d9-45d6-9184-8272ac7c509b.png', alt: 'Placer SPCA' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856320/34ae2934-47cf-49f4-8feb-5c0fa24d5634.png', alt: 'Railroad Museum' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856614/9c93611d-37b8-40c0-85ee-c9ff9b7086d9.png', alt: 'Placer County Fair' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787857019/cbc0a656-bb2a-4244-bae6-04a2d6abec11.png', alt: 'Hot Chili Cool Cars' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787857303/2e7dd706-0ab8-4c3d-b661-36a9658321f3.png', alt: 'Maker Faire Rocklin' },
];

const lessonPillars = [
  {
    number: '01',
    title: 'Technique',
    body: 'Posture, hand position, finger control, timing, and tone are taught one step at a time.',
  },
  {
    number: '02',
    title: 'Musicianship',
    body: 'Students build rhythm, listening, reading, ear training, and theory through the music they play.',
  },
  {
    number: '03',
    title: 'Repertoire',
    body: 'Lessons include music the student enjoys and music that helps their playing move forward.',
  },
  {
    number: '04',
    title: 'Confidence',
    body: 'Clear goals and patient feedback help students hear their progress and keep building from it.',
  },
];

const fundingPrograms = [
  'Alta California Regional Center',
  'South Sutter',
  'ACE FMS',
  "Mains'l",
  'Aveanna',
];

const testimonials = [
  {
    name: 'Gav 04',
    source: 'Google',
    quote: 'Incredible place, great teachers, awesome owners. If you or anyone you know wants to learn anything musical, definitely give them a call.',
  },
  {
    name: 'Brenda Velasquez',
    source: 'Google',
    quote: 'My 11-year-old daughter attended their summer camp and had an unforgettable experience. She sharpened her singing skills, learned piano and drums, and loved performing several songs as the lead singer of a band.',
  },
  {
    name: 'Alberto Cantor',
    source: 'Google',
    quote: 'This is an exceptionally great music school. The instructors are very talented, patient, and excellent at teaching.',
  },
  {
    name: 'Robert Aguilar',
    source: 'Yelp',
    quote: 'The best music teaching studios around. Great teachers, nice facility, awesome staff, and incredible new owners.',
  },
  {
    name: 'Socorro Baez G.',
    source: 'Yelp',
    quote: 'Love this place! It’s unique, amicable, and well organized. Amazing, diverse, and inclusive for kids, young people, and adults.',
  },
];

function CheckItem({ children }) {
  return (
    <li>
      <span className={styles.check}><Check size={15} strokeWidth={3} /></span>
      {children}
    </li>
  );
}

function Brand({ footer = false }) {
  return (
    <a className={`${styles.brand} ${footer ? styles.brandFooter : ''}`} href="#top" aria-label="Headliner Music Academy">
      <img src={LOGO_URL} alt="Headliner Music Academy" />
    </a>
  );
}

export default function InstrumentLandingPage({ config }) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <Brand />
          <a className={styles.phone} href={PHONE_LINK}>
            <span>Questions? Call us</span>
            <strong>{PHONE_DISPLAY}</strong>
          </a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1>{config.headline}</h1>
            <p className={styles.heroDescription}>{config.description}</p>
            <div className={styles.heroActions}>
              <p className={styles.introOffer}><strong>New student offer</strong><span>Introductory lesson $5</span></p>
              <a className={styles.primaryButton} href="#claim-first-lesson">Get started</a>
              <ul className={styles.offerDetails}>
                <li><Check size={15} strokeWidth={3} aria-hidden="true" /><a href={PHONE_LINK}>Talk with us at {PHONE_DISPLAY}</a></li>
                <li><Check size={15} strokeWidth={3} aria-hidden="true" />Flexible month-to-month enrollment</li>
                <li><Check size={15} strokeWidth={3} aria-hidden="true" />No long-term contract</li>
              </ul>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImage}>
              <Image src={config.heroImage} alt={config.heroImageAlt} fill priority sizes="(max-width: 820px) 100vw, 48vw" />
            </div>
            <div className={styles.heroNote}>
              <Music2 size={19} aria-hidden="true" />
              <span>Music for every stage.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-label="Piano lesson highlights">
        <div className={`${styles.shell} ${styles.proofGrid}`}>
          <div><strong>Private lessons</strong><span>Focused one-to-one instruction</span></div>
          <div><strong>Semi-private</strong><span>Learn alongside a partner</span></div>
          <div><strong>Ages 5 to 7</strong><span>Early childhood group piano</span></div>
          <div><strong>All levels</strong><span>Beginner through advanced</span></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.reviewSection}`} aria-label="What Headliner music families say">
        <div className={styles.shell}>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={`${styles.shell} ${styles.experienceGrid}`}>
          <div className={styles.videoFrame}>
            <AutoplayVideo src={VIDEO_URL} poster={VIDEO_POSTER} />
          </div>
          <div className={styles.experienceCopy}>
            <h2>A place to learn, play, perform, and grow.</h2>
            <p>We teach students at their own pace, with a teacher beside them each week. Private lessons matter here just as much as bands, camps, and performances.</p>
            <ul className={`${styles.checkList} ${styles.checkListDark}`}>
              <CheckItem>Private and semi-private instruction</CheckItem>
              <CheckItem>Beginners through experienced players</CheckItem>
              <CheckItem>Performance opportunities when students want them</CheckItem>
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.curriculumSection}`}>
        <div className={styles.shell}>
          <div className={`${styles.sectionHeading} ${styles.centerHeading}`}>
            <h2>A foundation for confident, expressive playing.</h2>
          </div>
          <div className={styles.pillarGrid}>
            {lessonPillars.map((pillar) => (
              <article key={pillar.title}>
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.requestSection}`} id="claim-first-lesson">
        <div className={`${styles.shell} ${styles.requestGrid}`}>
          <div className={styles.requestCopy}>
            <h2>Ready to begin piano lessons?</h2>
            <p>We’ll get in touch to get started.</p>
            <div className={styles.requestImage}>
              <Image src={REQUEST_IMAGE} alt="A Headliner student performing on stage" fill sizes="(max-width: 800px) 100vw, 38vw" />
            </div>
          </div>

          <div className={styles.formCard} aria-label="$5 first piano lesson form preview">
            <div className={styles.formGrid}>
              <label className={styles.fullField}><span>Student name</span><input type="text" placeholder="Student name" /></label>
              <label className={styles.fullField}><span>Parent name</span><input type="text" placeholder="Parent name" /></label>
              <label><span>Email</span><input type="email" placeholder="you@email.com" /></label>
              <label><span>Phone</span><input type="tel" placeholder="(916) 555-0123" /></label>
              <label><span>Student age</span><select defaultValue=""><option value="" disabled>Select age</option><option>5-7</option><option>8-10</option><option>11-13</option><option>14-17</option><option>18+</option></select></label>
              <label><span>Experience</span><select defaultValue=""><option value="" disabled>Select level</option><option>Brand new</option><option>Some experience</option><option>Experienced player</option></select></label>
            </div>
            <button className={styles.previewButton} type="button">Claim $5 first lesson</button>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.fundingSection}`}>
        <div className={`${styles.shell} ${styles.fundingGrid}`}>
          <div className={styles.fundingCopy}>
            <h2>Funding may help cover music lessons.</h2>
            <p>Headliner works with approved enrichment, charter-school, and self-determination funding programs.</p>
          </div>
          <div className={styles.fundingPrograms} aria-label="Approved funding programs">
            {fundingPrograms.map((program) => (
              <div key={program}><Check size={17} strokeWidth={3} aria-hidden="true" /><span>{program}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closingCta}>
        <div className={`${styles.shell} ${styles.closingGrid}`}>
          <div>
            <h2>Your first piano lesson starts here.</h2>
            <p>New students can begin with a $5 introductory lesson.</p>
          </div>
          <a className={styles.lightButton} href="#claim-first-lesson">Get started</a>
        </div>
      </section>

      <section className={styles.communitySection} aria-label="Headliner community connections">
        <div className={`${styles.shell} ${styles.communityLogos}`}>
          {communityLogos.map((logo) => <img key={logo.alt} src={logo.src} alt={logo.alt} />)}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerGrid}`}>
          <Brand footer />
          <div className={styles.footerContact}>
            <a href={WEBSITE_URL} target="_blank" rel="noreferrer">
              <Globe aria-hidden="true" />
              <span>{WEBSITE_DISPLAY}</span>
            </a>
            <a href={`mailto:${EMAIL}`}>
              <Mail aria-hidden="true" />
              <span>{EMAIL}</span>
            </a>
            <div>
              <House aria-hidden="true" />
              <span>{ADDRESS}</span>
            </div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span>headlinerma</span>
            </a>
          </div>
        </div>
      </footer>

      <div className={styles.mobileCta}>
        <a href="#claim-first-lesson">Get started</a>
      </div>
    </main>
  );
}