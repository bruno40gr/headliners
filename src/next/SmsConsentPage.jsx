import Link from 'next/link';

const brandLogo = 'https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png';

export default function SmsConsentPage() {
  return (
    <main style={{ background: '#F6F3EE', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', maxWidth: 560, width: '100%', boxShadow: '0 8px 32px rgba(26,19,15,0.08)', border: '1px solid #E8E2DA' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <img src={brandLogo} alt="Headliner Music Academy" style={{ height: 36, width: 'auto' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#7A6A5A', letterSpacing: '0.06em', textTransform: "none" }}>
            Headliner Music Academy
          </span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.1, color: '#1A130F' }}>SMS Consent</h1>
        <p style={{ fontSize: 15, color: '#7A6A5A', margin: '0 0 32px', lineHeight: 1.5 }}>
          Provide your phone number below to opt in to SMS messages from Headliner Music Academy in Rocklin, CA. Opt-in is optional and not required to enroll or receive services.
        </p>
        <p style={{ fontSize: 12, color: '#9A8B7B', margin: '0 0 24px', lineHeight: 1.5, fontStyle: 'italic' }}>
          This page reflects the opt-in language used at booking on headlinermusicacademy.com.
        </p>

        <label htmlFor="phone" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: "none", color: '#7A6A5A', marginBottom: 6 }}>
          Phone number
        </label>
        <input id="phone" type="tel" placeholder="(916) 000-0000" style={{ width: '100%', padding: '10px 14px', border: '1px solid #E8E2DA', borderRadius: 10, fontSize: 14, color: '#1A130F', background: '#FAF9F7', outline: 'none', fontFamily: 'inherit' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16 }}>
          <input id="consent-transactional" type="checkbox" style={{ width: 16, height: 16, marginTop: 2, accentColor: '#FF0044' }} />
          <label htmlFor="consent-transactional" style={{ fontSize: 12, color: '#7A6A5A', lineHeight: 1.6 }}>
            I agree to receive transactional or informational SMS communications from Headliner Music Academy. Frequency may vary. Data rates may apply. Reply HELP for help or STOP to opt out.
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16 }}>
          <input id="consent-marketing" type="checkbox" style={{ width: 16, height: 16, marginTop: 2, accentColor: '#FF0044' }} />
          <label htmlFor="consent-marketing" style={{ fontSize: 12, color: '#7A6A5A', lineHeight: 1.6 }}>
            I agree to receive promotional or marketing SMS communications from Headliner Music Academy. Frequency may vary. Data rates may apply. Reply HELP for help or STOP to opt out.
          </label>
        </div>

        <p style={{ fontSize: 11, color: '#7A6A5A', marginTop: 12, lineHeight: 1.5 }}>
          Opt-in to each is independent and optional. You may opt out of either type at any time by replying STOP.
        </p>

        <button type="button" style={{ width: '100%', background: '#FF0044', color: '#fff', border: 'none', borderRadius: 999, padding: '13px 32px', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: "none", marginTop: 24 }}>
          Book a tour
        </button>

        <p style={{ fontSize: 12, color: '#7A6A5A', marginTop: 24, lineHeight: 1.6 }}>
          Questions? Call us at{' '}
          <a href="tel:916-435-1300" style={{ color: '#FF0044', textDecoration: 'none', fontWeight: 600 }}>
            (916) 435-1300
          </a>{' '}
          or email{' '}
          <a href="mailto:admin@headlinermusicacademy.com" style={{ color: '#FF0044', textDecoration: 'none', fontWeight: 600 }}>
            admin@headlinermusicacademy.com
          </a>
          .
        </p>

        <nav style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #E8E2DA', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/privacy-policy" style={{ fontSize: 11, color: '#7A6A5A', textDecoration: 'none', textTransform: "none", letterSpacing: '0.08em', fontWeight: 600 }}>
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" style={{ fontSize: 11, color: '#7A6A5A', textDecoration: 'none', textTransform: "none", letterSpacing: '0.08em', fontWeight: 600 }}>
            Terms & Conditions
          </Link>
          <Link href="/" style={{ fontSize: 11, color: '#7A6A5A', textDecoration: 'none', textTransform: "none", letterSpacing: '0.08em', fontWeight: 600 }}>
            Home
          </Link>
        </nav>
      </div>
    </main>
  );
}