import { playful, body } from './previewFonts';
import ProgramPreview from './ProgramPreview';
import { expressiveTypography } from '../tokens';

export default function ProgramPreviewFrame({ program }) {
  return <div className={`${playful.variable} ${body.variable}`} style={{ '--baloo-tracking': expressiveTypography.letterSpacing, '--baloo-kerning': expressiveTypography.fontKerning, '--baloo-hero-leading': expressiveTypography.heroLineHeight }}><ProgramPreview program={program} /></div>;
}