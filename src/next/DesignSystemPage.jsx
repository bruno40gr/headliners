import Link from 'next/link';
import { C, fonts, pageArchetypes, programPalettes, radius } from '../tokens';

const colorGroups = [
  {
    title: 'Base surfaces',
    keys: ['espresso', 'espressoMd', 'espressoLt', 'cream', 'lightCream', 'offWhite', 'offwhite', 'white', 'muted', 'text'],
  },
  {
    title: 'Brand accents',
    keys: ['crimson', 'crimsonHover', 'teal', 'tealDark', 'tealPastel', 'yellow', 'yellowDark', 'yellowPastel', 'yellowHover', 'blush', 'blushDark'],
  },
  {
    title: 'UI and feedback',
    keys: ['border', 'inputBg', 'placeholder', 'subtext', 'errorText', 'errorBg', 'errorBorder'],
  },
  {
    title: 'Transparency tokens',
    keys: ['white07', 'white10', 'white20', 'white38', 'white55', 'white80', 'espresso06', 'espresso10', 'crimson15', 'crimson30', 'teal15', 'teal30', 'yellow12', 'yellow50'],
  },
];

const typography = [
  { name: 'Display / expressive', token: 'fonts.display', family: fonts.display, use: 'Home, early-childhood, and warm family-facing headings.' },
  { name: 'Display / serious', token: 'fonts.displaySerious', family: fonts.displaySerious, use: 'Grounded academy and professional-service headings.' },
  { name: 'Body', token: 'fonts.body', family: fonts.body, use: 'Body copy, labels, buttons, navigation, and utility text.' },
];

const rules = [
  ['CTA hierarchy', 'Use one filled primary CTA per view: Request Lessons. Tours, directions, program browsing, and supporting actions use outline or text-link treatments.'],
  ['Crimson', 'Reserve crimson for primary conversion actions and key CTA emphasis. Do not use it as decorative fill on early-childhood pages.'],
  ['Teal', 'Use teal for wayfinding, secondary actions, information links, and supporting accents.'],
  ['Large surfaces', 'Cards, contained imagery, maps, testimonials, and large content panels use radius.lg (16px).'],
  ['Compact surfaces', 'Small cards and compact containers use radius.md (12px). Small contained UI may use radius.sm (8px).'],
  ['Full-bleed media', 'Mobile hero media stays square at viewport edges; do not round full-bleed elements because background wedges become visible.'],
  ['Typography', 'Use display type for headings only. Use DM Sans for paragraphs, navigation, buttons, labels, and supporting information.'],
];

