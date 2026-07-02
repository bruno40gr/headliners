import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronDown, Menu, X, Users, BookOpen, Music } from "lucide-react";

const PORTAL_URL  = "https://headlinerma.opus1.io/login";
const LOGO_DARK   = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png";
const LOGO_LIGHT  = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png";

const C = {
  espresso: "#1a130f",
  crimson:  "#FF0044",
  cream:    "#F6F3EE",
  white:    "#FFFFFF",
  teal:     "#00A8C8",
  yellow:   "#FFDA00",
  muted:    "#7A6A5A",
  border:   "#E8E2DA",
};

const PROGRAMS = [
  { label: "Band Program", sub: "All ages · Band & performance", href: "/programs/band", active: true },
  { label: "Summer Band Camp 2026", sub: "Ages 8–12 · July 27–31", href: "/summer-camp", active: true, badge: "Enrolling Now" },
  { label: "Music & Me", sub: "Ages 0–4 · Mommy & Me", href: null, active: false },
  { label: "Tiny Keys", sub: "Ages 3–7 · Early piano", href: "/tiny-keys", active: true },
  { label: "Mini Beats", sub: "Ages 3–5 · Rhythm & basics", href: null, active: false },
  { label: "Little Rockers", sub: "Ages 3–5 · Intro to bands", href: "/little-rockers", active: true },
];

const ABOUT_ITEMS = [
  { label: "Our Story", sub: "History, mission & values", href: "/about", active: true },
  { label: "Careers", sub: "Join our growing team", href: "/careers", active: true },
];

