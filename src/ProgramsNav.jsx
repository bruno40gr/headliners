import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { C, fonts } from "./tokens";

/*
  ═══════════════════════════════════════════════════════════════════════════
  PROGRAMS NAV — MERGED FINAL
  ═══════════════════════════════════════════════════════════════════════════
  Desktop: V3's clean SaaS-style mega dropdown (hover + click, no icons).
  Mobile:  V1's full-screen dark accordion with dual top CTAs.
  All colors and fonts pulled from src/tokens.js — nothing redefined locally.
  ═══════════════════════════════════════════════════════════════════════════
*/

const PORTAL_URL  = "https://headlinerma.opus1.io/login";
const LOGO_DARK   = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png";
const LOGO_LIGHT  = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png";

export const PROGRAMS = [
  { label: "Private and Semi-private Lessons", sub: "All ages · One-on-one or shared with a sibling or friend.", href: "/programs/private-lessons", active: true },
  { label: "Band Program", sub: "All ages · Join a band & perform live.", href: "/programs/band", active: true },
  { label: "Tiny Keys", sub: "Ages 5–7 · Early piano & fundamentals.", href: "/tiny-keys", active: true },
  { label: "Wonder Notes", sub: "Ages 3–5 · Intro to instruments & rhythm.", href: "/wonder-notes", active: true },
  { label: "Music & Me", sub: "Ages 0–4 · Mommy & Me musical bonding.", href: null, active: false },
  { label: "Mini Beats", sub: "Ages 3–5 · Foundation in rhythm & beats.", href: null, active: false },
];

export const SERVICES = [
  { label: "Recording & Music Production", sub: "Studio recording, demos, and production support.", href: "/services/recording-music-production", active: true },
  { label: "Rehearsal Space", sub: "Space for bands, groups, and set run-throughs.", href: "/services/rehearsal-space", active: true },
  { label: "Birthday Parties", sub: "Music-filled parties for kids and teens.", href: "/services/birthday-parties", active: true },
  { label: "Private Events", sub: "Community, school, and private gatherings.", href: null, active: false },
  { label: "DJ & Events", sub: "Music, announcements, and event flow support.", href: "/services/dj-and-events", active: true },
  { label: "PA System Rental", sub: "Sound support for parties, showcases, and events.", href: "/services/pa-system-rental", active: true },
  { label: "Instrument Setup", sub: "Electronics, rigs, synths, and home studio gear.", href: "/services/instrument-setup", active: true },
];

const ABOUT_ITEMS = [
  { label: "Our Story", sub: "History, mission & values", href: "/about/our-story", active: true },
  { label: "Funding Support", sub: "Charter and SDP/FMS funding help for families.", href: "/about/funding-support", active: true },
  { label: "Careers", sub: "Join our growing team", href: "/careers", active: true },
];

