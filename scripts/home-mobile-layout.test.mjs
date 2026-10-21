import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('offers precede editorial content in document order on every screen size', () => {
  const home = readFileSync(new URL('../src/next/HomePreview.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/next/home-preview.module.css', import.meta.url), 'utf8');
  assert.ok(home.includes('${styles.shell} ${styles.homeSections}'));
  assert.equal(home.match(/id="offer-title"/g).length, 1);
  assert.ok(home.indexOf('aria-labelledby="offer-title"') < home.indexOf('aria-labelledby="around-title"'));
  assert.ok(!css.includes('.homeSections > .offerSection { order: -1; }'));
});

test('mobile hero overlays video and preserves the existing colorful pill actions', () => {
  const css = readFileSync(new URL('../src/next/home-preview.module.css', import.meta.url), 'utf8');
  const mobile = css.split('/* Preserve the existing mobile hero')[1];
  assert.ok(mobile.includes('@media (max-width: 700px)'));
  assert.ok(mobile.includes('.heroMedia { position: absolute; inset: 0;'));
  assert.ok(mobile.includes('min-height: calc(100svh - 72px)'));
  assert.ok(mobile.includes('border-radius: 999px'));
  assert.ok(mobile.includes('background: #ff0044'));
  assert.ok(mobile.includes('border: 2.5px solid #00a8c8'));
});