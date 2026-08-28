// Headliner Design System — shared tokens
// Import into any page: import { C, fonts } from "./tokens";

export const C = {
  // Base
  espresso:      "#1A130F",
  espressoMd:    "#251A14",
  espressoLt:    "#2F2118",
  cream:         "#FAF6F0",
  lightCream:    "#FAF6EB",
  offWhite:      "#F2EDE6",
  offwhite:      "#FAF9F7",
  white:         "#FFFFFF",
  muted:         "#7A6860",
  text:          "#2C1F18",

  // Brand accents
  crimson:       "#FF0044",
  crimsonHover:  "#CC0036",
  teal:          "#00A8C8",
  tealDark:      "#006E84",
  tealPastel:    "#C8F0F8",
  yellow:        "#FFDA00",
  yellowDark:    "#7A5F00",
  yellowPastel:  "#FFF7CC",
  yellowHover:   "#FFC800",
  blush:         "#FFD6CC",
  blushDark:     "#8B2D1A",

  // UI / form
  border:        "#E8E2DA",
  inputBg:       "#FAFAF8",
  placeholder:   "#BBBBBB",
  subtext:       "#AAAAAA",
  errorText:     "#DC2626",
  errorBg:       "#FEF2F2",
  errorBorder:   "#FECACA",

  // White alpha
  white07: "rgba(255,255,255,0.07)",
  white08: "rgba(255,255,255,0.08)",
  white10: "rgba(255,255,255,0.10)",
  white15: "rgba(255,255,255,0.15)",
  white18: "rgba(255,255,255,0.18)",
  white20: "rgba(255,255,255,0.20)",
  white25: "rgba(255,255,255,0.25)",
  white28: "rgba(255,255,255,0.28)",
  white30: "rgba(255,255,255,0.30)",
  white38: "rgba(255,255,255,0.38)",
  white45: "rgba(255,255,255,0.45)",
  white55: "rgba(255,255,255,0.55)",
  white60: "rgba(255,255,255,0.60)",
  white70: "rgba(255,255,255,0.70)",
  white80: "rgba(255,255,255,0.80)",

  // Espresso alpha
  espresso06: "rgba(26,19,15,0.06)",
  espresso10: "rgba(26,19,15,0.10)",
  espresso75: "rgba(26,19,15,0.75)",

  // Black alpha
  black20: "rgba(0,0,0,0.20)",

  // Crimson alpha
  crimson06: "rgba(255,0,68,0.06)",
  crimson08: "rgba(255,0,68,0.08)",
  crimson15: "rgba(255,0,68,0.15)",
  crimson30: "rgba(255,0,68,0.30)",

  // Teal alpha
  teal06: "rgba(0,168,200,0.06)",
  teal08: "rgba(0,168,200,0.08)",
  teal15: "rgba(0,168,200,0.16)",
  teal30: "rgba(0,168,200,0.30)",

  // Yellow alpha
  yellow05: "rgba(255,218,0,0.05)",
  yellow12: "rgba(255,218,0,0.12)",
  yellow50: "rgba(255,218,0,0.50)",
};

export const fonts = {
  display: "'Baloo 2', sans-serif",
  displayExpressive: "'Baloo 2', sans-serif",
  displaySerious: "'Archivo', sans-serif",
  body:    "'DM Sans', sans-serif",
};

