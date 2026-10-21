import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('offer cards use their shared typography and uniform rounded image styles', () => {
  const home = read('../src/next/HomePreview.jsx');
  const css = read('../src/next/home-preview.module.css');
  assert.ok(home.includes('className={styles.offer}'));
  assert.ok(!home.includes('styles.offerCard'));
  assert.match(css, /\.offer img \{ width: 100%; height: auto; aspect-ratio: 16 \/ 10; object-fit: cover; border-radius: 12px; flex-shrink: 0; \}/);
  assert.ok(css.includes('font-size: 36px; line-height: 1.1'));
  assert.ok(css.includes('.offer h3 { font-size: 32px;'));
});

test('approved Baloo typography is shared by refreshed public and preview routes', () => {
  for (const route of ['page.js', 'band/page.js', 'recording-music-production/page.js', 'rehearsal-space/page.js', 'publications/[slug]/page.js']) {
    assert.ok(read(`../app/home-preview/${route}`).includes('<ExpressivePreviewFrame>'), route);
  }
  const frame = read('../src/next/ExpressivePreviewFrame.jsx');
  assert.ok(frame.includes("from './previewFonts'"));
  assert.ok(frame.includes('expressiveTypography.letterSpacing'));
  assert.ok(read('../src/next/ProgramPreviewFrame.jsx').includes("from './previewFonts'"));
  assert.ok(read('../src/next/expressive-preview.module.css').includes('font-weight: 800'));
  const release = read('../src/next/ReleaseFrames.jsx');
  assert.equal((release.match(/<ExpressivePreviewFrame>/g) || []).length, 2);
  assert.ok(!release.includes('Asap'));
});

test('all seven homepage section headings share one responsive size and social media label', () => {
  const home = read('../src/next/HomePreview.jsx');
  const reviews = read('../src/next/PreviewReviews.jsx');
  for (const id of ['offer', 'around', 'board', 'events', 'community', 'partners']) {
    assert.ok(home.includes(`<h2 id="${id}-title" className={styles.homeSectionTitle}>`), id);
  }
  assert.ok(reviews.includes('<h2 id="reviews-title" className={styles.homeSectionTitle}>'));
  assert.ok(home.includes('>Social media</h2>'));
  assert.ok(!home.includes('From our community'));
  const css = read('../src/next/home-preview.module.css');
  assert.ok(css.includes('--home-section-title-size: clamp(36px, 4.5vw, 60px)'));
  assert.match(css, /\.page h2\.homeSectionTitle \{\s+font-size: var\(--home-section-title-size\);\s+line-height: 1.1;/);
});