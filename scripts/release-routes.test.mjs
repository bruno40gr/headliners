import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sitePath } from '../src/next/sitePaths.js';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const routes = [
  ['/', '/home-preview', 'app/page.js', '<HomePreview />'],
  ['/tiny-keys', '/home-preview/tiny-keys', 'app/tiny-keys/page.js', 'program="tiny-keys"'],
  ['/little-rockers', '/home-preview/little-rockers', 'app/little-rockers/page.js', 'program="little-rockers"'],
  ['/programs/band', '/home-preview/band', 'app/programs/band/page.js', '<BandPreviewRoute />'],
  ['/services/rehearsal-space', '/home-preview/rehearsal-space', 'app/services/rehearsal-space/page.js', '<RehearsalSpacePreview />'],
  ['/services/recording-music-production', '/home-preview/recording-music-production', 'app/services/recording-music-production/page.js', '<RecordingProductionPreview />'],
];

test('all promoted routes use approved designs and keep public SEO metadata', () => {
  for (const [path, preview, file, component] of routes) {
    const source = read(file);
    assert.ok(source.includes(component), file);
    assert.ok(source.includes(`canonical: '${path}'`), file);
    assert.ok(!source.includes('index: false'), file);
    assert.equal(sitePath(path), path);
    assert.equal(sitePath(path, true), preview);
  }
});

test('navigation isolates public and preview links, including article and home anchors', () => {
  assert.equal(sitePath('/publications/story'), '/publications/story');
  assert.equal(sitePath('/publications/story', true), '/home-preview/publications/story');
  assert.equal(sitePath('/#around-title', true), '/home-preview#around-title');
  assert.equal(sitePath('/privacy-policy', true), '/privacy-policy');
  for (const file of ['HomePreview.jsx', 'BandPreviewRoute.jsx', 'ProgramPreview.jsx', 'ServicePreviewLayout.jsx']) {
    assert.ok(read(`src/next/${file}`).includes('useSitePath'));
    assert.ok(!read(`src/next/${file}`).includes('href="/home-preview'));
  }
});

test('public articles have canonical metadata and sitemap entries; previews stay noindex', () => {
  assert.ok(read('app/publications/[slug]/page.js').includes('canonical: path'));
  assert.ok(read('app/publications/[slug]/page.js').includes('notFound()'));
  assert.ok(read('app/sitemap.js').includes('`/publications/${slug}`'));
  assert.ok(read('app/home-preview/publications/[slug]/page.js').includes('index: false, follow: false'));
  assert.ok(read('app/services/rehearsal-space/page.js').includes('headliner-rehearsal-space-jsonld'));
});