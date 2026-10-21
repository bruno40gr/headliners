import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
import { previewPublications } from '../src/next/preview-publications.js';

const base = process.env.FORM_TEST_BASE_URL || 'http://localhost:3000';
const routes = ['', '/band', '/recording-music-production', '/rehearsal-space', `/publications/${previewPublications[0].slug}`];
const publicRoutes = ['/', '/programs/band', '/services/recording-music-production', '/services/rehearsal-space', `/publications/${previewPublications[0].slug}`];
const browser = await puppeteer.launch({ headless: true });
const errors = [];
try {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  page.on('pageerror', error => errors.push(error.message));
  // Allow real images/fonts for visual review, but never submit forms or load social embeds.
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.method() === 'POST' || /instagram|facebook|youtube|google-analytics/.test(request.url())) return request.abort();
    return request.continue();
  });
  for (const width of [390, 1440]) {
    await page.setViewport({ width, height: 950 });
    for (const [index, route] of routes.entries()) {
      for (const preview of [false, true]) {
        const path = preview ? `/home-preview${route}` : publicRoutes[index];
        const response = await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
        assert.equal(response.status(), 200, path);
        await page.waitForSelector('h1');
        await page.evaluate(async () => {
          await document.fonts.ready;
          const images = [...document.querySelectorAll('[aria-labelledby="offer-title"] img')];
          await Promise.all(images.map(async image => {
            image.loading = 'eager';
            await image.decode().catch(() => {});
          }));
        });
        const info = await page.evaluate(() => {
          const style = element => {
            const css = getComputedStyle(element);
            return { font: css.fontFamily, weight: css.fontWeight, size: css.fontSize };
          };
          return {
            heading: style(document.querySelector('h1')),
            sectionTitles: [...document.querySelectorAll('#offer-title, #around-title, #board-title, #events-title, #community-title, #reviews-title, #partners-title')].map(element => ({ text: element.textContent, ...style(element), lineHeight: getComputedStyle(element).lineHeight })),
            body: style([...document.querySelectorAll('main p')].find(element => !element.className.includes('subtitle'))),
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            offers: [...document.querySelectorAll('[aria-labelledby="offer-title"] img')].map(image => {
              const rect = image.getBoundingClientRect();
              return { width: rect.width, height: rect.height, radius: getComputedStyle(image).borderRadius, loaded: image.naturalWidth > 0 };
            }),
            offerTitle: document.querySelector('[aria-labelledby="offer-title"] h3') ? style(document.querySelector('[aria-labelledby="offer-title"] h3')) : null,
          };
        });
        assert.equal(info.overflow, false, `${width} ${path}: overflow`);
        assert.match(info.heading.font, /Baloo/i, path);
        assert.equal(info.heading.weight, '800', path);
        assert.match(info.body.font, /DM.Sans/i, path);
        if (!route) {
          assert.equal(info.sectionTitles.length, 7);
          assert.equal(new Set(info.sectionTitles.map(title => title.size)).size, 1);
          assert.equal(new Set(info.sectionTitles.map(title => title.lineHeight)).size, 1);
          assert.ok(info.sectionTitles.some(title => title.text === 'Social media'));
          for (const title of info.sectionTitles) {
            assert.match(title.font, /Baloo/i);
            assert.equal(title.weight, '800');
          }
          assert.equal(info.offers.length, 4);
          const first = info.offers[0];
          for (const image of info.offers) {
            assert.ok(image.loaded, `${path}: offer image failed to load`);
            assert.equal(image.radius, '12px');
            assert.ok(Math.abs(image.width - first.width) < 1);
            assert.ok(Math.abs(image.height - first.height) < 1);
            assert.ok(Math.abs(image.width / image.height - 1.6) < 0.01);
          }
          assert.equal(info.offerTitle.size, width === 390 ? '32px' : '36px');
          const offerSection = await page.$('[aria-labelledby="offer-title"]');
          // Fixed navigation can overlap a tall element capture; hide only for this crop.
          await page.evaluate(() => {
            for (const element of document.querySelectorAll('body *')) {
              if (getComputedStyle(element).position === 'fixed') {
                element.dataset.captureVisibility = element.style.visibility;
                element.style.visibility = 'hidden';
              }
            }
          });
          await offerSection.screenshot({ path: `/tmp/headliner-offers-${preview ? 'preview-baloo' : 'public-baloo'}-${width}.png` });
          await page.evaluate(() => {
            for (const element of document.querySelectorAll('[data-capture-visibility]')) {
              element.style.visibility = element.dataset.captureVisibility;
              delete element.dataset.captureVisibility;
            }
          });
        }
        await page.screenshot({ path: `/tmp/headliner-type-${preview ? 'preview-baloo' : 'public-baloo'}-${index}-${width}.png`, fullPage: true });
        console.log('PASS', width, path, JSON.stringify(info));
      }
    }
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}