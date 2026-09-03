// Headliner Design System — shared UI components
// Import: import { Button, Modal, Eyebrow, Chip, Bubble, WaveDivider, TextBlock,
//   FormField, Input, Select, Textarea, PillToggle, CTASection, FAQList,
//   StatsGrid, Card, globalStyles } from "./ui";
//
// Every component pulls structure/spacing/typography from tokens.js so they're
// always consistent. Color is passed via an `accent` prop (defaults to C.crimson)
// so pages can differentiate without touching structure.

import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, ChevronDown } from "lucide-react";
import { C, fonts } from "./tokens";

/* ═══════════════════════════════════════════════════════════════════════════
   BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */
export function Button({
  children,
  variant = "primary",
  accent = C.crimson,
  href,
  disabled,
  size = "md",
  style,
  className,
  onClick,
  ...rest
}) {
  const [hover, setHover] = useState(false);

  // Derive accent helpers
  const accentHover =
    accent === C.crimson ? C.crimsonHover :
    accent === C.teal ? "#0096B4" :
    accent === C.yellow ? C.yellowHover :
    C.crimsonHover;
  const accentSoft = accent + "0D"; // ~5% — not exact but safe for inline use

  let bg, color, border, hoverBg, hoverColor;
  if (variant === "primary") {
    bg = disabled ? C.border : accent;
    color = disabled ? C.muted : C.white;
    border = "none";
    hoverBg = disabled ? C.border : accentHover;
    hoverColor = disabled ? C.muted : C.white;
  } else if (variant === "secondary") {
    bg = "transparent";
    color = accent === C.teal ? C.tealDark : accent;
    border = `2.5px solid ${accent}`;
    hoverBg = "transparent";
    hoverColor = accent === C.teal ? C.tealDark : accent;
  } else if (variant === "ghost") {
    bg = C.white07;
    color = C.white80;
    border = `1px solid ${C.white15}`;
    hoverBg = C.white10;
    hoverColor = C.white;
  } else if (variant === "outline") {
    bg = "transparent";
    color = accent;
    border = `1.5px solid ${accent}`;
    hoverBg = accent;
    hoverColor = C.white;
  } else if (variant === "yellow") {
    bg = C.yellow;
    color = C.espresso;
    border = "none";
    hoverBg = C.yellowHover;
    hoverColor = C.espresso;
  }

  const pad = size === "lg" ? "16px 40px" : size === "sm" ? "10px 22px" : "13px 32px";
  const fs = size === "lg" ? 15 : size === "sm" ? 12 : 13;

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: fonts.body,
    fontSize: fs,
    fontWeight: 700,
    letterSpacing: "0.02em",
    textTransform: "none",
    padding: pad,
    borderRadius: 999,
    border,
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    transition: "all 0.2s",
    background: hover ? hoverBg : bg,
    color: hover ? hoverColor : color,
    ...style,
  };

  const Element = href ? "a" : "button";

  return (
    <Element
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={baseStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </Element>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODAL — shell with backdrop click + ESC to close; accepts children
   ═══════════════════════════════════════════════════════════════════════════ */
export function Modal({ children, onClose, maxWidth = 520, style, closeColor = C.muted }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: C.espresso75,
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflowY: "auto",
      }}
    >
      <div
        ref={cardRef}
        style={{
          background: C.white,
          borderRadius: 24,
          width: "100%",
          maxWidth,
          padding: "40px 36px",
          position: "relative",
          boxSizing: "border-box",
          margin: "auto",
          boxShadow: `0 24px 64px ${C.black20}`,
          border: `1px solid ${C.border}`,
          ...style,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: C.border,
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: closeColor,
          }}
        >
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EYEBROW — sentence-case label + colored bar
   ═══════════════════════════════════════════════════════════════════════════ */
export function Eyebrow({ children, accent = C.teal, style }) {
  return (
    <p
      style={{
        fontFamily: fonts.body,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: accent,
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
    >
      <span
        style={{
          display: "block",
          width: 28,
          height: 3,
          background: accent,
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHIP — label + dot
   ═══════════════════════════════════════════════════════════════════════════ */
export function Chip({ label, accent = C.crimson, style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: C.white,
        border: `1.5px solid ${accent}55`,
        borderRadius: 20,
        padding: "6px 13px",
        fontSize: 13,
        fontFamily: fonts.body,
        color: C.text,
        fontWeight: 500,
        ...style,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: accent,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BUBBLE — decorative blob
   ═══════════════════════════════════════════════════════════════════════════ */
export function Bubble({ top, right, bottom, left, size = 240, color = C.tealPastel, opacity = 1, style }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        right,
        bottom,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WAVE DIVIDER
   ═══════════════════════════════════════════════════════════════════════════ */
export function WaveDivider({ from, to, direction = "down" }) {
  const isDown = direction === "down";
  return (
    <svg
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: 0,
        width: "100%",
        height: 48,
        background: from,
        bottom: isDown ? 0 : undefined,
        top: isDown ? undefined : 0,
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <path
        d={isDown ? "M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" : "M0,56 C480,0 960,0 1440,56 L1440,0 L0,0 Z"}
        fill={to}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEXT BLOCK — semantic typography with variant + accent
   ═══════════════════════════════════════════════════════════════════════════ */
const TEXT_VARIANTS = {
  display: {
    fontFamily: fonts.display,
    fontWeight: 800,
    fontSize: "clamp(56px, 9vw, 88px)",
    lineHeight: 0.9,
    letterSpacing: "-0.04em",
    color: C.espresso,
  },
  heading: {
    fontFamily: fonts.display,
    fontWeight: 800,
    fontSize: "clamp(28px, 4vw, 42px)",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: C.espresso,
  },
  subheading: {
    fontFamily: fonts.display,
    fontWeight: 400,
    fontSize: "clamp(22px, 3.5vw, 32px)",
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    color: C.muted,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 1.75,
    color: C.muted,
  },
  eyebrow: {
    fontFamily: fonts.body,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.02em",
    textTransform: "none",
    color: C.tealDark,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 1.5,
    color: C.muted,
  },
};

export function TextBlock({ variant = "body", accent, children, style, as: Tag = "p" }) {
  const base = TEXT_VARIANTS[variant] || TEXT_VARIANTS.body;
  return (
    <Tag
      style={{
        margin: 0,
        ...base,
        ...(accent ? { color: accent } : {}),
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FORM PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════════ */
export function FormField({ label, children, hint }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontFamily: fonts.body,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.02em",
          textTransform: "none",
          color: C.muted,
        }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ fontFamily: fonts.body, fontSize: 11, color: C.subtext, margin: "4px 0 0" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function Input({ accent = C.crimson, style, ...rest }) {
  return (
    <input
      style={{
        background: C.inputBg,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        color: C.espresso,
        fontFamily: fonts.body,
        fontSize: 14,
        padding: "10px 14px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
        transition: "border-color 0.2s, background 0.2s",
        ...style,
      }}
      onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = C.white; }}
      onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.background = C.inputBg; }}
      {...rest}
    />
  );
}

export function Select({ accent = C.crimson, children, style, ...rest }) {
  return (
    <div style={{ position: "relative", ...style }}>
      <select
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          background: C.inputBg,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          color: C.espresso,
          fontFamily: fonts.body,
          fontSize: 14,
          padding: "10px 36px 10px 14px",
          width: "100%",
          boxSizing: "border-box",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = C.white; }}
        onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.background = C.inputBg; }}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: C.subtext,
        }}
      />
    </div>
  );
}

export function Textarea({ accent = C.crimson, style, ...rest }) {
  return (
    <textarea
      style={{
        background: C.inputBg,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        color: C.espresso,
        fontFamily: fonts.body,
        fontSize: 14,
        padding: "10px 14px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
        resize: "vertical",
        transition: "border-color 0.2s, background 0.2s",
        ...style,
      }}
      onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = C.white; }}
      onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.background = C.inputBg; }}
      {...rest}
    />
  );
}

export function PillToggle({ label, active, onClick, accent = C.crimson }) {
  const accentSoft = accent === C.crimson ? C.crimson06 :
    accent === C.teal ? C.teal06 : C.crimson06;
  return (
    <button
      onClick={onClick}
      type="button"
      style={{
        padding: "7px 14px",
        borderRadius: 999,
        border: active ? `1.5px solid ${accent}` : `1px solid ${C.border}`,
        background: active ? accentSoft : C.inputBg,
        color: active ? accent : C.muted,
        fontFamily: fonts.body,
        fontSize: 13,
        fontWeight: active ? 700 : 400,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA SECTION — end-of-page CTA strip
   ═══════════════════════════════════════════════════════════════════════════ */
export function CTASection({
  eyebrow,
  title,
  titleAccent,
  body,
  children,
  accent = C.teal,
  style,
}) {
  return (
    <section
      style={{
        background: C.espresso,
        padding: "72px 24px",
        textAlign: "center",
        ...style,
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {eyebrow && (
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.02em",
              textTransform: "none",
              color: accent,
              margin: "0 0 16px",
            }}
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              color: C.white,
              margin: "0 0 12px",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}{" "}
            {titleAccent && <span style={{ color: C.crimson }}>{titleAccent}</span>}
          </h2>
        )}
        {body && (
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              color: C.white70,
              margin: "0 0 32px",
              lineHeight: 1.65,
            }}
          >
            {body}
          </p>
        )}
        {children && (
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ LIST — stacked Q&A
   ═══════════════════════════════════════════════════════════════════════════ */
export function FAQList({ items, accent = C.crimson, style, questionFontFamily = fonts.display }) {
  return (
    <div style={{ maxWidth: 800, ...style }}>
      {items.map(({ q, a }, i) => (
        <div
          key={i}
          style={{
            paddingBottom: 32,
            borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none",
            marginBottom: 32,
          }}
        >
          <h3
            style={{
              fontFamily: questionFontFamily,
              fontWeight: 800,
              fontSize: 18,
              color: C.espresso,
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            {q}
          </h3>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              color: C.muted,
              lineHeight: 1.85,
              margin: 0,
            }}
          >
            {a}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS GRID — label/value cells
   ═══════════════════════════════════════════════════════════════════════════ */
export function StatsGrid({ items, columns = 3, style }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 1,
        background: C.border,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        ...style,
      }}
    >
      {items.map(({ label, value, color }, i) => (
        <div
          key={i}
          style={{
            background: C.white,
            padding: "28px 24px",
          }}
        >
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.02em",
              textTransform: "none",
              color: C.muted,
              margin: "0 0 8px",
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: 22,
              color: color || C.espresso,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD — photo + content shell
   ═══════════════════════════════════════════════════════════════════════════ */
export function Card({
  image,
  imageAlt = "",
  imageHeight = 255,
  imageBg = C.offWhite,
  accent = C.crimson,
  children,
  style,
  radius = 24,
}) {
  return (
    <div
      style={{
        background: C.white,
        borderRadius: radius,
        border: `1.5px solid ${accent}40`,
        boxShadow: "0 14px 40px rgba(42,18,8,0.08)",
        overflow: "hidden",
        transition: "all .25s ease",
        ...style,
      }}
    >
      {image && (
        <div
          style={{
            height: imageHeight,
            background: imageBg,
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.target.parentElement.style.background = imageBg;
              e.target.style.display = "none";
            }}
          />
        </div>
      )}
      <div style={{ padding: "24px 28px 30px" }}>{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL STYLES — shared CSS string for <style> blocks
   Drop into any page: <style>{globalStyles}</style>
   ═══════════════════════════════════════════════════════════════════════════ */
export const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  ::selection { background: ${C.crimson15}; color: ${C.espresso}; }
  html, body { overflow-x: hidden !important; max-width: 100vw !important; }
  * { min-width: 0; box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up  { animation: fadeUp 0.65s ease both; }
  .delay-1  { animation-delay: 0.08s; }
  .delay-2  { animation-delay: 0.18s; }
  .delay-3  { animation-delay: 0.28s; }
  .delay-4  { animation-delay: 0.38s; }
  .delay-5  { animation-delay: 0.48s; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-track { animation: marquee 24s linear infinite; display: flex; width: max-content; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.3; }
  }
  .tag-dot {
    width: 6px; height: 6px; border-radius: 50%; background: ${C.crimson};
    animation: pulse 2s ease-in-out infinite;
    display: inline-block; flex-shrink: 0;
  }

  @media (max-width: 768px) {
    section { padding-left: 20px !important; padding-right: 20px !important; }
    header  { padding-left: 20px !important; padding-right: 20px !important; }
  }
`;