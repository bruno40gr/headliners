import { C, fonts } from '../tokens';

export default function ImageTextPair({
  imageSrc,
  imageAlt,
  imageHeight = 460,
  imageFocal = 'center center',
  imageRadius = 16,
  imageOnLeft = true,
  heading,
  body,
  linkLabel,
  linkHref,
  onNavigate,
  gap = 36,
}) {
  const imageCol = (
    <div style={{ borderRadius: imageRadius, overflow: 'hidden', minHeight: imageHeight, boxShadow: `0 18px 40px ${C.espresso10}` }}>
      <img
        src={imageSrc}
        alt={imageAlt}
        style={{ width: '100%', height: '100%', minHeight: imageHeight, objectFit: 'cover', objectPosition: imageFocal, display: 'block' }}
      />
    </div>
  );

  const textCol = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {heading && (
        <h2 style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 'clamp(2.1rem,4.4vw,3.4rem)',
          letterSpacing: '-0.02em',
          color: C.espresso,
          lineHeight: 0.98,
          margin: '0 0 18px',
        }}>
          {heading}
        </h2>
      )}
      {body && (
        <p style={{ fontFamily: fonts.body, fontSize: 18, lineHeight: 1.8, color: C.text, margin: '0 0 14px' }}>
          {body}
        </p>
      )}
      {linkLabel && (
        <div>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate(linkHref)}
            style={{
              background: 'none',
              border: 'none',
              color: C.crimson,
              cursor: 'pointer',
              fontFamily: fonts.body,
              fontSize: 14,
              fontWeight: 700,
              padding: 0,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            {linkLabel}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="home-stage-grid"
      style={{
        maxWidth: 1120,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: imageOnLeft ? '1.05fr 0.95fr' : '0.95fr 1.05fr',
        gap,
        alignItems: 'stretch',
      }}
    >
      {imageOnLeft ? imageCol : textCol}
      {imageOnLeft ? textCol : imageCol}
    </div>
  );
}
