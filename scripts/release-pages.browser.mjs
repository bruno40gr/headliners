import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
import { previewPublications } from '../src/next/preview-publications.js';

const base = process.env.FORM_TEST_BASE_URL || 'http://localhost:3007';
const origin = 'https://www.headlinermusicacademy.com';
const routes = [
  ['/', '/home-preview', '#hero-title'],
  ['/tiny-keys', '/home-preview/tiny-keys', '#program-main'],
  ['/little-rockers', '/home-preview/little-rockers', '#program-main'],
  ['/programs/band', '/home-preview/band', '#band-main'],
  ['/services/rehearsal-space', '/home-preview/rehearsal-space', '#rehearsal-main'],
  ['/services/recording-music-production', '/home-preview/recording-music-production', '#recording-main'],
  ...previewPublications.map(({ slug }) => [`/publications/${slug}`, `/home-preview/publications/${slug}`, 'article h1']),
];
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setCacheEnabled(false);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.setRequestInterception(true);
page.on('request', request => {
  if (request.method() === 'POST' || !request.url().startsWith(base)) return request.abort();
  return request.continue();
});

try {
  for (const width of [390, 1440]) {
    await page.setViewport({ width, height: 950 });
    for (const [path, preview, selector] of routes) {
      const response = await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200, path);
      await page.waitForSelector(selector);
      const info = await page.evaluate(() => ({
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        robots: document.querySelector('meta[name="robots"]')?.content || '',
        headings: document.querySelectorAll('h1').length,
        width: document.documentElement.scrollWidth,
        links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
        text: document.body.textContent,
      }));
      assert.equal(info.canonical, `${origin}${path}`, path);
      assert.ok(!info.robots.includes('noindex'), path);
      assert.equal(info.headings, 1, path);
      assert.ok(info.width <= width + 1, `${path}: horizontal overflow ${info.width}/${width}`);
      assert.ok(!info.links.some(href => href.startsWith('/home-preview')), path);
      assert.ok(!info.text.includes('Homepage preview.'), path);
      assert.ok(!info.text.includes('return <'), path);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `/tmp/headliner-release-${path.replaceAll('/', '-') || 'home'}-${width}.png`, fullPage: true });
      if (path === '/') {
        assert.ok(info.links.includes(`/publications/${previewPublications[0].slug}`));
        await page.evaluate(() => document.querySelector('a[href="/programs/band"]').click());
        await page.waitForFunction(() => window.location.pathname === '/programs/band');
        await page.waitForSelector('#band-main');
      }
      if (path.startsWith('/services/')) {
        assert.ok(await page.$('script[type="application/ld+json"][id^="headliner-"]'));
      }
      const previewResponse = await page.goto(`${base}${preview}`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector(selector);
      assert.equal(previewResponse.status(), 200);
      assert.ok((await page.$eval('meta[name="robots"]', el => el.content)).includes('noindex'));
      assert.equal(await page.$eval('link[rel="canonical"]', el => el.href), `${origin}${path}`);
      console.log('PASS', width, path, 'design, metadata, layout, public links; preview remains noindex');
    }
  }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const [path] of routes) assert.ok(sitemap.includes(`${origin}${path}`));
  assert.ok(!sitemap.includes('/home-preview'));
  assert.equal((await fetch(`${base}/publications/not-a-real-publication`)).status, 404);
  assert.deepEqual(errors, []);
  console.log('PASS sitemap, unknown article 404, no browser runtime errors. External media blocked; screenshots saved under /tmp/headliner-release-*.png.');
} finally { await browser.close(); }