import { playful, body } from './previewFonts';
import { expressiveTypography } from '../tokens';
import styles from './expressive-preview.module.css';

// Shared by refreshed public and preview routes; unrelated pages stay unchanged.
export default function ExpressivePreviewFrame({ children }) {
  return <div className={`${playful.variable} ${body.variable} ${styles.frame}`} style={{
    '--preview-heading-font': 'var(--font-baloo)',
    '--preview-heading-tracking': expressiveTypography.letterSpacing,
    '--preview-heading-kerning': expressiveTypography.fontKerning,
    '--preview-subtitle-weight': 800,
  }}>{children}</div>;
}