// ── Top-level text link (Teachers, Parent Portal) ───────────────────────────
function TopLevelLink({ label, href, external, variant, navigate, onClose }) {
  const isDark = variant === "dark";
  const linkColor = isDark ? C.white70 : C.espresso;
  const linkHover = isDark ? C.white : C.crimson;

  return (
    <a
      href={href}
      onClick={(e) => {
        if (!external && href) {
          e.preventDefault();
          if (onClose) onClose();
          navigate(href);
        }
      }}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="nav-top-link"
      style={{
        fontFamily: fonts.body,
        fontSize: 15,
        fontWeight: 500,
        color: linkColor,
        textDecoration: "none",
        transition: "color 0.2s",
        padding: "8px 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {label}
      {external && <ArrowUpRight size={14} style={{ opacity: 0.7 }} />}
      <style>{`.nav-top-link:hover { color: ${linkHover} !important; }`}</style>
    </a>
  );
}

// ── Desktop mega dropdown ────────────────────────────────────────────────────
function MegaDropdown({ title, items, variant = "dark", navigate }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const isDark = variant === "dark";
  const linkColor = isDark ? C.white70 : C.espresso;
  const linkHover = isDark ? C.white : C.crimson;

  // Small open/close delay so moving the mouse diagonally into the panel
  // doesn't slam it shut before you get there.
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleNavClick = (item) => {
    if (!item.active) return;
    setOpen(false);
    navigate(item.href);
  };

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: fonts.body,
          fontSize: 15,
          fontWeight: 500,
          color: open ? linkHover : linkColor,
          padding: "8px 12px",
          transition: "color 0.2s",
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={16}
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.7,
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: items.length > 3 ? 640 : 320,
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            boxShadow: "0 20px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
            overflow: "hidden",
            zIndex: 200,
            animation: "ddSlideDown 0.2s ease-out forwards",
            transformOrigin: "top left",
            marginTop: 8,
          }}
        >
          <div style={{ height: 3, background: C.crimson, width: "100%" }} />
          <div style={{
            padding: "20px",
            display: "grid",
            gridTemplateColumns: items.length > 3 ? "1fr 1fr" : "1fr",
            gap: "4px 24px",
          }}>
            {items.map((item) => (
              <MegaDropdownItem key={item.label} item={item} onClick={handleNavClick} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes ddSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function MegaDropdownItem({ item, onClick }) {
  const isActive = item.active;
  const [isHovered, setIsHovered] = useState(false);
  const Element = isActive && item.href ? "a" : "button";
  const elementProps = isActive && item.href ? { href: item.href } : { disabled: true, type: "button" };

  return (
    <Element
      {...elementProps}
      onClick={(e) => {
        if (!isActive) return;
        e.preventDefault();
        onClick(item);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        padding: "14px 16px",
        background: isActive && isHovered ? C.offWhite : "transparent",
        border: "none",
        borderRadius: 8,
        textAlign: "left",
        textDecoration: "none",
        cursor: isActive ? "pointer" : "default",
        transition: "background 0.2s",
        gap: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 16,
          color: isActive ? C.espresso : C.muted,
          lineHeight: 1.2,
        }}>
          {item.label}
        </span>
        {item.badge && (
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "2px 8px",
            borderRadius: 4,
            background: C.yellow,
            fontSize: 10,
            fontWeight: 700,
            color: C.espresso,
            whiteSpace: "nowrap",
          }}>
            {item.badge}
          </span>
        )}
        {!isActive && (
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "2px 6px",
            borderRadius: 4,
            background: C.border,
            fontSize: 10,
            fontWeight: 700,
            color: C.muted,
            whiteSpace: "nowrap",
          }}>
            COMING SOON
          </span>
        )}
      </div>
      <p style={{
        fontFamily: fonts.body,
        fontSize: 13,
        color: isActive ? C.muted : C.subtext,
        margin: 0,
        lineHeight: 1.4,
      }}>
        {item.sub}
      </p>
    </Element>
  );
}

// ── Mobile: dark full-screen accordion (from V1) ────────────────────────────
function MobileMegaMenuItem({ item, onClick }) {
  const isActive = item.active;
  const Element = isActive && item.href ? "a" : "button";
  const elementProps = isActive && item.href ? { href: item.href } : { disabled: true, type: "button" };

  return (
    <Element
      {...elementProps}
      onClick={(e) => {
        if (!isActive) return;
        e.preventDefault();
        onClick(item);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        background: C.white07,
        border: `1px solid ${C.white08}`,
        borderRadius: 12,
        padding: "16px",
        cursor: isActive ? "pointer" : "default",
        textAlign: "left",
        textDecoration: "none",
        marginBottom: 12,
        transition: "background 0.2s",
        gap: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <h4 style={{
          fontFamily: fonts.display, fontWeight: 700, fontSize: 16,
          color: isActive ? C.white : C.white55, margin: 0, lineHeight: 1.2
        }}>
          {item.label}
        </h4>
        {item.badge && (
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 4,
            background: C.yellow, fontSize: 10, fontWeight: 700, color: C.espresso, whiteSpace: "nowrap",
          }}>
            {item.badge}
          </span>
        )}
      </div>
      <p style={{
        fontFamily: fonts.body, fontSize: 13,
        color: isActive ? C.white60 : C.white30, margin: 0, lineHeight: 1.4
      }}>
        {item.sub}
      </p>
      {!isActive && (
        <span style={{
          display: "inline-block", marginTop: 4, padding: "4px 8px", borderRadius: 4,
          background: C.white10, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "none", color: C.white55,
        }}>
          Coming Soon
        </span>
      )}
    </Element>
  );
}

