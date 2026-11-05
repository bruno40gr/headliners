import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Vercel deploys the Next.js application rather than expecting legacy Vite output', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(config.framework, 'nextjs');
  assert.equal(config.buildCommand, 'npm run build');
  assert.equal(pkg.scripts.build, 'next build');
  assert.equal(config.outputDirectory, '.next');
  assert.equal(config.rewrites, undefined, 'Do not introduce SPA fallback rewrites that bypass Next.js routes');
});