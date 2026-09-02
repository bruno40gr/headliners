"use client";

import { useEffect, useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import BookingModal from '../BookingModal';
import ProgramsNav from '../ProgramsNav';
import { C, fonts } from '../tokens';
import { useNextNavigate } from './useNextNavigate';

const offerings = [
  { icon: '🎸', name: 'Guitar', desc: 'Acoustic & electric', href: '/programs/private-lessons' },
  { icon: '🎹', name: 'Piano', desc: 'Classical & contemporary', href: '/programs/private-lessons' },
  { icon: '🥁', name: 'Drums', desc: 'Kit & percussion', href: '/programs/private-lessons' },
  { icon: '🎸', name: 'Bass', desc: 'Electric & upright', href: '/programs/private-lessons' },
  { icon: '🎤', name: 'Vocals', desc: 'All styles', href: '/programs/private-lessons' },
  { icon: '🎺', name: 'Brass', desc: 'Trumpet & more', href: '/programs/private-lessons' },
  { icon: '🎻', name: 'Strings', desc: 'Violin & viola', href: '/programs/private-lessons' },
  { icon: '🤘', name: 'Band Performance', desc: 'Live stage experience', href: '/programs/band' },
  { icon: '🎉', name: 'Private Parties', desc: 'Birthdays & events', href: '/services/dj-and-events' },
  { icon: '🎙️', name: 'Recording Studio', desc: 'Record & produce music', href: '/services/recording-music-production' },
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
  { src: 'https://res.cloudinary.com/diy08lj9x/image/upload/v1787857019/cbc0a656-bb2a-4244-bae6-04a2d6abec11.png', alt: 'Hot Chili Cool Cars' },
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

          <p className={loaded ? 'fade-up delay-1' : ''} style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.teal, margin: '0 0 22px', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
            <span className="tag-dot" />
            Rocklin, CA · Est. 2026
          </p>

          <h1 className={loaded ? 'fade-up delay-2' : ''} style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(42px, 6.4vw, 72px)', lineHeight: 0.96, letterSpacing: -2, color: C.white, margin: '0 0 22px', position: 'relative', zIndex: 1 }}>
            From first lesson
            <br />
            to <span style={{ color: C.crimson, fontStyle: 'italic' }}>real stage.</span>
          </h1>

          <p className={loaded ? 'fade-up delay-3' : ''} style={{ fontFamily: fonts.body, color: C.white70, fontSize: 17, lineHeight: 1.75, maxWidth: 460, margin: '0 0 36px', fontWeight: 300, position: 'relative', zIndex: 1 }}>
            Private, semi-private, and group lessons taught by passionate instructors.
          </p>

          <div className={loaded ? 'fade-up delay-4' : ''} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40, position: 'relative', zIndex: 1 }}>
            <button type="button" onClick={onPrimaryClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 38px', borderRadius: 999, border: 'none', cursor: 'pointer', textDecoration: 'none', background: C.crimson, color: C.white, boxShadow: `0 4px 24px ${C.crimson30}` }}>
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
            <p key={active} style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.white, margin: 0, animation: 'fadeUp 0.5s ease both' }}>
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
            <button type="button" onClick={onPrimaryClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '13px 32px', borderRadius: 999, border: `1.5px solid ${C.crimson}`, cursor: 'pointer', background: 'transparent', color: C.crimson }}>
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
            <a href="/privacy-policy" style={{ fontFamily: fonts.body, fontSize: 10, letterSpacing: '0.1em', color: C.white28, textDecoration: 'none', textTransform: 'uppercase' }}>
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" style={{ fontFamily: fonts.body, fontSize: 10, letterSpacing: '0.1em', color: C.white28, textDecoration: 'none', textTransform: 'uppercase' }}>
              Terms & Conditions
            </a>
            <a href="https://m.yelp.com/biz/headliner-music-academy-rocklin" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: fonts.body, fontSize: 10, color: C.white28, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
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
          letter-spacing:0.12em; text-transform:uppercase;
          color:${C.crimson}; margin-top:8px;
          font-family:${fonts.body};
        }
        @media (max-width:860px) {
          .hero-split { grid-template-columns: 1fr !important; }
          .hero-media { min-height: 360px !important; order: -1; }
        }
        @media (max-width:768px) {
          section { padding-left:20px !important; padding-right:20px !important; }
          header  { padding-left:20px !important; padding-right:20px !important; }
          .offerings-grid { grid-template-columns:1fr 1fr !important; }
          .about-headliner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <header>
        <ProgramsNav variant="dark" navigate={navigate} ctaLabel="Request Lessons" onCtaClick={() => setBookingFor('')} />
      </header>

      <main>
        <HomeHero onPrimaryClick={() => setBookingFor('')} />

        <section style={{ padding: '72px 20px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.teal, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'block', width: 28, height: 3, background: C.teal, borderRadius: 2 }} />
              What we offer
            </p>
            <h2 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.6rem)', letterSpacing: -1, color: C.espresso, lineHeight: 0.95, margin: 0 }}>
              Pick your <em style={{ fontStyle: 'italic', color: C.crimson }}>instrument.</em>
            </h2>
            <p style={{ fontFamily: fonts.body, fontSize: 14, color: C.muted, marginTop: 12 }}>
              Explore programs, services, and the next best step for your musician.
            </p>
          </div>

          <div className="offerings-grid" style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${C.border}`, display: 'grid', gap: 1, background: C.border, gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', width: '100%' }}>
            {offerings.map((item) => (
              <div key={item.name} className="offering-card" style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} onClick={() => navigate(item.href)} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && navigate(item.href)}>
                <span style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</span>
                <h3 style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 16, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.espresso, margin: '0 0 4px' }}>{item.name}</h3>
                <p style={{ fontFamily: fonts.body, fontSize: 16, color: C.muted, margin: 0 }}>{item.desc}</p>
                <span className="card-hint">View page →</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '72px 20px 88px', maxWidth: 900, margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
          <a href="https://m.yelp.com/biz/headliner-music-academy-rocklin" target="_blank" rel="noreferrer" style={{ display: 'block', background: C.white, borderRadius: 20, padding: '48px 56px', border: `1px solid ${C.border}`, textDecoration: 'none', textAlign: 'center', boxShadow: `0 4px 24px ${C.espresso06}` }}>
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

        <section style={{ background: C.offwhite, padding: '0 20px 88px', width: '100%' }}>
          <div className="about-headliner-grid" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'center' }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 24, padding: '42px 40px', boxShadow: `0 4px 24px ${C.espresso06}` }}>
              <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.teal, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'block', width: 28, height: 3, background: C.teal, borderRadius: 2 }} />
                About us
              </p>
              <h2 style={{ fontFamily: fonts.displaySerious, fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em', color: C.espresso, lineHeight: 0.98, margin: '0 0 20px' }}>
                About Headliner
              </h2>
              <div style={{ display: 'grid', gap: 18 }}>
                <p style={{ fontFamily: fonts.body, fontSize: 17, lineHeight: 1.75, color: C.text, margin: 0 }}>
                  Headliner has been part of the community for over 10 years, originally operating under a franchise. Now, Bruno and Lorena are proud to carry that legacy forward, bringing their experience in music and operations while building on the strong foundation created by David and Mel.
                </p>
                <p style={{ fontFamily: fonts.body, fontSize: 17, lineHeight: 1.75, color: C.text, margin: 0 }}>
                  We continue to specialize in private and semi-private lessons, while also expanding our band program, professional recording and production offerings, and birthday parties and event experiences.
                </p>
                <p style={{ fontFamily: fonts.body, fontSize: 17, lineHeight: 1.75, color: C.text, margin: 0 }}>
                  Our vision is to make music a lasting and accessible part of people’s lives by providing thoughtful instruction, meaningful experiences both on and off the stage, and a supportive community. Through a range of programs, we work to support each student’s individual needs with care, passion, and personal attention.
                </p>
                <p style={{ fontFamily: fonts.body, fontSize: 17, lineHeight: 1.75, color: C.text, margin: 0 }}>
                  We’re excited about what’s ahead for Headliner, and we’d love to welcome you into our community.
                </p>
              </div>
            </div>

            <div style={{ borderRadius: 24, overflow: 'hidden', minHeight: 100, boxShadow: `0 14px 36px ${C.espresso10}`, background: C.white }}>
              <img
                src="https://res.cloudinary.com/diy08lj9x/image/upload/v1788312254/9fd46acb-1557-437d-8776-5c969e96687f.png"
                alt="Bruno and Lorena at Headliner Music Academy"
                style={{ width: '100%', height: '100%', minHeight: 520, display: 'block', objectFit: 'cover', objectPosition: 'center center' }}
              />
            </div>
          </div>
        </section>

        <section style={{ background: C.white, padding: '28px 20px 88px', width: '100%' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.teal, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'block', width: 28, height: 3, background: C.teal, borderRadius: 2 }} />
                In the community
              </p>
              <h2 style={{ fontFamily: fonts.displaySerious, fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: -1, color: C.espresso, lineHeight: 1, margin: '0 0 12px' }}>
                A few of the events and organizations we have worked with.
              </h2>
              <p style={{ fontFamily: fonts.body, fontSize: 16, color: C.muted, margin: 0 }}>
                Headliner keeps showing up in the community around us.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
              {communityLogos.map((logo) => (
                <div key={logo.alt} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, minHeight: 118, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18 }}>
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
      </main>

      <SiteFooter onPrimaryClick={() => setBookingFor('')} />
    </div>
  );
}