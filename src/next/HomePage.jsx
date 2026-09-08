"use client";

import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import BookingModal from '../BookingModal';
import BookingInterstitial from '../BookingInterstitial';
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
    href: '/services/private-events',
    accent: C.espresso,
    image: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1781715524/PXL_20260616_021959694.PORTRAIT.ORIGINAL_b7nfj5.jpg',
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
    title: 'Some announcements',
    body: 'Ask the front desk about performance sign-ups, lesson availability, and upcoming event details.',
  },
];

const weeklyUpdate = {
  range: 'September 6–12, 2026',
  items: announcements,
};

const upcomingPosters = [
  {
    src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1788369374/074ae361-4983-475b-8958-1c1bdd204c21.png',
    alt: 'Upcoming event flyer',
  },
  {
    src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1788369316/d7f34685-3cf5-4d54-baf7-67788eb89cfb.png',
    alt: 'Upcoming promotional poster',
    hasEnded: true,
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

const communityLogos = [
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856767/62f9c4d9-f1d9-45d6-9184-8272ac7c509b.png', alt: 'Placer SPCA' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856320/34ae2934-47cf-49f4-8feb-5c0fa24d5634.png', alt: 'Railroad Museum' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787856614/9c93611d-37b8-40c0-85ee-c9ff9b7086d9.png', alt: 'Placer County Fair' },
  // { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787857019/cbc0a656-bb2a-4244-bae6-04a2d6abec11.png', alt: 'Hot Chili Cool Cars' },
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787857303/2e7dd706-0ab8-4c3d-b661-36a9658321f3.png', alt: 'Maker Faire Rocklin' },
];

const HERO_LOGO = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png';
const HERO_VIDEO_URL = 'https://res.cloudinary.com/diy08lj9x/video/upload/f_auto,q_auto,vc_auto,w_960/v1788821113/headliner_reel_k84siv.mp4';
const HERO_VIDEO_POSTER = 'https://res.cloudinary.com/diy08lj9x/video/upload/so_0,f_jpg,q_auto,w_960/v1788821113/headliner_reel_k84siv.jpg';
const HERO_DESKTOP_VIDEO_OPACITY = 0.99;
const LOCATION_ADDRESS = '2311 Sunset Blvd, Rocklin, CA 95765';
const LOCATION_ADDRESS_LINES = ['2311 Sunset Blvd', 'Rocklin, CA 95765'];
const GOOGLE_MAPS_QUERY_PARAM = encodeURIComponent(LOCATION_ADDRESS);
const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${GOOGLE_MAPS_QUERY_PARAM}&output=embed`;
const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${GOOGLE_MAPS_QUERY_PARAM}`;

function HomeHero({ onPrimaryClick, onTourClick, heroRef }) {
  const [loaded, setLoaded] = useState(false);
  const [mobileFadeProgress, setMobileFadeProgress] = useState(0);
  const [mobileMediaOffset, setMobileMediaOffset] = useState(0);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setLoaded(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const updateMobileFade = () => {
      if (window.innerWidth > 860 || !heroRef.current) {
        setMobileFadeProgress(0);
        setMobileMediaOffset(0);
        return;
      }

      const heroTop = heroRef.current.getBoundingClientRect().top + window.scrollY;
      const heroScroll = Math.max(0, window.scrollY - heroTop);
      const progress = Math.min(1, heroScroll / 260);
      setMobileFadeProgress(progress);
      setMobileMediaOffset(Math.min(heroScroll, 260));
    };

    updateMobileFade();
    window.addEventListener('scroll', updateMobileFade, { passive: true });
    window.addEventListener('resize', updateMobileFade);
    return () => {
      window.removeEventListener('scroll', updateMobileFade);
      window.removeEventListener('resize', updateMobileFade);
    };
  }, [heroRef]);

  const mobileHeroOpacity = 1 - mobileFadeProgress;

  return (
    <section ref={heroRef} className="home-hero" style={{ position: 'relative', paddingTop: 68, width: '100%', boxSizing: 'border-box', background: C.espresso, overflow: 'hidden' }}>
      <div className="hero-split" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: 'calc(100vh - 68px)', width: '100%' }}>
        <div className="hero-copy" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px clamp(28px, 6vw, 80px)', zIndex: 2, opacity: mobileHeroOpacity, pointerEvents: mobileFadeProgress === 1 ? 'none' : undefined }}>
          <div className="hero-copy-mobile-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${C.white} 1px, transparent 1px)`, backgroundSize: '26px 26px', opacity: 0.025, pointerEvents: 'none' }} />

          <div className={loaded ? 'fade-up delay-2' : ''} style={{ position: 'relative', zIndex: 1, margin: '0 0 26px' }}>
            <img src={HERO_LOGO} alt="Headliner Music Academy" style={{ display: 'block', width: 'min(100%, 430px)', height: 'auto' }} />
          </div>

          <p className={loaded ? 'fade-up delay-3' : ''} style={{ fontFamily: fonts.body, color: C.white80, fontSize: 18, lineHeight: 1.7, maxWidth: 520, margin: '0 0 36px', fontWeight: 600, position: 'relative', zIndex: 1 }}>
            A Rocklin music academy for kids, teens, and adults to learn instruments, join bands, record, perform, and grow with supportive teachers.
          </p>

          <div className={loaded ? 'fade-up delay-4' : ''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <button type="button" onClick={onPrimaryClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: "none", padding: '16px 38px', borderRadius: 999, border: 'none', cursor: 'pointer', textDecoration: 'none', background: C.crimson, color: C.white, boxShadow: `0 4px 24px ${C.crimson30}` }}>
              Book a lesson
            </button>
              <button type="button" onClick={onTourClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: "none", padding: '13.5px 34px', borderRadius: 999, border: `2.5px solid ${C.teal}`, cursor: 'pointer', textDecoration: 'none', background: 'transparent', color: C.teal }}>
                Request a Tour
              </button>
            </div>
            <a href="tel:916-435-1300" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: C.white55, textDecoration: 'none', fontFamily: fonts.body, lineHeight: 1.4 }}>
              <Phone size={14} />
              Or call us <strong style={{ color: C.white80, fontWeight: 700 }}>(916) 435-1300</strong>
            </a>
          </div>
        </div>

        <div className="hero-media" style={{ position: 'relative', minHeight: 360, background: C.espresso, overflow: 'hidden', transform: `translateY(${mobileMediaOffset}px)` }}>
          <div className="hero-video-poster" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${HERO_VIDEO_POSTER})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0 }} />
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_VIDEO_POSTER}
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: HERO_DESKTOP_VIDEO_OPACITY }}
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="hero-desktop-overlay" style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${C.espresso} 0%, rgba(26,19,15,0.84) 10%, rgba(26,19,15,0.28) 30%, transparent 55%)`, pointerEvents: 'none' }} />
          <div className="hero-bottom-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,19,15,0.48) 0%, transparent 38%)', pointerEvents: 'none' }} />
          <div className="hero-mobile-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: mobileHeroOpacity }} />
        </div>
      </div>

      <div className="stage-line" style={{ zIndex: 30, opacity: 0.85 * mobileHeroOpacity }} />
    </section>
  );
}

function WeeklyUpdateCard({ className }) {
  return (
    <section className={className} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 'clamp(24px, 4vw, 32px)', boxShadow: `0 8px 28px ${C.espresso06}` }}>
      <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(1.35rem,2.4vw,1.75rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1.05, margin: 0 }}>
        This week at Headliner
      </h2>
      <p style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: C.espresso, margin: '12px 0 0' }}>
        {weeklyUpdate.range}
      </p>
      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {weeklyUpdate.items.map((item, i) => (
          <div key={item.title} style={{ paddingTop: i ? 12 : 0, borderTop: i ? `1px solid ${C.border}` : 'none' }}>
            <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: '0.05em', display: 'block', marginBottom: 5 }}>
              {item.date}
            </span>
            <strong style={{ fontFamily: fonts.body, fontSize: 15, color: C.espresso, display: 'block', marginBottom: 3 }}>
              {item.title}
            </strong>
            <span style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.55, color: C.muted }}>
              {item.body}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SiteFooter({ onPrimaryClick }) {
  const footerLinks = [
    { label: 'Private Lessons', href: '/programs/private-lessons' },
    { label: 'Band Program', href: '/programs/band' },
    { label: 'Teachers', href: '/teachers' },
    { label: 'Funding Support', href: '/about/funding-support' },
    { label: 'Our Story', href: '/about/our-story' },
    { label: 'Birthday Parties', href: '/services/birthday-parties' },
    { label: 'Private Events', href: '/services/private-events' },
    { label: 'Recording & Production', href: '/services/recording-music-production' },
    { label: 'Rehearsal Space', href: '/services/rehearsal-space' },
    { label: 'PA System Rental', href: '/services/pa-system-rental' },
    { label: 'Instrument Setup', href: '/services/instrument-setup' },
    { label: 'Careers', href: '/careers' },
  ];

  return (
    <footer className="site-footer" style={{ background: C.espresso, color: C.white, padding: '64px 40px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, paddingBottom: 48, borderBottom: `1px solid ${C.white08}`, marginBottom: 28 }}>
          <div>
            <a href="/" style={{ display: 'block', marginBottom: 20, lineHeight: 0 }}>
              <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png" alt="Headliner Music Academy" style={{ display: 'block', height: 'auto', maxHeight: 44, width: 'auto', maxWidth: 220, objectFit: 'contain' }} />
            </a>
            <button type="button" onClick={onPrimaryClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: "none", padding: '13px 32px', borderRadius: 999, border: `1.5px solid ${C.crimson}`, cursor: 'pointer', background: 'transparent', color: C.crimson }}>
              Request Lessons
            </button>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="tel:916-435-1300" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: C.white, whiteSpace: 'nowrap' }}>
                <Phone size={16} color={C.crimson} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: fonts.body, fontSize: 20, fontWeight: 600, letterSpacing: -0.5, whiteSpace: 'nowrap' }}>(916) 435-1300</span>
              </a>
              <a href="mailto:admin@headlinermusicacademy.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: C.white70, fontFamily: fonts.body, fontSize: 14, whiteSpace: 'nowrap' }}>
                <Mail size={15} color={C.crimson} style={{ flexShrink: 0 }} />
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
        <div style={{ paddingBottom: 28, borderBottom: `1px solid ${C.white08}`, marginBottom: 28 }}>
          <p style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: C.white28, margin: '0 0 14px', textTransform: 'none' }}>
            Explore Headliner
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px' }}>
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="footer-explore-link" style={{ fontFamily: fonts.body, fontSize: 12, color: C.white50, textDecoration: 'none', lineHeight: 1.4 }}>
                {link.label}
              </a>
            ))}
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

function VisitUsSection({ onTourClick }) {
  return (
    <section style={{ background: C.white, padding: '8px 20px 88px', width: '100%' }}>
      <div className="home-visit-grid" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 34, alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', color: C.crimson, margin: '0 0 12px', textTransform: 'none' }}>
            Visit us at
          </p>
          <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(1.8rem,3.6vw,2.7rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1, margin: '0 0 18px' }}>
            Headliner Music Academy
          </h2>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: C.text, fontFamily: fonts.body, fontSize: 17, lineHeight: 1.7, marginBottom: 22 }}>
            <MapPin size={19} color={C.crimson} style={{ marginTop: 4, flexShrink: 0 }} />
            <address style={{ fontStyle: 'normal' }}>
              {LOCATION_ADDRESS_LINES[0]}
              <br />
              {LOCATION_ADDRESS_LINES[1]}
            </address>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button type="button" onClick={onTourClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.body, fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'none', padding: '13px 24px', borderRadius: 999, border: 'none', cursor: 'pointer', textDecoration: 'none', background: C.crimson, color: C.white, boxShadow: `0 4px 18px ${C.crimson30}` }}>
              Book a tour
            </button>
            <a href={GOOGLE_MAPS_DIRECTIONS_URL} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.body, fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'none', padding: '13px 24px', borderRadius: 999, border: `1.5px solid ${C.crimson}`, textDecoration: 'none', background: 'transparent', color: C.crimson }}>
              Get directions
            </a>
          </div>
        </div>

        <div style={{ height: 320, overflow: 'hidden', background: C.lightCream }}>
          <iframe
            title="Map to Headliner Music Academy"
            src={GOOGLE_MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNextNavigate();
  const heroRef = useRef(null);
  const [bookingFor, setBookingFor] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);

  useEffect(() => {
    const updateNavLogo = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const heroTop = hero.getBoundingClientRect().top + window.scrollY;

      if (window.innerWidth <= 860) {
        setShowNavLogo(window.scrollY - heroTop >= 260);
        return;
      }

      setShowNavLogo(hero.getBoundingClientRect().bottom <= 0);
    };

    updateNavLogo();
    window.addEventListener('scroll', updateNavLogo, { passive: true });
    window.addEventListener('resize', updateNavLogo);
    return () => {
      window.removeEventListener('scroll', updateNavLogo);
      window.removeEventListener('resize', updateNavLogo);
    };
  }, []);

  return (
    <div style={{ fontFamily: fonts.body, minHeight: '100vh', background: C.white, color: C.espresso, overflowX: 'clip', maxWidth: '100vw' }}>
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
      {tourOpen && (
        <BookingInterstitial
          programName="Headliner Music Academy"
          programColor={C.teal}
          opusL1="https://headlinermusicacademy.com"
          opusL2="https://headlinermusicacademy.com"
          opusL3="https://headlinermusicacademy.com"
          initialScreen={2}
          onClose={() => setTourOpen(false)}
          emailjsServiceId="service_734y6qg"
          emailjsTemplateId="template_czlclec"
          emailjsPublicKey="FdW-lGbAyQuJZFy-y"
        />
      )}
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
        .home-learn-more {
          transition: color 0.18s ease, transform 0.18s ease;
        }
        .home-learn-more:hover,
        .home-learn-more:focus-visible {
          color: ${C.espresso} !important;
          transform: translateX(3px);
        }
        .footer-explore-link {
          transition: color 0.18s ease, transform 0.18s ease;
        }
        .footer-explore-link:hover,
        .footer-explore-link:focus-visible {
          color: ${C.white} !important;
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-video { display: none !important; }
          .hero-video-poster { opacity: 1 !important; }
        }
        @media (max-width:860px) {
          .home-hero {
            position:relative !important;
            left:50% !important;
            width:100vw !important;
            max-width:none !important;
            margin-left:-50vw !important;
            margin-right:0 !important;
            padding:68px 0 0 !important;
            background:${C.espresso} !important;
            overflow:visible !important;
          }
          .hero-split {
            display:block !important;
            width:100vw !important;
            min-height:0 !important;
            padding-bottom:260px !important;
          }
          .hero-media {
            position:relative !important;
            width:100% !important;
            min-height:calc(100svh - 68px) !important;
            height:calc(100svh - 68px) !important;
            height:calc(100dvh - 68px) !important;
            aspect-ratio:auto !important;
            max-height:none !important;
            z-index:0 !important;
          }
          .hero-copy {
            position:absolute !important;
            inset:0 0 260px !important;
            min-height:0 !important;
            padding:clamp(36px, 10vw, 64px) 28px !important;
            z-index:2 !important;
            transition:opacity 0.05s linear !important;
          }
          .hero-video { opacity:0.72 !important; }
          .hero-desktop-overlay,
          .hero-bottom-overlay { display:none !important; }
          .hero-mobile-overlay {
            background:linear-gradient(90deg, rgba(26,19,15,0.92) 0%, rgba(26,19,15,0.78) 54%, rgba(26,19,15,0.5) 100%), linear-gradient(to top, rgba(26,19,15,0.65) 0%, transparent 48%);
          }
          .hero-copy-mobile-overlay {
            background:linear-gradient(90deg, rgba(26,19,15,0.72) 0%, rgba(26,19,15,0.56) 62%, rgba(26,19,15,0.38) 100%);
          }
          .home-bulletin-board { display:none !important; }
          .desktop-weekly-update { display:none !important; }
          .community-logo-grid { grid-template-columns:repeat(4, minmax(0, 1fr)) !important; gap:8px !important; }
          .community-logo-card { min-height:74px !important; padding:10px !important; }
          .community-logo-card img { max-height:42px !important; }
          .site-footer { padding:48px 20px 32px !important; }
          .site-footer .footer-grid { gap:32px !important; }
          .home-feature-grid,
          .home-stage-grid,
          .home-about-grid,
          .home-visit-grid,
          .footer-grid { grid-template-columns: 1fr !important; }
          .mobile-weekly-update { display:block !important; }
        }
        @media (min-width:861px) {
          .mobile-weekly-update { display:none; }
          .bulletin-layout { display:grid; grid-template-columns:minmax(0, 1fr) minmax(280px, 0.38fr); gap:36px; align-items:start; }
          .bulletin-poster-grid { grid-template-columns:repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width:768px) {
          .home-feature-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      <header>
        <ProgramsNav variant="dark" navigate={navigate} ctaLabel="Request Lessons" onCtaClick={() => setBookingFor('')} hideLogo={!showNavLogo} />
      </header>

      <main>
        <HomeHero onPrimaryClick={() => setBookingFor('')} onTourClick={() => setTourOpen(true)} heroRef={heroRef} />

        <section className="home-primary-content" style={{ background: C.white, padding: 0, width: '100%' }}>
          <div style={{ padding: '84px 20px 20px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
          <WeeklyUpdateCard className="mobile-weekly-update" />
          <div style={{ marginBottom: 30 }}>
            <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,3rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1, margin: 0 }}>
              What we offer
            </h2>
          </div>
          <div className="home-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 18 }}>
            {featuredPaths.map((item) => (
              <article key={item.title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 0, boxShadow: `0 8px 28px ${C.espresso06}`, display: 'grid', gap: 0, overflow: 'hidden' }}>
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
                <a href={item.href} className="home-learn-more" style={{ display: 'inline-block', width: 'fit-content', fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: C.crimson, letterSpacing: '0.08em', textTransform: "none", textDecoration: 'none' }}>
                  Learn more
                </a>
                </div>
              </article>
            ))}
          </div>
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
            headingSize="clamp(1.55rem,3vw,2.2rem)"
          />
        </section>

        <section style={{ background: C.white, padding: '48px 20px 92px', width: '100%' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div className="home-bulletin-board bulletin-layout" style={{ maxWidth: 1120, margin: '0 auto' }}>
              <div>
                <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(1.55rem,3vw,2.2rem)', letterSpacing: '-0.02em', color: C.espresso, lineHeight: 1, margin: '0 0 8px' }}>
                  Bulletin Board
                </h2>
                <p style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 1.6, color: C.muted, margin: '0 0 22px', maxWidth: 600 }}>
                  Keep an eye here for the next showcase, event date, and what is happening around Headliner.
                </p>
                <div className="bulletin-poster-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                  {upcomingPosters.map((poster) => (
                    <div key={poster.alt} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 0, overflow: 'hidden', boxShadow: `0 1px 3px ${C.black20}`, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', aspectRatio: '2 / 3' }}>
                        <img src={poster.src} alt={poster.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                        {poster.hasEnded && (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,19,15,0.58)' }}>
                            <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white, padding: '10px 14px', border: `1px solid ${C.white50}`, borderRadius: 999 }}>
                              Event has ended
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <WeeklyUpdateCard className="desktop-weekly-update" />
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

            <div className="community-logo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
              {communityLogos.map((logo) => (
                <div className="community-logo-card" key={logo.alt} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, minHeight: 118, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18 }}>
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

        <VisitUsSection onTourClick={() => setTourOpen(true)} />

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