// Page archetypes define the visual mode for different content types.
// Use these rules to keep typography, hero treatment, and decoration consistent.
export const pageArchetypes = {
  earlyChildhood: {
    id: "earlyChildhood",
    displayFont: "displayExpressive",
    heroTone: "light",
    navMode: "full",
    decoration: "expressive",
    componentDensity: "layered",
    notes: "Use for early childhood and family-facing class pages. Expressive treatment is allowed, but keep the content calm and readable.",
  },
  coreAcademy: {
    id: "coreAcademy",
    displayFont: "displaySerious",
    heroTone: "dark",
    navMode: "full",
    decoration: "restrained",
    componentDensity: "balanced",
    notes: "Use for band program, adult/student program pages, teachers, and general academy pages that need a stronger, more grounded tone.",
  },
  professionalServices: {
    id: "professionalServices",
    displayFont: "displaySerious",
    heroTone: "dark",
    navMode: "full",
    decoration: "minimal",
    componentDensity: "lean",
    notes: "Use for service landing pages and future campaign landing pages. Lead with bold copy, a supporting image, lean navigation, and direct content.",
  },
};

// Program-level color rules
// When building any program page, reference programPalettes[programName] to decide
// which colors should dominate the layout, which are accents, and what percentage
// of the page each color should occupy. Crimson is always reserved for CTAs —
// never use it as a background or decorative color on early childhood pages.
export const programPalettes = {
  band: {
    dominant:   { token: "espresso",  pct: 55, note: "Hero and dark panel backgrounds" },
    secondary:  { token: "cream",     pct: 25, note: "Text panels, light sections" },
    accent:     { token: "crimson",   pct: 12, note: "CTAs only" },
    accent2:    { token: "teal",      pct: 8,  note: "Labels and wayfinding" },
  },
  privateLesson: {
    dominant:   { token: "cream",     pct: 50, note: "Page base, most panels" },
    secondary:  { token: "espresso",  pct: 25, note: "One or two hero panels" },
    accent:     { token: "teal",      pct: 15, note: "Primary accent, instrument labels" },
    accent2:    { token: "crimson",   pct: 10, note: "Booking CTAs only" },
  },
  summerCamp: {
    dominant:   { token: "yellow",    pct: 45, note: "Hero and section fills" },
    secondary:  { token: "cream",     pct: 30, note: "Content panels" },
    accent:     { token: "crimson",   pct: 15, note: "CTAs and energy pops" },
    accent2:    { token: "espresso",  pct: 10, note: "Headlines on yellow" },
  },
  tinyKeys: {
    dominant:   { token: "cream",     pct: 40, note: "Page base and cards" },
    secondary:  { token: "yellow",    pct: 25, note: "Primary tier accents" },
    secondary2: { token: "teal",      pct: 20, note: "Secondary tier accents" },
    accent:     { token: "crimson",   pct: 10, note: "CTAs only" },
    accent2:    { token: "blush",     pct: 5,  note: "Fourth feature card only" },
  },
  miniBeats: {
    dominant:   { token: "crimson",   pct: 40, note: "Hero and age tier cards" },
    secondary:  { token: "cream",     pct: 30, note: "Page base and content panels" },
    secondary2: { token: "espresso",  pct: 15, note: "Headlines on cream" },
    accent:     { token: "yellow",    pct: 10, note: "Playful pops and activity moments" },
    accent2:    { token: "teal",      pct: 5,  note: "CTAs and wayfinding only" },
  },
  wonderNotes: {
    dominant:   { token: "crimson",  pct: 40, note: "Hero accents, stickers, card borders" },
    secondary:  { token: "cream",    pct: 30, note: "Page base and content panels" },
    secondary2: { token: "blush",    pct: 15, note: "Section fills, modal callout" },
    accent:     { token: "yellow",   pct: 10, note: "Playful pops and instrument badges" },
    accent2:    { token: "teal",     pct: 5,  note: "Wayfinding and secondary labels" },
  },
  musicAndMe: {
    dominant:   { token: "blush",     pct: 45, note: "Hero and section fills" },
    secondary:  { token: "cream",     pct: 30, note: "Cards and content panels" },
    secondary2: { token: "yellow",    pct: 12, note: "Warmth accents and highlights" },
    accent:     { token: "crimson",   pct: 8,  note: "CTAs only" },
    accent2:    { token: "teal",      pct: 5,  note: "Labels and wayfinding only" },
  },
};
