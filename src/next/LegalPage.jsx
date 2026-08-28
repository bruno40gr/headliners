import Link from 'next/link';

const brandLogo = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png';

export default function LegalPage({ title, updated, intro, sections, links }) {
  return (
    <main style={{ background: '#F6F3EE', minHeight: '100vh', color: '#1A130F' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <img src={brandLogo} alt="Headliner Music Academy" style={{ height: 36, width: 'auto' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#7A6A5A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Headliner Music Academy
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 8px' }}>{title}</h1>
        <p style={{ fontSize: 13, color: '#7A6A5A', margin: '0 0 40px' }}>{updated}</p>
        <p style={{ fontSize: 15, color: '#7A6A5A', lineHeight: 1.8, margin: '0 0 32px' }}>{intro}</p>

        <div style={{ display: 'grid', gap: 28 }}>
          {sections.map((section) => (
            <section key={section.title}>
              <strong style={{ display: 'block', color: '#1A130F', marginBottom: 4, fontSize: 16 }}>{section.title}</strong>
              <p style={{ fontSize: 15, color: '#7A6A5A', lineHeight: 1.8, margin: 0 }}>{section.body}</p>
            </section>
          ))}
        </div>

        <section style={{ marginTop: 28 }}>
          <strong style={{ display: 'block', color: '#1A130F', marginBottom: 4, fontSize: 16 }}>Contact us</strong>
          <p style={{ fontSize: 15, color: '#7A6A5A', lineHeight: 1.8, margin: 0 }}>
            <a href="mailto:admin@headlinermusicacademy.com" style={{ color: '#FF0044', textDecoration: 'none' }}>
              admin@headlinermusicacademy.com
            </a>{' '}
            or{' '}
            <a href="tel:916-435-1300" style={{ color: '#FF0044', textDecoration: 'none' }}>
              (916) 435-1300
            </a>
          </p>
        </section>

        <nav style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #E8E2DA', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontSize: 11, color: '#7A6A5A', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}