function TopLevelLink({ label, href, external, variant, navigate, onClose }) {
  const [hover, setHover] = useState(false);
  const isDark = variant === "dark";
  const linkColor = isDark ? "rgba(255,255,255,0.65)" : C.muted;
  const linkHover = isDark ? "#ffffff" : C.espresso;

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
      style={{
        fontFamily:     "'DM Sans', sans-serif",
        fontSize:       12,
        fontWeight:     700,
        letterSpacing:  "0.1em",
        textTransform:  "uppercase",
        color:          hover ? linkHover : linkColor,
        textDecoration: "none",
        transition:     "color 0.2s",
        position:       "relative",
        padding:        "8px 0",
        display:        "inline-block",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
      <span style={{
        position:       "absolute",
        bottom:         0,
        left:           0,
        right:          0,
        height:         2,
        background:     C.crimson,
        transform:      hover ? "scaleX(1)" : "scaleX(0)",
        transformOrigin:"left",
        transition:     "transform 0.2s ease-out",
      }} />
    </a>
  );
}

function NavDropdown({ title, items, variant = "dark", navigate, onClose, headerHint, footerHint }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const dropdownRef = useRef(null);

  const isDark    = variant === "dark";
  const linkColor = isDark ? "rgba(255,255,255,0.65)" : C.muted;
  const linkHover = isDark ? "#ffffff" : C.espresso;

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
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
    if (onClose) onClose();
    navigate(item.href);
  };

  const isActive = open || hover;

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            6,
          background:     "none",
          border:         "none",
          cursor:         "pointer",
          fontFamily:     "'DM Sans', sans-serif",
          fontSize:       12,
          fontWeight:     700,
          letterSpacing:  "0.1em",
          textTransform:  "uppercase",
          color:          isActive ? linkHover : linkColor,
          padding:        "8px 0",
          transition:     "color 0.2s",
          position:       "relative",
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={14}
          style={{
            transition:  "transform 0.2s",
            transform:   open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink:  0,
          }}
        />
        <span style={{
          position:       "absolute",
          bottom:         0,
          left:           0,
          right:          0,
          height:         2,
          background:     C.crimson,
          transform:      isActive ? "scaleX(1)" : "scaleX(0)",
          transformOrigin:"left",
          transition:     "transform 0.2s ease-out",
        }} />
      </button>

      {open && (
        <div
          style={{
            position:     "absolute",
            top:          "calc(100% + 12px)",
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        320,
            background:   C.white,
            border:       `1px solid ${C.border}`,
            borderRadius: 16,
            boxShadow:    "0 16px 40px rgba(26,19,15,0.08), 0 4px 12px rgba(26,19,15,0.04)",
            overflow:     "visible",
            zIndex:       200,
            animation:    "ddFadeIn 0.18s ease both",
          }}
        >
          <div style={{
            position:     "absolute",
            top:          -6,
            left:         "50%",
            transform:    "translateX(-50%) rotate(45deg)",
            width:        12,
            height:       12,
            background:   C.white,
            borderLeft:   `1px solid ${C.border}`,
            borderTop:    `1px solid ${C.border}`,
            borderRadius: "2px 0 0 0",
            zIndex:       2,
          }} />

          <div style={{ position: "relative", zIndex: 3, background: C.white, borderRadius: 16, overflow: "hidden" }}>
            {headerHint && (
              <div style={{ padding: "16px 20px 10px", borderBottom: `1px solid ${C.border}` }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, margin: 0 }}>
                  {headerHint}
                </p>
              </div>
            )}

            <div style={{ padding: "8px 0" }}>
              {items.map((item) => (
                <DropdownItem key={item.label} item={item} onClick={handleNavClick} />
              ))}
            </div>

            {footerHint && (
              <div style={{ padding: "12px 20px 14px", borderTop: `1px solid ${C.border}`, background: "#F0EBE1" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, margin: 0, textAlign: "center", letterSpacing: "0.02em" }}>
                  {footerHint}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes ddFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

function DropdownItem({ item, onClick }) {
  const isActive = item.active;
  return (
    <button
      onClick={() => onClick(item)}
      disabled={!isActive}
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        width:          "100%",
        padding:        "12px 20px",
        background:     "none",
        border:         "none",
        textAlign:      "left",
        cursor:         isActive ? "pointer" : "default",
        transition:     "background 0.15s",
        gap:            16,
      }}
      onMouseEnter={e => {
        if (isActive) e.currentTarget.style.background = "#FAF9F7";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "none";
      }}
    >
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily:   "'Archivo', sans-serif",
          fontWeight:   800,
          fontSize:     14,
          color:        isActive ? C.espresso : "#A89D93",
          margin:       0,
          lineHeight:   1.2,
          whiteSpace:   "normal",
          wordWrap:     "break-word",
        }}>
          {item.label}
        </span>
        <span style={{
          fontFamily:   "'DM Sans', sans-serif",
          fontSize:     11,
          color:        isActive ? C.muted : "#C4B8AE",
          margin:       "4px 0 0",
          lineHeight:   1.2,
          whiteSpace:   "normal",
        }}>
          {item.sub}
        </span>
      </div>

      <div style={{ flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>
        {item.badge ? (
          <span style={{
            display:       "inline-flex",
            alignItems:    "center",
            padding:       "4px 8px",
            borderRadius:  999,
            background:    "rgba(0,168,200,0.08)",
            border:        "1px solid rgba(0,168,200,0.25)",
            fontSize:      9,
            fontWeight:    700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         C.teal,
            whiteSpace:    "nowrap",
          }}>
            {item.badge}
          </span>
        ) : isActive ? (
          <ArrowRight size={14} color={C.crimson} />
        ) : (
          <span style={{
            display:       "inline-flex",
            alignItems:    "center",
            padding:       "4px 8px",
            borderRadius:  999,
            background:    "#E8E2DA",
            border:        "1px solid transparent",
            fontSize:      9,
            fontWeight:    700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "#7A6A5A",
            whiteSpace:    "nowrap",
          }}>
            Coming Soon
          </span>
        )}
      </div>
    </button>
  );
}

function MobileAccordion({ title, items, navigate, onClose, itemStyle }) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (item) => {
    if (!item.active) return;
    onClose();
    navigate(item.href);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          ...itemStyle,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          width:          "100%",
          background:     "none",
          border:         "none",
          cursor:         "pointer",
          padding:        "14px 0",
          borderBottom:   `1px solid ${C.border}`,
        }}
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          color={C.muted}
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div style={{ paddingLeft: 12, paddingBottom: 4, background: '#FAF9F7' }}>
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              disabled={!item.active}
              style={{
                display:        "flex",
                alignItems:     "flex-start",
                justifyContent: "space-between",
                width:          "100%",
                background:     "none",
                border:         "none",
                textAlign:      "left",
                cursor:         item.active ? "pointer" : "default",
                padding:        "12px 12px 12px 0",
                borderBottom:   `1px solid ${C.border}`,
                gap:            12,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily:   "'Archivo', sans-serif",
                  fontWeight:   700,
                  fontSize:     14,
                  color:        item.active ? C.espresso : "#A89D93",
                  margin:       0,
                  lineHeight:   1.2,
                  whiteSpace:   "normal",
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontFamily:   "'DM Sans', sans-serif",
                  fontSize:     11,
                  color:        item.active ? C.muted : "#C4B8AE",
                  margin:       "4px 0 0",
                  whiteSpace:   "normal",
                  lineHeight:   1.2,
                }}>
                  {item.sub}
                </p>
              </div>

              <div style={{ marginTop: 2 }}>
                {item.badge ? (
                  <span style={{
                    padding: "4px 8px", borderRadius: 999,
                    background: "rgba(0,168,200,0.08)", border: "1px solid rgba(0,168,200,0.25)",
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: C.teal, flexShrink: 0,
                  }}>
                    {item.badge}
                  </span>
                ) : !item.active ? (
                  <span style={{
                    padding: "4px 8px", borderRadius: 999, background: "#E8E2DA",
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "#7A6A5A", flexShrink: 0,
                  }}>
                    Soon
                  </span>
                ) : (
                  <ArrowRight size={13} color={C.crimson} style={{ flexShrink: 0, marginRight: 8 }} />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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

  const navBg         = isDark ? "rgba(26,19,15,0.98)" : "rgba(255,255,255,0.95)";
  const borderClr     = isDark ? "rgba(255,255,255,0.07)" : C.border;
  const logo          = isDark ? LOGO_LIGHT : LOGO_DARK;
  const mobileIconClr = isDark ? "rgba(255,255,255,0.8)" : C.muted;

  const mobileItemStyle = {
    fontFamily:    "'DM Sans', sans-serif",
    fontSize:      14,
    fontWeight:    700,
    color:         C.espresso,
    textDecoration:"none",
    padding:       "14px 0",
    borderBottom:  `1px solid ${C.border}`,
    display:       "block",
    letterSpacing: "0.02em",
  };

  const ctaShared = {
    display:       "inline-flex",
    alignItems:    "center",
    justifyContent:"center",
    gap:           8,
    background:    C.crimson,
    color:         "#fff",
    fontSize:      12,
    fontWeight:    700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding:       "12px 24px",
    borderRadius:  999,
    border:        "none",
    cursor:        "pointer",
    textDecoration:"none",
    transition:    "all 0.2s ease",
    fontFamily:    "'DM Sans', sans-serif",
  };

  const ctaEl = ctaHref ? (
    <a
      href={ctaHref}
      target={ctaHrefTarget}
      rel={ctaHrefTarget === "_blank" ? "noreferrer" : undefined}
      style={ctaShared}
      onMouseEnter={e => { e.currentTarget.style.background = "#D9003A"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 0, 68, 0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = C.crimson; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {ctaLabel} <ArrowRight size={14} />
    </a>
  ) : (
    <button
      onClick={onCtaClick}
      style={ctaShared}
      onMouseEnter={e => { e.currentTarget.style.background = "#D9003A"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 0, 68, 0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = C.crimson; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {ctaLabel} <ArrowRight size={14} />
    </button>
  );

  return (
    <>
      <nav style={{
        position:       "fixed",
        top:            0,
        width:          "100%",
        zIndex:         100,
        background:     navBg,
        backdropFilter: "blur(12px)",
        borderBottom:   `1px solid ${borderClr}`,
        height:         72,
        display:        "flex",
        alignItems:     "center",
        padding:        "0 40px",
        justifyContent: "space-between",
        boxSizing:      "border-box",
        overflow:       "visible",
      }}>
        <a
          href="/"
          onClick={e => { e.preventDefault(); navigate("/"); }}
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
        >
          <img
            src={logo}
            alt="Headliner Music Academy"
            style={{ height: "auto", maxHeight: 40, width: "auto", maxWidth: 180, objectFit: "contain", display: "block" }}
          />
        </a>

        <div className="pn-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <NavDropdown
            title="Programs"
            items={PROGRAMS}
            variant={variant}
            navigate={navigate}
            headerHint="Our Programs"
            footerHint="More programs launching in 2026"
          />

          <NavDropdown
            title="About Us"
            items={ABOUT_ITEMS}
            variant={variant}
            navigate={navigate}
            headerHint="Our Academy"
          />

          <TopLevelLink
            label="Teachers"
            href="/teachers"
            variant={variant}
            navigate={navigate}
          />

          <TopLevelLink
            label="Parent Portal"
            href={PORTAL_URL}
            external
            variant={variant}
          />

          {ctaEl}
        </div>

        <button
          onClick={() => setMobileOpen(v => !v)}
          className="pn-mobile-btn"
          style={{
            display:    "none",
            background: "none",
            border:     "none",
            cursor:     "pointer",
            color:      mobileIconClr,
            padding:    8,
            flexShrink: 0,
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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

      {mobileOpen && (
        <div style={{
          position:      "fixed",
          top:           72,
          left:          0,
          right:         0,
          bottom:        0,
          zIndex:        99,
          background:    C.white,
          display:       "flex",
          flexDirection: "column",
        }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 24px" }}>
            <MobileAccordion
              title="Programs"
              items={PROGRAMS}
              navigate={navigate}
              onClose={() => setMobileOpen(false)}
              itemStyle={mobileItemStyle}
            />

            <MobileAccordion
              title="About Us"
              items={ABOUT_ITEMS}
              navigate={navigate}
              onClose={() => setMobileOpen(false)}
              itemStyle={mobileItemStyle}
            />

            <a
              href="/teachers"
              style={mobileItemStyle}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                navigate("/teachers");
              }}
            >
              Teachers
            </a>

            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              style={mobileItemStyle}
              onClick={() => setMobileOpen(false)}
            >
              Parent Portal
            </a>

            <div style={{ marginTop: 24, paddingBottom: 40 }}>
              {ctaHref ? (
                <a
                  href={ctaHref}
                  target={ctaHrefTarget}
                  rel={ctaHrefTarget === "_blank" ? "noreferrer" : undefined}
                  style={{ ...ctaShared, display: "flex", justifyContent: "center", padding: "14px 24px", fontSize: 13 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {ctaLabel} <ArrowRight size={14} />
                </a>
              ) : (
                <button
                  onClick={() => { onCtaClick && onCtaClick(); setMobileOpen(false); }}
                  style={{ ...ctaShared, display: "flex", justifyContent: "center", padding: "14px 24px", fontSize: 13, width: "100%" }}
                >
                  {ctaLabel} <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}