function MobileAccordion({ title, items, navigate, onClose }) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (item) => {
    if (!item.active) return;
    onClose();
    navigate(item.href);
  };

  return (
    <div style={{ borderBottom: `1px solid ${C.white10}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "20px 0", fontFamily: fonts.body, fontSize: 16,
          fontWeight: 700, color: C.white,
        }}
      >
        <span>{title}</span>
        <ChevronDown size={18} color={C.white55} style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      {open && (
        <div style={{ paddingBottom: 16, animation: "fadeIn 0.2s ease" }}>
          {items.map((item) => (
            <MobileMegaMenuItem key={item.label} item={item} onClick={handleNavClick} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Root component ───────────────────────────────────────────────────────────
export default function ProgramsNav({
  variant      = "dark",
  navigate     = (path) => console.log("Navigate to:", path),
  ctaLabel     = "Request Lessons",
  onCtaClick   = () => console.log("CTA Clicked"),
  ctaHref,
  ctaHrefTarget,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = variant === "dark";

  const navBg         = isDark ? C.espresso : C.white;
  const borderClr     = isDark ? C.white10 : C.border;
  const logo          = isDark ? LOGO_LIGHT : LOGO_DARK;
  const mobileIconClr = isDark ? C.white80 : C.espresso;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const ctaShared = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: C.crimson,
    color: C.white,
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s ease",
    fontFamily: fonts.body,
  };

  const ctaEl = ctaHref ? (
    <a
      href={ctaHref}
      target={ctaHrefTarget}
      rel={ctaHrefTarget === "_blank" ? "noreferrer" : undefined}
      style={ctaShared}
      onMouseEnter={e => { e.currentTarget.style.background = C.crimsonHover; }}
      onMouseLeave={e => { e.currentTarget.style.background = C.crimson; }}
    >
      {ctaLabel}
    </a>
  ) : (
    <button
      onClick={onCtaClick}
      style={ctaShared}
      onMouseEnter={e => { e.currentTarget.style.background = C.crimsonHover; }}
      onMouseLeave={e => { e.currentTarget.style.background = C.crimson; }}
    >
      {ctaLabel}
    </button>
  );

  return (
    <>
      {/* ── DESKTOP NAV BAR (V3 style) ── */}
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        background: navBg,
        borderBottom: `1px solid ${borderClr}`,
        height: 72,
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href="/"
            onClick={e => { e.preventDefault(); navigate("/"); }}
            style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          >
            <img src={logo} alt="Headliner Music Academy" style={{ height: 32, width: "auto", objectFit: "contain", display: "block" }} />
          </a>
        </div>

        <div className="pn-desktop" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MegaDropdown title="Programs" items={PROGRAMS} variant={variant} navigate={navigate} />
            <MegaDropdown title="Services" items={SERVICES} variant={variant} navigate={navigate} />
            <MegaDropdown title="About Us" items={ABOUT_ITEMS} variant={variant} navigate={navigate} />
            <TopLevelLink label="Teachers" href="/teachers" variant={variant} navigate={navigate} />
          </div>
          <TopLevelLink label="Parent Portal" href={PORTAL_URL} external variant={variant} />
          {ctaEl}
        </div>

        <button
          onClick={() => setMobileOpen(v => !v)}
          className="pn-mobile-btn"
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            color: mobileIconClr, padding: 8, flexShrink: 0,
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <style>{`
          @media (max-width: 950px) {
            .pn-desktop    { display: none !important; }
            .pn-mobile-btn { display: flex !important; }
          }
          @media (min-width: 951px) {
            .pn-mobile-btn { display: none !important; }
            .pn-desktop    { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* ── MOBILE FULL-SCREEN MENU (V1 dark accordion style) ── */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: C.espresso, display: "flex", flexDirection: "column",
          animation: "fadeIn 0.2s ease"
        }}>
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, borderBottom: `1px solid ${C.white10}` }}>
            <button
              onClick={() => { onCtaClick && onCtaClick(); setMobileOpen(false); }}
              style={{ ...ctaShared, padding: "14px 16px", fontSize: 13, width: "100%", background: C.crimson }}
            >
              {ctaLabel}
            </button>
            <a
              href={PORTAL_URL} target="_blank" rel="noreferrer"
              style={{
                ...ctaShared, padding: "14px 16px", fontSize: 13, width: "100%",
                background: "transparent", border: `1.5px solid ${C.white30}`, color: C.white
              }}
            >
              Parent Portal
            </a>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 40px" }}>
            <MobileAccordion title="Programs" items={PROGRAMS} navigate={navigate} onClose={() => setMobileOpen(false)} />
            <MobileAccordion title="Services" items={SERVICES} navigate={navigate} onClose={() => setMobileOpen(false)} />
            <MobileAccordion title="About Us" items={ABOUT_ITEMS} navigate={navigate} onClose={() => setMobileOpen(false)} />

            <a
              href="/teachers"
              style={{
                display: "block", padding: "20px 0", borderBottom: `1px solid ${C.white10}`,
                fontFamily: fonts.body, fontSize: 16, fontWeight: 700, color: C.white, textDecoration: "none"
              }}
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate("/teachers"); }}
            >
              Teachers
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}