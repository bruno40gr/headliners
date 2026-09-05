"use client";

import { useEffect, useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import BookingModal from '../BookingModal';
import ProgramsNav from '../ProgramsNav';
import { C, fonts } from '../tokens';
import { useNextNavigate } from './useNextNavigate';
import ImageTextPair from './ImageTextPair';

const featuredPaths = [
  {
    title: 'Private and Semi-private Lessons',
    body: 'One-on-one and semi-private instruction for kids, teens, and adults.',
    href: '/programs/private-lessons',
    accent: C.teal,
    image: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1781715525/PXL_20260615_232703074.PORTRAIT_mqdiam.jpg',
    focal: 'center 35%',
  },
  {
    title: 'Band Program',
    body: 'Rehearse, perform, and grow with real stage experience.',
    href: '/programs/band',
    accent: C.crimson,
    image: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1781715554/20250628_153338_srnhk2.jpg',
    focal: 'center 30%',
  },
  {
    title: 'Recording & Production',
    body: 'Creative support for demos, live recording, and student projects.',
    href: '/services/recording-music-production',
    accent: C.yellow,
    image: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png',
    focal: 'center 28%',
  },
  {
    title: 'Private Events & Parties',
    body: 'Music-filled celebrations, showcases, and event support in one space.',
    href: '/services/dj-and-events',
    accent: C.espresso,
    image: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1781716216/PXL_20260524_013313165.PORTRAIT.ORIGINAL_bpckwf.jpg',
    focal: 'center 25%',
  },
];

const announcements = [
  {
    date: 'Sep 2',
    title: 'Closed for Labor Day',
    body: 'Closed on Labor Day. Lessons and front desk support resume the following day.',
  },
  {
    date: 'Sep 1',
    title: 'This week at Headliner',
    body: 'Ask the front desk about performance sign-ups, lesson availability, and upcoming event details.',
  },
];

const upcomingPosters = [
  {
    src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1788369374/074ae361-4983-475b-8958-1c1bdd204c21.png',
    alt: 'Upcoming event flyer',
  },
  {
    src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1788369316/d7f34685-3cf5-4d54-baf7-67788eb89cfb.png',
    alt: 'Upcoming promotional poster',
  },
  {
    src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787862861/9198476e-d047-4ef5-9584-51ec4ff1b010.png',
    alt: 'Band program poster',
  },
];

const socialLinks = [
  {
    title: 'Instagram',
    handle: '@headlinerma',
    href: 'https://instagram.com/headlinerma/',
    body: 'Photos, clips, performances, and day-to-day moments from the academy.',
    accent: C.crimson,
  },
  {
    title: 'TikTok',
    handle: '@headlinerma',
    href: 'https://tiktok.com/headlinerma',
    body: 'Short performance clips, rehearsals, and what is happening around Headliner.',
    accent: C.teal,
  },
];

const heroSlides = [
  {
    src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787854782/f797c6b9-6819-4759-9e0e-7ca1bb43a4d0.png',
    focal: 'center center',
    caption: 'Monthly recitals and real performance opportunities',
  },
  {
    src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1781715524/PXL_20260615_232511605.MP_v0hy5e.jpg',
    focal: 'center 35%',
    caption: 'Private and semi-private lessons for kids, teens, and adults',
  },
  {
    src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787862861/9198476e-d047-4ef5-9584-51ec4ff1b010.png',
    focal: 'center center',
    caption: 'Band program support from first rehearsal to live show',
  },
];

const communityLogos = [
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856767/62f9c4d9-f1d9-45d6-9184-8272ac7c509b.png', alt: 'Placer SPCA' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856320/34ae2934-47cf-49f4-8feb-5c0fa24d5634.png', alt: 'Railroad Museum' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856614/9c93611d-37b8-40c0-85ee-c9ff9b7086d9.png', alt: 'Placer County Fair' },
  // { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787857019/cbc0a656-bb2a-4244-bae6-04a2d6abec11.png', alt: 'Hot Chili Cool Cars' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787857303/2e7dd706-0ab8-4c3d-b661-36a9658321f3.png', alt: 'Maker Faire Rocklin' },
];

const HERO_PHOTO_FILTER = 'sepia(0.18) saturate(0.85) contrast(1.08) brightness(0.97)';

function HomeHero({ onPrimaryClick }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setLoaded(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearTimeout(timeout);
  }, [active]);

  return (
    <section style={{ position: 'relative', paddingTop: 68, width: '100%', boxSizing: 'border-box', background: C.espresso, overflow: 'hidden' }}>
      <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 68px)', width: '100%' }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px clamp(28px, 6vw, 80px)', zIndex: 2 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${C.white} 1px, transparent 1px)`, backgroundSize: '26px 26px', opacity: 0.025, pointerEvents: 'none' }} />

          <p className={loaded ? 'fade-up delay-1' : ''} style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', textTransform: "none", color: C.teal, margin: '0 0 22px', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
            <span className="tag-dot" />
            Rocklin, CA
          </p>

          <h1 className={loaded ? 'fade-up delay-2' : ''} style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(42px, 6.4vw, 72px)', lineHeight: 0.96, letterSpacing: -2, color: C.white, margin: '0 0 22px', position: 'relative', zIndex: 1 }}>
            From first lesson
            <br />
            to <span style={{ color: C.crimson, fontStyle: 'italic' }}>real stage.</span>
          </h1>

          <p className={loaded ? 'fade-up delay-3' : ''} style={{ fontFamily: fonts.body, color: C.white70, fontSize: 17, lineHeight: 1.75, maxWidth: 460, margin: '0 0 36px', fontWeight: 300, position: 'relative', zIndex: 1 }}>
            Private lessons, group lessons, a band program that puts you on stage, recording and production, and creative experiences right here in Rocklin.
          </p>

          <div className={loaded ? 'fade-up delay-4' : ''} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40, position: 'relative', zIndex: 1 }}>
            <button type="button" onClick={onPrimaryClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: "none", padding: '16px 38px', borderRadius: 999, border: 'none', cursor: 'pointer', textDecoration: 'none', background: C.crimson, color: C.white, boxShadow: `0 4px 24px ${C.crimson30}` }}>
              Request Lessons
            </button>
          </div>

          <div className={loaded ? 'fade-up delay-5' : ''} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', position: 'relative', zIndex: 1 }}>
            {[
              { href: 'tel:916-435-1300', Icon: Phone, label: '(916) 435-1300' },
              { href: 'mailto:admin@headlinermusicacademy.com', Icon: Mail, label: 'admin@headlinermusicacademy.com' },
              { href: 'https://maps.google.com/?q=2311+Sunset+Blvd,+Rocklin,+CA+95765', Icon: MapPin, label: '2311 Sunset Blvd, Rocklin, CA', external: true },
            ].map(({ href, Icon, label, external }) => (
              <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: C.white45, textDecoration: 'none', fontFamily: fonts.body, transition: 'color 0.2s' }}>
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-media" style={{ position: 'relative', overflow: 'hidden', minHeight: 360, background: C.espresso }}>
          <div style={{ position: 'absolute', inset: 0, WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%)', maskImage: 'linear-gradient(to right, transparent 0%, black 18%)' }}>
            {heroSlides.map((slide, index) => (
              <div key={slide.caption} style={{ position: 'absolute', inset: 0, opacity: index === active ? 1 : 0, transition: 'opacity 1.1s ease', pointerEvents: 'none' }}>
                <img src={slide.src} alt={slide.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: slide.focal, display: 'block', filter: HERO_PHOTO_FILTER }} />
              </div>
            ))}
          </div>

          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(100deg, ${C.espresso} 0%, rgba(26,19,15,0.65) 6%, rgba(26,19,15,0.18) 14%, transparent 26%)`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,19,15,0.6) 0%, transparent 30%)', pointerEvents: 'none' }} />

          <div style={{ position: 'absolute', bottom: 28, left: 32, right: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
            <p key={active} style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', textTransform: 'none', color: C.white, margin: 0, animation: 'fadeUp 0.5s ease both' }}>
              {heroSlides[active].caption}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 220, justifyContent: 'flex-end' }}>
              {heroSlides.map((_, index) => (
                <button key={index} type="button" onClick={() => setActive(index)} aria-label={`Show slide ${index + 1}`} style={{ width: index === active ? 20 : 6, height: 6, borderRadius: 999, background: index === active ? C.crimson : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s ease, background 0.3s ease' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="stage-line" style={{ zIndex: 30 }} />
    </section>
  );
}

function SiteFooter({ onPrimaryClick }) {
  return (
    <footer style={{ background: C.espresso, color: C.white, padding: '64px 40px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, paddingBottom: 48, borderBottom: `1px solid ${C.white08}`, marginBottom: 28 }}>
          <div>
            <a href="/" style={{ display: 'block', marginBottom: 20, lineHeight: 0 }}>
              <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png" alt="Headliner Music Academy" style={{ display: 'block', height: 'auto', maxHeight: 44, width: 'auto', maxWidth: 220, objectFit: 'contain' }} />
            </a>
            <p style={{ fontFamily: fonts.body, fontSize: 16, color: C.white70, lineHeight: 1.75, maxWidth: 480, marginBottom: 24 }}>
              Inspiring the next generation of musicians through premium, personalized education.
            </p>
            <button type="button" onClick={onPrimaryClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: "none", padding: '13px 32px', borderRadius: 999, border: `1.5px solid ${C.crimson}`, cursor: 'pointer', background: 'transparent', color: C.crimson }}>
              Request Lessons
            </button>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="tel:916-435-1300" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: C.white }}>
                <Phone size={16} color={C.crimson} />
                <span style={{ fontFamily: fonts.body, fontSize: 20, fontWeight: 600, letterSpacing: -0.5 }}>(916) 435-1300</span>
              </a>
              <a href="mailto:admin@headlinermusicacademy.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: C.white70, fontFamily: fonts.body, fontSize: 14, wordBreak: 'break-all', overflowWrap: 'break-word', minWidth: 0 }}>
                <Mail size={15} color={C.crimson} />
                admin@headlinermusicacademy.com
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: C.white70, fontFamily: fonts.body, fontSize: 14, lineHeight: 1.6 }}>
                <MapPin size={15} color={C.crimson} style={{ marginTop: 2, flexShrink: 0 }} />
                2311 Sunset Blvd
                <br />
                Rocklin, CA 95765
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontFamily: fonts.body, fontSize: 10, letterSpacing: '0.1em', color: C.white18 }}>
            © {new Date().getFullYear()} Headliner Music Academy. All rights reserved.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <a href="/privacy-policy" style={{ fontFamily: fonts.body, fontSize: 10, letterSpacing: '0.1em', color: C.white28, textDecoration: 'none', textTransform: "none" }}>
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" style={{ fontFamily: fonts.body, fontSize: 10, letterSpacing: '0.1em', color: C.white28, textDecoration: 'none', textTransform: "none" }}>
              Terms & Conditions
            </a>
            <a href="https://m.yelp.com/biz/headliner-music-academy-rocklin" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: fonts.body, fontSize: 10, color: C.white28, textDecoration: 'none', textTransform: "none", letterSpacing: '0.1em' }}>
              Yelp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const navigate = useNextNavigate();
  const [bookingFor, setBookingFor] = useState(null);

  return (
    <div style={{ fontFamily: fonts.body, minHeight: '100vh', background: C.white, color: C.espresso, overflowX: 'hidden', maxWidth: '100vw' }}>
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up  { animation: fadeUp 0.65s ease both; }
        .delay-1  { animation-delay: 0.08s; }
        .delay-2  { animation-delay: 0.18s; }
        .delay-3  { animation-delay: 0.28s; }
        .delay-4  { animation-delay: 0.38s; }
        .delay-5  { animation-delay: 0.48s; }
        .stage-line {
          position:absolute; bottom:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg, transparent, ${C.crimson} 30%, ${C.crimson} 70%, transparent);
          opacity:0.85;
        }
        @keyframes pulse {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }
        .tag-dot {
          width:6px; height:6px; border-radius:50%; background:${C.crimson};
          animation: pulse 2s ease-in-out infinite;
          display:inline-block; flex-shrink:0;
        }
        .offering-card {
          background: ${C.white};
          cursor:pointer;
          transition: background 0.2s, transform 0.15s;
          position:relative;
        }
        .offering-card:hover { background: ${C.lightCream}; transform:translateY(-2px); z-index:1; }
        .offering-card:hover .card-hint { opacity:1; }
        .card-hint {
          opacity:0; transition:opacity 0.2s;
          font-size:10px; font-weight:700;
          letter-spacing:0.12em; text-transform: none;
          color:${C.crimson}; margin-top:8px;
          font-family:${fonts.body};
        }
        @media (max-width:860px) {
          .hero-split { grid-template-columns: 1fr !important; }
          .hero-media { min-height: 360px !important; order: -1; }
          .home-feature-grid,
          .home-stage-grid,
          .home-about-grid,
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width:768px) {
          section { padding-left:20px !important; padding-right:20px !important; }
          header  { padding-left:20px !important; padding-right:20px !important; }
          .home-feature-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      <header>
        <ProgramsNav variant="dark" navigate={navigate} ctaLabel="Request Lessons" onCtaClick={() => setBookingFor('')} />
      </header>

      <main>
        <HomeHero onPrimaryClick={() => setBookingFor('')} />

        <section style={{ padding: '84px 20px 20px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
          <div className="home-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 18 }}>
            {featuredPaths.map((item) => (
              <button key={item.title} type="button" onClick={() => navigate(item.href)} style={{ textAlign: 'left', background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 0, cursor: 'pointer', boxShadow: `0 8px 28px ${C.espresso06}`, display: 'grid', gap: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 200 }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: item.focal, display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,19,15,0.55) 0%, rgba(26,19,15,0.08) 42%, transparent 75%)' }} />
                  <span style={{ position: 'absolute', left: 20, bottom: 18, display: 'inline-block', width: 54, height: 6, borderRadius: 999, background: item.accent }} />
                </div>
                <div style={{ padding: '24px 24px 26px', display: 'grid', gap: 18 }}>
                <div style={{ display: 'grid', gap: 10 }}>
                  <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 28, lineHeight: 1.02, letterSpacing: '-0.02em', color: C.espresso, margin: 0 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
                <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: C.crimson, letterSpacing: '0.08em', textTransform: "none" }}>
                  Learn more
                </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ background: C.offwhite, padding: '48px 20px 92px', width: '100%' }}>
          <ImageTextPair
            imageSrc="https://res.cloudinary.com/diy08lj9x/image/upload/v1787854919/e8dfe1ae-2f43-41c7-9528-5b459eafdadd.png"
            imageAlt="Headliner performance stage"
            imageHeight={460}
            heading="A space built for real performance"
            body="Our performance stage is one of the things that sets Headliner apart. It is built for events, rehearsals, demo live recording, intimate performances, livestreams, a complete PA system, and professional lighting and scenography."
            linkLabel="Learn more about the Band Program"
            linkHref="/programs/band"
            onNavigate={navigate}
          />
        </section>

        <section style={{ background: C.white, padding: '48px 20px 92px', width: '100%' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div className="home-stage-grid" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.48fr 0.52fr', gap: 80, alignItems: 'start' }}>
              <div>
                <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.1rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1, margin: '0 0 8px' }}>
                  Bulletin Board
                </h2>
                <p style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 1.6, color: C.muted, margin: '0 0 22px', maxWidth: 600 }}>
                  Keep an eye here for the next showcase, event date, and what is happening around Headliner.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                  {upcomingPosters.map((poster) => (
                    <div key={poster.alt} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 0, overflow: 'hidden', boxShadow: `0 1px 3px ${C.black20}`, display: 'flex', flexDirection: 'column' }}>
                      <img src={poster.src} alt={poster.alt} style={{ width: '100%', height: 340, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                      <div style={{ padding: '10px 12px' }}>
                        <span style={{ fontFamily: fonts.body, fontSize: 11, color: C.muted, letterSpacing: '0.05em' }}>Pin to board</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <aside>
                <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1, margin: '0 0 18px' }}>
                  Front Desk
                </h2>
                <div style={{ display: 'grid', gap: 0 }}>
                  {announcements.map((item, i) => (
                    <div key={item.title}>
                      {i > 0 && <div style={{ height: 1, background: C.border, margin: '12px 0' }} />}
                      <span style={{ fontFamily: fonts.body, fontSize: 11, lineHeight: 1, fontWeight: 600, color: C.muted, letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                        {item.date}
                      </span>
                      <h3 style={{ fontFamily: fonts.body, fontWeight: 600, fontSize: 15, lineHeight: 1.4, color: C.espresso, margin: '0 0 4px' }}>
                        {item.title}
                      </h3>
                      <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.55, color: C.muted, margin: 0 }}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
              
            </div>
          </div>
        </section>

        <section style={{ padding: '0 20px 88px', maxWidth: 900, margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
          <a href="https://m.yelp.com/biz/headliner-music-academy-rocklin" target="_blank" rel="noreferrer" style={{ display: 'block', background: C.white, borderRadius: 20, padding: '48px 56px', border: `1px solid ${C.border}`, textDecoration: 'none', textAlign: 'center', boxShadow: `0 4px 24px ${C.espresso06}` }}>
              <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.4rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1, margin: '0 0 24px' }}>
              What families say
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width={18} height={18} viewBox="0 0 24 24" fill={C.yellow}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p style={{ fontFamily: fonts.display, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: C.espresso, lineHeight: 1.55, maxWidth: 640, margin: '0 auto 24px' }}>
              "Love this place!! It's unique!!! Amicable and well organized. Amazing diverse and integrative for kids, young or adults."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: fonts.body, fontSize: 16 }}>
              <span style={{ fontWeight: 700, color: C.espresso }}>Socorro Baez G.</span>
              <span style={{ color: C.border }}>|</span>
              <span style={{ fontWeight: 700, color: C.crimson }}>Yelp</span>
            </div>
          </a>
        </section>

        <section style={{ background: C.white, padding: '0 20px 88px', width: '100%' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1, margin: '0 0 12px' }}>
                Rooted in the community
              </h2>
              <p style={{ fontFamily: fonts.body, fontSize: 16, color: C.muted, margin: 0 }}>
                Headliner shows up across the community through performances, partnerships, and local events.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
              {communityLogos.map((logo) => (
                <div key={logo.alt} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, minHeight: 118, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18 }}>
                  <img src={logo.src} alt={logo.alt} style={{ maxWidth: '100%', maxHeight: 64, width: 'auto', height: 'auto', display: 'block', objectFit: 'contain' }} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 26 }}>
              <button type="button" onClick={() => navigate('/about/funding-support')} style={{ background: 'none', border: 'none', color: C.crimson, cursor: 'pointer', fontFamily: fonts.body, fontSize: 14, fontWeight: 700, padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Need help with charter or SDP/FMS funding?
              </button>
            </div>
          </div>
        </section>

        <section style={{ background: C.offwhite, padding: '88px 20px 96px', width: '100%' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1, margin: '0 0 16px' }}>
              Start your music journey with Headliner
            </h2>
            <p style={{ fontFamily: fonts.body, fontSize: 18, lineHeight: 1.8, color: C.text, margin: '0 auto 28px', maxWidth: 620 }}>
              A place to learn, play, perform, and grow.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
              <button type="button" onClick={() => setBookingFor('')} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: "none", padding: '16px 38px', borderRadius: 999, border: 'none', cursor: 'pointer', textDecoration: 'none', background: C.crimson, color: C.white, boxShadow: `0 4px 24px ${C.crimson30}` }}>
                Request Lessons
              </button>
              <button type="button" onClick={() => navigate('/programs/private-lessons')} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: "none", padding: '16px 38px', borderRadius: 999, border: `1.5px solid ${C.crimson}`, cursor: 'pointer', textDecoration: 'none', background: 'transparent', color: C.crimson }}>
                View Programs
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onPrimaryClick={() => setBookingFor('')} />
    </div>
  );
}