function ColorSwatch({ token, value }) {
  const isLight = ['white', 'cream', 'lightCream', 'offWhite', 'offwhite', 'yellow', 'yellowPastel', 'tealPastel', 'blush'].includes(token);

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.md, overflow: 'hidden' }}>
      <div style={{ height: 96, background: value, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'flex-end', padding: 12 }}>
        <span style={{ background: isLight ? C.espresso : C.white, color: isLight ? C.white : C.espresso, borderRadius: radius.pill, fontFamily: fonts.body, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', padding: '5px 8px' }}>
          {token}
        </span>
      </div>
      <div style={{ padding: '11px 12px 12px' }}>
        <code style={{ color: C.espresso, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12 }}>{value}</code>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, body }) {
  return (
    <div style={{ maxWidth: 760, marginBottom: 28 }}>
      <p style={{ color: C.tealDark, fontFamily: fonts.body, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', margin: '0 0 8px', textTransform: 'uppercase' }}>
        {eyebrow}
      </p>
      <h2 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, margin: '0 0 10px' }}>
        {title}
      </h2>
      {body && <p style={{ color: C.muted, fontFamily: fonts.body, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{body}</p>}
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main style={{ background: C.offwhite, color: C.espresso, minHeight: '100vh', padding: '88px 24px 96px' }}>
      <div style={{ margin: '0 auto', maxWidth: 1180 }}>
        <header style={{ alignItems: 'flex-start', borderBottom: `1px solid ${C.border}`, display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', marginBottom: 48, paddingBottom: 32 }}>
          <div style={{ maxWidth: 700 }}>
            <Link href="/" style={{ color: C.tealDark, display: 'inline-block', fontFamily: fonts.body, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', marginBottom: 20, textDecoration: 'none', textTransform: 'uppercase' }}>
              ← Back to Headliner
            </Link>
            <p style={{ color: C.crimson, fontFamily: fonts.body, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', margin: '0 0 10px', textTransform: 'uppercase' }}>
              Internal reference · noindex
            </p>
            <h1 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0 }}>
              Headliner design system
            </h1>
          </div>
          <p style={{ color: C.muted, fontFamily: fonts.body, fontSize: 14, lineHeight: 1.7, margin: 0, maxWidth: 320 }}>
            The active visual tokens and working rules for Headliner Music Academy pages.
          </p>
        </header>

        <nav aria-label="Design system sections" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', marginBottom: 56 }}>
          {['Colors', 'Type', 'Surfaces', 'CTAs', 'Archetypes', 'Program palettes'].map((label) => (
            <a key={label} href={`#${label.toLowerCase().replace(' ', '-')}`} style={{ color: C.tealDark, fontFamily: fonts.body, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
              {label}
            </a>
          ))}
        </nav>

        <section id="colors" style={{ marginBottom: 72 }}>
          <SectionTitle eyebrow="01 · Foundation" title="Brand colors" body="Reference colors by token name in code. Do not duplicate hex values inside page components." />
          <div style={{ display: 'grid', gap: 36 }}>
            {colorGroups.map((group) => (
              <div key={group.title}>
                <h3 style={{ color: C.espresso, fontFamily: fonts.body, fontSize: 15, fontWeight: 800, margin: '0 0 14px' }}>{group.title}</h3>
                <div className="ds-color-grid" style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
                  {group.keys.map((token) => <ColorSwatch key={token} token={token} value={C[token]} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="type" style={{ borderTop: `1px solid ${C.border}`, marginBottom: 72, paddingTop: 56 }}>
          <SectionTitle eyebrow="02 · Typography" title="Type families and hierarchy" body="Use expressive or serious display type for headings based on page archetype. Use body type everywhere else." />
          <div className="ds-type-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            {typography.map((type) => (
              <article key={type.token} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.lg, padding: 24 }}>
                <code style={{ color: C.tealDark, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11 }}>{type.token}</code>
                <h3 style={{ color: C.espresso, fontFamily: type.family, fontSize: 28, fontWeight: 800, lineHeight: 1, margin: '18px 0 12px' }}>{type.name}</h3>
                <p style={{ color: C.muted, fontFamily: fonts.body, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{type.use}</p>
                <p style={{ color: C.espresso, fontFamily: type.family, fontSize: 18, fontWeight: 700, lineHeight: 1.35, margin: '24px 0 0' }}>
                  Learn. Play. Perform. Grow.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="surfaces" style={{ borderTop: `1px solid ${C.border}`, marginBottom: 72, paddingTop: 56 }}>
          <SectionTitle eyebrow="03 · Surfaces" title="Radius and visual structure" body="Use tokens instead of hard-coded radius values. Full-bleed mobile media is the intentional exception." />
          <div className="ds-radius-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            {Object.entries(radius).map(([name, value]) => (
              <article key={name} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.lg, padding: 20 }}>
                <div style={{ alignItems: 'center', background: C.tealPastel, border: `1px solid ${C.teal30}`, borderRadius: value, display: 'flex', height: 104, justifyContent: 'center', marginBottom: 16 }}>
                  <span style={{ color: C.tealDark, fontFamily: fonts.body, fontSize: 12, fontWeight: 800 }}>{value}px</span>
                </div>
                <code style={{ color: C.espresso, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12 }}>radius.{name}</code>
              </article>
            ))}
          </div>
          <div className="ds-surface-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: '1.1fr 0.9fr', marginTop: 20 }}>
            <article style={{ background: C.espresso, borderRadius: radius.lg, color: C.white, minHeight: 220, overflow: 'hidden', padding: 28 }}>
              <p style={{ color: C.teal, fontFamily: fonts.body, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', margin: '0 0 12px', textTransform: 'uppercase' }}>Large media / panel</p>
              <h3 style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 800, lineHeight: 1, margin: 0 }}>radius.lg · 16px</h3>
            </article>
            <article style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.md, padding: 28 }}>
              <p style={{ color: C.tealDark, fontFamily: fonts.body, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', margin: '0 0 12px', textTransform: 'uppercase' }}>Compact card</p>
              <h3 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 28, fontWeight: 800, lineHeight: 1, margin: 0 }}>radius.md · 12px</h3>
            </article>
          </div>
        </section>

        <section id="ctas" style={{ borderTop: `1px solid ${C.border}`, marginBottom: 72, paddingTop: 56 }}>
          <SectionTitle eyebrow="04 · CTA hierarchy" title="One primary action per view" body="Request Lessons is the primary conversion action. Supporting paths should not compete with the filled crimson button." />
          <div className="ds-cta-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            <article style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.lg, padding: 24 }}>
              <p style={{ color: C.crimson, fontFamily: fonts.body, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', margin: '0 0 18px', textTransform: 'uppercase' }}>Primary</p>
              <button type="button" style={{ background: C.crimson, border: 'none', borderRadius: radius.pill, color: C.white, fontFamily: fonts.body, fontSize: 14, fontWeight: 800, padding: '14px 24px' }}>Request Lessons</button>
            </article>
            <article style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.lg, padding: 24 }}>
              <p style={{ color: C.tealDark, fontFamily: fonts.body, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', margin: '0 0 18px', textTransform: 'uppercase' }}>Secondary</p>
              <button type="button" style={{ background: 'transparent', border: `1.5px solid ${C.crimson}`, borderRadius: radius.pill, color: C.crimson, fontFamily: fonts.body, fontSize: 14, fontWeight: 800, padding: '12px 22px' }}>Request a Tour</button>
            </article>
            <article style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.lg, padding: 24 }}>
              <p style={{ color: C.tealDark, fontFamily: fonts.body, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', margin: '0 0 18px', textTransform: 'uppercase' }}>Text action</p>
              <button type="button" style={{ background: 'none', border: 'none', color: C.teal, fontFamily: fonts.body, fontSize: 14, fontWeight: 800, padding: 0 }}>Learn more</button>
            </article>
          </div>
        </section>

        <section id="archetypes" style={{ borderTop: `1px solid ${C.border}`, marginBottom: 72, paddingTop: 56 }}>
          <SectionTitle eyebrow="05 · Page modes" title="Archetypes" body="Choose an archetype before styling a page so typography, tone, decoration, and density work together." />
          <div style={{ display: 'grid', gap: 16 }}>
            {Object.values(pageArchetypes).map((archetype) => (
              <article key={archetype.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.lg, display: 'grid', gap: 18, gridTemplateColumns: 'minmax(180px, 0.5fr) 1fr', padding: 24 }}>
                <div>
                  <h3 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 25, fontWeight: 800, lineHeight: 1, margin: '0 0 10px' }}>{archetype.id}</h3>
                  <code style={{ color: C.tealDark, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11 }}>fonts.{archetype.displayFont}</code>
                </div>
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                    {[`Hero: ${archetype.heroTone}`, `Decoration: ${archetype.decoration}`, `Density: ${archetype.componentDensity}`].map((label) => (
                      <span key={label} style={{ background: C.offWhite, borderRadius: radius.pill, color: C.espresso, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, padding: '5px 9px' }}>{label}</span>
                    ))}
                  </div>
                  <p style={{ color: C.muted, fontFamily: fonts.body, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{archetype.notes}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="program-palettes" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 56 }}>
          <SectionTitle eyebrow="06 · Program rules" title="Program palettes" body="Use the program palette to guide color balance. Percentages are directional composition targets, not rigid layout measurements." />
          <div className="ds-palette-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {Object.entries(programPalettes).map(([name, palette]) => (
              <article key={name} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: radius.lg, padding: 24 }}>
                <h3 style={{ color: C.espresso, fontFamily: fonts.display, fontSize: 25, fontWeight: 800, lineHeight: 1, margin: '0 0 18px' }}>{name}</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {Object.entries(palette).map(([role, value]) => (
                    <div key={role} style={{ alignItems: 'center', display: 'grid', gap: 10, gridTemplateColumns: '78px 1fr auto' }}>
                      <span style={{ color: C.muted, fontFamily: fonts.body, fontSize: 12, fontWeight: 700 }}>{role}</span>
                      <span style={{ alignItems: 'center', color: C.espresso, display: 'flex', fontFamily: fonts.body, fontSize: 13, gap: 8 }}>
                        <span style={{ background: C[value.token], border: `1px solid ${C.border}`, borderRadius: radius.pill, display: 'inline-block', height: 12, width: 12 }} />
                        {value.token}
                      </span>
                      <span style={{ color: C.tealDark, fontFamily: fonts.body, fontSize: 12, fontWeight: 800 }}>{value.pct}%</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .ds-color-grid > *, .ds-type-grid > *, .ds-radius-grid > *, .ds-cta-grid > *, .ds-palette-grid > * { min-width: 0; }
        @media (max-width: 860px) {
          .ds-color-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .ds-type-grid, .ds-radius-grid, .ds-cta-grid, .ds-palette-grid, .ds-surface-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          main { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </main>
  );
}