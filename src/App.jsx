import { useState } from "react";
import { ArrowRight, MapPin, Mail, Phone, Menu, X } from "lucide-react";

const offerings = [
  { icon: "🎸", name: "Guitar", desc: "Acoustic & electric" },
  { icon: "🎹", name: "Piano", desc: "Classical & contemporary" },
  { icon: "🥁", name: "Drums", desc: "Kit & percussion" },
  { icon: "🎤", name: "Vocals", desc: "All styles" },
  { icon: "🎺", name: "Brass", desc: "Trumpet & more" },
  { icon: "🎻", name: "Strings", desc: "Violin & viola" },
  { icon: "🤘", name: "Band Performance", desc: "Live stage experience" },
  { icon: "🧸", name: "Piano for Kids", desc: "Fun early learning" },
  { icon: "🎉", name: "Private Parties", desc: "Birthdays & events" },
];

const PORTAL_URL = "https://headlinerma.opus1.io/login";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-slate-50 text-slate-800 selection:bg-amber-200 selection:text-amber-900"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&display=swap');

        .bebas { font-family: 'Bebas Neue', sans-serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.18s; }
        .delay-3 { animation-delay: 0.28s; }
        .delay-4 { animation-delay: 0.38s; }
        .delay-5 { animation-delay: 0.48s; }

        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        .offering-card:hover { background: #fffbeb; }
        .offering-card { transition: background 0.2s; }

        .portal-glow:hover {
          box-shadow: 0 0 28px rgba(245,158,11,0.45);
        }
        .portal-glow { transition: box-shadow 0.2s, transform 0.15s; }
        .portal-glow:hover { transform: translateY(-1px); }

        .tag-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px;
          border: 1px solid rgba(245,158,11,0.35);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #b45309;
          background: rgba(245,158,11,0.08);
        }
        .tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #f59e0b;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }

        @keyframes driftSpot {
          0%   { transform: translate(-50%, -50%) scale(1);    opacity: 0.13; }
          33%  { transform: translate(-48%, -53%) scale(1.06); opacity: 0.17; }
          66%  { transform: translate(-52%, -47%) scale(0.96); opacity: 0.12; }
          100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.13; }
        }
        .amber-spot {
          position: absolute;
          top: 50%; left: 50%;
          width: 700px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(245,158,11,0.55) 0%, transparent 70%);
          animation: driftSpot 9s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
          filter: blur(40px);
        }
        .vignette {
          background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%);
        }

        .stage-line {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #f59e0b 30%, #f59e0b 70%, transparent);
          opacity: 0.8;
        }

        .grid-separator { background: #e2e8f0; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center h-[68px]">
          {/* Logo */}
          <div>
            <div className="bebas text-[26px] tracking-wide text-slate-950 leading-none">Headliner.</div>
            <div className="dm text-[9px] font-bold tracking-[0.3em] text-amber-500 mt-0.5">MUSIC ACADEMY</div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <span className="text-sm text-slate-400 cursor-not-allowed select-none dm">
              Book a Lesson <span className="text-xs opacity-60">(Coming soon)</span>
            </span>
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              className="portal-glow inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-900 bg-amber-500 rounded-full"
            >
              Parent Portal <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 shadow-lg">
            <div className="px-5 py-5 flex flex-col gap-3">
              <span className="text-sm text-slate-400 cursor-not-allowed py-2 border-b border-slate-100">
                Book a Lesson <span className="text-xs opacity-60">(Coming soon)</span>
              </span>
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noreferrer"
                className="portal-glow flex justify-center items-center gap-2 px-6 py-3 font-bold text-slate-900 bg-amber-500 rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                Parent Portal <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden bg-slate-950 pt-[68px]">
        {/* BG video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/65 z-10" />
          <div className="noise-overlay absolute inset-0 z-20 opacity-40 mix-blend-overlay pointer-events-none" />
          <div className="amber-spot z-20" />
          <div className="vignette absolute inset-0 z-25 pointer-events-none" />
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-50 grayscale"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-band-playing-on-a-stage-in-front-of-a-crowd-32771-large.mp4" type="video/mp4" />
          </video>
          <div className="stage-line z-30" />
        </div>

        {/* Content */}
        <div className="relative z-30 max-w-3xl px-6 py-16">
          <div className="fade-up delay-1 flex justify-center mb-7">
            <span className="tag-pill">
              <span className="tag-dot" />
              Now Enrolling · Rocklin, CA
            </span>
          </div>

          <h1 className="fade-up delay-2 bebas text-white leading-none mb-3"
            style={{ fontSize: "clamp(58px, 10vw, 90px)", letterSpacing: "2px" }}>
            Every kid<br />deserves a <span style={{ color: "#f59e0b" }}>stage.</span>
          </h1>

          <p className="fade-up delay-3 dm text-slate-300 text-lg leading-relaxed max-w-xl mx-auto mb-10 font-light">
            Private, semi-private, and group lessons in music and performance —
            taught by passionate instructors in a welcoming atmosphere.
          </p>

          <div className="fade-up delay-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              className="portal-glow inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-950 bg-amber-500 rounded-full"
            >
              Parent Portal <ArrowRight size={18} />
            </a>
            <button
              tabIndex={-1}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-400 bg-white/5 border border-white/15 rounded-full cursor-not-allowed backdrop-blur-sm"
            >
              Book a Lesson <span className="text-sm font-normal opacity-60">(Coming soon)</span>
            </button>
          </div>

          {/* Quick contact strip */}
          <div className="fade-up delay-5 mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="tel:916-435-1300" className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors dm">
              <Phone size={13} /> (916) 435-1300
            </a>
            <a href="mailto:admin@headlinermusicacademy.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors dm">
              <Mail size={13} /> admin@headlinermusicacademy.com
            </a>
          </div>
        </div>
      </section>

      {/* ── OFFERINGS ── */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
          <div style={{ width: 28, height: 2, background: "#f59e0b" }} />
          <span className="dm text-xs font-bold tracking-[0.25em] text-slate-400 uppercase">What We Offer</span>
        </div>

        <div
          className="rounded-[24px] overflow-hidden shadow-sm"
          style={{ border: "1px solid #e2e8f0" }}
        >
          {/* separator grid trick */}
          <div
            className="grid grid-cols-2 md:grid-cols-3"
            style={{ gap: "1px", background: "#e2e8f0" }}
          >
            {offerings.map((item, i) => (
              <div
                key={i}
                className={`offering-card bg-white px-4 py-10 flex flex-col items-center text-center${i === offerings.length - 1 ? " col-span-2 md:col-span-1" : ""}`}
              >
                <span className="text-4xl mb-5" role="img" aria-label={item.name}>{item.icon}</span>
                <h3 className="bebas text-xl text-slate-900 tracking-wide mb-1">{item.name}</h3>
                <p className="dm text-xs text-slate-500 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-white px-5 sm:px-8 pt-16 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
            {/* Brand col */}
            <div>
              <div className="bebas text-[30px] tracking-wide text-white leading-none">Headliner.</div>
              <div className="dm text-[9px] font-bold tracking-[0.3em] text-amber-500 mt-1 mb-5">MUSIC ACADEMY</div>
              <p className="dm text-slate-400 text-sm leading-relaxed max-w-xs mb-7 font-light">
                Inspiring the next generation of musicians through premium, personalized education.
              </p>
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noreferrer"
                className="portal-glow inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-amber-500 rounded-full"
              >
                Parent Portal <ArrowRight size={14} />
              </a>
            </div>

            {/* Contact col */}
            <div>
              <h4 className="dm text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-6">
                Contact &amp; Location
              </h4>
              <ul className="space-y-5">
                <li>
                  <a href="tel:916-435-1300" className="flex items-center gap-3 group">
                    <Phone size={18} className="text-amber-500 flex-shrink-0" />
                    <span className="dm text-xl font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight">
                      (916) 435-1300
                    </span>
                  </a>
                </li>
                <li>
                  <a href="mailto:admin@headlinermusicacademy.com" className="flex items-center gap-3 group">
                    <Mail size={18} className="text-amber-500 flex-shrink-0" />
                    <span className="dm text-sm font-semibold text-slate-300 group-hover:text-amber-400 transition-colors break-all">
                      admin@headlinermusicacademy.com
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 pt-1">
                  <MapPin size={17} className="text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="dm text-sm text-slate-500 leading-relaxed">
                    2311 Sunset Blvd<br />Rocklin, CA 95765
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="dm text-xs text-slate-600">
              © {new Date().getFullYear()} Headliner Music Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="dm text-xs text-slate-500 hover:text-amber-400 transition-colors">Instagram</a>
              <a href="#" className="dm text-xs text-slate-500 hover:text-amber-400 transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}